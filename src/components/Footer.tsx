'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const { t, language } = useLanguage();

    const links = {
        guides: [
            { name: language === 'fi' ? 'Oikeudelliset asiat' : 'Legal Matters', href: '/guides?category=legal' },
            { name: language === 'fi' ? 'Työelämä' : 'Work Life', href: '/guides?category=work' },
            { name: language === 'fi' ? 'Koulutus' : 'Education', href: '/guides?category=education' },
        ],
        services: [
            { name: language === 'fi' ? 'CV Rakentaja' : 'CV Builder', href: '/cv-builder' },
            { name: language === 'fi' ? 'Palveluhaku' : 'Service Finder', href: '/services' },
            { name: language === 'fi' ? 'Hallintapaneeli' : 'Dashboard', href: '/dashboard' },
        ],
        company: [
            { name: language === 'fi' ? 'Tietoa meistä' : 'About Us', href: '#' },
            { name: language === 'fi' ? 'Yhteystiedot' : 'Contact', href: '#' },
            { name: language === 'fi' ? 'Tietosuoja' : 'Privacy', href: '#' },
        ],
    };

    return (
        <footer className="bg-slate-900 text-white">
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">FG</span>
                            </div>
                            <div>
                                <span className="font-bold text-white text-lg">Finland</span>
                                <span className="font-bold text-blue-400 text-lg ml-1">Guide</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {language === 'fi'
                                ? 'Kattava opas maahanmuuttajille Suomessa. Autamme sinua aloittamaan uuden elämän.'
                                : 'Comprehensive guide for immigrants in Finland. We help you start your new life.'}
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Guides */}
                    <div>
                        <h4 className="font-semibold text-white mb-5">{t('nav.guides')}</h4>
                        <ul className="space-y-3">
                            {links.guides.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-white mb-5">{t('nav.services')}</h4>
                        <ul className="space-y-3">
                            {links.services.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-5">
                            {language === 'fi' ? 'Yhteystiedot' : 'Contact'}
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span>info@finlandguide.fi</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span>+358 40 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span>Helsinki, Finland</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Finland Guide. {language === 'fi' ? 'Kaikki oikeudet pidätetään.' : 'All rights reserved.'}
                    </p>
                    <div className="flex gap-6">
                        {links.company.map((link) => (
                            <Link key={link.name} href={link.href} className="text-slate-500 hover:text-white text-sm transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
