'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CV, emptyCV, Experience, Education, Skill, Language as CVLanguage } from '@/types/cv';
import { generateCVPDF } from '@/utils/pdfGenerator';
import { supabase } from '@/lib/supabase';
import {
    Save,
    Download,
    Eye,
    Plus,
    Trash2,
    Upload,
    User,
    Briefcase,
    GraduationCap,
    Award,
    Globe,
    Sparkles,
    FileText,
    CheckCircle,
    ChevronRight,
    Search,
    Loader2
} from 'lucide-react';

export default function CVBuilder() {
    const { t, language } = useLanguage();
    const router = useRouter();
    const [cv, setCV] = useState<CV>(emptyCV);
    const [activeSection, setActiveSection] = useState<string>('personal');
    const [photoPreview, setPhotoPreview] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        checkUserAndLoadCV();
    }, []);

    const checkUserAndLoadCV = async () => {
        try {
            const { data: { user: authUser } } = await supabase.auth.getUser();

            if (!authUser) {
                router.push('/auth/login');
                return;
            }

            setUser(authUser);

            // Load existing CV from database
            const { data: cvData, error } = await supabase
                .from('cvs')
                .select('*')
                .eq('user_id', authUser.id)
                .single();

            if (cvData && !error) {
                const loadedCV: CV = {
                    personalInfo: cvData.personal_info || emptyCV.personalInfo,
                    summary: cvData.summary || '',
                    experience: cvData.experience || [],
                    education: cvData.education || [],
                    skills: cvData.skills || [],
                    languages: cvData.languages || [],
                };
                setCV(loadedCV);

                // Set photo preview if exists
                if (loadedCV.personalInfo.photoUrl) {
                    setPhotoPreview(loadedCV.personalInfo.photoUrl);
                }
            }
        } catch (error) {
            console.error('Error loading CV:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCV = async () => {
        if (!user) {
            alert(language === 'fi' ? 'Kirjaudu sisään tallentaaksesi CV:n' : 'Please login to save your CV');
            return;
        }

        setSaving(true);
        try {
            const cvData = {
                user_id: user.id,
                personal_info: cv.personalInfo,
                summary: cv.summary,
                experience: cv.experience,
                education: cv.education,
                skills: cv.skills,
                languages: cv.languages,
                photo_url: cv.personalInfo.photoUrl,
                updated_at: new Date().toISOString(),
            };

            // Check if CV exists
            const { data: existing } = await supabase
                .from('cvs')
                .select('id')
                .eq('user_id', user.id)
                .single();

            if (existing) {
                // Update existing CV
                const { error } = await supabase
                    .from('cvs')
                    .update(cvData)
                    .eq('user_id', user.id);

                if (error) throw error;
            } else {
                // Insert new CV
                const { error } = await supabase
                    .from('cvs')
                    .insert([cvData]);

                if (error) throw error;
            }

            alert(language === 'fi' ? 'CV tallennettu onnistuneesti!' : 'CV saved successfully!');
        } catch (error: any) {
            console.error('Error saving CV:', error);
            alert(language === 'fi' ? 'Virhe tallennettaessa CV:tä' : 'Error saving CV');
        } finally {
            setSaving(false);
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPhotoPreview(result);
                setCV({
                    ...cv,
                    personalInfo: {
                        ...cv.personalInfo,
                        photoUrl: result,
                    },
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const addExperience = () => {
        const newExp: Experience = {
            id: Date.now().toString(),
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
        };
        setCV({ ...cv, experience: [...cv.experience, newExp] });
    };

    const updateExperience = (id: string, field: keyof Experience, value: any) => {
        setCV({
            ...cv,
            experience: cv.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            ),
        });
    };

    const removeExperience = (id: string) => {
        setCV({
            ...cv,
            experience: cv.experience.filter(exp => exp.id !== id),
        });
    };

    const addEducation = () => {
        const newEdu: Education = {
            id: Date.now().toString(),
            degree: '',
            institution: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            description: '',
        };
        setCV({ ...cv, education: [...cv.education, newEdu] });
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        setCV({
            ...cv,
            education: cv.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            ),
        });
    };

    const removeEducation = (id: string) => {
        setCV({
            ...cv,
            education: cv.education.filter(edu => edu.id !== id),
        });
    };

    const addSkill = () => {
        const newSkill: Skill = {
            id: Date.now().toString(),
            name: '',
            level: 'intermediate',
        };
        setCV({ ...cv, skills: [...cv.skills, newSkill] });
    };

    const updateSkill = (id: string, field: keyof Skill, value: any) => {
        setCV({
            ...cv,
            skills: cv.skills.map(skill =>
                skill.id === id ? { ...skill, [field]: value } : skill
            ),
        });
    };

    const removeSkill = (id: string) => {
        setCV({
            ...cv,
            skills: cv.skills.filter(skill => skill.id !== id),
        });
    };

    const addLanguage = () => {
        const newLang: CVLanguage = {
            id: Date.now().toString(),
            name: '',
            proficiency: 'conversational',
        };
        setCV({ ...cv, languages: [...cv.languages, newLang] });
    };

    const updateLanguage = (id: string, field: keyof CVLanguage, value: any) => {
        setCV({
            ...cv,
            languages: cv.languages.map(lang =>
                lang.id === id ? { ...lang, [field]: value } : lang
            ),
        });
    };

    const removeLanguage = (id: string) => {
        setCV({
            ...cv,
            languages: cv.languages.filter(lang => lang.id !== id),
        });
    };

    const handleDownloadPDF = async () => {
        await generateCVPDF(cv, language);
    };

    const sections = [
        { id: 'personal', name: t('cv.personal.title'), icon: User },
        { id: 'summary', name: t('cv.summary.title'), icon: User },
        { id: 'experience', name: t('cv.experience.title'), icon: Briefcase },
        { id: 'education', name: t('cv.education.title'), icon: GraduationCap },
        { id: 'skills', name: t('cv.skills.title'), icon: Award },
        { id: 'languages', name: t('cv.languages.title'), icon: Globe },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-8 md:py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
                            <FileText className="w-4 h-4" />
                            <span>CV Builder</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            {t('cv.title')}
                        </h1>
                        <p className="text-gray-600 max-w-2xl">
                            {language === 'fi'
                                ? 'Luo ammattimainen CV suomalaisen työmarkkinan vaatimusten mukaisesti'
                                : 'Create a professional CV that meets Finnish job market standards'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1">
                            <div className="card sticky top-20">
                                <nav className="space-y-1">
                                    {sections.map((section) => {
                                        const Icon = section.icon;
                                        const isActive = activeSection === section.id;
                                        return (
                                            <button
                                                key={section.id}
                                                onClick={() => setActiveSection(section.id)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4 flex-shrink-0" />
                                                <span className="truncate">{section.name}</span>
                                            </button>
                                        );
                                    })}
                                </nav>

                                {/* Actions */}
                                <div className="mt-6 space-y-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={handleSaveCV}
                                        disabled={saving}
                                        className="w-full btn-primary flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                {language === 'fi' ? 'Tallennetaan...' : 'Saving...'}
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                {t('cv.actions.save')}
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="w-full btn-secondary flex items-center justify-center text-sm"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        {t('cv.actions.download')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="card">
                                {/* Personal Information */}
                                {activeSection === 'personal' && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                            {t('cv.personal.title')}
                                        </h2>

                                        {/* Photo Upload */}
                                        <div className="flex items-center space-x-6">
                                            <div className="flex-shrink-0">
                                                {photoPreview ? (
                                                    <img
                                                        src={photoPreview}
                                                        alt="Profile"
                                                        className="w-32 h-32 rounded-lg object-cover border-4 border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                                                        <User className="w-16 h-16 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="btn btn-secondary cursor-pointer inline-flex items-center">
                                                    <Upload className="w-5 h-5 mr-2" />
                                                    {t('cv.personal.uploadPhoto')}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handlePhotoUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {language === 'fi'
                                                        ? 'Suositellaan ammattimaisesta kuvasta'
                                                        : 'Professional photo recommended'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Personal Info Fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('cv.personal.firstName')}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={cv.personalInfo.firstName}
                                                    onChange={(e) =>
                                                        setCV({
                                                            ...cv,
                                                            personalInfo: { ...cv.personalInfo, firstName: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('cv.personal.lastName')}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={cv.personalInfo.lastName}
                                                    onChange={(e) =>
                                                        setCV({
                                                            ...cv,
                                                            personalInfo: { ...cv.personalInfo, lastName: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('cv.personal.email')}
                                                </label>
                                                <input
                                                    type="email"
                                                    className="input"
                                                    value={cv.personalInfo.email}
                                                    onChange={(e) =>
                                                        setCV({
                                                            ...cv,
                                                            personalInfo: { ...cv.personalInfo, email: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('cv.personal.phone')}
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="input"
                                                    value={cv.personalInfo.phone}
                                                    onChange={(e) =>
                                                        setCV({
                                                            ...cv,
                                                            personalInfo: { ...cv.personalInfo, phone: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('cv.personal.address')}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={cv.personalInfo.address}
                                                    onChange={(e) =>
                                                        setCV({
                                                            ...cv,
                                                            personalInfo: { ...cv.personalInfo, address: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('cv.personal.city')}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={cv.personalInfo.city}
                                                    onChange={(e) =>
                                                        setCV({
                                                            ...cv,
                                                            personalInfo: { ...cv.personalInfo, city: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('cv.personal.postalCode')}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={cv.personalInfo.postalCode}
                                                    onChange={(e) =>
                                                        setCV({
                                                            ...cv,
                                                            personalInfo: { ...cv.personalInfo, postalCode: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('cv.personal.dateOfBirth')}
                                                </label>
                                                <input
                                                    type="date"
                                                    className="input"
                                                    value={cv.personalInfo.dateOfBirth}
                                                    onChange={(e) =>
                                                        setCV({
                                                            ...cv,
                                                            personalInfo: { ...cv.personalInfo, dateOfBirth: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('cv.personal.nationality')}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={cv.personalInfo.nationality}
                                                    onChange={(e) =>
                                                        setCV({
                                                            ...cv,
                                                            personalInfo: { ...cv.personalInfo, nationality: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Professional Summary */}
                                {activeSection === 'summary' && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                            {t('cv.summary.title')}
                                        </h2>
                                        <div>
                                            <textarea
                                                className="textarea"
                                                rows={8}
                                                placeholder={t('cv.summary.placeholder')}
                                                value={cv.summary}
                                                onChange={(e) => setCV({ ...cv, summary: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Work Experience */}
                                {activeSection === 'experience' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {t('cv.experience.title')}
                                            </h2>
                                            <button
                                                onClick={addExperience}
                                                className="btn-primary flex items-center"
                                            >
                                                <Plus className="w-5 h-5 mr-2" />
                                                {t('cv.experience.add')}
                                            </button>
                                        </div>

                                        {cv.experience.map((exp, index) => (
                                            <div key={exp.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {language === 'fi' ? 'Työkokemus' : 'Experience'} #{index + 1}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeExperience(exp.id)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.experience.jobTitle')}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            value={exp.jobTitle}
                                                            onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.experience.company')}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            value={exp.company}
                                                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.experience.location')}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            value={exp.location}
                                                            onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.experience.startDate')}
                                                        </label>
                                                        <input
                                                            type="month"
                                                            className="input"
                                                            value={exp.startDate}
                                                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.experience.endDate')}
                                                        </label>
                                                        <input
                                                            type="month"
                                                            className="input"
                                                            value={exp.endDate}
                                                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                                            disabled={exp.current}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={exp.current}
                                                                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                            />
                                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                                                {t('cv.experience.current')}
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.experience.description')}
                                                        </label>
                                                        <textarea
                                                            className="textarea"
                                                            rows={4}
                                                            value={exp.description}
                                                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {cv.experience.length === 0 && (
                                            <div className="text-center py-12 text-gray-500">
                                                {language === 'fi'
                                                    ? 'Ei vielä työkokemusta. Klikkaa "Lisää työkokemus" aloittaaksesi.'
                                                    : 'No work experience yet. Click "Add Experience" to get started.'}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Education */}
                                {activeSection === 'education' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {t('cv.education.title')}
                                            </h2>
                                            <button
                                                onClick={addEducation}
                                                className="btn-primary flex items-center"
                                            >
                                                <Plus className="w-5 h-5 mr-2" />
                                                {t('cv.education.add')}
                                            </button>
                                        </div>

                                        {cv.education.map((edu, index) => (
                                            <div key={edu.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {language === 'fi' ? 'Koulutus' : 'Education'} #{index + 1}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeEducation(edu.id)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.education.degree')}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            value={edu.degree}
                                                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.education.institution')}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            value={edu.institution}
                                                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.education.fieldOfStudy')}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            value={edu.fieldOfStudy}
                                                            onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.education.startDate')}
                                                        </label>
                                                        <input
                                                            type="month"
                                                            className="input"
                                                            value={edu.startDate}
                                                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.education.endDate')}
                                                        </label>
                                                        <input
                                                            type="month"
                                                            className="input"
                                                            value={edu.endDate}
                                                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.education.description')}
                                                        </label>
                                                        <textarea
                                                            className="textarea"
                                                            rows={3}
                                                            value={edu.description}
                                                            onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {cv.education.length === 0 && (
                                            <div className="text-center py-12 text-gray-500">
                                                {language === 'fi'
                                                    ? 'Ei vielä koulutusta. Klikkaa "Lisää koulutus" aloittaaksesi.'
                                                    : 'No education yet. Click "Add Education" to get started.'}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Skills */}
                                {activeSection === 'skills' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {t('cv.skills.title')}
                                            </h2>
                                            <button
                                                onClick={addSkill}
                                                className="btn-primary flex items-center"
                                            >
                                                <Plus className="w-5 h-5 mr-2" />
                                                {t('cv.skills.add')}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {cv.skills.map((skill) => (
                                                <div key={skill.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <input
                                                            type="text"
                                                            className="input flex-1 mr-2"
                                                            placeholder={t('cv.skills.name')}
                                                            value={skill.name}
                                                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                                        />
                                                        <button
                                                            onClick={() => removeSkill(skill.id)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <select
                                                        className="input"
                                                        value={skill.level}
                                                        onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                                                    >
                                                        <option value="beginner">{t('cv.skills.level.beginner')}</option>
                                                        <option value="intermediate">{t('cv.skills.level.intermediate')}</option>
                                                        <option value="advanced">{t('cv.skills.level.advanced')}</option>
                                                        <option value="expert">{t('cv.skills.level.expert')}</option>
                                                    </select>
                                                </div>
                                            ))}
                                        </div>

                                        {cv.skills.length === 0 && (
                                            <div className="text-center py-12 text-gray-500">
                                                {language === 'fi'
                                                    ? 'Ei vielä taitoja. Klikkaa "Lisää taito" aloittaaksesi.'
                                                    : 'No skills yet. Click "Add Skill" to get started.'}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Languages */}
                                {activeSection === 'languages' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {t('cv.languages.title')}
                                            </h2>
                                            <button
                                                onClick={addLanguage}
                                                className="btn-primary flex items-center"
                                            >
                                                <Plus className="w-5 h-5 mr-2" />
                                                {t('cv.languages.add')}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {cv.languages.map((lang) => (
                                                <div key={lang.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <input
                                                            type="text"
                                                            className="input flex-1 mr-2"
                                                            placeholder={t('cv.languages.name')}
                                                            value={lang.name}
                                                            onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                                                        />
                                                        <button
                                                            onClick={() => removeLanguage(lang.id)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <select
                                                        className="input"
                                                        value={lang.proficiency}
                                                        onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                                                    >
                                                        <option value="basic">{t('cv.languages.proficiency.basic')}</option>
                                                        <option value="conversational">{t('cv.languages.proficiency.conversational')}</option>
                                                        <option value="fluent">{t('cv.languages.proficiency.fluent')}</option>
                                                        <option value="native">{t('cv.languages.proficiency.native')}</option>
                                                    </select>
                                                </div>
                                            ))}
                                        </div>

                                        {cv.languages.length === 0 && (
                                            <div className="text-center py-12 text-gray-500">
                                                {language === 'fi'
                                                    ? 'Ei vielä kieliä. Klikkaa "Lisää kieli" aloittaaksesi.'
                                                    : 'No languages yet. Click "Add Language" to get started.'}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
