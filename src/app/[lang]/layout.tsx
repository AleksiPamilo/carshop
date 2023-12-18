import { DictionaryProvider, useDictionary } from '@components/context/DictionaryContext';
import { NextAuthProvider } from '@components/context/SessionProvider';
import { Inter } from 'next/font/google';
import Navigation from '@components/Navigation';
import { localeConfig, Locale } from '../../../locale-config';
import './globals.css';
import { Toaster } from 'sonner';
import { getDictionary } from '@/../get-dictionary';
const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return localeConfig.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
  title: 'Car Shop',
  description: 'Created With Next.js, Prisma, NextAuth.js and MySQL',
  icons: {
    favicon: '/favicon.ico',
  }
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${inter.className} bg-light-primary text-black dark:text-white dark:bg-dark-primary`}>
        <NextAuthProvider>
          <DictionaryProvider dictionary={dictionary}>
            <Toaster richColors theme="dark" />
            <Navigation dictionary={dictionary} />
            {children}
          </DictionaryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
