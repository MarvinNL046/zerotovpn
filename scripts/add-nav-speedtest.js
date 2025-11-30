const fs = require('fs');
const path = require('path');

const navTranslations = {
  en: { speedTest: "Speed Test" },
  nl: { speedTest: "Snelheidstest" },
  de: { speedTest: "Geschwindigkeitstest" },
  es: { speedTest: "Test de Velocidad" },
  fr: { speedTest: "Test de Vitesse" },
  zh: { speedTest: "速度测试" },
  ja: { speedTest: "速度テスト" },
  ko: { speedTest: "속도 테스트" },
  th: { speedTest: "ทดสอบความเร็ว" },
};

const messagesDir = path.join(__dirname, '..', 'src', 'messages');

Object.entries(navTranslations).forEach(([locale, translation]) => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add to nav namespace
  if (existing.nav) {
    existing.nav.speedTest = translation.speedTest;
  }

  // Add to footer namespace
  if (existing.footer) {
    existing.footer.speedTest = translation.speedTest;
  }

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n');
  console.log(`Updated ${locale}.json with nav/footer speedTest translations`);
});

console.log('Done!');
