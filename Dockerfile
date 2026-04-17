FROM node:20-bookworm-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build

ARG REACT_APP_API_ORIGIN
ENV REACT_APP_API_ORIGIN=$REACT_APP_API_ORIGIN

COPY public ./public
COPY src ./src
COPY .eslintrc.js ./
RUN npm run build

FROM node:20-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/build ./build
COPY server.js ./server.js

USER node

EXPOSE 5000

CMD ["node", "server.js"]
