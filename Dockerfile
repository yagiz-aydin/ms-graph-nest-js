# Base stage
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build argument to specify which app to build
ARG APP_NAME
RUN npx nest build ${APP_NAME}

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built application
ARG APP_NAME
COPY --from=builder --chown=nestjs:nodejs /app/dist/apps/${APP_NAME} ./dist

USER nestjs

EXPOSE 3000

CMD ["node", "dist/main"]
