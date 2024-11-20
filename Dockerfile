# Step 1: Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# next build를 standalone 모드로 생성
# RUN npm run build
# 6. 빌드 캐시를 제거하고 Next.js 빌드 실행
RUN npm run build --no-cache

# Step 2: Production Stage
FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --production

# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 포트를 3030으로 설정
ENV PORT=3030

EXPOSE 3030

CMD ["node", "server.js"]