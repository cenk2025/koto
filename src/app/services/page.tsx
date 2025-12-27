'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cities, services, Service } from '@/data/services';
import { MapPin, Phone, Mail, Globe as GlobeIcon, Clock, Filter } from 'lucide-react';

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

    const getCategoryColor = (category: Service['category']) => {
        const colors = {
            immigration: 'from-blue-500 to-blue-600',
            employment: 'from-green-500 to-green-600',
            education: 'from-purple-500 to-purple-600',
            healthcare: 'from-red-500 to-red-600',
            housing: 'from-orange-500 to-orange-600',
            integration: 'from-indigo-500 to-indigo-600',
        };
        return colors[category];
    };

    const getCategoryIcon = (category: Service['category']) => {
        const icons = {
            immigration: '🛂',
            employment: '💼',
            education: '📚',
            healthcare: '🏥',
            housing: '🏠',
            integration: '🤝',
        };
        return icons[category];
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t('services.title')}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {language === 'fi'
                                ? 'Löydä paikallisia maahanmuuttajapalveluita kaupungeittain ja kategorioittain'
                                : 'Find local immigrant services by city and category'}
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <div className="flex items-center mb-4">
                            <Filter className="w-5 h-5 text-gray-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                {language === 'fi' ? 'Suodata palvelut' : 'Filter Services'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* City Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('services.selectCity')}
                                </label>
                                <select
                                    className="select"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                >
                                    <option value="">
                                        {language === 'fi' ? 'Kaikki kaupungit' : 'All cities'}
                                    </option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {language === 'fi' ? city.nameFi : city.name} ({city.population.toLocaleString()})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {language === 'fi' ? 'Kategoria' : 'Category'}
                                </label>
                                <select
                                    className="select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">
                                        {language === 'fi' ? 'Kaikki kategoriat' : 'All categories'}
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(selectedCity || selectedCategory) && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {selectedCity && (
                                    <button
                                        onClick={() => setSelectedCity('')}
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium hover:bg-blue-200 transition-colors"
                                    >
                                        {cities.find(c => c.id === selectedCity)?.[language === 'fi' ? 'nameFi' : 'name']}
                                        <span className="ml-2">×</span>
                                    </button>
                                )}
                                {selectedCategory && (
                                    <button
                                        onClick={() => setSelectedCategory('')}
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium hover:bg-green-200 transition-colors"
                                    >
                                        {categories.find(c => c.id === selectedCategory)?.name}
                                        <span className="ml-2">×</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setSelectedCity('');
                                        setSelectedCategory('');
                                    }}
                                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    {language === 'fi' ? 'Tyhjennä kaikki' : 'Clear all'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            {language === 'fi'
                                ? `Näytetään ${filteredServices.length} palvelua`
                                : `Showing ${filteredServices.length} services`}
                        </p>
                    </div>

                    {/* Services Grid */}
                    {filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    {/* Category Header */}
                                    <div className={`bg-gradient-to-r ${getCategoryColor(service.category)} px-6 py-4`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-3xl">{getCategoryIcon(service.category)}</span>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">
                                                        {language === 'fi' ? service.nameFi : service.name}
                                                    </h3>
                                                    <p className="text-white/90 text-sm">
                                                        {cities.find(c => c.id === service.cityId)?.[language === 'fi' ? 'nameFi' : 'name']}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="badge bg-white/20 text-white border-white/30">
                                                {categories.find(c => c.id === service.category)?.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Service Details */}
                                    <div className="p-6 space-y-4">
                                        <p className="text-gray-700">
                                            {language === 'fi' ? service.descriptionFi : service.description}
                                        </p>

                                        <div className="space-y-3 pt-4 border-t border-gray-200">
                                            {/* Address */}
                                            <div className="flex items-start space-x-3">
                                                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{service.address}</span>
                                            </div>

                                            {/* Phone */}
                                            <div className="flex items-center space-x-3">
                                                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                <a
                                                    href={`tel:${service.phone}`}
                                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                                >
                                                    {service.phone}
                                                </a>
                                            </div>

                                            {/* Email */}
                                            <div className="flex items-center space-x-3">
                                                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                <a
                                                    href={`mailto:${service.email}`}
                                                    className="text-blue-600 hover:text-blue-700 font-medium break-all"
                                                >
                                                    {service.email}
                                                </a>
                                            </div>

                                            {/* Website */}
                                            <div className="flex items-center space-x-3">
                                                <GlobeIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                <a
                                                    href={service.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 font-medium break-all"
                                                >
                                                    {service.website.replace('https://', '')}
                                                </a>
                                            </div>

                                            {/* Opening Hours */}
                                            <div className="flex items-start space-x-3">
                                                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">
                                                    {language === 'fi' ? service.openingHoursFi : service.openingHours}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {language === 'fi' ? 'Ei tuloksia' : 'No Results'}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {language === 'fi'
                                    ? 'Yritä muuttaa hakuehtoja löytääksesi palveluita'
                                    : 'Try changing your filters to find services'}
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCity('');
                                    setSelectedCategory('');
                                }}
                                className="btn btn-primary"
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
