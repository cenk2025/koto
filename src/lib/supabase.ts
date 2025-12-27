import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    user_id: string;
                    first_name: string | null;
                    last_name: string | null;
                    email: string;
                    phone: string | null;
                    city: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    first_name?: string | null;
                    last_name?: string | null;
                    email: string;
                    phone?: string | null;
                    city?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    first_name?: string | null;
                    last_name?: string | null;
                    email?: string;
                    phone?: string | null;
                    city?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            cvs: {
                Row: {
                    id: string;
                    user_id: string;
                    personal_info: any;
                    summary: string | null;
                    experience: any[];
                    education: any[];
                    skills: any[];
                    languages: any[];
                    photo_url: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    personal_info?: any;
                    summary?: string | null;
                    experience?: any[];
                    education?: any[];
                    skills?: any[];
                    languages?: any[];
                    photo_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    personal_info?: any;
                    summary?: string | null;
                    experience?: any[];
                    education?: any[];
                    skills?: any[];
                    languages?: any[];
                    photo_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            saved_services: {
                Row: {
                    id: string;
                    user_id: string;
                    service_id: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    service_id: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    service_id?: string;
                    created_at?: string;
                };
            };
        };
    };
};
