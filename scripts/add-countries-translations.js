const fs = require('fs');
const path = require('path');

const navTranslations = {
  en: { countries: "Countries" },
  nl: { countries: "Landen" },
  de: { countries: "Länder" },
  es: { countries: "Países" },
  fr: { countries: "Pays" },
  zh: { countries: "国家" },
  ja: { countries: "国別ガイド" },
  ko: { countries: "국가별" },
  th: { countries: "ประเทศ" },
};

const messagesDir = path.join(__dirname, '..', 'src', 'messages');

Object.entries(navTranslations).forEach(([locale, translation]) => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add to nav namespace
  if (existing.nav) {
    existing.nav.countries = translation.countries;
  }

  // Add to footer namespace
  if (existing.footer) {
    existing.footer.countries = translation.countries;
  }

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n');
  console.log(`Updated ${locale}.json with countries translations`);
});

console.log('Done!');
