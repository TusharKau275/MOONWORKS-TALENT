# Moonworks Talent — Website Build Plan
**Prepared for: Antigravity (Claude Opus) agentic build**
**Prepared by: Tushar**
**Status: Draft v1 — ready for implementation**

---

## 0. How to use this document

This is the single source of truth for building the Moonworks Talent marketing website. It is written to be handed directly to an AI coding agent (Antigravity running Opus) as the build brief. Everything under **"Confirmed facts"** comes directly from the company profile PDF or from the client (Indu, Founder & CEO) and must not be changed without asking. Everything under **"Proposed / to be designed"** is a recommendation open to iteration — build it, but flag assumptions rather than treating them as fixed requirements.

Do not invent additional company facts (numbers, partners, testimonials, press mentions) that are not listed below. Where real content is missing (e.g. a testimonial, a team photo), use clearly-labeled placeholder content and leave a `// TODO(content):` comment in code, rather than fabricating specifics.

---

## 1. Confirmed facts (source: company profile PDF + client)

| Field | Value |
|---|---|
| Company name | Moonworks Talent |
| Entity type | Government Registered MSME / Micro Enterprise (Udyam certified) |
| Founder & CEO | Indu |
| Location | Haryana, India |
| Contact email | moonworks.talent@gmail.com |
| Tagline (from profile deck) | "Unlock Potential. Build Futures." |
| Alternate tagline (from deck) | "Let's Grow Together 💪" |
| Internship model | 100% remote/work-from-home, unpaid |
| Duration options | 2, 4, or 6 months (extendable beyond 6 months if the intern is interested) |
| Deliverables to interns | Certificate of Completion, Experience Letter, Letter of Recommendation (LOR) for top performers |
| Internship tracks (7) | HR Intern · Social Media Marketing Intern · Graphic Designer Intern · Website Development Intern · Administration Intern · Operations Intern · Email Marketing Intern |
| Core focus areas (from deck) | Digital Marketing, HR & Talent Acquisition, Web Development, Graphic Design, Operations, Student Mentorship, Career Growth |
| Vision (from deck) | To make career opportunities completely free, highly accessible, and skill-based for every student and fresher across India |
| Mission (from deck) | Create job-ready talent through practical skill development, 1-on-1 mentorship, and exposure to real-world live projects |
| Key services (from deck) | Internship Programs (100% WFH, structured), Skill Development (industry-aligned training), Verified Credentials (Certificate + Experience Letter + LOR), Job Referrals & Mentorship |
| Fee | Zero — explicitly "100% Free Internships," no hidden charges |

**LinkedIn:** the founder's personal LinkedIn was shared in conversation but not confirmed as the official company page — get the correct company LinkedIn URL from Indu before wiring it into the Contact section. Do not guess a URL.

---

## 2. Project goal

Build a professional, credible marketing website for Moonworks Talent that:
1. Reassures prospective interns this is a real, registered company (counters the skepticism a cold LinkedIn DM naturally creates)
2. Clearly explains the 7 internship tracks and what interns get out of it
3. Makes the process (Apply → Offer Letter → Weekly Tasks → Get Certified) easy to understand at a glance
4. Converts visitors into applicants via a working contact/application form
5. Is fast, mobile-first (most traffic will come from LinkedIn on mobile), and cheap to run (free-tier infrastructure)

---

## 3. Tech stack (confirmed)

| Layer | Choice |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js + Express.js |
| Database | Supabase (free tier) — Postgres + built-in auth if needed later |
| Hosting (frontend) | Vercel or Netlify free tier (proposed — confirm with client) |
| Hosting (backend) | Render / Railway free tier (proposed — confirm with client) |
| Package manager | npm |

**Proposed additions** (flag for confirmation, not yet agreed):
- TypeScript across both frontend and backend, since the folder structure below references a `types/` folder per feature — recommend adopting TS for real type-safety rather than JSDoc-only types
- Tailwind CSS for styling, since it pairs well with the feature-folder structure and speeds up building a distinctive design system per the design direction in Section 6
- Zod for form validation (contact form + any future application form), shared between frontend and backend where possible
- React Router for client-side routing (Home / Explore / About / How It Works / Contact / Sign In / Get Started)

---

## 4. Folder structure (confirmed pattern — feature-based)

This is a **feature-based / vertical-slice architecture**. Each feature owns its own API calls, components, hooks, state, types, and utils. Shared/cross-cutting code lives outside `features/`.

```
src/
├── app/                        # App shell: routing, providers, layout
│   ├── routes.tsx
│   ├── App.tsx
│   └── providers/
│
├── features/
│   ├── home/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/         # Hero, TrustBadges, etc.
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── opportunities/          # "Explore Opportunities" sector cards
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── technologies/           # "Technologies you'll master" section
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── how-it-works/           # Apply → Offer Letter → Weekly Tasks → Certified
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── about/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── contact/                # Contact form + submission handling
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   └── utils/
│   │
│   └── auth/                   # Sign in / Get started
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── hooks/
│       ├── stores/
│       ├── types/
│       └── utils/
│
├── components/                 # Shared/global components (Navbar, Footer, Button, Card...)
├── hooks/                      # Shared hooks (useMediaQuery, useScrollReveal...)
├── lib/                        # Third-party client setup (supabaseClient.ts, apiClient.ts)
├── styles/                     # Global styles, design tokens, Tailwind config source
├── types/                      # Global/shared TypeScript types
├── utils/                      # Shared utility functions
└── main.tsx

server/
├── src/
│   ├── features/
│   │   └── contact/            # Mirrors frontend feature: routes, controller, service, schema
│   │       ├── contact.routes.ts
│   │       ├── contact.controller.ts
│   │       ├── contact.service.ts
│   │       └── contact.schema.ts
│   ├── lib/
│   │   └── supabaseClient.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── rateLimiter.ts
│   ├── config/
│   │   └── env.ts
│   └── server.ts
├── .env.example
└── package.json
```

**Rule for the agent:** when adding a new page/feature, create a new folder under `features/` following this exact same seven-folder pattern, even if some subfolders start empty (delete unused ones only if a feature genuinely never needs them, e.g. a static page with no `stores/`).

---

## 5. Database schema (Supabase / Postgres — proposed)

Free tier is more than sufficient for this use case. Minimum viable schema:

```sql
-- Contact / application form submissions
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  track_interest text,              -- which internship track they're interested in
  message text,
  source_page text,                 -- 'contact' | 'get_started' etc.
  status text default 'new',        -- 'new' | 'contacted' | 'closed'
  created_at timestamptz default now()
);

-- Internship tracks (drives the "Explore Opportunities" + "How It Works" content)
create table internship_tracks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  sector text not null,             -- groups tracks into sector cards
  description text,
  icon text,
  display_order int default 0,
  is_active boolean default true
);

-- Technologies showcased in the "Technologies you'll master" section
create table technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon_url text,
  category text,                    -- e.g. 'frontend' | 'backend' | 'design' | 'marketing'
  display_order int default 0
);
```

**Note:** `internship_tracks` and `technologies` could reasonably start as static JSON/TS config files instead of DB tables, since this content changes rarely (recommend starting static, migrating to Supabase only if the client wants to self-manage content later without a redeploy). `contact_submissions` should be a real table from day one since it's user-generated data.

---

## 6. Design direction (proposed — for the agent to execute, consistent with the existing landing-page draft already built)

A first landing page for this client was already designed and built (see prior deliverable), and this full site should extend that same design system rather than starting over:

- **Palette:** Ink Navy `#14213D` (dark base/text), Paper White `#FAF9F6` (light base), Amber Signal `#E8A33D` (primary accent), Slate `#6B7280` (secondary text), Deep Teal `#2C5F5A` (secondary accent)
- **Type:** Fraunces (serif, display/headlines) + Work Sans (body) + IBM Plex Mono (eyebrows/labels/small caps)
- **Signature motif:** the "orbit" — a central hub with satellite nodes, representing Moonworks connecting talent to opportunity across tracks. Reuse this visual language (not necessarily the exact same component) across the site for cohesion — e.g. in the "Technologies" section as an orbiting skill-cloud, or in "How It Works" as connected nodes along a path.
- Avoid the generic AI-site defaults called out in the design skill (cream + terracotta warm-neutral sites, black + neon-green sites, hairline-rule broadsheet sites) — the brand already has a distinct direction, stick to it.

The client's own uploaded profile deck uses a different palette (indigo/violet `#4F46E5`-ish + white). **Flag this to the client**: recommend picking one direction — either continue the navy/amber "orbit" identity from the site already built, or fully switch to the deck's indigo palette — rather than mixing both across different materials.

---

## 7. Site map & page-by-page content plan

### 7.1 Navbar (global, all pages)
Home · Explore Opportunities · About Us · How It Works · Contact Us · **Sign In** · **Get Started** (primary CTA button)

### 7.2 Home page

**Hero section**
- Headline + subhead communicating "we upskill you" — take inspiration from SaaS hero best practices researched: lead with clarity over cleverness, one clear headline, one primary CTA, restrained motion, no carousel (carousels convert poorly and hurt SEO — avoid them here)
- Primary CTA: "Get Started" / "Explore Opportunities"
- Trust element near the fold: MSME registered badge (this directly counters the "is this a scam" skepticism a cold LinkedIn post creates — make it visible early, not buried)

**Explore Opportunities section**
Sector cards grouping the 7 confirmed tracks. Proposed grouping (open to client feedback):
| Sector | Tracks included |
|---|---|
| Technology & Development | Website Development Intern |
| Design & Creative | Graphic Designer Intern |
| Marketing & Growth | Social Media Marketing Intern, Email Marketing Intern |
| People & HR | HR Intern |
| Business Operations | Administration Intern, Operations Intern |

**Technologies you'll master section**
15 technologies to display — proposed list, mapped to the actual tracks offered (avoid listing tech unrelated to the 7 real tracks):

1. HTML5
2. CSS3
3. JavaScript (ES6+)
4. React.js
5. Node.js
6. Express.js
7. Python
8. FastAPI
9. Figma
10. Adobe Photoshop
11. Canva
12. WordPress
13. Google Analytics
14. Mailchimp
15. Git & GitHub

*(Flag to client: FastAPI/Python appear because the client asked for them by name as examples — confirm whether an actual track teaches Python/FastAPI, since the 7 confirmed tracks are HR/Marketing/Design/Web Dev/Admin/Ops/Email, not a general software-engineering track. If not, replace with something track-accurate like "Notion," "Google Workspace," or "Trello" for Ops/Admin.)*

**How It Works section (with diagram)**
Exactly the 4-step flow specified:
```
  Apply  →  Get Offer Letter  →  Weekly Tasks  →  Get Certified
```
Build this as a horizontal (desktop) / vertical (mobile) connected-node diagram using the orbit/connection visual language from Section 6. Each step gets a short 1-sentence description:
1. **Apply** — Submit your details for the track you're interested in
2. **Get Offer Letter** — Receive your internship offer letter after a short screening
3. **Weekly Tasks** — Work on real, structured tasks with mentor guidance
4. **Get Certified** — Receive your Certificate, Experience Letter, and (for top performers) an LOR

### 7.3 About Us page
Pulls directly from confirmed facts: Vision, Mission, Core Objective, "100% Remote Opportunities," founder info (Indu, Founder & CEO), MSME/Udyam registration badge repeated here for trust reinforcement.

### 7.4 How It Works page
Expanded version of the homepage section — same 4 steps, more detail per step, FAQ-style clarifications (duration options: 2/4/6 months; unpaid; what "top performer" means for LOR eligibility, etc. — confirm exact LOR criteria with client before publishing).

### 7.5 Contact Us page
- Contact details: email (moonworks.talent@gmail.com), LinkedIn (**pending confirmed company URL from client — do not fabricate**), location (Haryana, India)
- Contact form: Name, Email, Track of interest (dropdown from the 7 confirmed tracks), Message → submits to `contact_submissions` table via the Express API
- Same MSME/Udyam trust badge repeated a third time here, since this is the highest-intent page

### 7.6 Sign In / Get Started
Proposed as a lightweight lead-capture form initially (not a full account system), since there's no confirmed need yet for interns to have persistent logged-in accounts. Recommend starting with:
- "Get Started" → same form as Contact, pre-filtered to "I want to apply" intent
- "Sign In" → **defer until there's a confirmed reason for accounts** (e.g. an intern dashboard). Flag this to the client as a scope question rather than building speculative auth infrastructure now.

---

## 8. API design (Express — proposed, minimal viable)

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/contact` | Submit contact/application form → inserts into `contact_submissions` |
| GET | `/api/tracks` | Return the list of internship tracks (if migrated to Supabase; otherwise served from static config) |
| GET | `/api/technologies` | Return the technologies list (if migrated to Supabase; otherwise static) |
| GET | `/api/health` | Basic health check for deployment monitoring |

Keep the API surface small. Do not build auth endpoints until Section 7.6's "Sign In" scope question is resolved with the client.

---

## 9. Non-functional requirements

- **Mobile-first:** most visitors will arrive from a LinkedIn post on mobile — design and test mobile layouts first, not as an afterthought
- **Performance:** static hero imagery/SVG over heavy video; lazy-load below-the-fold sections
- **Accessibility:** visible keyboard focus states, sufficient color contrast (verify Ink Navy on Paper White and Amber Signal on Ink Navy both pass WCAG AA), respect `prefers-reduced-motion`
- **SEO basics:** proper meta tags, one `<h1>` per page, descriptive page titles (e.g. "Website Development Internship — Moonworks Talent"), sitemap.xml
- **Trust signals prioritized:** given the audience's likely skepticism about a cold LinkedIn internship post, the MSME/Udyam badge and founder transparency should appear above the fold on Home, and again on About and Contact

---

## 10. Implementation phases (for the agent to sequence work)

**Phase 1 — Foundation**
- Scaffold Vite + React + TypeScript frontend, Express + TypeScript backend
- Set up folder structure exactly as Section 4
- Set up Supabase project, `.env` files, `contact_submissions` table
- Set up design tokens (Tailwind config or CSS variables) from Section 6

**Phase 2 — Static pages & content**
- Navbar + Footer (shared components)
- Home page: Hero, Explore Opportunities, Technologies, How It Works sections
- About Us page
- How It Works page (expanded)

**Phase 3 — Interactive/data-backed**
- Contact Us page + working form → Express `/api/contact` → Supabase
- Get Started flow (lead capture)
- Form validation (client + server) and success/error states

**Phase 4 — Polish & QA**
- Responsive pass on all breakpoints
- Accessibility pass
- Cross-browser check
- Lighthouse performance pass
- Deploy frontend + backend, connect custom domain if client has one

**Phase 5 — Documentation**
- `README.md` at repo root: setup instructions, env vars needed, how to run locally, how to deploy
- `CONTRIBUTING.md` if more than one person will touch the codebase: folder structure convention (Section 4), naming conventions, commit style
- Inline comments on any assumption/placeholder content flagged in this document

---

## 11. Open questions for the client (Indu) before/during build

1. Confirm the official company LinkedIn page URL (not a personal profile)
2. Confirm whether any track actually teaches Python/FastAPI, or whether the 15-technology list should be adjusted to match only the 7 real tracks
3. Pick one visual identity direction — the navy/amber "orbit" system already built, or the profile deck's indigo palette — rather than running both
4. Define "top performer" criteria for LOR eligibility (needed for the How It Works page copy)
5. Confirm whether "Sign In" needs real authentication now or can be deferred (Section 7.6)
6. Confirm hosting preference (Vercel/Netlify + Render/Railway proposed, but not yet agreed)

---

## 12. Documentation deliverables checklist (for scalability)

- [ ] Root `README.md` — project overview, tech stack, local setup, scripts
- [ ] `server/README.md` — API routes, env vars, Supabase setup steps
- [ ] `.env.example` for both frontend and backend
- [ ] Component-level comments for any non-obvious logic
- [ ] This plan document kept up to date as decisions in Section 11 are resolved