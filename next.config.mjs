/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 100, // 최소 100B 이상의 청크만 분리, default: 20KB
        minChunks: 2, // 최소 2개 이상의 파일에서 사용될 때만 청크로 분리
      };
    }
    return config;
  },
};

export default nextConfig;
