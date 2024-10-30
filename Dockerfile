# Step 1: Build Stage
FROM node:18.17.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# next build를 standalone 모드로 생성
RUN npm run build

# Step 2: Production Stage
FROM node:18.17.0-alpine

WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3030

CMD ["node", ".next/standalone/server.js"]