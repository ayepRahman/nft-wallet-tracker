/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "d1iczm3wxxz9zd.cloudfront.net",
      "lh3.googleusercontent.com",
      "ikzttp.mypinata.cloud",
      "ipfs.io",
      "mintable.infura-ipfs.io",
      "mintable.infura-ipfs.io",
      "api.mpunks.org",
      "tokens.mathcastles.xyz",
      "nft-cdn.alchemy.com",
    ],
  },
};

module.exports = nextConfig;
