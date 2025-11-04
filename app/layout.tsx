import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/globals.css';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StanfordXR Equipment Loaning",
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='h-full'>
      <body className={cn('h-full', inter.className)}>
        <main className='h-full'>
          {children}
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
