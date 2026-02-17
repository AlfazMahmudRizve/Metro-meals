-- Create Menu Items Table
create table if not exists menu_items (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  price numeric not null,
  category text not null,
  image text,
  tags text[] default '{}',
  available boolean default true
);

-- Enable RLS
alter table menu_items enable row level security;

-- Policies
create policy "Allow public read access" on menu_items for select using (true);
create policy "Allow admin insert" on menu_items for insert with check (true); -- Ideally restrict to admin role
create policy "Allow admin update" on menu_items for update using (true);
create policy "Allow admin delete" on menu_items for delete using (true);

-- Seed Data (from menu.json)
insert into menu_items (name, price, category, image, tags) values
('Chicken Popcorn', 179, 'Quick Bites', 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=2070&auto=format&fit=crop', '{}'),
('Naga Fire Bites', 239, 'Quick Bites', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070&auto=format&fit=crop', '{"spicy"}'),
('Bukhari Rice', 349, 'Heavy Hitters', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop', '{"bestseller"}'),
('Cream''son Pasta', 289, 'Heavy Hitters', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop', '{}'),
('Sizzling Chicken', 120, 'Sides', 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop', '{}'),
('Big-Belly Cheesy Pasta', 399, 'Heavy Hitters', 'https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=1935&auto=format&fit=crop', '{"bestseller"}');
