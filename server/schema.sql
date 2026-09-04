-- SwiftHire Supabase schema
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query) once your project is created.

-- Job seekers / account holders
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password text not null,
  experience integer default 0,
  previous_job_role text,
  contact_number text,
  resume text,
  created_at timestamptz default now()
);

-- Recruiters
create table if not exists recruiters (
  recruiter_id uuid primary key default gen_random_uuid(),
  recruiter_name text not null,
  recruiter_email text not null unique,
  recruiter_password text not null,
  recruiter_designation text,
  recruiter_mobile text unique,
  organisation_name text,
  organisation_city text,
  organisation_type text,
  created_at timestamptz default now()
);

-- Job postings
create table if not exists jobs (
  job_id uuid primary key default gen_random_uuid(),
  recruiter_id uuid references recruiters(recruiter_id) on delete cascade,
  company_name text,
  industry text,
  city text,
  contact_email text,
  phone_number text,
  open_positions integer default 1,
  hiring_for text,
  immediate_hiring boolean default false,
  created_at timestamptz default now()
);

-- Applications linking users to jobs
create table if not exists job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(job_id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  applied_at timestamptz default now()
);

-- Contact form submissions
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Companies (shown on hiring companies dashboard)
create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamptz default now()
);

-- Standalone job seeker directory (used by GET /job-seekers)
create table if not exists job_seekers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  created_at timestamptz default now()
);

-- Helpful indexes
create index if not exists idx_jobs_recruiter_id on jobs(recruiter_id);
create index if not exists idx_job_applications_job_id on job_applications(job_id);
create index if not exists idx_job_applications_user_id on job_applications(user_id);
