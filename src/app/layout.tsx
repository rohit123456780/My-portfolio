
import type { Metadata } from 'next';
import './globals.css';
import HackerHUD from '@/components/cyber/HackerHUD';
import CyberCursor from '@/components/cyber/CyberCursor';
import TerminalEasterEgg from '@/components/cyber/TerminalEasterEgg';

export const metadata: Metadata = {
  title: 'ROHIT ROY | CYBER OPS COMMAND',
  description: 'Technical Engineer | OT/ICS Specialist | Cybersecurity Practitioner',
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
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&family=Share+Tech+Mono&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body className="font-code antialiased bg-[#020408] text-[#e0ffe8] selection:bg-primary/30" suppressHydrationWarning>
        <div className="scanline" />
        <CyberCursor />
        <HackerHUD />
        <TerminalEasterEgg />
        {children}
      </body>
    </html>
  );
}
