/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use a custom output directory to avoid local .next file lock collisions.
  distDir: "build",
};

export default nextConfig;
