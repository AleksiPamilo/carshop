/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "carshop-imgs.s3.amazonaws.com",
                port: ""
            }
        ]
    }
}

module.exports = nextConfig
