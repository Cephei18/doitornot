/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep defaults so Vercel picks up .next output automatically.
  async redirects() {
    return [
      {
        source: "/.well-known/farcaster.json",
        destination:
          "https://api.farcaster.xyz/miniapps/hosted-manifest/019d48ca-6b23-5935-c634-3230c9f0c41d",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
