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
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <Header />

            <main className="flex-grow py-12 relative z-10">
                <div className="container mx-auto px-4">
                    {/* Welcome Section */}
                    <div className="mb-8 fade-in-up">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            {t('dashboard.welcome')}, <span className="gradient-text">Demo User!</span> 👋
                        </h1>
                        <p className="text-xl text-gray-600">
                            {language === 'fi'
                                ? 'Tässä on yhteenveto edistymisestäsi'
                                : "Here's a summary of your progress"}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 fade-in-up stagger-1">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="glass rounded-2xl p-6 hover-lift border border-white/50"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg flex items-center justify-center`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 fade-in-up stagger-2">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* My CV */}
                            <div className="card-premium">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {t('dashboard.myCv')}
                                    </h2>
                                    <Link href="/cv-builder" className="btn-premium btn-primary text-sm px-4 py-2">
                                        <Edit className="w-4 h-4 mr-2" />
                                        {t('common.edit')}
                                    </Link>
                                </div>

                                <div className="border border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors bg-gray-50/50">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-inner">
                                                <User className="w-8 h-8 text-gray-500" />
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
                                        <button className="btn-premium btn-outline text-sm px-4 py-2 w-full sm:w-auto">
                                            <Download className="w-4 h-4 mr-2" />
                                            PDF
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="badge-premium text-xs">
                                            {language === 'fi' ? '3 työkokemus' : '3 experiences'}
                                        </span>
                                        <span className="badge-premium text-xs">
                                            {language === 'fi' ? '2 koulutus' : '2 education'}
                                        </span>
                                        <span className="badge-premium text-xs">
                                            {language === 'fi' ? '5 taitoa' : '5 skills'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Saved Services */}
                            <div className="card-premium">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {t('dashboard.savedServices')}
                                    </h2>
                                    <Link href="/services" className="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
                                        {language === 'fi' ? 'Näytä kaikki' : 'View all'}
                                        <ArrowRight className="w-4 h-4 ml-1" />
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
                                            className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-all bg-gray-50/50 hover:bg-white hover:shadow-sm"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-blue-100/50 rounded-lg flex items-center justify-center text-blue-600">
                                                        <MapPin className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                                                        <p className="text-sm text-gray-600">{service.city} • {service.category}</p>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg">
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
                            <div className="card-premium">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    {t('dashboard.profile')}
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">Demo User</h3>
                                            <p className="text-sm text-gray-600">demo@example.com</p>
                                        </div>
                                    </div>
                                    <button className="w-full btn-premium btn-outline justify-center">
                                        <Edit className="w-4 h-4 mr-2" />
                                        {t('common.edit')} {t('dashboard.profile')}
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="card-premium">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    {language === 'fi' ? 'Viimeaikainen toiminta' : 'Recent Activity'}
                                </h2>
                                <div className="space-y-4">
                                    {recentActivity.map((activity, index) => {
                                        const Icon = activity.icon;
                                        return (
                                            <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
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
                            <div className="rounded-2xl p-6 text-white relative overflow-hidden shadow-lg group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 z-0"></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="relative z-10">
                                    <h2 className="text-xl font-bold mb-4 flex items-center">
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
                                                className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-3 transition-all hover:translate-x-1"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-1.5 bg-white/10 rounded-lg">
                                                        <item.icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium text-sm">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
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
