/* ==========================================================================
   DASS Montréal Language School — pricing-i18n.js
   Display strings only (course names, form labels, messages) for the quote
   estimator and the Tuition & Fees page, in Japanese / English / French.
   All amounts and calculation rules live in js/pricing-data.js and
   js/pricing-engine.js — this file must never contain a price.
   ========================================================================== */

var PricingI18n = {

  ja: {
    courseNames: {
      english: { general: "一般英語", intensive: "集中英語", exam: "IELTS対策" },
      french: { general: "一般フランス語", intensive: "集中フランス語", exam: "DELF・DALF対策" }
    },
    studyLanguageOptions: { english: "英語コース", french: "フランス語コース" },
    stayMethodOptions: {
      homestay: "ホームステイ",
      residence: "学生寮・シェアレジデンス",
      self: "自己手配（滞在先の手配なし）",
      undecided: "まだ決めていない"
    },
    roomTypeOptions: {
      homestay: { private: "個室", shared: "相部屋" },
      residence: {
        sharedRoom: "相部屋",
        privateSharedBathroom: "個室・共用浴室",
        privateBathroom: "個室・専用浴室"
      }
    },
    mealPlanOptions: {
      none: "食事なし",
      breakfast: "朝食付き",
      twoMeals: "1日2食",
      threeMeals: "1日3食"
    },
    mealPlanNotApplicable: "食事プランの設定なし",
    airportTransferOptions: { none: "利用しない", oneWay: "片道", roundTrip: "往復" },
    yesNo: { yes: "利用する", no: "利用しない" },

    labels: {
      studyLanguage: "学習言語",
      course: "コース",
      age: "年齢",
      weeks: "受講期間（週数）",
      startDate: "開始予定日",
      stayMethod: "滞在方法",
      roomType: "部屋タイプ",
      mealPlan: "食事プラン",
      stayWeeks: "滞在期間（週数）",
      airportTransfer: "空港送迎",
      insurance: "海外保険",
      minorSupport: "未成年者サポート"
    },
    units: { weeks: "週間", age: "歳", lessonsPerWeek: "週{n}レッスン" },
    weekRanges: { short: "1〜3週間", standard: "4〜12週間", medium: "13〜24週間", long: "25〜52週間" },
    pairJoiner: "・",

    tuitionTable: {
      durationHeader: "受講期間",
      weeklyRateHeader: "料金／週",
      generalIntensiveTitle: "{course}（{lessons}）",
      otherFeesTitle: "その他の料金",
      otherFeesHeaders: ["項目", "料金"],
      perWeekFormat: "週CAD {n}",
      capFormat: "最大{n}",
      otherFeesRows: {
        registrationFee: { label: "入学金" },
        materialsFeeBase: { label: "教材費・1〜4週間" },
        materialsFeePerWeek: { label: "教材費・5週間以上" },
        placementFee: { label: "滞在先手配料" },
        airportOneWay: { label: "空港送迎・片道" },
        airportRoundTrip: { label: "空港送迎・往復" },
        insurance: { label: "海外保険" },
        minorSupport: { label: "未成年者サポート基本料" }
      },
      homestayTitle: "ホームステイ",
      homestayHeaders: ["部屋・食事", "料金／週"],
      homestayRows: {
        privateNoMeals: "個室・食事なし",
        privateBreakfast: "個室・朝食付き",
        privateTwoMeals: "個室・1日2食",
        privateThreeMeals: "個室・1日3食",
        sharedTwoMeals: "相部屋・1日2食"
      },
      residenceTitle: "学生寮・シェアレジデンス",
      residenceHeaders: ["部屋タイプ", "料金／週"],
      residenceRows: {
        sharedRoom: "相部屋",
        privateSharedBathroom: "個室・共用浴室",
        privateBathroom: "個室・専用浴室"
      }
    },

    placeholders: {
      selectStudyLanguage: "学習言語を選択してください",
      selectCourse: "コースを選択してください",
      selectStayMethod: "滞在方法を選択してください",
      selectRoomType: "部屋タイプを選択してください"
    },

    validation: {
      studyLanguage: "学習言語を選択してください。",
      course: "コースを選択してください。",
      age: "年齢を正しく入力してください（1〜99）。",
      weeks: "受講期間を1〜52の範囲で入力してください。",
      startDate: "開始予定日を選択してください。",
      stayMethod: "滞在方法を選択してください。",
      roomType: "部屋タイプを選択してください。",
      stayWeeks: "滞在期間を1〜52の範囲で入力してください。"
    },

    minorSupportNotice: "未成年者の受入条件、滞在先、空港送迎、必要書類は個別確認が必要です。",

    resultHeading: "お見積り結果",
    inputSummaryHeading: "ご入力内容",
    costBreakdownHeading: "概算費用内訳",
    resultLabels: {
      studyLanguage: "学習言語",
      course: "コース",
      lessonsPerWeek: "週のレッスン数",
      weeks: "受講期間",
      startDate: "開始予定日",
      stayMethod: "滞在方法",
      roomType: "部屋タイプ",
      mealPlan: "食事プラン",
      stayWeeks: "滞在期間",
      addons: "追加サービス",
      tuition: "授業料",
      registrationFee: "入学金",
      materialsFee: "教材費",
      placementFee: "滞在先手配料",
      accommodationCost: "滞在費",
      airportTransferFee: "空港送迎",
      insuranceFee: "海外保険",
      minorSupportFee: "未成年者サポート",
      grandTotal: "概算合計"
    },
    addonsNone: "なし",
    addonsSeparator: "、",

    buttons: {
      reset: "入力をリセット",
      print: "印刷・PDF保存",
      proceedToContact: "この内容でお問い合わせフォームへ進む"
    },

    notFilledYet: "必要項目を入力すると、自動的に見積りが表示されます。",
    ageBracket: { minor: "18歳未満", adult: "18歳以上" }
  },

  en: {
    courseNames: {
      english: { general: "General English", intensive: "Intensive English", exam: "IELTS Preparation" },
      french: { general: "General French", intensive: "Intensive French", exam: "DELF/DALF Preparation" }
    },
    studyLanguageOptions: { english: "English Course", french: "French Course" },
    stayMethodOptions: {
      homestay: "Homestay",
      residence: "Student Residence",
      self: "Self-arranged (no accommodation booking)",
      undecided: "Not decided yet"
    },
    roomTypeOptions: {
      homestay: { private: "Private room", shared: "Shared room" },
      residence: {
        sharedRoom: "Shared room",
        privateSharedBathroom: "Private room, shared bathroom",
        privateBathroom: "Private room, private bathroom"
      }
    },
    mealPlanOptions: {
      none: "No meals",
      breakfast: "Breakfast included",
      twoMeals: "2 meals/day",
      threeMeals: "3 meals/day"
    },
    mealPlanNotApplicable: "No meal plan for this option",
    airportTransferOptions: { none: "Not needed", oneWay: "One-way", roundTrip: "Round-trip" },
    yesNo: { yes: "Add this", no: "Not needed" },

    labels: {
      studyLanguage: "Language to study",
      course: "Course",
      age: "Age",
      weeks: "Course duration (weeks)",
      startDate: "Preferred start date",
      stayMethod: "Accommodation",
      roomType: "Room type",
      mealPlan: "Meal plan",
      stayWeeks: "Accommodation duration (weeks)",
      airportTransfer: "Airport transfer",
      insurance: "Overseas insurance",
      minorSupport: "Minor student support"
    },
    units: { weeks: "weeks", age: "years old", lessonsPerWeek: "{n} lessons/week" },
    weekRanges: { short: "1–3 weeks", standard: "4–12 weeks", medium: "13–24 weeks", long: "25–52 weeks" },
    examWeekRanges: { short: "1–3 weeks", standard: "4–12 weeks", medium: "13–24 weeks", long: "25+ weeks" },
    individualQuoteLabel: "Contact us",
    pairJoiner: " & ",

    tuitionTable: {
      durationHeader: "Duration",
      lessonsHeader: "Lessons",
      weeklyRateHeader: "Weekly rate (CAD)",
      generalIntensiveTitle: "{course} ({lessons})",
      examTitle: "{course} ({lessons})",
      examNote: "IELTS Preparation and DELF/DALF Preparation are reference prices for 4–24 weeks only. Please contact us for 1–3 weeks or 25+ weeks.",
      otherFeesTitle: "Other reference fees",
      otherFeesHeaders: ["Item", "Reference price (CAD)", "How it's calculated"],
      perWeekFormat: "{n}/week",
      capFormat: "Capped at CAD {n}",
      otherFeesRows: {
        registrationFee: { label: "Registration fee", calc: "One-time" },
        materialsFeeBase: { label: "Materials fee (1–4 weeks)", calc: "Flat" },
        materialsFeePerWeek: { label: "Materials fee (5+ weeks)", calc: "{cap}" },
        placementFee: { label: "Accommodation placement fee", calc: "One-time (homestay/residence only)" },
        airportOneWay: { label: "Airport transfer (one-way)", calc: "One-time" },
        airportRoundTrip: { label: "Airport transfer (round-trip)", calc: "One-time" },
        insurance: { label: "Overseas insurance", calc: "Based on accommodation duration" },
        minorSupport: { label: "Minor student support (base)", calc: "One-time" }
      },
      homestayTitle: "Homestay",
      homestayHeaders: ["Room & meals", "Weekly rate (CAD)"],
      homestayRows: {
        privateNoMeals: "Private room, no meals",
        privateBreakfast: "Private room, breakfast",
        privateTwoMeals: "Private room, 2 meals/day",
        privateThreeMeals: "Private room, 3 meals/day",
        sharedTwoMeals: "Shared room, 2 meals/day"
      },
      residenceTitle: "Student Residence",
      residenceHeaders: ["Room type", "Weekly rate (CAD)"],
      residenceRows: {
        sharedRoom: "Shared room",
        privateSharedBathroom: "Private room, shared bathroom",
        privateBathroom: "Private room, private bathroom"
      }
    },

    placeholders: {
      selectStudyLanguage: "Select a language",
      selectCourse: "Select a course",
      selectStayMethod: "Select an accommodation type",
      selectRoomType: "Select a room type"
    },

    validation: {
      studyLanguage: "Please select a language.",
      course: "Please select a course.",
      age: "Please enter a valid age (1–99).",
      weeks: "Please enter a course duration between 1 and 52 weeks.",
      startDate: "Please select a preferred start date.",
      stayMethod: "Please select an accommodation type.",
      roomType: "Please select a room type.",
      stayWeeks: "Please enter an accommodation duration between 1 and 52 weeks."
    },

    examCustomQuoteMessage: "Exam preparation courses at this duration require an individual quote. Please contact us.",
    minorSupportNotice: "Acceptance conditions, accommodation, airport transfer, and required documents for minors must be confirmed individually.",
    temporaryDataNotice: "The prices shown are reference prices, set during DASS's pre-opening preparation based on 2026 pricing levels among Montreal language schools. They are not official prices.",
    quoteDisclaimer: "This estimate is based on reference pricing only and is not an official enrollment amount.",

    resultHeading: "Your Estimate",
    inputSummaryHeading: "Your Selections",
    costBreakdownHeading: "Estimated Cost Breakdown",
    resultLabels: {
      studyLanguage: "Language",
      course: "Course",
      lessonsPerWeek: "Lessons per week",
      weeks: "Course duration",
      startDate: "Preferred start date",
      stayMethod: "Accommodation",
      roomType: "Room type",
      mealPlan: "Meal plan",
      stayWeeks: "Accommodation duration",
      addons: "Additional services",
      tuition: "Tuition",
      registrationFee: "Registration fee",
      materialsFee: "Materials fee",
      placementFee: "Accommodation placement fee",
      accommodationCost: "Accommodation cost",
      airportTransferFee: "Airport transfer",
      insuranceFee: "Overseas insurance",
      minorSupportFee: "Minor student support",
      grandTotal: "Estimated total",
      customQuote: "Individual quote required"
    },
    addonsNone: "None",
    addonsSeparator: ", ",

    buttons: {
      reset: "Reset",
      print: "Print / Save as PDF",
      proceedToContact: "Continue to the contact form with these details"
    },

    notFilledYet: "Fill in the required fields to see your estimate automatically.",
    ageBracket: { minor: "Under 18", adult: "18 or over" }
  },

  fr: {
    courseNames: {
      english: { general: "Anglais général", intensive: "Anglais intensif", exam: "Préparation à l’IELTS" },
      french: { general: "Français général", intensive: "Français intensif", exam: "Préparation au DELF/DALF" }
    },
    studyLanguageOptions: { english: "Cours d’anglais", french: "Cours de français" },
    stayMethodOptions: {
      homestay: "Famille d’accueil",
      residence: "Résidence étudiante",
      self: "Logement personnel (sans réservation)",
      undecided: "Pas encore décidé"
    },
    roomTypeOptions: {
      homestay: { private: "Chambre individuelle", shared: "Chambre partagée" },
      residence: {
        sharedRoom: "Chambre partagée",
        privateSharedBathroom: "Chambre individuelle, salle de bain partagée",
        privateBathroom: "Chambre individuelle, salle de bain privée"
      }
    },
    mealPlanOptions: {
      none: "Sans repas",
      breakfast: "Petit-déjeuner inclus",
      twoMeals: "2 repas/jour",
      threeMeals: "3 repas/jour"
    },
    mealPlanNotApplicable: "Aucune formule de repas pour cette option",
    airportTransferOptions: { none: "Non requis", oneWay: "Aller simple", roundTrip: "Aller-retour" },
    yesNo: { yes: "Ajouter", no: "Non requis" },

    labels: {
      studyLanguage: "Langue étudiée",
      course: "Cours",
      age: "Âge",
      weeks: "Durée du cours (semaines)",
      startDate: "Date de début souhaitée",
      stayMethod: "Hébergement",
      roomType: "Type de chambre",
      mealPlan: "Formule de repas",
      stayWeeks: "Durée de l’hébergement (semaines)",
      airportTransfer: "Transfert aéroport",
      insurance: "Assurance voyage",
      minorSupport: "Accompagnement des mineurs"
    },
    units: { weeks: "semaines", age: "ans", lessonsPerWeek: "{n} cours/semaine" },
    weekRanges: { short: "1 à 3 semaines", standard: "4 à 12 semaines", medium: "13 à 24 semaines", long: "25 à 52 semaines" },
    examWeekRanges: { short: "1 à 3 semaines", standard: "4 à 12 semaines", medium: "13 à 24 semaines", long: "25 semaines ou plus" },
    individualQuoteLabel: "Nous contacter",
    pairJoiner: " et ",

    tuitionTable: {
      durationHeader: "Durée",
      lessonsHeader: "Cours",
      weeklyRateHeader: "Tarif hebdomadaire (CAD)",
      generalIntensiveTitle: "{course} ({lessons})",
      examTitle: "{course} ({lessons})",
      examNote: "La préparation à l’IELTS et au DELF/DALF sont des tarifs de référence pour 4 à 24 semaines seulement. Veuillez nous contacter pour 1 à 3 semaines ou 25 semaines et plus.",
      otherFeesTitle: "Autres frais de référence",
      otherFeesHeaders: ["Élément", "Tarif de référence (CAD)", "Mode de calcul"],
      perWeekFormat: "{n}/semaine",
      capFormat: "Plafonné à {n} CAD",
      otherFeesRows: {
        registrationFee: { label: "Frais d’inscription", calc: "Unique" },
        materialsFeeBase: { label: "Frais de matériel (1 à 4 semaines)", calc: "Forfaitaire" },
        materialsFeePerWeek: { label: "Frais de matériel (5 semaines et plus)", calc: "{cap}" },
        placementFee: { label: "Frais de placement en hébergement", calc: "Unique (famille d’accueil/résidence seulement)" },
        airportOneWay: { label: "Transfert aéroport (aller simple)", calc: "Unique" },
        airportRoundTrip: { label: "Transfert aéroport (aller-retour)", calc: "Unique" },
        insurance: { label: "Assurance voyage", calc: "Selon la durée de l’hébergement" },
        minorSupport: { label: "Accompagnement des mineurs (base)", calc: "Unique" }
      },
      homestayTitle: "Famille d’accueil",
      homestayHeaders: ["Chambre et repas", "Tarif hebdomadaire (CAD)"],
      homestayRows: {
        privateNoMeals: "Chambre individuelle, sans repas",
        privateBreakfast: "Chambre individuelle, petit-déjeuner",
        privateTwoMeals: "Chambre individuelle, 2 repas/jour",
        privateThreeMeals: "Chambre individuelle, 3 repas/jour",
        sharedTwoMeals: "Chambre partagée, 2 repas/jour"
      },
      residenceTitle: "Résidence étudiante",
      residenceHeaders: ["Type de chambre", "Tarif hebdomadaire (CAD)"],
      residenceRows: {
        sharedRoom: "Chambre partagée",
        privateSharedBathroom: "Chambre individuelle, salle de bain partagée",
        privateBathroom: "Chambre individuelle, salle de bain privée"
      }
    },

    placeholders: {
      selectStudyLanguage: "Choisissez une langue",
      selectCourse: "Choisissez un cours",
      selectStayMethod: "Choisissez un type d’hébergement",
      selectRoomType: "Choisissez un type de chambre"
    },

    validation: {
      studyLanguage: "Veuillez choisir une langue.",
      course: "Veuillez choisir un cours.",
      age: "Veuillez entrer un âge valide (1–99).",
      weeks: "Veuillez entrer une durée de cours entre 1 et 52 semaines.",
      startDate: "Veuillez choisir une date de début souhaitée.",
      stayMethod: "Veuillez choisir un type d’hébergement.",
      roomType: "Veuillez choisir un type de chambre.",
      stayWeeks: "Veuillez entrer une durée d’hébergement entre 1 et 52 semaines."
    },

    examCustomQuoteMessage: "Pour cette durée, les cours de préparation aux examens font l’objet d’un devis individuel. Veuillez nous contacter.",
    minorSupportNotice: "Les conditions d’accueil des mineurs, l’hébergement, le transfert aéroport et les documents requis doivent être confirmés individuellement.",
    temporaryDataNotice: "Les tarifs affichés sont des tarifs de référence, établis pendant la préparation de l’ouverture de DASS à partir des niveaux de prix 2026 des écoles de langues de Montréal. Ce ne sont pas des tarifs officiels.",
    quoteDisclaimer: "Cette estimation repose uniquement sur des tarifs de référence et ne constitue pas un montant d’inscription officiel.",

    resultHeading: "Votre estimation",
    inputSummaryHeading: "Votre sélection",
    costBreakdownHeading: "Détail des coûts estimés",
    resultLabels: {
      studyLanguage: "Langue",
      course: "Cours",
      lessonsPerWeek: "Cours par semaine",
      weeks: "Durée du cours",
      startDate: "Date de début souhaitée",
      stayMethod: "Hébergement",
      roomType: "Type de chambre",
      mealPlan: "Formule de repas",
      stayWeeks: "Durée de l’hébergement",
      addons: "Services additionnels",
      tuition: "Frais de scolarité",
      registrationFee: "Frais d’inscription",
      materialsFee: "Frais de matériel",
      placementFee: "Frais de placement en hébergement",
      accommodationCost: "Coût de l’hébergement",
      airportTransferFee: "Transfert aéroport",
      insuranceFee: "Assurance voyage",
      minorSupportFee: "Accompagnement des mineurs",
      grandTotal: "Total estimé",
      customQuote: "Devis individuel requis"
    },
    addonsNone: "Aucun",
    addonsSeparator: ", ",

    buttons: {
      reset: "Réinitialiser",
      print: "Imprimer / Enregistrer en PDF",
      proceedToContact: "Transférer ces informations au formulaire de contact"
    },

    notFilledYet: "Remplissez les champs requis pour afficher automatiquement votre estimation.",
    ageBracket: { minor: "Moins de 18 ans", adult: "18 ans ou plus" }
  }
};
