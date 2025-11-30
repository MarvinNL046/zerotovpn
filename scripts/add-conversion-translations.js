const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');

// Translations for each language
const translations = {
  en: {
    exitPopup: {
      close: "Close",
      waitTitle: "Wait! Don't Leave Yet!",
      specialOffer: "We have a special offer just for you",
      limitedTime: "Limited time offer",
      useCode: "Use code at checkout:",
      claimDeal: "Claim This Deal",
      moneyBack: "30-day money-back guarantee",
      noThanks: "No thanks, I'll pay full price"
    },
    stickyBar: {
      getExclusive: "Get {vpn} with exclusive discount!",
      limitedOffer: "Limited time offer - Don't miss out!",
      claimDeal: "Claim Deal",
      getDeal: "Get Deal",
      dismiss: "Dismiss"
    },
    comparisonTool: {
      title: "VPN Comparison Tool",
      subtitle: "Select VPNs to compare side by side",
      selected: "selected",
      addVpn: "Add VPN",
      remove: "Remove",
      feature: "Feature",
      pricing: "Pricing",
      monthlyPrice: "Monthly Price",
      yearlyPrice: "Yearly Price",
      moneyBack: "Money-back (days)",
      performance: "Performance",
      speedScore: "Speed Score",
      securityScore: "Security Score",
      streamingScore: "Streaming Score",
      network: "Network",
      servers: "Servers",
      countries: "Countries",
      devices: "Max Devices",
      features: "Features",
      netflix: "Netflix Support",
      torrenting: "Torrenting",
      killSwitch: "Kill Switch",
      noLogs: "No-Logs Policy",
      protocols: "Protocols",
      getStarted: "Get Started",
      visitSite: "Visit Site",
      noVpnsSelected: "No VPNs Selected",
      selectToCompare: "Select 2-4 VPNs to compare their features side by side",
      addFirstVpn: "Add Your First VPN"
    }
  },
  nl: {
    exitPopup: {
      close: "Sluiten",
      waitTitle: "Wacht! Ga nog niet weg!",
      specialOffer: "We hebben een speciale aanbieding voor je",
      limitedTime: "Tijdelijke aanbieding",
      useCode: "Gebruik code bij afrekenen:",
      claimDeal: "Claim Deze Deal",
      moneyBack: "30 dagen geld-terug-garantie",
      noThanks: "Nee bedankt, ik betaal de volle prijs"
    },
    stickyBar: {
      getExclusive: "Krijg {vpn} met exclusieve korting!",
      limitedOffer: "Tijdelijke aanbieding - Mis het niet!",
      claimDeal: "Claim Deal",
      getDeal: "Krijg Deal",
      dismiss: "Sluiten"
    },
    comparisonTool: {
      title: "VPN Vergelijkingstool",
      subtitle: "Selecteer VPN's om naast elkaar te vergelijken",
      selected: "geselecteerd",
      addVpn: "VPN Toevoegen",
      remove: "Verwijderen",
      feature: "Functie",
      pricing: "Prijzen",
      monthlyPrice: "Maandprijs",
      yearlyPrice: "Jaarprijs",
      moneyBack: "Geld-terug (dagen)",
      performance: "Prestaties",
      speedScore: "Snelheidsscore",
      securityScore: "Beveiligingsscore",
      streamingScore: "Streamingscore",
      network: "Netwerk",
      servers: "Servers",
      countries: "Landen",
      devices: "Max Apparaten",
      features: "Functies",
      netflix: "Netflix Ondersteuning",
      torrenting: "Torrenting",
      killSwitch: "Kill Switch",
      noLogs: "Geen-Logs Beleid",
      protocols: "Protocollen",
      getStarted: "Aan de slag",
      visitSite: "Bezoek Site",
      noVpnsSelected: "Geen VPN's Geselecteerd",
      selectToCompare: "Selecteer 2-4 VPN's om hun functies naast elkaar te vergelijken",
      addFirstVpn: "Voeg Je Eerste VPN Toe"
    }
  },
  de: {
    exitPopup: {
      close: "Schließen",
      waitTitle: "Warte! Geh noch nicht!",
      specialOffer: "Wir haben ein Sonderangebot nur für dich",
      limitedTime: "Zeitlich begrenztes Angebot",
      useCode: "Code an der Kasse verwenden:",
      claimDeal: "Deal Sichern",
      moneyBack: "30 Tage Geld-zurück-Garantie",
      noThanks: "Nein danke, ich zahle den vollen Preis"
    },
    stickyBar: {
      getExclusive: "Hol dir {vpn} mit exklusivem Rabatt!",
      limitedOffer: "Zeitlich begrenztes Angebot - Nicht verpassen!",
      claimDeal: "Deal Sichern",
      getDeal: "Deal Holen",
      dismiss: "Schließen"
    },
    comparisonTool: {
      title: "VPN Vergleichstool",
      subtitle: "Wähle VPNs zum Vergleich nebeneinander",
      selected: "ausgewählt",
      addVpn: "VPN Hinzufügen",
      remove: "Entfernen",
      feature: "Funktion",
      pricing: "Preise",
      monthlyPrice: "Monatspreis",
      yearlyPrice: "Jahrespreis",
      moneyBack: "Geld-zurück (Tage)",
      performance: "Leistung",
      speedScore: "Geschwindigkeitswert",
      securityScore: "Sicherheitswert",
      streamingScore: "Streaming-Wert",
      network: "Netzwerk",
      servers: "Server",
      countries: "Länder",
      devices: "Max Geräte",
      features: "Funktionen",
      netflix: "Netflix Unterstützung",
      torrenting: "Torrenting",
      killSwitch: "Kill Switch",
      noLogs: "Keine-Logs-Richtlinie",
      protocols: "Protokolle",
      getStarted: "Loslegen",
      visitSite: "Seite Besuchen",
      noVpnsSelected: "Keine VPNs Ausgewählt",
      selectToCompare: "Wähle 2-4 VPNs um ihre Funktionen nebeneinander zu vergleichen",
      addFirstVpn: "Füge Dein Erstes VPN Hinzu"
    }
  },
  es: {
    exitPopup: {
      close: "Cerrar",
      waitTitle: "¡Espera! ¡No te vayas todavía!",
      specialOffer: "Tenemos una oferta especial solo para ti",
      limitedTime: "Oferta por tiempo limitado",
      useCode: "Usa el código al pagar:",
      claimDeal: "Reclamar Esta Oferta",
      moneyBack: "Garantía de devolución de 30 días",
      noThanks: "No gracias, pagaré el precio completo"
    },
    stickyBar: {
      getExclusive: "¡Obtén {vpn} con descuento exclusivo!",
      limitedOffer: "Oferta por tiempo limitado - ¡No te la pierdas!",
      claimDeal: "Reclamar Oferta",
      getDeal: "Obtener Oferta",
      dismiss: "Cerrar"
    },
    comparisonTool: {
      title: "Herramienta de Comparación VPN",
      subtitle: "Selecciona VPNs para comparar lado a lado",
      selected: "seleccionados",
      addVpn: "Añadir VPN",
      remove: "Eliminar",
      feature: "Característica",
      pricing: "Precios",
      monthlyPrice: "Precio Mensual",
      yearlyPrice: "Precio Anual",
      moneyBack: "Devolución (días)",
      performance: "Rendimiento",
      speedScore: "Puntuación de Velocidad",
      securityScore: "Puntuación de Seguridad",
      streamingScore: "Puntuación de Streaming",
      network: "Red",
      servers: "Servidores",
      countries: "Países",
      devices: "Dispositivos Máx",
      features: "Características",
      netflix: "Soporte Netflix",
      torrenting: "Torrenting",
      killSwitch: "Kill Switch",
      noLogs: "Política Sin Registros",
      protocols: "Protocolos",
      getStarted: "Comenzar",
      visitSite: "Visitar Sitio",
      noVpnsSelected: "Ningún VPN Seleccionado",
      selectToCompare: "Selecciona 2-4 VPNs para comparar sus características",
      addFirstVpn: "Añade Tu Primer VPN"
    }
  },
  fr: {
    exitPopup: {
      close: "Fermer",
      waitTitle: "Attendez ! Ne partez pas encore !",
      specialOffer: "Nous avons une offre spéciale juste pour vous",
      limitedTime: "Offre limitée dans le temps",
      useCode: "Utilisez le code à la caisse :",
      claimDeal: "Réclamer Cette Offre",
      moneyBack: "Garantie remboursement 30 jours",
      noThanks: "Non merci, je paierai le prix plein"
    },
    stickyBar: {
      getExclusive: "Obtenez {vpn} avec une remise exclusive !",
      limitedOffer: "Offre limitée - Ne manquez pas !",
      claimDeal: "Réclamer l'Offre",
      getDeal: "Obtenir l'Offre",
      dismiss: "Fermer"
    },
    comparisonTool: {
      title: "Outil de Comparaison VPN",
      subtitle: "Sélectionnez des VPN à comparer côte à côte",
      selected: "sélectionnés",
      addVpn: "Ajouter VPN",
      remove: "Supprimer",
      feature: "Fonctionnalité",
      pricing: "Tarifs",
      monthlyPrice: "Prix Mensuel",
      yearlyPrice: "Prix Annuel",
      moneyBack: "Remboursement (jours)",
      performance: "Performance",
      speedScore: "Score de Vitesse",
      securityScore: "Score de Sécurité",
      streamingScore: "Score de Streaming",
      network: "Réseau",
      servers: "Serveurs",
      countries: "Pays",
      devices: "Appareils Max",
      features: "Fonctionnalités",
      netflix: "Support Netflix",
      torrenting: "Torrenting",
      killSwitch: "Kill Switch",
      noLogs: "Politique Zéro-Log",
      protocols: "Protocoles",
      getStarted: "Commencer",
      visitSite: "Visiter le Site",
      noVpnsSelected: "Aucun VPN Sélectionné",
      selectToCompare: "Sélectionnez 2-4 VPN pour comparer leurs fonctionnalités",
      addFirstVpn: "Ajoutez Votre Premier VPN"
    }
  },
  zh: {
    exitPopup: {
      close: "关闭",
      waitTitle: "等等！先别走！",
      specialOffer: "我们为您准备了特别优惠",
      limitedTime: "限时优惠",
      useCode: "结账时使用代码：",
      claimDeal: "领取此优惠",
      moneyBack: "30天退款保证",
      noThanks: "不用了，我付全价"
    },
    stickyBar: {
      getExclusive: "以独家折扣获取{vpn}！",
      limitedOffer: "限时优惠 - 不要错过！",
      claimDeal: "领取优惠",
      getDeal: "获取优惠",
      dismiss: "关闭"
    },
    comparisonTool: {
      title: "VPN对比工具",
      subtitle: "选择VPN进行并排比较",
      selected: "已选择",
      addVpn: "添加VPN",
      remove: "移除",
      feature: "功能",
      pricing: "价格",
      monthlyPrice: "月费",
      yearlyPrice: "年费",
      moneyBack: "退款(天)",
      performance: "性能",
      speedScore: "速度评分",
      securityScore: "安全评分",
      streamingScore: "流媒体评分",
      network: "网络",
      servers: "服务器",
      countries: "国家",
      devices: "最大设备数",
      features: "功能",
      netflix: "Netflix支持",
      torrenting: "种子下载",
      killSwitch: "终止开关",
      noLogs: "无日志政策",
      protocols: "协议",
      getStarted: "开始",
      visitSite: "访问网站",
      noVpnsSelected: "未选择VPN",
      selectToCompare: "选择2-4个VPN进行功能比较",
      addFirstVpn: "添加第一个VPN"
    }
  },
  ja: {
    exitPopup: {
      close: "閉じる",
      waitTitle: "ちょっと待って！まだ行かないで！",
      specialOffer: "特別オファーをご用意しました",
      limitedTime: "期間限定オファー",
      useCode: "チェックアウト時にコードを使用：",
      claimDeal: "このディールを獲得",
      moneyBack: "30日間返金保証",
      noThanks: "いいえ、全額払います"
    },
    stickyBar: {
      getExclusive: "{vpn}を限定割引で入手！",
      limitedOffer: "期間限定 - お見逃しなく！",
      claimDeal: "ディールを獲得",
      getDeal: "入手する",
      dismiss: "閉じる"
    },
    comparisonTool: {
      title: "VPN比較ツール",
      subtitle: "VPNを選択して並べて比較",
      selected: "選択済み",
      addVpn: "VPNを追加",
      remove: "削除",
      feature: "機能",
      pricing: "価格",
      monthlyPrice: "月額料金",
      yearlyPrice: "年間料金",
      moneyBack: "返金保証(日)",
      performance: "パフォーマンス",
      speedScore: "速度スコア",
      securityScore: "セキュリティスコア",
      streamingScore: "ストリーミングスコア",
      network: "ネットワーク",
      servers: "サーバー",
      countries: "国",
      devices: "最大デバイス数",
      features: "機能",
      netflix: "Netflix対応",
      torrenting: "トレント",
      killSwitch: "キルスイッチ",
      noLogs: "ノーログポリシー",
      protocols: "プロトコル",
      getStarted: "始める",
      visitSite: "サイトを訪問",
      noVpnsSelected: "VPN未選択",
      selectToCompare: "2-4個のVPNを選択して機能を比較",
      addFirstVpn: "最初のVPNを追加"
    }
  },
  ko: {
    exitPopup: {
      close: "닫기",
      waitTitle: "잠깐! 아직 가지 마세요!",
      specialOffer: "특별 할인을 준비했습니다",
      limitedTime: "한정 기간 혜택",
      useCode: "결제 시 코드 사용:",
      claimDeal: "이 혜택 받기",
      moneyBack: "30일 환불 보장",
      noThanks: "괜찮아요, 정가로 결제할게요"
    },
    stickyBar: {
      getExclusive: "{vpn}을 특별 할인으로 받으세요!",
      limitedOffer: "한정 기간 혜택 - 놓치지 마세요!",
      claimDeal: "혜택 받기",
      getDeal: "받기",
      dismiss: "닫기"
    },
    comparisonTool: {
      title: "VPN 비교 도구",
      subtitle: "비교할 VPN 선택",
      selected: "선택됨",
      addVpn: "VPN 추가",
      remove: "제거",
      feature: "기능",
      pricing: "가격",
      monthlyPrice: "월 요금",
      yearlyPrice: "연 요금",
      moneyBack: "환불(일)",
      performance: "성능",
      speedScore: "속도 점수",
      securityScore: "보안 점수",
      streamingScore: "스트리밍 점수",
      network: "네트워크",
      servers: "서버",
      countries: "국가",
      devices: "최대 기기 수",
      features: "기능",
      netflix: "Netflix 지원",
      torrenting: "토렌트",
      killSwitch: "킬 스위치",
      noLogs: "노로그 정책",
      protocols: "프로토콜",
      getStarted: "시작하기",
      visitSite: "사이트 방문",
      noVpnsSelected: "선택된 VPN 없음",
      selectToCompare: "2-4개의 VPN을 선택하여 비교하세요",
      addFirstVpn: "첫 번째 VPN 추가"
    }
  },
  th: {
    exitPopup: {
      close: "ปิด",
      waitTitle: "รอก่อน! อย่าเพิ่งไป!",
      specialOffer: "เรามีข้อเสนอพิเศษสำหรับคุณ",
      limitedTime: "ข้อเสนอจำกัดเวลา",
      useCode: "ใช้รหัสที่ชำระเงิน:",
      claimDeal: "รับข้อเสนอนี้",
      moneyBack: "รับประกันคืนเงิน 30 วัน",
      noThanks: "ไม่ล่ะ ฉันจะจ่ายเต็มราคา"
    },
    stickyBar: {
      getExclusive: "รับ {vpn} พร้อมส่วนลดพิเศษ!",
      limitedOffer: "ข้อเสนอจำกัดเวลา - อย่าพลาด!",
      claimDeal: "รับข้อเสนอ",
      getDeal: "รับเลย",
      dismiss: "ปิด"
    },
    comparisonTool: {
      title: "เครื่องมือเปรียบเทียบ VPN",
      subtitle: "เลือก VPN เพื่อเปรียบเทียบ",
      selected: "เลือกแล้ว",
      addVpn: "เพิ่ม VPN",
      remove: "ลบ",
      feature: "คุณสมบัติ",
      pricing: "ราคา",
      monthlyPrice: "ราคาต่อเดือน",
      yearlyPrice: "ราคาต่อปี",
      moneyBack: "คืนเงิน(วัน)",
      performance: "ประสิทธิภาพ",
      speedScore: "คะแนนความเร็ว",
      securityScore: "คะแนนความปลอดภัย",
      streamingScore: "คะแนนสตรีมมิ่ง",
      network: "เครือข่าย",
      servers: "เซิร์ฟเวอร์",
      countries: "ประเทศ",
      devices: "อุปกรณ์สูงสุด",
      features: "คุณสมบัติ",
      netflix: "รองรับ Netflix",
      torrenting: "ทอร์เรนต์",
      killSwitch: "Kill Switch",
      noLogs: "นโยบายไม่เก็บ Log",
      protocols: "โปรโตคอล",
      getStarted: "เริ่มต้น",
      visitSite: "เยี่ยมชมเว็บ",
      noVpnsSelected: "ยังไม่เลือก VPN",
      selectToCompare: "เลือก 2-4 VPN เพื่อเปรียบเทียบ",
      addFirstVpn: "เพิ่ม VPN แรก"
    }
  }
};

// Add translations to each language file
const languages = ['en', 'nl', 'de', 'es', 'fr', 'zh', 'ja', 'ko', 'th'];

languages.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);

  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Add the new translations
    const langTranslations = translations[lang] || translations.en;
    content.exitPopup = langTranslations.exitPopup;
    content.stickyBar = langTranslations.stickyBar;
    content.comparisonTool = langTranslations.comparisonTool;

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    console.log(`Updated ${lang}.json`);
  } catch (err) {
    console.error(`Error processing ${lang}.json:`, err.message);
  }
});

console.log('Done!');
