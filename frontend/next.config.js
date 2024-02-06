/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["arc4"],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/login",
        permanent: true,
        locale: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
