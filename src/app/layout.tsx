
import type { Metadata } from 'next';
import './globals.css';
import HackerHUD from '@/components/cyber/HackerHUD';
import CyberCursor from '@/components/cyber/CyberCursor';
import TerminalEasterEgg from '@/components/cyber/TerminalEasterEgg';

export const metadata: Metadata = {
  title: 'ROHIT ROY | OT SECURITY ENGINEER',
  description: 'OT Security Engineer - Defensive & Offensive Operations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&family=Inter:wght@400;700&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-primary/30" suppressHydrationWarning>
        <CyberCursor />
        <HackerHUD />
        <TerminalEasterEgg />
        {children}
      </body>
    </html>
  );
}
