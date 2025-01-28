/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'biloniya.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'biloniya.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'biloniya.s3.us-east-1.amazonaws.comuploads',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.hbs$/,
      use: 'handlebars-loader',
    })

    return config
  },
}

export default nextConfig