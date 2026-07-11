# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Core rules

Follow these rules before making any change:

1. Use `npm`, not `pnpm` or `yarn`.
2. Treat `package-lock.json` as the authoritative lockfile.
3. Do not introduce `next-intl`; this project uses its own i18n helpers.
4. Use `AppLink` for all internal navigation. Do not import `Link` directly from `next/link`.
5. Keep project metadata in `data/projects.ts` and translated project copy in both locale files.
6. Respect `prefers-reduced-motion` for every new animation.
7. Reuse the existing motion utilities and architecture before introducing a new abstraction or dependency.
8. Do not modify unrelated files or perform broad refactors unless the task explicitly requires it.

## Commands

```bash
npm run dev      # Start the Turbopack development server at http://localhost:3000
npm run build    # Create the production build
npm run start    # Serve the production build
npm run lint     # Run ESLint using eslint-config-next
npx tsc --noEmit # Run TypeScript type-checking
```

There is currently no automated test suite or test framework configured. There is no `test` script and no Jest, Vitest, or Playwright dependency.

Before considering a change complete, run:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

When a command cannot be run or fails for a reason unrelated to the change, report it explicitly instead of claiming successful verification.

## Package management

Use `npm` for all dependency operations.

Both `package-lock.json` and `pnpm-lock.yaml` currently exist, but `package-lock.json` is the authoritative and current lockfile.

Do not:

* run `pnpm install`;
* update `pnpm-lock.yaml`;
* infer that pnpm is the active package manager;
* add a dependency without checking whether the existing stack already provides the required functionality.

When installing or removing a package, ensure `package.json` and `package-lock.json` remain synchronized.

## Application structure

The site uses the Next.js App Router.

Localized routes live under:

```text
app/[locale]/
```

Shared components are organized as follows:

```text
components/
├── analytics/  # GA4 and analytics-related components
├── layout/     # Shared Header and Footer
├── sections/   # Page-level sections and their animation timelines
└── ui/         # Reusable primitives and interaction components
```

Other important directories:

```text
data/       # Structured project metadata
hooks/      # Client hooks and Zustand stores
lib/        # Shared utilities and motion configuration
locales/    # Flat translation dictionaries
utils/      # i18n and general utilities
```

Use the `@/*` path alias for imports from the repository root:

```tsx
import { HERO_PROJECT } from "@/data/projects";
import { useLoader } from "@/hooks/useLoader";
```

Avoid long relative imports such as:

```tsx
import { useLoader } from "../../../hooks/useLoader";
```

## Server and Client Components

Prefer Server Components by default.

Add `"use client"` only when the component requires client-only features such as:

* React state or effects;
* browser APIs;
* Framer Motion;
* GSAP;
* Zustand client state;
* interactive event handlers.

Do not convert a Server Component into a Client Component solely to simplify data flow. Instead, isolate interactive behavior in a smaller client component when practical.

Keep browser-dependent code inside effects or guarded execution paths. Do not access `window`, `document`, `localStorage`, or `matchMedia` during server rendering.

## Internationalization

### Custom i18n system

This project does not use `next-intl`, even though it is currently listed as a dependency.

Do not use `next-intl` APIs or introduce its providers, hooks, middleware, or message-loading conventions.

Locale routing is handled by the `app/[locale]/` segment.

`middleware.ts` redirects unlocalized routes to either `/fr` or `/en` using this priority:

1. the `NEXT_LOCALE` cookie;
2. the browser's `Accept-Language` header;
3. the default locale, `fr`.

The supported locale list and default locale are defined in:

```text
utils/i18n.ts
```

### Translation lookup

Translations are stored in flat JSON dictionaries:

```text
locales/fr.json
locales/en.json
```

Keys are resolved using dot-path lookup:

```ts
t("hero.title_lines");
```

There are two independent implementations of this lookup:

* `hooks/useTranslation.ts` for Client Components;
* `utils/server-i18n.ts` for Server Components and metadata generation.

The server implementation exposes:

```ts
getServerT
getServerList
```

If the lookup behavior, fallback behavior, nested-value handling, or error handling changes, update and verify both implementations.

### Translation rules

Whenever adding or renaming a translation key:

1. update `locales/fr.json`;
2. update `locales/en.json`;
3. ensure both files use the same key structure;
4. verify that the expected value type is identical in both locales;
5. search for all references before deleting or renaming an existing key.

Do not hardcode user-facing French or English copy inside components when it belongs in the locale dictionaries.

## Project data

`data/projects.ts` is the single source of truth for project metadata and project placement throughout the site.

It controls:

* home-page project teasers;
* the home-page hero showcase;
* the `/work` project list;
* each `/work/[slug]` detail page.

Each `ProjectEntry` uses boolean flags to determine where it appears:

```ts
home: true
```

Includes the project in `HOME_PROJECTS`.

```ts
hero: true
```

Selects the project used by `HERO_PROJECT`.

Only one project should normally be marked as the hero project. If no project has `hero: true`, the first home project is used as the fallback.

```ts
featured: true
```

Enables the full-bleed presentation on `/work`.

`TEASER_PROJECTS` contains home projects excluding the hero project and is capped at three entries. This prevents the same project from appearing in both the hero and teaser sections of the home page.

### Project copy

Project metadata and translated copy are intentionally separated.

`data/projects.ts` contains structural data such as:

* key;
* slug;
* images;
* URLs;
* display flags.

Translated content lives in both locale files under:

```text
projects.<project-key>.*
```

This includes content such as:

* title;
* category;
* description;
* results.

### Adding a project

When adding a new project:

1. add its metadata to `data/projects.ts`;
2. choose a unique and stable `key`;
3. choose a unique URL-safe `slug`;
4. add all required keys under `projects.<key>` in `locales/fr.json`;
5. add the equivalent keys in `locales/en.json`;
6. add or verify all referenced media assets;
7. check whether it should have `home`, `hero`, or `featured` enabled;
8. verify the home page, `/work`, and `/work/[slug]`;
9. verify that its shared image transition name matches everywhere it is rendered.

Do not place project-specific copy directly in `data/projects.ts`.

## Navigation and route transitions

The project uses `next-view-transitions`.

`app/[locale]/layout.tsx` wraps the application with:

```tsx
<ViewTransitions>
```

All internal navigation must use the `Link` exported by:

```text
components/ui/AppLink.tsx
```

Do not import `Link` directly from `next/link`, because doing so bypasses the active transition integration.

External links do not need to use the internal route-transition behavior.

### Shared project image transitions

Project images use matching inline `viewTransitionName` values between project lists and detail pages:

```tsx
style={{
  viewTransitionName: `project-image-${slug}`,
}}
```

The same naming pattern must be preserved in:

* `Projects.tsx`;
* `WorkHorizontalJourney.tsx`;
* the corresponding `/work/[slug]` detail page.

Global view-transition duration and easing are defined in `app/globals.css` under the `::view-transition-*` selectors.

Do not create competing transition mechanisms without first confirming that the native view-transition flow cannot support the requirement.

### Legacy transition code

`components/ui/PageTransition.tsx` is a legacy GSAP curtain transition controller.

It is currently not mounted and is not part of the active route-transition system.

Do not use it as the basis for new route transitions unless the task explicitly involves restoring or replacing that architecture. Consider removing it only as part of a dedicated cleanup task after confirming that it has no remaining imports or planned use.

## Animation architecture

The project deliberately uses two animation libraries for different purposes.

### GSAP

Use GSAP for:

* choreographed section entrances;
* timelines involving several coordinated elements;
* scroll-triggered animation;
* scrubbed scroll effects;
* imperative animation requiring precise sequencing.

GSAP animations normally live inside the section component that owns the animated markup.

Use `gsap.context()` to scope selectors and animations:

```tsx
useEffect(() => {
  const context = gsap.context(() => {
    // Animation setup
  }, rootRef);

  return () => context.revert();
}, []);
```

Register and clean up `ScrollTrigger` instances correctly. Avoid global selectors when a component-scoped ref can be used.

### Framer Motion

Use Framer Motion for:

* simple fades;
* declarative reveals;
* isolated layout or presence animations;
* interactions that fit naturally into component props.

Framer Motion is configured globally through:

```text
components/ui/MotionProvider.tsx
```

It uses:

```tsx
reducedMotion="user"
```

This automatically respects the user's reduced-motion preference.

### Shared motion values

`lib/motion.ts` exports the shared animation primitives:

```ts
EASE_SMOOTH
fadeUp
```

Reuse these values instead of inventing new entrance easings or nearly identical animation variants.

Introduce a new shared variant only when it is meaningfully reused across multiple components.

### Reduced motion

Every new animation must provide an acceptable reduced-motion experience.

Framer Motion handles the user preference through `MotionProvider`.

GSAP does not have a project-wide reduced-motion switch. Each GSAP component must check the preference manually before creating its timeline.

For example:

```tsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (prefersReducedMotion) {
  return;
}
```

When animation is skipped, ensure elements remain visible and usable. Do not leave content in an initial hidden or transformed state.

## Loader and entrance sequencing

The introductory loader is coordinated through Zustand.

The store is defined in:

```text
hooks/useLoader.ts
```

It exposes the `isLoading` state.

The state is updated by:

```text
components/sections/Loader.tsx
```

It is consumed by components such as:

```text
components/sections/Hero.tsx
components/layout/Header.tsx
```

Any entrance animation that must run only after the loader curtain has opened should follow the existing pattern:

```tsx
const isLoading = useLoader((state) => state.isLoading);

useEffect(() => {
  if (isLoading) return;

  // Create the entrance animation.
}, [isLoading]);
```

Do not introduce an alternative module-level flag, event bus, pub/sub system, timeout, or custom DOM event for loader completion.

A module-state implementation was previously attempted and reverted. The Zustand store is the supported synchronization mechanism.

Ensure that effects clean up correctly if `isLoading` changes or the component unmounts.

## Styling and responsive behavior

Follow the existing styling approach in the repository instead of introducing a new styling system.

When changing a component:

* preserve its existing responsive behavior;
* check both French and English layouts, since copy length differs;
* avoid fixed dimensions that break with longer translated text;
* preserve visible focus styles;
* ensure hover-only interactions also work with keyboard and touch input;
* avoid layout shifts caused by media or client-only rendering.

Prefer existing design tokens, CSS custom properties, spacing patterns, and typography rules over one-off values.

## Accessibility

New and modified UI must remain accessible.

At minimum:

* use semantic HTML elements;
* preserve logical heading order;
* add meaningful alternative text to informative images;
* use empty alternative text for decorative images;
* ensure interactive elements are reachable by keyboard;
* do not replace buttons with clickable `div` elements;
* provide an accessible name for icon-only controls;
* preserve visible focus indicators;
* do not rely only on color, motion, or hover to convey information;
* respect `prefers-reduced-motion`;
* verify that animated content remains readable and operable when animation is disabled.

Use buttons for actions and links for navigation.

## Images and performance

Use the existing image strategy and Next.js image primitives where appropriate.

When adding images:

* provide correct intrinsic dimensions or a stable aspect ratio;
* avoid unnecessary `priority`;
* use `priority` only for genuinely above-the-fold critical images;
* provide appropriate `sizes` for responsive images;
* compress assets before adding them;
* avoid loading desktop-sized media on small screens;
* preserve the project image transition naming where applicable.

Avoid introducing heavy client-side dependencies for behavior that can be implemented with existing libraries or platform APIs.

Do not move large static datasets or non-interactive layout logic into Client Components unnecessarily.

## Analytics

Analytics components live under:

```text
components/analytics/
```

GA4 and scroll-depth tracking are initialized from the root layout.

Do not:

* initialize analytics independently inside page sections;
* send duplicate page-view events without checking the existing integration;
* include sensitive or personally identifiable information in event payloads;
* block page rendering on analytics code.

Any new event should use a stable, descriptive naming convention and avoid translated event names.

## Metadata

Locale-specific page metadata should use the server-side translation helpers from:

```text
utils/server-i18n.ts
```

Do not use client hooks inside `generateMetadata`.

When adding a localized page, verify metadata for both `/fr` and `/en`, including:

* title;
* description;
* canonical or alternate URLs when applicable;
* Open Graph content when applicable.

## Change discipline

Before creating a new helper, hook, component, store, or animation abstraction:

1. search the repository for an existing equivalent;
2. reuse or extend the existing implementation when reasonable;
3. avoid maintaining two independent solutions to the same problem.

Keep changes scoped to the user request.

Do not:

* reformat unrelated files;
* rename unrelated symbols;
* replace established libraries without a specific requirement;
* remove apparently unused code without confirming references;
* change translation keys without updating both locales;
* modify generated files manually.

## Verification checklist

Before finishing a task, verify the relevant items below.

### Required checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```

### Functional checks

* Test both `/fr` and `/en`.
* Check mobile and desktop layouts for affected pages.
* Verify that internal links still use `AppLink`.
* Confirm that project pages resolve for every affected slug.
* Confirm that translated keys exist in both locale files.
* Check the reduced-motion behavior of affected animations.
* Confirm that GSAP effects and `ScrollTrigger` instances are cleaned up.
* Check that loader-dependent entrances do not run prematurely.
* Check that view-transition names match between source and destination.
* Verify that no new hydration warning appears.
* Check the browser console for runtime errors.

In the final response, summarize:

* what changed;
* which files were modified;
* which checks were run;
* any remaining limitation, warning, or unverified behavior.
