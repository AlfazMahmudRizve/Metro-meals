import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'Metro Meals',
  description: 'Cheesy. Spicy. Ready in 15 mins.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunito.variable} font-sans bg-plate`}>
        {children}
        <footer className="bg-white border-t py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="font-bold text-gray-900">Metro Meals &copy; {new Date().getFullYear()}</p>
            <p className="text-gray-500 text-sm mt-2">
              Designed & Developed by <a href="https://whoisalfaz.me" target="_blank" className="text-metro font-bold hover:underline">Alfaz Mahmud Rizve</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
