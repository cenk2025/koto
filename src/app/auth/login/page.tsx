'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const { t, language } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Implement Supabase authentication
        setTimeout(() => {
            setLoading(false);
            alert(language === 'fi'
                ? 'Kirjautuminen tulossa pian! Tämä on demo-versio.'
                : 'Login coming soon! This is a demo version.');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {t('auth.login.title')}
                        </h1>
                        <p className="text-gray-600">
                            {language === 'fi'
                                ? 'Kirjaudu sisään hallitaksesi profiiliasi ja CV:täsi'
                                : 'Login to manage your profile and CV'}
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('auth.login.email')}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        className="input pl-11"
                                        placeholder="nimi@esimerkki.fi"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('auth.login.password')}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        className="input pl-11"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        {language === 'fi' ? 'Muista minut' : 'Remember me'}
                                    </span>
                                </label>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    {language === 'fi' ? 'Unohditko salasanan?' : 'Forgot password?'}
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn btn-primary flex items-center justify-center"
                            >
                                {loading ? (
                                    <div className="loading"></div>
                                ) : (
                                    <>
                                        {t('auth.login.submit')}
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    {language === 'fi' ? 'tai' : 'or'}
                                </span>
                            </div>
                        </div>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                {t('auth.login.noAccount')}{' '}
                                <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                    {t('nav.register')}
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Demo Notice */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            <strong>{language === 'fi' ? 'Demo-versio:' : 'Demo Version:'}</strong>{' '}
                            {language === 'fi'
                                ? 'Tämä on demo-versio. Supabase-autentikointi lisätään pian.'
                                : 'This is a demo version. Supabase authentication will be added soon.'}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
