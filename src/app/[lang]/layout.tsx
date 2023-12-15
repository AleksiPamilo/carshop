import { NextAuthProvider } from '@components/context/SessionProvider';
import { Inter } from 'next/font/google';
import Navigation from '@components/Navigation';
import { getDictionary } from '../../../get-dictionary';
import { i18n, Locale } from '@/../i18n-config';
import './globals.css';
import { IDictionary } from '@/interfaces/dictionary';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
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
  const dictionary = await getDictionary(lang) as unknown as IDictionary;

  return (
    <html lang={lang}>
      <body className={`${inter.className} bg-light-primary text-black dark:text-white dark:bg-dark-primary`}>
        <NextAuthProvider>
          <Navigation dictionary={dictionary} />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
