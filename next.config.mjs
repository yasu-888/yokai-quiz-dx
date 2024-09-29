/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/yokai-quiz-dx" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/yokai-quiz-dx" : "",
};

export default nextConfig;
