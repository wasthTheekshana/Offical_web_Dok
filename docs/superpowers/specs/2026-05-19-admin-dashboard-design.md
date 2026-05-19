# Admin Dashboard — Design Spec
_Date: 2026-05-19_

## Overview

A password-protected `/admin` route built directly into the DOK website. Admins log in with an email and password via Supabase Auth, then manage all dynamic site content through a clean form-based UI. All data and uploaded images are stored in Supabase (database + Storage bucket). No external CMS tools, no redeployment needed to update content.

---

## Architecture

```
Next.js App Router
├── app/admin/
│   ├── layout.tsx          — wraps all admin pages, checks auth session
│   ├── login/page.tsx      — Supabase email+password login form
│   ├── page.tsx            — dashboard home (redirect to /admin/team)
│   ├── team/page.tsx       — Team Members manager
│   ├── services/page.tsx   — Services manager
│   ├── blog/page.tsx       — Blog / News manager
│   ├── images/page.tsx     — Site Images manager
│   ├── clients/page.tsx    — Client Names manager
│   └── contact/page.tsx    — Contact Details manager
├── app/api/admin/
│   ├── team/route.ts       — GET/POST/PUT/DELETE team members
│   ├── services/route.ts   — GET/POST/PUT/DELETE services
│   ├── blog/route.ts       — GET/POST/PUT/DELETE blog posts
│   ├── images/route.ts     — GET/PUT site images (upload to Storage)
│   ├── clients/route.ts    — GET/POST/DELETE client names
│   └── contact/route.ts    — GET/PUT contact details
└── lib/
    ├── supabase.ts         — Supabase client (public anon key)
    └── supabase-admin.ts   — Supabase server client (service role key, server-only)
```

**Auth flow:** Supabase Auth session stored in an httpOnly cookie via `@supabase/ssr`. The `app/admin/layout.tsx` reads the session server-side; unauthenticated requests redirect to `/admin/login`. API routes verify the session independently using the service-role client — they do not trust the cookie alone.

**Public site data flow:** Public-facing pages (team, services, blog, clients, contact) currently read from hardcoded arrays. After this feature ships, they will fetch from Supabase at request time (server components, no client JS needed). Images served directly from Supabase Storage public URLs.

---

## Supabase Schema

### `team_members`
| column | type | notes |
|---|---|---|
| id | uuid PK | auto |
| name | text | |
| role | text | |
| bio | text | |
| photo_url | text | Supabase Storage public URL |
| display_order | int | for drag-to-reorder (future) |
| created_at | timestamptz | |

### `services`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| slug | text unique | URL path segment e.g. `physical-archiving` |
| title | text | |
| description | text | short card text |
| hero_image_url | text | |
| features | jsonb | `string[]` |
| stats | jsonb | `{val, label}[]` |
| published | bool | default true |

### `blog_posts`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| slug | text unique | |
| title | text | |
| excerpt | text | |
| body | text | markdown |
| cover_image_url | text | |
| published | bool | default false |
| published_at | timestamptz | set when published=true |
| created_at | timestamptz | |

### `site_images`
| column | type | notes |
|---|---|---|
| key | text PK | e.g. `hero-home`, `about-building` |
| label | text | human-readable name |
| url | text | current image URL |
| updated_at | timestamptz | |

### `clients`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| name | text | |
| display_order | int | |

### `contact_details`
| column | type | notes |
|---|---|---|
| key | text PK | e.g. `phone`, `email`, `address` |
| value | text | |

---

## Admin UI

### Layout
- **Sidebar** (fixed left, `bg-brand-navy`, white text): DOK logo, nav links for all 6 sections, sign-out button at bottom.
- **Main content area**: white, full height, scrollable.
- **Mobile**: sidebar collapses to hamburger; full-screen overlay nav.

### Login page (`/admin/login`)
- Centered card, DOK logo, email + password fields, "Sign In" button.
- Error message shown inline on bad credentials.
- On success: redirect to `/admin/team`.

### Team Members (`/admin/team`)
- Grid of member cards: photo thumbnail, name, role, Edit / Delete buttons.
- "Add Member" button opens an inline form (or modal): name, role, bio fields + photo upload (drag-and-drop or file picker → uploads to `team-photos/` Storage bucket).
- Edit opens same form pre-filled. Save writes back to Supabase.
- Delete shows a confirmation prompt before removing.

### Services (`/admin/services`)
- List of service rows: thumbnail, title, published toggle, Edit button.
- Edit opens a full form: title, description (textarea), hero image upload, features list (add/remove string items), stats (add/remove {val, label} pairs).
- "Add Service" creates a new row with a new slug (slug derived from title, editable).
- No delete (services are structural) — use published toggle to hide instead.

### Blog / News (`/admin/blog`)
- Table: title, excerpt (truncated), status (Draft / Published), date, Edit / Delete.
- "New Post" opens a form: title, excerpt, body (textarea, markdown), cover image upload, publish toggle.
- Published posts appear at `/news` on the public site.

### Site Images (`/admin/images`)
- Grid of named image slots (e.g. "Home Hero", "About Building", "Warehouse Main").
- Each slot shows current image thumbnail + "Replace" button → file picker → uploads to `site-images/` bucket → updates `site_images` table.
- Public site reads from `site_images` table; old image file remains in Storage (no cleanup needed at this stage).

### Client Names (`/admin/clients`)
- Chips showing each client name with an × remove button.
- Text input + "Add" button at the bottom to append new client.
- Order controlled by `display_order`; drag-to-reorder is out of scope for v1.

### Contact Details (`/admin/contact`)
- Three editable fields: Phone, Email, Address (textarea).
- Single "Save Changes" button writes all three at once.

---

## API Routes

All routes at `app/api/admin/*` verify the Supabase session server-side before performing any DB operation. Unauthenticated calls return `401`. All responses are JSON.

| Method | Path | Action |
|---|---|---|
| GET | `/api/admin/team` | list all members |
| POST | `/api/admin/team` | create member |
| PUT | `/api/admin/team/[id]` | update member |
| DELETE | `/api/admin/team/[id]` | delete member |
| GET | `/api/admin/services` | list all services |
| POST | `/api/admin/services` | create service |
| PUT | `/api/admin/services/[id]` | update service |
| GET | `/api/admin/blog` | list all posts |
| POST | `/api/admin/blog` | create post |
| PUT | `/api/admin/blog/[id]` | update post |
| DELETE | `/api/admin/blog/[id]` | delete post |
| GET | `/api/admin/images` | list all image slots |
| PUT | `/api/admin/images/[key]` | replace image URL |
| GET | `/api/admin/clients` | list clients |
| POST | `/api/admin/clients` | add client |
| DELETE | `/api/admin/clients/[id]` | remove client |
| GET | `/api/admin/contact` | get all contact fields |
| PUT | `/api/admin/contact` | update contact fields |

Image uploads go directly from the browser to Supabase Storage using a signed upload URL (generated server-side), not through the Next.js API route, to avoid routing large files through the server.

---

## Public Site Integration

Each public page component is updated to fetch from Supabase at build-time or request-time:

- `components/about/AboutTeam.tsx` → fetches `team_members`
- `components/home/ServicesGrid.tsx` + individual service pages → fetches `services`
- `app/news/` → fetches `blog_posts` where `published = true`
- `components/home/ClientLogos.tsx` → fetches `clients`
- `components/layout/Footer.tsx` + `app/contact/` → fetches `contact_details`
- Site images → fetches `site_images` by key

Server components use the public Supabase client (anon key) with RLS policies that allow `SELECT` on all tables for anonymous users, and restrict `INSERT/UPDATE/DELETE` to authenticated admins only.

---

## Security

- **RLS on every table**: anonymous users can only SELECT; authenticated admin can do everything.
- **API route auth check**: every mutation route verifies `supabase.auth.getUser()` returns a valid user before touching the DB. No mutation is possible without a valid session.
- **Service role key**: only used server-side in `supabase-admin.ts`, never exposed to the browser.
- **Supabase Storage**: `team-photos/` and `site-images/` buckets are public-read (so images render on the site), but upload requires a signed URL generated by an authenticated API call.

---

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Out of Scope (v1)

- Drag-to-reorder team members or clients
- Rich text / WYSIWYG editor for blog (plain markdown textarea)
- Multiple admin accounts / role management
- Image cropping or resize in-browser
- Audit log / change history
