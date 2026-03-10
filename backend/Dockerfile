FROM node:20-slim

WORKDIR /app

# Install dependencies for native modules (better-sqlite3)
RUN apt-get update -y && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy dependency manifests
COPY package.json package-lock.json ./

# Copy Prisma schema for generate
COPY prisma ./prisma/

# Install dependencies (no dev for production image)
RUN npm ci --omit=dev

# Generate Prisma client
RUN npx prisma generate

# Copy application code
COPY . .

# Default: SQLite file in /data so it can be mounted as a volume
ENV DATABASE_URL="file:/data/dev.db"
ENV NODE_ENV=production

RUN mkdir -p /data

EXPOSE 8080

CMD ["node", "app.js"]
