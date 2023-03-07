/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['127.0.0.1'],
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
