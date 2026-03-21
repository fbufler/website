# ── builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

COPY .npmrc package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ── runner ─────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

COPY --from=builder /app/.output /app/.output

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
