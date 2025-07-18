import { Oswald, Sora } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import QueryProvider from '@/providers/QueryProvider';

const oswald = Oswald({
  variable: '--oswald',
  subsets: ['latin'],
});

const sora = Sora({
  variable: '--sora',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${sora.className} ${oswald.className}  antialiased `}
        suppressHydrationWarning
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
