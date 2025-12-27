'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    User,
    FileText,
    Bookmark,
    TrendingUp,
    Edit,
    Download,
    Plus,
    MapPin,
    ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
    const { t, language } = useLanguage();

    // Demo data
    const stats = [
        {
            icon: FileText,
            label: language === 'fi' ? 'CV:t' : 'CVs',
            value: '1',
            color: 'text-blue-600 bg-blue-50',
        },
        {
            icon: Bookmark,
            label: language === 'fi' ? 'Tallennetut palvelut' : 'Saved Services',
            value: '3',
            color: 'text-green-600 bg-green-50',
        },
        {
            icon: TrendingUp,
            label: language === 'fi' ? 'Edistyminen' : 'Progress',
            value: '65%',
            color: 'text-purple-600 bg-purple-50',
        },
    ];

    const recentActivity = [
        {
            action: language === 'fi' ? 'CV päivitetty' : 'CV updated',
            date: language === 'fi' ? '2 päivää sitten' : '2 days ago',
            icon: FileText,
        },
        {
            action: language === 'fi' ? 'Palvelu tallennettu' : 'Service saved',
            date: language === 'fi' ? '5 päivää sitten' : '5 days ago',
            icon: Bookmark,
        },
        {
            action: language === 'fi' ? 'Opas luettu' : 'Guide read',
            date: language === 'fi' ? '1 viikko sitten' : '1 week ago',
            icon: FileText,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50">
            <Header />

            <main className="flex-grow py-8 md:py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Welcome Section */}
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                            {t('dashboard.welcome')}, <span className="text-blue-600">Demo User!</span> 👋
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl">
                            {language === 'fi'
                                ? 'Tässä on yhteenveto edistymisestäsi'
                                : "Here's a summary of your progress"}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* My CV */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                        {t('dashboard.myCv')}
                                    </h2>
                                    <Link href="/cv-builder" className="btn-premium btn-primary text-sm px-4 py-2 shadow-sm">
                                        <Edit className="w-4 h-4 mr-2" />
                                        {t('common.edit')}
                                    </Link>
                                </div>

                                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 hover:border-blue-200 transition-colors shadow-sm">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100">
                                                <User className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">Demo User CV</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {language === 'fi'
                                                        ? 'Viimeksi päivitetty: 2 päivää sitten'
                                                        : 'Last updated: 2 days ago'}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="btn-premium btn-outline text-sm px-4 py-2 w-full sm:w-auto">
                                            <Download className="w-4 h-4 mr-2" />
                                            PDF
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm font-medium">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                                            {language === 'fi' ? '3 työkokemus' : '3 experiences'}
                                        </span>
                                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg border border-purple-100">
                                            {language === 'fi' ? '2 koulutus' : '2 education'}
                                        </span>
                                        <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-lg border border-orange-100">
                                            {language === 'fi' ? '5 taitoa' : '5 skills'}
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Saved Services */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                        {t('dashboard.savedServices')}
                                    </h2>
                                    <Link href="/services" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline flex items-center text-sm">
                                        {language === 'fi' ? 'Näytä kaikki' : 'View all'}
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>

                                <div className="grid gap-4">
                                    {[
                                        { name: 'Helsinki Immigration Office', city: 'Helsinki', category: language === 'fi' ? 'Maahanmuutto' : 'Immigration' },
                                        { name: 'TE Services Helsinki', city: 'Helsinki', category: language === 'fi' ? 'Työllistyminen' : 'Employment' },
                                        { name: 'Helsinki Adult Education', city: 'Helsinki', category: language === 'fi' ? 'Koulutus' : 'Education' },
                                    ].map((service, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-300 transition-all hover:shadow-md flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                                                    <MapPin className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{service.name}</h3>
                                                    <p className="text-sm text-gray-500 mt-0.5">{service.city} • <span className="text-blue-600">{service.category}</span></p>
                                                </div>
                                            </div>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg">
                                                <Bookmark className="w-5 h-5 fill-current" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Profile */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">
                                    {t('dashboard.profile')}
                                </h2>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                        <User className="w-7 h-7" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="font-bold text-gray-900 truncate">Demo User</h3>
                                        <p className="text-sm text-gray-500 truncate">demo@example.com</p>
                                    </div>
                                </div>
                                <button className="w-full btn-premium btn-outline justify-center text-sm py-2">
                                    <Edit className="w-4 h-4 mr-2" />
                                    {t('common.edit')}
                                </button>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">
                                    {language === 'fi' ? 'Viimeaikainen toiminta' : 'Recent Activity'}
                                </h2>
                                <div className="space-y-1">
                                    {recentActivity.map((activity, index) => {
                                        const Icon = activity.icon;
                                        return (
                                            <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{activity.date}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                                <h2 className="text-lg font-bold mb-6 flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    {language === 'fi' ? 'Pika-toiminnot' : 'Quick Actions'}
                                </h2>
                                <div className="space-y-3">
                                    {[
                                        { href: '/cv-builder', icon: Plus, label: language === 'fi' ? 'Luo uusi CV' : 'Create new CV' },
                                        { href: '/guides', icon: FileText, label: language === 'fi' ? 'Selaa oppaita' : 'Browse guides' },
                                        { href: '/services', icon: MapPin, label: language === 'fi' ? 'Etsi palveluita' : 'Find services' }
                                    ].map((item, i) => (
                                        <Link
                                            key={i}
                                            href={item.href}
                                            className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-3 px-4 transition-all hover:translate-x-1"
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-4 h-4 text-blue-100" />
                                                <span className="font-medium text-sm">
                                                    {item.label}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
