export interface City {
    id: string;
    name: string;
    nameFi: string;
    population: number;
}

export interface Service {
    id: string;
    cityId: string;
    category: 'immigration' | 'employment' | 'education' | 'healthcare' | 'housing' | 'integration';
    name: string;
    nameFi: string;
    description: string;
    descriptionFi: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    openingHours: string;
    openingHoursFi: string;
}

export const cities: City[] = [
    { id: 'helsinki', name: 'Helsinki', nameFi: 'Helsinki', population: 656920 },
    { id: 'espoo', name: 'Espoo', nameFi: 'Espoo', population: 297132 },
    { id: 'tampere', name: 'Tampere', nameFi: 'Tampere', population: 244029 },
    { id: 'vantaa', name: 'Vantaa', nameFi: 'Vantaa', population: 239216 },
    { id: 'oulu', name: 'Oulu', nameFi: 'Oulu', population: 208939 },
    { id: 'turku', name: 'Turku', nameFi: 'Turku', population: 195301 },
    { id: 'jyvaskyla', name: 'Jyväskylä', nameFi: 'Jyväskylä', population: 143400 },
    { id: 'lahti', name: 'Lahti', nameFi: 'Lahti', population: 119984 },
    { id: 'kuopio', name: 'Kuopio', nameFi: 'Kuopio', population: 120211 },
    { id: 'pori', name: 'Pori', nameFi: 'Pori', population: 83809 },
];

export const services: Service[] = [
    // Helsinki Services
    {
        id: 'hel-immigration-1',
        cityId: 'helsinki',
        category: 'immigration',
        name: 'Helsinki Immigration Office',
        nameFi: 'Helsingin maahanmuuttovirasto',
        description: 'Main immigration office for residence permit applications and renewals',
        descriptionFi: 'Pääasiallinen maahanmuuttovirasto oleskelulupahakemuksia ja uusimisia varten',
        address: 'Sörnäisten rantatie 25, 00500 Helsinki',
        phone: '+358 295 419 600',
        email: 'kirjaamo.migri@migri.fi',
        website: 'https://migri.fi',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
    {
        id: 'hel-employment-1',
        cityId: 'helsinki',
        category: 'employment',
        name: 'TE Services Helsinki',
        nameFi: 'TE-palvelut Helsinki',
        description: 'Employment services, job search assistance, and career counseling',
        descriptionFi: 'Työvoimapalvelut, työnhakuapu ja uraneuvonta',
        address: 'Siltasaarenkatu 12, 00530 Helsinki',
        phone: '+358 295 020 702',
        email: 'te.helsinki@te-toimisto.fi',
        website: 'https://www.te-palvelut.fi',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
    {
        id: 'hel-integration-1',
        cityId: 'helsinki',
        category: 'integration',
        name: 'Helsinki Integration Services',
        nameFi: 'Helsingin kotoutumispalvelut',
        description: 'Integration programs, Finnish language courses, and cultural orientation',
        descriptionFi: 'Kotoutumisohjelmat, suomen kielen kurssit ja kulttuuriorientaatio',
        address: 'Toinen linja 4 A, 00530 Helsinki',
        phone: '+358 9 310 1641',
        email: 'kotoutuminen@hel.fi',
        website: 'https://www.hel.fi/helsinki/fi/kasvatus-ja-koulutus/kotoutuminen',
        openingHours: 'Mon-Fri 9:00-15:00',
        openingHoursFi: 'Ma-Pe 9:00-15:00',
    },
    {
        id: 'hel-education-1',
        cityId: 'helsinki',
        category: 'education',
        name: 'Helsinki Adult Education Centre',
        nameFi: 'Helsingin aikuisopisto',
        description: 'Adult education, language courses, and vocational training',
        descriptionFi: 'Aikuiskoulutus, kielikurssit ja ammatillinen koulutus',
        address: 'Helsinginkatu 26, 00530 Helsinki',
        phone: '+358 9 310 88500',
        email: 'aikuisopisto@hel.fi',
        website: 'https://www.hel.fi/aikuisopisto',
        openingHours: 'Mon-Thu 9:00-19:00, Fri 9:00-16:00',
        openingHoursFi: 'Ma-To 9:00-19:00, Pe 9:00-16:00',
    },
    {
        id: 'hel-healthcare-1',
        cityId: 'helsinki',
        category: 'healthcare',
        name: 'Helsinki Health Centre',
        nameFi: 'Helsingin terveysasema',
        description: 'Primary healthcare services for residents',
        descriptionFi: 'Perusterveydenhuoltopalvelut asukkaille',
        address: 'Haartmaninkatu 4, 00290 Helsinki',
        phone: '+358 9 310 10023',
        email: 'terveysasema@hel.fi',
        website: 'https://www.hel.fi/helsinki/fi/sosiaali-ja-terveyspalvelut',
        openingHours: 'Mon-Fri 8:00-18:00',
        openingHoursFi: 'Ma-Pe 8:00-18:00',
    },
    {
        id: 'hel-housing-1',
        cityId: 'helsinki',
        category: 'housing',
        name: 'Helsinki Housing Services',
        nameFi: 'Helsingin asuntopalvelut',
        description: 'Housing assistance and rental apartment applications',
        descriptionFi: 'Asumisapu ja vuokra-asuntohakemukset',
        address: 'Elimäenkatu 25 B, 00510 Helsinki',
        phone: '+358 9 310 42870',
        email: 'asuntopalvelut@hel.fi',
        website: 'https://www.hel.fi/helsinki/fi/asuminen-ja-ymparisto/asunnot',
        openingHours: 'Mon-Fri 9:00-15:00',
        openingHoursFi: 'Ma-Pe 9:00-15:00',
    },

    // Espoo Services
    {
        id: 'esp-immigration-1',
        cityId: 'espoo',
        category: 'immigration',
        name: 'Espoo Immigration Services',
        nameFi: 'Espoon maahanmuuttopalvelut',
        description: 'Immigration guidance and support services',
        descriptionFi: 'Maahanmuutto-ohjaus ja tukipalvelut',
        address: 'Kamreerintie 3, 02770 Espoo',
        phone: '+358 9 816 22000',
        email: 'maahanmuutto@espoo.fi',
        website: 'https://www.espoo.fi/fi/palvelut/maahanmuutto',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
    {
        id: 'esp-employment-1',
        cityId: 'espoo',
        category: 'employment',
        name: 'TE Services Espoo',
        nameFi: 'TE-palvelut Espoo',
        description: 'Employment and business services',
        descriptionFi: 'Työ- ja elinkeinopalvelut',
        address: 'Siltakatu 11, 02770 Espoo',
        phone: '+358 295 020 703',
        email: 'te.espoo@te-toimisto.fi',
        website: 'https://www.te-palvelut.fi',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
    {
        id: 'esp-integration-1',
        cityId: 'espoo',
        category: 'integration',
        name: 'Espoo Integration Centre',
        nameFi: 'Espoon kotoutumiskeskus',
        description: 'Integration programs and Finnish language training',
        descriptionFi: 'Kotoutumisohjelmat ja suomen kielen opetus',
        address: 'Sokinmäentie 1, 02760 Espoo',
        phone: '+358 9 816 27500',
        email: 'kotoutuminen@espoo.fi',
        website: 'https://www.espoo.fi/fi/palvelut/kotoutuminen',
        openingHours: 'Mon-Fri 9:00-15:00',
        openingHoursFi: 'Ma-Pe 9:00-15:00',
    },

    // Tampere Services
    {
        id: 'tam-immigration-1',
        cityId: 'tampere',
        category: 'immigration',
        name: 'Tampere Immigration Services',
        nameFi: 'Tampereen maahanmuuttopalvelut',
        description: 'Immigration counseling and integration support',
        descriptionFi: 'Maahanmuuttoneuvonta ja kotoutumistuki',
        address: 'Aleksis Kiven katu 14-16, 33100 Tampere',
        phone: '+358 3 5656 000',
        email: 'maahanmuutto@tampere.fi',
        website: 'https://www.tampere.fi/sosiaali-ja-terveyspalvelut/maahanmuutto',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
    {
        id: 'tam-employment-1',
        cityId: 'tampere',
        category: 'employment',
        name: 'TE Services Tampere',
        nameFi: 'TE-palvelut Tampere',
        description: 'Job search and career development services',
        descriptionFi: 'Työnhaku ja urankehityspalvelut',
        address: 'Frenckellin aukio 1, 33100 Tampere',
        phone: '+358 295 020 704',
        email: 'te.tampere@te-toimisto.fi',
        website: 'https://www.te-palvelut.fi',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
    {
        id: 'tam-integration-1',
        cityId: 'tampere',
        category: 'integration',
        name: 'Tampere Integration Services',
        nameFi: 'Tampereen kotoutumispalvelut',
        description: 'Integration and language learning support',
        descriptionFi: 'Kotoutumis- ja kielenoppimistuki',
        address: 'Satakunnankatu 18, 33100 Tampere',
        phone: '+358 3 5656 5000',
        email: 'kotoutuminen@tampere.fi',
        website: 'https://www.tampere.fi/varhaiskasvatus-ja-koulutus/kotoutuminen',
        openingHours: 'Mon-Fri 9:00-15:00',
        openingHoursFi: 'Ma-Pe 9:00-15:00',
    },

    // Vantaa Services
    {
        id: 'van-immigration-1',
        cityId: 'vantaa',
        category: 'immigration',
        name: 'Vantaa Immigration Office',
        nameFi: 'Vantaan maahanmuuttovirasto',
        description: 'Immigration services and guidance',
        descriptionFi: 'Maahanmuuttopalvelut ja neuvonta',
        address: 'Kielotie 13, 01300 Vantaa',
        phone: '+358 9 8392 111',
        email: 'maahanmuutto@vantaa.fi',
        website: 'https://www.vantaa.fi/fi/sosiaali-_ja_terveyspalvelut/maahanmuutto',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
    {
        id: 'van-employment-1',
        cityId: 'vantaa',
        category: 'employment',
        name: 'TE Services Vantaa',
        nameFi: 'TE-palvelut Vantaa',
        description: 'Employment services and job matching',
        descriptionFi: 'Työvoimapalvelut ja työnvälitys',
        address: 'Kielotie 13, 01300 Vantaa',
        phone: '+358 295 020 705',
        email: 'te.vantaa@te-toimisto.fi',
        website: 'https://www.te-palvelut.fi',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },

    // Oulu Services
    {
        id: 'oul-immigration-1',
        cityId: 'oulu',
        category: 'immigration',
        name: 'Oulu Immigration Services',
        nameFi: 'Oulun maahanmuuttopalvelut',
        description: 'Immigration counseling and integration programs',
        descriptionFi: 'Maahanmuuttoneuvonta ja kotoutumisohjelmat',
        address: 'Isokatu 11, 90100 Oulu',
        phone: '+358 8 558 410',
        email: 'maahanmuutto@ouka.fi',
        website: 'https://www.ouka.fi/oulu/maahanmuutto',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
    {
        id: 'oul-employment-1',
        cityId: 'oulu',
        category: 'employment',
        name: 'TE Services Oulu',
        nameFi: 'TE-palvelut Oulu',
        description: 'Employment and entrepreneurship services',
        descriptionFi: 'Työ- ja yrityspalvelut',
        address: 'Albertinkatu 34, 90100 Oulu',
        phone: '+358 295 020 706',
        email: 'te.oulu@te-toimisto.fi',
        website: 'https://www.te-palvelut.fi',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },

    // Turku Services
    {
        id: 'tur-immigration-1',
        cityId: 'turku',
        category: 'immigration',
        name: 'Turku Immigration Office',
        nameFi: 'Turun maahanmuuttovirasto',
        description: 'Immigration services and residence permit assistance',
        descriptionFi: 'Maahanmuuttopalvelut ja oleskelulupa-apu',
        address: 'Aurakatu 8, 20100 Turku',
        phone: '+358 2 330 000',
        email: 'maahanmuutto@turku.fi',
        website: 'https://www.turku.fi/sosiaali-ja-terveyspalvelut/maahanmuutto',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
    {
        id: 'tur-employment-1',
        cityId: 'turku',
        category: 'employment',
        name: 'TE Services Turku',
        nameFi: 'TE-palvelut Turku',
        description: 'Job search and career services',
        descriptionFi: 'Työnhaku ja urapalvelut',
        address: 'Yliopistonkatu 31, 20100 Turku',
        phone: '+358 295 020 707',
        email: 'te.turku@te-toimisto.fi',
        website: 'https://www.te-palvelut.fi',
        openingHours: 'Mon-Fri 9:00-16:00',
        openingHoursFi: 'Ma-Pe 9:00-16:00',
    },
];

export function getServicesByCity(cityId: string): Service[] {
    return services.filter(service => service.cityId === cityId);
}

export function getServicesByCategory(category: Service['category']): Service[] {
    return services.filter(service => service.category === category);
}

export function getCityById(cityId: string): City | undefined {
    return cities.find(city => city.id === cityId);
}
