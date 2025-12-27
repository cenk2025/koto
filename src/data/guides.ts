export interface Guide {
    id: string;
    category: 'legal' | 'work' | 'life' | 'education';
    title: string;
    titleFi: string;
    description: string;
    descriptionFi: string;
    content: string;
    contentFi: string;
    icon: string;
}

export const guides: Guide[] = [
    {
        id: 'residence-permit',
        category: 'legal',
        title: 'Residence Permit in Finland',
        titleFi: 'Oleskelulupa Suomessa',
        description: 'Complete guide to applying for and renewing your residence permit',
        descriptionFi: 'Täydellinen opas oleskeluluvan hakemiseen ja uusimiseen',
        icon: '📋',
        content: `# Residence Permit in Finland

## Types of Residence Permits

### 1. Temporary Residence Permit (Type A)
- Valid for a fixed period
- Granted for work, studies, family ties, or other specific purposes
- Can be renewed

### 2. Continuous Residence Permit (Type B)
- Valid for 4 years at a time
- Requires 4 years of continuous residence with Type A permit
- More flexible than Type A

### 3. Permanent Residence Permit (Type P)
- No expiration date
- Requires 4 years of continuous residence with Type A or one Type B permit
- Provides most rights and freedoms

## Application Process

### Step 1: Determine Your Permit Type
Choose the right permit based on your purpose:
- Work
- Studies
- Family ties
- Entrepreneurship
- Other grounds

### Step 2: Prepare Documents
Required documents typically include:
- Valid passport
- Passport photos
- Application form
- Proof of income/livelihood
- Health insurance
- Purpose-specific documents

### Step 3: Submit Application
- Apply online at enterfinland.fi
- Or submit at Finnish embassy/consulate
- Pay the application fee

### Step 4: Wait for Decision
- Processing time: 2-8 months typically
- You may be called for an interview
- Additional documents may be requested

### Step 5: Collect Your Permit
- Residence permit card collected at police station
- Register at DVV (Digital and Population Data Services Agency)

## Important Notes

- Apply for renewal 3-4 months before expiry
- Keep copies of all documents
- Inform authorities of address changes
- Residence permit card must be carried at all times

## Useful Links

- Finnish Immigration Service (Migri): migri.fi
- Enter Finland (online applications): enterfinland.fi
- DVV Registration: dvv.fi
`,
        contentFi: `# Oleskelulupa Suomessa

## Oleskelulupien tyypit

### 1. Tilapäinen oleskelulupa (A-lupa)
- Voimassa määräajan
- Myönnetään työn, opiskelun, perhesiteen tai muun erityisen syyn perusteella
- Voidaan uusia

### 2. Jatkuva oleskelulupa (B-lupa)
- Voimassa 4 vuotta kerrallaan
- Edellyttää 4 vuoden yhtäjaksoista oleskelua A-luvalla
- Joustavampi kuin A-lupa

### 3. Pysyvä oleskelulupa (P-lupa)
- Ei vanhene
- Edellyttää 4 vuoden yhtäjaksoista oleskelua A-luvalla tai yhtä B-lupaa
- Tarjoaa eniten oikeuksia ja vapauksia

## Hakuprosessi

### Vaihe 1: Määritä lupasi tyyppi
Valitse oikea lupa tarkoituksesi perusteella:
- Työ
- Opiskelu
- Perheside
- Yrittäjyys
- Muut perusteet

### Vaihe 2: Valmistele asiakirjat
Tarvittavat asiakirjat yleensä sisältävät:
- Voimassa oleva passi
- Passikuvat
- Hakulomake
- Todistus toimeentulosta
- Sairausvakuutus
- Tarkoituskohtaiset asiakirjat

### Vaihe 3: Jätä hakemus
- Hae verkossa osoitteessa enterfinland.fi
- Tai jätä Suomen suurlähetystöön/konsulaattiin
- Maksa käsittelymaksu

### Vaihe 4: Odota päätöstä
- Käsittelyaika: tyypillisesti 2-8 kuukautta
- Sinut voidaan kutsua haastatteluun
- Lisäasiakirjoja voidaan pyytää

### Vaihe 5: Nouda lupasi
- Oleskelulupakortti noudetaan poliisiasemalta
- Rekisteröidy DVV:ssä (Digi- ja väestötietovirasto)

## Tärkeitä huomioita

- Hae uusimista 3-4 kuukautta ennen vanhentumista
- Säilytä kopiot kaikista asiakirjoista
- Ilmoita osoitteenmuutoksista viranomaisille
- Oleskelulupakortti on pidettävä aina mukana

## Hyödyllisiä linkkejä

- Maahanmuuttovirasto (Migri): migri.fi
- Enter Finland (verkkohakemukset): enterfinland.fi
- DVV Rekisteröinti: dvv.fi
`,
    },
    {
        id: 'job-search',
        category: 'work',
        title: 'Finding a Job in Finland',
        titleFi: 'Työnhaku Suomessa',
        description: 'Strategies and resources for successful job hunting in Finland',
        descriptionFi: 'Strategiat ja resurssit onnistuneeseen työnhakuun Suomessa',
        icon: '💼',
        content: `# Finding a Job in Finland

## Job Search Strategies

### 1. Online Job Portals
Popular job search websites:
- **TE-palvelut.fi** - Public employment services
- **Monster.fi** - General job listings
- **LinkedIn** - Professional networking and jobs
- **Oikotie.fi** - Jobs and housing
- **Duunitori.fi** - Wide range of positions
- **Indeed.fi** - International job search

### 2. Company Websites
- Check career pages of companies you're interested in
- Many companies post jobs only on their own sites
- Set up job alerts

### 3. Networking
- Attend industry events and meetups
- Join professional associations
- Use LinkedIn actively
- Inform your network you're job hunting

### 4. Recruitment Agencies
Specialized agencies for different fields:
- IT: Barona IT, Talented
- Healthcare: Terveyspalvelu, Mehiläinen
- Engineering: Academic Work, Randstad
- General: Adecco, Manpower

## Finnish CV Requirements

### Essential Elements
1. **Personal Information**
   - Full name
   - Contact details
   - Date of birth
   - Nationality
   - Professional photo (recommended)

2. **Professional Summary**
   - Brief overview of your expertise
   - Career goals

3. **Work Experience**
   - Reverse chronological order
   - Job title, company, dates
   - Key responsibilities and achievements

4. **Education**
   - Degrees and certifications
   - Institution names and dates

5. **Skills**
   - Technical skills
   - Language proficiency
   - Soft skills

### CV Tips
- Keep it concise (2-3 pages max)
- Use clear, professional formatting
- Tailor to each position
- Include a professional photo
- Highlight relevant achievements
- Proofread carefully

## Application Process

### 1. Research the Company
- Understand their business
- Know their values and culture
- Identify how you can contribute

### 2. Write a Cover Letter
- Address specific requirements
- Show enthusiasm
- Explain why you're a good fit
- Keep it to one page

### 3. Submit Application
- Follow instructions carefully
- Submit all required documents
- Apply before deadline
- Save confirmation

### 4. Follow Up
- Wait 1-2 weeks
- Send polite inquiry email
- Show continued interest

## Interview Preparation

### Common Questions
- Tell me about yourself
- Why do you want this job?
- What are your strengths/weaknesses?
- Where do you see yourself in 5 years?
- Why should we hire you?

### Finnish Interview Culture
- Punctuality is crucial
- Dress professionally
- Be honest and direct
- Prepare questions for the interviewer
- Send thank-you email after interview

## Work Culture in Finland

### Key Characteristics
- **Equality** - Flat hierarchies
- **Punctuality** - Always be on time
- **Direct Communication** - Say what you mean
- **Work-Life Balance** - Respected and valued
- **Coffee Breaks** - Important social time
- **Silence is OK** - Don't feel need to fill pauses

### Employee Rights
- Minimum 25 days annual leave
- Sick leave with pay
- Parental leave
- Occupational healthcare
- Union representation

## Useful Resources

- TE-palvelut.fi - Employment services
- InfoFinland.fi - Practical information
- Kela.fi - Social security
- Suomi.fi - Government services
`,
        contentFi: `# Työnhaku Suomessa

## Työnhakustrategiat

### 1. Verkkotyöpaikat
Suosittuja työnhakusivustoja:
- **TE-palvelut.fi** - Julkiset työvoimapalvelut
- **Monster.fi** - Yleiset työpaikka-ilmoitukset
- **LinkedIn** - Ammatillinen verkostoituminen ja työpaikat
- **Oikotie.fi** - Työpaikat ja asunnot
- **Duunitori.fi** - Laaja valikoima tehtäviä
- **Indeed.fi** - Kansainvälinen työnhaku

### 2. Yritysten verkkosivut
- Tarkista kiinnostavien yritysten urasivut
- Monet yritykset julkaisevat työpaikkoja vain omilla sivuillaan
- Aseta työpaikkahälytykset

### 3. Verkostoituminen
- Osallistu alan tapahtumiin ja kokoontumisiin
- Liity ammattiyhdistyksiin
- Käytä LinkedIniä aktiivisesti
- Ilmoita verkostollesi, että etsit työtä

### 4. Rekrytointitoimistot
Erikoistuneet toimistot eri aloille:
- IT: Barona IT, Talented
- Terveydenhuolto: Terveyspalvelu, Mehiläinen
- Insinöörit: Academic Work, Randstad
- Yleinen: Adecco, Manpower

## Suomalaisen CV:n vaatimukset

### Olennaiset elementit
1. **Henkilötiedot**
   - Koko nimi
   - Yhteystiedot
   - Syntymäaika
   - Kansallisuus
   - Ammattimainen kuva (suositeltu)

2. **Ammatillinen yhteenveto**
   - Lyhyt katsaus osaamisestasi
   - Uratavoitteet

3. **Työkokemus**
   - Käänteinen aikajärjestys
   - Tehtävänimike, yritys, päivämäärät
   - Keskeiset vastuut ja saavutukset

4. **Koulutus**
   - Tutkinnot ja sertifikaatit
   - Oppilaitosten nimet ja päivämäärät

5. **Taidot**
   - Tekniset taidot
   - Kielitaito
   - Pehmeät taidot

### CV-vinkit
- Pidä se tiiviinä (max 2-3 sivua)
- Käytä selkeää, ammattimaista muotoilua
- Räätälöi jokaiseen tehtävään
- Sisällytä ammattimainen kuva
- Korosta relevantteja saavutuksia
- Oikolue huolellisesti

## Hakuprosessi

### 1. Tutki yritystä
- Ymmärrä heidän liiketoimintansa
- Tunne heidän arvonsa ja kulttuurinsa
- Tunnista, miten voit osallistua

### 2. Kirjoita saatekirje
- Käsittele erityisvaatimukset
- Osoita innostusta
- Selitä, miksi sopii hyvin
- Pidä se yhden sivun mittaisena

### 3. Lähetä hakemus
- Noudata ohjeita huolellisesti
- Lähetä kaikki vaaditut asiakirjat
- Hae ennen määräaikaa
- Tallenna vahvistus

### 4. Seuraa
- Odota 1-2 viikkoa
- Lähetä kohtelias tiedusteluviesti
- Osoita jatkuvaa kiinnostusta

## Haastatteluvalmistautuminen

### Yleiset kysymykset
- Kerro itsestäsi
- Miksi haluat tämän työn?
- Mitkä ovat vahvuutesi/heikkoutesi?
- Missä näet itsesi 5 vuoden kuluttua?
- Miksi meidän pitäisi palkata sinut?

### Suomalainen haastattelukulttuuri
- Täsmällisyys on ratkaisevan tärkeää
- Pukeudu ammattimaisesti
- Ole rehellinen ja suora
- Valmistele kysymyksiä haastattelijalle
- Lähetä kiitosviesti haastattelun jälkeen

## Työkulttuuri Suomessa

### Keskeiset ominaisuudet
- **Tasa-arvo** - Matalat hierarkiat
- **Täsmällisyys** - Ole aina ajoissa
- **Suora viestintä** - Sano mitä tarkoitat
- **Työ-elämän tasapaino** - Arvostettu ja arvostettu
- **Kahvitauot** - Tärkeä sosiaalinen aika
- **Hiljaisuus on OK** - Ei tarvitse täyttää taukoja

### Työntekijän oikeudet
- Vähintään 25 päivää vuosilomaa
- Sairausloma palkalla
- Vanhempainvapaa
- Työterveyshuolto
- Ammattiliiton edustus

## Hyödyllisiä resursseja

- TE-palvelut.fi - Työvoimapalvelut
- InfoFinland.fi - Käytännön tietoa
- Kela.fi - Sosiaaliturva
- Suomi.fi - Valtion palvelut
`,
    },
    {
        id: 'registration',
        category: 'legal',
        title: 'Registration in Finland',
        titleFi: 'Rekisteröityminen Suomessa',
        description: 'How to register with Finnish authorities and get your personal identity code',
        descriptionFi: 'Kuinka rekisteröityä Suomen viranomaisille ja saada henkilötunnus',
        icon: '📝',
        content: `# Registration in Finland

## Personal Identity Code (Henkilötunnus)

The Finnish personal identity code is essential for:
- Opening a bank account
- Getting a phone subscription
- Accessing healthcare
- Working and paying taxes
- Receiving social benefits

### How to Get Your Personal Identity Code

1. **Register at DVV (Digital and Population Data Services Agency)**
   - Visit local DVV office
   - Bring your passport and residence permit
   - Proof of address in Finland
   - Fill out registration form

2. **Required Documents**
   - Valid passport
   - Residence permit card
   - Rental agreement or proof of address
   - Marriage certificate (if applicable)

3. **Processing Time**
   - Usually immediate
   - Identity code given on the spot
   - Official confirmation sent by mail

## Municipality Registration

### Why Register?
- Access to municipal services
- Healthcare services
- Right to vote in local elections
- Social services

### How to Register?
1. Visit DVV office in your municipality
2. Bring required documents
3. Declare your place of residence
4. Receive confirmation

## Tax Card (Verokortti)

### Purpose
- Determines how much tax is withheld from salary
- Required by all employers
- Can be electronic or paper

### How to Get Tax Card
1. **Online at vero.fi**
   - Log in with bank credentials
   - Fill out tax card application
   - Download electronic tax card

2. **By Phone**
   - Call Tax Administration: 029 497 000
   - Request tax card
   - Receive by mail

3. **In Person**
   - Visit Tax Administration office
   - Fill out application
   - Receive immediately

## Bank Account

### Why You Need It
- Receive salary
- Pay bills
- Daily transactions
- Required for most services

### How to Open Account
1. **Choose a Bank**
   - Nordea
   - OP
   - Danske Bank
   - S-Pankki
   - Aktia

2. **Required Documents**
   - Passport
   - Residence permit
   - Personal identity code
   - Proof of address
   - Employment contract (sometimes)

3. **Process**
   - Book appointment online or by phone
   - Visit bank branch
   - Sign agreement
   - Receive bank card and online banking codes

## Healthcare Registration

### Public Healthcare
1. **Register at Local Health Centre**
   - Bring personal identity code
   - Proof of residence
   - Residence permit

2. **Kela Registration**
   - Apply for Kela card
   - Required for healthcare reimbursements
   - Apply online at kela.fi

### Occupational Healthcare
- Provided by employer
- Covers work-related health issues
- Often includes general healthcare

## Important Contacts

- **DVV**: dvv.fi, tel. 0295 535 000
- **Tax Administration**: vero.fi, tel. 029 497 000
- **Kela**: kela.fi, tel. 020 634 0200
- **TE Services**: te-palvelut.fi, tel. 0295 020 702
`,
        contentFi: `# Rekisteröityminen Suomessa

## Henkilötunnus

Suomalainen henkilötunnus on välttämätön:
- Pankkitilin avaamiseen
- Puhelinliittymän hankkimiseen
- Terveydenhuollon käyttöön
- Työskentelyyn ja verojen maksamiseen
- Sosiaalietuuksien saamiseen

### Kuinka saada henkilötunnus

1. **Rekisteröidy DVV:ssä (Digi- ja väestötietovirasto)**
   - Käy paikallisessa DVV:n toimistossa
   - Ota mukaan passi ja oleskelulupakortti
   - Todistus osoitteesta Suomessa
   - Täytä rekisteröintilomake

2. **Vaaditut asiakirjat**
   - Voimassa oleva passi
   - Oleskelulupakortti
   - Vuokrasopimus tai todistus osoitteesta
   - Vihkitodistus (jos sovellettavissa)

3. **Käsittelyaika**
   - Yleensä välitön
   - Henkilötunnus annetaan paikan päällä
   - Virallinen vahvistus lähetetään postitse

## Kuntaan rekisteröityminen

### Miksi rekisteröityä?
- Pääsy kunnallisiin palveluihin
- Terveydenhuoltopalvelut
- Äänioikeus kunnallisvaaleissa
- Sosiaalipalvelut

### Kuinka rekisteröityä?
1. Käy DVV:n toimistossa kunnassasi
2. Ota mukaan vaaditut asiakirjat
3. Ilmoita asuinpaikkasi
4. Vastaanota vahvistus

## Verokortti

### Tarkoitus
- Määrittää, kuinka paljon veroa pidätetään palkasta
- Vaaditaan kaikilta työnantajilta
- Voi olla sähköinen tai paperinen

### Kuinka saada verokortti
1. **Verkossa osoitteessa vero.fi**
   - Kirjaudu pankkitunnuksilla
   - Täytä verokorttihakemus
   - Lataa sähköinen verokortti

2. **Puhelimitse**
   - Soita Verohallintoon: 029 497 000
   - Pyydä verokorttia
   - Vastaanota postitse

3. **Henkilökohtaisesti**
   - Käy Verohallinnon toimistossa
   - Täytä hakemus
   - Vastaanota välittömästi

## Pankkitili

### Miksi tarvitset sen
- Palkan vastaanottamiseen
- Laskujen maksamiseen
- Päivittäisiin tapahtumiin
- Vaaditaan useimmille palveluille

### Kuinka avata tili
1. **Valitse pankki**
   - Nordea
   - OP
   - Danske Bank
   - S-Pankki
   - Aktia

2. **Vaaditut asiakirjat**
   - Passi
   - Oleskelulupa
   - Henkilötunnus
   - Todistus osoitteesta
   - Työsopimus (joskus)

3. **Prosessi**
   - Varaa aika verkossa tai puhelimitse
   - Käy pankin konttorissa
   - Allekirjoita sopimus
   - Vastaanota pankkikortti ja verkkopankkitunnukset

## Terveydenhuollon rekisteröinti

### Julkinen terveydenhuolto
1. **Rekisteröidy paikalliseen terveyskeskukseen**
   - Ota mukaan henkilötunnus
   - Todistus asuinpaikasta
   - Oleskelulupa

2. **Kela-rekisteröinti**
   - Hae Kela-korttia
   - Vaaditaan terveydenhuollon korvauksiin
   - Hae verkossa osoitteessa kela.fi

### Työterveyshuolto
- Työnantajan tarjoama
- Kattaa työhön liittyvät terveysongelmat
- Sisältää usein yleisen terveydenhuollon

## Tärkeät yhteystiedot

- **DVV**: dvv.fi, puh. 0295 535 000
- **Verohallinto**: vero.fi, puh. 029 497 000
- **Kela**: kela.fi, puh. 020 634 0200
- **TE-palvelut**: te-palvelut.fi, puh. 0295 020 702
`,
    },
    {
        id: 'finnish-language',
        category: 'education',
        title: 'Learning Finnish',
        titleFi: 'Suomen kielen oppiminen',
        description: 'Resources and tips for learning the Finnish language',
        descriptionFi: 'Resurssit ja vinkit suomen kielen oppimiseen',
        icon: '🗣️',
        content: `# Learning Finnish

## Why Learn Finnish?

- Better job opportunities
- Integration into society
- Daily life becomes easier
- Access to more services
- Make Finnish friends
- Understand Finnish culture

## Language Learning Resources

### Free Online Courses
1. **WordDive** - Interactive vocabulary training
2. **Duolingo** - Gamified language learning
3. **Yle Kielikoulu** - Finnish public broadcaster's language school
4. **FinnishPod101** - Podcast-based learning
5. **Memrise** - Vocabulary and phrases

### Paid Courses
1. **Adult Education Centres (Aikuisopisto)**
   - Affordable evening courses
   - Different levels available
   - Social learning environment

2. **Private Language Schools**
   - Berlitz
   - Finnlanguage
   - Suomen Kielen Koulu

3. **University Language Centres**
   - Open university courses
   - Academic approach
   - Recognized certificates

### Integration Training
- Free Finnish courses for immigrants
- Provided by TE Services
- Part of integration plan
- Usually 3-6 months intensive

## Learning Tips

### 1. Practice Daily
- Set aside 15-30 minutes daily
- Consistency is key
- Use apps during commute

### 2. Immerse Yourself
- Watch Finnish TV with subtitles
- Listen to Finnish radio
- Read Finnish news
- Change phone language to Finnish

### 3. Speak from Day One
- Don't wait to be perfect
- Make mistakes and learn
- Join language cafés
- Practice with Finnish friends

### 4. Focus on Practical Vocabulary
- Learn words you use daily
- Shopping, transport, work
- Greetings and small talk

### 5. Understand the Grammar
- Finnish grammar is logical
- Learn cases systematically
- Practice with exercises
- Don't get discouraged

## Language Proficiency Levels

### A1-A2 (Basic)
- Simple everyday phrases
- Basic personal information
- Simple conversations

### B1-B2 (Intermediate)
- Understand main points
- Handle most situations
- Describe experiences
- Express opinions

### C1-C2 (Advanced)
- Understand complex texts
- Express fluently
- Professional use
- Near-native proficiency

## Official Language Tests

### YKI Test (Yleinen kielitutkinto)
- Official Finnish language test
- Levels: 1-6
- Required for citizenship
- Held several times per year
- Register at oph.fi

### Test Preparation
- Take practice tests
- Attend preparation courses
- Study all four skills: reading, writing, listening, speaking
- Familiarize with test format

## Language Cafés and Conversation Groups

Many cities offer free language practice:
- Libraries
- Community centers
- Churches
- Cultural associations
- Online groups

## Useful Apps and Tools

1. **Sanakirja.org** - Finnish-English dictionary
2. **Tatoeba** - Example sentences
3. **Forvo** - Pronunciation guide
4. **HelloTalk** - Language exchange
5. **Tandem** - Find language partners

## Children's Finnish Learning

- Daycare (päiväkoti) - Best for young children
- Preparatory education
- School integration support
- After-school programs

## Tips for Difficult Aspects

### Cases (15 in total)
- Learn one at a time
- Practice with common words
- Use flashcards
- Understand the logic

### Pronunciation
- Listen to native speakers
- Record yourself
- Practice difficult sounds
- Don't worry about perfection

### Vocabulary
- Use spaced repetition
- Learn in context
- Create word associations
- Practice actively

## Motivation

- Set realistic goals
- Celebrate small wins
- Find a study buddy
- Track your progress
- Remember why you started

## Resources

- **Yle Kielikoulu**: yle.fi/aihe/kielikoulu
- **WordDive**: worddive.com
- **YKI Test**: oph.fi/yki
- **Integration Training**: te-palvelut.fi
`,
        contentFi: `# Suomen kielen oppiminen

## Miksi oppia suomea?

- Paremmat työmahdollisuudet
- Integroituminen yhteiskuntaan
- Arki helpottuu
- Pääsy useampiin palveluihin
- Suomalaisten ystävien saaminen
- Suomalaisen kulttuurin ymmärtäminen

## Kielenoppimisresurssit

### Ilmaiset verkkokurssit
1. **WordDive** - Interaktiivinen sanastoharjoittelu
2. **Duolingo** - Pelillistetty kielenoppiminen
3. **Yle Kielikoulu** - Yleisradion kielikoulu
4. **FinnishPod101** - Podcast-pohjainen oppiminen
5. **Memrise** - Sanasto ja fraasit

### Maksulliset kurssit
1. **Aikuisopistot**
   - Edulliset iltakurssit
   - Eri tasoja saatavilla
   - Sosiaalinen oppimisympäristö

2. **Yksityiset kielikoulut**
   - Berlitz
   - Finnlanguage
   - Suomen Kielen Koulu

3. **Yliopistojen kielikeskukset**
   - Avoimen yliopiston kurssit
   - Akateeminen lähestymistapa
   - Tunnustetut todistukset

### Kotoutumiskoulutus
- Ilmaiset suomen kielen kurssit maahanmuuttajille
- TE-palveluiden tarjoamat
- Osa kotoutumissuunnitelmaa
- Yleensä 3-6 kuukautta intensiivistä

## Oppimisvinkit

### 1. Harjoittele päivittäin
- Varaa 15-30 minuuttia päivässä
- Johdonmukaisuus on avain
- Käytä sovelluksia työmatkalla

### 2. Uppoudu kieleen
- Katso suomalaista TV:tä tekstityksillä
- Kuuntele suomalaista radiota
- Lue suomalaisia uutisia
- Vaihda puhelimen kieli suomeksi

### 3. Puhu ensimmäisestä päivästä lähtien
- Älä odota täydellisyyttä
- Tee virheitä ja opi
- Liity kielikahviloihin
- Harjoittele suomalaisten ystävien kanssa

### 4. Keskity käytännön sanastoon
- Opi sanoja, joita käytät päivittäin
- Ostokset, liikenne, työ
- Tervehdykset ja small talk

### 5. Ymmärrä kielioppi
- Suomen kielioppi on looginen
- Opi sijat järjestelmällisesti
- Harjoittele tehtävillä
- Älä lannistu

## Kielitaitotasot

### A1-A2 (Perustaso)
- Yksinkertaiset arkipäiväiset fraasit
- Perustiedot itsestä
- Yksinkertaiset keskustelut

### B1-B2 (Keskitaso)
- Ymmärrä pääkohdat
- Selviydy useimmista tilanteista
- Kuvaile kokemuksia
- Ilmaise mielipiteitä

### C1-C2 (Edistynyt)
- Ymmärrä monimutkaisia tekstejä
- Ilmaise sujuvasti
- Ammatillinen käyttö
- Lähes äidinkielen tasoinen taito

## Viralliset kielitestit

### YKI-testi (Yleinen kielitutkinto)
- Virallinen suomen kielen testi
- Tasot: 1-6
- Vaaditaan kansalaisuuteen
- Järjestetään useita kertoja vuodessa
- Ilmoittaudu osoitteessa oph.fi

### Testin valmistautuminen
- Tee harjoitustestejä
- Osallistu valmennuskursseille
- Opiskele kaikkia neljää taitoa: lukeminen, kirjoittaminen, kuuntelu, puhuminen
- Tutustu testin muotoon

## Kielikahvilat ja keskusteluryhmät

Monet kaupungit tarjoavat ilmaista kieliharjoittelua:
- Kirjastot
- Yhteisökeskukset
- Kirkot
- Kulttuuriyhdistykset
- Verkkoryhmät

## Hyödylliset sovellukset ja työkalut

1. **Sanakirja.org** - Suomi-englanti-sanakirja
2. **Tatoeba** - Esimerkkejä lauseista
3. **Forvo** - Ääntämisopas
4. **HelloTalk** - Kielivaihto
5. **Tandem** - Etsi kielikumppaneita

## Lasten suomen kielen oppiminen

- Päiväkoti - Paras pienille lapsille
- Valmistava opetus
- Koulun integraatiotuki
- Kerhotoiminta

## Vinkit vaikeisiin osa-alueisiin

### Sijat (15 yhteensä)
- Opi yksi kerrallaan
- Harjoittele yleisillä sanoilla
- Käytä muistikortteja
- Ymmärrä logiikka

### Ääntäminen
- Kuuntele äidinkielisiä puhujia
- Nauhoita itsesi
- Harjoittele vaikeita äänteitä
- Älä huolehdi täydellisyydestä

### Sanasto
- Käytä välistettyä toistoa
- Opi kontekstissa
- Luo sana-assosiaatioita
- Harjoittele aktiivisesti

## Motivaatio

- Aseta realistiset tavoitteet
- Juhli pieniä voittoja
- Etsi opiskelukaveri
- Seuraa edistymistäsi
- Muista, miksi aloitit

## Resurssit

- **Yle Kielikoulu**: yle.fi/aihe/kielikoulu
- **WordDive**: worddive.com
- **YKI-testi**: oph.fi/yki
- **Kotoutumiskoulutus**: te-palvelut.fi
`,
    },
];

export function getGuidesByCategory(category: Guide['category']): Guide[] {
    return guides.filter(guide => guide.category === category);
}

export function getGuideById(id: string): Guide | undefined {
    return guides.find(guide => guide.id === id);
}
