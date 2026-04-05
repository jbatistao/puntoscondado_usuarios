FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
# Declare build arguments passed by Coolify
ARG COOLIFY_URL
ARG COOLIFY_FQDN
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_SECRET_KEY
ARG AUTH_SECRET
ARG SERVICE_FQDN_FRONTEND
ARG SERVICE_URL_FRONTEND
ARG NEXTAUTH_URL

# Set them as environment variables for build time
ENV COOLIFY_URL=$COOLIFY_URL
ENV COOLIFY_FQDN=$COOLIFY_FQDN
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET_KEY=$NEXTAUTH_SECRET_KEY
ENV AUTH_SECRET=$AUTH_SECRET
ENV SERVICE_FQDN_FRONTEND=$SERVICE_FQDN_FRONTEND
ENV SERVICE_URL_FRONTEND=$SERVICE_URL_FRONTEND
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Skip linting if needed (optional, but better to fix them)
# ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
