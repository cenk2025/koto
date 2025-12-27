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
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl font-bold">FG</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 hidden sm:block">
                            Finland Guide
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Language Switcher & Auth */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setLanguage('fi')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${language === 'fi'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                FI
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${language === 'en'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                EN
                            </button>
                        </div>
                        <Link
                            href="/auth/login"
                            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {t('nav.login')}
                        </Link>
                        <Link
                            href="/auth/register"
                            className="btn btn-primary"
                        >
                            {t('nav.register')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="px-4 py-2">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Globe className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700">
                                        {language === 'fi' ? 'Kieli' : 'Language'}
                                    </span>
                                </div>
                                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setLanguage('fi')}
                                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${language === 'fi'
                                                ? 'bg-white text-blue-600 shadow-sm'
                                                : 'text-gray-600'
                                            }`}
                                    >
                                        Suomi
                                    </button>
                                    <button
                                        onClick={() => setLanguage('en')}
                                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${language === 'en'
                                                ? 'bg-white text-blue-600 shadow-sm'
                                                : 'text-gray-600'
                                            }`}
                                    >
                                        English
                                    </button>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 my-2"></div>
                            <Link
                                href="/auth/login"
                                className="mx-4 px-4 py-2 text-center rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                href="/auth/register"
                                className="mx-4 btn btn-primary"
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
