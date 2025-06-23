# ---- Base ----
FROM node:20-slim AS base
WORKDIR /app
RUN npm install -g pnpm

# ---- Dependencies ----
FROM base AS dependencies
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY tsconfig.json ./
COPY turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/db-types/package.json ./packages/db-types/

RUN pnpm install --frozen-lockfile --prod

# ---- Build ----
FROM base AS build
ARG TURBO_TEAM
ARG TURBO_TOKEN
COPY --from=dependencies /app /app
COPY . .
RUN pnpm build --filter=backend

# ---- Production ----
FROM base AS production
COPY --from=build /app/apps/backend/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/apps/backend/package.json /app/package.json

WORKDIR /app
CMD ["node", "dist/index.js"] 