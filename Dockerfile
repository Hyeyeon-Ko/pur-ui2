# 단계 1: 빌드 단계
FROM node:18.17.0-alpine as build

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치를 위한 패키지 파일 복사
COPY package.json package-lock.json ./

# 패키지 설치
RUN npm ci

# 소스 코드 복사
COPY . ./

# 애플리케이션 빌드
RUN npm run build

# 단계 2: 프로덕션 단계
FROM node:18.17.0-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 애플리케이션을 복사
COPY --from=build /app ./

# Next.js 포트 설정
EXPOSE 3030

# Next.js 서버 실행 (포트를 3030으로 설정)
ENV PORT=3030
CMD ["npm", "run", "start"]
