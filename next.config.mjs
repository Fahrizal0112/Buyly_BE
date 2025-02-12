/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/v1/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "http://localhost:3000:path*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version"
                    }
                ]
            }
        ]
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
          },
          {
            protocol: 'http',
            hostname: '**', 
          }
        ],
      },
      async rewrites() {
        return [
          {
            source: '/api/v1/:path*',
            destination: 'http://localhost:3000:path*',
          },
        ]
      },
}

export default nextConfig;
