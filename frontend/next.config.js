/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["arc4"],
  },
};

module.exports = withNextIntl(nextConfig);
