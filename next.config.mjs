/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["files.edgestore.dev", "img.clerk.com"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/",
      },
      {
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "x-custom-header",
            value: "my custom header value",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "x-custom-header",
            value: "my custom header value",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
