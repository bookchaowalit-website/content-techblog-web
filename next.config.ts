import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  // /api/mcp is called cross-origin from bookchaowalit-devhub-frontend's
  // Playground. Without this, the browser blocks reading the response
  // even though the route itself works — see devhub's PRODUCT.md.
  async redirects() {
    // The old per-app portfolio list now lives on the main site (permanent: Next answers 308).
    return [{ source: '/more-projects', destination: 'https://bookchaowalit.com/', permanent: true }];
  },
  async headers() {
    return [
      {
        source: '/api/mcp',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig);
