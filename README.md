# Project Backend

Production-ready Express (ES Modules) backend, structured for a clean
separation of routes, controllers, services, and middleware, and ready
to deploy to Render directly from GitHub.

This backend is intentionally left with **placeholder service methods**
(see `src/services/main.service.js`). Wire those up to whatever
officially-sanctioned / authorized APIs your integration requires.
No scraping, credential harvesting, or platform-security bypass logic
is included or should be added here.

## Folder Structure

```
project-root/
├── package.json
├── .env.example
├── .gitignore
├── render.yaml
├── README.md
└── src/
    ├── server.js
    ├── app.js
    ├── config/
    │   └── index.js
    ├── routes/
    │   ├── index.js
    │   └── api.routes.js
    ├── controllers/
    │   └── api.controller.js
    ├── services/
    │   └── main.service.js
    ├── middleware/
    │   ├── security.js
    │   ├── errorHandler.js
    │   └── validate.js
    └── utils/
        └── logger.js
```

## Installation

```bash
npm install
```

Copy the environment template and fill in real values:

```bash
cp .env.example .env
```

## Running locally

```bash
npm start
```

or, for auto-restart on file changes:

```bash
npm run dev
```

The server starts on `http://localhost:3000` by default. Check it's alive:

```bash
curl http://localhost:3000/api/health
```

## Connecting your existing frontend

Point your frontend's fetch/XHR calls at this backend's base URL
(e.g. `https://your-service.onrender.com/api/...`), and make sure
`CORS_ORIGIN` in your environment matches the domain the frontend is
served from.

## Uploading to GitHub

```bash
git init
git add .
git commit -m "Initial backend"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploying to Render

1. Go to https://dashboard.render.com and click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Render will detect `render.yaml` automatically (Blueprint), or you can
   configure manually:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables from `.env.example` in the Render dashboard
   (under **Environment**).
5. Deploy. Render will install dependencies and start the server.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |
| `NODE_ENV` | `development` or `production` | `development` |
| `CORS_ORIGIN` | Allowed origin(s) for CORS, comma-separated or `*` | `*` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | `60000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window per IP | `100` |

## Next Steps

Fill in `src/services/main.service.js` with your actual business logic,
using only official APIs / authorized integrations for any third-party
data source. Add real request-body schemas in `src/middleware/validate.js`
as your API surface grows.
