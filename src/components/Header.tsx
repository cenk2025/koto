'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, Sparkles } from 'lucide-react';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.guides'), href: '/guides' },
        { name: t('nav.cv'), href: '/cv-builder' },
        { name: t('nav.services'), href: '/services' },
        { name: t('nav.dashboard'), href: '/dashboard' },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg py-2' : 'bg-transparent py-4'
            }`}>
            <nav className="container mx-auto px-4 xl:max-w-7xl">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block leading-tight">
                                Finland Guide
                            </span>
                            <span className="text-xs text-gray-500 font-medium block">
                                {language === 'fi' ? 'Uusi elämä alkaa täältä' : 'Your new life starts here'}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all relative group whitespace-nowrap"
                            >
                                {item.name}
                                <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Language Switcher & Auth */}
                    <div className="hidden lg:flex items-center gap-4 shrink-0">
                        <div className="flex items-center glass rounded-xl p-1 bg-white/50">
                            <button
                                onClick={() => setLanguage('fi')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'fi'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >
                                FI
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'en'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >
                                EN
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/auth/login"
                                className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                href="/auth/register"
                                className="btn-premium btn-primary text-sm py-2 px-4 shadow-lg shadow-blue-500/20"
                            >
                                {t('nav.register')}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 p-4 animate-in slide-in-from-top-2 duration-200">
                        <div className="glass rounded-3xl p-6 shadow-2xl border border-white/40 bg-white/95 backdrop-blur-xl">
                            <div className="flex flex-col space-y-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="px-4 py-3 rounded-2xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all font-bold text-lg"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="h-px bg-gray-100 my-4"></div>

                                {/* Mobile Language Switcher */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 px-4">
                                        <Globe className="w-4 h-4" />
                                        <span>{language === 'fi' ? 'Valitse kieli' : 'Select language'}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-2xl">
                                        <button
                                            onClick={() => setLanguage('fi')}
                                            className={`py-3 rounded-xl text-sm font-bold transition-all ${language === 'fi'
                                                ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                                                : 'text-gray-500'
                                                }`}
                                        >
                                            Suomi
                                        </button>
                                        <button
                                            onClick={() => setLanguage('en')}
                                            className={`py-3 rounded-xl text-sm font-bold transition-all ${language === 'en'
                                                ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                                                : 'text-gray-500'
                                                }`}
                                        >
                                            English
                                        </button>
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100 my-4"></div>

                                <div className="grid gap-3">
                                    <Link
                                        href="/auth/login"
                                        className="w-full py-3.5 text-center rounded-2xl border-2 border-gray-100 text-gray-700 font-bold hover:border-blue-600 hover:text-blue-600 transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="w-full btn-premium btn-primary justify-center py-3.5 font-bold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('nav.register')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
