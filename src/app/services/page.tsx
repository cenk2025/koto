'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cities, services, Service } from '@/data/services';
import { MapPin, Phone, Mail, Globe, Clock, ChevronDown } from 'lucide-react';

export default function ServicesPage() {
    const { t, language } = useLanguage();
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const categories = [
        { id: 'immigration', name: t('services.category.immigration') },
        { id: 'employment', name: t('services.category.employment') },
        { id: 'education', name: t('services.category.education') },
        { id: 'healthcare', name: t('services.category.healthcare') },
        { id: 'housing', name: t('services.category.housing') },
        { id: 'integration', name: t('services.category.integration') },
    ];

    const filteredServices = services.filter((service) => {
        const cityMatch = !selectedCity || service.cityId === selectedCity;
        const categoryMatch = !selectedCategory || service.category === selectedCategory;
        return cityMatch && categoryMatch;
    });

    const getCategoryIcon = (category: Service['category']) => {
        const icons: Record<string, string> = {
            immigration: '🛂',
            employment: '💼',
            education: '📚',
            healthcare: '🏥',
            housing: '🏠',
            integration: '🤝',
        };
        return icons[category] || '📋';
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-8 md:py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{language === 'fi' ? 'Palvelut' : 'Services'}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            {t('services.title')}
                        </h1>
                        <p className="text-gray-600 max-w-2xl">
                            {language === 'fi'
                                ? 'Löydä paikallisia maahanmuuttajapalveluita kaupungeittain ja kategorioittain'
                                : 'Find local immigrant services by city and category'}
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* City Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(selectedCity || selectedCategory) && (
                            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                {selectedCity && (
                                    <button
                                        onClick={() => setSelectedCity('')}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100"
                                    >
                                        {cities.find(c => c.id === selectedCity)?.[language === 'fi' ? 'nameFi' : 'name']}
                                        <span className="ml-1">×</span>
                                    </button>
                                )}
                                {selectedCategory && (
                                    <button
                                        onClick={() => setSelectedCategory('')}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100"
                                    >
                                        {categories.find(c => c.id === selectedCategory)?.name}
                                        <span className="ml-1">×</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => { setSelectedCity(''); setSelectedCategory(''); }}
                                    className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                                >
                                    {language === 'fi' ? 'Tyhjennä kaikki' : 'Clear all'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-gray-500 mb-6">
                        {language === 'fi'
                            ? `Näytetään ${filteredServices.length} palvelua`
                            : `Showing ${filteredServices.length} services`}
                    </p>

                    {/* Services Grid */}
                    {filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {filteredServices.map((service) => (
                                <div key={service.id} className="card">
                                    {/* Header */}
                                    <div className="flex items-start gap-3 mb-4">
                                        <span className="text-2xl flex-shrink-0">{getCategoryIcon(service.category)}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-semibold text-gray-900 leading-tight">
                                                    {language === 'fi' ? service.nameFi : service.name}
                                                </h3>
                                                <span className="badge flex-shrink-0">
                                                    {categories.find(c => c.id === service.category)?.name}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {cities.find(c => c.id === service.cityId)?.[language === 'fi' ? 'nameFi' : 'name']}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mb-4">
                                        {language === 'fi' ? service.descriptionFi : service.description}
                                    </p>

                                    {/* Contact Info */}
                                    <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <span className="break-words">{service.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <a href={`tel:${service.phone}`} className="hover:text-blue-600">{service.phone}</a>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <a href={`mailto:${service.email}`} className="hover:text-blue-600 break-all">{service.email}</a>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <a href={service.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 break-all">
                                                {service.website.replace('https://', '')}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <span>{language === 'fi' ? service.openingHoursFi : service.openingHours}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                            <p className="text-gray-500 mb-4">
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
            </main>

            <Footer />
        </div>
    );
}
