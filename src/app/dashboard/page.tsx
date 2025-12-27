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
    MapPin
} from 'lucide-react';

export default function DashboardPage() {
    const { t, language } = useLanguage();

    // Demo data
    const stats = [
        {
            icon: FileText,
            label: language === 'fi' ? 'CV:t' : 'CVs',
            value: '1',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: Bookmark,
            label: language === 'fi' ? 'Tallennetut palvelut' : 'Saved Services',
            value: '3',
            color: 'from-green-500 to-green-600',
        },
        {
            icon: TrendingUp,
            label: language === 'fi' ? 'Edistyminen' : 'Progress',
            value: '65%',
            color: 'from-purple-500 to-purple-600',
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
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-12">
                <div className="container mx-auto px-4">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            {t('dashboard.welcome')}, Demo User! 👋
                        </h1>
                        <p className="text-xl text-gray-600">
                            {language === 'fi'
                                ? 'Tässä on yhteenveto edistymisestäsi'
                                : "Here's a summary of your progress"}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                                            <Icon className="w-6 h-6 text-white" />
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
                        <div className="lg:col-span-2 space-y-6">
                            {/* My CV */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {t('dashboard.myCv')}
                                    </h2>
                                    <Link href="/cv-builder" className="btn btn-primary flex items-center">
                                        <Edit className="w-5 h-5 mr-2" />
                                        {t('common.edit')}
                                    </Link>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <User className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">Demo User CV</h3>
                                                <p className="text-sm text-gray-600">
                                                    {language === 'fi'
                                                        ? 'Viimeksi päivitetty: 2 päivää sitten'
                                                        : 'Last updated: 2 days ago'}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="btn btn-secondary flex items-center">
                                            <Download className="w-5 h-5 mr-2" />
                                            PDF
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="badge">
                                            {language === 'fi' ? '3 työkokemus' : '3 experiences'}
                                        </span>
                                        <span className="badge">
                                            {language === 'fi' ? '2 koulutus' : '2 education'}
                                        </span>
                                        <span className="badge">
                                            {language === 'fi' ? '5 taitoa' : '5 skills'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Saved Services */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {t('dashboard.savedServices')}
                                    </h2>
                                    <Link href="/services" className="text-blue-600 hover:text-blue-700 font-medium">
                                        {language === 'fi' ? 'Näytä kaikki' : 'View all'}
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { name: 'Helsinki Immigration Office', city: 'Helsinki', category: language === 'fi' ? 'Maahanmuutto' : 'Immigration' },
                                        { name: 'TE Services Helsinki', city: 'Helsinki', category: language === 'fi' ? 'Työllistyminen' : 'Employment' },
                                        { name: 'Helsinki Adult Education', city: 'Helsinki', category: language === 'fi' ? 'Koulutus' : 'Education' },
                                    ].map((service, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <MapPin className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                                                        <p className="text-sm text-gray-600">{service.city} • {service.category}</p>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 hover:text-red-600">
                                                    <Bookmark className="w-5 h-5 fill-current" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Profile */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    {t('dashboard.profile')}
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Demo User</h3>
                                            <p className="text-sm text-gray-600">demo@example.com</p>
                                        </div>
                                    </div>
                                    <button className="w-full btn btn-secondary flex items-center justify-center">
                                        <Edit className="w-5 h-5 mr-2" />
                                        {t('common.edit')} {t('dashboard.profile')}
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    {language === 'fi' ? 'Viimeaikainen toiminta' : 'Recent Activity'}
                                </h2>
                                <div className="space-y-4">
                                    {recentActivity.map((activity, index) => {
                                        const Icon = activity.icon;
                                        return (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Icon className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                    <p className="text-xs text-gray-500">{activity.date}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                                <h2 className="text-xl font-bold mb-4">
                                    {language === 'fi' ? 'Pika-toiminnot' : 'Quick Actions'}
                                </h2>
                                <div className="space-y-3">
                                    <Link
                                        href="/cv-builder"
                                        className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 transition-colors"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Plus className="w-5 h-5" />
                                            <span className="font-medium">
                                                {language === 'fi' ? 'Luo uusi CV' : 'Create new CV'}
                                            </span>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/guides"
                                        className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 transition-colors"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FileText className="w-5 h-5" />
                                            <span className="font-medium">
                                                {language === 'fi' ? 'Selaa oppaita' : 'Browse guides'}
                                            </span>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/services"
                                        className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 transition-colors"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="w-5 h-5" />
                                            <span className="font-medium">
                                                {language === 'fi' ? 'Etsi palveluita' : 'Find services'}
                                            </span>
                                        </div>
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
