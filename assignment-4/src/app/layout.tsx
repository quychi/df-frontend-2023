import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'
import { BookStoreProvider } from './_stores/bookStore'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex justify-center items-center flex-col`}
      >
        <main className="w-full h-full max-w-7xl">
          <Header />
          <BookStoreProvider>
            <main className="h-[calc(100%-50px-80px)] py-5 px-2.5 bg-gray-cultured">
              {children}
            </main>
          </BookStoreProvider>
          <Footer />
        </main>
      </body>
    </html>
  )
}
