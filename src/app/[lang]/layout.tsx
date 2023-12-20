import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/context/ThemeProvider'
import Navigation from '@/components/Navigation'
import { DictionaryProvider } from '@/components/context/DictionaryProvider'
import { Locale } from '@/../locale-config'
import { getDictionary } from '@/utils/get-dictionary';
import SearchCar from '@/components/SearchCar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Car Shop',
  description: 'Created With Next.js, Prisma, NextAuth.js and MySQL',
  icons: {
    favicon: '/assets/favicon.ico',
  }
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang);

  return (
    <html lang="en">
      <body className={inter.className}>
        <DictionaryProvider dictionary={dictionary}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <SearchCar />
            {children}
          </ThemeProvider>
        </DictionaryProvider>
      </body>
    </html>
  )
}
