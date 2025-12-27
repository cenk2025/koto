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
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'
            }`}>
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Finland Guide
                            </span>
                            <div className="text-xs text-gray-500 font-medium">
                                {language === 'fi' ? 'Uusi elämä alkaa täältä' : 'Your new life starts here'}
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Language Switcher & Auth */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center glass rounded-xl p-1">
                            <button
                                onClick={() => setLanguage('fi')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${language === 'fi'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                FI
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${language === 'en'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                EN
                            </button>
                        </div>
                        <Link
                            href="/auth/login"
                            className="px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                        >
                            {t('nav.login')}
                        </Link>
                        <Link
                            href="/auth/register"
                            className="btn-premium btn-primary"
                        >
                            {t('nav.register')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
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
                    <div className="md:hidden py-6 glass rounded-2xl mt-2 mb-4">
                        <div className="flex flex-col space-y-2 px-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="border-t border-gray-200 my-4"></div>

                            {/* Mobile Language Switcher */}
                            <div className="px-4 py-2">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Globe className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm font-semibold text-gray-700">
                                        {language === 'fi' ? 'Kieli' : 'Language'}
                                    </span>
                                </div>
                                <div className="flex items-center glass rounded-xl p-1">
                                    <button
                                        onClick={() => setLanguage('fi')}
                                        className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${language === 'fi'
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                                : 'text-gray-600'
                                            }`}
                                    >
                                        Suomi
                                    </button>
                                    <button
                                        onClick={() => setLanguage('en')}
                                        className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${language === 'en'
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                                : 'text-gray-600'
                                            }`}
                                    >
                                        English
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-4"></div>

                            <Link
                                href="/auth/login"
                                className="mx-4 px-4 py-3 text-center rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                href="/auth/register"
                                className="mx-4 btn-premium btn-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.register')}
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
