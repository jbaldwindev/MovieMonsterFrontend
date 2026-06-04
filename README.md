## Local development

The frontend now supports a proper local development flow while keeping production deployment separate.

1. Install dependencies:
`npm install`

2. Create a local env file from the example:
`cp .env.development.local.example .env.development.local`

3. Set `REACT_APP_API_ORIGIN` in `.env.development.local` to your local backend origin.
Example:
`REACT_APP_API_ORIGIN=http://localhost:8080`

4. Run the frontend locally:
`npm start`

## Production deployment

- `npm run build` builds the frontend bundle.
- `npm run start:prod` serves the built bundle through `server.js`.
- `Procfile` keeps Heroku pointed at the production server entrypoint.
