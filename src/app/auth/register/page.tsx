'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert(language === 'fi'
                ? 'Salasanat eivät täsmää!'
                : 'Passwords do not match!');
            return;
        }

        setLoading(true);

        // TODO: Implement Supabase authentication
        setTimeout(() => {
            setLoading(false);
            alert(language === 'fi'
                ? 'Rekisteröinti tulossa pian! Tämä on demo-versio.'
                : 'Registration coming soon! This is a demo version.');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {t('auth.register.title')}
                        </h1>
                        <p className="text-gray-600">
                            {language === 'fi'
                                ? 'Luo ilmainen tili aloittaaksesi matkasi Suomessa'
                                : 'Create a free account to start your journey in Finland'}
                        </p>
                    </div>

                    {/* Register Form */}
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('auth.register.name')}
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        className="input pl-11"
                                        placeholder={language === 'fi' ? 'Koko nimi' : 'Full name'}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('auth.register.email')}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        className="input pl-11"
                                        placeholder="nimi@esimerkki.fi"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('auth.register.password')}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        className="input pl-11"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {language === 'fi'
                                        ? 'Vähintään 6 merkkiä'
                                        : 'At least 6 characters'}
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('auth.register.confirmPassword')}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        className="input pl-11"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                                    required
                                />
                                <label className="ml-2 text-sm text-gray-600">
                                    {language === 'fi'
                                        ? 'Hyväksyn '
                                        : 'I agree to the '}
                                    <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                                        {language === 'fi' ? 'käyttöehdot' : 'terms of service'}
                                    </a>
                                    {language === 'fi' ? ' ja ' : ' and '}
                                    <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                                        {language === 'fi' ? 'tietosuojakäytännön' : 'privacy policy'}
                                    </a>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn btn-accent flex items-center justify-center"
                            >
                                {loading ? (
                                    <div className="loading"></div>
                                ) : (
                                    <>
                                        {t('auth.register.submit')}
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

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                {t('auth.register.hasAccount')}{' '}
                                <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                    {t('nav.login')}
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
