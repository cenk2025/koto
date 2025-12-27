'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.guides'), href: '/guides' },
        { name: t('nav.cv'), href: '/cv-builder' },
        { name: t('nav.services'), href: '/services' },
        { name: t('nav.dashboard'), href: '/dashboard' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">FG</span>
                        </div>
                        <span className="font-bold text-gray-900 hidden sm:block">Finland Guide</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Language Switcher */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                            <button
                                onClick={() => setLanguage('fi')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${language === 'fi' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                                    }`}
                            >
                                FI
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${language === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                                    }`}
                            >
                                EN
                            </button>
                        </div>

                        <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                            {t('nav.login')}
                        </Link>
                        <Link href="/auth/register" className="btn-primary text-sm px-4 py-2">
                            {t('nav.register')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col gap-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="border-t border-gray-100 my-3"></div>

                            {/* Mobile Language */}
                            <div className="px-3 mb-3">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <Globe className="w-4 h-4" />
                                    <span>{language === 'fi' ? 'Kieli' : 'Language'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setLanguage('fi')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg ${language === 'fi' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        Suomi
                                    </button>
                                    <button
                                        onClick={() => setLanguage('en')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        English
                                    </button>
                                </div>
                            </div>

                            <Link
                                href="/auth/login"
                                className="mx-3 py-2 text-center text-gray-700 border border-gray-200 rounded-lg font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                href="/auth/register"
                                className="mx-3 py-2 text-center bg-blue-600 text-white rounded-lg font-medium"
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
