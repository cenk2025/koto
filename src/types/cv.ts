export interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    dateOfBirth: string;
    nationality: string;
    photoUrl?: string;
}

export interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Skill {
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Language {
    id: string;
    name: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface CV {
    id?: string;
    userId?: string;
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    languages: Language[];
    createdAt?: string;
    updatedAt?: string;
}

export const emptyCV: CV = {
    personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        dateOfBirth: '',
        nationality: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
};
