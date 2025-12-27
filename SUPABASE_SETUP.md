# Supabase Kurulum Rehberi

Bu rehber, Finland Guide uygulaması için Supabase authentication ve database kurulumunu açıklar.

## 1. Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com) hesabınıza giriş yapın
2. "New Project" butonuna tıklayın
3. Proje adı: `finland-guide`
4. Database şifresi belirleyin (güvenli bir şifre seçin)
5. Region seçin (Europe - Frankfurt önerilir)
6. "Create new project" butonuna tıklayın

## 2. Database Tablolarını Oluşturma

Supabase SQL Editor'de aşağıdaki SQL komutlarını çalıştırın:

### Profiles Tablosu

```sql
-- Create profiles table
CREATE TABLE profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    city TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);
```

### CVs Tablosu

```sql
-- Create cvs table
CREATE TABLE cvs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    personal_info JSONB DEFAULT '{}'::jsonb,
    summary TEXT,
    experience JSONB DEFAULT '[]'::jsonb,
    education JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    languages JSONB DEFAULT '[]'::jsonb,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own CVs"
    ON cvs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own CVs"
    ON cvs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs"
    ON cvs FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs"
    ON cvs FOR DELETE
    USING (auth.uid() = user_id);
```

### Saved Services Tablosu

```sql
-- Create saved_services table
CREATE TABLE saved_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    service_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, service_id)
);

-- Enable RLS
ALTER TABLE saved_services ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own saved services"
    ON saved_services FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved services"
    ON saved_services FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved services"
    ON saved_services FOR DELETE
    USING (auth.uid() = user_id);
```

### Updated_at Trigger

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cvs_updated_at
    BEFORE UPDATE ON cvs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 3. Authentication Ayarları

1. Supabase Dashboard'da **Authentication** > **Settings** bölümüne gidin
2. **Site URL**: `http://localhost:3000` (development için)
3. **Redirect URLs** ekleyin:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback` (production için)
4. **Email Auth** aktif olduğundan emin olun
5. **Email Confirmations** ayarını isteğinize göre yapılandırın

## 4. Environment Variables

`.env.local` dosyanızı oluşturun ve aşağıdaki bilgileri ekleyin:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OpenAI Configuration (Vercel'de ayarlayın)
OPENAI_API_KEY=your_openai_api_key
```

### Supabase Bilgilerini Bulma

1. Supabase Dashboard'da projenize gidin
2. **Settings** > **API** bölümüne gidin
3. **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
4. **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 5. Test Etme

1. Development sunucusunu başlatın:
   ```bash
   npm run dev
   ```

2. `http://localhost:3000/auth/register` adresine gidin

3. Yeni bir kullanıcı oluşturun:
   - İsim: Test User
   - Email: test@example.com
   - Şifre: test123 (minimum 6 karakter)

4. Email onayı gerekiyorsa, Supabase Dashboard'da **Authentication** > **Users** bölümünden kullanıcıyı manuel olarak onaylayabilirsiniz

5. `http://localhost:3000/auth/login` adresinden giriş yapın

6. Başarılı giriş sonrası `/dashboard` sayfasına yönlendirilmelisiniz

## 6. Vercel Deployment

Vercel'e deploy ederken:

1. Vercel Dashboard'da projenize gidin
2. **Settings** > **Environment Variables** bölümüne gidin
3. Aşağıdaki değişkenleri ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`

4. Supabase Authentication Settings'de production URL'inizi ekleyin:
   - Site URL: `https://your-domain.vercel.app`
   - Redirect URL: `https://your-domain.vercel.app/auth/callback`

## Sorun Giderme

### "Invalid API key" hatası
- `.env.local` dosyasının doğru konumda olduğundan emin olun
- Environment variable'ların doğru kopyalandığından emin olun
- Development sunucusunu yeniden başlatın

### Email gönderilmiyor
- Supabase Dashboard > Authentication > Email Templates kontrol edin
- SMTP ayarlarını yapılandırın (production için)
- Development'ta email confirmation'ı kapatabilirsiniz

### RLS Policy hataları
- SQL komutlarının tamamının çalıştırıldığından emin olun
- Supabase Dashboard > Database > Policies bölümünden policy'leri kontrol edin

## Ek Kaynaklar

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
