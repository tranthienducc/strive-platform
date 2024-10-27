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
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/",
        },
      ],
      afterFiles: [
        {
          source: "/:path*",
          destination: "/:path*",
        },
      ],
    };
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
