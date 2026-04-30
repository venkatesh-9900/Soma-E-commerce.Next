import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });

export const metadata: Metadata = {
  title: 'Soma Farms',
  description: 'Soma Farms - Fresh Mangoes and Fruits',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.variable}>
      <head>
        <link href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
