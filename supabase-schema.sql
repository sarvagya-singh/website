-- Run this in your Supabase SQL editor to set up the brainstorm board

create table if not exists brainstorm_features (
  id          uuid        default gen_random_uuid() primary key,
  title       text        not null,
  description text        default '',
  phase       text        not null default 'backlog',   -- 'phase1' | 'phase2' | 'backlog'
  category    text        default 'General',
  priority    text        default 'medium',             -- 'high' | 'medium' | 'low'
  position    integer     default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Enable Row Level Security
alter table brainstorm_features enable row level security;

-- Allow all operations (public board — tighten this if you want auth)
create policy "Public read" on brainstorm_features for select using (true);
create policy "Public insert" on brainstorm_features for insert with check (true);
create policy "Public update" on brainstorm_features for update using (true);
create policy "Public delete" on brainstorm_features for delete using (true);

-- Auto-update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on brainstorm_features
  for each row execute function update_updated_at();
