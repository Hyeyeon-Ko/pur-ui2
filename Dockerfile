# 단계 1: 빌드 단계
FROM node:18.17.0-alpine as builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치를 위한 패키지 파일 복사
COPY package.json package-lock.json ./

# 패키지 설치
RUN npm ci

# 소스 코드 복사
COPY . ./

# NestJS 프로젝트 빌드
RUN npm run build

# Step 2: Production Stage
# 경량화된 Nginx 이미지로 설정
FROM nginx:alpine

# Nginx 설정 파일 복사 (nginx.conf를 프로젝트에 맞게 설정)
COPY nginx.conf /etc/nginx/nginx.conf

# Nginx에서 서빙할 빌드된 파일들 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 포트 설정 (필요 시 수정 가능)
EXPOSE 3030

# 컨테이너 실행 시 Nginx 시작
CMD ["nginx", "-g", "daemon off;"]