/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/react", "bcryptjs"],
        serverActions: true,
    }
}

module.exports = nextConfig
