'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  FileText,
  Briefcase,
  MapPin,
  BookOpen,
  Users,
  CheckCircle,
  ArrowRight,
  Globe,
  Shield,
  GraduationCap
} from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('features.legal.title'),
      description: t('features.legal.desc'),
      href: '/guides?category=legal',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Briefcase,
      title: t('features.work.title'),
      description: t('features.work.desc'),
      href: '/guides?category=work',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: FileText,
      title: t('features.cv.title'),
      description: t('features.cv.desc'),
      href: '/cv-builder',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MapPin,
      title: t('features.services.title'),
      description: t('features.services.desc'),
      href: '/services',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const stats = [
    { number: '10+', label: language === 'fi' ? 'Kaupunkia' : 'Cities' },
    { number: '50+', label: language === 'fi' ? 'Palvelua' : 'Services' },
    { number: '20+', label: language === 'fi' ? 'Opasta' : 'Guides' },
    { number: '1000+', label: language === 'fi' ? 'Käyttäjää' : 'Users' },
  ];

  const steps = [
    {
      number: '1',
      title: language === 'fi' ? 'Rekisteröidy' : 'Register',
      description: language === 'fi'
        ? 'Luo ilmainen tili ja pääse käsiksi kaikkiin ominaisuuksiin'
        : 'Create a free account and access all features',
    },
    {
      number: '2',
      title: language === 'fi' ? 'Tutustu oppaisiin' : 'Explore Guides',
      description: language === 'fi'
        ? 'Lue kattavat oppaat oleskeluluvista, työnhausta ja muusta'
        : 'Read comprehensive guides on residence permits, job search, and more',
    },
    {
      number: '3',
      title: language === 'fi' ? 'Luo CV' : 'Create CV',
      description: language === 'fi'
        ? 'Käytä CV-rakentajaamme luodaksesi ammattimaisen CV:n'
        : 'Use our CV builder to create a professional CV',
    },
    {
      number: '4',
      title: language === 'fi' ? 'Löydä palvelut' : 'Find Services',
      description: language === 'fi'
        ? 'Etsi paikallisia maahanmuuttajapalveluita kaupungeittain'
        : 'Find local immigrant services by city',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>

          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {language === 'fi' ? 'Tervetuloa Suomeen' : 'Welcome to Finland'}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {t('home.hero.title')}
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register"
                  className="btn btn-accent inline-flex items-center justify-center text-lg px-8 py-4"
                >
                  {t('home.hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/guides"
                  className="btn btn-outline inline-flex items-center justify-center text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  {t('nav.guides')}
                </Link>
              </div>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fi' ? 'Mitä tarjoamme' : 'What We Offer'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === 'fi'
                  ? 'Kaikki tarvitsemasi tieto ja työkalut onnistuneeseen kotoutumiseen Suomessa'
                  : 'All the information and tools you need for successful integration in Finland'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={index}
                    href={feature.href}
                    className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                      {language === 'fi' ? 'Lue lisää' : 'Learn more'}
                      <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fi' ? 'Kuinka se toimii' : 'How It Works'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === 'fi'
                  ? 'Yksinkertainen 4-vaiheinen prosessi aloittaaksesi matkasi Suomessa'
                  : 'Simple 4-step process to start your journey in Finland'}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'fi'
                ? 'Aloita matkasi tänään'
                : 'Start Your Journey Today'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {language === 'fi'
                ? 'Liity tuhansiin maahanmuuttajiin, jotka ovat löytäneet tiensä Suomessa Finland Guiden avulla'
                : 'Join thousands of immigrants who have found their way in Finland with Finland Guide'}
            </p>
            <Link
              href="/auth/register"
              className="btn btn-accent inline-flex items-center text-lg px-8 py-4"
            >
              {t('nav.register')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
