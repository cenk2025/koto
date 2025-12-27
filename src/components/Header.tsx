'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.guides'), href: '/guides' },
        { name: t('nav.cv'), href: '/cv-builder' },
        { name: t('nav.services'), href: '/services' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">FG</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-gray-900 text-lg">Finland</span>
                            <span className="font-bold text-blue-600 text-lg ml-1">Guide</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="hidden lg:flex items-center gap-4">
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

                        <Link href="/auth/login" className="btn-ghost">
                            {t('nav.login')}
                        </Link>
                        <Link href="/auth/register" className="btn-primary">
                            {t('nav.register')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
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
                                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Language */}
                        <div className="px-4 mb-6">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
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
