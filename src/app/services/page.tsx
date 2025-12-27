'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cities, services, Service } from '@/data/services';
import { MapPin, Phone, Mail, Globe, Clock, ChevronDown, Sparkles, X } from 'lucide-react';

export default function ServicesPage() {
    const { t, language } = useLanguage();
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const categories = [
        { id: 'immigration', name: t('services.category.immigration'), icon: '🛂' },
        { id: 'employment', name: t('services.category.employment'), icon: '💼' },
        { id: 'education', name: t('services.category.education'), icon: '📚' },
        { id: 'healthcare', name: t('services.category.healthcare'), icon: '🏥' },
        { id: 'housing', name: t('services.category.housing'), icon: '🏠' },
        { id: 'integration', name: t('services.category.integration'), icon: '🤝' },
    ];

    const filteredServices = services.filter((service) => {
        const cityMatch = !selectedCity || service.cityId === selectedCity;
        const categoryMatch = !selectedCategory || service.category === selectedCategory;
        return cityMatch && categoryMatch;
    });

    const getCategoryIcon = (category: Service['category']) => {
        return categories.find(c => c.id === category)?.icon || '📋';
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero */}
                <section className="section bg-gradient-to-b from-slate-50 to-white">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-6">
                                <Sparkles className="w-4 h-4" />
                                {language === 'fi' ? 'Palvelut' : 'Services'}
                            </div>
                            <h1 className="mb-4">
                                {language === 'fi' ? (
                                    <>Löydä <span className="text-gradient">paikalliset palvelut</span></>
                                ) : (
                                    <>Find <span className="text-gradient">local services</span></>
                                )}
                            </h1>
                            <p className="text-xl text-gray-600">
                                {language === 'fi'
                                    ? 'Kattava hakemisto maahanmuuttajien palveluista kaupungeittain'
                                    : 'Comprehensive directory of immigrant services by city'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters & Content */}
                <section className="section">
                    <div className="container">
                        {/* Filters */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* City Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('services.selectCity')}
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="input appearance-none pr-10"
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                        >
                                            <option value="">{language === 'fi' ? 'Kaikki kaupungit' : 'All cities'}</option>
                                            {cities.map((city) => (
                                                <option key={city.id} value={city.id}>
                                                    {language === 'fi' ? city.nameFi : city.name}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {language === 'fi' ? 'Kategoria' : 'Category'}
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="input appearance-none pr-10"
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        >
                                            <option value="">{language === 'fi' ? 'Kaikki kategoriat' : 'All categories'}</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Active Filters */}
                            {(selectedCity || selectedCategory) && (
                                <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-gray-100">
                                    {selectedCity && (
                                        <button
                                            onClick={() => setSelectedCity('')}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                                        >
                                            {cities.find(c => c.id === selectedCity)?.[language === 'fi' ? 'nameFi' : 'name']}
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                    {selectedCategory && (
                                        <button
                                            onClick={() => setSelectedCategory('')}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
                                        >
                                            {categories.find(c => c.id === selectedCategory)?.name}
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => { setSelectedCity(''); setSelectedCategory(''); }}
                                        className="text-sm text-gray-500 hover:text-gray-700 font-medium ml-2"
                                    >
                                        {language === 'fi' ? 'Tyhjennä kaikki' : 'Clear all'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Results Count */}
                        <p className="text-gray-500 mb-8">
                            {language === 'fi'
                                ? `Näytetään ${filteredServices.length} palvelua`
                                : `Showing ${filteredServices.length} services`}
                        </p>

                        {/* Services Grid */}
                        {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {filteredServices.map((service) => (
                                    <div key={service.id} className="card">
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-5">
                                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3 mb-1">
                                                    <h3 className="font-semibold text-gray-900 leading-tight">
                                                        {language === 'fi' ? service.nameFi : service.name}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="badge badge-primary">
                                                        {categories.find(c => c.id === service.category)?.name}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {cities.find(c => c.id === service.cityId)?.[language === 'fi' ? 'nameFi' : 'name']}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm mb-5">
                                            {language === 'fi' ? service.descriptionFi : service.description}
                                        </p>

                                        {/* Contact Info */}
                                        <div className="space-y-3 pt-5 border-t border-gray-100">
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span className="break-words">{service.address}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <a href={`tel:${service.phone}`} className="hover:text-blue-600 transition-colors">{service.phone}</a>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <a href={`mailto:${service.email}`} className="hover:text-blue-600 transition-colors break-all">{service.email}</a>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <a href={service.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors break-all">
                                                    {service.website.replace('https://', '')}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span>{language === 'fi' ? service.openingHoursFi : service.openingHours}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gray-50 rounded-2xl">
                                <p className="text-gray-500 text-lg mb-6">
                                    {language === 'fi'
                                        ? 'Emme löytäneet hakuehtojasi vastaavia palveluita.'
                                        : 'No services found matching your criteria.'}
                                </p>
                                <button
                                    onClick={() => { setSelectedCity(''); setSelectedCategory(''); }}
                                    className="btn-primary"
                                >
                                    {language === 'fi' ? 'Tyhjennä suodattimet' : 'Clear Filters'}
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
