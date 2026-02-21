
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'score-calculator',
  description: '간편하고 빠른 온라인 학점 계산기입니다. 전체 평점과 전공 평점을 쉽게 계산하고 관리하세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;8.00&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          {/* Footer will be added here */}
        </div>
      </body>
    </html>
  );
}
