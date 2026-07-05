const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/v1/uploads/**",
      },
    ],
  },
};

export default nextConfig;