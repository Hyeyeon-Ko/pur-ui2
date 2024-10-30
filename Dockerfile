# 단계 1: 빌드 단계
FROM node:18.17.0-alpine as builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치 및 빌드 과정
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Production Stage
# 경량화된 Nginx 이미지로 설정
FROM nginx:alpine

# Nginx 설정 파일 복사 (nginx.conf를 프로젝트에 맞게 설정)
COPY nginx.conf /etc/nginx/nginx.conf

# .next 디렉터리의 빌드 파일을 Nginx에 복사
COPY --from=builder /app/.next /usr/share/nginx/html

# 포트 설정 (필요 시 수정 가능)
EXPOSE 3030

# 컨테이너 실행 시 Nginx 시작
CMD ["nginx", "-g", "daemon off;"]