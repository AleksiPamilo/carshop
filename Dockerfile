# Build stage
FROM node:20.10.0-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

COPY .env.production .env

RUN npm run build

# Production stage
FROM node:20.10.0-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma/

RUN npm ci --only=production

EXPOSE 3000

CMD npx prisma generate && npm start