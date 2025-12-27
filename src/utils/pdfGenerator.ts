import jsPDF from 'jspdf';
import { CV } from '@/types/cv';

export async function generateCVPDF(cv: CV, language: 'fi' | 'en'): Promise<void> {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;
    const margin = 20;
    const lineHeight = 7;

    // Colors
    const primaryColor: [number, number, number] = [41, 128, 185];
    const textColor: [number, number, number] = [44, 62, 80];
    const lightGray: [number, number, number] = [236, 240, 241];

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return lines.length * lineHeight;
    };

    // Header with photo
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 50, 'F');

    // Add photo if available
    if (cv.personalInfo.photoUrl) {
        try {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = cv.personalInfo.photoUrl;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
            doc.addImage(img, 'JPEG', margin, 10, 30, 30, undefined, 'FAST');
        } catch (error) {
            console.error('Error loading image:', error);
        }
    }

    // Name and contact info
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(`${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`, cv.personalInfo.photoUrl ? 55 : margin, 25);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const contactInfo = [
        cv.personalInfo.email,
        cv.personalInfo.phone,
        `${cv.personalInfo.address}, ${cv.personalInfo.postalCode} ${cv.personalInfo.city}`,
    ].filter(Boolean).join(' | ');
    doc.text(contactInfo, cv.personalInfo.photoUrl ? 55 : margin, 35);

    yPosition = 60;
    doc.setTextColor(...textColor);

    // Professional Summary
    if (cv.summary) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        doc.text(language === 'fi' ? 'Ammatillinen yhteenveto' : 'Professional Summary', margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textColor);
        const summaryHeight = addText(cv.summary, margin, yPosition, pageWidth - 2 * margin);
        yPosition += summaryHeight + 5;
    }

    // Work Experience
    if (cv.experience.length > 0) {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        doc.text(language === 'fi' ? 'Työkokemus' : 'Work Experience', margin, yPosition);
        yPosition += 8;

        cv.experience.forEach((exp, index) => {
            if (yPosition > pageHeight - 50) {
                doc.addPage();
                yPosition = 20;
            }

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...textColor);
            doc.text(exp.jobTitle, margin, yPosition);
            yPosition += 6;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`${exp.company} | ${exp.location}`, margin, yPosition);
            yPosition += 5;

            doc.setTextColor(127, 140, 141);
            const endDate = exp.current ? (language === 'fi' ? 'Nykyinen' : 'Present') : exp.endDate;
            doc.text(`${exp.startDate} - ${endDate}`, margin, yPosition);
            yPosition += 6;

            doc.setTextColor(...textColor);
            const descHeight = addText(exp.description, margin, yPosition, pageWidth - 2 * margin);
            yPosition += descHeight + 5;
        });
    }

    // Education
    if (cv.education.length > 0) {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        doc.text(language === 'fi' ? 'Koulutus' : 'Education', margin, yPosition);
        yPosition += 8;

        cv.education.forEach((edu) => {
            if (yPosition > pageHeight - 40) {
                doc.addPage();
                yPosition = 20;
            }

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...textColor);
            doc.text(edu.degree, margin, yPosition);
            yPosition += 6;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`${edu.institution} | ${edu.fieldOfStudy}`, margin, yPosition);
            yPosition += 5;

            doc.setTextColor(127, 140, 141);
            doc.text(`${edu.startDate} - ${edu.endDate}`, margin, yPosition);
            yPosition += 6;

            if (edu.description) {
                doc.setTextColor(...textColor);
                const descHeight = addText(edu.description, margin, yPosition, pageWidth - 2 * margin);
                yPosition += descHeight + 5;
            }
        });
    }

    // Skills and Languages side by side
    if (cv.skills.length > 0 || cv.languages.length > 0) {
        if (yPosition > pageHeight - 60) {
            doc.addPage();
            yPosition = 20;
        }

        const columnWidth = (pageWidth - 3 * margin) / 2;
        let leftY = yPosition;
        let rightY = yPosition;

        // Skills (left column)
        if (cv.skills.length > 0) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...primaryColor);
            doc.text(language === 'fi' ? 'Taidot' : 'Skills', margin, leftY);
            leftY += 8;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...textColor);

            cv.skills.forEach((skill) => {
                const levelMap = {
                    beginner: language === 'fi' ? 'Aloittelija' : 'Beginner',
                    intermediate: language === 'fi' ? 'Keskitaso' : 'Intermediate',
                    advanced: language === 'fi' ? 'Edistynyt' : 'Advanced',
                    expert: language === 'fi' ? 'Asiantuntija' : 'Expert',
                };
                doc.text(`• ${skill.name} - ${levelMap[skill.level]}`, margin, leftY);
                leftY += 6;
            });
        }

        // Languages (right column)
        if (cv.languages.length > 0) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...primaryColor);
            doc.text(language === 'fi' ? 'Kielet' : 'Languages', pageWidth / 2 + margin / 2, rightY);
            rightY += 8;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...textColor);

            cv.languages.forEach((lang) => {
                const proficiencyMap = {
                    basic: language === 'fi' ? 'Perustaso' : 'Basic',
                    conversational: language === 'fi' ? 'Keskustelutaso' : 'Conversational',
                    fluent: language === 'fi' ? 'Sujuva' : 'Fluent',
                    native: language === 'fi' ? 'Äidinkieli' : 'Native',
                };
                doc.text(`• ${lang.name} - ${proficiencyMap[lang.proficiency]}`, pageWidth / 2 + margin / 2, rightY);
                rightY += 6;
            });
        }
    }

    // Save the PDF
    const fileName = `CV_${cv.personalInfo.firstName}_${cv.personalInfo.lastName}.pdf`;
    doc.save(fileName);
}
