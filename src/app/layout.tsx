import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import './globals.css'
import NavBar from '@/shared/widgets/NavBar'
import Footer from '@/shared/widgets/Footer'

const promptFont = Prompt({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
   title: {
      default: 'พรรคคนไทย',
      template: 'พรรคคนไทย | %s',
   },
   description: 'พรรคคนไทย',
   icons: {
    icon: [
      { url: '/images/logo-project-purple.svg', media: '(prefers-color-scheme: light)' },
      { url: '/images/logo-project-white.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="th">
         <head>
            {/* ✅ โหลด CSS ของ Leaflet และ Fullscreen จาก CDN */}
            <link
               rel="stylesheet"
               href="https://unpkg.com/leaflet.fullscreen/Control.FullScreen.css"
            />
         </head>
         <body className={`${promptFont.className} antialiased`}>
            <div className="">
               <NavBar />
               {children}
               <Footer />
            </div>
         </body>
      </html>
   )
}
