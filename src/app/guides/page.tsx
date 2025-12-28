'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { guides } from '@/data/guides';
import Link from 'next/link';
import { ChevronRight, Sparkles, Scale, Briefcase, GraduationCap } from 'lucide-react';

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
            icon: Scale,
            iconBg: 'icon-blue',
        },
        {
            id: 'work',
            title: language === 'fi' ? 'Työelämä' : 'Work Life',
            description: language === 'fi'
                ? 'Työnhaku, haastattelut ja työkulttuurin ymmärtäminen'
                : 'Job search, interviews, and understanding work culture',
            icon: Briefcase,
            iconBg: 'icon-green',
        },
        {
            id: 'education',
            title: language === 'fi' ? 'Koulutus' : 'Education',
            description: language === 'fi'
                ? 'Kielikurssit, koulutusmahdollisuudet ja oppimisresurssit'
                : 'Language courses, educational opportunities, and learning resources',
            icon: GraduationCap,
            iconBg: 'icon-purple',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero */}
                <section className="section bg-gradient-to-b from-slate-50 to-white">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-6">
                                <Sparkles className="w-4 h-4" />
                                {language === 'fi' ? 'Oppaat' : 'Guides'}
                            </div>
                            <h1 className="mb-4 text-center">
                                {language === 'fi' ? (
                                    <>Kaikki mitä tarvitset <span className="text-gradient">kotoutumiseen</span></>
                                ) : (
                                    <>Everything you need for <span className="text-gradient">integration</span></>
                                )}
                            </h1>
                            <p className="text-xl text-gray-600 text-center">
                                {language === 'fi'
                                    ? 'Kattavat oppaat auttavat sinua navigoimaan elämässä Suomessa'
                                    : 'Comprehensive guides to help you navigate life in Finland'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="section">
                    <div className="container">
                        {categories.map((category) => {
                            const categoryGuides = groupedGuides[category.id as keyof typeof groupedGuides];
                            if (categoryGuides.length === 0) return null;

                            const IconComponent = category.icon;

                            return (
                                <div key={category.id} className="mb-16 last:mb-0">
                                    {/* Category Header - Centered */}
                                    <div className="text-center mb-10">
                                        <div className={`icon-box ${category.iconBg} mx-auto mb-5`}>
                                            <IconComponent className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{category.title}</h2>
                                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">{category.description}</p>
                                    </div>

                                    {/* Guides Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categoryGuides.map((guide) => {
                                            // Extract first paragraph from content for preview
                                            const content = language === 'fi' ? guide.contentFi : guide.content;
                                            const firstParagraph = content
                                                .split('\n\n')
                                                .find(p => p.trim() && !p.startsWith('#'))
                                                ?.replace(/^[-*]\s/gm, '')
                                                .trim() || '';
                                            const preview = firstParagraph.slice(0, 200) + (firstParagraph.length > 200 ? '...' : '');

                                            return (
                                                <Link
                                                    key={guide.id}
                                                    href={`/guides/${guide.id}`}
                                                    className="card group"
                                                >
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <span className="text-3xl flex-shrink-0">{guide.icon}</span>
                                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                                                            {language === 'fi' ? guide.titleFi : guide.title}
                                                        </h3>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-700 mb-3">
                                                        {language === 'fi' ? guide.descriptionFi : guide.description}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                                        {preview}
                                                    </p>
                                                    <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                                                        {language === 'fi' ? 'Lue opas' : 'Read guide'}
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* CTA */}
                <section className="section section-dark">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="mb-4 text-center">
                                {language === 'fi' ? 'Tarvitsetko henkilökohtaista apua?' : 'Need Personal Assistance?'}
                            </h2>
                            <p className="text-slate-400 mb-8 text-center">
                                {language === 'fi'
                                    ? 'Tutustu paikallisiin maahanmuuttajapalveluihin kaupungissasi'
                                    : 'Explore local immigrant services in your city'}
                            </p>
                            <Link href="/services" className="btn-primary">
                                {language === 'fi' ? 'Selaa palveluita' : 'Browse Services'}
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
