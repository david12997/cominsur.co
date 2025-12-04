# Multi-stage Dockerfile for production Next.js (App Router)
# - Stage 1: install dependencies
# - Stage 2: build the app
# - Stage 3: minimal runtime image

########################################
#  Stage: deps
########################################
FROM node:20-alpine AS deps
WORKDIR /app

# Install build tools for some native deps (if necessary)
RUN apk add --no-cache python3 make g++

# Copy package manifests first for cached installs
COPY package.json package-lock.json* ./

# Use npm ci when package-lock present, fallback to npm install
RUN if [ -f package-lock.json ]; then \
      npm ci --production=false --legacy-peer-deps; \
    else \
      npm install --legacy-peer-deps; \
    fi

########################################
#  Stage: builder
########################################
FROM node:20-alpine AS builder
WORKDIR /app

# Copy node_modules from deps stage to keep cache
COPY --from=deps /app/node_modules ./node_modules

# Copy app sources
COPY . .

# Build the Next.js app
ENV NODE_ENV=production
RUN npm run build

########################################
#  Stage: runner
########################################
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user to run the app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the files needed to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Ensure correct ownership
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/_next/static || exit 1

CMD ["npm", "run", "start"]
