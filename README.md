# Finland Guide - Comprehensive Guide for Immigrants

A comprehensive web application for immigrants in Finland, providing guides, CV builder, and local services information.

## Features

- 🌍 **Bilingual Support**: Finnish and English
- 📋 **Comprehensive Guides**: Legal matters, job search, registration, language learning
- 💼 **CV Builder**: Create professional CVs with photo upload and PDF export
- 🏙️ **City Services**: Find immigrant services by city and category
- 👤 **User Dashboard**: Manage your profile and saved information
- 🤖 **AI Chatbot**: Get instant help with OpenAI GPT-4o-mini powered assistant
- 📱 **Responsive Design**: Works on all devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **PDF Generation**: jsPDF
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd finland-guide
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your Supabase credentials:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup

### Database Schema

Run the following SQL in your Supabase SQL editor:

\`\`\`sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create CVs table
CREATE TABLE cvs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  personal_info JSONB DEFAULT '{}',
  summary TEXT,
  experience JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  languages JSONB DEFAULT '[]',
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_services table
CREATE TABLE saved_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_services ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CVs policies
CREATE POLICY "Users can view their own CVs" ON cvs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own CVs" ON cvs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own CVs" ON cvs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CVs" ON cvs
  FOR DELETE USING (auth.uid() = user_id);

-- Saved services policies
CREATE POLICY "Users can view their saved services" ON saved_services
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert saved services" ON saved_services
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete saved services" ON saved_services
  FOR DELETE USING (auth.uid() = user_id);
\`\`\`

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Project Structure

\`\`\`
finland-guide/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── cv-builder/        # CV Builder page
│   │   ├── services/          # Services page
│   │   ├── guides/            # Guides pages
│   │   ├── dashboard/         # User dashboard
│   │   └── auth/              # Authentication pages
│   ├── components/            # React components
│   ├── contexts/              # React contexts (Language)
│   ├── data/                  # Static data (guides, services)
│   ├── lib/                   # Libraries (Supabase client)
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utility functions (PDF generator)
├── public/                    # Static assets
└── package.json
\`\`\`

## Features Overview

### CV Builder
- Personal information with photo upload
- Professional summary
- Work experience (multiple entries)
- Education (multiple entries)
- Skills with proficiency levels
- Languages with proficiency levels
- PDF export with professional formatting

### Guides
- Residence Permit guide
- Job Search strategies
- Registration process
- Finnish Language learning resources

### Services
- Filter by city (10+ Finnish cities)
- Filter by category (Immigration, Employment, Education, Healthcare, Housing, Integration)
- Detailed service information with contact details

### User Dashboard
- Profile management
- CV management
- Saved services
- Progress tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

For support, email info@finlandguide.fi or open an issue in the repository.
