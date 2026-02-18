import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

export const metadata: Metadata = {
  title: 'Urban Harvest Cafe',
  description: 'Artisan Eats. Locally Sourced. Served with Love.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

import OrderReadyToast from "@/components/notification/OrderReadyToast";

import { getCustomerSession } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCustomerSession();

  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} font-sans bg-cream text-espresso`}>
        {children}
        <OrderReadyToast customerId={session?.id} />
        <footer className="bg-white border-t py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="font-bold text-espresso">Urban Harvest Cafe &copy; {new Date().getFullYear()}</p>
            <div className="flex justify-center gap-4 mt-2 text-sm text-espresso/80">
              <p><a href="tel:+8801234567890" className="hover:text-sage">+880 1234-567890</a> | <a href="mailto:urbanharvest.cafe@gmail.com" className="hover:text-sage">urbanharvest.cafe@gmail.com</a></p>
            </div>
            <p className="text-xs text-espresso/60 mt-4">
              Designed & Developed by <a href="https://whoisalfaz.me" target="_blank" className="text-espresso font-bold hover:underline">Alfaz Mahmud Rizve</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
