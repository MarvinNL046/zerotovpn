const fs = require('fs');
const path = require('path');

// Translation data for all remaining locales
const translations = {
  de: {
    meta: {
      title: "Beste Kostenlose VPN November 2025: Top 4 Getestet (mit ECHTEN Datenlimits) - ZeroToVPN",
      description: "Suchen Sie ein wirklich kostenloses VPN? Wir haben 20+ kostenlose VPNs getestet. ProtonVPN bietet unbegrenzte Daten, Windscribe gibt 10GB/Monat. Erfahren Sie, welche kostenlosen VPNs sicher sind."
    },
    hero: {
      badge: "Aktualisiert November 2025",
      title: "Beste Kostenlose VPN-Dienste 2025",
      subtitle: "Wir haben 20+ kostenlose VPNs getestet, um die sichersten Optionen mit den besten Datenlimits zu finden. Das funktioniert wirklich (und was nicht)."
    },
    comparison: {
      title: "Schnellvergleich",
      vpn: "VPN",
      dataLimit: "Datenlimit",
      servers: "Server",
      devices: "Geräte",
      streaming: "Streaming",
      unlimited: "Unbegrenzt",
      countries: "Länder",
      locations: "Standorte",
      month: "Monat"
    },
    reviews: {
      title: "Top Kostenlose VPNs Eingestuft",
      subtitle: "Unsere detaillierte Analyse der besten kostenlosen VPN-Dienste in 2025",
      dataLimit: "Datenlimit",
      servers: "Server",
      devices: "Geräte",
      logs: "Protokolle",
      adBlocker: "Werbeblocker",
      audited: "Geprüft",
      unlimited: "Unbegrenzt",
      noLogs: "Keine Protokolle",
      included: "Enthalten",
      yes: "Ja",
      countries: "Länder",
      locations: "Standorte",
      month: "Monat",
      pros: "Vorteile",
      cons: "Nachteile",
      getButton: "Holen",
      protonvpn: {
        badge: "Bestes Kostenloses VPN",
        unlimitedData: "Unbegrenzte Daten",
        description: "ProtonVPN ist das EINZIGE kostenlose VPN mit wirklich unbegrenzten Daten. Mit Sitz im datenschutzfreundlichen Schweiz bietet es eine unabhängig geprüfte No-Logs-Richtlinie, Open-Source-Apps und kann sogar US Netflix entsperren.",
        pros: [
          "Unbegrenzte Daten (einzigartig bei kostenlosen VPNs)",
          "No-Logs-Richtlinie unabhängig geprüft",
          "Schweizer Basis für starken Datenschutz",
          "Open-Source-Apps für Transparenz",
          "Kann US Netflix entsperren",
          "Keine Werbung oder Geschwindigkeitsbegrenzung"
        ],
        cons: [
          "Kostenlose Version auf 1 Gerät beschränkt",
          "Nur 5 Serverstandorte verfügbar",
          "Geschwindigkeiten langsamer als Bezahlversion",
          "Kein P2P/Torrenting auf kostenlosen Servern"
        ]
      },
      windscribe: {
        description: "Windscribe bietet großzügige 10GB/Monat (erweiterbar auf 15GB), ideal für moderates Surfen. Es umfasst 10 Länderstandorte, unbegrenzte Geräteverbindungen und einen eingebauten Werbeblocker namens R.O.B.E.R.T.",
        pros: [
          "10GB/Monat (erweiterbar auf 15GB)",
          "Unbegrenzte Geräteverbindungen",
          "Eingebauter Ad & Malware-Blocker",
          "Kann BBC iPlayer, Hulu, HBO Max entsperren",
          "Multi-Hop-Verbindungen verfügbar",
          "10 Länder inkl. UK, Kanada, Frankreich"
        ],
        cons: [
          "Beschränkt auf 10GB monatliche Daten",
          "Nur 3-Tage-Geld-zurück-Garantie",
          "Sitz in Kanada (5 Eyes)",
          "Kostenlose Version hat langsamere Geschwindigkeiten"
        ]
      },
      hideme: {
        description: "Hide.me bietet 10GB/Monat mit strikter No-Logs-Richtlinie. Mit Sitz in Malaysia (außerhalb 5/9/14 Eyes) bietet es gute Sicherheit mit 5 Serverstandorten.",
        pros: [
          "10GB monatliches Datenkontingent",
          "Strikte No-Logs-Richtlinie",
          "Sitz in Malaysia",
          "Mehrere Protokolloptionen",
          "Unabhängige Sicherheitsprüfung"
        ],
        cons: [
          "Beschränkt auf nur 1 Gerät",
          "Nur 5 Serverstandorte",
          "Keine Streaming-Optimierung",
          "Geschwindigkeiten können inkonsistent sein"
        ]
      },
      tunnelbear: {
        description: "TunnelBear ist perfekt für VPN-Anfänger mit seiner freundlichen Bären-Oberfläche. Obwohl es nur 2GB/Monat bietet, ermöglicht es Zugang zu 49 Ländern und unbegrenzte Geräteverbindungen.",
        pros: [
          "Sehr anfängerfreundliche Oberfläche",
          "49 Länder verfügbar",
          "Unbegrenzte Geräteverbindungen",
          "Jährlich unabhängig geprüft",
          "No-Logs-Richtlinie"
        ],
        cons: [
          "Nur 2GB/Monat (sehr begrenzt)",
          "Keine Geld-zurück-Garantie",
          "Funktioniert nicht mit Netflix",
          "Keine P2P/Torrenting-Unterstützung",
          "Im Besitz von McAfee"
        ]
      }
    },
    warning: {
      title: "Warnung: Kostenlose VPN-Risiken",
      intro: "Während die oben genannten kostenlosen VPNs vertrauenswürdig sind, sind die MEISTEN kostenlosen VPNs gefährlich. Das tun zwielichtige kostenlose VPNs:",
      risks: [
        "Verkaufen Ihre Browserdaten an Werbetreibende",
        "Fügen Werbung in Ihren Browser ein",
        "Enthalten Malware oder Spyware",
        "Haben ernsthafte Sicherheitslücken",
        "Drosseln Geschwindigkeiten auf unbrauchbar",
        "Protokollieren Aktivitäten trotz Behauptungen"
      ]
    },
    upgrade: {
      badge: "Besserer Wert",
      title: "Warum Bezahl-VPNs Es Wert Sind",
      subtitle: "Für nur 1,99-2,99€/Monat erhalten Sie unbegrenzte Daten, schnellere Geschwindigkeiten, bessere Sicherheit und zuverlässiges Streaming.",
      month: "Monat",
      getButton: "Holen",
      viewAll: "Alle VPNs Anzeigen",
      nordvpn: {
        features: [
          "Unbegrenzte Daten & Bandbreite",
          "7.400+ Server in 118 Ländern",
          "10 gleichzeitige Verbindungen",
          "Funktioniert mit allen Streaming-Diensten",
          "30-Tage-Geld-zurück-Garantie"
        ]
      },
      surfshark: {
        features: [
          "Unbegrenzte Daten & Geräte",
          "4.500+ Server in 100 Ländern",
          "Bester Wert für 1,99€/Monat",
          "Werbeblocker & Malware-Schutz",
          "30-Tage-Geld-zurück-Garantie"
        ]
      }
    }
  },
  es: {
    meta: {
      title: "Mejor VPN Gratis Noviembre 2025: Top 4 Probadas (con Límites REALES) - ZeroToVPN",
      description: "¿Buscas una VPN realmente gratis? Probamos 20+ VPNs gratis. ProtonVPN ofrece datos ilimitados, Windscribe da 10GB/mes. Aprende qué VPNs gratis son seguras."
    },
    hero: {
      badge: "Actualizado Noviembre 2025",
      title: "Mejores Servicios VPN Gratis 2025",
      subtitle: "Probamos 20+ VPNs gratis para encontrar las opciones más seguras con los mejores límites de datos. Esto es lo que realmente funciona (y lo que no)."
    },
    comparison: {
      title: "Comparación Rápida",
      vpn: "VPN",
      dataLimit: "Límite de Datos",
      servers: "Servidores",
      devices: "Dispositivos",
      streaming: "Streaming",
      unlimited: "Ilimitado",
      countries: "países",
      locations: "ubicaciones",
      month: "mes"
    },
    reviews: {
      title: "Top VPNs Gratis Clasificadas",
      subtitle: "Nuestro análisis detallado de los mejores servicios VPN gratis en 2025",
      dataLimit: "Límite de Datos",
      servers: "Servidores",
      devices: "Dispositivos",
      logs: "Registros",
      adBlocker: "Bloqueador de Anuncios",
      audited: "Auditado",
      unlimited: "Ilimitado",
      noLogs: "Sin Registros",
      included: "Incluido",
      yes: "Sí",
      countries: "países",
      locations: "ubicaciones",
      month: "mes",
      pros: "Ventajas",
      cons: "Desventajas",
      getButton: "Obtener",
      protonvpn: {
        badge: "Mejor VPN Gratis",
        unlimitedData: "Datos Ilimitados",
        description: "ProtonVPN es la ÚNICA VPN gratis con datos verdaderamente ilimitados. Con sede en Suiza, ofrece una política de no registros auditada independientemente, aplicaciones de código abierto e incluso puede desbloquear Netflix US.",
        pros: [
          "Datos ilimitados (único entre VPNs gratis)",
          "Política sin registros auditada independientemente",
          "Sede en Suiza para fuerte privacidad",
          "Aplicaciones de código abierto",
          "Puede desbloquear Netflix US",
          "Sin anuncios ni limitación de velocidad"
        ],
        cons: [
          "Versión gratis limitada a 1 dispositivo",
          "Solo 5 ubicaciones de servidor",
          "Velocidades más lentas que versión paga",
          "Sin P2P/torrenting en servidores gratis"
        ]
      },
      windscribe: {
        description: "Windscribe ofrece generosos 10GB/mes (ampliables a 15GB), ideal para navegación moderada. Incluye 10 ubicaciones de países, conexiones ilimitadas de dispositivos y un bloqueador de anuncios integrado llamado R.O.B.E.R.T.",
        pros: [
          "10GB/mes (ampliable a 15GB)",
          "Conexiones ilimitadas de dispositivos",
          "Bloqueador integrado de anuncios y malware",
          "Puede desbloquear BBC iPlayer, Hulu, HBO Max",
          "Conexiones multi-salto disponibles",
          "10 países incluyendo UK, Canadá, Francia"
        ],
        cons: [
          "Limitado a 10GB de datos mensuales",
          "Solo 3 días de garantía de devolución",
          "Con sede en Canadá (5 Eyes)",
          "Versión gratis tiene velocidades más lentas"
        ]
      },
      hideme: {
        description: "Hide.me proporciona 10GB/mes con estricta política de no registros. Con sede en Malasia (fuera de 5/9/14 Eyes), ofrece buena seguridad con 5 ubicaciones de servidor.",
        pros: [
          "10GB de datos mensuales",
          "Estricta política sin registros",
          "Sede en Malasia",
          "Múltiples opciones de protocolo",
          "Auditoría de seguridad independiente"
        ],
        cons: [
          "Limitado a solo 1 dispositivo",
          "Solo 5 ubicaciones de servidor",
          "Sin optimización de streaming",
          "Velocidades pueden ser inconsistentes"
        ]
      },
      tunnelbear: {
        description: "TunnelBear es perfecto para principiantes de VPN con su amigable interfaz temática de osos. Aunque solo ofrece 2GB/mes, proporciona acceso a 49 países y conexiones ilimitadas de dispositivos.",
        pros: [
          "Interfaz muy amigable para principiantes",
          "49 países disponibles",
          "Conexiones ilimitadas de dispositivos",
          "Auditado independientemente anualmente",
          "Política sin registros"
        ],
        cons: [
          "Solo 2GB/mes (muy limitado)",
          "Sin garantía de devolución de dinero",
          "No funciona con Netflix",
          "Sin soporte P2P/torrenting",
          "Propiedad de McAfee"
        ]
      }
    },
    warning: {
      title: "Advertencia: Riesgos de VPN Gratis",
      intro: "Aunque las VPNs gratis anteriores son confiables, la MAYORÍA de VPNs gratis son peligrosas. Esto es lo que hacen las VPNs gratis sospechosas:",
      risks: [
        "Venden tus datos de navegación a anunciantes",
        "Inyectan anuncios en tu navegador",
        "Contienen malware o spyware",
        "Tienen vulnerabilidades de seguridad serias",
        "Ralentizan velocidades hasta ser inutilizables",
        "Registran actividad a pesar de afirmar lo contrario"
      ]
    },
    upgrade: {
      badge: "Mejor Valor",
      title: "Por Qué las VPNs de Pago Valen la Pena",
      subtitle: "Por solo 1,99-2,99€/mes, obtienes datos ilimitados, velocidades más rápidas, mejor seguridad y streaming confiable.",
      month: "mes",
      getButton: "Obtener",
      viewAll: "Ver Todas las VPNs",
      nordvpn: {
        features: [
          "Datos y ancho de banda ilimitados",
          "7.400+ servidores en 118 países",
          "10 conexiones simultáneas",
          "Funciona con todos los servicios de streaming",
          "Garantía de devolución de 30 días"
        ]
      },
      surfshark: {
        features: [
          "Datos y dispositivos ilimitados",
          "4.500+ servidores en 100 países",
          "Mejor valor a 1,99€/mes",
          "Bloqueador de anuncios y protección contra malware",
          "Garantía de devolución de 30 días"
        ]
      }
    }
  },
  fr: {
    meta: {
      title: "Meilleur VPN Gratuit Novembre 2025 : Top 4 Testés (avec Limites RÉELLES) - ZeroToVPN",
      description: "Vous cherchez un VPN vraiment gratuit ? Nous avons testé 20+ VPN gratuits. ProtonVPN offre des données illimitées, Windscribe donne 10 Go/mois. Découvrez quels VPN gratuits sont sûrs."
    },
    hero: {
      badge: "Mis à jour Novembre 2025",
      title: "Meilleurs Services VPN Gratuits 2025",
      subtitle: "Nous avons testé 20+ VPN gratuits pour trouver les options les plus sûres avec les meilleures limites de données. Voici ce qui fonctionne vraiment (et ce qui ne fonctionne pas)."
    },
    comparison: {
      title: "Comparaison Rapide",
      vpn: "VPN",
      dataLimit: "Limite de Données",
      servers: "Serveurs",
      devices: "Appareils",
      streaming: "Streaming",
      unlimited: "Illimité",
      countries: "pays",
      locations: "emplacements",
      month: "mois"
    },
    reviews: {
      title: "Top VPN Gratuits Classés",
      subtitle: "Notre analyse détaillée des meilleurs services VPN gratuits en 2025",
      dataLimit: "Limite de Données",
      servers: "Serveurs",
      devices: "Appareils",
      logs: "Journaux",
      adBlocker: "Bloqueur de Pub",
      audited: "Audité",
      unlimited: "Illimité",
      noLogs: "Sans Journaux",
      included: "Inclus",
      yes: "Oui",
      countries: "pays",
      locations: "emplacements",
      month: "mois",
      pros: "Avantages",
      cons: "Inconvénients",
      getButton: "Obtenir",
      protonvpn: {
        badge: "Meilleur VPN Gratuit",
        unlimitedData: "Données Illimitées",
        description: "ProtonVPN est le SEUL VPN gratuit avec des données vraiment illimitées. Basé en Suisse, il offre une politique sans journaux auditée indépendamment, des applications open source et peut même débloquer Netflix US.",
        pros: [
          "Données illimitées (unique parmi les VPN gratuits)",
          "Politique sans journaux auditée indépendamment",
          "Basé en Suisse pour forte confidentialité",
          "Applications open source pour transparence",
          "Peut débloquer Netflix US",
          "Pas de publicités ni limitation de vitesse"
        ],
        cons: [
          "Version gratuite limitée à 1 appareil",
          "Seulement 5 emplacements de serveurs",
          "Vitesses plus lentes que version payante",
          "Pas de P2P/torrenting sur serveurs gratuits"
        ]
      },
      windscribe: {
        description: "Windscribe offre généreux 10 Go/mois (extensible à 15 Go), idéal pour navigation modérée. Il comprend 10 emplacements pays, connexions illimitées d'appareils et un bloqueur de pub intégré appelé R.O.B.E.R.T.",
        pros: [
          "10 Go/mois (extensible à 15 Go)",
          "Connexions illimitées d'appareils",
          "Bloqueur intégré de pub et malware",
          "Peut débloquer BBC iPlayer, Hulu, HBO Max",
          "Connexions multi-hop disponibles",
          "10 pays dont UK, Canada, France"
        ],
        cons: [
          "Limité à 10 Go de données mensuelles",
          "Seulement 3 jours de garantie de remboursement",
          "Basé au Canada (5 Eyes)",
          "Version gratuite a vitesses plus lentes"
        ]
      },
      hideme: {
        description: "Hide.me fournit 10 Go/mois avec stricte politique sans journaux. Basé en Malaisie (hors 5/9/14 Eyes), il offre bonne sécurité avec 5 emplacements de serveurs.",
        pros: [
          "10 Go de données mensuelles",
          "Stricte politique sans journaux",
          "Basé en Malaisie",
          "Plusieurs options de protocole",
          "Audit de sécurité indépendant"
        ],
        cons: [
          "Limité à seulement 1 appareil",
          "Seulement 5 emplacements de serveurs",
          "Pas d'optimisation streaming",
          "Vitesses peuvent être incohérentes"
        ]
      },
      tunnelbear: {
        description: "TunnelBear est parfait pour débutants VPN avec son interface conviviale thème ours. Bien qu'il n'offre que 2 Go/mois, il donne accès à 49 pays et connexions illimitées d'appareils.",
        pros: [
          "Interface très conviviale pour débutants",
          "49 pays disponibles",
          "Connexions illimitées d'appareils",
          "Audité indépendamment annuellement",
          "Politique sans journaux"
        ],
        cons: [
          "Seulement 2 Go/mois (très limité)",
          "Pas de garantie de remboursement",
          "Ne fonctionne pas avec Netflix",
          "Pas de support P2P/torrenting",
          "Propriété de McAfee"
        ]
      }
    },
    warning: {
      title: "Attention : Risques VPN Gratuit",
      intro: "Bien que les VPN gratuits ci-dessus soient fiables, la PLUPART des VPN gratuits sont dangereux. Voici ce que font les VPN gratuits douteux :",
      risks: [
        "Vendent vos données de navigation aux annonceurs",
        "Injectent des publicités dans votre navigateur",
        "Contiennent des malwares ou spywares",
        "Ont des vulnérabilités de sécurité sérieuses",
        "Ralentissent vitesses jusqu'à inutilisable",
        "Enregistrent activité malgré affirmations"
      ]
    },
    upgrade: {
      badge: "Meilleure Valeur",
      title: "Pourquoi les VPN Payants en Valent la Peine",
      subtitle: "Pour seulement 1,99-2,99€/mois, vous obtenez données illimitées, vitesses plus rapides, meilleure sécurité et streaming fiable.",
      month: "mois",
      getButton: "Obtenir",
      viewAll: "Voir Tous les VPN",
      nordvpn: {
        features: [
          "Données et bande passante illimitées",
          "7 400+ serveurs dans 118 pays",
          "10 connexions simultanées",
          "Fonctionne avec tous les services streaming",
          "Garantie de remboursement 30 jours"
        ]
      },
      surfshark: {
        features: [
          "Données et appareils illimités",
          "4 500+ serveurs dans 100 pays",
          "Meilleure valeur à 1,99€/mois",
          "Bloqueur de pub et protection malware",
          "Garantie de remboursement 30 jours"
        ]
      }
    }
  },
  ja: {
    meta: {
      title: "ベスト無料VPN 2025年11月：トップ4をテスト（実際のデータ制限付き）- ZeroToVPN",
      description: "本当に無料のVPNをお探しですか？20以上の無料VPNをテストしました。ProtonVPNは無制限データ、Windscribeは10GB/月を提供。安全な無料VPNを学びましょう。"
    },
    hero: {
      badge: "2025年11月更新",
      title: "ベスト無料VPNサービス2025",
      subtitle: "20以上の無料VPNをテストし、最高のデータ制限を持つ最も安全なオプションを見つけました。実際に機能するもの（しないもの）をご紹介します。"
    },
    comparison: {
      title: "クイック比較",
      vpn: "VPN",
      dataLimit: "データ制限",
      servers: "サーバー",
      devices: "デバイス",
      streaming: "ストリーミング",
      unlimited: "無制限",
      countries: "カ国",
      locations: "ロケーション",
      month: "月"
    },
    reviews: {
      title: "トップ無料VPNランキング",
      subtitle: "2025年のベスト無料VPNサービスの詳細分析",
      dataLimit: "データ制限",
      servers: "サーバー",
      devices: "デバイス",
      logs: "ログ",
      adBlocker: "広告ブロッカー",
      audited: "監査済み",
      unlimited: "無制限",
      noLogs: "ログなし",
      included: "含まれる",
      yes: "はい",
      countries: "カ国",
      locations: "ロケーション",
      month: "月",
      pros: "メリット",
      cons: "デメリット",
      getButton: "取得",
      protonvpn: {
        badge: "ベスト無料VPN",
        unlimitedData: "無制限データ",
        description: "ProtonVPNは本当に無制限データを持つ唯一の無料VPNです。スイスに拠点を置き、独立監査済みのログなしポリシー、オープンソースアプリを提供し、US Netflixのブロック解除も可能です。",
        pros: [
          "無制限データ（無料VPN中唯一）",
          "独立監査済みログなしポリシー",
          "スイス拠点で強力なプライバシー",
          "透明性のあるオープンソースアプリ",
          "US Netflixのブロック解除可能",
          "広告や速度制限なし"
        ],
        cons: [
          "無料版は1デバイスに制限",
          "サーバーロケーションは5つのみ",
          "有料版より速度が遅い",
          "無料サーバーでP2P/トレント不可"
        ]
      },
      windscribe: {
        description: "Windscribeは月10GB（15GBまで拡張可能）を提供し、適度なブラウジングに最適です。10カ国のロケーション、無制限のデバイス接続、R.O.B.E.R.T.という広告ブロッカーを含みます。",
        pros: [
          "月10GB（15GBまで拡張可能）",
          "無制限のデバイス接続",
          "内蔵広告&マルウェアブロッカー",
          "BBC iPlayer、Hulu、HBO Maxのブロック解除可能",
          "マルチホップ接続利用可能",
          "UK、カナダ、フランスを含む10カ国"
        ],
        cons: [
          "月間データ10GBに制限",
          "返金保証は3日間のみ",
          "カナダ拠点（5 Eyes管轄）",
          "無料版は速度が遅い"
        ]
      },
      hideme: {
        description: "Hide.meは月10GBを厳格なログなしポリシーで提供。マレーシア拠点（5/9/14 Eyes外）で、5つのサーバーロケーションで良好なセキュリティを提供します。",
        pros: [
          "月間データ10GB",
          "厳格なログなしポリシー",
          "マレーシア拠点",
          "複数のプロトコルオプション",
          "独立セキュリティ監査"
        ],
        cons: [
          "1デバイスのみに制限",
          "サーバーロケーションは5つのみ",
          "ストリーミング最適化なし",
          "速度が不安定な場合あり"
        ]
      },
      tunnelbear: {
        description: "TunnelBearはクマをテーマにした親しみやすいインターフェースでVPN初心者に最適です。月2GBのみですが、49カ国へのアクセスと無制限のデバイス接続を提供します。",
        pros: [
          "非常に初心者に優しいインターフェース",
          "49カ国利用可能",
          "無制限のデバイス接続",
          "毎年独立監査実施",
          "ログなしポリシー"
        ],
        cons: [
          "月2GBのみ（非常に限定的）",
          "返金保証なし",
          "Netflixで機能しない",
          "P2P/トレントサポートなし",
          "McAfee所有"
        ]
      }
    },
    warning: {
      title: "警告：無料VPNのリスク",
      intro: "上記の無料VPNは信頼できますが、ほとんどの無料VPNは危険です。怪しい無料VPNが行うこと：",
      risks: [
        "閲覧データを広告主に販売",
        "ブラウザに広告を挿入",
        "マルウェアやスパイウェアを含む",
        "深刻なセキュリティ脆弱性を持つ",
        "速度を使用不可能なレベルまで制限",
        "主張とは裏腹に活動をログ記録"
      ]
    },
    upgrade: {
      badge: "より良い価値",
      title: "有料VPNが価値がある理由",
      subtitle: "月額わずか1.99-2.99ドルで、無制限データ、高速、優れたセキュリティ、信頼性の高いストリーミングを取得できます。",
      month: "月",
      getButton: "取得",
      viewAll: "すべてのVPNを表示",
      nordvpn: {
        features: [
          "無制限のデータ＆帯域幅",
          "118カ国に7,400以上のサーバー",
          "10同時接続",
          "すべてのストリーミングサービスで動作",
          "30日間返金保証"
        ]
      },
      surfshark: {
        features: [
          "無制限のデータ＆デバイス",
          "100カ国に4,500以上のサーバー",
          "月額1.99ドルで最高の価値",
          "広告ブロッカー＆マルウェア保護",
          "30日間返金保証"
        ]
      }
    }
  },
  ko: {
    meta: {
      title: "최고의 무료 VPN 2025년 11월: 테스트된 상위 4개 (실제 데이터 제한 포함) - ZeroToVPN",
      description: "진정한 무료 VPN을 찾고 계신가요? 20개 이상의 무료 VPN을 테스트했습니다. ProtonVPN은 무제한 데이터를 제공하고, Windscribe는 월 10GB를 제공합니다. 안전한 무료 VPN을 알아보세요."
    },
    hero: {
      badge: "2025년 11월 업데이트",
      title: "최고의 무료 VPN 서비스 2025",
      subtitle: "최고의 데이터 제한을 가진 가장 안전한 옵션을 찾기 위해 20개 이상의 무료 VPN을 테스트했습니다. 실제로 작동하는 것(그리고 작동하지 않는 것)을 소개합니다."
    },
    comparison: {
      title: "빠른 비교",
      vpn: "VPN",
      dataLimit: "데이터 제한",
      servers: "서버",
      devices: "기기",
      streaming: "스트리밍",
      unlimited: "무제한",
      countries: "개국",
      locations: "위치",
      month: "월"
    },
    reviews: {
      title: "상위 무료 VPN 순위",
      subtitle: "2025년 최고의 무료 VPN 서비스에 대한 상세 분석",
      dataLimit: "데이터 제한",
      servers: "서버",
      devices: "기기",
      logs: "로그",
      adBlocker: "광고 차단기",
      audited: "감사됨",
      unlimited: "무제한",
      noLogs: "로그 없음",
      included: "포함됨",
      yes: "예",
      countries: "개국",
      locations: "위치",
      month: "월",
      pros: "장점",
      cons: "단점",
      getButton: "받기",
      protonvpn: {
        badge: "최고의 무료 VPN",
        unlimitedData: "무제한 데이터",
        description: "ProtonVPN은 진정한 무제한 데이터를 가진 유일한 무료 VPN입니다. 스위스에 본사를 두고 독립적으로 감사된 로그 없음 정책, 오픈 소스 앱을 제공하며 US Netflix 차단 해제도 가능합니다.",
        pros: [
          "무제한 데이터 (무료 VPN 중 유일)",
          "독립적으로 감사된 로그 없음 정책",
          "강력한 개인정보 보호를 위한 스위스 기반",
          "투명성을 위한 오픈 소스 앱",
          "US Netflix 차단 해제 가능",
          "광고나 속도 제한 없음"
        ],
        cons: [
          "무료 버전은 1개 기기로 제한",
          "서버 위치는 5개뿐",
          "유료 버전보다 속도가 느림",
          "무료 서버에서 P2P/토렌트 불가"
        ]
      },
      windscribe: {
        description: "Windscribe는 월 10GB(15GB까지 확장 가능)를 제공하여 적당한 브라우징에 적합합니다. 10개 국가 위치, 무제한 기기 연결, R.O.B.E.R.T.라는 내장 광고 차단기를 포함합니다.",
        pros: [
          "월 10GB (15GB까지 확장 가능)",
          "무제한 기기 연결",
          "내장 광고 및 맬웨어 차단기",
          "BBC iPlayer, Hulu, HBO Max 차단 해제 가능",
          "멀티홉 연결 사용 가능",
          "영국, 캐나다, 프랑스 포함 10개국"
        ],
        cons: [
          "월간 데이터 10GB로 제한",
          "환불 보장은 3일뿐",
          "캐나다 기반 (5 Eyes 관할)",
          "무료 버전은 속도가 느림"
        ]
      },
      hideme: {
        description: "Hide.me는 엄격한 로그 없음 정책으로 월 10GB를 제공합니다. 말레이시아 기반(5/9/14 Eyes 외부)으로 5개 서버 위치로 우수한 보안을 제공합니다.",
        pros: [
          "월간 데이터 10GB",
          "엄격한 로그 없음 정책",
          "말레이시아 기반",
          "여러 프로토콜 옵션",
          "독립 보안 감사"
        ],
        cons: [
          "1개 기기로만 제한",
          "서버 위치는 5개뿐",
          "스트리밍 최적화 없음",
          "속도가 일관되지 않을 수 있음"
        ]
      },
      tunnelbear: {
        description: "TunnelBear는 친근한 곰 테마 인터페이스로 VPN 초보자에게 완벽합니다. 월 2GB만 제공하지만 49개국 접근과 무제한 기기 연결을 제공합니다.",
        pros: [
          "매우 초보자 친화적인 인터페이스",
          "49개국 사용 가능",
          "무제한 기기 연결",
          "매년 독립적으로 감사됨",
          "로그 없음 정책"
        ],
        cons: [
          "월 2GB만 (매우 제한적)",
          "환불 보장 없음",
          "Netflix와 작동하지 않음",
          "P2P/토렌트 지원 없음",
          "McAfee 소유"
        ]
      }
    },
    warning: {
      title: "경고: 무료 VPN 위험",
      intro: "위의 무료 VPN은 신뢰할 수 있지만, 대부분의 무료 VPN은 위험합니다. 의심스러운 무료 VPN이 하는 일:",
      risks: [
        "브라우징 데이터를 광고주에게 판매",
        "브라우저에 광고 주입",
        "맬웨어 또는 스파이웨어 포함",
        "심각한 보안 취약점 보유",
        "사용 불가능한 수준까지 속도 제한",
        "주장과 달리 활동 로그 기록"
      ]
    },
    upgrade: {
      badge: "더 나은 가치",
      title: "유료 VPN이 가치 있는 이유",
      subtitle: "월 단 $1.99-2.99로 무제한 데이터, 빠른 속도, 더 나은 보안, 안정적인 스트리밍을 얻을 수 있습니다.",
      month: "월",
      getButton: "받기",
      viewAll: "모든 VPN 보기",
      nordvpn: {
        features: [
          "무제한 데이터 및 대역폭",
          "118개국에 7,400개 이상의 서버",
          "10개 동시 연결",
          "모든 스트리밍 서비스와 작동",
          "30일 환불 보장"
        ]
      },
      surfshark: {
        features: [
          "무제한 데이터 및 기기",
          "100개국에 4,500개 이상의 서버",
          "월 $1.99로 최고의 가치",
          "광고 차단기 및 맬웨어 보호",
          "30일 환불 보장"
        ]
      }
    }
  },
  th: {
    meta: {
      title: "VPN ฟรีที่ดีที่สุด พฤศจิกายน 2025: ท็อป 4 ที่ทดสอบ (พร้อมข้อจำกัดข้อมูลจริง) - ZeroToVPN",
      description: "กำลังหา VPN ฟรีจริงๆ หรือไม่? เราทดสอบ VPN ฟรีกว่า 20 ตัว ProtonVPN ให้ข้อมูลไม่จำกัด Windscribe ให้ 10GB/เดือน เรียนรู้ว่า VPN ฟรีตัวไหนปลอดภัย"
    },
    hero: {
      badge: "อัปเดต พฤศจิกายน 2025",
      title: "บริการ VPN ฟรีที่ดีที่สุด 2025",
      subtitle: "เราทดสอบ VPN ฟรีกว่า 20 ตัวเพื่อหาตัวเลือกที่ปลอดภัยที่สุดพร้อมข้อจำกัดข้อมูลที่ดีที่สุด นี่คือสิ่งที่ใช้งานได้จริง (และไม่ได้)"
    },
    comparison: {
      title: "เปรียบเทียบอย่างรวดเร็ว",
      vpn: "VPN",
      dataLimit: "ข้อจำกัดข้อมูล",
      servers: "เซิร์ฟเวอร์",
      devices: "อุปกรณ์",
      streaming: "สตรีมมิ่ง",
      unlimited: "ไม่จำกัด",
      countries: "ประเทศ",
      locations: "สถานที่",
      month: "เดือน"
    },
    reviews: {
      title: "VPN ฟรีอันดับต้นๆ",
      subtitle: "การวิเคราะห์โดยละเอียดของบริการ VPN ฟรีที่ดีที่สุดในปี 2025",
      dataLimit: "ข้อจำกัดข้อมูล",
      servers: "เซิร์ฟเวอร์",
      devices: "อุปกรณ์",
      logs: "บันทึก",
      adBlocker: "ตัวบล็อกโฆษณา",
      audited: "ตรวจสอบแล้ว",
      unlimited: "ไม่จำกัด",
      noLogs: "ไม่มีบันทึก",
      included: "รวมอยู่",
      yes: "ใช่",
      countries: "ประเทศ",
      locations: "สถานที่",
      month: "เดือน",
      pros: "ข้อดี",
      cons: "ข้อเสีย",
      getButton: "รับ",
      protonvpn: {
        badge: "VPN ฟรีที่ดีที่สุด",
        unlimitedData: "ข้อมูลไม่จำกัด",
        description: "ProtonVPN เป็น VPN ฟรีเพียงตัวเดียวที่มีข้อมูลไม่จำกัดจริงๆ ตั้งอยู่ในสวิตเซอร์แลนด์ที่เป็นมิตรต่อความเป็นส่วนตัว มีนโยบายไม่เก็บบันทึกที่ผ่านการตรวจสอบอิสระ แอปโอเพนซอร์ส และสามารถปลดบล็อก Netflix US ได้",
        pros: [
          "ข้อมูลไม่จำกัด (เป็นเอกลักษณ์ในหมู่ VPN ฟรี)",
          "นโยบายไม่เก็บบันทึกผ่านการตรวจสอบอิสระ",
          "ตั้งอยู่ในสวิตเซอร์แลนด์เพื่อความเป็นส่วนตัวที่แข็งแกร่ง",
          "แอปโอเพนซอร์สเพื่อความโปร่งใส",
          "สามารถปลดบล็อก Netflix US ได้",
          "ไม่มีโฆษณาหรือการจำกัดความเร็ว"
        ],
        cons: [
          "เวอร์ชันฟรีจำกัด 1 อุปกรณ์",
          "มีเพียง 5 สถานที่เซิร์ฟเวอร์",
          "ความเร็วช้ากว่าเวอร์ชันที่เสียเงิน",
          "ไม่มี P2P/torrenting บนเซิร์ฟเวอร์ฟรี"
        ]
      },
      windscribe: {
        description: "Windscribe ให้ 10GB/เดือน (ขยายได้ถึง 15GB) เหมาะสำหรับการท่องเว็บปานกลาง รวม 10 สถานที่ประเทศ การเชื่อมต่ออุปกรณ์ไม่จำกัด และตัวบล็อกโฆษณาในตัวชื่อ R.O.B.E.R.T.",
        pros: [
          "10GB/เดือน (ขยายได้ถึง 15GB)",
          "การเชื่อมต่ออุปกรณ์ไม่จำกัด",
          "ตัวบล็อกโฆษณาและมัลแวร์ในตัว",
          "สามารถปลดบล็อก BBC iPlayer, Hulu, HBO Max ได้",
          "การเชื่อมต่อแบบหลายฮ็อปมีให้บริการ",
          "10 ประเทศรวมถึง UK, แคนาดา, ฝรั่งเศส"
        ],
        cons: [
          "จำกัด 10GB ข้อมูลรายเดือน",
          "รับประกันคืนเงินเพียง 3 วัน",
          "ตั้งอยู่ในแคนาดา (5 Eyes)",
          "เวอร์ชันฟรีมีความเร็วช้ากว่า"
        ]
      },
      hideme: {
        description: "Hide.me ให้ 10GB/เดือนพร้อมนโยบายไม่เก็บบันทึกอย่างเข้มงวด ตั้งอยู่ในมาเลเซีย (นอก 5/9/14 Eyes) ให้ความปลอดภัยที่ดีพร้อม 5 สถานที่เซิร์ฟเวอร์",
        pros: [
          "ข้อมูลรายเดือน 10GB",
          "นโยบายไม่เก็บบันทึกอย่างเข้มงวด",
          "ตั้งอยู่ในมาเลเซีย",
          "ตัวเลือกโปรโตคอลหลายแบบ",
          "การตรวจสอบความปลอดภัยอิสระ"
        ],
        cons: [
          "จำกัดเพียง 1 อุปกรณ์",
          "มีเพียง 5 สถานที่เซิร์ฟเวอร์",
          "ไม่มีการปรับให้เหมาะกับการสตรีมมิ่ง",
          "ความเร็วอาจไม่สม่ำเสมอ"
        ]
      },
      tunnelbear: {
        description: "TunnelBear เหมาะสำหรับผู้เริ่มต้นใช้ VPN ด้วยอินเทอร์เฟซธีมหมีที่เป็นมิตร แม้ว่าจะให้เพียง 2GB/เดือน แต่ให้การเข้าถึง 49 ประเทศและการเชื่อมต่ออุปกรณ์ไม่จำกัด",
        pros: [
          "อินเทอร์เฟซที่เป็นมิตรกับผู้เริ่มต้นมาก",
          "49 ประเทศที่มีให้บริการ",
          "การเชื่อมต่ออุปกรณ์ไม่จำกัด",
          "ผ่านการตรวจสอบอิสระทุกปี",
          "นโยบายไม่เก็บบันทึก"
        ],
        cons: [
          "เพียง 2GB/เดือน (จำกัดมาก)",
          "ไม่มีการรับประกันคืนเงิน",
          "ใช้งานกับ Netflix ไม่ได้",
          "ไม่รองรับ P2P/torrenting",
          "เป็นเจ้าของโดย McAfee"
        ]
      }
    },
    warning: {
      title: "คำเตือน: ความเสี่ยงของ VPN ฟรี",
      intro: "แม้ว่า VPN ฟรีข้างต้นจะน่าเชื่อถือ แต่ VPN ฟรีส่วนใหญ่อันตราย นี่คือสิ่งที่ VPN ฟรีที่น่าสงสัยทำ:",
      risks: [
        "ขายข้อมูลการท่องเว็บของคุณให้กับผู้โฆษณา",
        "แทรกโฆษณาในเบราว์เซอร์ของคุณ",
        "มีมัลแวร์หรือสปายแวร์",
        "มีช่องโหว่ด้านความปลอดภัยร้ายแรง",
        "จำกัดความเร็วจนใช้งานไม่ได้",
        "บันทึกกิจกรรมแม้จะอ้างว่าไม่"
      ]
    },
    upgrade: {
      badge: "คุ้มค่ากว่า",
      title: "ทำไม VPN ที่เสียเงินคุ้มค่า",
      subtitle: "เพียง $1.99-2.99/เดือน คุณจะได้ข้อมูลไม่จำกัด ความเร็วเร็วขึ้น ความปลอดภัยดีขึ้น และการสตรีมมิ่งที่เชื่อถือได้",
      month: "เดือน",
      getButton: "รับ",
      viewAll: "ดู VPN ทั้งหมด",
      nordvpn: {
        features: [
          "ข้อมูลและแบนด์วิธไม่จำกัด",
          "เซิร์ฟเวอร์ 7,400+ ใน 118 ประเทศ",
          "10 การเชื่อมต่อพร้อมกัน",
          "ใช้งานได้กับบริการสตรีมมิ่งทั้งหมด",
          "รับประกันคืนเงิน 30 วัน"
        ]
      },
      surfshark: {
        features: [
          "ข้อมูลและอุปกรณ์ไม่จำกัด",
          "เซิร์ฟเวอร์ 4,500+ ใน 100 ประเทศ",
          "คุ้มค่าที่สุดที่ $1.99/เดือน",
          "ตัวบล็อกโฆษณาและการป้องกันมัลแวร์",
          "รับประกันคืนเงิน 30 วัน"
        ]
      }
    }
  },
  zh: {
    meta: {
      title: "最佳免费VPN 2025年11月：测试的前4名（含真实数据限制）- ZeroToVPN",
      description: "正在寻找真正免费的VPN？我们测试了20多个免费VPN。ProtonVPN提供无限数据，Windscribe提供10GB/月。了解哪些免费VPN是安全的。"
    },
    hero: {
      badge: "2025年11月更新",
      title: "最佳免费VPN服务2025",
      subtitle: "我们测试了20多个免费VPN，以找到具有最佳数据限制的最安全选项。这是真正有效的（和无效的）。"
    },
    comparison: {
      title: "快速比较",
      vpn: "VPN",
      dataLimit: "数据限制",
      servers: "服务器",
      devices: "设备",
      streaming: "流媒体",
      unlimited: "无限",
      countries: "国家",
      locations: "位置",
      month: "月"
    },
    reviews: {
      title: "顶级免费VPN排名",
      subtitle: "我们对2025年最佳免费VPN服务的详细分析",
      dataLimit: "数据限制",
      servers: "服务器",
      devices: "设备",
      logs: "日志",
      adBlocker: "广告拦截器",
      audited: "已审计",
      unlimited: "无限",
      noLogs: "无日志",
      included: "包含",
      yes: "是",
      countries: "国家",
      locations: "位置",
      month: "月",
      pros: "优点",
      cons: "缺点",
      getButton: "获取",
      protonvpn: {
        badge: "最佳免费VPN",
        unlimitedData: "无限数据",
        description: "ProtonVPN是唯一真正提供无限数据的免费VPN。总部位于瑞士，提供经过独立审计的无日志政策、开源应用程序，甚至可以解锁美国Netflix。",
        pros: [
          "无限数据（免费VPN中独一无二）",
          "经独立审计的无日志政策",
          "瑞士基地提供强大隐私保护",
          "开源应用程序确保透明度",
          "可解锁美国Netflix",
          "无广告或速度限制"
        ],
        cons: [
          "免费版限制1台设备",
          "仅5个服务器位置可用",
          "速度比付费版慢",
          "免费服务器不支持P2P/种子下载"
        ]
      },
      windscribe: {
        description: "Windscribe提供慷慨的10GB/月（可扩展至15GB），非常适合中等浏览。它包括10个国家位置、无限设备连接和名为R.O.B.E.R.T.的内置广告拦截器。",
        pros: [
          "10GB/月（可扩展至15GB）",
          "无限设备连接",
          "内置广告和恶意软件拦截器",
          "可解锁BBC iPlayer、Hulu、HBO Max",
          "多跳连接可用",
          "10个国家包括英国、加拿大、法国"
        ],
        cons: [
          "限制为每月10GB数据",
          "仅3天退款保证",
          "总部位于加拿大（5眼联盟）",
          "免费版速度较慢"
        ]
      },
      hideme: {
        description: "Hide.me提供10GB/月，严格的无日志政策。总部位于马来西亚（在5/9/14眼联盟之外），提供5个服务器位置的良好安全性。",
        pros: [
          "每月10GB数据",
          "严格的无日志政策",
          "总部位于马来西亚",
          "多种协议选项",
          "独立安全审计"
        ],
        cons: [
          "仅限1台设备",
          "仅5个服务器位置",
          "无流媒体优化",
          "速度可能不一致"
        ]
      },
      tunnelbear: {
        description: "TunnelBear凭借其友好的熊主题界面非常适合VPN初学者。虽然只提供2GB/月，但提供49个国家的访问和无限设备连接。",
        pros: [
          "非常适合初学者的界面",
          "49个国家可用",
          "无限设备连接",
          "每年独立审计",
          "无日志政策"
        ],
        cons: [
          "仅2GB/月（非常有限）",
          "无退款保证",
          "不适用于Netflix",
          "不支持P2P/种子下载",
          "由McAfee拥有"
        ]
      }
    },
    warning: {
      title: "警告：免费VPN风险",
      intro: "虽然上述免费VPN值得信赖，但大多数免费VPN都很危险。可疑免费VPN的做法：",
      risks: [
        "向广告商出售您的浏览数据",
        "在浏览器中注入广告",
        "包含恶意软件或间谍软件",
        "存在严重的安全漏洞",
        "将速度限制到无法使用的水平",
        "尽管声称不会，但仍记录活动"
      ]
    },
    upgrade: {
      badge: "更好的价值",
      title: "为什么付费VPN值得",
      subtitle: "每月仅需$1.99-2.99，您就能获得无限数据、更快速度、更好安全性和可靠的流媒体。",
      month: "月",
      getButton: "获取",
      viewAll: "查看所有VPN",
      nordvpn: {
        features: [
          "无限数据和带宽",
          "118个国家的7,400多台服务器",
          "10个同时连接",
          "适用于所有流媒体服务",
          "30天退款保证"
        ]
      },
      surfshark: {
        features: [
          "无限数据和设备",
          "100个国家的4,500多台服务器",
          "最佳价值$1.99/月",
          "广告拦截器和恶意软件保护",
          "30天退款保证"
        ]
      }
    }
  }
};

// Function to add translations to a locale file
function addTranslations(locale, data) {
  const filePath = path.join(__dirname, '..', 'src', 'messages', `${locale}.json`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Remove the closing brace
  const withoutClosing = content.trimEnd().slice(0, -1);

  // Add the freeVpn section
  const newContent = withoutClosing + ',\n  "freeVpn": ' + JSON.stringify(data, null, 2) + '\n}\n';

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✓ Added freeVpn translations to ${locale}.json`);
}

// Add translations to all locales
Object.entries(translations).forEach(([locale, data]) => {
  addTranslations(locale, data);
});

console.log('\n✓ All translations added successfully!');
