'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cities, services, Service } from '@/data/services';
import { MapPin, Phone, Mail, Globe as GlobeIcon, Clock, Filter, Sparkles, X } from 'lucide-react';

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
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <Header />

            <main className="flex-grow py-12 relative z-10">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12 text-center fade-in-up">
                        <div className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full mb-6 mx-auto">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {language === 'fi' ? 'Palvelut' : 'Services'}
                            </span>
                        </div>
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
                    <div className="card-premium mb-12 fade-in-up stagger-1">
                        <div className="flex items-center mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                <Filter className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {language === 'fi' ? 'Suodata palvelut' : 'Filter Services'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* City Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('services.selectCity')}
                                </label>
                                <div className="relative">
                                    <select
                                        className="input-premium appearance-none w-full"
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
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {language === 'fi' ? 'Kategoria' : 'Category'}
                                </label>
                                <div className="relative">
                                    <select
                                        className="input-premium appearance-none w-full"
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
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(selectedCity || selectedCategory) && (
                            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                                {selectedCity && (
                                    <button
                                        onClick={() => setSelectedCity('')}
                                        className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors group"
                                    >
                                        {cities.find(c => c.id === selectedCity)?.[language === 'fi' ? 'nameFi' : 'name']}
                                        <X className="w-4 h-4 ml-2 group-hover:text-blue-800" />
                                    </button>
                                )}
                                {selectedCategory && (
                                    <button
                                        onClick={() => setSelectedCategory('')}
                                        className="inline-flex items-center px-4 py-2 rounded-xl bg-green-50 text-green-700 text-sm font-semibold hover:bg-green-100 transition-colors group"
                                    >
                                        {categories.find(c => c.id === selectedCategory)?.name}
                                        <X className="w-4 h-4 ml-2 group-hover:text-green-800" />
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setSelectedCity('');
                                        setSelectedCategory('');
                                    }}
                                    className="text-sm text-gray-500 hover:text-gray-900 font-semibold px-2 transition-colors"
                                >
                                    {language === 'fi' ? 'Tyhjennä kaikki' : 'Clear all'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="mb-6 fade-in-up stagger-2">
                        <p className="text-gray-600 font-medium">
                            {language === 'fi'
                                ? `Näytetään ${filteredServices.length} palvelua`
                                : `Showing ${filteredServices.length} services`}
                        </p>
                    </div>

                    {/* Services Grid */}
                    {filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 fade-in-up stagger-3">
                            {filteredServices.map((service, index) => (
                                <div
                                    key={service.id}
                                    className="card-premium p-6 hover:border-blue-300 border border-transparent flex flex-col group"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Header - Clean */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getCategoryColor(service.category)} flex items-center justify-center text-2xl shadow-lg`}>
                                                {getCategoryIcon(service.category)}
                                            </div>
                                            <div>
                                                <div className="badge-premium bg-blue-50 text-blue-700 border border-blue-100 shadow-none mb-2">
                                                    {categories.find(c => c.id === service.category)?.name}
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                                    {language === 'fi' ? service.nameFi : service.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Service Details */}
                                    <div className="space-y-6 flex-grow">
                                        <p className="text-gray-600 leading-relaxed">
                                            {language === 'fi' ? service.descriptionFi : service.description}
                                        </p>

                                        <div className="space-y-3 pt-6 border-t border-gray-100">
                                            {/* City */}
                                            <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                                                <div className="p-1.5 bg-gray-100 rounded-lg">
                                                    <MapPin className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <span className="text-gray-900">{cities.find(c => c.id === service.cityId)?.[language === 'fi' ? 'nameFi' : 'name']}</span>
                                            </div>

                                            {/* Address */}
                                            <div className="flex items-start gap-3 text-sm">
                                                <div className="p-1.5 bg-blue-50 rounded-lg shrink-0">
                                                    <MapPin className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="text-gray-700 mt-0.5 break-words">{service.address}</span>
                                            </div>

                                            {/* Phone */}
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="p-1.5 bg-green-50 rounded-lg shrink-0">
                                                    <Phone className="w-4 h-4 text-green-600" />
                                                </div>
                                                <a href={`tel:${service.phone}`} className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                                                    {service.phone}
                                                </a>
                                            </div>

                                            {/* Email */}
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="p-1.5 bg-purple-50 rounded-lg shrink-0">
                                                    <Mail className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <a href={`mailto:${service.email}`} className="text-gray-700 hover:text-purple-600 transition-colors break-all font-medium">
                                                    {service.email}
                                                </a>
                                            </div>

                                            {/* Website */}
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="p-1.5 bg-indigo-50 rounded-lg shrink-0">
                                                    <GlobeIcon className="w-4 h-4 text-indigo-600" />
                                                </div>
                                                <a
                                                    href={service.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-700 hover:text-indigo-600 transition-colors break-all hover:underline font-medium"
                                                >
                                                    {service.website.replace('https://', '')}
                                                </a>
                                            </div>

                                            {/* Opening Hours */}
                                            <div className="flex items-start gap-3 text-sm">
                                                <div className="p-1.5 bg-orange-50 rounded-lg shrink-0">
                                                    <Clock className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 mt-0.5 font-medium">
                                                    {language === 'fi' ? service.openingHoursFi : service.openingHours}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 fade-in-up">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {language === 'fi' ? 'Ei tuloksia' : 'No Results'}
                            </h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                {language === 'fi'
                                    ? 'Emme löytäneet hakuehtojasi vastaavia palveluita. Yritä muuttaa suodattimia.'
                                    : 'We couldn\'t find any services matching your criteria. Try adjusting your filters.'}
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCity('');
                                    setSelectedCategory('');
                                }}
                                className="btn-premium btn-primary"
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
