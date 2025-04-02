const nextConfig = {
  experimental: {
    optimizePackageImports: ['axios', '@mui/icons-material'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
