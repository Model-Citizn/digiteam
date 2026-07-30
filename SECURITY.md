# Security hardening — Digital Team landing

## What's in place

- **URL sanitizing (app-compiled.js).** The Calendly, Stripe and email values are editable via the Tweaks panel and persist in localStorage. They're now passed through `dtSafeHttpsUrl` / `dtSafeMailto` before being used as `href`s — only `https:` URLs and well-formed email addresses go through; `javascript:`, `data:` or malformed values fall back to `#`. This closes the stored-XSS vector.
- **`rel="noopener noreferrer"`** on all `target="_blank"` links (tabnabbing protection).
- **CSP meta tag** in `index.html`: scripts only from self + the two pinned CDNs; no plugins (`object-src 'none'`); no form submission targets; `base-uri` locked. (The meta version is deliberately looser — `unsafe-inline`/`unsafe-eval` — so preview/editing tooling keeps working; the strict policy lives in `_headers`.)
- **Referrer policy**: `strict-origin-when-cross-origin`.
- **Subresource Integrity** on the React/ReactDOM CDN scripts (pinned versions + SHA-384 hashes).
- **`_headers` file** (Netlify / Cloudflare Pages format) with the production-grade header set: HSTS, nosniff, frame-ancestors 'none', Permissions-Policy, COOP, and a strict CSP without `unsafe-eval` or inline scripts.

## If you deploy elsewhere, set these headers

nginx example:

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdn.tailwindcss.com https://unpkg.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests" always;
```

## Production changes applied (July 2026)

1. **Tailwind Play CDN removed.** Replaced with a pre-compiled `css/tailwind.css` containing only the utilities the page actually uses. `cdn.tailwindcss.com` dropped from CSP allowlist.
2. **React production builds.** Swapped `react.development.js` / `react-dom.development.js` → `react.production.min.js` / `react-dom.production.min.js` — smaller payload, no dev-mode internals exposed.
3. **CSP tightened.** Removed `unsafe-eval`, `blob:`, and `cdn.tailwindcss.com` from both the meta tag and `_headers`.

## Remaining recommendations

1. Serve over **HTTPS only** with the HSTS header above.
2. For maximum supply-chain security, self-host the React production builds instead of loading from unpkg, and remove `https://unpkg.com` from the CSP.
