'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  fi: {
    // Navigation
    'nav.home': 'Etusivu',
    'nav.guides': 'Oppaat',
    'nav.cv': 'CV Rakentaja',
    'nav.services': 'Palvelut',
    'nav.dashboard': 'Hallintapaneeli',
    'nav.login': 'Kirjaudu sisään',
    'nav.logout': 'Kirjaudu ulos',
    'nav.register': 'Rekisteröidy',
    
    // Home Page
    'home.hero.title': 'Tervetuloa Suomeen',
    'home.hero.subtitle': 'Kattava opas maahanmuuttajille - Oikeudellisista asioista työelämään',
    'home.hero.cta': 'Aloita matka',
    
    // Features
    'features.legal.title': 'Oikeudelliset asiat',
    'features.legal.desc': 'Kaikki tarvitsemasi tieto oleskeluluvista, rekisteröinnistä ja oikeuksistasi',
    'features.work.title': 'Työnhaku',
    'features.work.desc': 'Löydä työpaikkoja, luo ammattimainen CV ja valmistaudu haastatteluihin',
    'features.cv.title': 'CV Rakentaja',
    'features.cv.desc': 'Luo suomalaisen työmarkkinan vaatimusten mukainen CV kuvalla ja PDF-viennillä',
    'features.services.title': 'Paikalliset palvelut',
    'features.services.desc': 'Löydä maahanmuuttajapalvelut kaupungeittain',
    
    // CV Builder
    'cv.title': 'CV Rakentaja',
    'cv.personal.title': 'Henkilötiedot',
    'cv.personal.firstName': 'Etunimi',
    'cv.personal.lastName': 'Sukunimi',
    'cv.personal.email': 'Sähköposti',
    'cv.personal.phone': 'Puhelin',
    'cv.personal.address': 'Osoite',
    'cv.personal.city': 'Kaupunki',
    'cv.personal.postalCode': 'Postinumero',
    'cv.personal.dateOfBirth': 'Syntymäaika',
    'cv.personal.nationality': 'Kansallisuus',
    'cv.personal.photo': 'Valokuva',
    'cv.personal.uploadPhoto': 'Lataa valokuva',
    
    'cv.summary.title': 'Ammatillinen yhteenveto',
    'cv.summary.placeholder': 'Kirjoita lyhyt yhteenveto osaamisestasi ja tavoitteistasi...',
    
    'cv.experience.title': 'Työkokemus',
    'cv.experience.add': 'Lisää työkokemus',
    'cv.experience.jobTitle': 'Tehtävänimike',
    'cv.experience.company': 'Yritys',
    'cv.experience.location': 'Sijainti',
    'cv.experience.startDate': 'Aloituspäivä',
    'cv.experience.endDate': 'Lopetuspäivä',
    'cv.experience.current': 'Nykyinen työpaikka',
    'cv.experience.description': 'Kuvaus',
    
    'cv.education.title': 'Koulutus',
    'cv.education.add': 'Lisää koulutus',
    'cv.education.degree': 'Tutkinto',
    'cv.education.institution': 'Oppilaitos',
    'cv.education.fieldOfStudy': 'Opintoala',
    'cv.education.startDate': 'Aloituspäivä',
    'cv.education.endDate': 'Lopetuspäivä',
    'cv.education.description': 'Kuvaus',
    
    'cv.skills.title': 'Taidot',
    'cv.skills.add': 'Lisää taito',
    'cv.skills.name': 'Taidon nimi',
    'cv.skills.level': 'Taso',
    'cv.skills.level.beginner': 'Aloittelija',
    'cv.skills.level.intermediate': 'Keskitaso',
    'cv.skills.level.advanced': 'Edistynyt',
    'cv.skills.level.expert': 'Asiantuntija',
    
    'cv.languages.title': 'Kielet',
    'cv.languages.add': 'Lisää kieli',
    'cv.languages.name': 'Kieli',
    'cv.languages.proficiency': 'Taitotaso',
    'cv.languages.proficiency.basic': 'Perustaso',
    'cv.languages.proficiency.conversational': 'Keskustelutaso',
    'cv.languages.proficiency.fluent': 'Sujuva',
    'cv.languages.proficiency.native': 'Äidinkieli',
    
    'cv.actions.save': 'Tallenna',
    'cv.actions.preview': 'Esikatselu',
    'cv.actions.download': 'Lataa PDF',
    'cv.actions.remove': 'Poista',
    
    // Services
    'services.title': 'Maahanmuuttajapalvelut',
    'services.selectCity': 'Valitse kaupunki',
    'services.category.immigration': 'Maahanmuutto',
    'services.category.employment': 'Työllistyminen',
    'services.category.education': 'Koulutus',
    'services.category.healthcare': 'Terveydenhuolto',
    'services.category.housing': 'Asuminen',
    'services.category.integration': 'Kotoutuminen',
    
    // Dashboard
    'dashboard.title': 'Hallintapaneeli',
    'dashboard.welcome': 'Tervetuloa takaisin',
    'dashboard.profile': 'Profiili',
    'dashboard.myCv': 'Minun CV',
    'dashboard.savedServices': 'Tallennetut palvelut',
    'dashboard.progress': 'Edistyminen',
    
    // Auth
    'auth.login.title': 'Kirjaudu sisään',
    'auth.login.email': 'Sähköposti',
    'auth.login.password': 'Salasana',
    'auth.login.submit': 'Kirjaudu',
    'auth.login.noAccount': 'Eikö sinulla ole tiliä?',
    'auth.register.title': 'Rekisteröidy',
    'auth.register.name': 'Nimi',
    'auth.register.email': 'Sähköposti',
    'auth.register.password': 'Salasana',
    'auth.register.confirmPassword': 'Vahvista salasana',
    'auth.register.submit': 'Rekisteröidy',
    'auth.register.hasAccount': 'Onko sinulla jo tili?',
    
    // Guides
    'guides.title': 'Oppaat',
    'guides.legal.title': 'Oikeudelliset asiat',
    'guides.legal.residencePermit': 'Oleskelulupa',
    'guides.legal.registration': 'Rekisteröinti',
    'guides.legal.rights': 'Oikeutesi Suomessa',
    'guides.work.title': 'Työelämä',
    'guides.work.jobSearch': 'Työnhaku',
    'guides.work.interview': 'Työhaastattelu',
    'guides.work.workplace': 'Työpaikalla',
    
    // Common
    'common.loading': 'Ladataan...',
    'common.error': 'Virhe',
    'common.success': 'Onnistui',
    'common.cancel': 'Peruuta',
    'common.save': 'Tallenna',
    'common.edit': 'Muokkaa',
    'common.delete': 'Poista',
    'common.search': 'Hae',
    'common.filter': 'Suodata',
    'common.back': 'Takaisin',
    'common.next': 'Seuraava',
    'common.previous': 'Edellinen',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.guides': 'Guides',
    'nav.cv': 'CV Builder',
    'nav.services': 'Services',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.register': 'Register',
    
    // Home Page
    'home.hero.title': 'Welcome to Finland',
    'home.hero.subtitle': 'Comprehensive guide for immigrants - From legal matters to work life',
    'home.hero.cta': 'Start Your Journey',
    
    // Features
    'features.legal.title': 'Legal Matters',
    'features.legal.desc': 'Everything you need to know about residence permits, registration, and your rights',
    'features.work.title': 'Job Search',
    'features.work.desc': 'Find jobs, create professional CV, and prepare for interviews',
    'features.cv.title': 'CV Builder',
    'features.cv.desc': 'Create a CV that meets Finnish job market standards with photo and PDF export',
    'features.services.title': 'Local Services',
    'features.services.desc': 'Find immigrant services by city',
    
    // CV Builder
    'cv.title': 'CV Builder',
    'cv.personal.title': 'Personal Information',
    'cv.personal.firstName': 'First Name',
    'cv.personal.lastName': 'Last Name',
    'cv.personal.email': 'Email',
    'cv.personal.phone': 'Phone',
    'cv.personal.address': 'Address',
    'cv.personal.city': 'City',
    'cv.personal.postalCode': 'Postal Code',
    'cv.personal.dateOfBirth': 'Date of Birth',
    'cv.personal.nationality': 'Nationality',
    'cv.personal.photo': 'Photo',
    'cv.personal.uploadPhoto': 'Upload Photo',
    
    'cv.summary.title': 'Professional Summary',
    'cv.summary.placeholder': 'Write a brief summary of your skills and goals...',
    
    'cv.experience.title': 'Work Experience',
    'cv.experience.add': 'Add Experience',
    'cv.experience.jobTitle': 'Job Title',
    'cv.experience.company': 'Company',
    'cv.experience.location': 'Location',
    'cv.experience.startDate': 'Start Date',
    'cv.experience.endDate': 'End Date',
    'cv.experience.current': 'Current Position',
    'cv.experience.description': 'Description',
    
    'cv.education.title': 'Education',
    'cv.education.add': 'Add Education',
    'cv.education.degree': 'Degree',
    'cv.education.institution': 'Institution',
    'cv.education.fieldOfStudy': 'Field of Study',
    'cv.education.startDate': 'Start Date',
    'cv.education.endDate': 'End Date',
    'cv.education.description': 'Description',
    
    'cv.skills.title': 'Skills',
    'cv.skills.add': 'Add Skill',
    'cv.skills.name': 'Skill Name',
    'cv.skills.level': 'Level',
    'cv.skills.level.beginner': 'Beginner',
    'cv.skills.level.intermediate': 'Intermediate',
    'cv.skills.level.advanced': 'Advanced',
    'cv.skills.level.expert': 'Expert',
    
    'cv.languages.title': 'Languages',
    'cv.languages.add': 'Add Language',
    'cv.languages.name': 'Language',
    'cv.languages.proficiency': 'Proficiency',
    'cv.languages.proficiency.basic': 'Basic',
    'cv.languages.proficiency.conversational': 'Conversational',
    'cv.languages.proficiency.fluent': 'Fluent',
    'cv.languages.proficiency.native': 'Native',
    
    'cv.actions.save': 'Save',
    'cv.actions.preview': 'Preview',
    'cv.actions.download': 'Download PDF',
    'cv.actions.remove': 'Remove',
    
    // Services
    'services.title': 'Immigrant Services',
    'services.selectCity': 'Select City',
    'services.category.immigration': 'Immigration',
    'services.category.employment': 'Employment',
    'services.category.education': 'Education',
    'services.category.healthcare': 'Healthcare',
    'services.category.housing': 'Housing',
    'services.category.integration': 'Integration',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.profile': 'Profile',
    'dashboard.myCv': 'My CV',
    'dashboard.savedServices': 'Saved Services',
    'dashboard.progress': 'Progress',
    
    // Auth
    'auth.login.title': 'Login',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.submit': 'Login',
    'auth.login.noAccount': "Don't have an account?",
    'auth.register.title': 'Register',
    'auth.register.name': 'Name',
    'auth.register.email': 'Email',
    'auth.register.password': 'Password',
    'auth.register.confirmPassword': 'Confirm Password',
    'auth.register.submit': 'Register',
    'auth.register.hasAccount': 'Already have an account?',
    
    // Guides
    'guides.title': 'Guides',
    'guides.legal.title': 'Legal Matters',
    'guides.legal.residencePermit': 'Residence Permit',
    'guides.legal.registration': 'Registration',
    'guides.legal.rights': 'Your Rights in Finland',
    'guides.work.title': 'Work Life',
    'guides.work.jobSearch': 'Job Search',
    'guides.work.interview': 'Job Interview',
    'guides.work.workplace': 'At the Workplace',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fi');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'fi' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fi']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
