-- DOK Solutions Admin Database Schema

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,          -- bcrypt hash
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT '',
  bio           TEXT NOT NULL DEFAULT '',
  photo_url     TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  hero_image_url TEXT NOT NULL DEFAULT '',
  features      JSONB NOT NULL DEFAULT '[]',
  stats         JSONB NOT NULL DEFAULT '[]',
  published     BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  excerpt      TEXT NOT NULL DEFAULT '',
  content      TEXT NOT NULL DEFAULT '',
  cover_url    TEXT NOT NULL DEFAULT '',
  published    BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Site images (CMS-managed image slots)
CREATE TABLE IF NOT EXISTS site_images (
  key        TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  url        TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Clients / partner logos
CREATE TABLE IF NOT EXISTS clients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  logo_url      TEXT NOT NULL DEFAULT '',
  website_url   TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact / site settings
CREATE TABLE IF NOT EXISTS contact_details (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Seed site_images ──────────────────────────────────────────────────────────
INSERT INTO site_images (key, label, url) VALUES
  ('hero',               'Home Page Hero Image',        ''),
  ('building',           'Headquarters Building',        ''),
  ('team-all',           'Full Team Photo',              ''),
  ('team-group',         'Management Team Photo',        ''),
  ('warehouse-main',     'Main Warehouse',               ''),
  ('warehouse-forklift', 'Warehouse Operations',         ''),
  ('scanning',           'Document Scanning',            ''),
  ('scanning-team',      'Scanning Team',                ''),
  ('warehouse-shelves',  'Warehouse Shelves',            ''),
  ('data-entry',         'Data Entry Operations',        ''),
  ('auradocs',           'auraDOCS Platform Screenshot', '')
ON CONFLICT (key) DO NOTHING;

-- ─── Seed contact details ──────────────────────────────────────────────────────
INSERT INTO contact_details (key, value) VALUES
  ('phone',   '+94 11 2 508 508'),
  ('email',   'info@doksolutions.lk'),
  ('address', 'No. 10, Kirula Road, Colombo 05, Sri Lanka')
ON CONFLICT (key) DO NOTHING;

-- ─── Seed services ─────────────────────────────────────────────────────────────
INSERT INTO services (slug, title, description, hero_image_url, features, stats, published, display_order) VALUES
('physical-archiving', 'Physical Archiving',
 'Comprehensive physical document archiving services — secure, climate-controlled warehouse facilities with CCTV surveillance, controlled access, fire detection, barcode tracking, and same-day retrieval for organisations across Sri Lanka.',
 '/images/warehouse-main.jpg',
 '["Climate-controlled facilities","Barcode tracking","Same-day retrieval","Certified destruction"]',
 '[]', true, 1),
('document-digitizing', 'Document Digitizing',
 'Professional document digitization using industrial-grade high-speed scanners and advanced OCR technology. Onsite or at our secure scanning centre — transforming physical records into searchable, indexed digital formats.',
 '/images/scanning.jpg',
 '["High-speed bulk scanning","Advanced OCR indexing","Onsite & offsite options","Secure digital upload"]',
 '[]', true, 2),
('data-entry', 'Data Entry Services',
 'Reliable and efficient data entry services backed by trained personnel, quality control procedures, and technology-driven workflows. High accuracy, fast turnaround.',
 '/images/data-entry.jpg',
 '["High-accuracy data entry","QC-driven workflows","Scalable operations","Fast turnaround"]',
 '[]', true, 3),
('auradocs', 'DMS & auraDOCS',
 'auraDOCS is DOK''s proprietary cloud-based Document Management System — centralised digital storage with full-text search, role-based access controls, version management, workflow automation, and enterprise system integration.',
 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=800&fit=crop&auto=format&q=80',
 '["Centralised digital repository","Role-based access control","Workflow automation","Enterprise integration"]',
 '[]', true, 4),
('insurance', 'Insurance Policy Mgmt',
 'End-to-end insurance policy document management — scanning, indexing, retrieval, and secure storage for life, motor, and health insurance companies.',
 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1000&h=800&fit=crop&auto=format&q=80',
 '["Policy lifecycle management","Claims document handling","Proposal processing","Digital policy archives"]',
 '[]', true, 5)
ON CONFLICT (slug) DO NOTHING;
