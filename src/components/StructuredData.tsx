import Script from 'next/script';

export default function StructuredData() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Finland Guide',
        url: 'https://koto.vercel.app',
        logo: 'https://koto.vercel.app/logo.png',
        description: 'Comprehensive immigration and integration platform for people moving to Finland',
        sameAs: [
            'https://github.com/cenk2025/koto',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            availableLanguage: ['English', 'Finnish'],
        },
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Finland Guide',
        url: 'https://koto.vercel.app',
        description: 'Complete guide for immigrants in Finland with residence permits, job search, CV builder, and local services',
        inLanguage: ['en', 'fi'],
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://koto.vercel.app/guides?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Immigration Support Services',
        provider: {
            '@type': 'Organization',
            name: 'Finland Guide',
        },
        areaServed: {
            '@type': 'Country',
            name: 'Finland',
        },
        description: 'Free comprehensive immigration and integration services including guides, CV builder, and local service directory',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://koto.vercel.app',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Guides',
                item: 'https://koto.vercel.app/guides',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Services',
                item: 'https://koto.vercel.app/services',
            },
            {
                '@type': 'ListItem',
                position: 4,
                name: 'CV Builder',
                item: 'https://koto.vercel.app/cv-builder',
            },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'How do I get a residence permit in Finland?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'To get a residence permit in Finland, you need to apply through the Finnish Immigration Service (Migri). The process involves determining the right permit type for your purpose (work, study, family ties), preparing required documents, and submitting your application online at enterfinland.fi or at a Finnish embassy.',
                },
            },
            {
                '@type': 'Question',
                name: 'How can I find a job in Finland?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Finding a job in Finland involves using online job portals like TE-palvelut.fi, LinkedIn, and company websites. Networking is also important. A Finnish-style CV with a professional photo and direct communication style is recommended. Our CV builder can help you create a proper Finnish CV.',
                },
            },
            {
                '@type': 'Question',
                name: 'Do I need to learn Finnish?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'While many Finns speak English, learning Finnish significantly improves your job opportunities and integration. Free integration training is available through TE Services, and many adult education centers offer affordable Finnish courses.',
                },
            },
            {
                '@type': 'Question',
                name: 'What services are available for immigrants in Finland?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Finland offers comprehensive services for immigrants including integration programs, employment services, language courses, healthcare, housing assistance, and social services. Our platform provides a directory of these services across major Finnish cities.',
                },
            },
        ],
    };

    return (
        <>
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
