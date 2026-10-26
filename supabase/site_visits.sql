-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Creates an all-time visit counter that every visitor increments once per browser session.

create table if not exists public.site_stats (
  id text primary key,
  total_visits bigint not null default 0
);

insert into public.site_stats (id, total_visits)
values ('portfolio', 0)
on conflict (id) do nothing;

-- Visitors may only call the function below; they cannot read or edit the table directly.
alter table public.site_stats enable row level security;

create or replace function public.increment_visits()
returns bigint
language sql
security definer
set search_path = public
as $$
  update public.site_stats
     set total_visits = total_visits + 1
   where id = 'portfolio'
  returning total_visits;
$$;

revoke all on function public.increment_visits() from public;
grant execute on function public.increment_visits() to anon, authenticated;
