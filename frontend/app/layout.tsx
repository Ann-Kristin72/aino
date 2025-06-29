import './globals.css'
import { Inter } from 'next/font/google'
import Providers from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aino CMS',
  description: 'AI-drevet plattform for kvalitetssikring og kunnskapsdeling',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
