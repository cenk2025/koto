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
                    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
                    aria-label="Open chat"
                >
                    <MessageCircle className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">
                                    {language === 'fi' ? 'AI Avustaja' : 'AI Assistant'}
                                </h3>
                                <p className="text-blue-100 text-xs">
                                    {language === 'fi' ? 'Aina valmis auttamaan' : 'Always ready to help'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-blue-600" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">
                                    {language === 'fi' ? 'Tervetuloa!' : 'Welcome!'}
                                </h4>
                                <p className="text-gray-600 mb-6">
                                    {language === 'fi'
                                        ? 'Kysy minulta mitä tahansa elämästä Suomessa'
                                        : 'Ask me anything about life in Finland'}
                                </p>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-700 mb-3">
                                        {language === 'fi' ? 'Pikakysymykset:' : 'Quick questions:'}
                                    </p>
                                    {quickQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setInput(question);
                                                inputRef.current?.focus();
                                            }}
                                            className="block w-full text-left px-4 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm text-gray-700 hover:text-blue-600"
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
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-900 shadow-md'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                                    <div className="flex items-center space-x-2">
                                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                                        <span className="text-sm text-gray-600">
                                            {language === 'fi' ? 'Kirjoittaa...' : 'Typing...'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200">
                        <div className="flex items-center space-x-2">
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
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
