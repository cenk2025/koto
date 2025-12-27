'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { guides } from '@/data/guides';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

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
            color: 'from-blue-500 to-blue-600',
            icon: '⚖️',
        },
        {
            id: 'work',
            title: language === 'fi' ? 'Työelämä' : 'Work Life',
            description: language === 'fi'
                ? 'Työnhaku, haastattelut ja työkulttuurin ymmärtäminen'
                : 'Job search, interviews, and understanding work culture',
            color: 'from-green-500 to-green-600',
            icon: '💼',
        },
        {
            id: 'education',
            title: language === 'fi' ? 'Koulutus' : 'Education',
            description: language === 'fi'
                ? 'Kielikurssit, koulutusmahdollisuudet ja oppimisresurssit'
                : 'Language courses, educational opportunities, and learning resources',
            color: 'from-purple-500 to-purple-600',
            icon: '📚',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
                            <BookOpen className="w-5 h-5" />
                            <span className="text-sm font-medium">
                                {language === 'fi' ? 'Oppaat' : 'Guides'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t('guides.title')}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                                <div key={category.id}>
                                    {/* Category Header */}
                                    <div className={`bg-gradient-to-r ${category.color} rounded-xl p-8 mb-6 text-white`}>
                                        <div className="flex items-center space-x-4 mb-3">
                                            <span className="text-5xl">{category.icon}</span>
                                            <div>
                                                <h2 className="text-3xl font-bold">{category.title}</h2>
                                                <p className="text-white/90 text-lg mt-1">{category.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guides Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categoryGuides.map((guide) => (
                                            <Link
                                                key={guide.id}
                                                href={`/guides/${guide.id}`}
                                                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                                            >
                                                <div className="p-6">
                                                    <div className="text-4xl mb-4">{guide.icon}</div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                                        {language === 'fi' ? guide.titleFi : guide.title}
                                                    </h3>
                                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                                        {language === 'fi' ? guide.descriptionFi : guide.description}
                                                    </p>
                                                    <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                                                        {language === 'fi' ? 'Lue opas' : 'Read guide'}
                                                        <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            {language === 'fi'
                                ? 'Tarvitsetko henkilökohtaista apua?'
                                : 'Need Personal Assistance?'}
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            {language === 'fi'
                                ? 'Tutustu paikallisiin maahanmuuttajapalveluihin kaupungissasi'
                                : 'Explore local immigrant services in your city'}
                        </p>
                        <Link href="/services" className="btn btn-accent inline-flex items-center text-lg px-8 py-4">
                            {language === 'fi' ? 'Selaa palveluita' : 'Browse Services'}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
