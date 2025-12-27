import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'Finland Guide - Comprehensive Guide for Immigrants',
  description: 'Complete guide for immigrants in Finland - from legal matters to work life, CV builder, and local services',
  keywords: 'Finland, immigration, guide, CV builder, work in Finland, residence permit, Finnish services',
  authors: [{ name: 'Finland Guide' }],
  openGraph: {
    title: 'Finland Guide - Comprehensive Guide for Immigrants',
    description: 'Complete guide for immigrants in Finland',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
