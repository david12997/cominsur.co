import Nav from '@/components/nav/nav'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/footer'
import NextTopLoader from 'nextjs-toploader';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://cominsur.co/'),
  title: 'Cominsur - Importadores mayoristas de perfilería en aluminio sistemas estructurales y arquitectónicos',
  description: 'Proveedor mayorista de perfilería en aluminio sistemas estructurales y arquitectónicos para la construcción, con más de 30 años de experiencia en el mercado colombiano.',
  keywords:'aluminio, perfileria en aluminio, sistemas estructurales, sistemas arquitectonicos, sillar cabezal 3831, jamba proyectante 3831, silar 744, traslape 744, jamba cuerpo fijo 3825, enganche sencillo 3825, cabezal marco 7038, sillar marco 7038, enganche 5020, traslape 5020, sistemas de fachada, sistemas de ventaneria, sistemas de puertas, sistemas de divisiones, sistemas de barandas, sistemas de pasamanos, sistemas de cielo raso, sistemas de cubiertas, sistemas de fachadas flotantes, sistemas de fachadas estructurales, sistemas de fachadas semi estructurales, sistemas de fachadas',
  openGraph:{
    type: 'website',
    locale: 'es_CO',
    url: 'https://cominsur.co/',
    siteName: 'Cominsur',
    title: 'Cominsur - Importadores mayoristas de perfilería en aluminio sistemas estructurales y arquitectónicos',
    description: 'Proveedor mayorista de perfilería en aluminio sistemas estructurales y arquitectónicos para la construcción, con más de 30 años de experiencia en el mercado colombiano.',
    countryName: 'Colombia',
    images:[
      {
        url: '/cominsur-big.webp',
        width: 1200,
        height: 630,
      },
      {
        url: '/cominsur-medium.webp',
        width: 800,
        height: 420,
      },
      {
        url: '/cominsur-small.webp',
        width: 600,
        height: 315,
      }
    ]
    
  },
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className + ` w-screen h-screen`}>
        <NextTopLoader
          color="#4a0083"
          height={9}
          showSpinner={true}
          crawlSpeed={200}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
