/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://api-test-nu-inky.vercel.app"
        : "http://localhost:8000",
  },
};

export default nextConfig;
