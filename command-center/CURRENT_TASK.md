# Current Task

Task ID: design-001
Title: Wire real photography into homepage for a more iconic, engaging design
Objective: Replace the abstract SVG hero graphic and add real photography throughout the homepage to make it visually engaging and trustworthy. 10 real stock photos already exist in public/images/hero/, public/images/process/, public/images/services/ (see filenames in those folders). Integrate them using Next.js Image component with proper responsive sizing, lazy loading where appropriate, and descriptive alt text for SEO. Improve overall visual hierarchy, spacing, and eye-catching design of the homepage without changing existing copy or breaking any existing routes/pages.
Authorized files: src/app/page.tsx and homepage-specific components only (identify exact component files first and list them before editing)
Prohibited files: blog files, city/service page templates outside the homepage, package.json, any file affecting other pages
Acceptance criteria: npm run build succeeds with no errors; homepage visually shows hero image + process step images + service card images; all images have alt text; no console errors; existing phone CTA (tel:+18443978298) still present and unchanged
Required tests: npm run build, visual check of homepage in dev mode
Deployment required: No (preview only, no production deploy without explicit approval)
Production verification: N/A
Report destination: reports/current/
