/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.telegram.org",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "image.nftscan.com",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "**.unioverse.com",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "**.mypinata.cloud",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "**.sandbox.game",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "**.artblocks.io",
        pathname: '**',
      }
    ]
  }
};

export default nextConfig;
