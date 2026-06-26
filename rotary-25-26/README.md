# Rotary Yearbook Site

## Structure

- `index.html`: main homepage
- `activities.html`: source file for the activities page
- `leaders.html`: source file for the leaders page
- `activities/index.html`: synced copy for `/activities/`
- `leaders/index.html`: synced copy for `/leaders/`
- `activity-data.js`: event content and derived archive metadata
- `script.js`: timeline rendering and interactions
- `styles.css`: shared site styles

## Maintenance Notes

- Edit `activities.html` and `leaders.html` first.
- After updating those pages, run `node site/tools/sync-route-pages.mjs` to refresh the `/activities/` and `/leaders/` copies.
- Keep event content in `activity-data.js`, and keep DOM rendering and interactions in `script.js`.

## Lightweight Checks

- `node --check site/activity-data.js`
- `node --check site/script.js`
- `node site/tools/sync-route-pages.mjs`
