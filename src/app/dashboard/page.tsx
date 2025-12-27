'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, FileText, Bookmark, Edit, Download, MapPin, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
    const { t, language } = useLanguage();

    const stats = [
        { icon: FileText, label: language === 'fi' ? 'CV:t' : 'CVs', value: '1', color: 'bg-blue-100 text-blue-600' },
        { icon: Bookmark, label: language === 'fi' ? 'Tallennetut' : 'Saved', value: '3', color: 'bg-green-100 text-green-600' },
    ];

    const savedServices = [
        { name: 'Helsinki Immigration Office', city: 'Helsinki', category: language === 'fi' ? 'Maahanmuutto' : 'Immigration' },
        { name: 'TE Services Helsinki', city: 'Helsinki', category: language === 'fi' ? 'Työllistyminen' : 'Employment' },
        { name: 'Helsinki Adult Education', city: 'Helsinki', category: language === 'fi' ? 'Koulutus' : 'Education' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-8 md:py-12">
                <div className="container mx-auto px-4">
                    {/* Welcome */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            {t('dashboard.welcome')}, Demo User! 👋
                        </h1>
                        <p className="text-gray-600">
                            {language === 'fi' ? 'Tässä on yhteenveto edistymisestäsi' : "Here's a summary of your progress"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={index} className="card flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                                <div className="text-sm text-gray-500">{stat.label}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* My CV */}
                            <div className="card">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.myCv')}</h2>
                                    <Link href="/cv-builder" className="btn-primary text-sm py-2 px-3">
                                        <Edit className="w-4 h-4 mr-1" />
                                        {t('common.edit')}
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center">
                                        <User className="w-7 h-7 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">Demo User CV</h3>
                                        <p className="text-sm text-gray-500">
                                            {language === 'fi' ? 'Viimeksi päivitetty: 2 päivää sitten' : 'Last updated: 2 days ago'}
                                        </p>
                                    </div>
                                    <button className="btn-secondary text-sm py-2 px-3">
                                        <Download className="w-4 h-4 mr-1" />
                                        PDF
                                    </button>
                                </div>
                            </div>

                            {/* Saved Services */}
                            <div className="card">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.savedServices')}</h2>
                                    <Link href="/services" className="text-sm text-blue-600 hover:underline flex items-center">
                                        {language === 'fi' ? 'Näytä kaikki' : 'View all'}
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {savedServices.map((service, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 truncate">{service.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {service.city} • {service.category}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Profile */}
                            <div className="card">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.profile')}</h2>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Demo User</h3>
                                        <p className="text-sm text-gray-500">demo@example.com</p>
                                    </div>
                                </div>
                                <button className="btn-secondary w-full text-sm">
                                    <Edit className="w-4 h-4 mr-1" />
                                    {t('common.edit')}
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="card bg-blue-600 border-blue-600">
                                <h2 className="text-lg font-semibold text-white mb-4">
                                    {language === 'fi' ? 'Pika-toiminnot' : 'Quick Actions'}
                                </h2>
                                <div className="space-y-2">
                                    <Link href="/cv-builder" className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
                                        <FileText className="w-4 h-4" />
                                        {language === 'fi' ? 'Luo uusi CV' : 'Create new CV'}
                                    </Link>
                                    <Link href="/guides" className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
                                        <FileText className="w-4 h-4" />
                                        {language === 'fi' ? 'Selaa oppaita' : 'Browse guides'}
                                    </Link>
                                    <Link href="/services" className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
                                        <MapPin className="w-4 h-4" />
                                        {language === 'fi' ? 'Etsi palveluita' : 'Find services'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
