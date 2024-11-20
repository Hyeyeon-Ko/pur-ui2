/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 10000,
        minChunks: 1,
      };
    }

    // JSON 파일 로더 명시적 추가
    config.module.rules.push({
      test: /\.json$/,
      loader: "json-loader",
      type: "javascript/auto", // JSON 파일을 JS 모듈처럼 처리
    });

    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
