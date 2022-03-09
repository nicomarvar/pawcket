/** @type {import('next').NextConfig} */ const withPWA = require("next-pwa");
const nextConfig = { reactStrictMode: true };
module.exports = nextConfig;
module.exports = withPWA({
   pwa: {
      dest: "public",
      register: true,
      disable: process.env.NODE_ENV === "development",
   },
});
module.exports = {
   images: {
      domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
   },
};
