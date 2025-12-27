'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FileText, Briefcase, MapPin, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('features.legal.title'),
      description: t('features.legal.desc'),
      href: '/guides?category=legal',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Briefcase,
      title: t('features.work.title'),
      description: t('features.work.desc'),
      href: '/guides?category=work',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FileText,
      title: t('features.cv.title'),
      description: t('features.cv.desc'),
      href: '/cv-builder',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: MapPin,
      title: t('features.services.title'),
      description: t('features.services.desc'),
      href: '/services',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  const stats = [
    { number: '10+', label: language === 'fi' ? 'Kaupunkia' : 'Cities' },
    { number: '50+', label: language === 'fi' ? 'Palvelua' : 'Services' },
    { number: '20+', label: language === 'fi' ? 'Opasta' : 'Guides' },
    { number: '1000+', label: language === 'fi' ? 'Käyttäjää' : 'Users' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                🇫🇮 {language === 'fi' ? 'Tervetuloa Suomeen' : 'Welcome to Finland'}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t('home.hero.title')}
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {t('home.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="btn-primary px-6 py-3">
                  {t('home.hero.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/guides" className="btn-secondary px-6 py-3">
                  {t('nav.guides')}
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {language === 'fi' ? 'Mitä tarjoamme' : 'What We Offer'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'fi'
                  ? 'Kattavat työkalut ja resurssit onnistuneeseen kotoutumiseen'
                  : 'Comprehensive tools and resources for successful integration'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link key={index} href={feature.href} className="card group">
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {language === 'fi' ? 'Kuinka se toimii' : 'How It Works'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: language === 'fi' ? 'Rekisteröidy' : 'Register', desc: language === 'fi' ? 'Luo ilmainen tili' : 'Create free account' },
                { step: '2', title: language === 'fi' ? 'Tutustu' : 'Explore', desc: language === 'fi' ? 'Selaa oppaita' : 'Browse guides' },
                { step: '3', title: language === 'fi' ? 'Luo CV' : 'Create CV', desc: language === 'fi' ? 'Rakenna CV' : 'Build your CV' },
                { step: '4', title: language === 'fi' ? 'Aloita' : 'Start', desc: language === 'fi' ? 'Uusi elämä' : 'New life' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {language === 'fi' ? 'Aloita matkasi tänään' : 'Start Your Journey Today'}
              </h2>
              <p className="text-blue-100 mb-8">
                {language === 'fi'
                  ? 'Liity tuhansiin maahanmuuttajiin, jotka ovat löytäneet tiensä Suomessa'
                  : 'Join thousands of immigrants who found their way in Finland'}
              </p>
              <Link href="/auth/register" className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                {t('nav.register')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
