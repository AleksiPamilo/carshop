/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/react", "bcryptjs"],
    }
}

module.exports = nextConfig
