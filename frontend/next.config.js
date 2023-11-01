/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  externals: [
    {
      arc4: "arc4", // This maps the 'arc4' dependency to 'arc4' as an external module
    },
  ],
};

module.exports = withNextIntl(nextConfig);
