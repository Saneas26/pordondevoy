-- TELEMETRÍA DEL GRUPO SANEAS · ejecutar una vez en el SQL Editor de Supabase
-- (proyecto uisrxztowgdpkxeuznfh, el mismo que usa app.saneas.es).
--
-- Dos tablas: la ficha de cada dispositivo (¿instalada? ¿iPhone o Android?
-- ¿de qué país?) y una apertura por día (los "activos" diarios).
-- Solo escribe el servidor (service_role) a través de /api/ping: con RLS
-- activado y sin políticas, la clave pública no puede ni leer ni escribir.

create table if not exists telemetria_dispositivos (
  app         text not null,
  dispositivo uuid not null,
  plataforma  text,
  instalada   boolean default false,
  pais        text,
  primera_vez timestamptz default now(),
  ultima_vez  timestamptz default now(),
  primary key (app, dispositivo)
);

create table if not exists telemetria_aperturas (
  app         text not null,
  dispositivo uuid not null,
  dia         date not null,
  instalada   boolean,
  pais        text,
  primary key (app, dispositivo, dia)
);

alter table telemetria_dispositivos enable row level security;
alter table telemetria_aperturas   enable row level security;

-- Resumen que consulta /api/stats: por cada app, totales, instaladas,
-- plataformas, activos de hoy, activos por día (30 días) y países.
create or replace function telemetria_resumen()
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'actualizado', now(),
    'apps', (
      select coalesce(json_object_agg(app, datos), '{}'::json) from (
        select d.app, json_build_object(
          'dispositivos', count(*),
          'instaladas',   count(*) filter (where d.instalada),
          'navegador',    count(*) filter (where not d.instalada),
          'iphone',       count(*) filter (where d.plataforma = 'iPhone'),
          'android',      count(*) filter (where d.plataforma = 'Android'),
          'activos_hoy',  (select count(*) from telemetria_aperturas a
                            where a.app = d.app and a.dia = current_date),
          'paises', (select coalesce(json_object_agg(pais, n), '{}'::json) from (
                       select coalesce(p.pais, '??') as pais, count(*) as n
                       from telemetria_dispositivos p where p.app = d.app
                       group by 1 order by n desc) t),
          'activos_por_dia', (select coalesce(json_object_agg(dia, n), '{}'::json) from (
                                select a.dia::text as dia, count(*) as n
                                from telemetria_aperturas a
                                where a.app = d.app and a.dia >= current_date - 30
                                group by 1 order by dia) t)
        ) as datos
        from telemetria_dispositivos d
        group by d.app
      ) x
    )
  );
$$;

-- Que solo el servidor pueda pedir el resumen: se lo quitamos a todos
-- (el revoke a public alcanza también a service_role) y se lo damos solo a él.
revoke execute on function telemetria_resumen() from public, anon, authenticated;
grant execute on function telemetria_resumen() to service_role;
