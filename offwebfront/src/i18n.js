import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'ro',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ro: {
        translation: {
            Index: {
                pageTitle: "Renadyl™",
                header1: "Site-ul nostru se află în construcție.",
                header2: "Pentru mai multe informații sau comenzi vă rugăm să ne contactați utilizând:",
                newsletter1: "Abonați-vă, pentru a afla când am lansat website-ul.",
                newsletterPH: "Adresa de email",
                newsletter2: "* Promitem să nu vă trimitem niciodată spam.",
                newsletterOK: "Adresa de email a fost salvată!"
            }
        }
      },
      en: {
        translation: {
            Index: {
                pageTitle: "Renadyl™",
                header1: "Our website is under construction.",
                header2: "For more information or orders please contact us using:",
                newsletter1: "Subscribe to find out when we launch the website.",
                newsletterPH: "Email address",
                newsletter2: "* We promise never to spam you.",
                newsletterOK: "The email address has been saved!"
            }
        }
      },
      de: {
        translation: {
            Index: {
                pageTitle: "Renadyl™",
                header1: "Unsere Website befindet sich im Aufbau.",
                header2: "Für weitere Informationen oder Bestellungen kontaktieren Sie uns bitte unter:",
                newsletter1: "Abonnieren Sie, um zu erfahren, wann wir die Website starten.",
                newsletterPH: "E-Mail-Adresse",
                newsletter2: "* Wir versprechen, Sie niemals zu spammen.",
                newsletterOK: "Die E-Mail-Adresse wurde gespeichert!"
            }
        }
      }
    }
  });

export default i18n;