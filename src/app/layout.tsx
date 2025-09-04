import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EasyMyPG - Simplify Your PG Management',
  description: 'Transform your PG and hostel management with EasyMyPG. Say goodbye to manual processes and embrace digital convenience for property owners.',
  keywords: 'PG management, hostel management, property management, tenant management, digital payments',
  authors: [{ name: 'EasyMyPG Team' }],
  openGraph: {
    title: 'EasyMyPG - Simplify Your PG Management',
    description: 'Transform your PG and hostel management with EasyMyPG. Digital solution for property owners.',
    url: 'https://easymypg.com',
    siteName: 'EasyMyPG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyMyPG - Simplify Your PG Management',
    description: 'Transform your PG and hostel management with EasyMyPG.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  )
}