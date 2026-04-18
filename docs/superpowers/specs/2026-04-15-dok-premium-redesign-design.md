# DOK Solutions Lanka — Premium Hybrid Website Redesign

**Date:** 2026-04-15
**Status:** Approved
**Approach:** Component-by-Component Rebuild (Option 2)

---

## Overview

Full visual overhaul of the DOK Solutions Lanka website into a **Premium Hybrid** design — dark dramatic sections alternating with light blue-tinted white sections. The style is Smooth & Refined (Apple/McKinsey-level motion) with real images throughout, stock video placeholders, and uniquely animated sections that communicate the business visually.

**Brand palette kept:** Navy (`#003B8E`, `#0072CE`), Gold (`#F5A623`), Light blue tint (`#F0F6FF`, `#EBF4FF`, `#E8F4FF`), Dark navy (`#050C1F`, `#071535`, `#0A1E4A`).

---

## New Libraries to Install

| Package | Purpose |
|---|---|
| `lenis` | Buttery smooth page scroll |
| `gsap` + `@gsap/react` | ScrollTrigger-powered section reveals and advanced animations |

All existing tools stay: `framer-motion`, `tailwindcss`, `lucide-react`.

---

## Architecture

```
app/
  layout.tsx          ← add Lenis smooth scroll wrapper
  globals.css         ← add Syne font, new CSS utilities
  page.tsx            ← unchanged imports, new components replace old

components/
  layout/
    Navbar.tsx        ← existing (keep, minor polish)
    Footer.tsx        ← REBUILD: dark multi-column, social icons, cert chips
  home/
    Hero.tsx          ← REBUILD: split layout with animated image stage
    Stats.tsx         ← REBUILD: light blue bg, white stat cards
    AboutSnapshot.tsx ← REBUILD: image left + editorial text right
    ServicesGrid.tsx  ← REBUILD: light blue bg, image cards with zoom-on-hover
    WhyChooseUs.tsx   ← REBUILD: featured dark card + stacked compact cards
    Testimonials.tsx  ← REBUILD: featured dark card + 3 mini white cards
    ClientLogos.tsx   ← REBUILD: dual-direction infinite marquee
    CTABanner.tsx     ← REBUILD: dark two-column (text+features / form)
    NewsSection.tsx   ← keep (minor style update to match new palette)
    CertsBar.tsx      ← remove (certs moved into footer + hero trust strip)
  ui/
    SmoothScroll.tsx  ← NEW: Lenis wrapper component
    VideoPlayer.tsx   ← NEW: lightweight muted autoplay video component
```

---

## Section-by-Section Spec

### 1. Layout — SmoothScroll + Font

- Wrap `<body>` in a `SmoothScroll` client component that initialises Lenis on mount and syncs with Framer Motion's `useScroll`.
- Add `Syne` Google Font (weights 700, 800) for hero and CTA headlines. `Inter` stays for body text.
- Add CSS utilities to `globals.css`: `.text-grad-blue`, `.text-grad-gold`, orbit/float keyframes.

---

### 2. Hero — Unique Split + Animated Image Stage

**Layout:** Full-viewport two-column grid. Left 50% = dark text panel. Right 50% = image stage.

**Left panel (`#050C1F → #071535 → #0A1E4A` gradient):**
- Subtle grid overlay (60×60px lines, 7% opacity, radial mask)
- Single vertical accent line on the right edge (blue-to-gold gradient)
- Two glow blobs (blue + gold, `filter:blur(80px)`)
- Eyebrow pill with live pulsing dot: "Part of Abans Group · Since 2010 · BOI Approved"
- `Syne` headline: small muted sub-line → "Journey Towards" (white) → "A Smart Era" (gold shimmer animation `background-position` keyframe)
- Body copy 16px, 48% white opacity
- Two CTAs: pulsing gold button with sweep-shine `::after` animation + ghost outline button
- Trust badge row: ISO 9001, ISO 27001, ISO 45001, Great Place to Work ×3 (gold), BOI Approved
- Mouse scroll indicator bottom-left

**Right panel (image stage):**
- Two concentric orbit rings (dashed border, `animation: spin` — outer 40s clockwise, inner 28s counter-clockwise)
- SVG overlay with 4 animated dashed lines connecting centre node to each orbiting image card — **glowing dots travel along each line** using `<animateMotion>` — plus a pulsing centre circle node
- Centre image (280×200px, `border-radius:28px`): DOK office Unsplash photo, floating up/down `translateY` keyframe, label badge at bottom
- 4 orbiting image cards at corners (archive, BPO team, auraDOCS dashboard, digitizing): each has a photo, dark overlay, label badge, independent float animation with different durations and delays. Hover: `scale(1.08)`.
- 3 floating stat pills (99.8% Accuracy / Same-Day Retrieval / ISO 27001 Certified) with coloured live dots
- Bottom flow strip: Physical Records → Digitize → auraDOCS → BPO Process → Delivered (icon + label for each step, faint arrow separators)

**Animations:** All Framer Motion `initial/animate` with staggered delays. Scroll parallax on hero content via `useScroll` + `useTransform` (y offset). Orbit rings and SVG dots run as pure CSS/SVG animations (no JS cost).

**Images (Unsplash, free):** replaced with `next/image` with `priority` and appropriate `sizes`. For production, client swaps URLs for their own photos.

---

### 3. Stats — Light Blue, White Cards

**Background:** `linear-gradient(#EBF4FF → #F5F9FF)`, large radial blue glow top-right corner.

**Header:** left-aligned section pill + `s-title` ("14 Years of Measurable Results"), right-aligned subtitle text. `whileInView` fade-up.

**4 stat cards** (white, `border-radius:24px`, `box-shadow`):
- Top coloured bar (3px, gradient): blue / light-blue / gold / green — each card variant.
- Large emoji icon, giant number (`font-size:52px`, `font-weight:900`), label, sub-label.
- Animated count-up on scroll-enter using a custom `useCountUp` hook (GSAP `gsap.to` on a ref value).
- `whileHover: { y: -6 }` lift.

---

### 4. About Snapshot — Image Left + Editorial Right

**Layout:** Two equal columns, `min-height:640px`.

**Left (image):**
- `next/image` full-cover (modern office photo).
- Gradient overlay fading to white on the right edge (seamless join).
- Three floating chips absolutely positioned over the image:
  - Top-right: "14+ Years of Excellence" (white card, `box-shadow`)
  - Bottom-left: "3× Great Place to Work" (gold number)
  - Bottom-right: ISO chip (navy gradient, white text, trophy icon) "Triple ISO Certified · 9001 · 27001 · 45001"
- Chips animate in with `whileInView: { y: 0, opacity: 1 }` stagger.

**Right (text, white background):**
- Label pill, `h2` with blue `<em>`, body copy.
- 3 fact rows (icon + title + description), hover lifts with border highlight.
- Navy gradient CTA button.

---

### 5. Services Grid — Light Blue, Image Cards with Hover Zoom

**Background:** `linear-gradient(#F0F7FF → #E8F4FF → #F0F7FF)`.

**Header row:** section pill + title left, "View All Services →" button right.

**Grid:** CSS grid with mixed spans:
- 3 equal cards top row (Physical Archiving, Document Digitizing, auraDOCS)
- 1 wide card spanning all 3 columns (BPO) — two-column internal layout: image left, text right
- Insurance card + "Book Free Consultation" CTA card bottom row (1 + 2 span)

**Each standard card:**
- `next/image` thumbnail (200px height), zoom `scale(1.08)` on card hover via CSS transition.
- Dark gradient overlay on image, floating icon badge (bottom-left), service number (bottom-right faint).
- Service name badge (top-left, glassmorphism).
- Body: title, description, feature chips (light blue pill style), "Explore Service →" link with hover gap increase.
- `whileInView` stagger fade-up, `whileHover: { y: -10 }`.

**auraDOCS card:** gold variant — gold chips, gold link, gold "Proprietary Platform" badge.

**Consultation CTA card:** navy-to-blue gradient background, white text, white button.

---

### 6. Why Choose Us — Featured + Stacked Cards

**Background:** white with dot pattern (radial-gradient dots, right-side mask) and two background glow circles.

**Two-column header:** label + `h2` left; description + "See Our Full Story" button right (separated by a left border).

**Main layout: two columns**

**Left — big featured dark card (min-height 480px):**
- Background: `#071535` gradient with Unsplash security/server room photo at 25% opacity.
- Grid dot overlay + blue glow orb top-right.
- Top row: giant faint number "01" (left) + animated pulsing icon wrap (right, `box-shadow` keyframe).
- Bottom: tag pill, title (28px Syne), description, metric bar ("Zero security incidents in 14 years" — fill animation on inView), "Learn About Our Security →" link.
- `whileInView` fade-up, `whileHover: { y: -6 }`.

**Right — 5 stacked compact cards:**
- White background, `border:1px solid #E8EDF5`.
- On hover: `translateX(6px)`, border disappears, shadow appears, left coloured accent bar fades in (3px, per-card colour: blue/gold/sky/blue/green), icon scales + rotates slightly, arrow icon slides in from right.
- Each card: icon wrap + title + description + certification chip at bottom.
- Cards: Triple ISO | Same-Day Retrieval | Great Place to Work ×3 | Abans Group | 21% CAGR.
- `whileInView` stagger (0.08s delay each).

**Bottom stats bar** (full width, spans both columns):
- Light blue gradient background, 2px top border (blue-to-sky-to-gold gradient).
- 4 stats: 500+ Enterprise Clients | 50M+ Docs Managed | 99.8% Accuracy | 14+ Years — with dividers between them.
- Count-up animation on inView.

---

### 7. Testimonials — Featured Dark Card + 3 Mini White Cards

**Background:** `linear-gradient(#F5F9FF → white)`.

**Featured card (full width, dark navy):**
- 2px top border: blue-to-sky gradient.
- Huge decorative quote mark background (180px, 12% opacity blue).
- Two-column: avatar initials circle (left) + quote text, stars, name, role, company badge, stat highlight ("85% reduction in retrieval time" — gold metric box) on right.
- `whileInView` slide-up.

**3 mini cards (white, equal columns):**
- Industry tag chip at top (different colour per card: blue=Banking, gold=Corporate, green=Government).
- 5 gold stars, italic quote text, avatar + name + role.
- `whileHover: { y: -5 }`, `whileInView` stagger.

---

### 8. Client Logos — Dual-Direction Marquee

**Background:** `#F0F6FF`, light borders.

**Two marquee rows:**
- Row 1: left-to-right, 28s.
- Row 2: right-to-left, 34s.
- Logo chips: white bg, `border:1px solid rgba(0,59,142,0.1)`, hover turns navy with white text.
- `animation-play-state: paused` on hover.
- Populated with 10 real Sri Lankan enterprise names per row (duplicated for infinite loop).

---

### 9. CTA Banner — Dark Two-Column

**Background:** `#050C1F → #071535` gradient, radial blue glow centre, blue+gold top border line, two blurred orbs (blue + gold).

**Two columns (1fr 1fr):**

**Left — text + feature list:**
- Gold eyebrow pill.
- `Syne` headline with gold shimmer "Business?" word.
- Subtitle copy.
- 4 feature rows: icon wrap + text (Free consultation / Confidential+NDA / Custom solution / ISO certified).

**Right — glassmorphism form card:**
- `rgba(255,255,255,0.05)` bg, `backdrop-filter:blur(20px)`, `border:1px solid rgba(255,255,255,0.1)`.
- Title + subtitle + separator line.
- 2×2 input grid (Name, Company, Email, Phone) + full-width service interest input.
- Gold gradient submit button with hover lift.
- Privacy note below.
- `whileInView` slide-up from right.

---

### 10. Footer — Dark Multi-Column

**Background:** `#02040E`, top border `rgba(255,255,255,0.04)`.

**4-column grid:** Brand column (2.2fr) + Services + Company + Certifications.

**Brand column:** DOK logo box (navy gradient) + brand name + "Part of Abans Group" gold sub-label + description + social icon row (LinkedIn, Facebook, Twitter, YouTube) — hover turns blue.

**Link columns:** small uppercase section headers, hover colour `rgba(255,255,255,0.8)`.

**Bottom bar:** copyright text left, 4 cert chip pills right (ISO 9001, ISO 27001, ISO 45001, BOI Approved).

---

## Images

All `next/image` with:
- `sizes` prop appropriate to layout slot.
- `loading="lazy"` except hero images which use `priority`.
- Unsplash URLs as placeholders — easily swapped for client's real photos.

| Section | Image | Unsplash URL |
|---|---|---|
| Hero centre | DOK HQ | `photo-1568992687947-868a62a9f521` |
| Hero orbit 1 | Archive warehouse | `photo-1553877522-43269d4ea984` |
| Hero orbit 2 | BPO team | `photo-1600880292203-757bb62b4baf` |
| Hero orbit 3 | auraDOCS / data | `photo-1551288049-bebda4e38f71` |
| Hero orbit 4 | Digitizing / scanning | `photo-1560472355-536de3962603` |
| About | Modern office | `photo-1497366216548-37526070297c` |
| Services: Archiving | Shelves/archive | `photo-1553877522-43269d4ea984` |
| Services: Digitizing | Documents/scanner | `photo-1560472355-536de3962603` |
| Services: auraDOCS | Analytics dashboard | `photo-1551288049-bebda4e38f71` |
| Services: BPO | Team at work | `photo-1600880292203-757bb62b4baf` |
| Services: Insurance | Documents/desk | `photo-1450101499163-c8848c66ca85` |
| Why Choose Us | Security/server room | `photo-1558618666-fcd25c85cd64` |

---

## Animation Principles

- **Entrance:** `whileInView={{ opacity:1, y:0 }}` from `{ opacity:0, y:40 }`, `once:true`, `margin:"-40px"`. Duration 0.65s, easing `[0.22,1,0.36,1]`.
- **Stagger:** 0.08–0.10s delay between sibling elements.
- **Hover:** `whileHover={{ y:-6 }}` on cards, `scale(1.08)` on images, gap increase on links.
- **Hero SVG:** Pure CSS/SVG — `<animateMotion>` for travelling dots, CSS `animation` for orbit rings and float keyframes.
- **Count-up:** GSAP `gsap.to()` on a reactive number ref, triggered by IntersectionObserver (ScrollTrigger).
- **Smooth scroll:** Lenis with default config, synced via `lenis.on('scroll', ScrollTrigger.update)`.
- **Button shine:** CSS `::after` pseudo-element sliding across with `@keyframes`.

---

## Build Sequence

1. Install `lenis`, `gsap`, `@gsap/react`
2. `SmoothScroll.tsx` wrapper + update `layout.tsx`
3. `globals.css` — Syne font, new utilities, keyframes
4. `Hero.tsx` (highest impact — do first)
5. `Stats.tsx`
6. `AboutSnapshot.tsx`
7. `ServicesGrid.tsx`
8. `WhyChooseUs.tsx`
9. `Testimonials.tsx`
10. `ClientLogos.tsx`
11. `CTABanner.tsx`
12. `Footer.tsx`
13. Remove `CertsBar.tsx`, update `page.tsx` imports
14. Final QA pass — responsive (mobile breakpoints), performance audit
