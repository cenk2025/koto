'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function Chatbot() {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to get response');
            }

            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') break;

                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.content) {
                                    assistantMessage += parsed.content;
                                    setMessages(prev => {
                                        const newMessages = [...prev];
                                        const lastMessage = newMessages[newMessages.length - 1];
                                        if (lastMessage?.role === 'assistant') {
                                            newMessages[newMessages.length - 1] = {
                                                role: 'assistant',
                                                content: assistantMessage,
                                            };
                                        } else {
                                            newMessages.push({
                                                role: 'assistant',
                                                content: assistantMessage,
                                            });
                                        }
                                        return newMessages;
                                    });
                                }
                            } catch (e) {
                                // Ignore parsing errors
                            }
                        }
                    }
                }
            }
        } catch (error: any) {
            console.error('Chat error:', error);
            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: language === 'fi'
                        ? 'Pahoittelut, tapahtui virhe. Varmista että OpenAI API-avain on määritetty Vercel-ympäristömuuttujissa.'
                        : 'Sorry, an error occurred. Please make sure the OpenAI API key is set in Vercel environment variables.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickQuestions = language === 'fi' ? [
        'Miten haen oleskelulupaa?',
        'Kuinka löydän työtä Suomessa?',
        'Mistä voin oppia suomea?',
        'Miten rekisteröidyn Suomessa?',
    ] : [
        'How do I apply for a residence permit?',
        'How can I find a job in Finland?',
        'Where can I learn Finnish?',
        'How do I register in Finland?',
    ];

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 pulse-glow"
                    aria-label="Open chat"
                >
                    <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[600px] glass rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/20">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-5 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center pulse-glow">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">
                                    {language === 'fi' ? 'AI Avustaja' : 'AI Assistant'}
                                </h3>
                                <p className="text-white/90 text-xs flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span>{language === 'fi' ? 'Aina valmis auttamaan' : 'Always ready to help'}</span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white/20 rounded-xl p-2 transition-all hover:rotate-90 duration-300"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50 to-blue-50/30">
                        {messages.length === 0 && (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 pulse-glow">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                                <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                    {language === 'fi' ? 'Tervetuloa!' : 'Welcome!'}
                                </h4>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    {language === 'fi'
                                        ? 'Kysy minulta mitä tahansa elämästä Suomessa'
                                        : 'Ask me anything about life in Finland'}
                                </p>
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-gray-700 mb-4">
                                        {language === 'fi' ? 'Pikakysymykset:' : 'Quick questions:'}
                                    </p>
                                    {quickQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setInput(question);
                                                inputRef.current?.focus();
                                            }}
                                            className="block w-full text-left px-5 py-3 glass rounded-2xl hover:bg-white transition-all text-sm text-gray-700 hover:text-blue-600 font-medium hover-lift"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-3xl px-5 py-4 ${message.role === 'user'
                                        ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'glass text-gray-900 shadow-md border border-white/20'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="glass rounded-3xl px-5 py-4 shadow-md border border-white/20">
                                    <div className="flex items-center space-x-3">
                                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                        <span className="text-sm text-gray-600 font-medium">
                                            {language === 'fi' ? 'Kirjoittaa...' : 'Typing...'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="p-5 glass border-t border-white/20">
                        <div className="flex items-center space-x-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={
                                    language === 'fi'
                                        ? 'Kirjoita viestisi...'
                                        : 'Type your message...'
                                }
                                className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                            >
                                <Send className="w-6 h-6" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
