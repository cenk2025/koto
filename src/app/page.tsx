'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  FileText,
  Briefcase,
  MapPin,
  Shield,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Zap,
  Heart,
  Users
} from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('features.legal.title'),
      description: t('features.legal.desc'),
      href: '/guides?category=legal',
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      iconBg: 'from-blue-100 to-indigo-100',
    },
    {
      icon: Briefcase,
      title: t('features.work.title'),
      description: t('features.work.desc'),
      href: '/guides?category=work',
      gradient: 'from-emerald-500 via-green-600 to-teal-600',
      iconBg: 'from-emerald-100 to-teal-100',
    },
    {
      icon: FileText,
      title: t('features.cv.title'),
      description: t('features.cv.desc'),
      href: '/cv-builder',
      gradient: 'from-purple-500 via-violet-600 to-purple-700',
      iconBg: 'from-purple-100 to-violet-100',
    },
    {
      icon: MapPin,
      title: t('features.services.title'),
      description: t('features.services.desc'),
      href: '/services',
      gradient: 'from-orange-500 via-amber-600 to-yellow-600',
      iconBg: 'from-orange-100 to-yellow-100',
    },
  ];

  const stats = [
    { number: '10+', label: language === 'fi' ? 'Kaupunkia' : 'Cities', icon: MapPin },
    { number: '50+', label: language === 'fi' ? 'Palvelua' : 'Services', icon: Sparkles },
    { number: '20+', label: language === 'fi' ? 'Opasta' : 'Guides', icon: FileText },
    { number: '1000+', label: language === 'fi' ? 'Käyttäjää' : 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <Header />

      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full mb-8 fade-in-up">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'fi' ? 'Tervetuloa Suomeen' : 'Welcome to Finland'}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="mb-6 fade-in-up stagger-1">
                <span className="block text-gray-900 mb-2">
                  {t('home.hero.title')}
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {language === 'fi' ? 'Uusi Elämä Alkaa Täältä' : 'Your New Life Starts Here'}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed fade-in-up stagger-2">
                {t('home.hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 fade-in-up stagger-3">
                <Link
                  href="/auth/register"
                  className="btn-premium btn-primary group"
                >
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  {t('home.hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/guides"
                  className="btn-premium btn-outline group"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {t('nav.guides')}
                </Link>
              </div>

              {/* Floating Cards Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto fade-in-up stagger-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="glass rounded-2xl p-6 hover-lift"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full mb-6">
                <Heart className="w-5 h-5 text-pink-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {language === 'fi' ? 'Mitä tarjoamme' : 'What We Offer'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {language === 'fi' ? 'Kaikki tarvitsemasi' : 'Everything You Need'}
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'fi' ? 'Yhdessä Paikassa' : 'In One Place'}
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === 'fi'
                  ? 'Kattavat työkalut ja resurssit onnistuneeseen kotoutumiseen'
                  : 'Comprehensive tools and resources for successful integration'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={index}
                    href={feature.href}
                    className="group relative"
                  >
                    <div className="card-premium h-full">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Arrow */}
                      <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                        <span>{language === 'fi' ? 'Tutustu' : 'Explore'}</span>
                        <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full mb-6">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    {language === 'fi' ? 'Yksinkertainen prosessi' : 'Simple Process'}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {language === 'fi' ? 'Kuinka se toimii' : 'How It Works'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: language === 'fi' ? 'Rekisteröidy' : 'Register',
                    desc: language === 'fi' ? 'Luo ilmainen tili' : 'Create free account',
                    color: 'from-blue-500 to-cyan-500',
                  },
                  {
                    step: '02',
                    title: language === 'fi' ? 'Tutustu' : 'Explore',
                    desc: language === 'fi' ? 'Selaa oppaita' : 'Browse guides',
                    color: 'from-purple-500 to-pink-500',
                  },
                  {
                    step: '03',
                    title: language === 'fi' ? 'Luo CV' : 'Create CV',
                    desc: language === 'fi' ? 'Rakenna CV' : 'Build your CV',
                    color: 'from-orange-500 to-red-500',
                  },
                  {
                    step: '04',
                    title: language === 'fi' ? 'Aloita' : 'Start',
                    desc: language === 'fi' ? 'Uusi elämä' : 'New life',
                    color: 'from-green-500 to-emerald-500',
                  },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="glass rounded-2xl p-8 h-full hover-lift">
                      <div className={`text-6xl font-black bg-gradient-to-br ${item.color} bg-clip-text text-transparent mb-4 opacity-20`}>
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative glass rounded-3xl p-12 md:p-16 text-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-10"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {language === 'fi'
                      ? 'Aloita matkasi tänään'
                      : 'Start Your Journey Today'}
                  </h2>

                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    {language === 'fi'
                      ? 'Liity tuhansiin maahanmuuttajiin, jotka ovat löytäneet tiensä Suomessa'
                      : 'Join thousands of immigrants who found their way in Finland'}
                  </p>

                  <Link
                    href="/auth/register"
                    className="btn-premium btn-primary inline-flex items-center text-lg group"
                  >
                    <Zap className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform" />
                    {t('nav.register')}
                    <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
