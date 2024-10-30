/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 정적 파일 생성을 위한 설정 추가
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
      };
    }
    return config;
  },
};

export default nextConfig;
