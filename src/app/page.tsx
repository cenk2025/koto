'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FileText, Briefcase, MapPin, Shield, ArrowRight, CheckCircle, Sparkles, Scale, GraduationCap } from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Scale,
      title: t('features.legal.title'),
      description: t('features.legal.desc'),
      href: '/guides?category=legal',
      iconBg: 'icon-blue',
    },
    {
      icon: Briefcase,
      title: t('features.work.title'),
      description: t('features.work.desc'),
      href: '/guides?category=work',
      iconBg: 'icon-green',
    },
    {
      icon: FileText,
      title: t('features.cv.title'),
      description: t('features.cv.desc'),
      href: '/cv-builder',
      iconBg: 'icon-purple',
    },
    {
      icon: MapPin,
      title: t('features.services.title'),
      description: t('features.services.desc'),
      href: '/services',
      iconBg: 'icon-orange',
    },
  ];

  const stats = [
    { number: '10+', label: language === 'fi' ? 'Kaupunkia' : 'Cities' },
    { number: '50+', label: language === 'fi' ? 'Palvelua' : 'Services' },
    { number: '20+', label: language === 'fi' ? 'Opasta' : 'Guides' },
    { number: '1000+', label: language === 'fi' ? 'Käyttäjää' : 'Users' },
  ];

  const benefits = [
    language === 'fi' ? 'Kattavat oppaat suomeksi ja englanniksi' : 'Comprehensive guides in Finnish and English',
    language === 'fi' ? 'Ammattimainen CV-työkalu' : 'Professional CV builder tool',
    language === 'fi' ? 'Paikallisten palveluiden hakemisto' : 'Local services directory',
    language === 'fi' ? 'Henkilökohtainen hallintapaneeli' : 'Personal dashboard',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="section bg-gradient-to-b from-slate-50 to-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-8">
                <Sparkles className="w-4 h-4" />
                {language === 'fi' ? 'Tervetuloa Suomeen!' : 'Welcome to Finland!'}
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-center">
                {language === 'fi' ? (
                  <>Kaikki mitä tarvitset <span className="text-gradient">uuden elämän</span> aloittamiseen</>
                ) : (
                  <>Everything you need to <span className="text-gradient">start your new life</span></>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto text-center">
                {t('home.hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href="/auth/register" className="btn-primary text-base px-8 py-4">
                  {t('home.hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/guides" className="btn-secondary text-base px-8 py-4">
                  {t('nav.guides')}
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-gradient mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-center">
                {language === 'fi' ? 'Mitä tarjoamme' : 'What We Offer'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg text-center">
                {language === 'fi'
                  ? 'Kattavat työkalut ja resurssit onnistuneeseen kotoutumiseen Suomessa'
                  : 'Comprehensive tools and resources for successful integration in Finland'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Link key={index} href={feature.href} className="feature-card group">
                    <div className={`icon-box ${feature.iconBg}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors text-center">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section - Full Width CTA */}
        <section className="section section-gray">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              {/* Section Header - Centered */}
              <div className="text-center mb-12">
                <h2 className="mb-4">
                  {language === 'fi' ? (
                    <>Miksi valita <span className="text-gradient">Finland Guide</span>?</>
                  ) : (
                    <>Why choose <span className="text-gradient">Finland Guide</span>?</>
                  )}
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  {language === 'fi'
                    ? 'Olemme luoneet kattavan alustan, joka auttaa sinua kaikissa kotoutumisen vaiheissa.'
                    : 'We have created a comprehensive platform that helps you in all stages of integration.'}
                </p>
              </div>

              {/* Benefits Grid - Centered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Box - Full Width, Proper Contrast */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'white' }}>
                  {language === 'fi' ? 'Aloita ilmaiseksi' : 'Start for Free'}
                </h3>
                <p className="mb-8 text-lg max-w-xl mx-auto" style={{ color: '#bfdbfe' }}>
                  {language === 'fi'
                    ? 'Rekisteröidy ja saat pääsyn kaikkiin oppaisiin, CV-työkaluun ja palveluhakemistoon.'
                    : 'Register and get access to all guides, CV tool, and service directory.'}
                </p>
                <Link href="/auth/register" className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg">
                  {t('nav.register')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section-dark">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-4 text-center">
                {language === 'fi' ? 'Aloita matkasi tänään' : 'Start Your Journey Today'}
              </h2>
              <p className="text-lg text-slate-400 mb-8 text-center">
                {language === 'fi'
                  ? 'Liity tuhansiin maahanmuuttajiin, jotka ovat löytäneet tiensä Suomessa.'
                  : 'Join thousands of immigrants who found their way in Finland.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="btn-primary text-base px-8 py-4">
                  {t('nav.register')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/guides" className="btn-ghost text-white border-2 border-slate-700 hover:border-slate-600 px-8 py-4">
                  {language === 'fi' ? 'Tutustu oppaisiin' : 'Explore Guides'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
