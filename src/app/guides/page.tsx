'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { guides } from '@/data/guides';
import Link from 'next/link';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function GuidesPage() {
    const { t, language } = useLanguage();

    const groupedGuides = {
        legal: guides.filter(g => g.category === 'legal'),
        work: guides.filter(g => g.category === 'work'),
        education: guides.filter(g => g.category === 'education'),
        life: guides.filter(g => g.category === 'life'),
    };

    const categories = [
        {
            id: 'legal',
            title: language === 'fi' ? 'Oikeudelliset asiat' : 'Legal Matters',
            description: language === 'fi'
                ? 'Oleskeluluvat, rekisteröinti ja oikeutesi Suomessa'
                : 'Residence permits, registration, and your rights in Finland',
            color: 'from-blue-500 to-indigo-600',
            icon: '⚖️',
            shadow: 'shadow-blue-200'
        },
        {
            id: 'work',
            title: language === 'fi' ? 'Työelämä' : 'Work Life',
            description: language === 'fi'
                ? 'Työnhaku, haastattelut ja työkulttuurin ymmärtäminen'
                : 'Job search, interviews, and understanding work culture',
            color: 'from-emerald-500 to-teal-600',
            icon: '💼',
            shadow: 'shadow-emerald-200'
        },
        {
            id: 'education',
            title: language === 'fi' ? 'Koulutus' : 'Education',
            description: language === 'fi'
                ? 'Kielikurssit, koulutusmahdollisuudet ja oppimisresurssit'
                : 'Language courses, educational opportunities, and learning resources',
            color: 'from-purple-500 to-fuchsia-600',
            icon: '📚',
            shadow: 'shadow-purple-200'
        },
    ];

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <Header />

            <main className="flex-grow py-12 relative z-10">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-16 text-center fade-in-up">
                        <div className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full mb-6 mx-auto">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {language === 'fi' ? 'Oppaat' : 'Guides'}
                            </span>
                        </div>
                        <h1 className="mb-6">
                            <span className="block text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                {t('guides.title')}
                            </span>
                            <span className="block text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                                {language === 'fi' ? 'Tietoa uuteen elämään' : 'Knowledge for your new life'}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {language === 'fi'
                                ? 'Kattavat oppaat auttavat sinua navigoimaan elämässä Suomessa'
                                : 'Comprehensive guides to help you navigate life in Finland'}
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="space-y-20">
                        {categories.map((category, index) => {
                            const categoryGuides = groupedGuides[category.id as keyof typeof groupedGuides];

                            if (categoryGuides.length === 0) return null;

                            return (
                                <div key={category.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    {/* Category Header - Clean Modern Style */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg shadow-gray-200`}>
                                            {category.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                                {category.title}
                                            </h2>
                                            <p className="text-gray-500 font-medium">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Guides Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                        {categoryGuides.map((guide, i) => (
                                            <Link
                                                key={guide.id}
                                                href={`/guides/${guide.id}`}
                                                className="group card-premium h-full hover:border-blue-300 border border-transparent transition-all p-6 md:p-8 flex flex-col"
                                            >
                                                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                                                    {guide.icon}
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight break-words">
                                                    {language === 'fi' ? guide.titleFi : guide.title}
                                                </h3>

                                                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                                                    {language === 'fi' ? guide.descriptionFi : guide.description}
                                                </p>

                                                <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wide group-hover:gap-2 transition-all mt-auto pt-4 border-t border-gray-50">
                                                    {language === 'fi' ? 'Lue opas' : 'Read guide'}
                                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 relative rounded-3xl overflow-hidden shadow-2xl fade-in-up">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500 rounded-full blur-[100px] opacity-50"></div>

                        <div className="relative z-10 p-12 md:p-16 text-center text-white">
                            <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-6 animate-pulse" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                {language === 'fi'
                                    ? 'Tarvitsetko henkilökohtaista apua?'
                                    : 'Need Personal Assistance?'}
                            </h2>
                            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                                {language === 'fi'
                                    ? 'Tutustu paikallisiin maahanmuuttajapalveluihin kaupungissasi'
                                    : 'Explore local immigrant services in your city'}
                            </p>
                            <Link
                                href="/services"
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors hover:shadow-lg hover:-translate-y-1 transform duration-200"
                            >
                                {language === 'fi' ? 'Selaa palveluita' : 'Browse Services'}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
