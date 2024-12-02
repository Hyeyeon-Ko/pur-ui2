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
    return config;
  },
  reactStrictMode: true,
  env: {
    BASE_LOCAL_URL: process.env.BASE_LOCAL_URL || "http://localhost:10024",
  },
};

export default nextConfig;
