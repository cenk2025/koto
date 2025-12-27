'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { guides } from '@/data/guides';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function GuideDetailPage() {
    const { language } = useLanguage();
    const params = useParams();
    const guideId = params.id as string;

    const guide = guides.find(g => g.id === guideId);

    if (!guide) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {language === 'fi' ? 'Opasta ei löytynyt' : 'Guide Not Found'}
                        </h1>
                        <Link href="/guides" className="btn btn-primary inline-flex items-center">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            {language === 'fi' ? 'Takaisin oppaisiin' : 'Back to Guides'}
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const content = language === 'fi' ? guide.contentFi : guide.content;
    const title = language === 'fi' ? guide.titleFi : guide.title;
    const description = language === 'fi' ? guide.descriptionFi : guide.description;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-12">
                <div className="container-narrow mx-auto px-4">
                    {/* Back Button */}
                    <Link
                        href="/guides"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {language === 'fi' ? 'Takaisin oppaisiin' : 'Back to Guides'}
                    </Link>

                    {/* Guide Header */}
                    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="text-5xl">{guide.icon}</div>
                                <div>
                                    <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full mb-3">
                                        <BookOpen className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            {language === 'fi' ? 'Opas' : 'Guide'}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
                                    <p className="text-xl text-gray-600">{description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: title,
                                            text: description,
                                            url: window.location.href,
                                        });
                                    }
                                }}
                                className="btn btn-secondary flex items-center"
                            >
                                <Share2 className="w-5 h-5 mr-2" />
                                {language === 'fi' ? 'Jaa' : 'Share'}
                            </button>
                        </div>
                    </div>

                    {/* Guide Content */}
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <div className="prose prose-lg max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                                            {children}
                                        </h3>
                                    ),
                                    h4: ({ children }) => (
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4">
                                            {children}
                                        </h4>
                                    ),
                                    p: ({ children }) => (
                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="ml-4">{children}</li>
                                    ),
                                    a: ({ href, children }) => (
                                        <a
                                            href={href}
                                            className="text-blue-600 hover:text-blue-700 underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-semibold text-gray-900">{children}</strong>
                                    ),
                                    code: ({ children }) => (
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                                            {children}
                                        </code>
                                    ),
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Related Guides */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {language === 'fi' ? 'Liittyvät oppaat' : 'Related Guides'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {guides
                                .filter(g => g.category === guide.category && g.id !== guide.id)
                                .slice(0, 2)
                                .map((relatedGuide) => (
                                    <Link
                                        key={relatedGuide.id}
                                        href={`/guides/${relatedGuide.id}`}
                                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1"
                                    >
                                        <div className="text-3xl mb-3">{relatedGuide.icon}</div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {language === 'fi' ? relatedGuide.titleFi : relatedGuide.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {language === 'fi' ? relatedGuide.descriptionFi : relatedGuide.description}
                                        </p>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
