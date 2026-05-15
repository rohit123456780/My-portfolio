import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CyberDeck: Rohit Roy | Mission Portfolio',
  description: 'Cybersecurity Practitioner | VAPT & Penetration Testing Specialist | OT Engineering Administrator L1',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@300;400;500;700&family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30">
        <div className="fixed inset-0 pointer-events-none z-[100] border-[1px] border-primary/10 m-4 opacity-50" />
        <div className="scanline" />
        {children}
      </body>
    </html>
  );
}
