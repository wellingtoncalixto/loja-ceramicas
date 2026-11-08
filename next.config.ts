import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Impede que `next dev` escreva no AGENTS.md da equipe.
  agentRules: false,
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
