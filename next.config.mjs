/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files.edgestore.dev", "img.clerk.com"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },
  async headers() {
    return [
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
