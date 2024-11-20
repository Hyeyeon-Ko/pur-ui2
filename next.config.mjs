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
};

export default nextConfig;
