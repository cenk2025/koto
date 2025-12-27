import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy',
});

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are a helpful AI assistant for the Finland Guide application, designed to help immigrants navigate life in Finland. You have comprehensive knowledge about:

1. **Legal Matters**: Residence permits, registration, Finnish bureaucracy, rights and obligations
2. **Employment**: Job search strategies, CV writing for Finnish market, interview preparation, work culture
3. **Education**: Finnish language learning, educational opportunities, integration programs
4. **Daily Life**: Healthcare, housing, banking, transportation, social services
5. **Finnish Culture**: Social norms, customs, seasonal activities, Finnish way of life

**Guidelines:**
- Be friendly, supportive, and encouraging
- Provide accurate, practical information
- Use simple, clear language
- Offer step-by-step guidance when appropriate
- Suggest relevant guides and services from the Finland Guide app
- Be culturally sensitive and understanding of immigrant challenges
- If you don't know something, admit it and suggest where to find the information
- Respond in the same language the user uses (Finnish or English)

**Important:** You are specifically helping immigrants in Finland. Focus on Finnish-specific information and regulations.`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        // Check if OpenAI API key is configured
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.' },
                { status: 500 }
            );
        }

        // Create chat completion with streaming
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages,
            ],
            temperature: 0.7,
            max_tokens: 1000,
            stream: true,
        });

        // Create a readable stream
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        const content = chunk.choices[0]?.delta?.content || '';
                        if (content) {
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                        }
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to process chat request' },
            { status: 500 }
        );
    }
}
