/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingIncludes: {
      "/public/**": ["./public/**/*"], // 'public' 디렉토리를 명시적으로 포함
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000, // 최소 100B 이상의 청크만 분리, default: 20KB
        minChunks: 2, // 최소 2개 이상의 파일에서 사용될 때만 청크로 분리
      };
    }
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
