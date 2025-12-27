'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { guides } from '@/data/guides';
import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

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
            icon: '⚖️',
        },
        {
            id: 'work',
            title: language === 'fi' ? 'Työelämä' : 'Work Life',
            description: language === 'fi'
                ? 'Työnhaku, haastattelut ja työkulttuurin ymmärtäminen'
                : 'Job search, interviews, and understanding work culture',
            icon: '💼',
        },
        {
            id: 'education',
            title: language === 'fi' ? 'Koulutus' : 'Education',
            description: language === 'fi'
                ? 'Kielikurssit, koulutusmahdollisuudet ja oppimisresurssit'
                : 'Language courses, educational opportunities, and learning resources',
            icon: '📚',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-8 md:py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
                            <BookOpen className="w-4 h-4" />
                            <span>{language === 'fi' ? 'Oppaat' : 'Guides'}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            {t('guides.title')}
                        </h1>
                        <p className="text-gray-600 max-w-2xl">
                            {language === 'fi'
                                ? 'Kattavat oppaat auttavat sinua navigoimaan elämässä Suomessa'
                                : 'Comprehensive guides to help you navigate life in Finland'}
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="space-y-12">
                        {categories.map((category) => {
                            const categoryGuides = groupedGuides[category.id as keyof typeof groupedGuides];
                            if (categoryGuides.length === 0) return null;

                            return (
                                <section key={category.id}>
                                    {/* Category Header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-2xl">{category.icon}</span>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                                            <p className="text-sm text-gray-500">{category.description}</p>
                                        </div>
                                    </div>

                                    {/* Guides Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categoryGuides.map((guide) => (
                                            <Link
                                                key={guide.id}
                                                href={`/guides/${guide.id}`}
                                                className="card group flex flex-col"
                                            >
                                                <div className="flex items-start gap-3 mb-3">
                                                    <span className="text-2xl flex-shrink-0">{guide.icon}</span>
                                                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                                                        {language === 'fi' ? guide.titleFi : guide.title}
                                                    </h3>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
                                                    {language === 'fi' ? guide.descriptionFi : guide.description}
                                                </p>
                                                <div className="flex items-center text-blue-600 text-sm font-medium">
                                                    {language === 'fi' ? 'Lue opas' : 'Read guide'}
                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 bg-blue-600 text-white rounded-xl p-6 md:p-8 text-center">
                        <h2 className="text-xl font-bold mb-2">
                            {language === 'fi' ? 'Tarvitsetko henkilökohtaista apua?' : 'Need Personal Assistance?'}
                        </h2>
                        <p className="text-blue-100 mb-4">
                            {language === 'fi'
                                ? 'Tutustu paikallisiin maahanmuuttajapalveluihin kaupungissasi'
                                : 'Explore local immigrant services in your city'}
                        </p>
                        <Link href="/services" className="inline-flex items-center bg-white text-blue-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            {language === 'fi' ? 'Selaa palveluita' : 'Browse Services'}
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
