/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  // output: process.env.NODE_ENV === 'production' ? 'export' : 'standalone',
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  reactStrictMode: false,
  i18n,

  redirects: () => {
    return [
      // {
      //   source: '/',
      //   destination: '/dashboard',
      //   permanent: false,
      // },
    ]
  },
  async rewrites() {
    if (process.env.NODE_ENV === 'production') return []

    return [
      // {
      //   source: '/api/:path*',
      //   destination: `${process.env.NEXT_PUBLIC_API_HOST}/:path*`,
      // },
    ]
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [{ loader: '@svgr/webpack', options: { icon: 24 } }],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

module.exports = nextConfig
