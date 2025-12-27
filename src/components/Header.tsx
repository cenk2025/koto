'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserName(session.user.id);
            } else {
                setUserName(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkUser = async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser);
        if (authUser) {
            fetchUserName(authUser.id);
        }
    };

    const fetchUserName = async (userId: string) => {
        const { data } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('user_id', userId)
            .single();

        if (data?.first_name) {
            setUserName(data.last_name ? `${data.first_name} ${data.last_name}` : data.first_name);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const navigation = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.guides'), href: '/guides' },
        { name: t('nav.cv'), href: '/cv-builder' },
        { name: t('nav.services'), href: '/services' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container">
                <div className="relative flex items-center justify-between h-20">
                    {/* Logo - Left */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0 z-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">FG</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-lg" style={{ color: '#0f172a' }}>Finland</span>
                            <span className="font-bold text-blue-600 text-lg ml-1">Guide</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Absolute Center */}
                    <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1.5">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all shadow-none hover:shadow-sm">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Right Side - Auth & Language */}
                    <div className="hidden lg:flex items-center gap-3 flex-shrink-0 z-10">
                        {/* Language Switcher */}
                        <div className="flex items-center bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setLanguage('fi')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${language === 'fi'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                FI
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${language === 'en'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                EN
                            </button>
                        </div>

                        {user ? (
                            <>
                                <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                                    {userName || user.email?.split('@')[0]}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full hover:border-gray-300 transition-all flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    {t('nav.logout')}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full hover:border-gray-300 transition-all"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link href="/auth/register" className="btn-primary text-sm py-2.5 px-5">
                                    {t('nav.register')}
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors z-10"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-6 border-t border-gray-100">
                        <nav className="flex flex-col gap-1 mb-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Language */}
                        <div className="px-4 mb-6">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 text-center">
                                {language === 'fi' ? 'Kieli' : 'Language'}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setLanguage('fi')}
                                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${language === 'fi'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Suomi
                                </button>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${language === 'en'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    English
                                </button>
                            </div>
                        </div>

                        <div className="px-4 space-y-3">
                            <Link
                                href="/auth/login"
                                className="block w-full py-3 text-center text-gray-700 border-2 border-gray-200 rounded-full font-semibold hover:border-gray-300 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                href="/auth/register"
                                className="block w-full py-3 text-center bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.register')}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
