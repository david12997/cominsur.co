import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
      remotePatterns:[
          {
              protocol: 'https',
              hostname:'cms.cominsur.com.co',
              pathname:'/cominsur/assets/**'
          },
          {
              protocol: 'https',
              hostname:'cms.cominsur.co',
              pathname:'/cominsur/assets/**'
          }
      ]
  }
};

export default nextConfig;
