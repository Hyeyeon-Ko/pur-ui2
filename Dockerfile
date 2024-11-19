# Step 1: Build Stage
FROM node:18.17.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# next build를 standalone 모드로 생성
# RUN npm run build
RUN NEXT_DEBUG=true npm run build

# Step 2: Production Stage
FROM node:18.17.0-alpine

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN npm install --production

# 포트를 3030으로 설정
ENV PORT=3030

EXPOSE 3030

CMD ["node", "server.js"]