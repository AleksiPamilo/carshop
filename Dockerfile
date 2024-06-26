# Build stage
FROM node:20.10.0-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

COPY .env .env

RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20.10.0-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma/
COPY --from=build /app/.env ./.env.production

RUN npm ci --only=production
RUN npm install -g prisma

EXPOSE 3000

CMD ["npm", "start"]
