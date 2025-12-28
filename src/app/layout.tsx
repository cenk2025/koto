import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Chatbot from '@/components/Chatbot';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://koto.vercel.app'),
  title: {
    default: 'Finland Guide - Comprehensive Immigration & Integration Platform',
    template: '%s | Finland Guide',
  },
  description: 'Complete guide for immigrants in Finland. Get help with residence permits, job search, CV building, Finnish language learning, and access to local services. Free AI-powered assistance for integration.',
  keywords: [
    'Finland immigration',
    'Finland guide',
    'work in Finland',
    'residence permit Finland',
    'Finnish CV builder',
    'learn Finnish',
    'integration Finland',
    'Finland services',
    'move to Finland',
    'living in Finland',
    'Finnish work culture',
    'Finland visa',
    'kotoutuminen',
    'maahanmuutto Suomi',
    'työ Suomessa',
  ],
  authors: [{ name: 'Finland Guide', url: 'https://koto.vercel.app' }],
  creator: 'Finland Guide',
  publisher: 'Finland Guide',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fi_FI'],
    url: 'https://koto.vercel.app',
    title: 'Finland Guide - Your Complete Immigration & Integration Platform',
    description: 'Everything you need to successfully move to and integrate in Finland. Residence permits, job search, CV builder, language learning, and local services.',
    siteName: 'Finland Guide',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finland Guide - Immigration & Integration Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finland Guide - Complete Immigration Platform',
    description: 'Your comprehensive guide to moving and living in Finland. CV builder, guides, services, and AI assistance.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://koto.vercel.app',
    languages: {
      'en': 'https://koto.vercel.app',
      'fi': 'https://koto.vercel.app',
    },
  },
  category: 'immigration',
  classification: 'Immigration Services, Integration Support, Career Development',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <LanguageProvider>
          {children}
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
