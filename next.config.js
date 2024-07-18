/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        domains: ['127.0.0.1'],
    },
    experimental: {
        outputFileTracingIncludes: {
            "/api/users/[id]": ["./app/database/**/*.json"],
        },
    },
    //https://stackoverflow.com/a/74139318
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
            }
        }
    
        return config
    }
}

module.exports = nextConfig
