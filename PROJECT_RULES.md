# SONU Shopify Development Rules

## Project Goal

Build a scalable Shopify theme that is easy for the client to manage.

---

## Important Restrictions

- Never push code automatically.
- Never commit code automatically.
- Never delete files automatically.
- Never modify files without approval.
- Never replace purchased theme functionality without approval.

---

## Theme Update Safety

- Keep purchased theme code intact whenever possible.
- Create custom sections using custom-* naming.
- Create custom snippets using custom-* naming.
- Avoid editing core theme files.

---

## CSS Rules

All custom CSS must go into:

assets/custom.css

Never create multiple custom CSS files.

---

## JavaScript Rules

All custom JS must go into:

assets/custom.js

Never create multiple custom JS files.

---

## Client Requirements

Client must be able to manage:

- Colors
- Typography (Always use text tag selectors like H1-H6, P, Span, Div instead of inline font-size range controls, allowing sizes to be governed globally via settings/stylesheets)
- Buttons
- Spacing

from Shopify Theme Settings.

---

## Analysis Rules

Before modifying code:

1. Analyze full theme.
2. Create report.
3. Wait for approval.

Never make changes directly.

---

## Cleanup Rules

Never delete code automatically.

Create report with:

- Safe to Remove
- Review Required
- Do Not Touch

Only.
