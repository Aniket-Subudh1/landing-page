import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: [
    '100','200','300','400','500','600','700','800','900'
  ],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'EasyMyPG - Simplify Your PG Management',
  description:
    'Transform your PG and hostel management with EasyMyPG. Say goodbye to manual processes and embrace digital convenience for property owners.',
  keywords:
    'PG management, hostel management, property management, tenant management, digital payments',
  authors: [{ name: 'EasyMyPG Team' }],
  openGraph: {
    title: 'EasyMyPG - Simplify Your PG Management',
    description:
      'Transform your PG and hostel management with EasyMyPG. Digital solution for property owners.',
    url: 'https://easymypg.com',
    siteName: 'EasyMyPG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyMyPG - Simplify Your PG Management',
    description: 'Transform your PG and hostel management with EasyMyPG.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.className} bg-white text-gray-900 antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  )
}