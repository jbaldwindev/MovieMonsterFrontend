# Movie Monster Frontend

Movie Monster is a React frontend for browsing movies, managing personal movie lists, rating and commenting on films, maintaining favorites, and connecting with friends. The application talks to a backend API for authentication, movie data, user profiles, friend requests, favorites, comments, ratings, and uploaded profile images.

## Features

- User registration, login, logout, and session validation
- Protected app routes with authenticated user context
- Dashboard views for popular, top-rated, and currently playing movies
- Movie search, movie detail pages, ratings, comments, and comment likes
- Personal and public user movie lists
- Favorites management with ranked favorites
- User profiles, bios, profile image upload, and account settings
- Friend discovery, requests, accepted friends, cancellation, and unfriending

## Tech Stack

- React 18
- React Router 6
- Axios
- Bootstrap and React Bootstrap
- Font Awesome React icons
- Create React App build tooling
- Express static server for production hosting
- Docker support for local homelab deployment
- GitHub Actions CI support

## Requirements

- Node.js 20 recommended
- npm
- A running Movie Monster backend API

The GitHub Actions workflow builds the project with Node.js 20, so using the same major version locally is recommended.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.development.local.example .env.development.local
```

Set the backend API origin in `.env.development.local`:

```bash
REACT_APP_API_ORIGIN=http://localhost:8080
```

Start the development server:

```bash
npm start
```

The app will run at `http://localhost:3000` by default.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `REACT_APP_API_ORIGIN` | Local development: yes | Backend origin used to build API and asset URLs. Example: `http://localhost:8080`. |
| `PORT` | Production only | Port used by `server.js`. Defaults to `5000`. |

When `REACT_APP_API_ORIGIN` is set, API requests are sent to `${REACT_APP_API_ORIGIN}/api`. When it is not set, API requests use the relative `/api` path, which is useful when the frontend and backend are served behind the same origin or reverse proxy.

## Available Scripts

```bash
npm start
```

Runs the app in development mode with Create React App.

```bash
npm run build
```

Builds the optimized production bundle into `build/`.

```bash
npm run start:prod
```

Serves the production build with the Express server in `server.js`.

## Production Deployment

This project is no longer hosted on Heroku. Production builds are intended to run locally on homelab infrastructure, typically as a Docker container behind a local reverse proxy.

The production server:

- Serves static files from `build/`
- Falls back to `index.html` for client-side routes
- Redirects HTTP to HTTPS when `NODE_ENV=production` and the request arrives through a proxy with `x-forwarded-proto: http`

### Local Homelab Docker Deployment

Build the frontend image with the backend API origin used by your homelab:

```bash
docker build \
  --build-arg REACT_APP_API_ORIGIN=https://api.your-homelab.example \
  -t moviemonster-frontend .
```

Run the container locally:

```bash
docker run -p 5000:5000 moviemonster-frontend
```

For a persistent homelab deployment, publish port `5000` to your preferred internal host port or route it through your reverse proxy. Set `REACT_APP_API_ORIGIN` at image build time unless the frontend and backend are served behind the same origin, in which case the app can use relative `/api` requests.

### Local Production Run Without Docker

You can also build and serve the production bundle directly on a homelab host:

```bash
npm ci
npm run build
PORT=5000 npm run start:prod
```

## Project Structure

```text
src/
  Assets/        Static image assets used by the React app
  Components/    Route views and reusable UI components
  Context/       React context providers
  Services/      API service wrappers
  Styles/        Component-specific CSS
  config/        Runtime API URL helpers
  utils/         Shared utility functions
server.js        Express production server
Dockerfile       Multi-stage production Docker build
Procfile         Legacy process definition; not used for homelab deployment
```

## API Integration

API calls are centralized through `src/Services/AxiosSetup.js`. The Axios client:

- Uses `API_BASE_URL` from `src/config/api.js`
- Sends credentials with requests for cookie-based authentication
- Attempts token/session refresh on eligible `401` responses
- Redirects users to `/login` when refresh fails

Service-specific API methods live in:

- `src/Services/AuthService.js`
- `src/Services/MovieService.js`
- `src/Services/UserService.js`

## CI

GitHub Actions runs on pushes, pull requests, and manual dispatches. The workflow:

- Installs dependencies with `npm ci`
- Builds the React frontend
- Builds the Docker image
- Pushes Docker tags on pushes to `main` when Docker Hub credentials are configured

## Notes for Contributors

- Keep API access inside service modules where possible.
- Keep route-level views in `src/Components/`.
- Use `src/config/api.js` helpers for API and backend-hosted asset URLs.
- Do not commit local `.env` files.
