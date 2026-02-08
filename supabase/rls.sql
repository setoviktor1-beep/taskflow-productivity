-- Enable RLS
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;

-- Profiles: Users can only see and edit themselves
create policy "Owner read" on public.profiles for select to authenticated using (id = auth.uid());
create policy "Owner update" on public.profiles for update to authenticated using (id = auth.uid());

-- Tasks: Strict ownership
create policy "Owner manage" on public.tasks
for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
