import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 blocks dev-server scripts when the site is opened from any
  // address other than "localhost" (e.g. http://127.0.0.1:3000 or your LAN IP
  // on a phone). Without the scripts the page renders but nothing is
  // clickable. Allow loopback + private network ranges in development.
  allowedDevOrigins: ["127.0.0.1", "192.168.*.*", "10.*.*.*", "172.*.*.*"],
};

export default nextConfig;
