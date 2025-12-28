import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/dashboard/', '/auth/'],
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
                crawlDelay: 2,
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
            },
        ],
        sitemap: 'https://koto.vercel.app/sitemap.xml',
    };
}
