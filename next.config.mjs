/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone 모드 활성화
  output: "standalone",
  
  // Webpack 설정
  webpack: (config, { isServer }) => {
    // 클라이언트와 서버 빌드에서 각각 설정
    if (!isServer) {
      // 클라이언트 청크 분리 설정
      config.optimization.splitChunks = {
        chunks: "all",      // 모든 청크에 대해 분리
        minSize: 10000,     // 최소 청크 크기 10KB
        minChunks: 1,       // 최소 1개의 파일에서만 사용되더라도 분리
      };
    }

    // JSON 파일 처리 명시적 추가 (필요 시)
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });

    return config;
  },

  // React Strict Mode 활성화 (디버깅 및 성능 개선)
  reactStrictMode: true,

  // 환경 변수 (필요한 경우)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  },
};

export default nextConfig;
