# Lil Man Big Van website

React + Vite + react-three-fiber (3D) marketing site for **Flooring For All LLC, DBA Lil Man Big Van** (Winston-Salem, NC).

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build in /dist
npm run preview    # preview the build
```

## Before going live

1. **Forms**: copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` to a form service URL (Formspree, Getform, etc.). Until it is set, submissions are not sent anywhere.
2. **Domain**: replace `https://www.example.com/` in `index.html` (canonical link) and `public/robots.txt`.
3. **Reviews**: the three review cards are labelled placeholders. Replace them in `src/components/Closing.jsx` once real reviews exist.
4. **Photos**: the site uses 3D scenes instead of stock photos. Real photos of the truck, van and finished floors can be added later.
5. **Contact details**: phones and emails live in `src/data/site.js`.

## Structure

- `src/data/site.js` – all copy, contact details, form fields
- `src/components/` – page sections
- `src/three/` – 3D scenes (hero, flooring scroll story, freight road) and vehicle models
- `src/styles.css` – design system and layout
