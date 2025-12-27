'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, FileText, Bookmark, Edit, Download, MapPin, ChevronRight, Plus, Sparkles } from 'lucide-react';

export default function DashboardPage() {
    const { t, language } = useLanguage();

    const stats = [
        { icon: FileText, label: language === 'fi' ? 'CV:t' : 'CVs', value: '1', iconBg: 'icon-blue' },
        { icon: Bookmark, label: language === 'fi' ? 'Tallennetut' : 'Saved', value: '3', iconBg: 'icon-green' },
        { icon: MapPin, label: language === 'fi' ? 'Palvelut' : 'Services', value: '50+', iconBg: 'icon-purple' },
    ];

    const savedServices = [
        { name: 'Helsinki Immigration Office', city: 'Helsinki', category: language === 'fi' ? 'Maahanmuutto' : 'Immigration' },
        { name: 'TE Services Helsinki', city: 'Helsinki', category: language === 'fi' ? 'Työllistyminen' : 'Employment' },
        { name: 'Helsinki Adult Education', city: 'Helsinki', category: language === 'fi' ? 'Koulutus' : 'Education' },
    ];

    const quickActions = [
        { href: '/cv-builder', icon: Plus, label: language === 'fi' ? 'Luo uusi CV' : 'Create new CV' },
        { href: '/guides', icon: FileText, label: language === 'fi' ? 'Selaa oppaita' : 'Browse guides' },
        { href: '/services', icon: MapPin, label: language === 'fi' ? 'Etsi palveluita' : 'Find services' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow">
                {/* Hero */}
                <section className="bg-gradient-to-b from-slate-50 to-gray-50 py-12">
                    <div className="container">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {t('dashboard.welcome')}, Demo User! 👋
                                </h1>
                                <p className="text-gray-600">
                                    {language === 'fi' ? 'Tässä on yhteenveto edistymisestäsi' : "Here's a summary of your progress"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-10">
                    <div className="container">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={index} className="card flex items-center gap-5">
                                        <div className={`icon-box ${stat.iconBg}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                                            <div className="text-sm text-gray-500">{stat.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* My CV */}
                                <div className="card">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">{t('dashboard.myCv')}</h2>
                                        <Link href="/cv-builder" className="btn-primary text-sm py-2.5 px-5">
                                            <Edit className="w-4 h-4 mr-2" />
                                            {t('common.edit')}
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-gray-100">
                                            <User className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">Demo User CV</h3>
                                            <p className="text-sm text-gray-500">
                                                {language === 'fi' ? 'Viimeksi päivitetty: 2 päivää sitten' : 'Last updated: 2 days ago'}
                                            </p>
                                        </div>
                                        <button className="btn-secondary text-sm py-2.5 px-5">
                                            <Download className="w-4 h-4 mr-2" />
                                            PDF
                                        </button>
                                    </div>
                                </div>

                                {/* Saved Services */}
                                <div className="card">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">{t('dashboard.savedServices')}</h2>
                                        <Link href="/services" className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center">
                                            {language === 'fi' ? 'Näytä kaikki' : 'View all'}
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                    <div className="space-y-4">
                                        {savedServices.map((service, index) => (
                                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                    <MapPin className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-gray-900 truncate">{service.name}</h3>
                                                    <p className="text-sm text-gray-500">{service.city} • {service.category}</p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Profile */}
                                <div className="card">
                                    <h2 className="text-lg font-bold text-gray-900 mb-5">{t('dashboard.profile')}</h2>
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white">
                                            <User className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Demo User</h3>
                                            <p className="text-sm text-gray-500">demo@example.com</p>
                                        </div>
                                    </div>
                                    <button className="btn-secondary w-full text-sm py-2.5">
                                        <Edit className="w-4 h-4 mr-2" />
                                        {t('common.edit')}
                                    </button>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
                                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5" />
                                        {language === 'fi' ? 'Pika-toiminnot' : 'Quick Actions'}
                                    </h2>
                                    <div className="space-y-3">
                                        {quickActions.map((action, i) => (
                                            <Link
                                                key={i}
                                                href={action.href}
                                                className="flex items-center gap-3 p-3.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                                            >
                                                <action.icon className="w-5 h-5" />
                                                <span className="font-medium text-sm">{action.label}</span>
                                                <ChevronRight className="w-4 h-4 ml-auto" />
                                            </Link>
                                        ))}
                                    </div>
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
