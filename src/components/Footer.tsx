'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export default function Footer() {
    const { t, language } = useLanguage();

    const footerLinks = {
        guides: [
            { name: language === 'fi' ? 'Oleskelulupa' : 'Residence Permit', href: '/guides/residence-permit' },
            { name: language === 'fi' ? 'Työnhaku' : 'Job Search', href: '/guides/job-search' },
            { name: language === 'fi' ? 'Rekisteröinti' : 'Registration', href: '/guides/registration' },
            { name: language === 'fi' ? 'Suomen kieli' : 'Finnish Language', href: '/guides/finnish-language' },
        ],
        services: [
            { name: language === 'fi' ? 'Maahanmuutto' : 'Immigration', href: '/services?category=immigration' },
            { name: language === 'fi' ? 'Työllistyminen' : 'Employment', href: '/services?category=employment' },
            { name: language === 'fi' ? 'Koulutus' : 'Education', href: '/services?category=education' },
            { name: language === 'fi' ? 'Terveydenhuolto' : 'Healthcare', href: '/services?category=healthcare' },
        ],
        tools: [
            { name: t('nav.cv'), href: '/cv-builder' },
            { name: t('nav.dashboard'), href: '/dashboard' },
        ],
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xl font-bold">FG</span>
                            </div>
                            <span className="text-xl font-bold text-white">Finland Guide</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            {language === 'fi'
                                ? 'Kattava opas maahanmuuttajille Suomessa. Oikeudellisista asioista työelämään.'
                                : 'Comprehensive guide for immigrants in Finland. From legal matters to work life.'}
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Guides */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            {language === 'fi' ? 'Oppaat' : 'Guides'}
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.guides.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            {language === 'fi' ? 'Palvelut' : 'Services'}
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            {language === 'fi' ? 'Yhteystiedot' : 'Contact'}
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-blue-400 mt-0.5" />
                                <a
                                    href="mailto:info@finlandguide.fi"
                                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    info@finlandguide.fi
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-blue-400 mt-0.5" />
                                <a
                                    href="tel:+358401234567"
                                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    +358 40 123 4567
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                                <span className="text-sm text-gray-400">
                                    Helsinki, Finland
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} Finland Guide. {language === 'fi' ? 'Kaikki oikeudet pidätetään.' : 'All rights reserved.'}
                        </p>
                        <div className="flex space-x-6">
                            <Link
                                href="/privacy"
                                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                            >
                                {language === 'fi' ? 'Tietosuoja' : 'Privacy Policy'}
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                            >
                                {language === 'fi' ? 'Käyttöehdot' : 'Terms of Service'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
