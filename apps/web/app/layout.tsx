import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

// Load only the essential font weights for initial render
const customFont = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
     {
      path: '../public/fonts/Satoshi-Regular.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
  display: 'swap', // Use 'swap' for better performance
  preload: true,   // Preload the font files
});


export const metadata: Metadata = {
  title: "Gym Notebook AI",
  description: "Your notebook for the gym - just your notes to track and improve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${customFont.variable} antialiased`}
        >
        {children}
      </body>
    </html>
  );
}

