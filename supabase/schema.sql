-- Create Blog Categories Table
create table if not exists public.blog_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Blogs Table
create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text,
  excerpt text,
  status text check (status in ('draft', 'published')) default 'draft',
  featured_image text,
  category_id uuid references public.blog_categories(id),
  tags text[],
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone
);

-- Enable Row Level Security (RLS)
alter table public.blogs enable row level security;
alter table public.blog_categories enable row level security;

-- Policies for Blogs
-- 1. Public can view published blogs
create policy "Public can view published blogs"
on public.blogs for select
using (status = 'published');

-- 2. Authenticated users (Admin) can view all blogs
create policy "Admins can view all blogs"
on public.blogs for select
to authenticated
using (true);

-- 3. Authenticated users can insert/update/delete
create policy "Admins can insert blogs"
on public.blogs for insert
to authenticated
with check (true);

create policy "Admins can update blogs"
on public.blogs for update
to authenticated
using (true);

create policy "Admins can delete blogs"
on public.blogs for delete
to authenticated
using (true);

-- Policies for Categories
-- Public read
create policy "Public can view categories"
on public.blog_categories for select
using (true);

-- Admin write
create policy "Admins can manage categories"
on public.blog_categories for all
to authenticated
using (true);

-- Storage for Images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

create policy "Public Access Blog Images"
on storage.objects for select
using ( bucket_id = 'blog-images' );

create policy "Auth Upload Blog Images"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'blog-images' );

create policy "Auth Update Blog Images"
on storage.objects for update
to authenticated
using ( bucket_id = 'blog-images' );

-- Indexes for performance
create index blogs_slug_idx on public.blogs (slug);
create index blogs_status_idx on public.blogs (status);
create index blogs_published_at_idx on public.blogs (published_at);
