import './globals.css'
import { Inter, Roboto_Slab } from 'next/font/google'
import Providers from "./providers";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const slab = Roboto_Slab({ subsets: ['latin'], variable: '--font-slab' })

export const metadata = {
  title: 'Aino CMS',
  description: 'En rolig skriveopplevelse med kaffe i hånda ☕',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${inter.variable} ${slab.variable}`}>
      <body className="bg-latte text-skifer font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
