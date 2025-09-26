# Movie Finder (TP3)

A minimal React app that searches OMDB, shows a list, and displays details. Includes favorites, pagination, filters, and theme toggle.

## Setup

1. Clone the repo  
2. Create `.env` from `.env.example` and put your key: VITE_OMDB_API_KEY=YOUR_REAL_KEY
3. Install and run

```bash
npm install
npm run dev
```
Scripts
```bash
npm run dev – start the Vite dev server
npm run build – production build
npm run preview – preview the build
```

Notes
Do not commit your real API key.
OMDB returns 10 results per page. Use the pagination controls to navigate.
Favorites are stored in localStorage under the key favorites.