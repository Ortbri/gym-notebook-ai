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
      weight: '400',
      style: 'normal',
    },
  
  ],
  variable: '--font-custom',
  display: 'swap', // Use 'swap' for better performance
  preload: true,   // Preload the font files
});

// Additional font weights loaded with lower priority
const additionalFonts = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
      {
      path: '../public/fonts/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    }
  ],
  variable: '--font-additional',
  display: 'swap',
  preload: false, // Don't preload these fonts
});

export const metadata: Metadata = {
  title: "Gym Notebook AI",
  description: "Your notebook for the gym - no clutter just your notes to track progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${customFont.variable} ${additionalFonts.variable} antialiased`}
        >
        {children}

      <footer className="text-center text-sm text-muted-foreground pb-4 pt-14">
        <p>
          &copy; 2025 Gym Notebook AI. All rights reserved.
        </p>
      </footer>
      </body>
    </html>
  );
}

