# Rotary Yearbook Site

## Structure

- `index.html`: homepage entry
- `activities.html`: canonical activities page source
- `leaders.html`: canonical leaders page source
- `activities/index.html`: route copy for `/activities/`
- `leaders/index.html`: route copy for `/leaders/`
- `activity-data.js`: activity archive data and derived filter metadata
- `script.js`: activities page rendering and interaction controller
- `styles.css`: shared site styles

## Maintenance Notes

- Keep `activities.html` and `leaders.html` as the editable source pages.
- Run `node site/tools/sync-route-pages.mjs` after editing those canonical pages to refresh the directory-based route copies.
- `activity-data.js` contains event content only; `script.js` should stay focused on DOM rendering and interactions.

## Lightweight Checks

- `node --check site/activity-data.js`
- `node --check site/script.js`
- `node site/tools/sync-route-pages.mjs`
