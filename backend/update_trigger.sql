-- Run this SQL in your Supabase SQL Editor to fix the resource submission issue

create or replace function set_resource_user_id()
returns trigger as $$
begin
  -- Only set user_id from auth.uid() if it's available (context is authenticated user)
  -- AND if user_id wasn't already passed explicitly
  if auth.uid() is not null and new.user_id is null then
    new.user_id = auth.uid();
  end if;
  
  -- Set submitted_by to user's email if not provided and auth.uid() is available
  if new.submitted_by is null and auth.uid() is not null then
    new.submitted_by = (select email from auth.users where id = auth.uid());
  end if;
  
  return new;
end;
$$ language plpgsql security definer;
