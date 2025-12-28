'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

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

        // Handle scroll effect
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            subscription.unsubscribe();
            window.removeEventListener('scroll', handleScroll);
        };
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

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50'
                : 'bg-white/95 backdrop-blur-md border-b border-gray-100'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-20">
                    {/* Logo - Left */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0 z-10 group">
                        <div className="relative w-11 h-11 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
                            <span className="text-white font-bold text-xl">FG</span>
                        </div>
                        <div className="hidden sm:block">
                            <div className="flex items-baseline gap-1.5">
                                <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Finland</span>
                                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Guide</span>
                            </div>
                            <p className="text-[10px] text-gray-500 -mt-1 tracking-wide">Your path to Finland</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Absolute Center */}
                    <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100/80 rounded-2xl p-1.5 shadow-sm border border-gray-200/50">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${isActive(item.href)
                                            ? 'bg-white text-blue-600 shadow-md shadow-blue-500/10'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                                        }`}
                                >
                                    {item.name}
                                    {isActive(item.href) && (
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Right Side - Auth & Language */}
                    <div className="hidden lg:flex items-center gap-3 flex-shrink-0 z-10">
                        {/* Language Switcher */}
                        <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100/80 rounded-xl p-1 border border-gray-200/50">
                            <button
                                onClick={() => setLanguage('fi')}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${language === 'fi'
                                        ? 'bg-white text-blue-600 shadow-md'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                FI
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${language === 'en'
                                        ? 'bg-white text-blue-600 shadow-md'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                EN
                            </button>
                        </div>

                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-200/50"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span className="hidden xl:inline">{userName || user.email?.split('@')[0]}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-xl hover:bg-red-50 transition-all duration-300 flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden xl:inline">{t('nav.logout')}</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/auth/login"
                                    className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                                >
                                    {t('nav.register')}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300 z-10"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-6 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
                        <nav className="flex flex-col gap-2 mb-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 text-center ${isActive(item.href)
                                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                            : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Language */}
                        <div className="px-4 mb-6">
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3 text-center">
                                {language === 'fi' ? 'Kieli' : 'Language'}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setLanguage('fi')}
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${language === 'fi'
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Suomi
                                </button>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${language === 'en'
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    English
                                </button>
                            </div>
                        </div>

                        {user ? (
                            <div className="px-4 space-y-3">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center justify-center gap-2 w-full py-3.5 text-center text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all duration-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    {userName || user.email?.split('@')[0]}
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 text-center text-red-600 border-2 border-red-200 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300"
                                >
                                    <LogOut className="w-4 h-4" />
                                    {t('nav.logout')}
                                </button>
                            </div>
                        ) : (
                            <div className="px-4 space-y-3">
                                <Link
                                    href="/auth/login"
                                    className="block w-full py-3.5 text-center text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="block w-full py-3.5 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t('nav.register')}
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
