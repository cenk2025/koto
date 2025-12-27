'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CV, emptyCV, Experience, Education, Skill, Language as CVLanguage } from '@/types/cv';
import { generateCVPDF } from '@/utils/pdfGenerator';
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
    Search
} from 'lucide-react';

export default function CVBuilder() {
    const { t, language } = useLanguage();
    const [cv, setCV] = useState<CV>(emptyCV);
    const [activeSection, setActiveSection] = useState<string>('personal');
    const [photoPreview, setPhotoPreview] = useState<string>('');

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
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <Header />

            <main className="flex-grow py-12 relative z-10">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12 text-center fade-in-up">
                        <div className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full mb-6 mx-auto">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                CV Builder
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t('cv.title')}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {language === 'fi'
                                ? 'Luo ammattimainen CV suomalaisen työmarkkinan vaatimusten mukaisesti'
                                : 'Create a professional CV that meets Finnish job market standards'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1 fade-in-up stagger-1">
                            <div className="card-premium p-6 sticky top-24">
                                <nav className="space-y-2">
                                    {sections.map((section) => {
                                        const Icon = section.icon;
                                        const isActive = activeSection === section.id;
                                        return (
                                            <button
                                                key={section.id}
                                                onClick={() => setActiveSection(section.id)}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                                    }`}
                                            >
                                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                                                <span className="font-medium">{section.name}</span>
                                                {isActive && <ChevronRight className="w-4 h-4 ml-auto animate-pulse" />}
                                            </button>
                                        );
                                    })}
                                </nav>

                                {/* Actions */}
                                <div className="mt-8 space-y-3 pt-6 border-t border-gray-100">
                                    <button className="w-full btn-premium btn-primary flex items-center justify-center group">
                                        <Save className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                        {t('cv.actions.save')}
                                    </button>
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="w-full btn-premium btn-secondary flex items-center justify-center group"
                                    >
                                        <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                        {t('cv.actions.download')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="card-premium p-8 fade-in-up stagger-2">
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
                                                    className="input-premium"
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
                                                    className="input-premium"
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
                                                    className="input-premium"
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
                                                    className="input-premium"
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
                                                    className="input-premium"
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
                                                    className="input-premium"
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
                                                    className="input-premium"
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
                                                    className="input-premium"
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
                                                    className="input-premium"
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
                                                className="textarea-premium"
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
                                                className="btn-premium btn-primary flex items-center"
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
                                                            className="input-premium"
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
                                                            className="input-premium"
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
                                                            className="input-premium"
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
                                                            className="input-premium"
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
                                                            className="input-premium"
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
                                                            className="textarea-premium"
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
                                                className="btn-premium btn-primary flex items-center"
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
                                                            className="input-premium"
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
                                                            className="input-premium"
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
                                                            className="input-premium"
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
                                                            className="input-premium"
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
                                                            className="input-premium"
                                                            value={edu.endDate}
                                                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            {t('cv.education.description')}
                                                        </label>
                                                        <textarea
                                                            className="textarea-premium"
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
                                                className="btn-premium btn-primary flex items-center"
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
                                                        className="input-premium"
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
                                                className="btn-premium btn-primary flex items-center"
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
                                                        className="input-premium"
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
