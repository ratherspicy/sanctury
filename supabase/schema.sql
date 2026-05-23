-- Sanctury: My Sanctury client area schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

-- ---------------------------------------------------------------------------
-- Table 1: homeowners (linked to Supabase Auth users)
-- ---------------------------------------------------------------------------
create table if not exists public.homeowners (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Table 2: properties
-- ---------------------------------------------------------------------------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  homeowner_id uuid not null references public.homeowners (id) on delete cascade,
  address text not null,
  region text not null,
  floor_area numeric,
  year_built integer,
  build_quality text,
  features jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists properties_homeowner_id_idx on public.properties (homeowner_id);

-- ---------------------------------------------------------------------------
-- Table 3: health_checks
-- ---------------------------------------------------------------------------
create table if not exists public.health_checks (
  id uuid primary key default gen_random_uuid(),
  homeowner_id uuid not null references public.homeowners (id) on delete cascade,
  property_id uuid references public.properties (id) on delete set null,
  estimated_rebuild_cost numeric,
  current_sum_insured numeric,
  coverage_gap numeric,
  loan_amount numeric,
  refix_date date,
  interest_rate numeric,
  loan_structure jsonb not null default '{}'::jsonb,
  monthly_income numeric,
  created_at timestamptz not null default now()
);

create index if not exists health_checks_homeowner_id_idx on public.health_checks (homeowner_id);
create index if not exists health_checks_property_id_idx on public.health_checks (property_id);

-- ---------------------------------------------------------------------------
-- Table 4: marketplace_requests
-- ---------------------------------------------------------------------------
create table if not exists public.marketplace_requests (
  id uuid primary key default gen_random_uuid(),
  homeowner_id uuid not null references public.homeowners (id) on delete cascade,
  type text not null check (type in ('insurance', 'mortgage', 'energy', 'tradie')),
  status text not null default 'open',
  adviser_chosen text,
  created_at timestamptz not null default now()
);

create index if not exists marketplace_requests_homeowner_id_idx
  on public.marketplace_requests (homeowner_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.homeowners enable row level security;
alter table public.properties enable row level security;
alter table public.health_checks enable row level security;
alter table public.marketplace_requests enable row level security;

-- Homeowners: users can read and update their own row
create policy "homeowners_select_own"
  on public.homeowners for select
  using (auth.uid() = id);

create policy "homeowners_update_own"
  on public.homeowners for update
  using (auth.uid() = id);

create policy "homeowners_insert_own"
  on public.homeowners for insert
  with check (auth.uid() = id);

-- Properties: full access to own rows
create policy "properties_select_own"
  on public.properties for select
  using (auth.uid() = homeowner_id);

create policy "properties_insert_own"
  on public.properties for insert
  with check (auth.uid() = homeowner_id);

create policy "properties_update_own"
  on public.properties for update
  using (auth.uid() = homeowner_id);

create policy "properties_delete_own"
  on public.properties for delete
  using (auth.uid() = homeowner_id);

-- Health checks: full access to own rows
create policy "health_checks_select_own"
  on public.health_checks for select
  using (auth.uid() = homeowner_id);

create policy "health_checks_insert_own"
  on public.health_checks for insert
  with check (auth.uid() = homeowner_id);

create policy "health_checks_update_own"
  on public.health_checks for update
  using (auth.uid() = homeowner_id);

create policy "health_checks_delete_own"
  on public.health_checks for delete
  using (auth.uid() = homeowner_id);

-- Marketplace requests: full access to own rows
create policy "marketplace_requests_select_own"
  on public.marketplace_requests for select
  using (auth.uid() = homeowner_id);

create policy "marketplace_requests_insert_own"
  on public.marketplace_requests for insert
  with check (auth.uid() = homeowner_id);

create policy "marketplace_requests_update_own"
  on public.marketplace_requests for update
  using (auth.uid() = homeowner_id);

create policy "marketplace_requests_delete_own"
  on public.marketplace_requests for delete
  using (auth.uid() = homeowner_id);
