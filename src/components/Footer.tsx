'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Heart, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    const { language } = useLanguage();

    const footerLinks = {
        company: {
            title: language === 'fi' ? 'Yritys' : 'Company',
            links: [
                { name: language === 'fi' ? 'Tietoja' : 'About', href: '/about' },
                { name: language === 'fi' ? 'Yhteystiedot' : 'Contact', href: '/contact' },
                { name: language === 'fi' ? 'Tietosuoja' : 'Privacy', href: '/privacy' },
            ],
        },
        resources: {
            title: language === 'fi' ? 'Resurssit' : 'Resources',
            links: [
                { name: language === 'fi' ? 'Oppaat' : 'Guides', href: '/guides' },
                { name: language === 'fi' ? 'Palvelut' : 'Services', href: '/services' },
                { name: language === 'fi' ? 'CV-työkalu' : 'CV Builder', href: '/cv-builder' },
            ],
        },
        support: {
            title: language === 'fi' ? 'Tuki' : 'Support',
            links: [
                { name: language === 'fi' ? 'UKK' : 'FAQ', href: '/faq' },
                { name: language === 'fi' ? 'Yhteisö' : 'Community', href: '/community' },
                { name: language === 'fi' ? 'Palaute' : 'Feedback', href: '/feedback' },
            ],
        },
    };

    return (
        <footer className="relative mt-20 glass border-t border-white/20">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                                <Heart className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Finland Guide
                                </span>
                                <div className="text-xs text-gray-500 font-medium">
                                    {language === 'fi' ? 'Uusi elämä alkaa täältä' : 'Your new life starts here'}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {language === 'fi'
                                ? 'Kattava opas maahanmuuttajille Suomessa. Autamme sinua navigoimaan uudessa kotimaassasi.'
                                : 'Comprehensive guide for immigrants in Finland. We help you navigate your new home country.'}
                        </p>
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors group"
                            >
                                <Github className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors group"
                            >
                                <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors group"
                            >
                                <Twitter className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.values(footerLinks).map((section, index) => (
                        <div key={index}>
                            <h3 className="font-bold text-gray-900 mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center group"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform">
                                                {link.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass rounded-2xl p-6 hover-lift">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Email</div>
                                <a href="mailto:info@finlandguide.fi" className="text-gray-900 font-semibold hover:text-blue-600 transition-colors">
                                    info@finlandguide.fi
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="glass rounded-2xl p-6 hover-lift">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                                <Phone className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">
                                    {language === 'fi' ? 'Puhelin' : 'Phone'}
                                </div>
                                <a href="tel:+358401234567" className="text-gray-900 font-semibold hover:text-green-600 transition-colors">
                                    +358 40 123 4567
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="glass rounded-2xl p-6 hover-lift">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">
                                    {language === 'fi' ? 'Osoite' : 'Address'}
                                </div>
                                <p className="text-gray-900 font-semibold">
                                    Helsinki, Finland
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-600 text-sm">
                            © {new Date().getFullYear()} Finland Guide. {language === 'fi' ? 'Kaikki oikeudet pidätetään.' : 'All rights reserved.'}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{language === 'fi' ? 'Tehty' : 'Made with'}</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            <span>{language === 'fi' ? 'Suomessa' : 'in Finland'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
