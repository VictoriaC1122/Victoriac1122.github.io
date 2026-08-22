# Rotary Yearbook Site

## Structure

- `index.html`: main homepage
- `activities.html`: source file for the activities page
- `leaders.html`: source file for the leaders page
- `activities/index.html`: synced copy for `/activities/`
- `leaders/index.html`: synced copy for `/leaders/`
- `handbook.html`: source file for the handbook page
- `handbook/index.html`: synced copy for `/handbook/`
- `activity-data.js`: event content and derived archive metadata
- `script.js`: timeline rendering and interactions
- `styles.css`: shared site styles

## Maintenance Notes

- Edit `activities.html`, `leaders.html`, and `handbook.html` first.
- After updating those pages, run `node tools/sync-route-pages.mjs` to refresh the route copies.
- Keep event content in `activity-data.js`, and keep DOM rendering and interactions in `script.js`.

## Lightweight Checks

- `node --check activity-data.js`
- `node --check script.js`
- `node tools/check-i18n.mjs`
- `node tools/smoke-i18n-runtime.mjs`
- `node tools/smoke-script-no-modal.mjs`
- `node tools/sync-route-pages.mjs`
