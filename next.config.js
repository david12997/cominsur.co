/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname:'cms.cominsur.co',
                pathname:'/cominsur/assets/**'
            }
        ]
    }
}

module.exports = nextConfig
