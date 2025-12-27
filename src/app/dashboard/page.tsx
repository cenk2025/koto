'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, FileText, Bookmark, Edit, Download, MapPin, ChevronRight, Plus, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface UserProfile {
    first_name: string | null;
    last_name: string | null;
    email: string;
}

export default function DashboardPage() {
    const { t, language } = useLanguage();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const { data: { user: authUser } } = await supabase.auth.getUser();

            if (!authUser) {
                router.push('/auth/login');
                return;
            }

            setUser(authUser);

            // Fetch profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', authUser.id)
                .single();

            if (profileData) {
                setProfile(profileData);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    const getUserDisplayName = () => {
        if (profile?.first_name) {
            return profile.last_name
                ? `${profile.first_name} ${profile.last_name}`
                : profile.first_name;
        }
        return user?.email?.split('@')[0] || 'User';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const stats = [
        { icon: FileText, label: language === 'fi' ? 'CV:t' : 'CVs', value: '0', iconBg: 'icon-blue' },
        { icon: Bookmark, label: language === 'fi' ? 'Tallennetut' : 'Saved', value: '0', iconBg: 'icon-green' },
        { icon: MapPin, label: language === 'fi' ? 'Palvelut' : 'Services', value: '50+', iconBg: 'icon-purple' },
    ];

    const quickActions = [
        { href: '/cv-builder', icon: Plus, label: language === 'fi' ? 'Luo uusi CV' : 'Create new CV' },
        { href: '/guides', icon: FileText, label: language === 'fi' ? 'Selaa oppaita' : 'Browse guides' },
        { href: '/services', icon: MapPin, label: language === 'fi' ? 'Etsi palveluita' : 'Find services' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-grow">
                {/* Hero - Centered */}
                <section className="section bg-gradient-to-b from-slate-50 to-white">
                    <div className="container">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Avatar */}
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <User className="w-10 h-10 text-white" />
                            </div>

                            {/* Welcome */}
                            <h1 className="mb-3" style={{ color: '#0f172a' }}>
                                {t('dashboard.welcome')}, <span className="text-gradient">{getUserDisplayName()}</span>! 👋
                            </h1>
                            <p className="text-xl text-gray-600 mb-12">
                                {language === 'fi' ? 'Tässä on yhteenveto edistymisestäsi' : "Here's a summary of your progress"}
                            </p>

                            {/* Stats - Centered */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={index} className="card text-center">
                                            <div className={`icon-box ${stat.iconBg} mx-auto mb-4`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                            <div className="text-sm text-gray-500">{stat.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="section section-gray">
                    <div className="container">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* My CV */}
                                    <div className="card">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-bold" style={{ color: '#0f172a' }}>{t('dashboard.myCv')}</h2>
                                        </div>
                                        <div className="text-center py-8 bg-gray-50 rounded-2xl">
                                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500 mb-4">
                                                {language === 'fi'
                                                    ? 'Et ole vielä luonut CV:tä'
                                                    : 'You haven\'t created a CV yet'}
                                            </p>
                                            <Link href="/cv-builder" className="btn-primary text-sm py-2.5 px-5">
                                                <Plus className="w-4 h-4 mr-2" />
                                                {language === 'fi' ? 'Luo CV' : 'Create CV'}
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Saved Services */}
                                    <div className="card">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-bold" style={{ color: '#0f172a' }}>{t('dashboard.savedServices')}</h2>
                                            <Link href="/services" className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center">
                                                {language === 'fi' ? 'Selaa palveluita' : 'Browse services'}
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                        <div className="text-center py-8 bg-gray-50 rounded-xl">
                                            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500 mb-4">
                                                {language === 'fi'
                                                    ? 'Et ole vielä tallentanut palveluita'
                                                    : 'You haven\'t saved any services yet'}
                                            </p>
                                            <Link href="/services" className="btn-primary text-sm py-2.5 px-5">
                                                {language === 'fi' ? 'Etsi palveluita' : 'Find services'}
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* Profile */}
                                    <div className="card text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="font-semibold mb-1" style={{ color: '#0f172a' }}>{getUserDisplayName()}</h3>
                                        <p className="text-sm text-gray-500 mb-5">{profile?.email || user?.email}</p>
                                        <Link href="/cv-builder" className="btn-secondary w-full text-sm py-2.5">
                                            <Edit className="w-4 h-4 mr-2" />
                                            {t('common.edit')}
                                        </Link>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6">
                                        <h2 className="text-lg font-bold mb-5 flex items-center justify-center gap-2" style={{ color: 'white' }}>
                                            <Sparkles className="w-5 h-5" />
                                            {language === 'fi' ? 'Pika-toiminnot' : 'Quick Actions'}
                                        </h2>
                                        <div className="space-y-3">
                                            {quickActions.map((action, i) => (
                                                <Link
                                                    key={i}
                                                    href={action.href}
                                                    className="flex items-center justify-center gap-3 p-3.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
                                                >
                                                    <action.icon className="w-5 h-5" />
                                                    <span className="font-medium text-sm">{action.label}</span>
                                                </Link>
                                            ))}
                                        </div>
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
