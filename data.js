/* ============================================================
   ChantierQuest — Données du programme DEP 5220 / 5720
   Conduite d'engins de chantier / Construction Equipment Operation
   20 compétences officielles (source: AdmissionFP.com)
   Les questions QCM sont des EXEMPLES à valider/remplacer par
   les enseignants du programme.

   Format des choix: chaque question a un tableau "choices" où
   chaque item a { fr, en, correct }. L'ordre est mélangé au
   moment de l'affichage (voir app.js) — la position de la bonne
   réponse change donc à chaque tentative.
   ============================================================ */

const PROGRAM = {
  fr: { title: "SASI — Santé, assistance et soins infirmiers", subtitle: "DEP 5325 — 1800 heures" },
  en: { title: "HANC — Health, Assistance and Nursing Care", subtitle: "DVS 5325 — 1800 hours" }
};

function ch(fr, en, correct) { return { fr, en, correct: !!correct }; }

/* Question de type vrai/faux: affirmation à juger. */
function tf(fr, en, isTrue) { return { type: "tf", fr, en, isTrue: !!isTrue }; }

/* Question de type "association de termes": l'élève touche un terme puis
   sa définition correspondante. pairs: tableau de
   { term_fr, term_en, def_fr, def_en }. Toutes les paires doivent être
   associées correctement pour que la question soit considérée réussie. */
function pair(term_fr, term_en, def_fr, def_en) { return { term_fr, term_en, def_fr, def_en }; }
function match(fr, en, pairs) { return { type: "match", fr, en, pairs }; }

/* Question de type "situation complexe" (mise en situation): un court
   scénario réaliste suivi d'un choix multiple basé sur le jugement
   professionnel. Réutilise le même format "choices" qu'un QCM standard. */
function scenario(fr, en, choices) { return { type: "scenario", fr, en, choices }; }

/* Paliers de difficulté d'une quête. Chaque compétence est maintenant
   divisée en 3 paliers progressifs (tiers[]), débloqués l'un après l'autre:
   Débutant -> Intermédiaire -> Avancé. Réussir le palier 1 d'une compétence
   déverrouille la compétence suivante sur la carte; réussir le palier 3
   (Avancé) accorde le badge de maîtrise de la compétence. */
const TIER_META = [
  { level: 1, name_fr: "Débutant", name_en: "Beginner", icon: "🌱" },
  { level: 2, name_fr: "Intermédiaire", name_en: "Intermediate", icon: "⚙️" },
  { level: 3, name_fr: "Avancé", name_en: "Advanced", icon: "🏆" }
];

/* Chaque compétence = une "quête". order = ordre de déblocage. */
const COMPETENCIES = [
 {
  "id": "anatomie",
  "order": 1,
  "title_fr": "Anatomie & Physiologie",
  "title_en": "Anatomy & Physiology",
  "icon": "🫀",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Quel organe produit l'insuline ?",
      "en": "Which organ produces insulin?",
      "choices": [
       {
        "fr": "Le foie",
        "en": "The liver"
       },
       {
        "fr": "Le pancréas",
        "en": "The pancreas",
        "correct": true
       },
       {
        "fr": "Le rein",
        "en": "The kidney"
       },
       {
        "fr": "La rate",
        "en": "The spleen"
       }
      ],
      "explFr": "Les cellules bêta des îlots de Langerhans du pancréas sécrètent l'insuline, qui permet aux cellules d'absorber le glucose.",
      "explEn": "The beta cells of the pancreatic islets of Langerhans secrete insulin, which allows cells to absorb glucose."
     },
     {
      "fr": "La fréquence respiratoire normale chez l'adulte est :",
      "en": "The normal respiratory rate in adults is:",
      "choices": [
       {
        "fr": "6–10 /min",
        "en": "6–10 /min"
       },
       {
        "fr": "12–20 /min",
        "en": "12–20 /min",
        "correct": true
       },
       {
        "fr": "22–30 /min",
        "en": "22–30 /min"
       },
       {
        "fr": "30–40 /min",
        "en": "30–40 /min"
       }
      ],
      "explFr": "Entre 12 et 20 respirations par minute au repos. On parle de tachypnée au-dessus de 20 et de bradypnée en dessous de 12.",
      "explEn": "Between 12 and 20 breaths per minute at rest. Above 20 is called tachypnea, and below 12 is called bradypnea."
     },
     {
      "type": "tf",
      "fr": "Les globules rouges sont produits dans la moelle osseuse rouge.",
      "en": "Red blood cells are produced in the red bone marrow.",
      "isTrue": true,
      "explFr": "Vrai. L'érythropoïèse (production des globules rouges) se déroule dans la moelle osseuse rouge des os plats et longs.",
      "explEn": "True. Erythropoiesis (red blood cell production) takes place in the red bone marrow of flat and long bones."
     },
     {
      "type": "tf",
      "fr": "Le système nerveux périphérique comprend le cerveau et la moelle épinière.",
      "en": "The peripheral nervous system includes the brain and spinal cord.",
      "isTrue": false,
      "explFr": "Faux. Le cerveau et la moelle épinière constituent le Système Nerveux Central (SNC). Le SNP désigne les nerfs crâniens et spinaux.",
      "explEn": "False. The brain and spinal cord make up the Central Nervous System (CNS). The PNS refers to the cranial and spinal nerves."
     },
     {
      "fr": "Qu'est-ce que la diurèse normale chez l'adulte ?",
      "en": "What is the normal urine output (diuresis) in adults?",
      "choices": [
       {
        "fr": "200–500 mL/jour",
        "en": "200–500 mL/day"
       },
       {
        "fr": "500–800 mL/jour",
        "en": "500–800 mL/day"
       },
       {
        "fr": "1 000–2 000 mL/jour",
        "en": "1,000–2,000 mL/day",
        "correct": true
       },
       {
        "fr": "3 000–4 000 mL/jour",
        "en": "3,000–4,000 mL/day"
       }
      ],
      "explFr": "La diurèse normale est de 1 à 2 litres par jour. En dessous de 400 mL on parle d'oligurie ; en dessous de 100 mL d'anurie.",
      "explEn": "Normal diuresis is 1 to 2 liters per day. Below 400 mL is called oliguria; below 100 mL is called anuria."
     },
     {
      "type": "scenario",
      "fr": "Mme Tremblay, 72 ans, se plaint de fatigue intense, confusion et a la peau bleutée. Sa SpO₂ est à 88 %.\n\nQuelle est votre première action prioritaire ?",
      "en": "Mrs. Tremblay, 72, complains of intense fatigue and confusion and has a bluish skin tone. Her SpO₂ is 88%.\n\nWhat is your priority first action?",
      "choices": [
       {
        "fr": "Vérifier l'oxymètre sur un autre doigt et reprendre la mesure dans 15 minutes",
        "en": "Give her a glass of water"
       },
       {
        "fr": "Aviser immédiatement l'infirmière et préparer l'O₂",
        "en": "Immediately notify the nurse and prepare oxygen",
        "correct": true
       },
       {
        "fr": "Installer la patiente en semi-Fowler et surveiller l'évolution",
        "en": "Take her temperature"
       },
       {
        "fr": "Prendre les signes vitaux complets avant toute intervention",
        "en": "Ask her if she is in pain"
       }
      ],
      "explFr": "Une SpO₂ < 90 % est une urgence respiratoire. La cyanose (peau bleutée) confirme l'hypoxie. Il faut aviser immédiatement et préparer l'oxygénation.",
      "explEn": "An SpO₂ < 90% is a respiratory emergency. Cyanosis (bluish skin) confirms hypoxia. You must notify the nurse immediately and prepare for oxygen therapy."
     },
     {
      "type": "scenario",
      "fr": "Vous observez que M. Côté urine seulement 250 mL depuis 8 heures malgré une hydratation normale.\n\nQuel terme désigne cette condition et quel est le seuil clinique ?",
      "en": "You notice that Mr. Côté has urinated only 250 mL in the past 8 hours despite normal hydration.\n\nWhat term describes this condition and what is the clinical threshold?",
      "choices": [
       {
        "fr": "Polyurie — > 3 L/jour",
        "en": "Polyuria — > 3 L/day"
       },
       {
        "fr": "Anurie — < 100 mL/jour",
        "en": "Anuria — < 100 mL/day"
       },
       {
        "fr": "Oligurie — < 400 mL/jour",
        "en": "Oliguria — < 400 mL/day",
        "correct": true
       },
       {
        "fr": "Nycturie — urine nocturne",
        "en": "Nocturia — nighttime urination"
       }
      ],
      "explFr": "L'oligurie (< 400 mL/jour ou < 0.5 mL/kg/h) est un signe de dysfonction rénale potentielle. Il faut aviser l'infirmière et noter au dossier.",
      "explEn": "Oliguria (< 400 mL/day or < 0.5 mL/kg/h) is a sign of potential kidney dysfunction. You must notify the nurse and document it in the chart."
     },
     {
      "fr": "Quel est le volume sanguin total approximatif chez un adulte de taille moyenne ?",
      "en": "What is the approximate total blood volume in an average-sized adult?",
      "choices": [
       {
        "fr": "1 à 2 L",
        "en": "1 to 2 L"
       },
       {
        "fr": "4 à 5 L",
        "en": "4 to 5 L",
        "correct": true
       },
       {
        "fr": "8 à 9 L",
        "en": "8 to 9 L"
       },
       {
        "fr": "12 à 14 L",
        "en": "12 to 14 L"
       }
      ],
      "explFr": "Le volume sanguin total représente environ 7-8 % du poids corporel, soit 4 à 5 litres chez un adulte moyen.",
      "explEn": "Total blood volume represents about 7-8% of body weight, or 4 to 5 liters in an average adult."
     },
     {
      "type": "tf",
      "fr": "Le foie produit la bile, qui aide à la digestion des graisses.",
      "en": "The liver produces bile, which helps digest fats.",
      "isTrue": true,
      "explFr": "Vrai. La bile est produite par le foie et stockée dans la vésicule biliaire avant d'être déversée dans le duodénum pour émulsifier les graisses.",
      "explEn": "True. Bile is produced by the liver and stored in the gallbladder before being released into the duodenum to emulsify fats."
     },
     {
      "type": "scenario",
      "fr": "M. Lavoie, 70 ans, présente un œdème important aux deux jambes en fin de journée, qui diminue après une nuit de sommeil. Il a aussi un essoufflement à l'effort.\n\nQuelle cause sous-jacente devez-vous suspecter et signaler ?",
      "en": "Mr. Lavoie, 70, presents with significant edema in both legs by the end of the day, which decreases after a night's sleep. He also has shortness of breath on exertion.\n\nWhat underlying cause should you suspect and report?",
      "choices": [
       {
        "fr": "Une fracture osseuse non diagnostiquée",
        "en": "An undiagnosed bone fracture"
       },
       {
        "fr": "Une insuffisance cardiaque ou veineuse",
        "en": "Heart failure or venous insufficiency",
        "correct": true
       },
       {
        "fr": "Une infection cutanée localisée",
        "en": "A localized skin infection"
       },
       {
        "fr": "Une simple déshydratation",
        "en": "Simple dehydration"
       }
      ],
      "explFr": "L'œdème déclive (qui s'accumule en position debout/assise et diminue la nuit) associé à de la dyspnée évoque une insuffisance cardiaque ou un problème veineux. À documenter et signaler.",
      "explEn": "Dependent edema (which builds up while standing/sitting and decreases overnight) combined with dyspnea suggests heart failure or a venous problem. Document and report it."
     },
     {
      "fr": "Quelle glande régule le métabolisme du corps via les hormones T3 et T4 ?",
      "en": "Which gland regulates the body's metabolism via the hormones T3 and T4?",
      "choices": [
       {
        "fr": "L'hypophyse",
        "en": "The pituitary gland"
       },
       {
        "fr": "La thyroïde",
        "en": "The thyroid",
        "correct": true
       },
       {
        "fr": "Les glandes surrénales",
        "en": "The adrenal glands"
       },
       {
        "fr": "Le pancréas",
        "en": "The pancreas"
       }
      ],
      "explFr": "La thyroïde, située dans le cou, produit les hormones T3 et T4 qui régulent le métabolisme énergétique de l'ensemble du corps.",
      "explEn": "The thyroid, located in the neck, produces the hormones T3 and T4, which regulate the body's overall energy metabolism."
     },
     {
      "type": "tf",
      "fr": "Les poumons participent à la régulation de l'équilibre acido-basique du sang.",
      "en": "Les poumons participent à la régulation de l'équilibre acido-basique du sang.",
      "isTrue": true,
      "explFr": "Vrai. En ajustant la fréquence respiratoire, les poumons contrôlent le taux de CO₂ dans le sang, influençant directement le pH. C'est la compensation respiratoire.",
      "explEn": "Vrai. En ajustant la fréquence respiratoire, les poumons contrôlent le taux de CO₂ dans le sang, influençant directement le pH. C'est la compensation respiratoire."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Quel neurotransmetteur est principalement impliqué dans la régulation de l'humeur, du sommeil et de l'appétit ?",
      "en": "Quel neurotransmetteur est principalement impliqué dans la régulation de l'humeur, du sommeil et de l'appétit ?",
      "choices": [
       {
        "fr": "La dopamine",
        "en": "La dopamine"
       },
       {
        "fr": "La sérotonine",
        "en": "La sérotonine",
        "correct": true
       },
       {
        "fr": "L'acétylcholine",
        "en": "L'acétylcholine"
       },
       {
        "fr": "Le GABA",
        "en": "Le GABA"
       }
      ],
      "explFr": "La sérotonine joue un rôle clé dans la régulation de l'humeur, du sommeil, de l'appétit et de la douleur. Un déficit est associé à la dépression.",
      "explEn": "La sérotonine joue un rôle clé dans la régulation de l'humeur, du sommeil, de l'appétit et de la douleur. Un déficit est associé à la dépression."
     },
     {
      "type": "scenario",
      "fr": "Vous observez que Mme Gagné, 80 ans, présente une confusion soudaine, alors qu'elle était lucide ce matin. Elle n'a pas uriné depuis 10 heures.\n\nQuelle est votre priorité d'évaluation ?",
      "en": "Vous observez que Mme Gagné, 80 ans, présente une confusion soudaine, alors qu'elle était lucide ce matin. Elle n'a pas uriné depuis 10 heures.\n\nQuelle est votre priorité d'évaluation ?",
      "choices": [
       {
        "fr": "Lui demander si elle a bien dormi",
        "en": "Lui demander si elle a bien dormi"
       },
       {
        "fr": "Évaluer l'hydratation, prendre les SV complets et aviser immédiatement l'infirmière",
        "en": "Évaluer l'hydratation, prendre les SV complets et aviser immédiatement l'infirmière",
        "correct": true
       },
       {
        "fr": "Attendre de voir si la confusion passe après le repas",
        "en": "Attendre de voir si la confusion passe après le repas"
       },
       {
        "fr": "Lui donner un verre d'eau et réévaluer dans 2 heures",
        "en": "Lui donner un verre d'eau et réévaluer dans 2 heures"
       }
      ],
      "explFr": "Une confusion aiguë chez une personne âgée peut indiquer une rétention urinaire, une infection, une déshydratation ou un sepsis débutant. C'est un changement de condition à signaler immédiatement.",
      "explEn": "Une confusion aiguë chez une personne âgée peut indiquer une rétention urinaire, une infection, une déshydratation ou un sepsis débutant. C'est un changement de condition à signaler immédiatement."
     },
     {
      "fr": "Quelle est la différence entre une artère et une veine ?",
      "en": "Quelle est la différence entre une artère et une veine ?",
      "choices": [
       {
        "fr": "Les artères transportent toujours du sang oxygéné ; les veines, du sang désoxygéné",
        "en": "Les artères transportent toujours du sang oxygéné ; les veines, du sang désoxygéné"
       },
       {
        "fr": "Les artères s'éloignent du cœur ; les veines y retournent",
        "en": "Les artères s'éloignent du cœur ; les veines y retournent",
        "correct": true
       },
       {
        "fr": "Les veines ont des parois plus épaisses que les artères",
        "en": "Les veines ont des parois plus épaisses que les artères"
       },
       {
        "fr": "Les artères ont des valvules ; les veines n'en ont pas",
        "en": "Les artères ont des valvules ; les veines n'en ont pas"
       }
      ],
      "explFr": "Par définition, les artères partent du cœur et les veines y reviennent. L'artère pulmonaire transporte du sang pauvre en O₂ vers les poumons, ce qui prouve que ce n'est pas la teneur en O₂ qui définit artère ou veine.",
      "explEn": "Par définition, les artères partent du cœur et les veines y reviennent. L'artère pulmonaire transporte du sang pauvre en O₂ vers les poumons, ce qui prouve que ce n'est pas la teneur en O₂ qui définit artère ou veine."
     },
     {
      "fr": "Quelle hormone est sécrétée par les glandes surrénales lors d'une situation de stress aigu ?",
      "en": "Quelle hormone est sécrétée par les glandes surrénales lors d'une situation de stress aigu ?",
      "choices": [
       {
        "fr": "L'insuline",
        "en": "L'insuline"
       },
       {
        "fr": "L'adrénaline (épinéphrine)",
        "en": "L'adrénaline (épinéphrine)",
        "correct": true
       },
       {
        "fr": "L'ocytocine",
        "en": "L'ocytocine"
       },
       {
        "fr": "La progestérone",
        "en": "La progestérone"
       }
      ],
      "explFr": "Les glandes surrénales sécrètent l'adrénaline (épinéphrine) en réponse au stress, déclenchant la réaction 'combat ou fuite' : augmentation de la FC, de la TA et de la glycémie.",
      "explEn": "Les glandes surrénales sécrètent l'adrénaline (épinéphrine) en réponse au stress, déclenchant la réaction 'combat ou fuite' : augmentation de la FC, de la TA et de la glycémie."
     },
     {
      "type": "tf",
      "fr": "Le péritoine est la membrane qui tapisse la cavité abdominale et recouvre la plupart des organes abdominaux.",
      "en": "Le péritoine est la membrane qui tapisse la cavité abdominale et recouvre la plupart des organes abdominaux.",
      "isTrue": true,
      "explFr": "Vrai. Le péritoine est une membrane séreuse à deux feuillets qui tapisse la cavité abdominopelvienne et recouvre les organes. Une inflammation du péritoine s'appelle une péritonite — urgence chirurgicale.",
      "explEn": "Vrai. Le péritoine est une membrane séreuse à deux feuillets qui tapisse la cavité abdominopelvienne et recouvre les organes. Une inflammation du péritoine s'appelle une péritonite — urgence chirurgicale."
     },
     {
      "fr": "Quelle structure filtre la lymphe et fait partie des défenses immunitaires de l'organisme ?",
      "en": "Quelle structure filtre la lymphe et fait partie des défenses immunitaires de l'organisme ?",
      "choices": [
       {
        "fr": "Le foie",
        "en": "Le foie"
       },
       {
        "fr": "Le rein",
        "en": "Le rein"
       },
       {
        "fr": "Les ganglions lymphatiques",
        "en": "Les ganglions lymphatiques",
        "correct": true
       },
       {
        "fr": "La vésicule biliaire",
        "en": "La vésicule biliaire"
       }
      ],
      "explFr": "Les ganglions lymphatiques (ou nœuds lymphatiques) filtrent la lymphe et contiennent des cellules immunitaires. Leur gonflement indique souvent une infection ou une inflammation locale.",
      "explEn": "Les ganglions lymphatiques (ou nœuds lymphatiques) filtrent la lymphe et contiennent des cellules immunitaires. Leur gonflement indique souvent une infection ou une inflammation locale."
     },
     {
      "type": "scenario",
      "fr": "M. Côté, 55 ans, présente soudainement une déviation de la bouche, l'impossibilité de lever le bras droit et un discours inintelligible. Ces symptômes durent depuis 15 minutes.\n\nQuel problème soupçonnez-vous et que faites-vous ?",
      "en": "M. Côté, 55 ans, présente soudainement une déviation de la bouche, l'impossibilité de lever le bras droit et un discours inintelligible. Ces symptômes durent depuis 15 minutes.\n\nQuel problème soupçonnez-vous et que faites-vous ?",
      "choices": [
       {
        "fr": "Crise d'épilepsie partielle — surveiller et attendre la fin de la crise",
        "en": "Crise d'épilepsie partielle — surveiller et attendre la fin de la crise"
       },
       {
        "fr": "AVC ou AIT — aviser immédiatement l'infirmière, noter l'heure d'apparition, ne pas laisser seul",
        "en": "AVC ou AIT — aviser immédiatement l'infirmière, noter l'heure d'apparition, ne pas laisser seul",
        "correct": true
       },
       {
        "fr": "Malaise vagal — allonger le patient et prendre ses signes vitaux",
        "en": "Malaise vagal — allonger le patient et prendre ses signes vitaux"
       },
       {
        "fr": "Hypoglycémie sévère — lui donner du jus sucré immédiatement",
        "en": "Hypoglycémie sévère — lui donner du jus sucré immédiatement"
       }
      ],
      "explFr": "Les signes FAST (Face, Arm, Speech, Time) sont évocateurs d'un AVC. C'est une urgence neurologique : noter l'heure précise d'apparition et aviser immédiatement — la thrombolyse doit être administrée dans les 4,5 heures.",
      "explEn": "Les signes FAST (Face, Arm, Speech, Time) sont évocateurs d'un AVC. C'est une urgence neurologique : noter l'heure précise d'apparition et aviser immédiatement — la thrombolyse doit être administrée dans les 4,5 heures."
     },
     {
      "type": "tf",
      "fr": "La peau est considérée comme le plus grand organe du corps humain.",
      "en": "La peau est considérée comme le plus grand organe du corps humain.",
      "isTrue": true,
      "explFr": "Vrai. La peau d'un adulte couvre environ 1,7 à 2 m² et représente 15 à 20 % du poids corporel. Ses fonctions incluent la protection contre les infections, la thermorégulation, la perception sensorielle et la production de vitamine D.",
      "explEn": "Vrai. La peau d'un adulte couvre environ 1,7 à 2 m² et représente 15 à 20 % du poids corporel. Ses fonctions incluent la protection contre les infections, la thermorégulation, la perception sensorielle et la production de vitamine D."
     },
     {
      "fr": "Quelle est la fonction principale de l'intestin grêle ?",
      "en": "Quelle est la fonction principale de l'intestin grêle ?",
      "choices": [
       {
        "fr": "Absorber l'eau et compacter les selles",
        "en": "Absorber l'eau et compacter les selles"
       },
       {
        "fr": "Absorber la majorité des nutriments vers la circulation sanguine",
        "en": "Absorber la majorité des nutriments vers la circulation sanguine",
        "correct": true
       },
       {
        "fr": "Produire des enzymes digestives et stocker la bile",
        "en": "Produire des enzymes digestives et stocker la bile"
       },
       {
        "fr": "Filtrer les déchets du sang",
        "en": "Filtrer les déchets du sang"
       }
      ],
      "explFr": "L'intestin grêle (duodénum, jéjunum, iléon) est le principal site d'absorption des nutriments grâce à ses villosités. Le côlon, lui, absorbe surtout l'eau et les électrolytes.",
      "explEn": "L'intestin grêle (duodénum, jéjunum, iléon) est le principal site d'absorption des nutriments grâce à ses villosités. Le côlon, lui, absorbe surtout l'eau et les électrolytes."
     },
     {
      "fr": "Le ventricule droit du cœur pompe le sang vers :",
      "en": "Le ventricule droit du cœur pompe le sang vers :",
      "choices": [
       {
        "fr": "Tout le corps via l'aorte",
        "en": "Tout le corps via l'aorte"
       },
       {
        "fr": "Les poumons via l'artère pulmonaire",
        "en": "Les poumons via l'artère pulmonaire",
        "correct": true
       },
       {
        "fr": "Le cerveau en priorité via les carotides",
        "en": "Le cerveau en priorité via les carotides"
       },
       {
        "fr": "Les reins via les artères rénales",
        "en": "Les reins via les artères rénales"
       }
      ],
      "explFr": "Le ventricule droit propulse le sang désoxygéné vers les poumons (petite circulation). Le ventricule gauche envoie le sang oxygéné vers tout le corps via l'aorte.",
      "explEn": "Le ventricule droit propulse le sang désoxygéné vers les poumons (petite circulation). Le ventricule gauche envoie le sang oxygéné vers tout le corps via l'aorte."
     },
     {
      "fr": "Qu'est-ce que la thrombose veineuse profonde (TVP) ?",
      "en": "Qu'est-ce que la thrombose veineuse profonde (TVP) ?",
      "choices": [
       {
        "fr": "Une diminution du nombre de globules rouges dans les veines",
        "en": "Une diminution du nombre de globules rouges dans les veines"
       },
       {
        "fr": "La formation d'un caillot dans une veine profonde, surtout aux membres inférieurs",
        "en": "La formation d'un caillot dans une veine profonde, surtout aux membres inférieurs",
        "correct": true
       },
       {
        "fr": "Une inflammation de la paroi artérielle liée au cholestérol",
        "en": "Une inflammation de la paroi artérielle liée au cholestérol"
       },
       {
        "fr": "Un excès de plaquettes circulantes",
        "en": "Un excès de plaquettes circulantes"
       }
      ],
      "explFr": "Une TVP est un caillot dans une veine profonde (souvent le mollet). Elle peut se fragmenter et migrer vers les poumons (embolie pulmonaire), ce qui constitue une urgence vitale.",
      "explEn": "Une TVP est un caillot dans une veine profonde (souvent le mollet). Elle peut se fragmenter et migrer vers les poumons (embolie pulmonaire), ce qui constitue une urgence vitale."
     },
     {
      "fr": "Quel est le rôle principal des plaquettes sanguines ?",
      "en": "Quel est le rôle principal des plaquettes sanguines ?",
      "choices": [
       {
        "fr": "Transporter l'oxygène aux tissus",
        "en": "Transporter l'oxygène aux tissus"
       },
       {
        "fr": "Participer à la coagulation pour stopper les saignements",
        "en": "Participer à la coagulation pour stopper les saignements",
        "correct": true
       },
       {
        "fr": "Produire des anticorps contre les infections",
        "en": "Produire des anticorps contre les infections"
       },
       {
        "fr": "Réguler le pH sanguin",
        "en": "Réguler le pH sanguin"
       }
      ],
      "explFr": "Les thrombocytes s'agrègent au site d'une lésion vasculaire pour former un clou plaquettaire. Une thrombopénie (< 150 000/µL) augmente le risque de saignement.",
      "explEn": "Les thrombocytes s'agrègent au site d'une lésion vasculaire pour former un clou plaquettaire. Une thrombopénie (< 150 000/µL) augmente le risque de saignement."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Qu'est-ce que l'homéostasie ?",
      "en": "Qu'est-ce que l'homéostasie ?",
      "choices": [
       {
        "fr": "Le processus de vieillissement cellulaire progressif",
        "en": "Le processus de vieillissement cellulaire progressif"
       },
       {
        "fr": "La capacité du corps à maintenir un équilibre interne stable malgré les variations extérieures",
        "en": "La capacité du corps à maintenir un équilibre interne stable malgré les variations extérieures",
        "correct": true
       },
       {
        "fr": "L'arrêt progressif des fonctions vitales lors du sommeil",
        "en": "L'arrêt progressif des fonctions vitales lors du sommeil"
       },
       {
        "fr": "La capacité des cellules à se reproduire rapidement",
        "en": "La capacité des cellules à se reproduire rapidement"
       }
      ],
      "explFr": "L'homéostasie maintient les constantes vitales (température, glycémie, pH, PA) dans des plages étroites grâce à des mécanismes de rétroaction négative. Ex: glycémie trop haute → sécrétion d'insuline → baisse de la glycémie.",
      "explEn": "L'homéostasie maintient les constantes vitales (température, glycémie, pH, PA) dans des plages étroites grâce à des mécanismes de rétroaction négative. Ex: glycémie trop haute → sécrétion d'insuline → baisse de la glycémie."
     },
     {
      "fr": "La rate a pour fonction principale de :",
      "en": "La rate a pour fonction principale de :",
      "choices": [
       {
        "fr": "Produire l'insuline pour réguler la glycémie",
        "en": "Produire l'insuline pour réguler la glycémie"
       },
       {
        "fr": "Filtrer le sang et éliminer les vieux globules rouges",
        "en": "Filtrer le sang et éliminer les vieux globules rouges",
        "correct": true
       },
       {
        "fr": "Digérer les graisses alimentaires en collaboration avec le foie",
        "en": "Digérer les graisses alimentaires en collaboration avec le foie"
       },
       {
        "fr": "Produire les hormones sexuelles",
        "en": "Produire les hormones sexuelles"
       }
      ],
      "explFr": "La rate filtre le sang, détruit les érythrocytes vieillis, stocke des plaquettes et joue un rôle immunitaire. Après une splénectomie, le patient est plus vulnérable aux bactéries encapsulées.",
      "explEn": "La rate filtre le sang, détruit les érythrocytes vieillis, stocke des plaquettes et joue un rôle immunitaire. Après une splénectomie, le patient est plus vulnérable aux bactéries encapsulées."
     },
     {
      "fr": "Quelle est la différence entre l'uretère et l'urètre ?",
      "en": "Quelle est la différence entre l'uretère et l'urètre ?",
      "choices": [
       {
        "fr": "Les deux désignent le canal qui évacue l'urine de la vessie",
        "en": "Les deux désignent le canal qui évacue l'urine de la vessie"
       },
       {
        "fr": "L'uretère transporte l'urine du rein à la vessie ; l'urètre évacue l'urine vers l'extérieur",
        "en": "L'uretère transporte l'urine du rein à la vessie ; l'urètre évacue l'urine vers l'extérieur",
        "correct": true
       },
       {
        "fr": "L'urètre relie le rein à la vessie ; l'uretère est le conduit externe",
        "en": "L'urètre relie le rein à la vessie ; l'uretère est le conduit externe"
       },
       {
        "fr": "L'uretère est uniquement présent chez la femme",
        "en": "L'uretère est uniquement présent chez la femme"
       }
      ],
      "explFr": "Il y a deux uretères (un par rein). L'urètre est unique. L'urètre masculin mesure ~20 cm et traverse la prostate, d'où les complications urinaires fréquentes en cas d'HBP.",
      "explEn": "Il y a deux uretères (un par rein). L'urètre est unique. L'urètre masculin mesure ~20 cm et traverse la prostate, d'où les complications urinaires fréquentes en cas d'HBP."
     },
     {
      "fr": "Pourquoi un taux d'albumine très bas peut-il provoquer des œdèmes ?",
      "en": "Pourquoi un taux d'albumine très bas peut-il provoquer des œdèmes ?",
      "choices": [
       {
        "fr": "L'albumine augmente la pression artérielle, causant rétention d'eau",
        "en": "L'albumine augmente la pression artérielle, causant rétention d'eau"
       },
       {
        "fr": "L'albumine maintient la pression oncotique ; si elle baisse, l'eau quitte les vaisseaux vers les tissus",
        "en": "L'albumine maintient la pression oncotique ; si elle baisse, l'eau quitte les vaisseaux vers les tissus",
        "correct": true
       },
       {
        "fr": "L'albumine bloque le débit urinaire, causant une rétention liquidienne",
        "en": "L'albumine bloque le débit urinaire, causant une rétention liquidienne"
       },
       {
        "fr": "L'albumine stimule les reins à retenir le sodium",
        "en": "L'albumine stimule les reins à retenir le sodium"
       }
      ],
      "explFr": "L'albumine crée une pression oncotique qui retient l'eau dans les vaisseaux. Si elle diminue (dénutrition, hépatite, syndrome néphrotique) → le liquide diffuse vers les tissus → œdème.",
      "explEn": "L'albumine crée une pression oncotique qui retient l'eau dans les vaisseaux. Si elle diminue (dénutrition, hépatite, syndrome néphrotique) → le liquide diffuse vers les tissus → œdème."
     },
     {
      "fr": "Le système nerveux parasympathique (nerf vague) a quel effet principal sur le cœur ?",
      "en": "Le système nerveux parasympathique (nerf vague) a quel effet principal sur le cœur ?",
      "choices": [
       {
        "fr": "Il accélère la fréquence cardiaque via la noradrénaline",
        "en": "Il accélère la fréquence cardiaque via la noradrénaline"
       },
       {
        "fr": "Il ralentit la fréquence cardiaque via l'acétylcholine",
        "en": "Il ralentit la fréquence cardiaque via l'acétylcholine",
        "correct": true
       },
       {
        "fr": "Il augmente la contractilité sans modifier la fréquence",
        "en": "Il augmente la contractilité sans modifier la fréquence"
       },
       {
        "fr": "Il n'a aucun effet direct sur le cœur",
        "en": "Il n'a aucun effet direct sur le cœur"
       }
      ],
      "explFr": "Le nerf vague libère de l'acétylcholine qui ralentit le nœud sinusal. Le système sympathique, via l'adrénaline, l'accélère. Cette double régulation permet une adaptation fine de la fréquence cardiaque.",
      "explEn": "Le nerf vague libère de l'acétylcholine qui ralentit le nœud sinusal. Le système sympathique, via l'adrénaline, l'accélère. Cette double régulation permet une adaptation fine de la fréquence cardiaque."
     },
     {
      "type": "tf",
      "fr": "Le poumon droit possède 3 lobes et le poumon gauche n'en a que 2.",
      "en": "Le poumon droit possède 3 lobes et le poumon gauche n'en a que 2.",
      "isTrue": true,
      "explFr": "Vrai. Le poumon droit a 3 lobes (supérieur, moyen, inférieur). Le gauche n'en a que 2 pour laisser de la place au cœur. La lingula du lobe supérieur gauche correspond anatomiquement au lobe moyen droit.",
      "explEn": "Vrai. Le poumon droit a 3 lobes (supérieur, moyen, inférieur). Le gauche n'en a que 2 pour laisser de la place au cœur. La lingula du lobe supérieur gauche correspond anatomiquement au lobe moyen droit."
     },
     {
      "type": "tf",
      "fr": "Les neurones du système nerveux central se régénèrent facilement après une lésion.",
      "en": "Les neurones du système nerveux central se régénèrent facilement après une lésion.",
      "isTrue": false,
      "explFr": "Faux. Contrairement aux nerfs périphériques, les neurones du SNC ont une capacité de régénération très limitée. C'est pourquoi les lésions médullaires et les AVC causent souvent des séquelles permanentes.",
      "explEn": "Faux. Contrairement aux nerfs périphériques, les neurones du SNC ont une capacité de régénération très limitée. C'est pourquoi les lésions médullaires et les AVC causent souvent des séquelles permanentes."
     },
     {
      "type": "tf",
      "fr": "La pression artérielle est uniquement déterminée par la fréquence cardiaque.",
      "en": "La pression artérielle est uniquement déterminée par la fréquence cardiaque.",
      "isTrue": false,
      "explFr": "Faux. La PA dépend du débit cardiaque (FC × volume d'éjection systolique) ET de la résistance vasculaire périphérique. Les médicaments antihypertenseurs agissent sur l'un ou l'autre de ces mécanismes.",
      "explEn": "Faux. La PA dépend du débit cardiaque (FC × volume d'éjection systolique) ET de la résistance vasculaire périphérique. Les médicaments antihypertenseurs agissent sur l'un ou l'autre de ces mécanismes."
     },
     {
      "type": "scenario",
      "fr": "M. Côté, 67 ans, diabétique, présente des tremblements, une sudation et de l'agitation. Sa glycémie capillaire est de 2,6 mmol/L.\n\nQuelle est votre priorité immédiate ?",
      "en": "M. Côté, 67 ans, diabétique, présente des tremblements, une sudation et de l'agitation. Sa glycémie capillaire est de 2,6 mmol/L.\n\nQuelle est votre priorité immédiate ?",
      "choices": [
       {
        "fr": "Lui administrer son insuline habituelle pour stabiliser sa glycémie",
        "en": "Lui administrer son insuline habituelle pour stabiliser sa glycémie"
       },
       {
        "fr": "Aviser l'infirmière et lui donner 125 mL de jus d'orange s'il peut avaler",
        "en": "Aviser l'infirmière et lui donner 125 mL de jus d'orange s'il peut avaler",
        "correct": true
       },
       {
        "fr": "Prendre un deuxième glucomètre pour confirmer la mesure avant d'agir",
        "en": "Prendre un deuxième glucomètre pour confirmer la mesure avant d'agir"
       },
       {
        "fr": "L'allonger et prendre l'ensemble de ses signes vitaux d'abord",
        "en": "L'allonger et prendre l'ensemble de ses signes vitaux d'abord"
       }
      ],
      "explFr": "Glycémie < 4 mmol/L avec symptômes = hypoglycémie urgente. Si conscient et capable d'avaler → glucides rapides. Aviser l'infirmière. Réévaluer après 15 min. NE JAMAIS donner d'insuline lors d'une hypoglycémie.",
      "explEn": "Glycémie < 4 mmol/L avec symptômes = hypoglycémie urgente. Si conscient et capable d'avaler → glucides rapides. Aviser l'infirmière. Réévaluer après 15 min. NE JAMAIS donner d'insuline lors d'une hypoglycémie."
     },
     {
      "type": "scenario",
      "fr": "Mme Lavoie, 55 ans, présente une coloration jaune des yeux (ictère) et de la peau depuis 3 jours, sans douleur.\n\nQuel organe suspectez-vous et quelle est votre action ?",
      "en": "Mme Lavoie, 55 ans, présente une coloration jaune des yeux (ictère) et de la peau depuis 3 jours, sans douleur.\n\nQuel organe suspectez-vous et quelle est votre action ?",
      "choices": [
       {
        "fr": "Un problème cutané bénin — appliquer une crème et surveiller",
        "en": "Un problème cutané bénin — appliquer une crème et surveiller"
       },
       {
        "fr": "Une atteinte hépatique ou biliaire — documenter et aviser l'infirmière",
        "en": "Une atteinte hépatique ou biliaire — documenter et aviser l'infirmière",
        "correct": true
       },
       {
        "fr": "Une réaction allergique — noter et surveiller sans intervenir",
        "en": "Une réaction allergique — noter et surveiller sans intervenir"
       },
       {
        "fr": "Un problème rénal — surveiller la diurèse",
        "en": "Un problème rénal — surveiller la diurèse"
       }
      ],
      "explFr": "L'ictère indique une accumulation de bilirubine : atteinte hépatique (hépatite, cirrhose), obstruction biliaire (calcul, tumeur) ou hémolyse. Sans douleur = souvent obstructif. Toujours signaler à l'infirmière.",
      "explEn": "L'ictère indique une accumulation de bilirubine : atteinte hépatique (hépatite, cirrhose), obstruction biliaire (calcul, tumeur) ou hémolyse. Sans douleur = souvent obstructif. Toujours signaler à l'infirmière."
     }
    ]
   }
  ]
 },
 {
  "id": "signes_vitaux",
  "order": 2,
  "title_fr": "Signes Vitaux",
  "title_en": "Vital Signs",
  "icon": "🩺",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "La tension artérielle normale chez l'adulte est :",
      "en": "Normal blood pressure in adults is:",
      "choices": [
       {
        "fr": "80/50 mmHg",
        "en": "80/50 mmHg"
       },
       {
        "fr": "100/70 mmHg",
        "en": "100/70 mmHg"
       },
       {
        "fr": "120/80 mmHg",
        "en": "120/80 mmHg",
        "correct": true
       },
       {
        "fr": "150/100 mmHg",
        "en": "150/100 mmHg"
       }
      ],
      "explFr": "La valeur idéale est 120/80 mmHg. Hypertension : ≥ 140/90 ; hypotension : < 90/60 mmHg.",
      "explEn": "The ideal value is 120/80 mmHg. Hypertension: ≥ 140/90; hypotension: < 90/60 mmHg."
     },
     {
      "type": "tf",
      "fr": "Une fréquence cardiaque de 55 bpm au repos chez un adulte est une tachycardie.",
      "en": "A resting heart rate of 55 bpm in an adult is tachycardia.",
      "isTrue": false,
      "explFr": "Faux. 55 bpm est une bradycardie (< 60 bpm). La tachycardie se définit comme une FC > 100 bpm.",
      "explEn": "False. 55 bpm is bradycardia (< 60 bpm). Tachycardia is defined as a heart rate > 100 bpm."
     },
     {
      "fr": "Où prend-on le pouls radial ?",
      "en": "Where do you take the radial pulse?",
      "choices": [
       {
        "fr": "Sur la face interne du coude",
        "en": "On the inner side of the elbow"
       },
       {
        "fr": "Sur l'artère carotide au cou",
        "en": "On the carotid artery in the neck"
       },
       {
        "fr": "Sur la face interne du poignet côté pouce",
        "en": "On the inner wrist on the thumb side",
        "correct": true
       },
       {
        "fr": "Sur la tempe",
        "en": "On the temple"
       }
      ],
      "explFr": "Le pouls radial se prend sur l'artère radiale, face interne du poignet côté pouce, avec l'index et le majeur (jamais le pouce).",
      "explEn": "The radial pulse is taken at the radial artery, on the inner wrist on the thumb side, using the index and middle fingers (never the thumb)."
     },
     {
      "type": "scenario",
      "fr": "Vous prenez la température de M. Gagnon et obtenez 38,7 °C. Il se plaint de frissons et transpire.\n\nQuelle est votre priorité ?",
      "en": "You take Mr. Gagnon's temperature and get 38.7°C. He complains of chills and is sweating.\n\nWhat is your priority?",
      "choices": [
       {
        "fr": "Administrer le Tylenol PRN disponible et surveiller la température toutes les 30 minutes",
        "en": "Give him Tylenol without telling the nurse"
       },
       {
        "fr": "Aviser l'infirmière, noter les SV complets au dossier et réévaluer",
        "en": "Notify the nurse, record full vital signs in the chart, and reassess",
        "correct": true
       },
       {
        "fr": "Appliquer des compresses fraîches sur le front et augmenter son apport hydrique",
        "en": "Open the window and apply a cold compress"
       },
       {
        "fr": "Prendre une 2e température dans 30 minutes pour confirmer avant d'agir",
        "en": "Do nothing, this is normal after age 65"
       }
      ],
      "explFr": "La fièvre (> 38 °C) accompagnée de frissons suggère un processus infectieux. Notez tous les SV, avisez l'infirmière et attendez les directives avant tout traitement.",
      "explEn": "Fever (> 38°C) with chills suggests an infectious process. Record all vital signs, notify the nurse, and wait for instructions before any treatment."
     },
     {
      "type": "tf",
      "fr": "La douleur est considérée comme le 5e signe vital.",
      "en": "Pain is considered the 5th vital sign.",
      "isTrue": true,
      "explFr": "Vrai. L'évaluation systématique de la douleur à chaque prise de signes vitaux est une norme de soins au Québec depuis les années 2000.",
      "explEn": "True. Systematically assessing pain at every vital sign check has been a standard of care in Quebec since the 2000s."
     },
     {
      "fr": "Quels facteurs peuvent faire AUGMENTER la tension artérielle ? (Choisir le plus complet)",
      "en": "Which factors can INCREASE blood pressure? (Choose the most complete)",
      "choices": [
       {
        "fr": "Sommeil, jeûne, relaxation",
        "en": "Sleep, fasting, relaxation"
       },
       {
        "fr": "Stress, douleur, effort physique",
        "en": "Stress, pain, physical exertion",
        "correct": true
       },
       {
        "fr": "Repos, médication antihypertensive",
        "en": "Rest, antihypertensive medication"
       },
       {
        "fr": "Déshydratation légère seulement",
        "en": "Mild dehydration only"
       }
      ],
      "explFr": "Le stress, la douleur et l'effort physique activent le système nerveux sympathique, augmentant la fréquence cardiaque et la résistance vasculaire, donc la TA.",
      "explEn": "Stress, pain, and physical exertion activate the sympathetic nervous system, increasing heart rate and vascular resistance, and therefore blood pressure."
     },
     {
      "type": "scenario",
      "fr": "Vous évaluez Mme Roy, 45 ans, post-op jour 1. FC = 112 bpm, TA = 88/54 mmHg, FR = 24/min, T = 38,9 °C.\n\nQue soupçonnez-vous et que faites-vous EN PREMIER ?",
      "en": "You assess Mrs. Roy, 45, post-op day 1. HR = 112 bpm, BP = 88/54 mmHg, RR = 24/min, T = 38.9°C.\n\nWhat do you suspect, and what do you do FIRST?",
      "choices": [
       {
        "fr": "Réaction post-anesthésique attendue — administrer l'analgésique prescrit et continuer les soins",
        "en": "Normal post-op discomfort — continue care"
       },
       {
        "fr": "Choc septique potentiel — aviser l'infirmière immédiatement",
        "en": "Possible septic shock — notify the nurse immediately",
        "correct": true
       },
       {
        "fr": "Douleur post-opératoire mal contrôlée — évaluer la douleur et rassurer la patiente",
        "en": "Anxiety — reassure and reassess in 1 hour"
       },
       {
        "fr": "Hypovolémie légère — encourager la prise orale de liquides et surveiller",
        "en": "Dehydration — give water"
       }
      ],
      "explFr": "FC élevée + hypotension + tachypnée + fièvre = critères SIRS pouvant indiquer un sepsis. C'est une urgence médicale — aviser immédiatement et ne pas attendre.",
      "explEn": "Elevated HR + hypotension + tachypnea + fever = SIRS criteria that may indicate sepsis. This is a medical emergency — notify immediately and do not wait."
     },
     {
      "fr": "Quel site est privilégié pour mesurer la température chez un adulte conscient et coopératif ?",
      "en": "Which site is preferred for measuring temperature in a conscious, cooperative adult?",
      "choices": [
       {
        "fr": "Rectal",
        "en": "Rectal"
       },
       {
        "fr": "Buccal ou tympanique",
        "en": "Oral or tympanic",
        "correct": true
       },
       {
        "fr": "Toujours axillaire",
        "en": "Always axillary"
       },
       {
        "fr": "Frontal uniquement",
        "en": "Forehead only"
       }
      ],
      "explFr": "La voie buccale ou tympanique offre une bonne précision et est moins invasive. La voie rectale est réservée à des situations particulières.",
      "explEn": "The oral or tympanic route offers good accuracy and is less invasive. The rectal route is reserved for specific situations."
     },
     {
      "type": "tf",
      "fr": "Une SpO₂ de 90-92 % peut être normale pour certains patients atteints de maladie pulmonaire chronique (MPOC).",
      "en": "An SpO₂ of 90-92% can be normal for some patients with chronic obstructive pulmonary disease (COPD).",
      "isTrue": true,
      "explFr": "Vrai. Chez les personnes atteintes de MPOC sévère, une SpO₂ légèrement plus basse peut être leur valeur habituelle. Il faut connaître la valeur de base du patient et signaler tout changement.",
      "explEn": "True. In people with severe COPD, a slightly lower SpO₂ may be their baseline value. You need to know the patient's baseline and report any changes."
     },
     {
      "type": "scenario",
      "fr": "M. Plourde, 60 ans, se plaint soudainement d'une douleur thoracique oppressante irradiant au bras gauche, accompagnée de sueurs froides.\n\nQuelle est votre priorité immédiate ?",
      "en": "Mr. Plourde, 60, suddenly complains of crushing chest pain radiating to his left arm, accompanied by cold sweats.\n\nWhat is your immediate priority?",
      "choices": [
       {
        "fr": "Lui administrer son analgésique habituel et surveiller la douleur",
        "en": "Have him walk a bit to see if it passes"
       },
       {
        "fr": "Aviser immédiatement l'infirmière, garder le patient au repos et prendre les signes vitaux",
        "en": "Immediately notify the nurse, keep the patient at rest, and take vital signs",
        "correct": true
       },
       {
        "fr": "Lui suggérer de s'asseoir et de pratiquer des respirations profondes",
        "en": "Give him an over-the-counter painkiller"
       },
       {
        "fr": "Documenter la douleur et en informer l'infirmière lors de la prochaine tournée",
        "en": "Wait for the next round to mention it"
       }
      ],
      "explFr": "Douleur thoracique avec irradiation au bras et sueurs froides sont des signes classiques d'infarctus. C'est une urgence : repos strict, signes vitaux et alerte immédiate.",
      "explEn": "Chest pain radiating to the arm with cold sweats are classic signs of a heart attack. This is an emergency: strict rest, vital signs, and immediate alert."
     },
     {
      "fr": "Quelle est la fréquence cardiaque normale au repos chez l'adulte ?",
      "en": "What is the normal resting heart rate in adults?",
      "choices": [
       {
        "fr": "40 à 60 bpm",
        "en": "40 to 60 bpm"
       },
       {
        "fr": "60 à 100 bpm",
        "en": "60 to 100 bpm",
        "correct": true
       },
       {
        "fr": "100 à 120 bpm",
        "en": "100 to 120 bpm"
       },
       {
        "fr": "120 à 140 bpm",
        "en": "120 to 140 bpm"
       }
      ],
      "explFr": "La fréquence cardiaque normale au repos se situe entre 60 et 100 battements par minute chez l'adulte.",
      "explEn": "The normal resting heart rate in adults is between 60 and 100 beats per minute."
     },
     {
      "type": "tf",
      "fr": "La pression artérielle diastolique représente la pression dans les artères lorsque le cœur se contracte.",
      "en": "La pression artérielle diastolique représente la pression dans les artères lorsque le cœur se contracte.",
      "isTrue": false,
      "explFr": "Faux. La pression systolique (chiffre du haut) est mesurée lors de la contraction cardiaque. La diastolique (chiffre du bas) est mesurée lors du relâchement du cœur.",
      "explEn": "Faux. La pression systolique (chiffre du haut) est mesurée lors de la contraction cardiaque. La diastolique (chiffre du bas) est mesurée lors du relâchement du cœur."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Quel facteur NE modifie PAS la fréquence cardiaque ?",
      "en": "Quel facteur NE modifie PAS la fréquence cardiaque ?",
      "choices": [
       {
        "fr": "L'exercice physique",
        "en": "L'exercice physique"
       },
       {
        "fr": "La couleur des yeux",
        "en": "La couleur des yeux",
        "correct": true
       },
       {
        "fr": "La fièvre",
        "en": "La fièvre"
       },
       {
        "fr": "La douleur",
        "en": "La douleur"
       }
      ],
      "explFr": "La couleur des yeux est un caractère génétique sans lien avec la fréquence cardiaque. L'exercice, la fièvre et la douleur activent le système nerveux sympathique et augmentent la FC.",
      "explEn": "La couleur des yeux est un caractère génétique sans lien avec la fréquence cardiaque. L'exercice, la fièvre et la douleur activent le système nerveux sympathique et augmentent la FC."
     },
     {
      "type": "scenario",
      "fr": "Mme Bouchard, 55 ans, vous dit qu'elle se sent 'étourdie' depuis ce matin. Vous mesurez sa TA en position couchée : 130/85, puis debout : 95/60 mmHg.\n\nQuel phénomène cela indique-t-il ?",
      "en": "Mme Bouchard, 55 ans, vous dit qu'elle se sent 'étourdie' depuis ce matin. Vous mesurez sa TA en position couchée : 130/85, puis debout : 95/60 mmHg.\n\nQuel phénomène cela indique-t-il ?",
      "choices": [
       {
        "fr": "Une hypertension artérielle",
        "en": "Une hypertension artérielle"
       },
       {
        "fr": "Une hypotension orthostatique",
        "en": "Une hypotension orthostatique",
        "correct": true
       },
       {
        "fr": "Une bradycardie",
        "en": "Une bradycardie"
       },
       {
        "fr": "Une tachypnée",
        "en": "Une tachypnée"
       }
      ],
      "explFr": "L'hypotension orthostatique est une chute de TA ≥ 20 mmHg systolique en passant couché à debout. Elle cause étourdissements et risque de chute. Aviser l'infirmière et surveiller les déplacements.",
      "explEn": "L'hypotension orthostatique est une chute de TA ≥ 20 mmHg systolique en passant couché à debout. Elle cause étourdissements et risque de chute. Aviser l'infirmière et surveiller les déplacements."
     },
     {
      "fr": "Quelle est la méthode la plus précise pour mesurer la température corporelle centrale ?",
      "en": "Quelle est la méthode la plus précise pour mesurer la température corporelle centrale ?",
      "choices": [
       {
        "fr": "Axillaire",
        "en": "Axillaire"
       },
       {
        "fr": "Frontale",
        "en": "Frontale"
       },
       {
        "fr": "Tympanique",
        "en": "Tympanique"
       },
       {
        "fr": "Rectale",
        "en": "Rectale",
        "correct": true
       }
      ],
      "explFr": "La voie rectale donne la mesure la plus proche de la température centrale. Elle est utilisée lorsqu'une précision maximale est requise, notamment chez les patients en hypothermie ou hyperthermie sévère.",
      "explEn": "La voie rectale donne la mesure la plus proche de la température centrale. Elle est utilisée lorsqu'une précision maximale est requise, notamment chez les patients en hypothermie ou hyperthermie sévère."
     },
     {
      "fr": "Que signifie une SpO₂ de 93 % chez un patient adulte sans maladie pulmonaire connue ?",
      "en": "Que signifie une SpO₂ de 93 % chez un patient adulte sans maladie pulmonaire connue ?",
      "choices": [
       {
        "fr": "Valeur normale à surveiller sans intervention particulière",
        "en": "Valeur normale à surveiller sans intervention particulière"
       },
       {
        "fr": "Hypoxémie légère à modérée — aviser l'infirmière et augmenter la surveillance",
        "en": "Hypoxémie légère à modérée — aviser l'infirmière et augmenter la surveillance",
        "correct": true
       },
       {
        "fr": "Urgence critique nécessitant une intubation immédiate",
        "en": "Urgence critique nécessitant une intubation immédiate"
       },
       {
        "fr": "Valeur acceptable uniquement si le patient ne ressent pas de dyspnée",
        "en": "Valeur acceptable uniquement si le patient ne ressent pas de dyspnée"
       }
      ],
      "explFr": "Une SpO₂ entre 90 et 94 % chez un adulte sans MPOC indique une hypoxémie légère à modérée. Il faut aviser l'infirmière, positionner le patient et surveiller étroitement. En dessous de 90 % = urgence.",
      "explEn": "Une SpO₂ entre 90 et 94 % chez un adulte sans MPOC indique une hypoxémie légère à modérée. Il faut aviser l'infirmière, positionner le patient et surveiller étroitement. En dessous de 90 % = urgence."
     },
     {
      "type": "tf",
      "fr": "On peut prendre le pouls radial avec son propre pouce car il est le doigt le plus sensible.",
      "en": "On peut prendre le pouls radial avec son propre pouce car il est le doigt le plus sensible.",
      "isTrue": false,
      "explFr": "Faux. Il ne faut JAMAIS utiliser son pouce pour prendre un pouls, car le pouce possède sa propre artère pulsatile. On utilise l'index et le majeur pour ne pas confondre son propre pouls avec celui du patient.",
      "explEn": "Faux. Il ne faut JAMAIS utiliser son pouce pour prendre un pouls, car le pouce possède sa propre artère pulsatile. On utilise l'index et le majeur pour ne pas confondre son propre pouls avec celui du patient."
     },
     {
      "fr": "Qu'est-ce que la pression différentielle (pression de pouls) ?",
      "en": "Qu'est-ce que la pression différentielle (pression de pouls) ?",
      "choices": [
       {
        "fr": "La différence entre la fréquence cardiaque et la fréquence respiratoire",
        "en": "La différence entre la fréquence cardiaque et la fréquence respiratoire"
       },
       {
        "fr": "La différence entre la pression systolique et la pression diastolique",
        "en": "La différence entre la pression systolique et la pression diastolique",
        "correct": true
       },
       {
        "fr": "La différence de tension artérielle entre les deux bras",
        "en": "La différence de tension artérielle entre les deux bras"
       },
       {
        "fr": "La pression exercée dans les capillaires lors de la microcirculation",
        "en": "La pression exercée dans les capillaires lors de la microcirculation"
       }
      ],
      "explFr": "La pression différentielle = systolique – diastolique (normale ≈ 40 mmHg). Une pression différentielle étroite (< 25 mmHg) peut indiquer une défaillance cardiaque ; une trop large (> 60 mmHg) peut évoquer une insuffisance aortique.",
      "explEn": "La pression différentielle = systolique – diastolique (normale ≈ 40 mmHg). Une pression différentielle étroite (< 25 mmHg) peut indiquer une défaillance cardiaque ; une trop large (> 60 mmHg) peut évoquer une insuffisance aortique."
     },
     {
      "type": "scenario",
      "fr": "M. Tremblay vient de recevoir de la morphine IV. Vingt minutes plus tard, vous le trouvez difficile à éveiller et sa fréquence respiratoire est de 8/min.\n\nQue faites-vous immédiatement ?",
      "en": "M. Tremblay vient de recevoir de la morphine IV. Vingt minutes plus tard, vous le trouvez difficile à éveiller et sa fréquence respiratoire est de 8/min.\n\nQue faites-vous immédiatement ?",
      "choices": [
       {
        "fr": "Documenter et surveiller lors de la prochaine tournée",
        "en": "Documenter et surveiller lors de la prochaine tournée"
       },
       {
        "fr": "Aviser l'infirmière IMMÉDIATEMENT — signes de dépression respiratoire aux opioïdes",
        "en": "Aviser l'infirmière IMMÉDIATEMENT — signes de dépression respiratoire aux opioïdes",
        "correct": true
       },
       {
        "fr": "Prendre la tension artérielle et réévaluer dans 15 minutes",
        "en": "Prendre la tension artérielle et réévaluer dans 15 minutes"
       },
       {
        "fr": "Stimuler le patient verbalement et lui donner un verre d'eau",
        "en": "Stimuler le patient verbalement et lui donner un verre d'eau"
       }
      ],
      "explFr": "FR < 12/min + somnolence profonde après opioïde = dépression respiratoire. C'est une urgence : aviser immédiatement. La naloxone (Narcan) est l'antidote. Ne jamais attendre ni réévaluer plus tard.",
      "explEn": "FR < 12/min + somnolence profonde après opioïde = dépression respiratoire. C'est une urgence : aviser immédiatement. La naloxone (Narcan) est l'antidote. Ne jamais attendre ni réévaluer plus tard."
     },
     {
      "fr": "Pourquoi ne faut-il pas placer le brassard tensionnel sur un bras portant une perfusion intraveineuse ?",
      "en": "Pourquoi ne faut-il pas placer le brassard tensionnel sur un bras portant une perfusion intraveineuse ?",
      "choices": [
       {
        "fr": "Pour éviter de souiller le pansement de la perfusion",
        "en": "Pour éviter de souiller le pansement de la perfusion"
       },
       {
        "fr": "Car la compression peut interrompre le débit IV et fausser la valeur mesurée",
        "en": "Car la compression peut interrompre le débit IV et fausser la valeur mesurée",
        "correct": true
       },
       {
        "fr": "Par simple convention sans conséquence clinique",
        "en": "Par simple convention sans conséquence clinique"
       },
       {
        "fr": "Pour le confort du patient uniquement",
        "en": "Pour le confort du patient uniquement"
       }
      ],
      "explFr": "La compression interrompt temporairement le débit IV, ce qui peut obstruer la perfusion, provoquer une inflammation ou fausser la mesure. Utiliser toujours le bras opposé, ou le membre inférieur si les deux bras sont inaccessibles.",
      "explEn": "La compression interrompt temporairement le débit IV, ce qui peut obstruer la perfusion, provoquer une inflammation ou fausser la mesure. Utiliser toujours le bras opposé, ou le membre inférieur si les deux bras sont inaccessibles."
     },
     {
      "fr": "Qu'est-ce que la respiration de Kussmaul ?",
      "en": "Qu'est-ce que la respiration de Kussmaul ?",
      "choices": [
       {
        "fr": "Respiration superficielle et rapide liée à l'anxiété",
        "en": "Respiration superficielle et rapide liée à l'anxiété"
       },
       {
        "fr": "Respirations profondes, régulières et rapides compensant une acidose métabolique sévère",
        "en": "Respirations profondes, régulières et rapides compensant une acidose métabolique sévère",
        "correct": true
       },
       {
        "fr": "Alternance de périodes d'apnée et d'hyperventilation",
        "en": "Alternance de périodes d'apnée et d'hyperventilation"
       },
       {
        "fr": "Respiration lente et irrégulière associée aux lésions cérébrales",
        "en": "Respiration lente et irrégulière associée aux lésions cérébrales"
       }
      ],
      "explFr": "La respiration de Kussmaul compense une acidose métabolique (ex. acidocétose diabétique) en éliminant le CO₂. Elle est profonde et régulière, à distinguer de la respiration de Cheyne-Stokes (irrégulière avec apnées).",
      "explEn": "La respiration de Kussmaul compense une acidose métabolique (ex. acidocétose diabétique) en éliminant le CO₂. Elle est profonde et régulière, à distinguer de la respiration de Cheyne-Stokes (irrégulière avec apnées)."
     },
     {
      "fr": "Comment prend-on correctement la tension artérielle avec un sphygmomanomètre anéroïde ?",
      "en": "Comment prend-on correctement la tension artérielle avec un sphygmomanomètre anéroïde ?",
      "choices": [
       {
        "fr": "Gonfler à 200 mmHg et dégonfler rapidement en 5 secondes",
        "en": "Gonfler à 200 mmHg et dégonfler rapidement en 5 secondes"
       },
       {
        "fr": "Gonfler 20-30 mmHg au-dessus de la disparition du pouls radial, dégonfler lentement à 2-3 mmHg/sec",
        "en": "Gonfler 20-30 mmHg au-dessus de la disparition du pouls radial, dégonfler lentement à 2-3 mmHg/sec",
        "correct": true
       },
       {
        "fr": "Gonfler à 120 mmHg et écouter jusqu'à disparition des bruits",
        "en": "Gonfler à 120 mmHg et écouter jusqu'à disparition des bruits"
       },
       {
        "fr": "Gonfler jusqu'à ce que le patient signale une douleur",
        "en": "Gonfler jusqu'à ce que le patient signale une douleur"
       }
      ],
      "explFr": "On gonfle 20-30 mmHg au-dessus de l'estimation (pouls radial disparaît), puis on dégonfle lentement. 1er bruit de Korotkoff = systolique, disparition = diastolique.",
      "explEn": "On gonfle 20-30 mmHg au-dessus de l'estimation (pouls radial disparaît), puis on dégonfle lentement. 1er bruit de Korotkoff = systolique, disparition = diastolique."
     },
     {
      "fr": "Le site tympanique est contre-indiqué pour mesurer la température après une chirurgie de l'oreille car :",
      "en": "Le site tympanique est contre-indiqué pour mesurer la température après une chirurgie de l'oreille car :",
      "choices": [
       {
        "fr": "La chaleur de l'oreille opérée altère le capteur du thermomètre",
        "en": "La chaleur de l'oreille opérée altère le capteur du thermomètre"
       },
       {
        "fr": "Un conduit altéré fausse la mesure et risque de blesser la zone opérée",
        "en": "Un conduit altéré fausse la mesure et risque de blesser la zone opérée",
        "correct": true
       },
       {
        "fr": "Cette voie n'est jamais fiable quelle que soit la situation",
        "en": "Cette voie n'est jamais fiable quelle que soit la situation"
       },
       {
        "fr": "La température tympanique est toujours plus basse après une chirurgie",
        "en": "La température tympanique est toujours plus basse après une chirurgie"
       }
      ],
      "explFr": "Après une chirurgie, otite ou présence de cérumen obstructif, la voie tympanique donne une valeur incorrecte et peut traumatiser la zone opérée. On choisit une voie alternative (axillaire, frontale).",
      "explEn": "Après une chirurgie, otite ou présence de cérumen obstructif, la voie tympanique donne une valeur incorrecte et peut traumatiser la zone opérée. On choisit une voie alternative (axillaire, frontale)."
     },
     {
      "fr": "Qu'est-ce que le pouls apical et quand est-il utilisé ?",
      "en": "Qu'est-ce que le pouls apical et quand est-il utilisé ?",
      "choices": [
       {
        "fr": "Pouls palpé à l'artère fémorale en cas de choc",
        "en": "Pouls palpé à l'artère fémorale en cas de choc"
       },
       {
        "fr": "FC mesurée par auscultation directe au cœur (apex), utilisée quand le pouls périphérique est difficile à évaluer",
        "en": "FC mesurée par auscultation directe au cœur (apex), utilisée quand le pouls périphérique est difficile à évaluer",
        "correct": true
       },
       {
        "fr": "Pouls de la carotide, référence chez les patients âgés",
        "en": "Pouls de la carotide, référence chez les patients âgés"
       },
       {
        "fr": "Mesure du pouls à l'artère brachiale sous le brassard tensionnel",
        "en": "Mesure du pouls à l'artère brachiale sous le brassard tensionnel"
       }
      ],
      "explFr": "Le pouls apical s'ausculte au 5e espace intercostal gauche sur la ligne médio-claviculaire. Il est utilisé chez les nourrissons, en cas d'arythmie, de choc ou de pouls périphérique faible/irrégulier.",
      "explEn": "Le pouls apical s'ausculte au 5e espace intercostal gauche sur la ligne médio-claviculaire. Il est utilisé chez les nourrissons, en cas d'arythmie, de choc ou de pouls périphérique faible/irrégulier."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Chez un nourrisson de 6 mois, quelle est la fréquence respiratoire normale ?",
      "en": "Chez un nourrisson de 6 mois, quelle est la fréquence respiratoire normale ?",
      "choices": [
       {
        "fr": "12 à 20 /min (comme l'adulte)",
        "en": "12 à 20 /min (comme l'adulte)"
       },
       {
        "fr": "20 à 30 /min",
        "en": "20 à 30 /min"
       },
       {
        "fr": "30 à 60 /min",
        "en": "30 à 60 /min",
        "correct": true
       },
       {
        "fr": "60 à 80 /min",
        "en": "60 à 80 /min"
       }
      ],
      "explFr": "La FR normale du nourrisson (0-12 mois) est de 30 à 60/min. Les normes varient selon l'âge : enfant (20-30/min), adolescent (12-20/min), adulte (12-20/min). Appliquer les valeurs adultes à un nourrisson est une erreur.",
      "explEn": "La FR normale du nourrisson (0-12 mois) est de 30 à 60/min. Les normes varient selon l'âge : enfant (20-30/min), adolescent (12-20/min), adulte (12-20/min). Appliquer les valeurs adultes à un nourrisson est une erreur."
     },
     {
      "fr": "Qu'est-ce que la bradycardie et quelles en sont les causes fréquentes ?",
      "en": "Qu'est-ce que la bradycardie et quelles en sont les causes fréquentes ?",
      "choices": [
       {
        "fr": "FC > 100 bpm, causée par la fièvre ou la douleur",
        "en": "FC > 100 bpm, causée par la fièvre ou la douleur"
       },
       {
        "fr": "FC < 60 bpm, causée par des médicaments (bêtabloquants), une hypothyroïdie ou une atteinte cardiaque",
        "en": "FC < 60 bpm, causée par des médicaments (bêtabloquants), une hypothyroïdie ou une atteinte cardiaque",
        "correct": true
       },
       {
        "fr": "FC irrégulière causée exclusivement par la fibrillation auriculaire",
        "en": "FC irrégulière causée exclusivement par la fibrillation auriculaire"
       },
       {
        "fr": "FC > 80 bpm, signe de déshydratation sévère",
        "en": "FC > 80 bpm, signe de déshydratation sévère"
       }
      ],
      "explFr": "La bradycardie (< 60 bpm) peut être physiologique (athlètes) ou pathologique. Causes : bêtabloquants, digoxine, hypothyroïdie, syndrome sinusal, bloc AV. Symptômes : étourdissements, syncope, fatigue. À signaler.",
      "explEn": "La bradycardie (< 60 bpm) peut être physiologique (athlètes) ou pathologique. Causes : bêtabloquants, digoxine, hypothyroïdie, syndrome sinusal, bloc AV. Symptômes : étourdissements, syncope, fatigue. À signaler."
     },
     {
      "fr": "Après l'administration de furosémide (Lasix) IV, quelle surveillance est prioritaire ?",
      "en": "Après l'administration de furosémide (Lasix) IV, quelle surveillance est prioritaire ?",
      "choices": [
       {
        "fr": "Fréquence cardiaque toutes les 5 minutes",
        "en": "Fréquence cardiaque toutes les 5 minutes"
       },
       {
        "fr": "Diurèse horaire, TA et signes d'hypokaliémie (crampes, faiblesse musculaire)",
        "en": "Diurèse horaire, TA et signes d'hypokaliémie (crampes, faiblesse musculaire)",
        "correct": true
       },
       {
        "fr": "Température toutes les 30 minutes",
        "en": "Température toutes les 30 minutes"
       },
       {
        "fr": "Fréquence respiratoire uniquement",
        "en": "Fréquence respiratoire uniquement"
       }
      ],
      "explFr": "Le furosémide est un diurétique puissant. Surveillance : diurèse (efficacité), PA (risque d'hypotension) et surtout potassium — l'hypokaliémie peut déclencher des arythmies.",
      "explEn": "Le furosémide est un diurétique puissant. Surveillance : diurèse (efficacité), PA (risque d'hypotension) et surtout potassium — l'hypokaliémie peut déclencher des arythmies."
     },
     {
      "fr": "Lequel de ces facteurs FAUSSE une mesure de SpO₂ à l'oxymètre de pouls ?",
      "en": "Lequel de ces facteurs FAUSSE une mesure de SpO₂ à l'oxymètre de pouls ?",
      "choices": [
       {
        "fr": "Un pouls régulier à 72 bpm",
        "en": "Un pouls régulier à 72 bpm"
       },
       {
        "fr": "Des ongles vernis foncés ou des extrémités froides et hypoperfusées",
        "en": "Des ongles vernis foncés ou des extrémités froides et hypoperfusées",
        "correct": true
       },
       {
        "fr": "Une fréquence respiratoire normale",
        "en": "Une fréquence respiratoire normale"
       },
       {
        "fr": "Une pression artérielle systolique de 120 mmHg",
        "en": "Une pression artérielle systolique de 120 mmHg"
       }
      ],
      "explFr": "Les ongles vernis sombres absorbent certaines longueurs d'onde et faussent la lecture. Les extrémités froides (vasoconstriction) réduisent le signal. Les mouvements, l'anémie sévère et l'intoxication au CO peuvent aussi altérer la mesure.",
      "explEn": "Les ongles vernis sombres absorbent certaines longueurs d'onde et faussent la lecture. Les extrémités froides (vasoconstriction) réduisent le signal. Les mouvements, l'anémie sévère et l'intoxication au CO peuvent aussi altérer la mesure."
     },
     {
      "type": "tf",
      "fr": "On ne doit jamais mesurer la tension artérielle sur un bras portant une perfusion intraveineuse.",
      "en": "On ne doit jamais mesurer la tension artérielle sur un bras portant une perfusion intraveineuse.",
      "isTrue": true,
      "explFr": "Vrai. La compression peut interrompre le débit IV, créer une infiltration ou fausser la mesure. On utilise le bras controlatéral ou, si les deux bras sont inaccessibles, un membre inférieur.",
      "explEn": "Vrai. La compression peut interrompre le débit IV, créer une infiltration ou fausser la mesure. On utilise le bras controlatéral ou, si les deux bras sont inaccessibles, un membre inférieur."
     },
     {
      "type": "tf",
      "fr": "Une fréquence cardiaque de 48 bpm au repos chez un marathonien entraîné est nécessairement pathologique.",
      "en": "Une fréquence cardiaque de 48 bpm au repos chez un marathonien entraîné est nécessairement pathologique.",
      "isTrue": false,
      "explFr": "Faux. Une bradycardie (< 60 bpm) peut être physiologique chez les athlètes d'endurance. Le cœur entraîné pompe plus de volume à chaque battement. Il faut toujours tenir compte du contexte clinique et des symptômes.",
      "explEn": "Faux. Une bradycardie (< 60 bpm) peut être physiologique chez les athlètes d'endurance. Le cœur entraîné pompe plus de volume à chaque battement. Il faut toujours tenir compte du contexte clinique et des symptômes."
     },
     {
      "type": "tf",
      "fr": "La pression différentielle (systolique – diastolique) est normalement d'environ 40 mmHg.",
      "en": "La pression différentielle (systolique – diastolique) est normalement d'environ 40 mmHg.",
      "isTrue": true,
      "explFr": "Vrai. Pour 120/80 mmHg, la pression différentielle = 40 mmHg. PP étroite (< 25 mmHg) → choc ou tamponnade possible. PP élargie (> 60 mmHg) → insuffisance aortique ou athérosclérose.",
      "explEn": "Vrai. Pour 120/80 mmHg, la pression différentielle = 40 mmHg. PP étroite (< 25 mmHg) → choc ou tamponnade possible. PP élargie (> 60 mmHg) → insuffisance aortique ou athérosclérose."
     },
     {
      "type": "scenario",
      "fr": "Mme Bouchard, 58 ans, revient d'une marche dans le corridor. Vous prenez ses SV : FC = 108, TA = 148/92, FR = 22, T = 37,1 °C. Elle se sent bien.\n\nQuelle est l'interprétation la plus appropriée ?",
      "en": "Mme Bouchard, 58 ans, revient d'une marche dans le corridor. Vous prenez ses SV : FC = 108, TA = 148/92, FR = 22, T = 37,1 °C. Elle se sent bien.\n\nQuelle est l'interprétation la plus appropriée ?",
      "choices": [
       {
        "fr": "Tous les signes sont anormaux et nécessitent un signalement immédiat",
        "en": "Tous les signes sont anormaux et nécessitent un signalement immédiat"
       },
       {
        "fr": "Ces valeurs sont attendues juste après un effort physique — réévaluer au repos dans 10-15 minutes",
        "en": "Ces valeurs sont attendues juste après un effort physique — réévaluer au repos dans 10-15 minutes",
        "correct": true
       },
       {
        "fr": "La tachycardie seule est préoccupante et doit être signalée immédiatement",
        "en": "La tachycardie seule est préoccupante et doit être signalée immédiatement"
       },
       {
        "fr": "La tension artérielle est dangereusement haute et nécessite une intervention urgente",
        "en": "La tension artérielle est dangereusement haute et nécessite une intervention urgente"
       }
      ],
      "explFr": "L'effort augmente normalement la FC, la TA et la FR. Ces valeurs sont transitoires. Il faut réévaluer les SV après 10-15 minutes de repos pour avoir des valeurs cliniquement significatives.",
      "explEn": "L'effort augmente normalement la FC, la TA et la FR. Ces valeurs sont transitoires. Il faut réévaluer les SV après 10-15 minutes de repos pour avoir des valeurs cliniquement significatives."
     },
     {
      "type": "scenario",
      "fr": "M. Gaudreau, 75 ans, reçoit de l'aténolol (bêtabloquant). Avant l'administration, vous prenez son pouls à 48 bpm. Il est asymptomatique.\n\nQue faites-vous ?",
      "en": "M. Gaudreau, 75 ans, reçoit de l'aténolol (bêtabloquant). Avant l'administration, vous prenez son pouls à 48 bpm. Il est asymptomatique.\n\nQue faites-vous ?",
      "choices": [
       {
        "fr": "Administrer le médicament — la bradycardie est attendue avec ce médicament",
        "en": "Administrer le médicament — la bradycardie est attendue avec ce médicament"
       },
       {
        "fr": "Retenir la dose et aviser l'infirmière — la FC est trop basse selon les paramètres habituels",
        "en": "Retenir la dose et aviser l'infirmière — la FC est trop basse selon les paramètres habituels",
        "correct": true
       },
       {
        "fr": "Prendre un pouls apical pour confirmer et administrer si identique",
        "en": "Prendre un pouls apical pour confirmer et administrer si identique"
       },
       {
        "fr": "Retarder la dose de 2 heures et reprendre la mesure",
        "en": "Retarder la dose de 2 heures et reprendre la mesure"
       }
      ],
      "explFr": "Les bêtabloquants abaissent la FC. Une FC < 50-60 bpm est généralement un critère de retenue. Ne jamais administrer sans aviser l'infirmière qui consultera les paramètres prescrits.",
      "explEn": "Les bêtabloquants abaissent la FC. Une FC < 50-60 bpm est généralement un critère de retenue. Ne jamais administrer sans aviser l'infirmière qui consultera les paramètres prescrits."
     },
     {
      "fr": "Quelle est la valeur normale de la saturation en O₂ (SpO₂) pour un adulte sain ?",
      "en": "Quelle est la valeur normale de la saturation en O₂ (SpO₂) pour un adulte sain ?",
      "choices": [
       {
        "fr": "80 à 89 %",
        "en": "80 à 89 %"
       },
       {
        "fr": "90 à 94 %",
        "en": "90 à 94 %"
       },
       {
        "fr": "95 à 100 %",
        "en": "95 à 100 %",
        "correct": true
       },
       {
        "fr": "100 % uniquement",
        "en": "100 % uniquement"
       }
      ],
      "explFr": "La SpO₂ normale se situe entre 95 et 100 %. Une valeur entre 90 et 94 % indique une hypoxémie légère à modérée à surveiller de près. En dessous de 90 % = urgence respiratoire.",
      "explEn": "La SpO₂ normale se situe entre 95 et 100 %. Une valeur entre 90 et 94 % indique une hypoxémie légère à modérée à surveiller de près. En dessous de 90 % = urgence respiratoire."
     }
    ]
   }
  ]
 },
 {
  "id": "medicaments",
  "order": 3,
  "title_fr": "Médicaments",
  "title_en": "Medications",
  "icon": "💊",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Que signifie la mention 'PRN' sur une ordonnance ?",
      "en": "What does 'PRN' mean on a prescription?",
      "choices": [
       {
        "fr": "À prendre régulièrement, de façon préventive et continue",
        "en": "Prescription normally recommended"
       },
       {
        "fr": "Au besoin, selon l'évaluation des symptômes à chaque prise",
        "en": "Pro re nata: as needed based on symptoms",
        "correct": true
       },
       {
        "fr": "À administrer la nuit uniquement, selon le protocole",
        "en": "Take regularly at night"
       },
       {
        "fr": "À renouveler automatiquement sans réévaluation médicale",
        "en": "Prescription normally renewable"
       }
      ],
      "explFr": "PRN (Pro re nata, latin) = au besoin. Le soignant doit évaluer les symptômes avant chaque administration et documenter la raison.",
      "explEn": "PRN (Pro re nata, Latin) = as needed. The caregiver must assess symptoms before each administration and document the reason."
     },
     {
      "type": "tf",
      "fr": "Il est toujours sécuritaire d'écraser un comprimé pour faciliter la déglutition.",
      "en": "It is always safe to crush a tablet to make swallowing easier.",
      "isTrue": false,
      "explFr": "Faux. Les comprimés à enrobage entérique, à libération prolongée (LP, XR, SR) ou sublinguaux ne doivent JAMAIS être écrasés. Toujours vérifier avec la pharmacie.",
      "explEn": "False. Enteric-coated, extended-release (ER, XR, SR), or sublingual tablets must NEVER be crushed. Always check with the pharmacy."
     },
     {
      "fr": "Formule de calcul d'une dose médicamenteuse :",
      "en": "Formula for calculating a medication dose:",
      "choices": [
       {
        "fr": "Dose voulue × Concentration",
        "en": "Desired dose × Concentration"
       },
       {
        "fr": "Dose voulue ÷ Concentration disponible × Volume",
        "en": "Desired dose ÷ Available concentration × Volume",
        "correct": true
       },
       {
        "fr": "Concentration × Volume ÷ Temps",
        "en": "Concentration × Volume ÷ Time"
       },
       {
        "fr": "Dose × Poids ÷ 100",
        "en": "Dose × Weight ÷ 100"
       }
      ],
      "explFr": "D/H × V : (Dose voulue ÷ Dose disponible) × Volume disponible. Ex : 250 mg voulus / 500 mg dans 5 mL = 2,5 mL à donner.",
      "explEn": "D/H × V: (Desired dose ÷ Dose on hand) × Volume on hand. Ex: 250 mg desired / 500 mg in 5 mL = 2.5 mL to give."
     },
     {
      "type": "scenario",
      "fr": "M. Bernard, 78 ans, refuse catégoriquement de prendre sa médication pour la pression. Il dit : 'Je me sens bien, c'est inutile.'\n\nQuelle est la bonne approche ?",
      "en": "Mr. Bernard, 78, categorically refuses to take his blood pressure medication. He says: 'I feel fine, it's not necessary.'\n\nWhat is the correct approach?",
      "choices": [
       {
        "fr": "Lui expliquer les bienfaits du médicament et réessayer dans 30 minutes sans aviser personne",
        "en": "Force him to take the medication"
       },
       {
        "fr": "Aviser l'infirmière pour qu'elle contacte le médecin et modifie l'ordonnance",
        "en": "Crush the medication into his food without telling him"
       },
       {
        "fr": "Respecter son refus, l'informer des risques, aviser l'infirmière et documenter",
        "en": "Respect his refusal, inform him of the risks, notify the nurse, and document",
        "correct": true
       },
       {
        "fr": "Lui proposer de reporter la dose au repas suivant et ne rien noter pour éviter un rapport",
        "en": "Ignore the refusal and reassess the next day"
       }
      ],
      "explFr": "Le refus de traitement est un droit légal du patient. Le soignant doit respecter ce droit, informer sur les conséquences, aviser l'équipe et documenter au dossier.",
      "explEn": "Refusal of treatment is a patient's legal right. The caregiver must respect this right, inform the patient of the consequences, notify the team, and document it in the chart."
     },
     {
      "type": "tf",
      "fr": "En cas d'allergie connue à la pénicilline, on peut administrer de l'amoxicilline sans risque.",
      "en": "If a patient has a known penicillin allergy, amoxicillin can be safely given.",
      "isTrue": false,
      "explFr": "Faux. L'amoxicilline est une pénicilline. Une allergie à la pénicilline est une contre-indication. Aviser le médecin et documenter l'allergie clairement.",
      "explEn": "False. Amoxicillin is a penicillin. A penicillin allergy is a contraindication. Notify the physician and clearly document the allergy."
     },
     {
      "fr": "Que faire EN PREMIER si vous réalisez avoir fait une erreur médicamenteuse ?",
      "en": "What should you do FIRST if you realize you made a medication error?",
      "choices": [
       {
        "fr": "Surveiller attentivement le patient et le signaler en fin de quart si des symptômes apparaissent",
        "en": "Say nothing to avoid problems"
       },
       {
        "fr": "Aviser l'infirmière immédiatement, surveiller le patient et documenter l'incident",
        "en": "Notify the nurse immediately, monitor the patient, and document in an incident report",
        "correct": true
       },
       {
        "fr": "Attendre de voir si le patient développe des symptômes avant d'intervenir",
        "en": "Wait to see if the patient develops symptoms"
       },
       {
        "fr": "Contacter directement le médecin traitant sans passer par l'infirmière responsable",
        "en": "Contact the doctor directly without telling the nurse"
       }
      ],
      "explFr": "La déclaration immédiate à l'infirmière responsable est obligatoire. Elle permet d'agir rapidement, de surveiller le patient et de remplir le rapport d'incident/accident (AH-223).",
      "explEn": "Immediately reporting to the responsible nurse is mandatory. This allows for prompt action, patient monitoring, and completion of the incident/accident report."
     },
     {
      "type": "scenario",
      "fr": "Vous devez administrer 0,6 mg d'atropine IV. La fiole contient 1 mg/mL.\n\nQuel volume devez-vous prélever ?",
      "en": "You need to administer 0.6 mg of atropine IV. The vial contains 1 mg/mL.\n\nWhat volume should you draw up?",
      "choices": [
       {
        "fr": "0,3 mL",
        "en": "0.3 mL"
       },
       {
        "fr": "0,6 mL",
        "en": "0.6 mL",
        "correct": true
       },
       {
        "fr": "1 mL",
        "en": "1 mL"
       },
       {
        "fr": "1,6 mL",
        "en": "1.6 mL"
       }
      ],
      "explFr": "D/H × V = 0,6 mg ÷ 1 mg × 1 mL = 0,6 mL. Vérifiez toujours le calcul deux fois et faites-le vérifier par l'infirmière pour les médicaments à risque élevé.",
      "explEn": "D/H × V = 0.6 mg ÷ 1 mg × 1 mL = 0.6 mL. Always double-check the calculation and have it verified by the nurse for high-alert medications."
     },
     {
      "fr": "Quelle voie d'administration a généralement l'effet le plus rapide ?",
      "en": "Which route of administration generally has the fastest effect?",
      "choices": [
       {
        "fr": "Orale",
        "en": "Oral"
       },
       {
        "fr": "Intramusculaire",
        "en": "Intramuscular"
       },
       {
        "fr": "Intraveineuse",
        "en": "Intravenous",
        "correct": true
       },
       {
        "fr": "Sous-cutanée",
        "en": "Subcutaneous"
       }
      ],
      "explFr": "La voie intraveineuse délivre le médicament directement dans la circulation sanguine, ce qui produit l'effet le plus rapide.",
      "explEn": "The intravenous route delivers the medication directly into the bloodstream, producing the fastest effect."
     },
     {
      "type": "tf",
      "fr": "Un médicament générique a la même substance active qu'un médicament de marque, mais peut différer dans les ingrédients non actifs.",
      "en": "A generic medication has the same active ingredient as a brand-name medication, but may differ in inactive ingredients.",
      "isTrue": true,
      "explFr": "Vrai. Les génériques contiennent la même molécule active à dose équivalente, mais les excipients (couleur, liant, etc.) peuvent varier.",
      "explEn": "True. Generics contain the same active molecule at an equivalent dose, but the excipients (color, binder, etc.) may vary."
     },
     {
      "type": "scenario",
      "fr": "Vous réalisez, 30 minutes après la tournée, que vous avez oublié de donner un médicament prescrit à 8h00 à Mme Caron.\n\nQue devez-vous faire ?",
      "en": "30 minutes after the medication round, you realize you forgot to give Mrs. Caron a medication scheduled for 8:00 a.m.\n\nWhat should you do?",
      "choices": [
       {
        "fr": "L'administrer immédiatement sans consulter, puisque le délai est court et le médicament essentiel",
        "en": "Give it immediately without saying anything, it's not a big deal"
       },
       {
        "fr": "Aviser l'infirmière de l'omission, suivre ses directives et documenter l'incident",
        "en": "Notify the nurse of the omission, follow her instructions, and document the incident",
        "correct": true
       },
       {
        "fr": "Attendre la prochaine dose prévue et noter l'omission discrètement dans le dossier",
        "en": "Wait for the next scheduled dose and skip this one without mentioning it"
       },
       {
        "fr": "Administrer une demi-dose maintenant et la moitié à la prochaine prise prévue",
        "en": "Double the next dose to make up for it"
       }
      ],
      "explFr": "Toute omission de médicament doit être signalée à l'infirmière, qui évaluera s'il faut l'administrer en retard ou sauter la dose, selon le médicament. Documenter est obligatoire.",
      "explEn": "Any missed medication must be reported to the nurse, who will assess whether to administer it late or skip the dose, depending on the medication. Documentation is mandatory."
     },
     {
      "fr": "Comment doit-on généralement conserver l'insuline non entamée ?",
      "en": "How should an unopened vial of insulin generally be stored?",
      "choices": [
       {
        "fr": "À température ambiante, à l'abri de la lumière",
        "en": "At room temperature, away from light"
       },
       {
        "fr": "Au réfrigérateur (2-8 °C), sans congeler",
        "en": "In the refrigerator (2-8°C), without freezing",
        "correct": true
       },
       {
        "fr": "Au congélateur pour prolonger sa durée de vie",
        "en": "In the freezer to extend its shelf life"
       },
       {
        "fr": "Dans un endroit chaud et humide",
        "en": "In a warm, humid place"
       }
      ],
      "explFr": "L'insuline non entamée se conserve au réfrigérateur entre 2 et 8 °C. Une fois entamée, elle peut généralement rester à température ambiante selon les indications du fabricant, mais ne doit jamais geler.",
      "explEn": "Unopened insulin should be stored in the refrigerator between 2 and 8°C. Once opened, it can generally be kept at room temperature according to the manufacturer's instructions, but it must never be frozen."
     },
     {
      "type": "tf",
      "fr": "Les médicaments transdermiques (timbres) doivent être appliqués toujours au même endroit pour éviter l'irritation.",
      "en": "Les médicaments transdermiques (timbres) doivent être appliqués toujours au même endroit pour éviter l'irritation.",
      "isTrue": false,
      "explFr": "Faux. Il faut faire une rotation des sites d'application pour prévenir l'irritation cutanée et assurer une absorption constante. Retirer toujours l'ancien timbre avant d'en poser un nouveau.",
      "explEn": "Faux. Il faut faire une rotation des sites d'application pour prévenir l'irritation cutanée et assurer une absorption constante. Retirer toujours l'ancien timbre avant d'en poser un nouveau."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Quelle est la signification de l'abréviation 'BID' sur une ordonnance médicale ?",
      "en": "Quelle est la signification de l'abréviation 'BID' sur une ordonnance médicale ?",
      "choices": [
       {
        "fr": "Une fois par jour",
        "en": "Une fois par jour"
       },
       {
        "fr": "Deux fois par jour",
        "en": "Deux fois par jour",
        "correct": true
       },
       {
        "fr": "Trois fois par jour",
        "en": "Trois fois par jour"
       },
       {
        "fr": "Quatre fois par jour",
        "en": "Quatre fois par jour"
       }
      ],
      "explFr": "BID (bis in die, latin) = deux fois par jour. OD = une fois/jour, TID = trois fois/jour, QID = quatre fois/jour.",
      "explEn": "BID (bis in die, latin) = deux fois par jour. OD = une fois/jour, TID = trois fois/jour, QID = quatre fois/jour."
     },
     {
      "type": "scenario",
      "fr": "Vous découvrez qu'un médicament a été administré au mauvais patient. Les deux patients ont des noms similaires.\n\nQuelle est la PREMIÈRE action à faire ?",
      "en": "Vous découvrez qu'un médicament a été administré au mauvais patient. Les deux patients ont des noms similaires.\n\nQuelle est la PREMIÈRE action à faire ?",
      "choices": [
       {
        "fr": "Surveiller les deux patients et remplir le rapport d'incident à la fin du quart de travail",
        "en": "Surveiller les deux patients et remplir le rapport d'incident à la fin du quart de travail"
       },
       {
        "fr": "Remplir d'abord le rapport d'incident, puis aviser l'infirmière une fois complété",
        "en": "Remplir d'abord le rapport d'incident, puis aviser l'infirmière une fois complété"
       },
       {
        "fr": "Aviser l'infirmière immédiatement, surveiller les deux patients et remplir le rapport d'incident",
        "en": "Aviser l'infirmière immédiatement, surveiller les deux patients et remplir le rapport d'incident",
        "correct": true
       },
       {
        "fr": "Aviser uniquement le médecin du patient ayant reçu le mauvais médicament",
        "en": "Aviser uniquement le médecin du patient ayant reçu le mauvais médicament"
       }
      ],
      "explFr": "En cas d'erreur médicamenteuse, la priorité est la sécurité immédiate du patient affecté, puis de celui qui n'a pas reçu son médicament. L'infirmière doit être avisée en premier pour coordonner l'évaluation et le rapport d'incident (AH-223).",
      "explEn": "En cas d'erreur médicamenteuse, la priorité est la sécurité immédiate du patient affecté, puis de celui qui n'a pas reçu son médicament. L'infirmière doit être avisée en premier pour coordonner l'évaluation et le rapport d'incident (AH-223)."
     },
     {
      "fr": "Parmi les effets secondaires suivants, lequel est le PLUS préoccupant avec un opioïde ?",
      "en": "Parmi les effets secondaires suivants, lequel est le PLUS préoccupant avec un opioïde ?",
      "choices": [
       {
        "fr": "La constipation",
        "en": "La constipation"
       },
       {
        "fr": "Les nausées",
        "en": "Les nausées"
       },
       {
        "fr": "La dépression respiratoire",
        "en": "La dépression respiratoire",
        "correct": true
       },
       {
        "fr": "La somnolence légère",
        "en": "La somnolence légère"
       }
      ],
      "explFr": "La dépression respiratoire est l'effet indésirable le plus dangereux des opioïdes. Une FR < 12/min doit être signalée immédiatement. La naloxone (Narcan) est l'antidote en cas de surdosage.",
      "explEn": "La dépression respiratoire est l'effet indésirable le plus dangereux des opioïdes. Une FR < 12/min doit être signalée immédiatement. La naloxone (Narcan) est l'antidote en cas de surdosage."
     },
     {
      "fr": "Que signifie l'annotation 'PCN allergy' dans un dossier patient ?",
      "en": "Que signifie l'annotation 'PCN allergy' dans un dossier patient ?",
      "choices": [
       {
        "fr": "Allergie au paracétamol (Tylenol) et ses dérivés",
        "en": "Allergie au paracétamol (Tylenol) et ses dérivés"
       },
       {
        "fr": "Allergie à la pénicilline, nécessitant d'éviter les bêta-lactamines apparentées",
        "en": "Allergie à la pénicilline, nécessitant d'éviter les bêta-lactamines apparentées",
        "correct": true
       },
       {
        "fr": "Allergie aux anti-inflammatoires non stéroïdiens (AINS)",
        "en": "Allergie aux anti-inflammatoires non stéroïdiens (AINS)"
       },
       {
        "fr": "Allergie aux produits de contraste iodés pour imagerie",
        "en": "Allergie aux produits de contraste iodés pour imagerie"
       }
      ],
      "explFr": "PCN = pénicilline. Une allergie documentée à la pénicilline exige une vigilance pour tous les antibiotiques bêta-lactamines (amoxicilline, céphalosporines), en raison d'une allergie croisée possible. Toujours vérifier avant d'administrer.",
      "explEn": "PCN = pénicilline. Une allergie documentée à la pénicilline exige une vigilance pour tous les antibiotiques bêta-lactamines (amoxicilline, céphalosporines), en raison d'une allergie croisée possible. Toujours vérifier avant d'administrer."
     },
     {
      "type": "tf",
      "fr": "Un médicament prescrit 'TID' doit obligatoirement être donné aux mêmes heures fixes (ex. 8h-14h-20h) dans tous les milieux de soins.",
      "en": "Un médicament prescrit 'TID' doit obligatoirement être donné aux mêmes heures fixes (ex. 8h-14h-20h) dans tous les milieux de soins.",
      "isTrue": false,
      "explFr": "Faux. TID signifie trois fois par jour, mais les horaires exacts varient selon les protocoles de l'établissement, le type de médicament et les repas du patient. Il faut toujours vérifier les horaires locaux.",
      "explEn": "Faux. TID signifie trois fois par jour, mais les horaires exacts varient selon les protocoles de l'établissement, le type de médicament et les repas du patient. Il faut toujours vérifier les horaires locaux."
     },
     {
      "fr": "Quelle est la différence entre un effet secondaire et une réaction allergique médicamenteuse ?",
      "en": "Quelle est la différence entre un effet secondaire et une réaction allergique médicamenteuse ?",
      "choices": [
       {
        "fr": "Ce sont la même chose, seul le terme change selon la gravité",
        "en": "Ce sont la même chose, seul le terme change selon la gravité"
       },
       {
        "fr": "Effet secondaire = effet prévisible et lié au mécanisme du médicament ; réaction allergique = réponse immunitaire souvent imprévisible et potentiellement grave",
        "en": "Effet secondaire = effet prévisible et lié au mécanisme du médicament ; réaction allergique = réponse immunitaire souvent imprévisible et potentiellement grave",
        "correct": true
       },
       {
        "fr": "Effet secondaire = toujours bénin et transitoire ; réaction allergique = toujours mortelle",
        "en": "Effet secondaire = toujours bénin et transitoire ; réaction allergique = toujours mortelle"
       },
       {
        "fr": "Effet secondaire = oral uniquement ; réaction allergique = IV uniquement",
        "en": "Effet secondaire = oral uniquement ; réaction allergique = IV uniquement"
       }
      ],
      "explFr": "Un effet secondaire (ex. somnolence avec les opioïdes) est prévisible et lié à la pharmacologie du médicament. La réaction allergique (ex. urticaire, anaphylaxie) implique le système immunitaire et est imprévisible. Les deux doivent être documentés.",
      "explEn": "Un effet secondaire (ex. somnolence avec les opioïdes) est prévisible et lié à la pharmacologie du médicament. La réaction allergique (ex. urticaire, anaphylaxie) implique le système immunitaire et est imprévisible. Les deux doivent être documentés."
     },
     {
      "type": "scenario",
      "fr": "Vous préparez la médication de Mme Dion. L'ordonnance indique 'méthotrexate 7,5 mg par semaine'. Les comprimés disponibles sont de 2,5 mg chacun. Vous calculez 3 comprimés.\n\nQue faites-vous avant d'administrer ?",
      "en": "Vous préparez la médication de Mme Dion. L'ordonnance indique 'méthotrexate 7,5 mg par semaine'. Les comprimés disponibles sont de 2,5 mg chacun. Vous calculez 3 comprimés.\n\nQue faites-vous avant d'administrer ?",
      "choices": [
       {
        "fr": "Administrer les 3 comprimés, car votre calcul est exact et clairement vérifiable",
        "en": "Administrer les 3 comprimés, car votre calcul est exact et clairement vérifiable"
       },
       {
        "fr": "Faire vérifier votre calcul par l'infirmière — le méthotrexate est un médicament à risque élevé",
        "en": "Faire vérifier votre calcul par l'infirmière — le méthotrexate est un médicament à risque élevé",
        "correct": true
       },
       {
        "fr": "Documenter votre calcul dans le dossier et administrer sans délai supplémentaire",
        "en": "Documenter votre calcul dans le dossier et administrer sans délai supplémentaire"
       },
       {
        "fr": "Téléphoner directement à la pharmacie pour confirmer sans aviser l'infirmière",
        "en": "Téléphoner directement à la pharmacie pour confirmer sans aviser l'infirmière"
       }
      ],
      "explFr": "Le méthotrexate est un médicament à risque élevé (cytotoxique). Toute erreur de dose peut être fatale. Une double vérification par l'infirmière est obligatoire, peu importe la simplicité du calcul. Ne jamais administrer seul sans vérification.",
      "explEn": "Le méthotrexate est un médicament à risque élevé (cytotoxique). Toute erreur de dose peut être fatale. Une double vérification par l'infirmière est obligatoire, peu importe la simplicité du calcul. Ne jamais administrer seul sans vérification."
     },
     {
      "fr": "Qu'est-ce que l'alimentation par voie entérale ?",
      "en": "Qu'est-ce que l'alimentation par voie entérale ?",
      "choices": [
       {
        "fr": "Administration de nutriments directement dans la circulation veineuse périphérique",
        "en": "Administration de nutriments directement dans la circulation veineuse périphérique"
       },
       {
        "fr": "Alimentation via le tube digestif par sonde nasogastrique ou de gastrostomie",
        "en": "Alimentation via le tube digestif par sonde nasogastrique ou de gastrostomie",
        "correct": true
       },
       {
        "fr": "Administration de médicaments par voie rectale sous forme de suppositoires",
        "en": "Administration de médicaments par voie rectale sous forme de suppositoires"
       },
       {
        "fr": "Alimentation par voie sous-cutanée à débit lent en milieu palliatif",
        "en": "Alimentation par voie sous-cutanée à débit lent en milieu palliatif"
       }
      ],
      "explFr": "L'alimentation entérale utilise le tube digestif : par sonde nasogastrique (nez → estomac), nasojéjunale ou gastrostomie (PEG). Elle est préférée à la voie parentérale (IV) quand le tube digestif fonctionne, car plus sécuritaire et naturelle.",
      "explEn": "L'alimentation entérale utilise le tube digestif : par sonde nasogastrique (nez → estomac), nasojéjunale ou gastrostomie (PEG). Elle est préférée à la voie parentérale (IV) quand le tube digestif fonctionne, car plus sécuritaire et naturelle."
     },
     {
      "fr": "Que signifie la demi-vie (t½) d'un médicament ?",
      "en": "Que signifie la demi-vie (t½) d'un médicament ?",
      "choices": [
       {
        "fr": "Le temps qu'il prend à être absorbé dans le sang",
        "en": "Le temps qu'il prend à être absorbé dans le sang"
       },
       {
        "fr": "Le temps nécessaire pour que la concentration plasmatique diminue de moitié",
        "en": "Le temps nécessaire pour que la concentration plasmatique diminue de moitié",
        "correct": true
       },
       {
        "fr": "La durée totale d'action du médicament",
        "en": "La durée totale d'action du médicament"
       },
       {
        "fr": "Le délai entre l'administration et le début de l'effet",
        "en": "Le délai entre l'administration et le début de l'effet"
       }
      ],
      "explFr": "La demi-vie guide la fréquence d'administration. Une longue demi-vie = risque d'accumulation chez les patients avec insuffisance rénale ou hépatique, notamment les personnes âgées.",
      "explEn": "La demi-vie guide la fréquence d'administration. Une longue demi-vie = risque d'accumulation chez les patients avec insuffisance rénale ou hépatique, notamment les personnes âgées."
     },
     {
      "fr": "Qu'est-ce qu'une interaction médicamenteuse synergique ?",
      "en": "Qu'est-ce qu'une interaction médicamenteuse synergique ?",
      "choices": [
       {
        "fr": "Deux médicaments dont les effets s'annulent mutuellement",
        "en": "Deux médicaments dont les effets s'annulent mutuellement"
       },
       {
        "fr": "Deux médicaments dont les effets s'additionnent ou se potentialisent",
        "en": "Deux médicaments dont les effets s'additionnent ou se potentialisent",
        "correct": true
       },
       {
        "fr": "Un médicament qui accélère l'élimination d'un autre",
        "en": "Un médicament qui accélère l'élimination d'un autre"
       },
       {
        "fr": "Un médicament dont l'absorption est bloquée par la nourriture",
        "en": "Un médicament dont l'absorption est bloquée par la nourriture"
       }
      ],
      "explFr": "Effet synergique = les deux médicaments produisent ensemble un effet supérieur à la somme de leurs effets individuels. Ex : alcool + sédatifs (dépression du SNC amplifiée). Ces interactions peuvent être dangereuses.",
      "explEn": "Effet synergique = les deux médicaments produisent ensemble un effet supérieur à la somme de leurs effets individuels. Ex : alcool + sédatifs (dépression du SNC amplifiée). Ces interactions peuvent être dangereuses."
     },
     {
      "fr": "Avant d'administrer de l'insuline rapide, quelle vérification est indispensable ?",
      "en": "Avant d'administrer de l'insuline rapide, quelle vérification est indispensable ?",
      "choices": [
       {
        "fr": "Vérifier l'heure d'administration selon l'horaire fixe",
        "en": "Vérifier l'heure d'administration selon l'horaire fixe"
       },
       {
        "fr": "Mesurer la glycémie capillaire et vérifier les paramètres d'administration prescrits",
        "en": "Mesurer la glycémie capillaire et vérifier les paramètres d'administration prescrits",
        "correct": true
       },
       {
        "fr": "Vérifier la date de péremption du stylo uniquement",
        "en": "Vérifier la date de péremption du stylo uniquement"
       },
       {
        "fr": "S'assurer que le patient est à jeun depuis 8 heures",
        "en": "S'assurer que le patient est à jeun depuis 8 heures"
       }
      ],
      "explFr": "L'insuline rapide se donne selon la glycémie actuelle et les paramètres prescrits. Une injection sans glycémie préalable peut causer une hypoglycémie sévère. Toujours valider avec l'infirmière.",
      "explEn": "L'insuline rapide se donne selon la glycémie actuelle et les paramètres prescrits. Une injection sans glycémie préalable peut causer une hypoglycémie sévère. Toujours valider avec l'infirmière."
     },
     {
      "fr": "Que doit-on faire si un patient vomit dans les 30 minutes suivant un médicament oral ?",
      "en": "Que doit-on faire si un patient vomit dans les 30 minutes suivant un médicament oral ?",
      "choices": [
       {
        "fr": "Lui redonner la dose immédiatement sans aviser",
        "en": "Lui redonner la dose immédiatement sans aviser"
       },
       {
        "fr": "Aviser l'infirmière qui évaluera s'il faut répéter la dose ou choisir une autre voie",
        "en": "Aviser l'infirmière qui évaluera s'il faut répéter la dose ou choisir une autre voie",
        "correct": true
       },
       {
        "fr": "Attendre la prochaine dose en supposant que le médicament a été absorbé",
        "en": "Attendre la prochaine dose en supposant que le médicament a été absorbé"
       },
       {
        "fr": "Lui donner une dose double à la prochaine prise pour compenser",
        "en": "Lui donner une dose double à la prochaine prise pour compenser"
       }
      ],
      "explFr": "Le vomissement peut signifier que le médicament n'a pas été absorbé. Il ne faut jamais décider seul de répéter — certains médicaments (anticoagulants, opioïdes) peuvent causer une surdose si redonnés.",
      "explEn": "Le vomissement peut signifier que le médicament n'a pas été absorbé. Il ne faut jamais décider seul de répéter — certains médicaments (anticoagulants, opioïdes) peuvent causer une surdose si redonnés."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "L'INR est principalement utilisé pour surveiller quel médicament ?",
      "en": "L'INR est principalement utilisé pour surveiller quel médicament ?",
      "choices": [
       {
        "fr": "L'héparine de bas poids moléculaire (Lovenox)",
        "en": "L'héparine de bas poids moléculaire (Lovenox)"
       },
       {
        "fr": "La warfarine (Coumadin)",
        "en": "La warfarine (Coumadin)",
        "correct": true
       },
       {
        "fr": "L'aspirine à faible dose",
        "en": "L'aspirine à faible dose"
       },
       {
        "fr": "Le rivaroxaban (Xarelto)",
        "en": "Le rivaroxaban (Xarelto)"
       }
      ],
      "explFr": "L'INR mesure l'effet anticoagulant de la warfarine. Cible habituelle : 2 à 3. Un INR > 3 augmente le risque de saignement. Les NOACs (Xarelto, Eliquis) ne nécessitent pas de surveillance par INR.",
      "explEn": "L'INR mesure l'effet anticoagulant de la warfarine. Cible habituelle : 2 à 3. Un INR > 3 augmente le risque de saignement. Les NOACs (Xarelto, Eliquis) ne nécessitent pas de surveillance par INR."
     },
     {
      "fr": "Comment administre-t-on un médicament via sonde nasogastrique (SNG) ?",
      "en": "Comment administre-t-on un médicament via sonde nasogastrique (SNG) ?",
      "choices": [
       {
        "fr": "Écraser tous les comprimés ensemble dans l'eau tiède",
        "en": "Écraser tous les comprimés ensemble dans l'eau tiède"
       },
       {
        "fr": "Vérifier la position, administrer chaque médicament séparément dilué et rincer entre chacun",
        "en": "Vérifier la position, administrer chaque médicament séparément dilué et rincer entre chacun",
        "correct": true
       },
       {
        "fr": "Mélanger les médicaments en solution IV en cas de sonde",
        "en": "Mélanger les médicaments en solution IV en cas de sonde"
       },
       {
        "fr": "Écraser les comprimés LP pour faciliter leur passage",
        "en": "Écraser les comprimés LP pour faciliter leur passage"
       }
      ],
      "explFr": "Via SNG : vérifier la position (pH des sécrétions < 5,5), diluer chaque médicament séparément, rincer avec 15-30 mL d'eau entre chaque médicament pour éviter interactions et obstructions.",
      "explEn": "Via SNG : vérifier la position (pH des sécrétions < 5,5), diluer chaque médicament séparément, rincer avec 15-30 mL d'eau entre chaque médicament pour éviter interactions et obstructions."
     },
     {
      "fr": "Qu'est-ce qu'un antagoniste médicamenteux ?",
      "en": "Qu'est-ce qu'un antagoniste médicamenteux ?",
      "choices": [
       {
        "fr": "Un médicament qui amplifie l'effet d'un autre",
        "en": "Un médicament qui amplifie l'effet d'un autre"
       },
       {
        "fr": "Une substance qui bloque ou inhibe l'effet d'une autre en se fixant sur le même récepteur",
        "en": "Une substance qui bloque ou inhibe l'effet d'une autre en se fixant sur le même récepteur",
        "correct": true
       },
       {
        "fr": "Un médicament utilisé pour traiter les effets secondaires d'un autre",
        "en": "Un médicament utilisé pour traiter les effets secondaires d'un autre"
       },
       {
        "fr": "Un médicament avec deux mécanismes d'action différents",
        "en": "Un médicament avec deux mécanismes d'action différents"
       }
      ],
      "explFr": "Un antagoniste occupe un récepteur sans l'activer, bloquant l'agoniste naturel ou exogène. Exemple : la naloxone (Narcan) est l'antagoniste de la morphine — elle reverse la dépression respiratoire aux opioïdes.",
      "explEn": "Un antagoniste occupe un récepteur sans l'activer, bloquant l'agoniste naturel ou exogène. Exemple : la naloxone (Narcan) est l'antagoniste de la morphine — elle reverse la dépression respiratoire aux opioïdes."
     },
     {
      "fr": "Quel est le principal risque de l'association benzodiazépines + opioïdes ?",
      "en": "Quel est le principal risque de l'association benzodiazépines + opioïdes ?",
      "choices": [
       {
        "fr": "Hypertension et tachycardie",
        "en": "Hypertension et tachycardie"
       },
       {
        "fr": "Dépression respiratoire additive potentiellement fatale",
        "en": "Dépression respiratoire additive potentiellement fatale",
        "correct": true
       },
       {
        "fr": "Augmentation de la durée d'action uniquement",
        "en": "Augmentation de la durée d'action uniquement"
       },
       {
        "fr": "Réaction allergique croisée",
        "en": "Réaction allergique croisée"
       }
      ],
      "explFr": "La combinaison benzodiazépines + opioïdes a un effet additif sur la dépression du SNC. Des décès par overdose ont été documentés. Surveiller étroitement la FR et le niveau de conscience après co-administration.",
      "explEn": "La combinaison benzodiazépines + opioïdes a un effet additif sur la dépression du SNC. Des décès par overdose ont été documentés. Surveiller étroitement la FR et le niveau de conscience après co-administration."
     },
     {
      "type": "tf",
      "fr": "Un comprimé à libération prolongée (LP) peut être coupé pour faciliter l'administration.",
      "en": "Un comprimé à libération prolongée (LP) peut être coupé pour faciliter l'administration.",
      "isTrue": false,
      "explFr": "Faux. Couper ou écraser un comprimé LP détruit le mécanisme de libération graduelle → dose totale libérée d'un coup → surdosage potentiel. Toujours consulter la pharmacie avant toute modification.",
      "explEn": "Faux. Couper ou écraser un comprimé LP détruit le mécanisme de libération graduelle → dose totale libérée d'un coup → surdosage potentiel. Toujours consulter la pharmacie avant toute modification."
     },
     {
      "type": "tf",
      "fr": "Il est acceptable de préparer la médication à l'avance pour plusieurs patients afin de gagner du temps.",
      "en": "Il est acceptable de préparer la médication à l'avance pour plusieurs patients afin de gagner du temps.",
      "isTrue": false,
      "explFr": "Faux. Préparer pour plusieurs patients à l'avance augmente le risque de confusion entre patients, de dégradation et d'erreur d'identification. Les médicaments sont préparés pour un patient à la fois, juste avant l'administration.",
      "explEn": "Faux. Préparer pour plusieurs patients à l'avance augmente le risque de confusion entre patients, de dégradation et d'erreur d'identification. Les médicaments sont préparés pour un patient à la fois, juste avant l'administration."
     },
     {
      "type": "tf",
      "fr": "La voie sous-cutanée (SC) est adaptée pour l'administration d'héparine de bas poids moléculaire (HBPM).",
      "en": "La voie sous-cutanée (SC) est adaptée pour l'administration d'héparine de bas poids moléculaire (HBPM).",
      "isTrue": true,
      "explFr": "Vrai. L'HBPM (ex. énoxaparine/Lovenox) se donne exclusivement par voie SC, en rotation des sites. L'injection IM est contre-indiquée avec les anticoagulants (risque d'hématome intramusculaire).",
      "explEn": "Vrai. L'HBPM (ex. énoxaparine/Lovenox) se donne exclusivement par voie SC, en rotation des sites. L'injection IM est contre-indiquée avec les anticoagulants (risque d'hématome intramusculaire)."
     },
     {
      "type": "scenario",
      "fr": "Vous calculez que M. Fortin doit recevoir 1,5 mL d'hydromorphone. L'infirmière n'est pas disponible immédiatement. Le médicament est prêt.\n\nQue faites-vous ?",
      "en": "Vous calculez que M. Fortin doit recevoir 1,5 mL d'hydromorphone. L'infirmière n'est pas disponible immédiatement. Le médicament est prêt.\n\nQue faites-vous ?",
      "choices": [
       {
        "fr": "Administrer le médicament — le calcul est vérifié et le patient souffre",
        "en": "Administrer le médicament — le calcul est vérifié et le patient souffre"
       },
       {
        "fr": "Attendre l'infirmière pour une double vérification — l'hydromorphone est un médicament à risque élevé",
        "en": "Attendre l'infirmière pour une double vérification — l'hydromorphone est un médicament à risque élevé",
        "correct": true
       },
       {
        "fr": "Donner le médicament et noter que l'infirmière n'était pas disponible",
        "en": "Donner le médicament et noter que l'infirmière n'était pas disponible"
       },
       {
        "fr": "Demander à un autre préposé de vérifier le calcul à votre place",
        "en": "Demander à un autre préposé de vérifier le calcul à votre place"
       }
      ],
      "explFr": "L'hydromorphone est un opioïde à risque élevé qui nécessite une double vérification par l'infirmière. Les préposés n'administrent pas seuls les médicaments à risque élevé. Patienter est obligatoire.",
      "explEn": "L'hydromorphone est un opioïde à risque élevé qui nécessite une double vérification par l'infirmière. Les préposés n'administrent pas seuls les médicaments à risque élevé. Patienter est obligatoire."
     },
     {
      "type": "scenario",
      "fr": "Mme Ricard, 80 ans, reçoit de la warfarine. Son INR du matin est de 4,2. Elle n'a aucun saignement visible.\n\nQuelle est votre action ?",
      "en": "Mme Ricard, 80 ans, reçoit de la warfarine. Son INR du matin est de 4,2. Elle n'a aucun saignement visible.\n\nQuelle est votre action ?",
      "choices": [
       {
        "fr": "Administrer la dose habituelle et surveiller les saignements",
        "en": "Administrer la dose habituelle et surveiller les saignements"
       },
       {
        "fr": "Retenir la dose et aviser immédiatement l'infirmière de l'INR supra-thérapeutique",
        "en": "Retenir la dose et aviser immédiatement l'infirmière de l'INR supra-thérapeutique",
        "correct": true
       },
       {
        "fr": "Donner une demi-dose et réévaluer l'INR dans 24 heures",
        "en": "Donner une demi-dose et réévaluer l'INR dans 24 heures"
       },
       {
        "fr": "Appeler la pharmacie pour ajuster la dose vous-même",
        "en": "Appeler la pharmacie pour ajuster la dose vous-même"
       }
      ],
      "explFr": "Un INR > 3 est supra-thérapeutique et indique un risque hémorragique élevé. Il faut retenir la dose et aviser l'infirmière qui informera le médecin. Ne jamais administrer sans validation.",
      "explEn": "Un INR > 3 est supra-thérapeutique et indique un risque hémorragique élevé. Il faut retenir la dose et aviser l'infirmière qui informera le médecin. Ne jamais administrer sans validation."
     },
     {
      "fr": "Quelle est la signification de l'annotation 'NPO' (ou 'Nil per os') dans un dossier ?",
      "en": "Quelle est la signification de l'annotation 'NPO' (ou 'Nil per os') dans un dossier ?",
      "choices": [
       {
        "fr": "Nutrition par voie parentérale optimisée",
        "en": "Nutrition par voie parentérale optimisée"
       },
       {
        "fr": "Ne rien donner par la bouche — le patient doit être à jeun",
        "en": "Ne rien donner par la bouche — le patient doit être à jeun",
        "correct": true
       },
       {
        "fr": "Nouvelle prescription orale à confirmer",
        "en": "Nouvelle prescription orale à confirmer"
       },
       {
        "fr": "Aucune priorisation optimale des soins",
        "en": "Aucune priorisation optimale des soins"
       }
      ],
      "explFr": "NPO (Nil per os) = à jeun : aucun liquide ni aliment par la bouche. Indication fréquente : chirurgie, examens, trouble de déglutition. Vérifier avec l'infirmière quels médicaments peuvent être administrés malgré le NPO.",
      "explEn": "NPO (Nil per os) = à jeun : aucun liquide ni aliment par la bouche. Indication fréquente : chirurgie, examens, trouble de déglutition. Vérifier avec l'infirmière quels médicaments peuvent être administrés malgré le NPO."
     }
    ]
   }
  ]
 },
 {
  "id": "soins_base",
  "order": 4,
  "title_fr": "Soins de Base",
  "title_en": "Basic Care",
  "icon": "🛁",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "À quelle fréquence recommande-t-on de repositionner un patient alité à risque d'escarres ?",
      "en": "How often is it recommended to reposition a bedridden patient at risk of pressure ulcers?",
      "choices": [
       {
        "fr": "Toutes les 30 minutes",
        "en": "Every 30 minutes"
       },
       {
        "fr": "Toutes les 2 heures",
        "en": "Every 2 hours",
        "correct": true
       },
       {
        "fr": "Toutes les 4 heures",
        "en": "Every 4 hours"
       },
       {
        "fr": "Une fois par quart de travail",
        "en": "Once per shift"
       }
      ],
      "explFr": "Le repositionnement toutes les 2 heures est la norme pour prévenir les plaies de pression. Des matelas anti-escarres permettent parfois d'allonger cet intervalle.",
      "explEn": "Repositioning every 2 hours is the standard for preventing pressure injuries. Pressure-relieving mattresses can sometimes extend this interval."
     },
     {
      "type": "tf",
      "fr": "Selon l'OMS, le lavage des mains doit se faire APRÈS avoir touché l'environnement du patient.",
      "en": "According to the WHO, hand hygiene must be performed AFTER touching the patient's surroundings.",
      "isTrue": true,
      "explFr": "Vrai. C'est le 5e moment de l'hygiène des mains : après contact avec l'environnement du patient (rampes, boutons, table de chevet), même sans contact direct avec le patient.",
      "explEn": "True. This is the 5th moment of hand hygiene: after contact with the patient's surroundings (rails, buttons, bedside table), even without direct contact with the patient."
     },
     {
      "type": "scenario",
      "fr": "Lors de la toilette de M. Simard, vous remarquez une zone de rougeur persistante non blanchissante de 3 cm au sacrum.\n\nQuelle est la classification et l'action prioritaire ?",
      "en": "While bathing Mr. Simard, you notice a persistent, non-blanchable area of redness measuring 3 cm on his sacrum.\n\nWhat is the classification and the priority action?",
      "choices": [
       {
        "fr": "Escarre stade 2 — appliquer un pansement hydrocolloïde et surveiller à chaque toilette",
        "en": "Stage 2 pressure ulcer — apply moisturizing cream and continue"
       },
       {
        "fr": "Escarre stade 1 — aviser l'infirmière, documenter, intensifier les repositionnements",
        "en": "Stage 1 pressure ulcer — notify the nurse, document, and increase repositioning",
        "correct": true
       },
       {
        "fr": "Rougeur transitoire — surveiller attentivement lors de la prochaine toilette avant d'agir",
        "en": "Normal irritation — do nothing"
       },
       {
        "fr": "Escarre stade 3 — nettoyer la plaie et appliquer un pansement absorbant",
        "en": "Stage 3 pressure ulcer — prepare a surgical dressing"
       }
      ],
      "explFr": "Rougeur persistante non blanchissante = escarre stade 1 (atteinte de l'épiderme). Avisez l'infirmière immédiatement, documentez la taille et l'aspect, et intensifiez la prévention.",
      "explEn": "Persistent non-blanchable redness = Stage 1 pressure ulcer (epidermis affected). Notify the nurse immediately, document the size and appearance, and increase preventive measures."
     },
     {
      "fr": "Que comprend l'aide à la toilette complète au lit ?",
      "en": "What does a complete bed bath include?",
      "choices": [
       {
        "fr": "Lavage du corps et des cheveux, avec changement des draps si souillés",
        "en": "Only the face and hands"
       },
       {
        "fr": "Corps, cheveux, ongles, hygiène buccale, yeux et observation systématique de la peau",
        "en": "Body, hair, nails, oral hygiene, eyes + skin observation",
        "correct": true
       },
       {
        "fr": "Bain du corps et des parties intimes, le reste étant délégué à l'infirmière",
        "en": "Bath and bedding change only"
       },
       {
        "fr": "Hygiène buccale, visage et mains : les soins du corps complet sont réservés au bain",
        "en": "Brushing teeth and hair only"
       }
      ],
      "explFr": "La toilette complète inclut tous les soins d'hygiène ET l'observation systématique de la peau (rougeurs, plaies, œdèmes). C'est une occasion précieuse d'évaluation clinique.",
      "explEn": "A complete bed bath includes all hygiene care AND systematic skin observation (redness, wounds, edema). It is a valuable opportunity for clinical assessment."
     },
     {
      "type": "tf",
      "fr": "Une contention physique peut être appliquée sans ordonnance médicale en situation d'urgence.",
      "en": "Physical restraints can be applied without a medical order in an emergency.",
      "isTrue": false,
      "explFr": "Faux au Québec. La contention physique requiert TOUJOURS une ordonnance médicale, un consentement (si possible) et une réévaluation régulière. Elle est utilisée en dernier recours seulement.",
      "explEn": "False in Quebec. Physical restraints ALWAYS require a medical order, consent (if possible), and regular reassessment. They are used only as a last resort."
     },
     {
      "type": "scenario",
      "fr": "Vous installez une sonde urinaire à Mme Pelletier. À mi-parcours de l'insertion, la patiente se plaint de douleur intense.\n\nQue faites-vous ?",
      "en": "You are inserting a urinary catheter for Mrs. Pelletier. Halfway through insertion, the patient complains of intense pain.\n\nWhat do you do?",
      "choices": [
       {
        "fr": "Faire une pause, encourager la patiente à se détendre, puis reprendre l'insertion lentement",
        "en": "Push harder to get past the obstruction"
       },
       {
        "fr": "Arrêter la procédure, retirer la sonde et aviser l'infirmière immédiatement",
        "en": "Stop the procedure, withdraw the catheter, and notify the nurse",
        "correct": true
       },
       {
        "fr": "Rassurer la patiente que c'est une sensation normale et continuer doucement",
        "en": "Distract her and continue quickly"
       },
       {
        "fr": "Vérifier la longueur d'insertion et gonfler légèrement le ballonnet pour confirmer la position",
        "en": "Inflate the balloon immediately"
       }
      ],
      "explFr": "Toute résistance ou douleur intense lors de l'insertion d'une sonde indique un problème (mauvais trajet, obstacle). Il faut ARRÊTER, retirer et aviser. Ne jamais forcer.",
      "explEn": "Any resistance or intense pain during catheter insertion indicates a problem (incorrect path, obstruction). You must STOP, withdraw, and notify the nurse. Never force it."
     },
     {
      "fr": "Comment évaluer la douleur chez une personne aphasique ou non verbale ?",
      "en": "How should pain be assessed in a person who is aphasic or non-verbal?",
      "choices": [
       {
        "fr": "Se fier à l'absence de pleurs ou de crispation visible pour conclure à l'absence de douleur",
        "en": "Rely on the absence of tears"
       },
       {
        "fr": "Utiliser des échelles comportementales (PACSLAC, ABBEY) observant le visage, corps, comportement",
        "en": "Use behavioral scales (PACSLAC, ABBEY) observing the face, body, and behavior",
        "correct": true
       },
       {
        "fr": "Demander à la famille d'évaluer la douleur selon leur connaissance du patient",
        "en": "Ask the family if they are in pain"
       },
       {
        "fr": "Utiliser l'échelle EVA standard en montrant les chiffres sur un carton",
        "en": "Do not assess, as it is impossible"
       }
      ],
      "explFr": "Les échelles comportementales comme PACSLAC-II et ABBEY Pain Scale évaluent les indicateurs non verbaux : expression faciale, vocalisation, mouvement corporel, changements comportementaux.",
      "explEn": "Behavioral scales such as PACSLAC-II and the ABBEY Pain Scale assess non-verbal indicators: facial expression, vocalization, body movement, and behavioral changes."
     },
     {
      "fr": "Combien de moments de l'hygiène des mains l'OMS recommande-t-elle ?",
      "en": "How many moments of hand hygiene does the WHO recommend?",
      "choices": [
       {
        "fr": "2",
        "en": "2"
       },
       {
        "fr": "3",
        "en": "3"
       },
       {
        "fr": "5",
        "en": "5",
        "correct": true
       },
       {
        "fr": "8",
        "en": "8"
       }
      ],
      "explFr": "Les 5 moments de l'OMS : avant un contact patient, avant un geste aseptique, après un risque d'exposition à un liquide biologique, après un contact patient, après un contact avec l'environnement du patient.",
      "explEn": "The WHO's 5 moments: before patient contact, before an aseptic procedure, after exposure risk to body fluids, after patient contact, and after contact with the patient's surroundings."
     },
     {
      "type": "tf",
      "fr": "Frapper et attendre une réponse avant d'entrer dans la chambre fait partie du respect de la dignité du patient.",
      "en": "Knocking and waiting for a response before entering a room is part of respecting patient dignity.",
      "isTrue": true,
      "explFr": "Vrai. Le respect de l'intimité et de la dignité passe par des gestes simples : frapper, demander la permission, fermer la porte ou tirer le rideau pendant les soins.",
      "explEn": "True. Respecting privacy and dignity involves simple actions: knocking, asking permission, and closing the door or curtain during care."
     },
     {
      "type": "scenario",
      "fr": "Vous remarquez que M. Bélanger, 80 ans, a déjà fait deux chutes ce mois-ci et qu'il se lève souvent seul la nuit pour aller à la toilette.\n\nQuelle mesure préventive est la plus appropriée ?",
      "en": "You notice that Mr. Bélanger, 80, has already had two falls this month and often gets up alone at night to use the bathroom.\n\nWhat preventive measure is most appropriate?",
      "choices": [
       {
        "fr": "Signaler au médecin pour obtenir une ordonnance de somnifère afin de limiter ses déplacements nocturnes",
        "en": "Restrain him to the bed all night"
       },
       {
        "fr": "Installer une cloche d'appel à portée de main, abaisser le lit et utiliser une lumière de nuit",
        "en": "Place a call bell within reach, lower the bed, and use a night light",
        "correct": true
       },
       {
        "fr": "Restreindre sa prise de liquides après 18h pour diminuer le besoin d'uriner la nuit",
        "en": "Forbid him from drinking in the evening to prevent him from getting up"
       },
       {
        "fr": "Demander une ordonnance de contention nocturne temporaire jusqu'à résolution du risque",
        "en": "Do nothing, this is normal at his age"
       }
      ],
      "explFr": "La prévention des chutes passe par des mesures non contraignantes : cloche d'appel accessible, lit en position basse, bonne luminosité, chaussures antidérapantes, et surveillance accrue. La contention est un dernier recours encadré.",
      "explEn": "Fall prevention relies on non-restrictive measures: an accessible call bell, a low bed position, good lighting, non-slip footwear, and increased monitoring. Restraints are a last resort, used under strict conditions."
     },
     {
      "fr": "Quel est un signe précoce de déshydratation chez une personne âgée ?",
      "en": "What is an early sign of dehydration in an elderly person?",
      "choices": [
       {
        "fr": "Urine très claire et abondante",
        "en": "Very clear and abundant urine"
       },
       {
        "fr": "Bouche sèche, urine foncée et confusion accrue",
        "en": "Dry mouth, dark urine, and increased confusion",
        "correct": true
       },
       {
        "fr": "Augmentation de l'appétit",
        "en": "Increased appetite"
       },
       {
        "fr": "Peau très moite",
        "en": "Very moist skin"
       }
      ],
      "explFr": "Chez la personne âgée, la déshydratation se manifeste souvent par une bouche sèche, une urine foncée et concentrée, et parfois une confusion accrue ou une fatigue inhabituelle.",
      "explEn": "In elderly people, dehydration often manifests as dry mouth, dark and concentrated urine, and sometimes increased confusion or unusual fatigue."
     },
     {
      "type": "tf",
      "fr": "Il est acceptable de laisser les ridelles du lit en position basse si le patient est agité.",
      "en": "Il est acceptable de laisser les ridelles du lit en position basse si le patient est agité.",
      "isTrue": false,
      "explFr": "Faux. Les ridelles doivent être en position haute (ou selon les directives de l'équipe) chez un patient agité ou à risque de chute. Les laisser basses augmente le risque de chute du lit.",
      "explEn": "Faux. Les ridelles doivent être en position haute (ou selon les directives de l'équipe) chez un patient agité ou à risque de chute. Les laisser basses augmente le risque de chute du lit."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Lors du bain au lit, dans quel ordre doit-on généralement nettoyer le corps du patient ?",
      "en": "Lors du bain au lit, dans quel ordre doit-on généralement nettoyer le corps du patient ?",
      "choices": [
       {
        "fr": "Thorax → bras → abdomen → visage → jambes → parties intimes",
        "en": "Thorax → bras → abdomen → visage → jambes → parties intimes"
       },
       {
        "fr": "Visage → bras → thorax → abdomen → jambes → parties intimes",
        "en": "Visage → bras → thorax → abdomen → jambes → parties intimes",
        "correct": true
       },
       {
        "fr": "Parties intimes → abdomen → thorax → bras → visage",
        "en": "Parties intimes → abdomen → thorax → bras → visage"
       },
       {
        "fr": "Visage → parties intimes → abdomen → bras → pieds",
        "en": "Visage → parties intimes → abdomen → bras → pieds"
       }
      ],
      "explFr": "On procède du plus propre au plus souillé : visage, cou, bras, thorax, abdomen, jambes, puis les parties intimes en dernier. On change l'eau ou le gant entre les régions.",
      "explEn": "On procède du plus propre au plus souillé : visage, cou, bras, thorax, abdomen, jambes, puis les parties intimes en dernier. On change l'eau ou le gant entre les régions."
     },
     {
      "type": "scenario",
      "fr": "M. Simard, 65 ans, vous dit qu'il ne veut pas que son fils soit informé de son état de santé lors de sa visite. L'infirmière n'est pas disponible.\n\nComment gérez-vous la situation quand le fils arrive et demande des nouvelles ?",
      "en": "M. Simard, 65 ans, vous dit qu'il ne veut pas que son fils soit informé de son état de santé lors de sa visite. L'infirmière n'est pas disponible.\n\nComment gérez-vous la situation quand le fils arrive et demande des nouvelles ?",
      "choices": [
       {
        "fr": "Lui confirmer l'état général du patient sans donner de détails diagnostiques, par souci de transparence",
        "en": "Lui confirmer l'état général du patient sans donner de détails diagnostiques, par souci de transparence"
       },
       {
        "fr": "Lui expliquer poliment que vous ne pouvez pas divulguer d'informations sans le consentement du patient et rediriger vers l'infirmière",
        "en": "Lui expliquer poliment que vous ne pouvez pas divulguer d'informations sans le consentement du patient et rediriger vers l'infirmière",
        "correct": true
       },
       {
        "fr": "Lui dire que vous n'êtes pas au courant et l'orienter vers un autre soignant",
        "en": "Lui dire que vous n'êtes pas au courant et l'orienter vers un autre soignant"
       },
       {
        "fr": "Lui donner les informations générales, puisque le patient n'a pas précisé les limites exactes",
        "en": "Lui donner les informations générales, puisque le patient n'a pas précisé les limites exactes"
       }
      ],
      "explFr": "La confidentialité est un droit fondamental du patient. Sans son consentement explicite, aucune information médicale ne peut être divulguée, même à la famille. L'infirmière est la ressource appropriée pour gérer cette situation.",
      "explEn": "La confidentialité est un droit fondamental du patient. Sans son consentement explicite, aucune information médicale ne peut être divulguée, même à la famille. L'infirmière est la ressource appropriée pour gérer cette situation."
     },
     {
      "type": "tf",
      "fr": "L'utilisation des gants dispense du lavage des mains après un soin.",
      "en": "L'utilisation des gants dispense du lavage des mains après un soin.",
      "isTrue": false,
      "explFr": "Faux. Les gants ne remplacent pas le lavage des mains. Ils peuvent se déchirer ou être contaminés lors du retrait. Le lavage des mains est obligatoire avant ET après le port de gants.",
      "explEn": "Faux. Les gants ne remplacent pas le lavage des mains. Ils peuvent se déchirer ou être contaminés lors du retrait. Le lavage des mains est obligatoire avant ET après le port de gants."
     },
     {
      "fr": "À quoi sert l'échelle de Braden en milieu de soins ?",
      "en": "À quoi sert l'échelle de Braden en milieu de soins ?",
      "choices": [
       {
        "fr": "Évaluer l'intensité de la douleur postopératoire",
        "en": "Évaluer l'intensité de la douleur postopératoire"
       },
       {
        "fr": "Évaluer le risque d'escarre selon 6 facteurs : mobilité, activité, sensibilité, humidité, nutrition et friction",
        "en": "Évaluer le risque d'escarre selon 6 facteurs : mobilité, activité, sensibilité, humidité, nutrition et friction",
        "correct": true
       },
       {
        "fr": "Mesurer le risque de chute chez la personne âgée",
        "en": "Mesurer le risque de chute chez la personne âgée"
       },
       {
        "fr": "Évaluer le niveau de conscience et l'orientation",
        "en": "Évaluer le niveau de conscience et l'orientation"
       }
      ],
      "explFr": "L'échelle de Braden (score de 6 à 23) évalue le risque de plaies de pression. Un score ≤ 18 indique un risque. Elle guide les décisions de prévention : repositionnement, surface de support, soins de peau et nutrition.",
      "explEn": "L'échelle de Braden (score de 6 à 23) évalue le risque de plaies de pression. Un score ≤ 18 indique un risque. Elle guide les décisions de prévention : repositionnement, surface de support, soins de peau et nutrition."
     },
     {
      "type": "tf",
      "fr": "Une personne apte a le droit de refuser un soin d'hygiène même si cela compromet sa propreté, à condition d'être informée des conséquences.",
      "en": "Une personne apte a le droit de refuser un soin d'hygiène même si cela compromet sa propreté, à condition d'être informée des conséquences.",
      "isTrue": true,
      "explFr": "Vrai. Le respect de l'autonomie et du consentement est fondamental. Un patient apte peut refuser des soins. Le soignant doit documenter le refus, aviser l'infirmière et proposer des alternatives, sans forcer le soin.",
      "explEn": "Vrai. Le respect de l'autonomie et du consentement est fondamental. Un patient apte peut refuser des soins. Le soignant doit documenter le refus, aviser l'infirmière et proposer des alternatives, sans forcer le soin."
     },
     {
      "fr": "Qu'est-ce que la position de Trendelenburg modifiée en soins infirmiers ?",
      "en": "Qu'est-ce que la position de Trendelenburg modifiée en soins infirmiers ?",
      "choices": [
       {
        "fr": "Patient en décubitus latéral avec genoux fléchis pour favoriser le sommeil",
        "en": "Patient en décubitus latéral avec genoux fléchis pour favoriser le sommeil"
       },
       {
        "fr": "Décubitus dorsal avec les jambes surélevées à 30-45°, utilisé pour améliorer le retour veineux",
        "en": "Décubitus dorsal avec les jambes surélevées à 30-45°, utilisé pour améliorer le retour veineux",
        "correct": true
       },
       {
        "fr": "Tête surélevée à 30-45° pour prévenir l'aspiration lors des repas",
        "en": "Tête surélevée à 30-45° pour prévenir l'aspiration lors des repas"
       },
       {
        "fr": "Position assise à 90° pour faciliter la respiration chez un patient dyspnéique",
        "en": "Position assise à 90° pour faciliter la respiration chez un patient dyspnéique"
       }
      ],
      "explFr": "La position de Trendelenburg modifiée (jambes surélevées, tête plate) favorise le retour veineux vers le cœur. Elle est utilisée notamment en cas de choc hypovolémique léger. Elle est contre-indiquée en cas d'hypertension intracrânienne.",
      "explEn": "La position de Trendelenburg modifiée (jambes surélevées, tête plate) favorise le retour veineux vers le cœur. Elle est utilisée notamment en cas de choc hypovolémique léger. Elle est contre-indiquée en cas d'hypertension intracrânienne."
     },
     {
      "type": "scenario",
      "fr": "Mme Ouellet, 77 ans, vous confie qu'elle ressent une envie urgente et soudaine d'uriner, et qu'elle n'arrive souvent pas à se retenir jusqu'aux toilettes.\n\nQuel type d'incontinence cette description correspond-elle ?",
      "en": "Mme Ouellet, 77 ans, vous confie qu'elle ressent une envie urgente et soudaine d'uriner, et qu'elle n'arrive souvent pas à se retenir jusqu'aux toilettes.\n\nQuel type d'incontinence cette description correspond-elle ?",
      "choices": [
       {
        "fr": "Incontinence de stress — survient lors d'efforts comme la toux ou l'éternuement",
        "en": "Incontinence de stress — survient lors d'efforts comme la toux ou l'éternuement"
       },
       {
        "fr": "Incontinence par regorgement — liée à une rétention urinaire chronique avec débordement",
        "en": "Incontinence par regorgement — liée à une rétention urinaire chronique avec débordement"
       },
       {
        "fr": "Incontinence par impériosité — envie urgente et incontrôlable, souvent liée à une hyperactivité vésicale",
        "en": "Incontinence par impériosité — envie urgente et incontrôlable, souvent liée à une hyperactivité vésicale",
        "correct": true
       },
       {
        "fr": "Incontinence fonctionnelle — difficulté à atteindre les toilettes à temps par manque de mobilité",
        "en": "Incontinence fonctionnelle — difficulté à atteindre les toilettes à temps par manque de mobilité"
       }
      ],
      "explFr": "L'incontinence par impériosité (ou urgenturie) est causée par une contraction involontaire du détrusor. Elle se distingue de l'incontinence de stress (effort physique) et de la fonctionnelle (mobilité). Elle peut être traitée par exercices vésicaux et médication.",
      "explEn": "L'incontinence par impériosité (ou urgenturie) est causée par une contraction involontaire du détrusor. Elle se distingue de l'incontinence de stress (effort physique) et de la fonctionnelle (mobilité). Elle peut être traitée par exercices vésicaux et médication."
     },
     {
      "fr": "Quelle est la mesure la plus efficace pour prévenir la transmission d'infections en milieu de soins ?",
      "en": "Quelle est la mesure la plus efficace pour prévenir la transmission d'infections en milieu de soins ?",
      "choices": [
       {
        "fr": "Porter des gants pour tout contact avec un patient",
        "en": "Porter des gants pour tout contact avec un patient"
       },
       {
        "fr": "Hygiène des mains systématique selon les 5 moments de l'OMS",
        "en": "Hygiène des mains systématique selon les 5 moments de l'OMS",
        "correct": true
       },
       {
        "fr": "Utiliser un masque chirurgical en tout temps lors des soins",
        "en": "Utiliser un masque chirurgical en tout temps lors des soins"
       },
       {
        "fr": "Désinfecter les surfaces entre chaque patient",
        "en": "Désinfecter les surfaces entre chaque patient"
       }
      ],
      "explFr": "L'hygiène des mains reste la mesure de prévention la plus efficace contre la transmission des infections nosocomiales, selon l'OMS et les CDC. Les autres mesures sont complémentaires mais non substituables.",
      "explEn": "L'hygiène des mains reste la mesure de prévention la plus efficace contre la transmission des infections nosocomiales, selon l'OMS et les CDC. Les autres mesures sont complémentaires mais non substituables."
     },
     {
      "fr": "Pourquoi prescrit-on des liquides épaissis aux patients dysphagiques ?",
      "en": "Pourquoi prescrit-on des liquides épaissis aux patients dysphagiques ?",
      "choices": [
       {
        "fr": "Pour augmenter leur apport calorique",
        "en": "Pour augmenter leur apport calorique"
       },
       {
        "fr": "Pour réduire la vitesse d'écoulement et diminuer le risque d'aspiration pulmonaire",
        "en": "Pour réduire la vitesse d'écoulement et diminuer le risque d'aspiration pulmonaire",
        "correct": true
       },
       {
        "fr": "Pour faciliter la digestion dans l'estomac",
        "en": "Pour faciliter la digestion dans l'estomac"
       },
       {
        "fr": "Pour compenser le manque de mastication",
        "en": "Pour compenser le manque de mastication"
       }
      ],
      "explFr": "La dysphagie expose au risque d'aspiration. Les liquides épaissis s'écoulent plus lentement, donnant plus de temps aux mécanismes de protection des voies respiratoires. Les niveaux de texture sont standardisés (IDDSI).",
      "explEn": "La dysphagie expose au risque d'aspiration. Les liquides épaissis s'écoulent plus lentement, donnant plus de temps aux mécanismes de protection des voies respiratoires. Les niveaux de texture sont standardisés (IDDSI)."
     },
     {
      "fr": "Comment vérifier la position d'une sonde nasogastrique après son installation ?",
      "en": "Comment vérifier la position d'une sonde nasogastrique après son installation ?",
      "choices": [
       {
        "fr": "En injectant de l'air et en auscultant le gargouillis gastrique seulement",
        "en": "En injectant de l'air et en auscultant le gargouillis gastrique seulement"
       },
       {
        "fr": "En vérifiant le pH des sécrétions aspirées (pH < 5,5 = gastrique) selon le protocole de l'établissement",
        "en": "En vérifiant le pH des sécrétions aspirées (pH < 5,5 = gastrique) selon le protocole de l'établissement",
        "correct": true
       },
       {
        "fr": "En demandant au patient s'il sent la sonde dans l'estomac",
        "en": "En demandant au patient s'il sent la sonde dans l'estomac"
       },
       {
        "fr": "En tirant légèrement sur la sonde et observant la résistance",
        "en": "En tirant légèrement sur la sonde et observant la résistance"
       }
      ],
      "explFr": "La méthode par auscultation seule est peu fiable. La méthode recommandée : pH < 5,5 des sécrétions aspirées ou confirmation radiologique pour les premières insertions. Toujours suivre le protocole de l'établissement.",
      "explEn": "La méthode par auscultation seule est peu fiable. La méthode recommandée : pH < 5,5 des sécrétions aspirées ou confirmation radiologique pour les premières insertions. Toujours suivre le protocole de l'établissement."
     },
     {
      "fr": "Quel est le principal objectif de la mobilisation précoce après une chirurgie ?",
      "en": "Quel est le principal objectif de la mobilisation précoce après une chirurgie ?",
      "choices": [
       {
        "fr": "Permettre au patient de regagner sa chambre plus rapidement",
        "en": "Permettre au patient de regagner sa chambre plus rapidement"
       },
       {
        "fr": "Prévenir les complications de l'immobilité : TVP, pneumonie, atrophie musculaire, constipation",
        "en": "Prévenir les complications de l'immobilité : TVP, pneumonie, atrophie musculaire, constipation",
        "correct": true
       },
       {
        "fr": "Diminuer les besoins en analgésiques postopératoires",
        "en": "Diminuer les besoins en analgésiques postopératoires"
       },
       {
        "fr": "Vérifier la stabilité hémodynamique à la marche",
        "en": "Vérifier la stabilité hémodynamique à la marche"
       }
      ],
      "explFr": "La levée précoce réduit le risque de thrombose, de pneumonie, d'atrophie musculaire et de constipation. Elle favorise aussi la récupération psychologique. C'est une priorité en soins postopératoires.",
      "explEn": "La levée précoce réduit le risque de thrombose, de pneumonie, d'atrophie musculaire et de constipation. Elle favorise aussi la récupération psychologique. C'est une priorité en soins postopératoires."
     },
     {
      "fr": "Lors d'un soin de stomie, quelle observation doit être IMMÉDIATEMENT signalée ?",
      "en": "Lors d'un soin de stomie, quelle observation doit être IMMÉDIATEMENT signalée ?",
      "choices": [
       {
        "fr": "Stomie légèrement proéminente et de couleur rosée",
        "en": "Stomie légèrement proéminente et de couleur rosée"
       },
       {
        "fr": "Stomie de couleur noire, violacée ou blanche",
        "en": "Stomie de couleur noire, violacée ou blanche",
        "correct": true
       },
       {
        "fr": "Stomie avec quelques sécrétions mucoïdes normales",
        "en": "Stomie avec quelques sécrétions mucoïdes normales"
       },
       {
        "fr": "Légère odeur lors du changement de poche",
        "en": "Légère odeur lors du changement de poche"
       }
      ],
      "explFr": "Une stomie noire, violacée ou blanche indique une ischémie ou nécrose — urgence chirurgicale. Une stomie saine est rose à rouge, humide et légèrement proéminente. Toute décoloration doit être signalée immédiatement.",
      "explEn": "Une stomie noire, violacée ou blanche indique une ischémie ou nécrose — urgence chirurgicale. Une stomie saine est rose à rouge, humide et légèrement proéminente. Toute décoloration doit être signalée immédiatement."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Quelle est la recommandation concernant les sondes urinaires à demeure ?",
      "en": "Quelle est la recommandation concernant les sondes urinaires à demeure ?",
      "choices": [
       {
        "fr": "Changer toutes les 48 heures systématiquement",
        "en": "Changer toutes les 48 heures systématiquement"
       },
       {
        "fr": "Réévaluer quotidiennement l'indication et retirer dès qu'elle n'est plus médicalement nécessaire",
        "en": "Réévaluer quotidiennement l'indication et retirer dès qu'elle n'est plus médicalement nécessaire",
        "correct": true
       },
       {
        "fr": "Elle peut rester en place indéfiniment si le patient est confortable",
        "en": "Elle peut rester en place indéfiniment si le patient est confortable"
       },
       {
        "fr": "Changer toutes les 2 semaines selon un calendrier fixe",
        "en": "Changer toutes les 2 semaines selon un calendrier fixe"
       }
      ],
      "explFr": "La sonde urinaire doit être retirée dès qu'elle n'est plus nécessaire pour prévenir les infections urinaires associées aux soins (IUAS). Une réévaluation quotidienne de l'indication est recommandée.",
      "explEn": "La sonde urinaire doit être retirée dès qu'elle n'est plus nécessaire pour prévenir les infections urinaires associées aux soins (IUAS). Une réévaluation quotidienne de l'indication est recommandée."
     },
     {
      "fr": "Quels soins sont nécessaires pour protéger les yeux d'un patient inconscient ?",
      "en": "Quels soins sont nécessaires pour protéger les yeux d'un patient inconscient ?",
      "choices": [
       {
        "fr": "Appliquer du soluté physiologique toutes les 4 heures seulement",
        "en": "Appliquer du soluté physiologique toutes les 4 heures seulement"
       },
       {
        "fr": "Nettoyer les sécrétions, humidifier régulièrement avec soluté physiologique et protéger les cornées avec gel lubrifiant ou pansements",
        "en": "Nettoyer les sécrétions, humidifier régulièrement avec soluté physiologique et protéger les cornées avec gel lubrifiant ou pansements",
        "correct": true
       },
       {
        "fr": "Appliquer des gouttes antibiotiques 3 fois par jour préventivement",
        "en": "Appliquer des gouttes antibiotiques 3 fois par jour préventivement"
       },
       {
        "fr": "Forcer l'ouverture et la fermeture des paupières toutes les 2 heures",
        "en": "Forcer l'ouverture et la fermeture des paupières toutes les 2 heures"
       }
      ],
      "explFr": "Un patient inconscient ne cligne pas des yeux, exposant la cornée à la sécheresse et aux lésions. Humidification régulière et protection des cornées avec gel lubrifiant ou pansements humides sont essentiels.",
      "explEn": "Un patient inconscient ne cligne pas des yeux, exposant la cornée à la sécheresse et aux lésions. Humidification régulière et protection des cornées avec gel lubrifiant ou pansements humides sont essentiels."
     },
     {
      "fr": "Quelle est la différence entre l'asepsie 'propre' et 'stérile' ?",
      "en": "Quelle est la différence entre l'asepsie 'propre' et 'stérile' ?",
      "choices": [
       {
        "fr": "Elles sont identiques, seule la terminologie diffère selon les établissements",
        "en": "Elles sont identiques, seule la terminologie diffère selon les établissements"
       },
       {
        "fr": "L'asepsie propre utilise du matériel désinfecté pour les soins courants ; l'asepsie stérile exige un matériel entièrement stérile pour les soins invasifs",
        "en": "L'asepsie propre utilise du matériel désinfecté pour les soins courants ; l'asepsie stérile exige un matériel entièrement stérile pour les soins invasifs",
        "correct": true
       },
       {
        "fr": "L'asepsie propre n'utilise pas de gants ; l'asepsie stérile en exige",
        "en": "L'asepsie propre n'utilise pas de gants ; l'asepsie stérile en exige"
       },
       {
        "fr": "L'asepsie propre est réservée aux patients infectés",
        "en": "L'asepsie propre est réservée aux patients infectés"
       }
      ],
      "explFr": "L'asepsie médicale (propre) réduit les micro-organismes (lavage des mains, gants propres). L'asepsie chirurgicale (stérile) élimine tous les micro-organismes (champs stériles, gants stériles) pour les soins invasifs.",
      "explEn": "L'asepsie médicale (propre) réduit les micro-organismes (lavage des mains, gants propres). L'asepsie chirurgicale (stérile) élimine tous les micro-organismes (champs stériles, gants stériles) pour les soins invasifs."
     },
     {
      "fr": "Comment réagir face à un patient qui tente de se lever sans aide malgré un risque de chute élevé ?",
      "en": "Comment réagir face à un patient qui tente de se lever sans aide malgré un risque de chute élevé ?",
      "choices": [
       {
        "fr": "L'attacher au lit pour sa sécurité immédiate",
        "en": "L'attacher au lit pour sa sécurité immédiate"
       },
       {
        "fr": "L'intercepter calmement, assurer sa sécurité, explorer son besoin et offrir de l'aide, puis aviser l'infirmière",
        "en": "L'intercepter calmement, assurer sa sécurité, explorer son besoin et offrir de l'aide, puis aviser l'infirmière",
        "correct": true
       },
       {
        "fr": "Le laisser faire pour respecter son autonomie et noter l'incident",
        "en": "Le laisser faire pour respecter son autonomie et noter l'incident"
       },
       {
        "fr": "Mettre les ridelles et partir chercher l'infirmière en le laissant seul",
        "en": "Mettre les ridelles et partir chercher l'infirmière en le laissant seul"
       }
      ],
      "explFr": "Sécurité prime mais autonomie doit être respectée. On sécurise immédiatement, explore le besoin (toilette, douleur, confusion), offre de l'aide et avise l'équipe pour réévaluer le plan de prévention des chutes.",
      "explEn": "Sécurité prime mais autonomie doit être respectée. On sécurise immédiatement, explore le besoin (toilette, douleur, confusion), offre de l'aide et avise l'équipe pour réévaluer le plan de prévention des chutes."
     },
     {
      "type": "tf",
      "fr": "On peut utiliser le même gant pour plusieurs soins sur le même patient si la zone est identique.",
      "en": "On peut utiliser le même gant pour plusieurs soins sur le même patient si la zone est identique.",
      "isTrue": false,
      "explFr": "Faux. Les gants doivent être changés entre chaque soin et entre les différentes régions du corps, même chez le même patient. Passer d'une zone souillée à une zone propre exige un nouveau gant.",
      "explEn": "Faux. Les gants doivent être changés entre chaque soin et entre les différentes régions du corps, même chez le même patient. Passer d'une zone souillée à une zone propre exige un nouveau gant."
     },
     {
      "type": "tf",
      "fr": "Un patient porteur d'une sonde urinaire devrait boire davantage de liquides (si toléré) pour prévenir les infections.",
      "en": "Un patient porteur d'une sonde urinaire devrait boire davantage de liquides (si toléré) pour prévenir les infections.",
      "isTrue": true,
      "explFr": "Vrai. Une bonne hydratation maintient un flux urinaire régulier qui dilue les bactéries et les évacue. Un apport de 1,5 à 2 L/jour est recommandé, sauf contre-indication médicale (IC, IRC).",
      "explEn": "Vrai. Une bonne hydratation maintient un flux urinaire régulier qui dilue les bactéries et les évacue. Un apport de 1,5 à 2 L/jour est recommandé, sauf contre-indication médicale (IC, IRC)."
     },
     {
      "type": "tf",
      "fr": "Le respect de la pudeur peut être sacrifié lors des soins d'hygiène si cela prend trop de temps.",
      "en": "Le respect de la pudeur peut être sacrifié lors des soins d'hygiène si cela prend trop de temps.",
      "isTrue": false,
      "explFr": "Faux. Le respect de la dignité, de l'intimité et de la pudeur est un droit fondamental. On ferme la porte, tire le rideau, expose seulement la zone nécessaire, et explique chaque geste — quel que soit le temps requis.",
      "explEn": "Faux. Le respect de la dignité, de l'intimité et de la pudeur est un droit fondamental. On ferme la porte, tire le rideau, expose seulement la zone nécessaire, et explique chaque geste — quel que soit le temps requis."
     },
     {
      "type": "scenario",
      "fr": "Mme Audet, 65 ans, post-chirurgie abdominale, n'a pas eu de selles depuis 5 jours et se plaint de ballonnements et de douleurs légères.\n\nQuelles actions prenez-vous ?",
      "en": "Mme Audet, 65 ans, post-chirurgie abdominale, n'a pas eu de selles depuis 5 jours et se plaint de ballonnements et de douleurs légères.\n\nQuelles actions prenez-vous ?",
      "choices": [
       {
        "fr": "Lui administrer un laxatif de votre choix sans en parler à l'infirmière",
        "en": "Lui administrer un laxatif de votre choix sans en parler à l'infirmière"
       },
       {
        "fr": "Documenter le transit, évaluer l'abdomen, aviser l'infirmière et encourager mobilisation et hydratation",
        "en": "Documenter le transit, évaluer l'abdomen, aviser l'infirmière et encourager mobilisation et hydratation",
        "correct": true
       },
       {
        "fr": "Rassurer la patiente que 5 jours sans selles est normal après une chirurgie",
        "en": "Rassurer la patiente que 5 jours sans selles est normal après une chirurgie"
       },
       {
        "fr": "Lui donner un suppositoire de glycérine immédiatement sans prescription",
        "en": "Lui donner un suppositoire de glycérine immédiatement sans prescription"
       }
      ],
      "explFr": "La constipation postopératoire est fréquente (anesthésie, opioïdes, immobilité). On documente, évalue (bruits intestinaux?), hydrate, mobilise et avise l'infirmière qui appliquera un protocole ou une prescription.",
      "explEn": "La constipation postopératoire est fréquente (anesthésie, opioïdes, immobilité). On documente, évalue (bruits intestinaux?), hydrate, mobilise et avise l'infirmière qui appliquera un protocole ou une prescription."
     },
     {
      "type": "scenario",
      "fr": "M. Moreau, 72 ans, porte une sonde urinaire. Vous remarquez que la poche de drainage repose sur le lit, à la hauteur de la vessie.\n\nQuel est le problème et comment le corrigez-vous ?",
      "en": "M. Moreau, 72 ans, porte une sonde urinaire. Vous remarquez que la poche de drainage repose sur le lit, à la hauteur de la vessie.\n\nQuel est le problème et comment le corrigez-vous ?",
      "choices": [
       {
        "fr": "Aucun problème, la hauteur de la poche n'a pas d'importance",
        "en": "Aucun problème, la hauteur de la poche n'a pas d'importance"
       },
       {
        "fr": "Risque de reflux urinaire vers la vessie — remettre la poche toujours en dessous du niveau vésical sans qu'elle touche le sol",
        "en": "Risque de reflux urinaire vers la vessie — remettre la poche toujours en dessous du niveau vésical sans qu'elle touche le sol",
        "correct": true
       },
       {
        "fr": "La poche doit être au niveau des épaules pour créer une pression positive",
        "en": "La poche doit être au niveau des épaules pour créer une pression positive"
       },
       {
        "fr": "La poche doit être fixée au lit quelle que soit sa hauteur",
        "en": "La poche doit être fixée au lit quelle que soit sa hauteur"
       }
      ],
      "explFr": "La poche doit toujours être EN DESSOUS du niveau de la vessie pour un écoulement par gravité. Si elle remonte → risque de reflux d'urine contaminée → infection urinaire. Elle ne doit pas non plus toucher le sol (contamination).",
      "explEn": "La poche doit toujours être EN DESSOUS du niveau de la vessie pour un écoulement par gravité. Si elle remonte → risque de reflux d'urine contaminée → infection urinaire. Elle ne doit pas non plus toucher le sol (contamination)."
     },
     {
      "fr": "Que signifie l'acronyme PQRSTU dans l'évaluation de la douleur ?",
      "en": "Que signifie l'acronyme PQRSTU dans l'évaluation de la douleur ?",
      "choices": [
       {
        "fr": "Palier, Qualité, Région, Sévérité, Traitement, Ultime cause",
        "en": "Palier, Qualité, Région, Sévérité, Traitement, Ultime cause"
       },
       {
        "fr": "Provocateur/Palliatif, Qualité, Région/Radiation, Sévérité, Temps, Understanding (impact)",
        "en": "Provocateur/Palliatif, Qualité, Région/Radiation, Sévérité, Temps, Understanding (impact)",
        "correct": true
       },
       {
        "fr": "Position, Quantité, Référence, Symptômes, Traitement, Unicité",
        "en": "Position, Quantité, Référence, Symptômes, Traitement, Unicité"
       },
       {
        "fr": "Prévention, Qualité de vie, Régulation, Soins, Temps, Urgence",
        "en": "Prévention, Qualité de vie, Régulation, Soins, Temps, Urgence"
       }
      ],
      "explFr": "PQRSTU est un outil mnémotechnique d'évaluation de la douleur : Provoque/Pallie (ce qui déclenche/soulage), Qualité (type), Région/Radiation, Sévérité (EVA 0-10), Temps (durée, fréquence), Understanding (impact sur la vie).",
      "explEn": "PQRSTU est un outil mnémotechnique d'évaluation de la douleur : Provoque/Pallie (ce qui déclenche/soulage), Qualité (type), Région/Radiation, Sévérité (EVA 0-10), Temps (durée, fréquence), Understanding (impact sur la vie)."
     }
    ]
   }
  ]
 },
 {
  "id": "plaies",
  "order": 5,
  "title_fr": "Plaies & Prélèvements",
  "title_en": "Wounds & Specimen Collection",
  "icon": "🩸",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Lors d'un changement de pansement, dans quel sens nettoie-t-on la plaie ?",
      "en": "When changing a dressing, in which direction should you clean the wound?",
      "choices": [
       {
        "fr": "De l'extérieur vers le centre",
        "en": "From the outside toward the center"
       },
       {
        "fr": "Du centre vers la périphérie",
        "en": "From the center toward the periphery",
        "correct": true
       },
       {
        "fr": "En mouvements circulaires de n'importe quel sens",
        "en": "In circular motions in any direction"
       },
       {
        "fr": "Le sens n'a pas d'importance",
        "en": "Direction does not matter"
       }
      ],
      "explFr": "On nettoie TOUJOURS du centre (zone la plus propre) vers la périphérie (zone la plus contaminée) pour éviter de ramener des germes vers la plaie.",
      "explEn": "Always clean from the center (cleanest area) toward the periphery (most contaminated area) to avoid bringing germs back into the wound."
     },
     {
      "type": "tf",
      "fr": "Après une blessure par piqûre d'aiguille, la première étape est de mettre un garrot.",
      "en": "After a needlestick injury, the first step is to apply a tourniquet.",
      "isTrue": false,
      "explFr": "Faux. La première étape est de LAISSER SAIGNER légèrement, puis laver abondamment à l'eau courante et au savon pendant 15 minutes. Ensuite signaler à l'employeur et consulter.",
      "explEn": "False. The first step is to LET IT BLEED slightly, then wash thoroughly with running water and soap for 15 minutes. Then report it to your employer and seek medical attention."
     },
     {
      "type": "scenario",
      "fr": "Vous effectuez une ponction veineuse. Dès que l'aiguille entre, le patient pâlit, transpire et dit se sentir partir.\n\nQuelle est votre action immédiate ?",
      "en": "You are performing a venipuncture. As soon as the needle enters, the patient becomes pale, sweats, and says they feel like they're going to faint.\n\nWhat is your immediate action?",
      "choices": [
       {
        "fr": "Terminer le prélèvement rapidement, puis allonger le patient une fois la procédure complétée",
        "en": "Continue quickly to finish the blood draw"
       },
       {
        "fr": "Retirer l'aiguille, allonger le patient, surveiller et appeler à l'aide",
        "en": "Remove the needle, lay the patient down, monitor, and call for help",
        "correct": true
       },
       {
        "fr": "Interrompre le prélèvement, lui donner de l'eau froide et réévaluer dans quelques minutes",
        "en": "Give them a glass of juice"
       },
       {
        "fr": "Maintenir la position, lui parler pour maintenir son attention et évaluer son état de conscience",
        "en": "Continue and talk to them to distract their attention"
       }
      ],
      "explFr": "Malaise vagal : retirer immédiatement l'aiguille, mettre le patient en position de sécurité (allongé, jambes surélevées), surveiller les SV et appeler si ne récupère pas rapidement.",
      "explEn": "Vasovagal reaction: immediately remove the needle, place the patient in a safe position (lying down, legs elevated), monitor vital signs, and call for help if they do not recover quickly."
     },
     {
      "fr": "Qu'est-ce qu'un prélèvement urinaire 'en mi-jet' ?",
      "en": "What is a 'midstream' urine specimen?",
      "choices": [
       {
        "fr": "Prélever les premières urines du matin",
        "en": "Collecting the first morning urine"
       },
       {
        "fr": "Laisser couler le 1er jet, puis recueillir dans le contenant stérile",
        "en": "Letting the first stream pass, then collecting in the sterile container",
        "correct": true
       },
       {
        "fr": "Prélever par sonde urinaire uniquement",
        "en": "Collecting via urinary catheter only"
       },
       {
        "fr": "Recueillir toute la miction dans un contenant propre",
        "en": "Collecting the entire void in a clean container"
       }
      ],
      "explFr": "Le premier jet élimine les contaminants de l'urètre. Le mi-jet recueilli dans un contenant stérile donne un résultat fiable pour les cultures urinaires.",
      "explEn": "The first stream flushes out contaminants from the urethra. The midstream sample collected in a sterile container gives a reliable result for urine cultures."
     },
     {
      "type": "tf",
      "fr": "On peut recapuchonner une aiguille usagée si on le fait avec précaution.",
      "en": "A used needle can be recapped if done carefully.",
      "isTrue": false,
      "explFr": "Faux. Il ne faut JAMAIS recapuchonner une aiguille à deux mains. Si on doit le faire, utiliser la technique à une main (scoop) ou une pince. L'aiguille doit aller directement dans le contenant rigide.",
      "explEn": "False. A used needle must NEVER be recapped using two hands. If recapping is necessary, use the one-handed (scoop) technique or forceps. The needle should go directly into the rigid sharps container."
     },
     {
      "type": "scenario",
      "fr": "Lors du soin d'une plaie chirurgicale de Mme Fortin, vous observez un exsudat verdâtre abondant avec une odeur nauséabonde.\n\nQue signifie cette observation et quelle est votre action ?",
      "en": "While caring for Mrs. Fortin's surgical wound, you observe abundant greenish exudate with a foul odor.\n\nWhat does this observation mean and what is your action?",
      "choices": [
       {
        "fr": "Signe de cicatrisation active par lyse tissulaire — noter l'aspect et continuer le soin habituel",
        "en": "This is normal post-op — continue the usual care"
       },
       {
        "fr": "Signes d'infection probable — aviser l'infirmière, documenter et faire un prélèvement si prescrit",
        "en": "Probable signs of infection — notify the nurse, document (color, odor, amount), and collect a specimen if ordered",
        "correct": true
       },
       {
        "fr": "Appliquer une solution antiseptique directement sur la plaie avant de refermer le pansement",
        "en": "Clean more vigorously with hydrogen peroxide"
       },
       {
        "fr": "Nettoyer la plaie à l'eau oxygénée puis changer le pansement plus fréquemment",
        "en": "Close the dressing quickly without disturbing the wound"
       }
      ],
      "explFr": "Exsudat vert/purulent + odeur = infection suspectée. Documenter avec précision (CÉDAT : Couleur, Exsudat, Douleur, Aspect, Taille), aviser l'infirmière et attendre les directives avant de modifier le traitement.",
      "explEn": "Green/purulent exudate + odor = suspected infection. Document precisely (color, exudate, pain, appearance, size), notify the nurse, and wait for instructions before changing the treatment."
     },
     {
      "fr": "Comment reconnaître une phlébite (TVP) au mollet ?",
      "en": "How do you recognize phlebitis (DVT) in the calf?",
      "choices": [
       {
        "fr": "Peau froide, pâle, engourdissement",
        "en": "Cold, pale skin, numbness"
       },
       {
        "fr": "Douleur, rougeur, chaleur, gonflement du mollet",
        "en": "Pain, redness, warmth, swelling of the calf",
        "correct": true
       },
       {
        "fr": "Éruption cutanée généralisée",
        "en": "Generalized skin rash"
       },
       {
        "fr": "Douleur thoracique uniquement",
        "en": "Chest pain only"
       }
      ],
      "explFr": "Les 4 signes classiques de TVP : douleur, rougeur, chaleur, œdème. Le signe de Homans (douleur au mollet à la dorsiflexion du pied) est peu fiable. Risque d'embolie pulmonaire = urgence.",
      "explEn": "The 4 classic signs of DVT: pain, redness, warmth, edema. Homans' sign (calf pain on dorsiflexion of the foot) is unreliable. Risk of pulmonary embolism = emergency."
     },
     {
      "fr": "Quels sont les signes locaux classiques d'une infection de plaie ?",
      "en": "What are the classic local signs of a wound infection?",
      "choices": [
       {
        "fr": "Pâleur, froideur, engourdissement",
        "en": "Pallor, coldness, numbness"
       },
       {
        "fr": "Chaleur, rougeur, douleur, gonflement, exsudat",
        "en": "Warmth, redness, pain, swelling, exudate",
        "correct": true
       },
       {
        "fr": "Démangeaison légère uniquement",
        "en": "Mild itching only"
       },
       {
        "fr": "Cicatrice blanche et plate",
        "en": "A flat white scar"
       }
      ],
      "explFr": "Les signes cardinaux d'infection sont : chaleur, rougeur (érythème), douleur, gonflement (œdème) et souvent un exsudat purulent avec ou sans odeur.",
      "explEn": "The cardinal signs of infection are: warmth, redness (erythema), pain, swelling (edema), and often purulent exudate with or without odor."
     },
     {
      "type": "tf",
      "fr": "Les précautions universelles s'appliquent uniquement aux patients connus pour avoir une infection.",
      "en": "Standard precautions apply only to patients known to have an infection.",
      "isTrue": false,
      "explFr": "Faux. Les précautions universelles (port de gants, lavage des mains, etc.) s'appliquent à TOUS les patients et tous les liquides biologiques, car on ne peut jamais être certain de l'absence d'infection.",
      "explEn": "False. Standard precautions (wearing gloves, hand hygiene, etc.) apply to ALL patients and all body fluids, since you can never be certain of the absence of infection."
     },
     {
      "type": "scenario",
      "fr": "Vous vous piquez accidentellement avec une aiguille ayant servi à un patient, lors de l'élimination du matériel.\n\nQuelle est la première étape à suivre ?",
      "en": "You accidentally prick yourself with a needle that was used on a patient while disposing of equipment.\n\nWhat is the first step to follow?",
      "choices": [
       {
        "fr": "Appuyer fortement sur la plaie pour stopper le saignement, désinfecter à l'alcool et signaler en fin de quart",
        "en": "Continue working and mention it at the end of the shift"
       },
       {
        "fr": "Faire saigner légèrement, laver à l'eau et au savon, puis signaler immédiatement",
        "en": "Let it bleed slightly, wash with soap and water, then report immediately",
        "correct": true
       },
       {
        "fr": "Appliquer un désinfectant iodé, mettre un pansement et remplir le rapport en fin de quart",
        "en": "Disinfect with alcohol and say nothing"
       },
       {
        "fr": "Laver à l'eau et au savon, mettre un pansement et surveiller les symptômes dans les prochaines semaines",
        "en": "Apply a bandage and forget about the incident"
       }
      ],
      "explFr": "Après une piqûre accidentelle : laisser saigner un peu, laver abondamment à l'eau et au savon, puis signaler IMMÉDIATEMENT à un supérieur pour évaluation du risque et suivi médical (possibilité de prophylaxie).",
      "explEn": "After an accidental needlestick: let it bleed a little, wash thoroughly with soap and water, then report IMMEDIATELY to a supervisor for risk assessment and medical follow-up (possibility of prophylaxis)."
     },
     {
      "fr": "Une plaie qui atteint seulement l'épiderme et le derme, sans exposer les tissus sous-jacents, est classée :",
      "en": "A wound that affects only the epidermis and dermis, without exposing underlying tissue, is classified as:",
      "choices": [
       {
        "fr": "Plaie superficielle",
        "en": "A superficial wound",
        "correct": true
       },
       {
        "fr": "Plaie profonde",
        "en": "A deep wound"
       },
       {
        "fr": "Plaie pénétrante",
        "en": "A penetrating wound"
       },
       {
        "fr": "Plaie chronique uniquement",
        "en": "A chronic wound only"
       }
      ],
      "explFr": "Une plaie superficielle touche l'épiderme et parfois le derme, sans atteindre les tissus plus profonds (muscle, os, organes).",
      "explEn": "A superficial wound affects the epidermis and sometimes the dermis, without reaching deeper tissues (muscle, bone, organs)."
     },
     {
      "type": "tf",
      "fr": "Il faut toujours nettoyer une plaie en frottant vigoureusement pour éliminer les bactéries.",
      "en": "Il faut toujours nettoyer une plaie en frottant vigoureusement pour éliminer les bactéries.",
      "isTrue": false,
      "explFr": "Faux. Un nettoyage trop vigoureux peut endommager les tissus en cours de cicatrisation. On utilise une irrigation douce avec de la solution saline ou de l'eau stérile, en suivant les directives du protocole.",
      "explEn": "Faux. Un nettoyage trop vigoureux peut endommager les tissus en cours de cicatrisation. On utilise une irrigation douce avec de la solution saline ou de l'eau stérile, en suivant les directives du protocole."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Que signifie l'acronyme CÉDAT utilisé pour décrire une plaie ?",
      "en": "Que signifie l'acronyme CÉDAT utilisé pour décrire une plaie ?",
      "choices": [
       {
        "fr": "Couleur, Exsudat, Douleur, Aspect, Taille",
        "en": "Couleur, Exsudat, Douleur, Aspect, Taille",
        "correct": true
       },
       {
        "fr": "Cicatrice, Eczéma, Dermite, Abcès, Trauma",
        "en": "Cicatrice, Eczéma, Dermite, Abcès, Trauma"
       },
       {
        "fr": "Contracture, Érythème, Déhiscence, Adhérence, Tunnelement",
        "en": "Contracture, Érythème, Déhiscence, Adhérence, Tunnelement"
       },
       {
        "fr": "Chronique, Extensive, Draine, Anoxique, Tissulaire",
        "en": "Chronique, Extensive, Draine, Anoxique, Tissulaire"
       }
      ],
      "explFr": "CÉDAT (Couleur, Exsudat, Douleur, Aspect, Taille) est un outil standardisé pour décrire et documenter l'évolution d'une plaie de façon objective et reproductible.",
      "explEn": "CÉDAT (Couleur, Exsudat, Douleur, Aspect, Taille) est un outil standardisé pour décrire et documenter l'évolution d'une plaie de façon objective et reproductible."
     },
     {
      "type": "scenario",
      "fr": "Lors du soin d'une plaie de pression au talon de M. Hébert, vous observez une zone noire, dure et sèche, bien délimitée.\n\nComment qualifiez-vous ce tissu et quoi faire ?",
      "en": "Lors du soin d'une plaie de pression au talon de M. Hébert, vous observez une zone noire, dure et sèche, bien délimitée.\n\nComment qualifiez-vous ce tissu et quoi faire ?",
      "choices": [
       {
        "fr": "Tissu de granulation sain — laisser tel quel",
        "en": "Tissu de granulation sain — laisser tel quel"
       },
       {
        "fr": "Escarre sèche (nécrose) — documenter, mesurer et aviser l'infirmière pour ordonnance de débridement",
        "en": "Escarre sèche (nécrose) — documenter, mesurer et aviser l'infirmière pour ordonnance de débridement",
        "correct": true
       },
       {
        "fr": "Croûte normale — enlever avec une compresse",
        "en": "Croûte normale — enlever avec une compresse"
       },
       {
        "fr": "Hématome — appliquer du froid",
        "en": "Hématome — appliquer du froid"
       }
      ],
      "explFr": "Une zone noire, dure et sèche est une nécrose sèche (escarre). Elle doit être documentée avec précision et le médecin ou l'infirmière doit évaluer si un débridement est indiqué. Ne jamais retirer seul sans ordonnance.",
      "explEn": "Une zone noire, dure et sèche est une nécrose sèche (escarre). Elle doit être documentée avec précision et le médecin ou l'infirmière doit évaluer si un débridement est indiqué. Ne jamais retirer seul sans ordonnance."
     },
     {
      "fr": "Quels sont les 4 stades de classification des plaies de pression (escarres) ?",
      "en": "Quels sont les 4 stades de classification des plaies de pression (escarres) ?",
      "choices": [
       {
        "fr": "Stade 1 (rougeur), Stade 2 (desquamation), Stade 3 (ulcération), Stade 4 (nécrose étendue)",
        "en": "Stade 1 (rougeur), Stade 2 (desquamation), Stade 3 (ulcération), Stade 4 (nécrose étendue)"
       },
       {
        "fr": "Stade 1 (érythème), Stade 2 (épiderme/derme), Stade 3 (tissu sous-cutané), Stade 4 (os/muscle)",
        "en": "Stade 1 (érythème), Stade 2 (épiderme/derme), Stade 3 (tissu sous-cutané), Stade 4 (os/muscle)",
        "correct": true
       },
       {
        "fr": "Stade A (superficielle), Stade B (dermique), Stade C (hypodermique), Stade D (osseuse)",
        "en": "Stade A (superficielle), Stade B (dermique), Stade C (hypodermique), Stade D (osseuse)"
       },
       {
        "fr": "Grade 1 (légère), Grade 2 (modérée), Grade 3 (profonde), Grade 4 (sévère avec perte tissulaire)",
        "en": "Grade 1 (légère), Grade 2 (modérée), Grade 3 (profonde), Grade 4 (sévère avec perte tissulaire)"
       }
      ],
      "explFr": "Classification internationale : Stade 1 = rougeur non blanchissante. Stade 2 = perte partielle de peau. Stade 3 = perte totale jusqu'au tissu sous-cutané. Stade 4 = perte jusqu'à l'os, muscle ou tendon.",
      "explEn": "Classification internationale : Stade 1 = rougeur non blanchissante. Stade 2 = perte partielle de peau. Stade 3 = perte totale jusqu'au tissu sous-cutané. Stade 4 = perte jusqu'à l'os, muscle ou tendon."
     },
     {
      "fr": "En quoi consiste la technique de prélèvement par écouvillonnage ?",
      "en": "En quoi consiste la technique de prélèvement par écouvillonnage ?",
      "choices": [
       {
        "fr": "Insertion d'une sonde dans la plaie pour mesurer sa profondeur en conditions stériles",
        "en": "Insertion d'une sonde dans la plaie pour mesurer sa profondeur en conditions stériles"
       },
       {
        "fr": "Frottis d'une plaie ou d'une muqueuse avec un écouvillon stérile pour culture bactérienne",
        "en": "Frottis d'une plaie ou d'une muqueuse avec un écouvillon stérile pour culture bactérienne",
        "correct": true
       },
       {
        "fr": "Prélèvement de sang capillaire par piqûre au bout du doigt",
        "en": "Prélèvement de sang capillaire par piqûre au bout du doigt"
       },
       {
        "fr": "Irrigation de la plaie avec une solution saline pour en diluer le contenu",
        "en": "Irrigation de la plaie avec une solution saline pour en diluer le contenu"
       }
      ],
      "explFr": "L'écouvillonnage (swab) consiste à faire rouler un écouvillon stérile sur la zone à analyser pour recueillir des sécrétions. Il est utilisé pour identifier le germe responsable d'une infection de plaie ou de muqueuse.",
      "explEn": "L'écouvillonnage (swab) consiste à faire rouler un écouvillon stérile sur la zone à analyser pour recueillir des sécrétions. Il est utilisé pour identifier le germe responsable d'une infection de plaie ou de muqueuse."
     },
     {
      "type": "tf",
      "fr": "Une plaie qui cicatrise 'par première intention' se referme sans sutures, par simple rapprochement naturel des bords.",
      "en": "Une plaie qui cicatrise 'par première intention' se referme sans sutures, par simple rapprochement naturel des bords.",
      "isTrue": false,
      "explFr": "Faux. La cicatrisation par première intention nécessite que les bords soient rapprochés et maintenus par sutures, agrafes ou stéristrips. La cicatrisation par deuxième intention se fait sans fermeture chirurgicale, depuis le fond de la plaie.",
      "explEn": "Faux. La cicatrisation par première intention nécessite que les bords soient rapprochés et maintenus par sutures, agrafes ou stéristrips. La cicatrisation par deuxième intention se fait sans fermeture chirurgicale, depuis le fond de la plaie."
     },
     {
      "fr": "Que signifie une nécrose 'humide' (ou molle) dans une plaie ?",
      "en": "Que signifie une nécrose 'humide' (ou molle) dans une plaie ?",
      "choices": [
       {
        "fr": "Tissu mort, sec et noir bien délimité, protégeant les structures profondes",
        "en": "Tissu mort, sec et noir bien délimité, protégeant les structures profondes"
       },
       {
        "fr": "Tissu nécrotique mou, de couleur jaune ou verte, humide et souvent malodorant — signe de colonisation bactérienne",
        "en": "Tissu nécrotique mou, de couleur jaune ou verte, humide et souvent malodorant — signe de colonisation bactérienne",
        "correct": true
       },
       {
        "fr": "Tissu de granulation rouge vif et humide, indiquant une bonne cicatrisation active",
        "en": "Tissu de granulation rouge vif et humide, indiquant une bonne cicatrisation active"
       },
       {
        "fr": "Croûte sérosanguinolente qui se forme normalement en surface d'une plaie récente",
        "en": "Croûte sérosanguinolente qui se forme normalement en surface d'une plaie récente"
       }
      ],
      "explFr": "La nécrose humide (slough) est un tissu mort, mou, jaunâtre ou verdâtre, souvent colonisé par des bactéries. Elle doit être retirée par débridement pour permettre la cicatrisation. À distinguer de la nécrose sèche (escarre noire).",
      "explEn": "La nécrose humide (slough) est un tissu mort, mou, jaunâtre ou verdâtre, souvent colonisé par des bactéries. Elle doit être retirée par débridement pour permettre la cicatrisation. À distinguer de la nécrose sèche (escarre noire)."
     },
     {
      "fr": "Comment identifier correctement un patient avant un prélèvement sanguin ?",
      "en": "Comment identifier correctement un patient avant un prélèvement sanguin ?",
      "choices": [
       {
        "fr": "Demander le nom du patient et confirmer avec le numéro de chambre affiché",
        "en": "Demander le nom du patient et confirmer avec le numéro de chambre affiché"
       },
       {
        "fr": "Demander le nom complet et la date de naissance, et vérifier le bracelet d'identification",
        "en": "Demander le nom complet et la date de naissance, et vérifier le bracelet d'identification",
        "correct": true
       },
       {
        "fr": "Se fier à la liste de tournée de soins et au lit occupé",
        "en": "Se fier à la liste de tournée de soins et au lit occupé"
       },
       {
        "fr": "Demander à un membre de la famille de confirmer l'identité du patient",
        "en": "Demander à un membre de la famille de confirmer l'identité du patient"
       }
      ],
      "explFr": "L'identification active à deux identifiants (nom complet + date de naissance) avec vérification du bracelet est la norme de sécurité. Évite les erreurs d'identité, particulièrement dans les unités avec des noms similaires.",
      "explEn": "L'identification active à deux identifiants (nom complet + date de naissance) avec vérification du bracelet est la norme de sécurité. Évite les erreurs d'identité, particulièrement dans les unités avec des noms similaires."
     },
     {
      "type": "scenario",
      "fr": "Lors d'un changement de pansement, vous réalisez avoir retiré le pansement souillé sans mettre de gants.\n\nQuelle est la conséquence potentielle et comment agissez-vous ?",
      "en": "Lors d'un changement de pansement, vous réalisez avoir retiré le pansement souillé sans mettre de gants.\n\nQuelle est la conséquence potentielle et comment agissez-vous ?",
      "choices": [
       {
        "fr": "Aucune conséquence clinique si vous vous lavez les mains immédiatement après",
        "en": "Aucune conséquence clinique si vous vous lavez les mains immédiatement après"
       },
       {
        "fr": "Risque d'exposition à des agents pathogènes — lavage immédiat des mains, port de gants et poursuite du soin en conditions sécuritaires",
        "en": "Risque d'exposition à des agents pathogènes — lavage immédiat des mains, port de gants et poursuite du soin en conditions sécuritaires",
        "correct": true
       },
       {
        "fr": "Arrêter définitivement le soin et appeler l'infirmière pour qu'elle le reprenne",
        "en": "Arrêter définitivement le soin et appeler l'infirmière pour qu'elle le reprenne"
       },
       {
        "fr": "Continuer rapidement le soin et signaler l'incident en fin de quart",
        "en": "Continuer rapidement le soin et signaler l'incident en fin de quart"
       }
      ],
      "explFr": "Le contact avec un pansement souillé sans gants expose aux agents pathogènes (bactéries, VHB, VIH). Il faut laver les mains immédiatement et abondamment, mettre des gants pour continuer, et documenter l'incident selon le protocole de l'établissement.",
      "explEn": "Le contact avec un pansement souillé sans gants expose aux agents pathogènes (bactéries, VHB, VIH). Il faut laver les mains immédiatement et abondamment, mettre des gants pour continuer, et documenter l'incident selon le protocole de l'établissement."
     },
     {
      "fr": "Comment classe-t-on une brûlure du 2e degré profond ?",
      "en": "Comment classe-t-on une brûlure du 2e degré profond ?",
      "choices": [
       {
        "fr": "Atteint uniquement l'épiderme — rouge vif, douloureux, sans cloques",
        "en": "Atteint uniquement l'épiderme — rouge vif, douloureux, sans cloques"
       },
       {
        "fr": "Atteint le derme profond — cloques, douleur moindre (nerfs détruits), risque de cicatrice",
        "en": "Atteint le derme profond — cloques, douleur moindre (nerfs détruits), risque de cicatrice",
        "correct": true
       },
       {
        "fr": "Atteint les muscles et les os — noir, insensible, nécessite amputation",
        "en": "Atteint les muscles et les os — noir, insensible, nécessite amputation"
       },
       {
        "fr": "Brûlure chimique uniquement sans atteinte thermique",
        "en": "Brûlure chimique uniquement sans atteinte thermique"
       }
      ],
      "explFr": "Brûlure 2e degré profond : atteint le derme profond, cloques blanches ou tachetées, douleur réduite (terminaisons nerveuses détruites), risque de cicatrice. 3e degré : toute l'épaisseur, insensible, nécessite greffe.",
      "explEn": "Brûlure 2e degré profond : atteint le derme profond, cloques blanches ou tachetées, douleur réduite (terminaisons nerveuses détruites), risque de cicatrice. 3e degré : toute l'épaisseur, insensible, nécessite greffe."
     },
     {
      "fr": "À quoi sert le tube de prélèvement à bouchon mauve (EDTA) ?",
      "en": "À quoi sert le tube de prélèvement à bouchon mauve (EDTA) ?",
      "choices": [
       {
        "fr": "Analyse biochimique (glycémie, électrolytes)",
        "en": "Analyse biochimique (glycémie, électrolytes)"
       },
       {
        "fr": "Hémogramme (NFS) — l'EDTA empêche la coagulation et préserve les cellules sanguines",
        "en": "Hémogramme (NFS) — l'EDTA empêche la coagulation et préserve les cellules sanguines",
        "correct": true
       },
       {
        "fr": "Coagulation (INR, TCA) — l'EDTA stabilise les facteurs de coagulation",
        "en": "Coagulation (INR, TCA) — l'EDTA stabilise les facteurs de coagulation"
       },
       {
        "fr": "Culture bactérienne (hémoculture)",
        "en": "Culture bactérienne (hémoculture)"
       }
      ],
      "explFr": "Le tube mauve (EDTA) est utilisé pour la numération formule sanguine (NFS), les réticulocytes et l'HbA1c. L'EDTA chélate le calcium et empêche la coagulation tout en préservant les cellules.",
      "explEn": "Le tube mauve (EDTA) est utilisé pour la numération formule sanguine (NFS), les réticulocytes et l'HbA1c. L'EDTA chélate le calcium et empêche la coagulation tout en préservant les cellules."
     },
     {
      "fr": "Qu'est-ce qu'un tunnel dans une plaie et comment est-il documenté ?",
      "en": "Qu'est-ce qu'un tunnel dans une plaie et comment est-il documenté ?",
      "choices": [
       {
        "fr": "Une plaie très large en surface mais peu profonde",
        "en": "Une plaie très large en surface mais peu profonde"
       },
       {
        "fr": "Un trajet sous-cutané partant de la plaie, mesuré avec une sonde et documenté par direction horaire",
        "en": "Un trajet sous-cutané partant de la plaie, mesuré avec une sonde et documenté par direction horaire",
        "correct": true
       },
       {
        "fr": "Une nécrose sèche au fond de la plaie empêchant la cicatrisation",
        "en": "Une nécrose sèche au fond de la plaie empêchant la cicatrisation"
       },
       {
        "fr": "Un exsudat abondant qui creuse la plaie par macération",
        "en": "Un exsudat abondant qui creuse la plaie par macération"
       }
      ],
      "explFr": "Un tunnel est un trajet sous-cutané exploré avec une sonde stérile. On mesure sa profondeur et documente sa direction (ex. tunnel à 3h, 4 cm). Il comporte un risque élevé d'infection et nécessite un suivi rigoureux.",
      "explEn": "Un tunnel est un trajet sous-cutané exploré avec une sonde stérile. On mesure sa profondeur et documente sa direction (ex. tunnel à 3h, 4 cm). Il comporte un risque élevé d'infection et nécessite un suivi rigoureux."
     },
     {
      "fr": "Quels sont les signes d'une thrombophlébite au site d'une perfusion IV ?",
      "en": "Quels sont les signes d'une thrombophlébite au site d'une perfusion IV ?",
      "choices": [
       {
        "fr": "Peau froide, pâle et engourdissement autour du site",
        "en": "Peau froide, pâle et engourdissement autour du site"
       },
       {
        "fr": "Rougeur, chaleur, douleur et cordon induré le long du trajet veineux",
        "en": "Rougeur, chaleur, douleur et cordon induré le long du trajet veineux",
        "correct": true
       },
       {
        "fr": "Gonflement important sans changement de couleur ni de température",
        "en": "Gonflement important sans changement de couleur ni de température"
       },
       {
        "fr": "Déconnexion spontanée de la perfusion",
        "en": "Déconnexion spontanée de la perfusion"
       }
      ],
      "explFr": "La phlébite IV : douleur, rougeur, chaleur et parfois un cordon induré (veineux) palpable. Le cathéter doit être retiré immédiatement, une compresse chaude appliquée et l'infirmière avisée.",
      "explEn": "La phlébite IV : douleur, rougeur, chaleur et parfois un cordon induré (veineux) palpable. Le cathéter doit être retiré immédiatement, une compresse chaude appliquée et l'infirmière avisée."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "À quel moment retire-t-on généralement les points de suture d'une plaie abdominale ?",
      "en": "À quel moment retire-t-on généralement les points de suture d'une plaie abdominale ?",
      "choices": [
       {
        "fr": "2 à 3 jours postopératoires",
        "en": "2 à 3 jours postopératoires"
       },
       {
        "fr": "5 à 7 jours postopératoires",
        "en": "5 à 7 jours postopératoires"
       },
       {
        "fr": "7 à 14 jours selon la localisation et l'évolution",
        "en": "7 à 14 jours selon la localisation et l'évolution",
        "correct": true
       },
       {
        "fr": "30 jours pour toutes les plaies abdominales",
        "en": "30 jours pour toutes les plaies abdominales"
       }
      ],
      "explFr": "Le délai dépend de la localisation et de la tension : visage (3-5 j), cuir chevelu (5-7 j), tronc/abdomen (7-14 j), membres inférieurs (10-14 j). La plaie doit être bien fermée et non infectée.",
      "explEn": "Le délai dépend de la localisation et de la tension : visage (3-5 j), cuir chevelu (5-7 j), tronc/abdomen (7-14 j), membres inférieurs (10-14 j). La plaie doit être bien fermée et non infectée."
     },
     {
      "fr": "Quelle est la méthode de premier choix pour contrôler une hémorragie externe importante ?",
      "en": "Quelle est la méthode de premier choix pour contrôler une hémorragie externe importante ?",
      "choices": [
       {
        "fr": "Appliquer un garrot immédiatement sur n'importe quelle blessure",
        "en": "Appliquer un garrot immédiatement sur n'importe quelle blessure"
       },
       {
        "fr": "Appliquer une pression directe ferme et continue sur la plaie avec un pansement propre",
        "en": "Appliquer une pression directe ferme et continue sur la plaie avec un pansement propre",
        "correct": true
       },
       {
        "fr": "Rincer abondamment à l'eau pour voir l'origine du saignement",
        "en": "Rincer abondamment à l'eau pour voir l'origine du saignement"
       },
       {
        "fr": "Surélever le membre seul sans pression directe",
        "en": "Surélever le membre seul sans pression directe"
       }
      ],
      "explFr": "La pression directe ferme et continue (minimum 5-10 min) est le premier traitement. Ajouter des compresses sans retirer les premières. Le garrot est réservé aux hémorragies de membres ingérables par pression.",
      "explEn": "La pression directe ferme et continue (minimum 5-10 min) est le premier traitement. Ajouter des compresses sans retirer les premières. Le garrot est réservé aux hémorragies de membres ingérables par pression."
     },
     {
      "fr": "Qu'est-ce que la macération péri-lésionnelle et comment la prévient-on ?",
      "en": "Qu'est-ce que la macération péri-lésionnelle et comment la prévient-on ?",
      "choices": [
       {
        "fr": "Accumulation de dépôts calciques autour d'une plaie chronique",
        "en": "Accumulation de dépôts calciques autour d'une plaie chronique"
       },
       {
        "fr": "Détérioration de la peau saine autour d'une plaie par excès d'humidité — prévenue par pansements absorbants et barrières cutanées",
        "en": "Détérioration de la peau saine autour d'une plaie par excès d'humidité — prévenue par pansements absorbants et barrières cutanées",
        "correct": true
       },
       {
        "fr": "Formation d'une croûte dure autour des bords de la plaie indiquant une cicatrisation",
        "en": "Formation d'une croûte dure autour des bords de la plaie indiquant une cicatrisation"
       },
       {
        "fr": "Douleur liée au contact d'un pansement adhésif sur une peau fragile",
        "en": "Douleur liée au contact d'un pansement adhésif sur une peau fragile"
       }
      ],
      "explFr": "La macération survient quand l'excès d'humidité (exsudat) fragilise et détériore la peau saine. Prévention : pansements absorbants adaptés, protecteurs cutanés (zinc, films barrières), changements fréquents.",
      "explEn": "La macération survient quand l'excès d'humidité (exsudat) fragilise et détériore la peau saine. Prévention : pansements absorbants adaptés, protecteurs cutanés (zinc, films barrières), changements fréquents."
     },
     {
      "fr": "Pourquoi doit-on respecter l'ordre d'aspiration des tubes lors d'un prélèvement sanguin ?",
      "en": "Pourquoi doit-on respecter l'ordre d'aspiration des tubes lors d'un prélèvement sanguin ?",
      "choices": [
       {
        "fr": "Pour respecter la procédure administrative de facturation",
        "en": "Pour respecter la procédure administrative de facturation"
       },
       {
        "fr": "Pour éviter la contamination croisée des additifs entre tubes (ex. EDTA qui fausse la calcémie)",
        "en": "Pour éviter la contamination croisée des additifs entre tubes (ex. EDTA qui fausse la calcémie)",
        "correct": true
       },
       {
        "fr": "Car certains tubes doivent être conservés au chaud en premier",
        "en": "Car certains tubes doivent être conservés au chaud en premier"
       },
       {
        "fr": "Pour que l'étiquetage soit plus facile une fois le prélèvement complété",
        "en": "Pour que l'étiquetage soit plus facile une fois le prélèvement complété"
       }
      ],
      "explFr": "L'ordre des tubes (hémocultures → citrate bleu → SST or → EDTA mauve) évite qu'un additif contamine le tube suivant. Ex. l'EDTA chélate le calcium et fausserait les dosages biochimiques s'il y était transféré.",
      "explEn": "L'ordre des tubes (hémocultures → citrate bleu → SST or → EDTA mauve) évite qu'un additif contamine le tube suivant. Ex. l'EDTA chélate le calcium et fausserait les dosages biochimiques s'il y était transféré."
     },
     {
      "type": "tf",
      "fr": "Il est acceptable de rincer une plaie en cicatrisation avec de l'eau oxygénée (H₂O₂).",
      "en": "Il est acceptable de rincer une plaie en cicatrisation avec de l'eau oxygénée (H₂O₂).",
      "isTrue": false,
      "explFr": "Faux. L'eau oxygénée est cytotoxique : elle détruit les fibroblastes et retarde la cicatrisation. On préfère le soluté physiologique (NaCl 0,9 %) pour l'irrigation. Certains antiseptiques dilués peuvent être utilisés sur ordonnance.",
      "explEn": "Faux. L'eau oxygénée est cytotoxique : elle détruit les fibroblastes et retarde la cicatrisation. On préfère le soluté physiologique (NaCl 0,9 %) pour l'irrigation. Certains antiseptiques dilués peuvent être utilisés sur ordonnance."
     },
     {
      "type": "tf",
      "fr": "Un contenant pour objets tranchants (sharps) doit être changé quand il est plein aux trois quarts.",
      "en": "Un contenant pour objets tranchants (sharps) doit être changé quand il est plein aux trois quarts.",
      "isTrue": true,
      "explFr": "Vrai. Les contenants sont changés à 75 % de capacité pour éviter les blessures lors du dépôt des derniers objets. Ils ne doivent JAMAIS être compressés, ni vidés manuellement.",
      "explEn": "Vrai. Les contenants sont changés à 75 % de capacité pour éviter les blessures lors du dépôt des derniers objets. Ils ne doivent JAMAIS être compressés, ni vidés manuellement."
     },
     {
      "type": "tf",
      "fr": "La cicatrisation par première intention nécessite que les bords de la plaie soient rapprochés par sutures, agrafes ou stéristrips.",
      "en": "La cicatrisation par première intention nécessite que les bords de la plaie soient rapprochés par sutures, agrafes ou stéristrips.",
      "isTrue": true,
      "explFr": "Vrai. La 1re intention = bords rapprochés et maintenus → cicatrice fine. La 2e intention = cicatrisation depuis le fond sans fermeture chirurgicale (plaies infectées ou grandes). La 3e intention = fermeture retardée après traitement infectieux.",
      "explEn": "Vrai. La 1re intention = bords rapprochés et maintenus → cicatrice fine. La 2e intention = cicatrisation depuis le fond sans fermeture chirurgicale (plaies infectées ou grandes). La 3e intention = fermeture retardée après traitement infectieux."
     },
     {
      "type": "scenario",
      "fr": "Lors du soin d'une plaie au talon de M. Hébert, vous observez une zone noire, dure et bien délimitée au centre.\n\nComment qualifiez-vous ce tissu et quelle est votre action ?",
      "en": "Lors du soin d'une plaie au talon de M. Hébert, vous observez une zone noire, dure et bien délimitée au centre.\n\nComment qualifiez-vous ce tissu et quelle est votre action ?",
      "choices": [
       {
        "fr": "Tissu de granulation sain — continuer le soin habituel sans changer de pansement",
        "en": "Tissu de granulation sain — continuer le soin habituel sans changer de pansement"
       },
       {
        "fr": "Nécrose sèche — documenter avec CÉDAT, mesurer et aviser l'infirmière pour évaluation du débridement",
        "en": "Nécrose sèche — documenter avec CÉDAT, mesurer et aviser l'infirmière pour évaluation du débridement",
        "correct": true
       },
       {
        "fr": "Croûte normale de cicatrisation — retirer délicatement avec une compresse imbibée",
        "en": "Croûte normale de cicatrisation — retirer délicatement avec une compresse imbibée"
       },
       {
        "fr": "Hématome — appliquer une compresse froide et surveiller",
        "en": "Hématome — appliquer une compresse froide et surveiller"
       }
      ],
      "explFr": "Zone noire, dure et sèche = nécrose sèche (eschar). Documenter précisément et signaler à l'infirmière pour décision de débridement. Ne jamais retirer seul sans ordonnance. Au talon, l'eschar peut parfois être maintenu selon le protocole.",
      "explEn": "Zone noire, dure et sèche = nécrose sèche (eschar). Documenter précisément et signaler à l'infirmière pour décision de débridement. Ne jamais retirer seul sans ordonnance. Au talon, l'eschar peut parfois être maintenu selon le protocole."
     },
     {
      "type": "scenario",
      "fr": "M. Beaumont saigne abondamment d'une plaie au bras. Le sang est rouge vif et jaillit de façon pulsatile.\n\nQuelle est votre priorité immédiate ?",
      "en": "M. Beaumont saigne abondamment d'une plaie au bras. Le sang est rouge vif et jaillit de façon pulsatile.\n\nQuelle est votre priorité immédiate ?",
      "choices": [
       {
        "fr": "Appeler à l'aide en laissant la plaie telle quelle pour ne pas contaminer",
        "en": "Appeler à l'aide en laissant la plaie telle quelle pour ne pas contaminer"
       },
       {
        "fr": "Appliquer une pression directe et ferme sur la plaie avec une compresse et appeler à l'aide simultanément",
        "en": "Appliquer une pression directe et ferme sur la plaie avec une compresse et appeler à l'aide simultanément",
        "correct": true
       },
       {
        "fr": "Chercher le matériel de suture pour refermer la plaie d'urgence",
        "en": "Chercher le matériel de suture pour refermer la plaie d'urgence"
       },
       {
        "fr": "Prendre les signes vitaux avant d'intervenir sur la plaie",
        "en": "Prendre les signes vitaux avant d'intervenir sur la plaie"
       }
      ],
      "explFr": "Saignement rouge vif pulsatile = hémorragie artérielle. PRIORITÉ : pression directe ferme et continue. Appeler à l'aide sans relâcher la pression. Si inefficace sur un membre → garrot proximal envisageable.",
      "explEn": "Saignement rouge vif pulsatile = hémorragie artérielle. PRIORITÉ : pression directe ferme et continue. Appeler à l'aide sans relâcher la pression. Si inefficace sur un membre → garrot proximal envisageable."
     },
     {
      "fr": "Quelle est la première action lors de la découverte d'une plaie de pression non connue sur un patient ?",
      "en": "Quelle est la première action lors de la découverte d'une plaie de pression non connue sur un patient ?",
      "choices": [
       {
        "fr": "Appliquer immédiatement un pansement hydrocolloïde sans aviser",
        "en": "Appliquer immédiatement un pansement hydrocolloïde sans aviser"
       },
       {
        "fr": "Documenter précisément (localisation, stade, taille, aspect), signaler à l'infirmière et aviser le médecin si nécessaire",
        "en": "Documenter précisément (localisation, stade, taille, aspect), signaler à l'infirmière et aviser le médecin si nécessaire",
        "correct": true
       },
       {
        "fr": "Photographier la plaie et attendre la prochaine tournée pour décider",
        "en": "Photographier la plaie et attendre la prochaine tournée pour décider"
       },
       {
        "fr": "Nettoyer à l'alcool et couvrir avec une gaze stérile en attendant",
        "en": "Nettoyer à l'alcool et couvrir avec une gaze stérile en attendant"
       }
      ],
      "explFr": "Toute nouvelle plaie doit être documentée avec précision (CÉDAT : couleur, exsudat, douleur, aspect, taille), signalée à l'infirmière et, si nécessaire, au médecin. Un plan de traitement sera établi selon le stade et le type de plaie.",
      "explEn": "Toute nouvelle plaie doit être documentée avec précision (CÉDAT : couleur, exsudat, douleur, aspect, taille), signalée à l'infirmière et, si nécessaire, au médecin. Un plan de traitement sera établi selon le stade et le type de plaie."
     }
    ]
   }
  ]
 },
 {
  "id": "sante_mentale",
  "order": 6,
  "title_fr": "Santé Mentale",
  "title_en": "Mental Health",
  "icon": "🧠",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Vous approchez un patient agité verbalement. Quelle est la 1ère stratégie ?",
      "en": "You approach a verbally agitated patient. What is the 1st strategy?",
      "choices": [
       {
        "fr": "Appeler le code blanc dès les premiers signes d'agitation verbale",
        "en": "Physically restrain him for his safety"
       },
       {
        "fr": "Aviser l'infirmière et attendre son évaluation avant d'intervenir",
        "en": "Leave the room without saying anything"
       },
       {
        "fr": "Désescalade verbale : voix calme, posture non menaçante, écoute",
        "en": "Verbal de-escalation: calm voice, non-threatening posture, listening",
        "correct": true
       },
       {
        "fr": "Informer le patient clairement des conséquences s'il ne se calme pas",
        "en": "Call a code white immediately"
       }
      ],
      "explFr": "La désescalade verbale est TOUJOURS la première approche. Restez calme, ne bloquez pas la sortie, parlez doucement et à distance respectueuse. Le code blanc = dernier recours.",
      "explEn": "Verbal de-escalation is ALWAYS the first approach. Stay calm, don't block the exit, speak softly and at a respectful distance. A code white is a last resort."
     },
     {
      "type": "tf",
      "fr": "Toute mention de suicide par un patient, même 'à la blague', doit être prise au sérieux.",
      "en": "Any mention of suicide by a patient, even 'jokingly,' must be taken seriously.",
      "isTrue": true,
      "explFr": "Vrai. On ne badine jamais avec le suicide. Toute évocation doit être explorée avec calme et sans jugement ('Tu parles de te faire du mal ?'), puis signalée à l'infirmière.",
      "explEn": "True. Suicide is never a joke. Any mention must be explored calmly and without judgment ('Are you talking about hurting yourself?'), then reported to the nurse."
     },
     {
      "type": "scenario",
      "fr": "M. Veilleux, 35 ans, hospitalisé pour dépression sévère, donne ses effets personnels à sa voisine de chambre en disant : 'Je n'en aurai plus besoin de toute façon.'\n\nQuelle est votre interprétation et votre action ?",
      "en": "Mr. Veilleux, 35, hospitalized for severe depression, gives his personal belongings to his roommate, saying: 'I won't need them anymore anyway.'\n\nHow do you interpret this and what is your action?",
      "choices": [
       {
        "fr": "Progrès thérapeutique — le patient apprend à se détacher de ses possessions matérielles",
        "en": "He is being generous — do not intervene"
       },
       {
        "fr": "Signe de crise suicidaire imminente — aviser l'infirmière IMMÉDIATEMENT et rester avec lui",
        "en": "Sign of an imminent suicidal crisis — notify the nurse IMMEDIATELY and stay with him",
        "correct": true
       },
       {
        "fr": "Préparation au congé précoce — en informer l'infirmière lors de la prochaine tournée",
        "en": "He is preparing for discharge — inform the family"
       },
       {
        "fr": "Comportement impulsif lié à la dépression — lui demander les raisons calmement et surveiller",
        "en": "Normal behavior with depression — monitor from a distance"
       }
      ],
      "explFr": "Donner ses affaires est un signe d'alerte rouge de crise suicidaire imminente. Restez avec le patient, avisez l'infirmière immédiatement et appliquez le protocole de sécurité. Ne jamais le laisser seul.",
      "explEn": "Giving away one's belongings is a red-flag warning sign of an imminent suicidal crisis. Stay with the patient, notify the nurse immediately, and follow the safety protocol. Never leave him alone."
     },
     {
      "fr": "Qu'est-ce que la relation thérapeutique en soins ?",
      "en": "What is the therapeutic relationship in care?",
      "choices": [
       {
        "fr": "Une amitié avec le patient",
        "en": "A friendship with the patient"
       },
       {
        "fr": "Un lien professionnel de confiance centré sur le bien-être du patient, basé sur l'empathie et le respect",
        "en": "A professional relationship of trust focused on the patient's well-being, based on empathy and respect",
        "correct": true
       },
       {
        "fr": "Une relation où le soignant partage ses problèmes personnels pour créer des liens",
        "en": "A relationship where the caregiver shares personal problems to build a connection"
       },
       {
        "fr": "Une relation purement technique sans dimension humaine",
        "en": "A purely technical relationship with no human dimension"
       }
      ],
      "explFr": "La relation thérapeutique est professionnelle (limites claires), centrée sur le patient (pas le soignant), basée sur empathie, authenticité et confidentialité.",
      "explEn": "The therapeutic relationship is professional (clear boundaries), patient-centered (not caregiver-centered), and based on empathy, authenticity, and confidentiality."
     },
     {
      "type": "tf",
      "fr": "Le délirium et la démence sont la même condition.",
      "en": "Delirium and dementia are the same condition.",
      "isTrue": false,
      "explFr": "Faux. Le délirium est AIGU (heures/jours), fluctuant, avec cause identifiable (infection, médicament, douleur) et souvent réversible. La démence est CHRONIQUE, progressive et irréversible.",
      "explEn": "False. Delirium is ACUTE (hours/days), fluctuating, with an identifiable cause (infection, medication, pain), and often reversible. Dementia is CHRONIC, progressive, and irreversible."
     },
     {
      "fr": "Comment adapter la communication avec une personne atteinte de démence avancée ?",
      "en": "How should communication be adapted for a person with advanced dementia?",
      "choices": [
       {
        "fr": "Corriger systématiquement ses confusions pour la ramener à la réalité",
        "en": "Systematically correct their confusion to bring them back to reality"
       },
       {
        "fr": "Parler fort et utiliser des mots compliqués pour stimuler",
        "en": "Speak loudly and use complex words to stimulate them"
       },
       {
        "fr": "Valider ses émotions, phrases courtes, ton doux, contact visuel",
        "en": "Validate their emotions, use short sentences, a gentle tone, and eye contact",
        "correct": true
       },
       {
        "fr": "Éviter de lui parler pour ne pas l'agiter",
        "en": "Avoid talking to them so as not to agitate them"
       }
      ],
      "explFr": "L'approche validante (Feil, Carpe Diem) : ne pas corriger les perceptions délirantes, valider les émotions ressenties, phrases simples, ton calme, contact visuel et gestuel.",
      "explEn": "The validation approach (Feil, Carpe Diem): do not correct delusional perceptions, validate the emotions felt, use simple sentences, a calm tone, and eye and body contact."
     },
     {
      "type": "scenario",
      "fr": "Mme Deschênes, 68 ans, hospitalisée pour fracture de hanche, présente depuis hier soir une agitation soudaine, dit voir des araignées sur le mur et ne reconnaît plus son fils.\n\nQuel trouble soupçonnez-vous et que faites-vous ?",
      "en": "Mrs. Deschênes, 68, hospitalized for a hip fracture, has had sudden agitation since last evening, says she sees spiders on the wall, and no longer recognizes her son.\n\nWhat disorder do you suspect, and what do you do?",
      "choices": [
       {
        "fr": "Exacerbation de démence connue — appliquer l'approche Carpe Diem et rassurer la famille",
        "en": "An Alzheimer's crisis — apply the Carpe Diem approach and wait"
       },
       {
        "fr": "Délirium aigu — aviser immédiatement l'infirmière, chercher la cause (infection? médicament? douleur?)",
        "en": "Acute delirium — immediately notify the nurse, look for the cause (infection? medication? pain?)",
        "correct": true
       },
       {
        "fr": "Réaction psychotique aux analgésiques — signaler au médecin pour ajuster la médication",
        "en": "Psychosis — request a psychiatric evaluation"
       },
       {
        "fr": "Confusion post-opératoire bénigne — sécuriser l'environnement et réévaluer le matin",
        "en": "Normal nighttime fatigue — let her sleep"
       }
      ],
      "explFr": "Confusion aiguë soudaine + hallucinations chez une personne auparavant lucide = délirium aigu. C'est une urgence médicale. Il faut identifier et traiter la cause (infection urinaire post-op très fréquente).",
      "explEn": "Sudden acute confusion + hallucinations in a previously lucid person = acute delirium. This is a medical emergency. The cause must be identified and treated (post-op urinary tract infection is very common)."
     },
     {
      "fr": "Qu'est-ce que l'écoute active ?",
      "en": "What is active listening?",
      "choices": [
       {
        "fr": "Donner rapidement des conseils pour résoudre le problème",
        "en": "Quickly giving advice to solve the problem"
       },
       {
        "fr": "Être pleinement attentif, reformuler et valider sans juger",
        "en": "Being fully attentive, reflecting back, and validating without judgment",
        "correct": true
       },
       {
        "fr": "Parler de ses propres expériences pour créer un lien",
        "en": "Talking about your own experiences to build a connection"
       },
       {
        "fr": "Répondre par 'oui' ou 'non' pour gagner du temps",
        "en": "Responding with 'yes' or 'no' to save time"
       }
      ],
      "explFr": "L'écoute active implique une attention complète, le reflet/reformulation de ce qui est dit, et la validation des émotions, sans jugement ni interruption prématurée.",
      "explEn": "Active listening involves complete attention, reflecting/rephrasing what is said, and validating emotions, without judgment or premature interruption."
     },
     {
      "type": "tf",
      "fr": "Un soignant peut discuter des informations confidentielles d'un patient avec sa propre famille à la maison.",
      "en": "A caregiver can discuss a patient's confidential information with their own family at home.",
      "isTrue": false,
      "explFr": "Faux. La confidentialité est un devoir professionnel et légal. Les informations sur un patient ne doivent être partagées qu'avec l'équipe de soins concernée, jamais à l'extérieur du cadre professionnel.",
      "explEn": "False. Confidentiality is a professional and legal duty. Information about a patient must only be shared with the relevant care team, never outside the professional setting."
     },
     {
      "type": "scenario",
      "fr": "Un patient devient verbalement agressif envers vous, élève la voix et serre les poings, mais ne vous touche pas.\n\nQuelle est l'attitude la plus appropriée ?",
      "en": "A patient becomes verbally aggressive toward you, raises their voice, and clenches their fists, but does not touch you.\n\nWhat is the most appropriate attitude?",
      "choices": [
       {
        "fr": "Lui fixer des limites claires et fermement lui demander de se calmer immédiatement",
        "en": "Raise your voice to show you won't be pushed around"
       },
       {
        "fr": "Garder une distance sécuritaire, parler calmement, ne pas bloquer la sortie et demander de l'aide si nécessaire",
        "en": "Keep a safe distance, speak calmly, do not block the exit, and ask for help if needed",
        "correct": true
       },
       {
        "fr": "S'approcher lentement pour le calmer par un contact physique rassurant sur l'épaule",
        "en": "Touch him to calm him down"
       },
       {
        "fr": "Quitter immédiatement la chambre et signaler l'incident à l'infirmière en fin de quart",
        "en": "Turn your back and leave without a word"
       }
      ],
      "explFr": "Face à l'agressivité verbale, on garde son calme, une distance de sécurité, un ton posé, on évite de bloquer les issues et on appelle du renfort si la situation s'aggrave.",
      "explEn": "When facing verbal aggression, stay calm, keep a safe distance, use a steady tone, avoid blocking exits, and call for backup if the situation escalates."
     },
     {
      "fr": "Le trouble bipolaire se caractérise par :",
      "en": "Bipolar disorder is characterized by:",
      "choices": [
       {
        "fr": "Une tristesse constante sans variation",
        "en": "Constant sadness without variation"
       },
       {
        "fr": "Une alternance d'épisodes de manie/hypomanie et de dépression",
        "en": "Alternating episodes of mania/hypomania and depression",
        "correct": true
       },
       {
        "fr": "Des hallucinations permanentes",
        "en": "Permanent hallucinations"
       },
       {
        "fr": "Une perte de mémoire progressive",
        "en": "Progressive memory loss"
       }
      ],
      "explFr": "Le trouble bipolaire se caractérise par une alternance entre des épisodes d'humeur élevée (manie/hypomanie) — énergie excessive, impulsivité, peu de sommeil — et des épisodes dépressifs.",
      "explEn": "Bipolar disorder is characterized by alternating episodes of elevated mood (mania/hypomania) — excessive energy, impulsivity, little sleep — and depressive episodes."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "type": "tf",
      "fr": "Un patient en état de crise suicidaire ne doit jamais se voir retirer accès aux moyens létaux.",
      "en": "Un patient en état de crise suicidaire ne doit jamais se voir retirer accès aux moyens létaux.",
      "isTrue": false,
      "explFr": "Faux. La sécurisation de l'environnement (restriction d'accès aux médicaments, objets tranchants, etc.) est une intervention clé en prévention du suicide. Aviser immédiatement l'équipe soignante.",
      "explEn": "Faux. La sécurisation de l'environnement (restriction d'accès aux médicaments, objets tranchants, etc.) est une intervention clé en prévention du suicide. Aviser immédiatement l'équipe soignante."
     },
     {
      "fr": "Quel est le principe de la relation thérapeutique en soins infirmiers ?",
      "en": "Quel est le principe de la relation thérapeutique en soins infirmiers ?",
      "choices": [
       {
        "fr": "Devenir ami intime du patient pour le rassurer",
        "en": "Devenir ami intime du patient pour le rassurer"
       },
       {
        "fr": "Établir un lien professionnel centré sur le bien-être du patient, avec des limites claires",
        "en": "Établir un lien professionnel centré sur le bien-être du patient, avec des limites claires",
        "correct": true
       },
       {
        "fr": "Ne jamais parler de sujets personnels avec le patient",
        "en": "Ne jamais parler de sujets personnels avec le patient"
       },
       {
        "fr": "Laisser le patient prendre toutes les décisions seul",
        "en": "Laisser le patient prendre toutes les décisions seul"
       }
      ],
      "explFr": "La relation thérapeutique est une relation professionnelle, centrée sur le patient, avec des limites claires qui distinguent le rôle de soignant de celui d'ami. Elle repose sur la confiance, le respect et l'empathie.",
      "explEn": "La relation thérapeutique est une relation professionnelle, centrée sur le patient, avec des limites claires qui distinguent le rôle de soignant de celui d'ami. Elle repose sur la confiance, le respect et l'empathie."
     },
     {
      "type": "scenario",
      "fr": "Vous entrez dans la chambre de Mme Côté, 34 ans, hospitalisée en psychiatrie, et remarquez des marques récentes sur ses avant-bras. Elle dit : 'C'est rien, j'ai juste gratté une égratignure.'\n\nComment abordez-vous la situation ?",
      "en": "Vous entrez dans la chambre de Mme Côté, 34 ans, hospitalisée en psychiatrie, et remarquez des marques récentes sur ses avant-bras. Elle dit : 'C'est rien, j'ai juste gratté une égratignure.'\n\nComment abordez-vous la situation ?",
      "choices": [
       {
        "fr": "Accepter son explication, noter discrètement l'observation dans le dossier et réévaluer à la prochaine tournée",
        "en": "Accepter son explication, noter discrètement l'observation dans le dossier et réévaluer à la prochaine tournée"
       },
       {
        "fr": "Lui demander de vous montrer ses bras pour évaluer si les marques nécessitent un pansement",
        "en": "Lui demander de vous montrer ses bras pour évaluer si les marques nécessitent un pansement"
       },
       {
        "fr": "L'approcher avec calme et bienveillance, lui dire ce que vous avez vu et aviser immédiatement l'infirmière",
        "en": "L'approcher avec calme et bienveillance, lui dire ce que vous avez vu et aviser immédiatement l'infirmière",
        "correct": true
       },
       {
        "fr": "Lui dire que vous comprenez sa souffrance et lui expliquer les conséquences de l'automutilation",
        "en": "Lui dire que vous comprenez sa souffrance et lui expliquer les conséquences de l'automutilation"
       }
      ],
      "explFr": "Face à des signes d'automutilation, l'approche doit être calme, non-jugeante et directe. Valider sa présence, poser des questions ouvertes et aviser immédiatement l'équipe soignante pour assurer sa sécurité.",
      "explEn": "Face à des signes d'automutilation, l'approche doit être calme, non-jugeante et directe. Valider sa présence, poser des questions ouvertes et aviser immédiatement l'équipe soignante pour assurer sa sécurité."
     },
     {
      "fr": "Qu'est-ce que le principe de 'rétablissement' (recovery) en santé mentale ?",
      "en": "Qu'est-ce que le principe de 'rétablissement' (recovery) en santé mentale ?",
      "choices": [
       {
        "fr": "La disparition complète et permanente de tous les symptômes psychiatriques",
        "en": "La disparition complète et permanente de tous les symptômes psychiatriques"
       },
       {
        "fr": "Un processus personnel de reprise de contrôle de sa vie malgré les symptômes, vers une vie signifiante",
        "en": "Un processus personnel de reprise de contrôle de sa vie malgré les symptômes, vers une vie signifiante",
        "correct": true
       },
       {
        "fr": "Un protocole de traitement pharmacologique standardisé pour toutes les maladies mentales",
        "en": "Un protocole de traitement pharmacologique standardisé pour toutes les maladies mentales"
       },
       {
        "fr": "L'arrêt progressif de toute médication psychiatrique avec supervision médicale",
        "en": "L'arrêt progressif de toute médication psychiatrique avec supervision médicale"
       }
      ],
      "explFr": "Le rétablissement est un processus unique et personnel. Il ne signifie pas l'absence de symptômes, mais la capacité à mener une vie qui a du sens malgré eux. Les soignants soutiennent ce processus en misant sur les forces du patient.",
      "explEn": "Le rétablissement est un processus unique et personnel. Il ne signifie pas l'absence de symptômes, mais la capacité à mener une vie qui a du sens malgré eux. Les soignants soutiennent ce processus en misant sur les forces du patient."
     },
     {
      "type": "tf",
      "fr": "Une personne suivie en psychiatrie peut décider d'arrêter ses médicaments seule dès qu'elle se sent mieux, sans consultation préalable.",
      "en": "Une personne suivie en psychiatrie peut décider d'arrêter ses médicaments seule dès qu'elle se sent mieux, sans consultation préalable.",
      "isTrue": false,
      "explFr": "Faux. L'arrêt abrupt de médicaments psychiatriques peut provoquer une rechute sévère et parfois des effets de sevrage dangereux. Toute modification doit être discutée avec le médecin prescripteur. Le soignant doit rappeler ce risque avec bienveillance.",
      "explEn": "Faux. L'arrêt abrupt de médicaments psychiatriques peut provoquer une rechute sévère et parfois des effets de sevrage dangereux. Toute modification doit être discutée avec le médecin prescripteur. Le soignant doit rappeler ce risque avec bienveillance."
     },
     {
      "fr": "Qu'est-ce que la stigmatisation liée aux maladies mentales ?",
      "en": "Qu'est-ce que la stigmatisation liée aux maladies mentales ?",
      "choices": [
       {
        "fr": "Un symptôme clinique caractéristique des troubles de l'humeur",
        "en": "Un symptôme clinique caractéristique des troubles de l'humeur"
       },
       {
        "fr": "Des préjugés négatifs et des attitudes discriminatoires envers les personnes ayant des troubles mentaux",
        "en": "Des préjugés négatifs et des attitudes discriminatoires envers les personnes ayant des troubles mentaux",
        "correct": true
       },
       {
        "fr": "Un mécanisme de défense psychologique adaptatif normal",
        "en": "Un mécanisme de défense psychologique adaptatif normal"
       },
       {
        "fr": "Une technique thérapeutique de confrontation utilisée en groupe",
        "en": "Une technique thérapeutique de confrontation utilisée en groupe"
       }
      ],
      "explFr": "La stigmatisation — croire que les personnes avec des troubles mentaux sont dangereuses, incompétentes ou responsables de leur état — nuit à leur rétablissement en les décourageant de demander de l'aide. Les soignants ont un rôle clé dans la lutte contre ces préjugés.",
      "explEn": "La stigmatisation — croire que les personnes avec des troubles mentaux sont dangereuses, incompétentes ou responsables de leur état — nuit à leur rétablissement en les décourageant de demander de l'aide. Les soignants ont un rôle clé dans la lutte contre ces préjugés."
     },
     {
      "type": "scenario",
      "fr": "Mme Péloquin, 45 ans, hospitalisée pour dépression, vous dit : 'J'ai l'impression d'être inutile à tout le monde et que ma famille serait mieux sans moi.'\n\nQuelle est votre réponse prioritaire ?",
      "en": "Mme Péloquin, 45 ans, hospitalisée pour dépression, vous dit : 'J'ai l'impression d'être inutile à tout le monde et que ma famille serait mieux sans moi.'\n\nQuelle est votre réponse prioritaire ?",
      "choices": [
       {
        "fr": "La rassurer en lui disant que sa famille l'aime et que ces pensées vont passer",
        "en": "La rassurer en lui disant que sa famille l'aime et que ces pensées vont passer"
       },
       {
        "fr": "Évaluer directement la présence d'idées suicidaires ('Avez-vous des pensées de vous faire du mal ?') et aviser l'infirmière",
        "en": "Évaluer directement la présence d'idées suicidaires ('Avez-vous des pensées de vous faire du mal ?') et aviser l'infirmière",
        "correct": true
       },
       {
        "fr": "Documenter ses propos dans le dossier et en parler à l'infirmière lors de la prochaine tournée",
        "en": "Documenter ses propos dans le dossier et en parler à l'infirmière lors de la prochaine tournée"
       },
       {
        "fr": "Lui suggérer d'appeler un membre de sa famille pour se sentir mieux rapidement",
        "en": "Lui suggérer d'appeler un membre de sa famille pour se sentir mieux rapidement"
       }
      ],
      "explFr": "Les propos de Mme Péloquin évoquent des idéations suicidaires passives. Il faut explorer directement et calmement, sans peur de 'mettre l'idée dans la tête'. Aviser ensuite l'infirmière immédiatement pour une évaluation du risque suicidaire.",
      "explEn": "Les propos de Mme Péloquin évoquent des idéations suicidaires passives. Il faut explorer directement et calmement, sans peur de 'mettre l'idée dans la tête'. Aviser ensuite l'infirmière immédiatement pour une évaluation du risque suicidaire."
     },
     {
      "fr": "En quoi consiste la technique de pleine conscience (mindfulness) utilisée en santé mentale ?",
      "en": "En quoi consiste la technique de pleine conscience (mindfulness) utilisée en santé mentale ?",
      "choices": [
       {
        "fr": "Une technique de respiration intensive pour contrer les crises de panique aiguës",
        "en": "Une technique de respiration intensive pour contrer les crises de panique aiguës"
       },
       {
        "fr": "Une pratique d'attention intentionnelle au moment présent, sans jugement, pour réduire l'anxiété et la rumination",
        "en": "Une pratique d'attention intentionnelle au moment présent, sans jugement, pour réduire l'anxiété et la rumination",
        "correct": true
       },
       {
        "fr": "Une méthode de distraction cognitive visant à éviter les pensées négatives par des activités",
        "en": "Une méthode de distraction cognitive visant à éviter les pensées négatives par des activités"
       },
       {
        "fr": "Un traitement pharmacologique à base de plantes médicinales pour l'anxiété légère",
        "en": "Un traitement pharmacologique à base de plantes médicinales pour l'anxiété légère"
       }
      ],
      "explFr": "La pleine conscience (mindfulness) consiste à porter son attention délibérément sur le moment présent, sans jugement. Elle est intégrée dans des thérapies efficaces (TCC, MBSR) pour traiter l'anxiété, la dépression et le stress chronique.",
      "explEn": "La pleine conscience (mindfulness) consiste à porter son attention délibérément sur le moment présent, sans jugement. Elle est intégrée dans des thérapies efficaces (TCC, MBSR) pour traiter l'anxiété, la dépression et le stress chronique."
     },
     {
      "fr": "Le trouble de personnalité limite (borderline) se caractérise principalement par :",
      "en": "Le trouble de personnalité limite (borderline) se caractérise principalement par :",
      "choices": [
       {
        "fr": "Grande stabilité émotionnelle et relations interpersonnelles prévisibles",
        "en": "Grande stabilité émotionnelle et relations interpersonnelles prévisibles"
       },
       {
        "fr": "Instabilité émotionnelle intense, relations instables, impulsivité et peur intense de l'abandon",
        "en": "Instabilité émotionnelle intense, relations instables, impulsivité et peur intense de l'abandon",
        "correct": true
       },
       {
        "fr": "Méfiance constante envers autrui sans relations affectives profondes",
        "en": "Méfiance constante envers autrui sans relations affectives profondes"
       },
       {
        "fr": "Grandiosité, manque d'empathie et besoin constant d'admiration",
        "en": "Grandiosité, manque d'empathie et besoin constant d'admiration"
       }
      ],
      "explFr": "Le TPL : instabilité émotionnelle (colère intense, anxiété), relations intenses et instables, impulsivité, automutilation possible. L'approche est non-jugeante, calme, avec des limites claires et bienveillantes.",
      "explEn": "Le TPL : instabilité émotionnelle (colère intense, anxiété), relations intenses et instables, impulsivité, automutilation possible. L'approche est non-jugeante, calme, avec des limites claires et bienveillantes."
     },
     {
      "fr": "Le trouble de stress post-traumatique (TSPT) peut se manifester par :",
      "en": "Le trouble de stress post-traumatique (TSPT) peut se manifester par :",
      "choices": [
       {
        "fr": "Des crises de manie suivies de dépression profonde uniquement",
        "en": "Des crises de manie suivies de dépression profonde uniquement"
       },
       {
        "fr": "Des reviviscences (flashbacks), cauchemars, hypervigilance et évitement des rappels du trauma",
        "en": "Des reviviscences (flashbacks), cauchemars, hypervigilance et évitement des rappels du trauma",
        "correct": true
       },
       {
        "fr": "Une perte progressive de la mémoire sans facteur déclenchant identifiable",
        "en": "Une perte progressive de la mémoire sans facteur déclenchant identifiable"
       },
       {
        "fr": "Une euphorie inappropriée après un événement stressant",
        "en": "Une euphorie inappropriée après un événement stressant"
       }
      ],
      "explFr": "Le TSPT résulte d'une exposition à un événement traumatique. Il se manifeste par : flashbacks intrusifs, cauchemars, hypervigilance, comportements d'évitement et engourdissement émotionnel.",
      "explEn": "Le TSPT résulte d'une exposition à un événement traumatique. Il se manifeste par : flashbacks intrusifs, cauchemars, hypervigilance, comportements d'évitement et engourdissement émotionnel."
     },
     {
      "fr": "Qu'est-ce que le trouble obsessionnel-compulsif (TOC) ?",
      "en": "Qu'est-ce que le trouble obsessionnel-compulsif (TOC) ?",
      "choices": [
       {
        "fr": "Un trouble de l'humeur avec idées fixes non intrusives",
        "en": "Un trouble de l'humeur avec idées fixes non intrusives"
       },
       {
        "fr": "Des pensées intrusives répétées (obsessions) générant de l'anxiété, soulagée par des comportements rituels (compulsions)",
        "en": "Des pensées intrusives répétées (obsessions) générant de l'anxiété, soulagée par des comportements rituels (compulsions)",
        "correct": true
       },
       {
        "fr": "Un trouble de la personnalité caractérisé par la rigidité cognitive",
        "en": "Un trouble de la personnalité caractérisé par la rigidité cognitive"
       },
       {
        "fr": "Un syndrome de dépendance aux rituels sociaux sans composante anxieuse",
        "en": "Un syndrome de dépendance aux rituels sociaux sans composante anxieuse"
       }
      ],
      "explFr": "Dans le TOC, les obsessions (contamination, doute, symétrie) génèrent de l'anxiété. Les compulsions (lavage, vérifications) soulagent temporairement mais renforcent le cycle. Traitement : TCC (expositions) et médicaments (ISRS).",
      "explEn": "Dans le TOC, les obsessions (contamination, doute, symétrie) génèrent de l'anxiété. Les compulsions (lavage, vérifications) soulagent temporairement mais renforcent le cycle. Traitement : TCC (expositions) et médicaments (ISRS)."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Quels sont les signes d'un épisode maniaque dans un trouble bipolaire ?",
      "en": "Quels sont les signes d'un épisode maniaque dans un trouble bipolaire ?",
      "choices": [
       {
        "fr": "Grande tristesse, manque d'énergie, retrait social, pleurs",
        "en": "Grande tristesse, manque d'énergie, retrait social, pleurs"
       },
       {
        "fr": "Grandiosité, réduction du besoin de sommeil, pensée accélérée, impulsivité et désinhibition",
        "en": "Grandiosité, réduction du besoin de sommeil, pensée accélérée, impulsivité et désinhibition",
        "correct": true
       },
       {
        "fr": "Fatigue extrême, indifférence, ralentissement psychomoteur",
        "en": "Fatigue extrême, indifférence, ralentissement psychomoteur"
       },
       {
        "fr": "Anxiété chronique avec crises de panique récurrentes",
        "en": "Anxiété chronique avec crises de panique récurrentes"
       }
      ],
      "explFr": "La manie : sentiment de grandiosité, peu de sommeil sans fatigue, pensées qui se bousculent, hyperactivité, dépenses excessives, hypersexualité. En phase sévère : possible psychose. Signaler immédiatement.",
      "explEn": "La manie : sentiment de grandiosité, peu de sommeil sans fatigue, pensées qui se bousculent, hyperactivité, dépenses excessives, hypersexualité. En phase sévère : possible psychose. Signaler immédiatement."
     },
     {
      "fr": "Quelle est l'approche recommandée face à un patient présentant des hallucinations auditives actives ?",
      "en": "Quelle est l'approche recommandée face à un patient présentant des hallucinations auditives actives ?",
      "choices": [
       {
        "fr": "Confirmer ce que le patient entend pour le rassurer",
        "en": "Confirmer ce que le patient entend pour le rassurer"
       },
       {
        "fr": "Ne pas valider le contenu des hallucinations mais valider l'émotion ressentie, et aviser l'infirmière",
        "en": "Ne pas valider le contenu des hallucinations mais valider l'émotion ressentie, et aviser l'infirmière",
        "correct": true
       },
       {
        "fr": "Lui demander d'ignorer les voix et de se distraire avec une activité",
        "en": "Lui demander d'ignorer les voix et de se distraire avec une activité"
       },
       {
        "fr": "Lui expliquer fermement que ces voix n'existent pas et sont causées par sa maladie",
        "en": "Lui expliquer fermement que ces voix n'existent pas et sont causées par sa maladie"
       }
      ],
      "explFr": "Face à des hallucinations : ne pas confirmer le contenu, ne pas réfuter brutalement, mais valider l'émotion ('Je vois que ça vous effraie') et aviser l'infirmière pour évaluation et protection du patient.",
      "explEn": "Face à des hallucinations : ne pas confirmer le contenu, ne pas réfuter brutalement, mais valider l'émotion ('Je vois que ça vous effraie') et aviser l'infirmière pour évaluation et protection du patient."
     },
     {
      "fr": "Qu'est-ce que l'insight (conscience de la maladie) en santé mentale ?",
      "en": "Qu'est-ce que l'insight (conscience de la maladie) en santé mentale ?",
      "choices": [
       {
        "fr": "La capacité du patient à suivre des instructions complexes",
        "en": "La capacité du patient à suivre des instructions complexes"
       },
       {
        "fr": "La capacité du patient à reconnaître qu'il a une maladie mentale et que ses symptômes y sont liés",
        "en": "La capacité du patient à reconnaître qu'il a une maladie mentale et que ses symptômes y sont liés",
        "correct": true
       },
       {
        "fr": "La rapidité avec laquelle le patient répond aux traitements pharmacologiques",
        "en": "La rapidité avec laquelle le patient répond aux traitements pharmacologiques"
       },
       {
        "fr": "La qualité des liens familiaux comme facteur de protection contre les rechutes",
        "en": "La qualité des liens familiaux comme facteur de protection contre les rechutes"
       }
      ],
      "explFr": "L'insight est la conscience que le patient a de sa maladie. Un insight absent mène souvent au refus de traitement. Les soignants soutiennent l'insight sans confrontation, par psychoéducation et relation de confiance.",
      "explEn": "L'insight est la conscience que le patient a de sa maladie. Un insight absent mène souvent au refus de traitement. Les soignants soutiennent l'insight sans confrontation, par psychoéducation et relation de confiance."
     },
     {
      "fr": "Comment évalue-t-on le risque suicidaire de manière structurée ?",
      "en": "Comment évalue-t-on le risque suicidaire de manière structurée ?",
      "choices": [
       {
        "fr": "En posant une seule question directe sur l'intention de passage à l'acte",
        "en": "En posant une seule question directe sur l'intention de passage à l'acte"
       },
       {
        "fr": "En évaluant le plan, les moyens, l'intention, les antécédents et les facteurs protecteurs",
        "en": "En évaluant le plan, les moyens, l'intention, les antécédents et les facteurs protecteurs",
        "correct": true
       },
       {
        "fr": "En observant uniquement le comportement non verbal du patient",
        "en": "En observant uniquement le comportement non verbal du patient"
       },
       {
        "fr": "En demandant à la famille d'évaluer le risque à la place du patient",
        "en": "En demandant à la famille d'évaluer le risque à la place du patient"
       }
      ],
      "explFr": "L'évaluation du risque suicidaire inclut : plan précis, accès aux moyens létaux, intention, antécédents de tentatives, facteurs précipitants et protecteurs (famille, raisons de vivre). Une évaluation structurée guide les décisions cliniques.",
      "explEn": "L'évaluation du risque suicidaire inclut : plan précis, accès aux moyens létaux, intention, antécédents de tentatives, facteurs précipitants et protecteurs (famille, raisons de vivre). Une évaluation structurée guide les décisions cliniques."
     },
     {
      "fr": "En quoi consiste la thérapie cognitivo-comportementale (TCC) en santé mentale ?",
      "en": "En quoi consiste la thérapie cognitivo-comportementale (TCC) en santé mentale ?",
      "choices": [
       {
        "fr": "Une thérapie médicamenteuse à base d'antidépresseurs combinés à des vitamines",
        "en": "Une thérapie médicamenteuse à base d'antidépresseurs combinés à des vitamines"
       },
       {
        "fr": "Une approche visant à modifier les pensées négatives automatiques et les comportements inadaptés qui entretiennent la souffrance",
        "en": "Une approche visant à modifier les pensées négatives automatiques et les comportements inadaptés qui entretiennent la souffrance",
        "correct": true
       },
       {
        "fr": "Une thérapie uniquement basée sur l'exploration de l'enfance et des expériences passées",
        "en": "Une thérapie uniquement basée sur l'exploration de l'enfance et des expériences passées"
       },
       {
        "fr": "Un traitement exclusivement destiné à la dépression majeure",
        "en": "Un traitement exclusivement destiné à la dépression majeure"
       }
      ],
      "explFr": "La TCC identifie et modifie les schémas de pensée et les comportements qui contribuent aux troubles mentaux. Elle est efficace pour la dépression, l'anxiété, le TOC, le TSPT. Elle est orientée vers le présent et les solutions.",
      "explEn": "La TCC identifie et modifie les schémas de pensée et les comportements qui contribuent aux troubles mentaux. Elle est efficace pour la dépression, l'anxiété, le TOC, le TSPT. Elle est orientée vers le présent et les solutions."
     },
     {
      "type": "tf",
      "fr": "Demander directement à un patient s'il a des pensées suicidaires peut déclencher le passage à l'acte.",
      "en": "Demander directement à un patient s'il a des pensées suicidaires peut déclencher le passage à l'acte.",
      "isTrue": false,
      "explFr": "Faux. Les études montrent que poser directement la question ne déclenche pas le passage à l'acte. Au contraire, cela donne souvent la permission d'en parler. Aborder le sujet calmement et sans jugement est la bonne pratique clinique.",
      "explEn": "Faux. Les études montrent que poser directement la question ne déclenche pas le passage à l'acte. Au contraire, cela donne souvent la permission d'en parler. Aborder le sujet calmement et sans jugement est la bonne pratique clinique."
     },
     {
      "type": "tf",
      "fr": "Un patient hospitalisé volontairement en psychiatrie peut, en principe, décider de quitter l'hôpital.",
      "en": "Un patient hospitalisé volontairement en psychiatrie peut, en principe, décider de quitter l'hôpital.",
      "isTrue": true,
      "explFr": "Vrai (au Québec). Un patient hospitalisé volontairement peut partir. Si l'équipe juge qu'il est un danger pour lui-même ou autrui, elle peut demander une garde préventive (P-38). La loi encadre strictement ces mesures coercitives.",
      "explEn": "Vrai (au Québec). Un patient hospitalisé volontairement peut partir. Si l'équipe juge qu'il est un danger pour lui-même ou autrui, elle peut demander une garde préventive (P-38). La loi encadre strictement ces mesures coercitives."
     },
     {
      "type": "tf",
      "fr": "Les antidépresseurs ISRS créent une forte dépendance physique et doivent être arrêtés brusquement si l'efficacité est insuffisante.",
      "en": "Les antidépresseurs ISRS créent une forte dépendance physique et doivent être arrêtés brusquement si l'efficacité est insuffisante.",
      "isTrue": false,
      "explFr": "Faux. Les ISRS ne créent pas de dépendance au sens classique. Cependant, un arrêt brusque peut causer un syndrome de discontinuation (étourdissements, irritabilité). Ils doivent être diminués progressivement sous supervision médicale.",
      "explEn": "Faux. Les ISRS ne créent pas de dépendance au sens classique. Cependant, un arrêt brusque peut causer un syndrome de discontinuation (étourdissements, irritabilité). Ils doivent être diminués progressivement sous supervision médicale."
     },
     {
      "type": "scenario",
      "fr": "M. Tremblay, 42 ans, hospitalisé pour trouble bipolaire, est très agité ce matin. Il parle vite, n'a pas dormi, dépense de l'argent au téléphone et dit avoir des projets géniaux. Il n'a pas pris ses stabilisateurs de l'humeur.\n\nQuelle est votre évaluation et votre action ?",
      "en": "M. Tremblay, 42 ans, hospitalisé pour trouble bipolaire, est très agité ce matin. Il parle vite, n'a pas dormi, dépense de l'argent au téléphone et dit avoir des projets géniaux. Il n'a pas pris ses stabilisateurs de l'humeur.\n\nQuelle est votre évaluation et votre action ?",
      "choices": [
       {
        "fr": "C'est une amélioration notable de l'humeur — en informer le médecin lors de la prochaine tournée",
        "en": "C'est une amélioration notable de l'humeur — en informer le médecin lors de la prochaine tournée"
       },
       {
        "fr": "Signes d'épisode maniaque — aviser immédiatement l'infirmière, sécuriser l'environnement et réduire la stimulation",
        "en": "Signes d'épisode maniaque — aviser immédiatement l'infirmière, sécuriser l'environnement et réduire la stimulation",
        "correct": true
       },
       {
        "fr": "Réaction au changement de médicaments — surveiller et documenter sans intervention immédiate",
        "en": "Réaction au changement de médicaments — surveiller et documenter sans intervention immédiate"
       },
       {
        "fr": "Anxiété sévère — lui proposer des techniques de relaxation",
        "en": "Anxiété sévère — lui proposer des techniques de relaxation"
       }
      ],
      "explFr": "Agitation, insomnie, tachyphémie, projets grandioses + absence de médication = épisode maniaque. Aviser l'infirmière, réduire la stimulation, assurer la sécurité. Un traitement urgent peut être nécessaire.",
      "explEn": "Agitation, insomnie, tachyphémie, projets grandioses + absence de médication = épisode maniaque. Aviser l'infirmière, réduire la stimulation, assurer la sécurité. Un traitement urgent peut être nécessaire."
     },
     {
      "type": "scenario",
      "fr": "Vous entrez dans la chambre de Mme Picard, 28 ans, hospitalisée en psychiatrie, et la trouvez en train de se frapper la tête contre le mur.\n\nQuelle est votre priorité immédiate ?",
      "en": "Vous entrez dans la chambre de Mme Picard, 28 ans, hospitalisée en psychiatrie, et la trouvez en train de se frapper la tête contre le mur.\n\nQuelle est votre priorité immédiate ?",
      "choices": [
       {
        "fr": "Quitter la chambre et appeler l'infirmière par téléphone",
        "en": "Quitter la chambre et appeler l'infirmière par téléphone"
       },
       {
        "fr": "Rester calme, appeler à l'aide immédiatement, rester avec la patiente pour assurer sa sécurité physique",
        "en": "Rester calme, appeler à l'aide immédiatement, rester avec la patiente pour assurer sa sécurité physique",
        "correct": true
       },
       {
        "fr": "Lui saisir les bras fermement pour l'immobiliser",
        "en": "Lui saisir les bras fermement pour l'immobiliser"
       },
       {
        "fr": "Observer depuis la porte pour évaluer si elle se blesse réellement",
        "en": "Observer depuis la porte pour évaluer si elle se blesse réellement"
       }
      ],
      "explFr": "Priorité : sécurité immédiate. Rester avec la patiente (ne jamais la laisser seule), appeler à l'aide, parler calmement. Ne pas tenter seul une contention physique — risque de blessure pour les deux personnes.",
      "explEn": "Priorité : sécurité immédiate. Rester avec la patiente (ne jamais la laisser seule), appeler à l'aide, parler calmement. Ne pas tenter seul une contention physique — risque de blessure pour les deux personnes."
     },
     {
      "fr": "Qu'est-ce que la psychoéducation en santé mentale ?",
      "en": "Qu'est-ce que la psychoéducation en santé mentale ?",
      "choices": [
       {
        "fr": "Un traitement pharmacologique visant à rééduquer les circuits neuronaux",
        "en": "Un traitement pharmacologique visant à rééduquer les circuits neuronaux"
       },
       {
        "fr": "L'éducation du patient et de ses proches sur la maladie, ses symptômes, les traitements et les stratégies d'adaptation",
        "en": "L'éducation du patient et de ses proches sur la maladie, ses symptômes, les traitements et les stratégies d'adaptation",
        "correct": true
       },
       {
        "fr": "Une thérapie d'exposition aux situations anxiogènes pour désensibiliser le patient",
        "en": "Une thérapie d'exposition aux situations anxiogènes pour désensibiliser le patient"
       },
       {
        "fr": "Un programme d'activités physiques pour améliorer l'humeur des patients psychiatriques",
        "en": "Un programme d'activités physiques pour améliorer l'humeur des patients psychiatriques"
       }
      ],
      "explFr": "La psychoéducation aide le patient et sa famille à comprendre la maladie (symptômes, rechutes, traitements) et à développer des stratégies d'adaptation. Elle améliore l'adhérence au traitement et réduit le risque de rechute.",
      "explEn": "La psychoéducation aide le patient et sa famille à comprendre la maladie (symptômes, rechutes, traitements) et à développer des stratégies d'adaptation. Elle améliore l'adhérence au traitement et réduit le risque de rechute."
     }
    ]
   }
  ]
 },
 {
  "id": "personnes_agees",
  "order": 7,
  "title_fr": "Personnes Âgées",
  "title_en": "Older Adults",
  "icon": "👴",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Quelle est la différence principale entre délirium et démence ?",
      "en": "What is the main difference between delirium and dementia?",
      "choices": [
       {
        "fr": "Ils sont identiques, seul le terme change",
        "en": "They are identical, only the term changes"
       },
       {
        "fr": "Délirium = aigu et réversible ; démence = progression lente et irréversible",
        "en": "Delirium = acute and reversible; dementia = slow, irreversible progression",
        "correct": true
       },
       {
        "fr": "Délirium = affecte la mémoire ; démence = affecte l'humeur",
        "en": "Delirium = affects memory; dementia = affects mood"
       },
       {
        "fr": "Délirium = personnes jeunes ; démence = personnes âgées",
        "en": "Delirium = young people; dementia = older people"
       }
      ],
      "explFr": "Délirium : installation en heures/jours, fluctuant, cause identifiable, potentiellement réversible. Démence : installation sur des mois/années, progressive, non réversible.",
      "explEn": "Delirium: onset over hours/days, fluctuating, identifiable cause, potentially reversible. Dementia: onset over months/years, progressive, not reversible."
     },
     {
      "type": "tf",
      "fr": "L'hypotension orthostatique est un facteur de risque de chute chez la personne âgée.",
      "en": "Orthostatic hypotension is a risk factor for falls in older adults.",
      "isTrue": true,
      "explFr": "Vrai. La chute tensionnelle lors du lever (> 20 mmHg de systolique) peut causer un étourdissement ou syncope. Conseiller de se lever en 3 temps : assis, bord du lit, debout.",
      "explEn": "True. A drop in blood pressure when standing up (> 20 mmHg systolic) can cause dizziness or fainting. Advise rising in 3 stages: sitting, edge of bed, standing."
     },
     {
      "type": "scenario",
      "fr": "M. Arsenault, 84 ans, présente depuis 2 jours de l'agitation, une confusion et refuse de manger. Sa famille dit qu'il était 'normal' la semaine dernière. T = 38,2 °C.\n\nQuel diagnostic différentiel prioritaire chez cette PA et pourquoi ?",
      "en": "Mr. Arsenault, 84, has had agitation, confusion, and refused to eat for 2 days. His family says he was 'normal' last week. T = 38.2°C.\n\nWhat is the priority differential diagnosis for this older adult and why?",
      "choices": [
       {
        "fr": "Début de démence — référer en gériatrie",
        "en": "Onset of dementia — refer to geriatrics"
       },
       {
        "fr": "Infection urinaire causant un délirium — aviser l'infirmière pour une bandelette urinaire",
        "en": "Urinary tract infection causing delirium — notify the nurse for a urine dipstick test",
        "correct": true
       },
       {
        "fr": "Dépression — consulter en psychiatrie",
        "en": "Depression — refer to psychiatry"
       },
       {
        "fr": "Effets normaux du vieillissement — rassurer la famille",
        "en": "Normal effects of aging — reassure the family"
       }
      ],
      "explFr": "Chez la PA, l'infection urinaire se manifeste souvent par de la confusion et une agitation SANS douleur mictionnelle typique. Délirium aigu + fébricule = urgence de dépistage infectieux.",
      "explEn": "In older adults, urinary tract infections often present as confusion and agitation WITHOUT typical urinary symptoms. Acute delirium + low-grade fever = urgent need to screen for infection."
     },
     {
      "fr": "Qu'est-ce que la dysphagie et quels sont ses risques ?",
      "en": "What is dysphagia and what are its risks?",
      "choices": [
       {
        "fr": "Difficulté à marcher — risque de chute",
        "en": "Difficulty walking — risk of falling"
       },
       {
        "fr": "Trouble de la déglutition — risque d'aspiration et de pneumonie",
        "en": "Difficulty swallowing — risk of aspiration and pneumonia",
        "correct": true
       },
       {
        "fr": "Trouble de la mémoire — risque d'errance",
        "en": "Memory disorder — risk of wandering"
       },
       {
        "fr": "Difficulté à voir — risque de confusion",
        "en": "Difficulty seeing — risk of confusion"
       }
      ],
      "explFr": "La dysphagie (trouble de déglutition) peut entraîner une pneumonie d'aspiration, potentiellement mortelle. Gestion : textures modifiées, liquides épaissis, position assise à 90° lors des repas.",
      "explEn": "Dysphagia (swallowing difficulty) can lead to aspiration pneumonia, which can be fatal. Management: modified textures, thickened liquids, sitting at 90° during meals."
     },
     {
      "type": "tf",
      "fr": "La maltraitance des aînés ne concerne que la violence physique.",
      "en": "Elder abuse only involves physical violence.",
      "isTrue": false,
      "explFr": "Faux. La maltraitance inclut aussi la violence psychologique (intimidation, isolement), financière (vol, tutelle abusive), sexuelle, et la négligence (refus de soins, isolement social). Obligation légale de signalement.",
      "explEn": "False. Elder abuse also includes psychological abuse (intimidation, isolation), financial abuse (theft, abusive guardianship), sexual abuse, and neglect (refusal of care, social isolation). There is a legal duty to report it."
     },
     {
      "type": "scenario",
      "fr": "Lors de la toilette de Mme Lapointe, 82 ans, vous remarquez plusieurs ecchymoses à différents stades de guérison aux bras et au tronc. Elle semble anxieuse et dit 'Je tombe souvent.'\n\nQuelle est votre approche ?",
      "en": "While bathing Mrs. Lapointe, 82, you notice several bruises at different stages of healing on her arms and torso. She seems anxious and says, 'I fall often.'\n\nWhat is your approach?",
      "choices": [
       {
        "fr": "La croire et faire plus attention aux chutes",
        "en": "Believe her and be more careful about falls"
       },
       {
        "fr": "Ignorer — les PA font des ecchymoses facilement",
        "en": "Ignore it — older adults bruise easily"
       },
       {
        "fr": "Documenter précisément (localisation, couleur, taille), signaler à l'infirmière discrètement et compléter l'outil de dépistage de maltraitance",
        "en": "Document precisely (location, color, size), discreetly report to the nurse, and complete the abuse screening tool",
        "correct": true
       },
       {
        "fr": "Confronter immédiatement la famille",
        "en": "Immediately confront the family"
       }
      ],
      "explFr": "Des ecchymoses à différents stades = coexistence de blessures anciennes et récentes, ce qui est un signal d'alarme. Documenter sans jugement, signaler à l'infirmière. Ne pas confronter la famille avant évaluation.",
      "explEn": "Bruises at different stages = a mix of old and recent injuries, which is a red flag. Document without judgment and report to the nurse. Do not confront the family before an assessment is done."
     },
     {
      "fr": "Comment adapter la communication avec une personne âgée malentendante ?",
      "en": "How should communication be adapted for an older person who is hard of hearing?",
      "choices": [
       {
        "fr": "Parler très fort dans son oreille",
        "en": "Speak very loudly into their ear"
       },
       {
        "fr": "Face à face, parler clairement et lentement, éliminer le bruit de fond, vérifier la compréhension",
        "en": "Face to face, speak clearly and slowly, eliminate background noise, check understanding",
        "correct": true
       },
       {
        "fr": "Écrire tout sur papier sans parler",
        "en": "Write everything on paper without speaking"
       },
       {
        "fr": "Parler à la famille plutôt qu'au patient",
        "en": "Speak to the family instead of the patient"
       }
      ],
      "explFr": "Se placer face à face pour permettre la lecture labiale, parler distinctement (pas crier), éliminer les bruits de fond, reformuler au besoin. Vérifier que les prothèses auditives sont en place et fonctionnent.",
      "explEn": "Position yourself face to face to allow lip reading, speak distinctly (not shout), eliminate background noise, and rephrase as needed. Check that hearing aids are in place and working."
     },
     {
      "fr": "Quelle mesure contribue le plus à la prévention des chutes chez la personne âgée ?",
      "en": "Which measure contributes most to fall prevention in older adults?",
      "choices": [
       {
        "fr": "Limiter ses déplacements au minimum",
        "en": "Limiting movement to a minimum"
       },
       {
        "fr": "Évaluer l'environnement, les chaussures, la vision et la médication régulièrement",
        "en": "Regularly assessing the environment, footwear, vision, and medication",
        "correct": true
       },
       {
        "fr": "Lui donner un somnifère chaque soir",
        "en": "Giving them a sleeping pill every evening"
       },
       {
        "fr": "L'installer loin de la salle de bain",
        "en": "Placing them far from the bathroom"
       }
      ],
      "explFr": "La prévention des chutes est multifactorielle : éclairage adéquat, chaussures antidérapantes, retrait des obstacles, lunettes à jour, révision de la médication (sédatifs, antihypertenseurs) et exercices d'équilibre.",
      "explEn": "Fall prevention is multifactorial: adequate lighting, non-slip footwear, removal of obstacles, up-to-date glasses, medication review (sedatives, antihypertensives), and balance exercises."
     },
     {
      "type": "tf",
      "fr": "La presbyacousie est la perte progressive de l'audition liée au vieillissement.",
      "en": "Presbycusis is the progressive hearing loss associated with aging.",
      "isTrue": true,
      "explFr": "Vrai. La presbyacousie touche surtout les sons aigus et est très fréquente chez les personnes âgées. Elle peut contribuer à l'isolement social si elle n'est pas dépistée.",
      "explEn": "True. Presbycusis mainly affects high-pitched sounds and is very common in older adults. It can contribute to social isolation if not detected."
     },
     {
      "type": "scenario",
      "fr": "Mme Therrien, 88 ans, a perdu 4 kg en un mois. Elle dit avoir moins faim et trouve que 'tout goûte la même chose'.\n\nQuelle est votre action la plus appropriée ?",
      "en": "Mrs. Therrien, 88, has lost 4 kg in one month. She says she has less appetite and that 'everything tastes the same.'\n\nWhat is your most appropriate action?",
      "choices": [
       {
        "fr": "Ne rien faire, c'est normal de perdre l'appétit avec l'âge",
        "en": "Do nothing, it's normal to lose your appetite with age"
       },
       {
        "fr": "Documenter la perte de poids et les observations, aviser l'infirmière pour évaluation nutritionnelle",
        "en": "Document the weight loss and observations, notify the nurse for a nutritional assessment",
        "correct": true
       },
       {
        "fr": "Lui donner des suppléments sans en parler à l'équipe",
        "en": "Give her supplements without telling the team"
       },
       {
        "fr": "La forcer à manger davantage à chaque repas",
        "en": "Force her to eat more at every meal"
       }
      ],
      "explFr": "Une perte de poids involontaire de cette ampleur est un signal d'alarme (dénutrition, dépression, problème de santé sous-jacent, dysgueusie). Il faut documenter et aviser pour une évaluation complète.",
      "explEn": "Unintentional weight loss of this magnitude is a red flag (malnutrition, depression, underlying health problem, taste disorder). It must be documented and reported for a full assessment."
     },
     {
      "fr": "Lequel de ces signes peut indiquer de la maltraitance financière envers une personne âgée ?",
      "en": "Which of these signs may indicate financial abuse of an older person?",
      "choices": [
       {
        "fr": "La personne reçoit des visites régulières de sa famille",
        "en": "The person receives regular visits from family"
       },
       {
        "fr": "Des retraits bancaires inhabituels ou la disparition soudaine de biens de valeur",
        "en": "Unusual bank withdrawals or the sudden disappearance of valuable items",
        "correct": true
       },
       {
        "fr": "La personne a un budget bien organisé",
        "en": "The person has a well-organized budget"
       },
       {
        "fr": "La personne paie ses factures à temps",
        "en": "The person pays their bills on time"
       }
      ],
      "explFr": "Des retraits d'argent inhabituels, des changements soudains de testament ou la disparition de biens peuvent être des signes de maltraitance financière, qui doit être signalée.",
      "explEn": "Unusual cash withdrawals, sudden changes to a will, or the disappearance of belongings can be signs of financial abuse, which must be reported."
     },
     {
      "type": "tf",
      "fr": "La confusion chez une personne âgée est toujours un signe de démence débutante.",
      "en": "La confusion chez une personne âgée est toujours un signe de démence débutante.",
      "isTrue": false,
      "explFr": "Faux. Une confusion aiguë (délirium) peut être causée par une infection, un médicament, une déshydratation ou une douleur non traitée. Le délirium est réversible contrairement à la démence. Toute confusion soudaine doit être évaluée.",
      "explEn": "Faux. Une confusion aiguë (délirium) peut être causée par une infection, un médicament, une déshydratation ou une douleur non traitée. Le délirium est réversible contrairement à la démence. Toute confusion soudaine doit être évaluée."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Qu'est-ce qu'un syndrome gériatrique ?",
      "en": "Qu'est-ce qu'un syndrome gériatrique ?",
      "choices": [
       {
        "fr": "Une maladie exclusive aux personnes âgées",
        "en": "Une maladie exclusive aux personnes âgées"
       },
       {
        "fr": "Un problème complexe et multifactoriel fréquent chez la PA : chutes, délirium, incontinence, syndrome d'immobilisation, dénutrition",
        "en": "Un problème complexe et multifactoriel fréquent chez la PA : chutes, délirium, incontinence, syndrome d'immobilisation, dénutrition",
        "correct": true
       },
       {
        "fr": "Un type de démence spécifique",
        "en": "Un type de démence spécifique"
       },
       {
        "fr": "Un syndrome génétique apparaissant après 65 ans",
        "en": "Un syndrome génétique apparaissant après 65 ans"
       }
      ],
      "explFr": "Les syndromes gériatriques ne sont pas des maladies classiques mais des problèmes complexes issus de plusieurs facteurs (médicaux, fonctionnels, sociaux). Ils nécessitent une approche interdisciplinaire.",
      "explEn": "Les syndromes gériatriques ne sont pas des maladies classiques mais des problèmes complexes issus de plusieurs facteurs (médicaux, fonctionnels, sociaux). Ils nécessitent une approche interdisciplinaire."
     },
     {
      "type": "scenario",
      "fr": "M. Grenier, 82 ans, refuse son bain depuis 3 jours et dit que 'c'est inutile'. Sa fille insiste pour qu'il soit lavé immédiatement.\n\nComment gérez-vous la situation ?",
      "en": "M. Grenier, 82 ans, refuse son bain depuis 3 jours et dit que 'c'est inutile'. Sa fille insiste pour qu'il soit lavé immédiatement.\n\nComment gérez-vous la situation ?",
      "choices": [
       {
        "fr": "Forcer le bain car c'est nécessaire pour l'hygiène",
        "en": "Forcer le bain car c'est nécessaire pour l'hygiène"
       },
       {
        "fr": "Respecter le refus du patient, expliquer à la fille ses droits, proposer des alternatives (débarbouillage, report) et aviser l'infirmière",
        "en": "Respecter le refus du patient, expliquer à la fille ses droits, proposer des alternatives (débarbouillage, report) et aviser l'infirmière",
        "correct": true
       },
       {
        "fr": "Laisser la fille convaincre son père seule",
        "en": "Laisser la fille convaincre son père seule"
       },
       {
        "fr": "Ignorer le refus et faire le bain rapidement pendant qu'il dort",
        "en": "Ignorer le refus et faire le bain rapidement pendant qu'il dort"
       }
      ],
      "explFr": "L'autonomie du patient prime. Le refus de soins doit être respecté, documenté et discuté en équipe. On peut proposer des alternatives et explorer la raison du refus (douleur, pudeur, dépression). La famille ne peut pas forcer des soins contre le gré du patient.",
      "explEn": "L'autonomie du patient prime. Le refus de soins doit être respecté, documenté et discuté en équipe. On peut proposer des alternatives et explorer la raison du refus (douleur, pudeur, dépression). La famille ne peut pas forcer des soins contre le gré du patient."
     },
     {
      "fr": "Qu'est-ce que le syndrome d'immobilisation chez la personne âgée ?",
      "en": "Qu'est-ce que le syndrome d'immobilisation chez la personne âgée ?",
      "choices": [
       {
        "fr": "Un trouble de la marche lié à l'arthrite uniquement",
        "en": "Un trouble de la marche lié à l'arthrite uniquement"
       },
       {
        "fr": "Ensemble de complications dues à l'alitement prolongé : atrophie musculaire, escarres, pneumonie, thrombose, dépression",
        "en": "Ensemble de complications dues à l'alitement prolongé : atrophie musculaire, escarres, pneumonie, thrombose, dépression",
        "correct": true
       },
       {
        "fr": "Une maladie neurologique dégénérative",
        "en": "Une maladie neurologique dégénérative"
       },
       {
        "fr": "Un syndrome exclusivement psychologique",
        "en": "Un syndrome exclusivement psychologique"
       }
      ],
      "explFr": "L'immobilisation prolongée entraîne une cascade de complications : fonte musculaire (sarcopénie), escarres, thrombose veineuse, pneumonie hypostatique, constipation, dépression. La mobilisation précoce est la meilleure prévention.",
      "explEn": "L'immobilisation prolongée entraîne une cascade de complications : fonte musculaire (sarcopénie), escarres, thrombose veineuse, pneumonie hypostatique, constipation, dépression. La mobilisation précoce est la meilleure prévention."
     },
     {
      "fr": "Quelle est la principale cause des chutes chez la personne âgée ?",
      "en": "Quelle est la principale cause des chutes chez la personne âgée ?",
      "choices": [
       {
        "fr": "Une maladie cardiaque non diagnostiquée dans la majorité des cas",
        "en": "Une maladie cardiaque non diagnostiquée dans la majorité des cas"
       },
       {
        "fr": "La multifactorialité : faiblesse musculaire, troubles visuels, médicaments, environnement, hypotension orthostatique",
        "en": "La multifactorialité : faiblesse musculaire, troubles visuels, médicaments, environnement, hypotension orthostatique",
        "correct": true
       },
       {
        "fr": "Le refus de porter une aide à la marche malgré les recommandations médicales",
        "en": "Le refus de porter une aide à la marche malgré les recommandations médicales"
       },
       {
        "fr": "Les infections urinaires récurrentes affectant l'équilibre",
        "en": "Les infections urinaires récurrentes affectant l'équilibre"
       }
      ],
      "explFr": "Les chutes chez la PA sont presque toujours multifactorielles. Aucun facteur unique n'explique la majorité des chutes. Une évaluation globale (médicaments, vision, force, environnement, TA debout) est nécessaire pour prévenir les récidives.",
      "explEn": "Les chutes chez la PA sont presque toujours multifactorielles. Aucun facteur unique n'explique la majorité des chutes. Une évaluation globale (médicaments, vision, force, environnement, TA debout) est nécessaire pour prévenir les récidives."
     },
     {
      "type": "tf",
      "fr": "La presbyopie (difficulté à voir de près) et la presbyacousie (diminution de l'audition) sont des changements normaux liés au vieillissement.",
      "en": "La presbyopie (difficulté à voir de près) et la presbyacousie (diminution de l'audition) sont des changements normaux liés au vieillissement.",
      "isTrue": true,
      "explFr": "Vrai. La presbyopie est due au durcissement du cristallin (correction par lunettes). La presbyacousie touche les fréquences aiguës et est souvent sous-diagnostiquée. Les deux peuvent contribuer à l'isolement social et aux chutes si non corrigés.",
      "explEn": "Vrai. La presbyopie est due au durcissement du cristallin (correction par lunettes). La presbyacousie touche les fréquences aiguës et est souvent sous-diagnostiquée. Les deux peuvent contribuer à l'isolement social et aux chutes si non corrigés."
     },
     {
      "type": "scenario",
      "fr": "M. Bolduc, 78 ans, est retrouvé à 3h du matin dans le corridor, en pyjama, cherchant 'sa mère'. Il est agité et ne reconnaît pas son environnement.\n\nQuelle est votre première action ?",
      "en": "M. Bolduc, 78 ans, est retrouvé à 3h du matin dans le corridor, en pyjama, cherchant 'sa mère'. Il est agité et ne reconnaît pas son environnement.\n\nQuelle est votre première action ?",
      "choices": [
       {
        "fr": "Le ramener fermement à sa chambre, fermer sa porte et mettre les ridelles pour sa sécurité",
        "en": "Le ramener fermement à sa chambre, fermer sa porte et mettre les ridelles pour sa sécurité"
       },
       {
        "fr": "Rester calme avec lui, le ramener doucement à sa chambre, assurer sa sécurité et aviser l'infirmière",
        "en": "Rester calme avec lui, le ramener doucement à sa chambre, assurer sa sécurité et aviser l'infirmière",
        "correct": true
       },
       {
        "fr": "Appeler la famille immédiatement pour qu'elle vienne le calmer avant d'agir",
        "en": "Appeler la famille immédiatement pour qu'elle vienne le calmer avant d'agir"
       },
       {
        "fr": "L'orienter vers la réalité en lui expliquant que sa mère est décédée et qu'il est à l'hôpital",
        "en": "L'orienter vers la réalité en lui expliquant que sa mère est décédée et qu'il est à l'hôpital"
       }
      ],
      "explFr": "Face à un patient désorienté et déambulant, la priorité est sa sécurité immédiate. On reste calme, on rejoint son monde émotionnel sans confronter ni corriger, on le raccompagne doucement et on avise l'infirmière pour évaluation du délirium.",
      "explEn": "Face à un patient désorienté et déambulant, la priorité est sa sécurité immédiate. On reste calme, on rejoint son monde émotionnel sans confronter ni corriger, on le raccompagne doucement et on avise l'infirmière pour évaluation du délirium."
     },
     {
      "fr": "Quelle intervention favorise le mieux le maintien de l'autonomie d'une personne âgée dans ses activités quotidiennes ?",
      "en": "Quelle intervention favorise le mieux le maintien de l'autonomie d'une personne âgée dans ses activités quotidiennes ?",
      "choices": [
       {
        "fr": "Effectuer tous les soins à la place du patient pour éviter la fatigue et les risques",
        "en": "Effectuer tous les soins à la place du patient pour éviter la fatigue et les risques"
       },
       {
        "fr": "Favoriser l'autonomie résiduelle : laisser le patient faire ce qu'il peut et intervenir seulement si nécessaire",
        "en": "Favoriser l'autonomie résiduelle : laisser le patient faire ce qu'il peut et intervenir seulement si nécessaire",
        "correct": true
       },
       {
        "fr": "Planifier tous les soins tôt le matin pour libérer le reste de la journée à la récupération",
        "en": "Planifier tous les soins tôt le matin pour libérer le reste de la journée à la récupération"
       },
       {
        "fr": "Regrouper tous les soins en une seule période pour minimiser les dérangements",
        "en": "Regrouper tous les soins en une seule période pour minimiser les dérangements"
       }
      ],
      "explFr": "Le principe de l'autonomie résiduelle (faire AVEC et non à la PLACE) maintient les capacités fonctionnelles, préserve la dignité et ralentit le déclin. Même lent et difficile, laisser le patient participer a une valeur thérapeutique importante.",
      "explEn": "Le principe de l'autonomie résiduelle (faire AVEC et non à la PLACE) maintient les capacités fonctionnelles, préserve la dignité et ralentit le déclin. Même lent et difficile, laisser le patient participer a une valeur thérapeutique importante."
     },
     {
      "fr": "Qu'est-ce que l'évaluation gériatrique globale (EGG) ?",
      "en": "Qu'est-ce que l'évaluation gériatrique globale (EGG) ?",
      "choices": [
       {
        "fr": "Un bilan sanguin complet adapté aux besoins spécifiques des personnes de plus de 75 ans",
        "en": "Un bilan sanguin complet adapté aux besoins spécifiques des personnes de plus de 75 ans"
       },
       {
        "fr": "Une évaluation multidimensionnelle couvrant santé physique, cognitive, fonctionnelle, nutritionnelle et sociale",
        "en": "Une évaluation multidimensionnelle couvrant santé physique, cognitive, fonctionnelle, nutritionnelle et sociale",
        "correct": true
       },
       {
        "fr": "Un questionnaire d'admission obligatoire pour les soins de longue durée seulement",
        "en": "Un questionnaire d'admission obligatoire pour les soins de longue durée seulement"
       },
       {
        "fr": "Un outil d'évaluation du risque de maltraitance financière chez les aînés",
        "en": "Un outil d'évaluation du risque de maltraitance financière chez les aînés"
       }
      ],
      "explFr": "L'EGG est une évaluation interdisciplinaire qui va bien au-delà du diagnostic médical. Elle intègre les capacités fonctionnelles (AVQ), l'état cognitif, la nutrition, la médication, le soutien social et l'environnement pour orienter un plan de soins personnalisé.",
      "explEn": "L'EGG est une évaluation interdisciplinaire qui va bien au-delà du diagnostic médical. Elle intègre les capacités fonctionnelles (AVQ), l'état cognitif, la nutrition, la médication, le soutien social et l'environnement pour orienter un plan de soins personnalisé."
     },
     {
      "fr": "Quelle est la cause la plus fréquente de constipation chez la personne âgée hospitalisée ?",
      "en": "Quelle est la cause la plus fréquente de constipation chez la personne âgée hospitalisée ?",
      "choices": [
       {
        "fr": "Tumeur colorectale non diagnostiquée",
        "en": "Tumeur colorectale non diagnostiquée"
       },
       {
        "fr": "Immobilité, déshydratation, alimentation pauvre en fibres et effets médicamenteux (opioïdes)",
        "en": "Immobilité, déshydratation, alimentation pauvre en fibres et effets médicamenteux (opioïdes)",
        "correct": true
       },
       {
        "fr": "Maladie de Crohn débutante",
        "en": "Maladie de Crohn débutante"
       },
       {
        "fr": "Hyperthyroïdie non traitée",
        "en": "Hyperthyroïdie non traitée"
       }
      ],
      "explFr": "La constipation de la PA hospitalisée est souvent multifactorielle : immobilité (ralentit le transit), déshydratation, manque de fibres, opioïdes, antidépresseurs, antiacides. Prévention : mobilisation, hydratation, fibres.",
      "explEn": "La constipation de la PA hospitalisée est souvent multifactorielle : immobilité (ralentit le transit), déshydratation, manque de fibres, opioïdes, antidépresseurs, antiacides. Prévention : mobilisation, hydratation, fibres."
     },
     {
      "fr": "À quoi sert l'outil MNA (Mini Nutritional Assessment) ?",
      "en": "À quoi sert l'outil MNA (Mini Nutritional Assessment) ?",
      "choices": [
       {
        "fr": "Dépister la démence spécifiquement chez la personne âgée",
        "en": "Dépister la démence spécifiquement chez la personne âgée"
       },
       {
        "fr": "Évaluer le risque nutritionnel de la PA (poids, appétit, mobilité, cognition)",
        "en": "Évaluer le risque nutritionnel de la PA (poids, appétit, mobilité, cognition)",
        "correct": true
       },
       {
        "fr": "Calculer un IMC adapté aux personnes de plus de 65 ans",
        "en": "Calculer un IMC adapté aux personnes de plus de 65 ans"
       },
       {
        "fr": "Protocoliser l'alimentation enrichie pour les personnes dénutries",
        "en": "Protocoliser l'alimentation enrichie pour les personnes dénutries"
       }
      ],
      "explFr": "Le MNA dépiste et évalue l'état nutritionnel des PA. Score < 17 = dénutrition avérée nécessitant une intervention. Il intègre poids, IMC, appétit, mobilité et statut cognitif.",
      "explEn": "Le MNA dépiste et évalue l'état nutritionnel des PA. Score < 17 = dénutrition avérée nécessitant une intervention. Il intègre poids, IMC, appétit, mobilité et statut cognitif."
     },
     {
      "fr": "Pourquoi les personnes âgées sont-elles plus sensibles aux effets des médicaments ?",
      "en": "Pourquoi les personnes âgées sont-elles plus sensibles aux effets des médicaments ?",
      "choices": [
       {
        "fr": "Parce qu'elles ont plus de pathologies nécessitant des médicaments plus puissants",
        "en": "Parce qu'elles ont plus de pathologies nécessitant des médicaments plus puissants"
       },
       {
        "fr": "Car le métabolisme hépatique et l'élimination rénale sont ralentis, prolongeant l'action et favorisant l'accumulation",
        "en": "Car le métabolisme hépatique et l'élimination rénale sont ralentis, prolongeant l'action et favorisant l'accumulation",
        "correct": true
       },
       {
        "fr": "Parce qu'elles absorbent les médicaments plus rapidement",
        "en": "Parce qu'elles absorbent les médicaments plus rapidement"
       },
       {
        "fr": "À cause de la polypharmacie qui amplifie l'effet de chaque médicament individuel",
        "en": "À cause de la polypharmacie qui amplifie l'effet de chaque médicament individuel"
       }
      ],
      "explFr": "Le vieillissement diminue la filtration rénale et le métabolisme hépatique → les médicaments s'éliminent plus lentement → accumulation possible. Les doses doivent souvent être réduites.",
      "explEn": "Le vieillissement diminue la filtration rénale et le métabolisme hépatique → les médicaments s'éliminent plus lentement → accumulation possible. Les doses doivent souvent être réduites."
     },
     {
      "fr": "En quoi consiste l'environnement prothétique pour les personnes atteintes de démence ?",
      "en": "En quoi consiste l'environnement prothétique pour les personnes atteintes de démence ?",
      "choices": [
       {
        "fr": "Installer des prothèses auditives et visuelles à tous les patients déments",
        "en": "Installer des prothèses auditives et visuelles à tous les patients déments"
       },
       {
        "fr": "Adapter l'environnement physique pour compenser les déficits cognitifs : repères visuels, éclairage, simplicité, routines",
        "en": "Adapter l'environnement physique pour compenser les déficits cognitifs : repères visuels, éclairage, simplicité, routines",
        "correct": true
       },
       {
        "fr": "Utiliser des robots d'assistance à la place des soignants humains",
        "en": "Utiliser des robots d'assistance à la place des soignants humains"
       },
       {
        "fr": "Prescrire des aides à la marche à tous les patients âgés avec démence",
        "en": "Prescrire des aides à la marche à tous les patients âgés avec démence"
       }
      ],
      "explFr": "L'environnement prothétique compense les pertes cognitives par des repères visuels (pancartes, couleurs), une bonne luminosité, une réduction du bruit et des routines prévisibles. Cela réduit l'agitation et favorise l'orientation.",
      "explEn": "L'environnement prothétique compense les pertes cognitives par des repères visuels (pancartes, couleurs), une bonne luminosité, une réduction du bruit et des routines prévisibles. Cela réduit l'agitation et favorise l'orientation."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Quelle est la principale complication redoutée d'une fracture de la hanche chez la personne âgée ?",
      "en": "Quelle est la principale complication redoutée d'une fracture de la hanche chez la personne âgée ?",
      "choices": [
       {
        "fr": "La douleur chronique uniquement",
        "en": "La douleur chronique uniquement"
       },
       {
        "fr": "La TVP, l'embolie pulmonaire, le délirium et la perte d'autonomie définitive",
        "en": "La TVP, l'embolie pulmonaire, le délirium et la perte d'autonomie définitive",
        "correct": true
       },
       {
        "fr": "L'infection de la prothèse dans les 10 premières années uniquement",
        "en": "L'infection de la prothèse dans les 10 premières années uniquement"
       },
       {
        "fr": "L'ostéoporose aggravée par l'immobilisation",
        "en": "L'ostéoporose aggravée par l'immobilisation"
       }
      ],
      "explFr": "La fracture de hanche chez la PA est associée à une mortalité élevée (15-25 % la 1re année). Complications : TVP/EP, délirium postopératoire, escarres, pneumonie d'aspiration et perte d'autonomie définitive.",
      "explEn": "La fracture de hanche chez la PA est associée à une mortalité élevée (15-25 % la 1re année). Complications : TVP/EP, délirium postopératoire, escarres, pneumonie d'aspiration et perte d'autonomie définitive."
     },
     {
      "fr": "Comment évaluer la douleur chez une personne atteinte de démence sévère ?",
      "en": "Comment évaluer la douleur chez une personne atteinte de démence sévère ?",
      "choices": [
       {
        "fr": "Considérer que la démence sévère empêche de ressentir la douleur",
        "en": "Considérer que la démence sévère empêche de ressentir la douleur"
       },
       {
        "fr": "Utiliser des échelles comportementales (PACSLAC-II, ABBEY) observant visage, corps et vocalisation",
        "en": "Utiliser des échelles comportementales (PACSLAC-II, ABBEY) observant visage, corps et vocalisation",
        "correct": true
       },
       {
        "fr": "Se fier uniquement à la fréquence cardiaque et à la pression artérielle",
        "en": "Se fier uniquement à la fréquence cardiaque et à la pression artérielle"
       },
       {
        "fr": "Demander à la famille d'évaluer la douleur à la place du patient",
        "en": "Demander à la famille d'évaluer la douleur à la place du patient"
       }
      ],
      "explFr": "Les personnes avec démence sévère ressentent la douleur mais ne peuvent la signaler verbalement. Les échelles comportementales évaluent : expression faciale (grimaces), vocalisation (gémissements), agitation et position corporelle.",
      "explEn": "Les personnes avec démence sévère ressentent la douleur mais ne peuvent la signaler verbalement. Les échelles comportementales évaluent : expression faciale (grimaces), vocalisation (gémissements), agitation et position corporelle."
     },
     {
      "fr": "Quelle est la différence entre l'incontinence urinaire de stress et par impériosité ?",
      "en": "Quelle est la différence entre l'incontinence urinaire de stress et par impériosité ?",
      "choices": [
       {
        "fr": "Elles sont identiques chez la personne âgée",
        "en": "Elles sont identiques chez la personne âgée"
       },
       {
        "fr": "Stress = fuite lors d'efforts physiques ; impériosité = envie urgente et soudaine impossible à contrôler",
        "en": "Stress = fuite lors d'efforts physiques ; impériosité = envie urgente et soudaine impossible à contrôler",
        "correct": true
       },
       {
        "fr": "Stress = nocturne uniquement ; impériosité = diurne uniquement",
        "en": "Stress = nocturne uniquement ; impériosité = diurne uniquement"
       },
       {
        "fr": "Stress = liée à un AVC ; impériosité = liée à un prolapsus uniquement",
        "en": "Stress = liée à un AVC ; impériosité = liée à un prolapsus uniquement"
       }
      ],
      "explFr": "Incontinence de stress : effort (rire, toux, éternuement) → insuffisance du sphincter. Par impériosité (urgenturie) : hyperactivité vésicale → ne pas arriver aux toilettes. Traitements différents. Les deux peuvent coexister (mixte).",
      "explEn": "Incontinence de stress : effort (rire, toux, éternuement) → insuffisance du sphincter. Par impériosité (urgenturie) : hyperactivité vésicale → ne pas arriver aux toilettes. Traitements différents. Les deux peuvent coexister (mixte)."
     },
     {
      "fr": "Qu'est-ce que la sarcopénie et quelles en sont les conséquences cliniques ?",
      "en": "Qu'est-ce que la sarcopénie et quelles en sont les conséquences cliniques ?",
      "choices": [
       {
        "fr": "Accumulation de graisse autour des muscles causant une obésité",
        "en": "Accumulation de graisse autour des muscles causant une obésité"
       },
       {
        "fr": "Perte progressive de masse et de force musculaires liée à l'âge, favorisant chutes, fatigue et perte d'autonomie",
        "en": "Perte progressive de masse et de force musculaires liée à l'âge, favorisant chutes, fatigue et perte d'autonomie",
        "correct": true
       },
       {
        "fr": "Maladie musculaire inflammatoire touchant exclusivement les personnes âgées",
        "en": "Maladie musculaire inflammatoire touchant exclusivement les personnes âgées"
       },
       {
        "fr": "Carence en protéines musculaires traitée par supplémentation en créatine",
        "en": "Carence en protéines musculaires traitée par supplémentation en créatine"
       }
      ],
      "explFr": "La sarcopénie (perte de masse/force musculaire) s'accélère avec l'immobilité et la dénutrition. Conséquences : chutes, fractures, dépendance. Elle est partiellement réversible par l'exercice et une alimentation riche en protéines.",
      "explEn": "La sarcopénie (perte de masse/force musculaire) s'accélère avec l'immobilité et la dénutrition. Conséquences : chutes, fractures, dépendance. Elle est partiellement réversible par l'exercice et une alimentation riche en protéines."
     },
     {
      "type": "tf",
      "fr": "La douleur chez la personne âgée est souvent sous-évaluée et sous-traitée.",
      "en": "La douleur chez la personne âgée est souvent sous-évaluée et sous-traitée.",
      "isTrue": true,
      "explFr": "Vrai. Raisons : croyance que la douleur est normale avec l'âge, difficultés d'expression (démence, aphasie), crainte des effets secondaires. Une évaluation systématique et régulière est essentielle.",
      "explEn": "Vrai. Raisons : croyance que la douleur est normale avec l'âge, difficultés d'expression (démence, aphasie), crainte des effets secondaires. Une évaluation systématique et régulière est essentielle."
     },
     {
      "type": "tf",
      "fr": "Une chute sans blessure visible chez une personne âgée ne nécessite pas de signalement si la personne se dit bien.",
      "en": "Une chute sans blessure visible chez une personne âgée ne nécessite pas de signalement si la personne se dit bien.",
      "isTrue": false,
      "explFr": "Faux. Toute chute doit être documentée et signalée. Des fractures (col du fémur) peuvent être asymptomatiques initialement. De plus, chaque chute exige une évaluation des facteurs de risque pour prévenir les récidives.",
      "explEn": "Faux. Toute chute doit être documentée et signalée. Des fractures (col du fémur) peuvent être asymptomatiques initialement. De plus, chaque chute exige une évaluation des facteurs de risque pour prévenir les récidives."
     },
     {
      "type": "tf",
      "fr": "Le vieillissement normal entraîne une perte de mémoire significative qui interfère avec la vie quotidienne.",
      "en": "Le vieillissement normal entraîne une perte de mémoire significative qui interfère avec la vie quotidienne.",
      "isTrue": false,
      "explFr": "Faux. Le vieillissement normal peut ralentir légèrement certaines fonctions cognitives, mais ne cause pas de perte significative interférant avec les AVQ. Une démence n'est pas normale et doit être évaluée médicalement.",
      "explEn": "Faux. Le vieillissement normal peut ralentir légèrement certaines fonctions cognitives, mais ne cause pas de perte significative interférant avec les AVQ. Une démence n'est pas normale et doit être évaluée médicalement."
     },
     {
      "type": "scenario",
      "fr": "M. Bolduc, 78 ans, est retrouvé au sol à 22h dans sa chambre. Il s'est levé seul pour la toilette et dit avoir une douleur modérée à la hanche droite, avec du mal à bouger la jambe.\n\nQuelles sont vos actions prioritaires ?",
      "en": "M. Bolduc, 78 ans, est retrouvé au sol à 22h dans sa chambre. Il s'est levé seul pour la toilette et dit avoir une douleur modérée à la hanche droite, avec du mal à bouger la jambe.\n\nQuelles sont vos actions prioritaires ?",
      "choices": [
       {
        "fr": "L'aider à se relever doucement et le reconduire à son lit pour ne pas le laisser au sol",
        "en": "L'aider à se relever doucement et le reconduire à son lit pour ne pas le laisser au sol"
       },
       {
        "fr": "Ne pas le mobiliser, maintenir sa position, aviser immédiatement l'infirmière et prendre les signes vitaux",
        "en": "Ne pas le mobiliser, maintenir sa position, aviser immédiatement l'infirmière et prendre les signes vitaux",
        "correct": true
       },
       {
        "fr": "Évaluer d'abord si des témoins ont vu la chute avant de décider quoi faire",
        "en": "Évaluer d'abord si des témoins ont vu la chute avant de décider quoi faire"
       },
       {
        "fr": "Appliquer de la glace sur la hanche et réévaluer dans 30 minutes",
        "en": "Appliquer de la glace sur la hanche et réévaluer dans 30 minutes"
       }
      ],
      "explFr": "Chute avec douleur à la hanche et limitation de mouvement → suspecter une fracture. On ne mobilise PAS sans évaluation médicale. Maintenir la position, aviser immédiatement, prendre les SV, documenter et rassurer.",
      "explEn": "Chute avec douleur à la hanche et limitation de mouvement → suspecter une fracture. On ne mobilise PAS sans évaluation médicale. Maintenir la position, aviser immédiatement, prendre les SV, documenter et rassurer."
     },
     {
      "type": "scenario",
      "fr": "Mme Grenier, 84 ans, atteinte de démence modérée, cherche sa mère en criant depuis ce matin. Elle est très agitée.\n\nQuelle est la meilleure approche ?",
      "en": "Mme Grenier, 84 ans, atteinte de démence modérée, cherche sa mère en criant depuis ce matin. Elle est très agitée.\n\nQuelle est la meilleure approche ?",
      "choices": [
       {
        "fr": "Lui expliquer calmement mais fermement que sa mère est décédée depuis longtemps",
        "en": "Lui expliquer calmement mais fermement que sa mère est décédée depuis longtemps"
       },
       {
        "fr": "Rejoindre son monde émotionnel, valider sa détresse sans corriger, puis distraire doucement et aviser l'infirmière si l'agitation persiste",
        "en": "Rejoindre son monde émotionnel, valider sa détresse sans corriger, puis distraire doucement et aviser l'infirmière si l'agitation persiste",
        "correct": true
       },
       {
        "fr": "L'ignorer jusqu'à ce qu'elle se calme pour ne pas l'agiter davantage",
        "en": "L'ignorer jusqu'à ce qu'elle se calme pour ne pas l'agiter davantage"
       },
       {
        "fr": "Demander immédiatement une ordonnance de sédatif car l'agitation dure depuis le matin",
        "en": "Demander immédiatement une ordonnance de sédatif car l'agitation dure depuis le matin"
       }
      ],
      "explFr": "L'approche validante (Carpe Diem, Feil) : ne pas corriger ni confronter. Rejoindre l'émotion (peur, tristesse) sans valider le contenu. Une distraction douce (musique, activité significative) peut désamorcer l'agitation.",
      "explEn": "L'approche validante (Carpe Diem, Feil) : ne pas corriger ni confronter. Rejoindre l'émotion (peur, tristesse) sans valider le contenu. Une distraction douce (musique, activité significative) peut désamorcer l'agitation."
     },
     {
      "fr": "Qu'est-ce que l'approche AINÉS (ou SPICES en anglais) en gériatrie ?",
      "en": "Qu'est-ce que l'approche AINÉS (ou SPICES en anglais) en gériatrie ?",
      "choices": [
       {
        "fr": "Un outil de dépistage nutritionnel spécifique aux aînés hospitalisés",
        "en": "Un outil de dépistage nutritionnel spécifique aux aînés hospitalisés"
       },
       {
        "fr": "Un outil d'évaluation systématique des 6 problèmes courants chez la PA : Sommeil, Problèmes cognitifs, Incontinence, Confort/douleur, Escarres, Sécurité/chutes",
        "en": "Un outil d'évaluation systématique des 6 problèmes courants chez la PA : Sommeil, Problèmes cognitifs, Incontinence, Confort/douleur, Escarres, Sécurité/chutes",
        "correct": true
       },
       {
        "fr": "Un guide d'alimentation adapté aux personnes âgées de plus de 80 ans",
        "en": "Un guide d'alimentation adapté aux personnes âgées de plus de 80 ans"
       },
       {
        "fr": "Un protocole d'administration médicamenteuse sécurisé pour les PA",
        "en": "Un protocole d'administration médicamenteuse sécurisé pour les PA"
       }
      ],
      "explFr": "L'approche AINÉS (Alimentation/Sommeil, Incontinence, Nausées/douleur, Escarre, Sécurité) ou SPICES permet d'évaluer systématiquement les problèmes courants chez la PA hospitalisée pour prévenir les complications.",
      "explEn": "L'approche AINÉS (Alimentation/Sommeil, Incontinence, Nausées/douleur, Escarre, Sécurité) ou SPICES permet d'évaluer systématiquement les problèmes courants chez la PA hospitalisée pour prévenir les complications."
     }
    ]
   }
  ]
 },
 {
  "id": "fin_vie",
  "order": 8,
  "title_fr": "Soins Palliatifs",
  "title_en": "Palliative Care",
  "icon": "🕊️",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Quels sont les signes du déclin actif (imminence de la mort) ?",
      "en": "What are the signs of active decline (impending death)?",
      "choices": [
       {
        "fr": "Agitation, fièvre, soif intense",
        "en": "Agitation, fever, intense thirst"
       },
       {
        "fr": "Augmentation du sommeil, réduction alimentation, respiration de Cheyne-Stokes, extrémités marbres et froides",
        "en": "Increased sleep, reduced food intake, Cheyne-Stokes breathing, mottled and cold extremities",
        "correct": true
       },
       {
        "fr": "Amélioration soudaine de l'énergie, appétit retrouvé",
        "en": "Sudden improvement in energy, return of appetite"
       },
       {
        "fr": "Augmentation de la douleur et des demandes de soins",
        "en": "Increased pain and requests for care"
       }
      ],
      "explFr": "Le déclin actif se reconnaît à : somnolence accrue, plus d'appétit/soif, respiration irrégulière (Cheyne-Stokes), extrémités froides et marbrées, coloration livedo. Ces signes permettent d'anticiper et de soutenir la famille.",
      "explEn": "Active decline is recognized by: increased drowsiness, decreased appetite/thirst, irregular breathing (Cheyne-Stokes), cold and mottled extremities, livedo coloring. These signs help anticipate and support the family."
     },
     {
      "type": "tf",
      "fr": "La morphine, bien dosée, peut soulager la douleur en fin de vie sans nécessairement hâter la mort.",
      "en": "Properly dosed morphine can relieve pain at end of life without necessarily hastening death.",
      "isTrue": true,
      "explFr": "Vrai. La doctrine du double effet reconnaît que soulager la douleur est éthiquement juste même si une dose élevée pourrait théoriquement avoir un effet secondaire. L'intention est le soulagement, pas la mort.",
      "explEn": "True. The doctrine of double effect recognizes that relieving pain is ethically right even if a high dose could theoretically have a side effect. The intention is relief, not death."
     },
     {
      "type": "scenario",
      "fr": "La famille de M. Bouchard, en fin de vie, s'inquiète d'entendre une respiration bruyante et irrégulière. Ils demandent si leur père souffre.\n\nQuelle est votre réponse et votre action de soins ?",
      "en": "Mr. Bouchard's family, who is at end of life, is worried about hearing loud, irregular breathing. They ask if their father is suffering.\n\nWhat is your response and care action?",
      "choices": [
       {
        "fr": "'Oui il souffre, on va augmenter la morphine immédiatement.'",
        "en": "'Yes, he's suffering, we'll increase the morphine immediately.'"
       },
       {
        "fr": "'Cette respiration de Cheyne-Stokes est normale en fin de vie. Ce n'est pas signe de douleur. Je vais garder sa bouche humide pour son confort.'",
        "en": "'This Cheyne-Stokes breathing is normal at end of life. It is not a sign of pain. I'll keep his mouth moist for his comfort.'",
        "correct": true
       },
       {
        "fr": "'Ne vous inquiétez pas, tout va bien.' (sans explication)",
        "en": "'Don't worry, everything is fine.' (without explanation)"
       },
       {
        "fr": "'Il faut appeler le médecin, c'est urgent.'",
        "en": "'We need to call the doctor, it's urgent.'"
       }
      ],
      "explFr": "La respiration de Cheyne-Stokes (alternance apnées/hyperventilation) est normale et n'est pas douloureuse. La famille a besoin d'une explication claire et rassurante. Le soignant hydrate les muqueuses et reste présent.",
      "explEn": "Cheyne-Stokes breathing (alternating apnea/hyperventilation) is normal and not painful. The family needs a clear, reassuring explanation. The caregiver moistens the mucous membranes and remains present."
     },
     {
      "fr": "Qu'est-ce qu'une directive médicale anticipée (DMA) au Québec ?",
      "en": "What is an advance medical directive (AMD) in Quebec?",
      "choices": [
       {
        "fr": "Un testament ordinaire",
        "en": "An ordinary will"
       },
       {
        "fr": "Document légal où une personne précise ses volontés de soins pour le cas où elle deviendrait inapte",
        "en": "A legal document in which a person specifies their care wishes in case they become incapacitated",
        "correct": true
       },
       {
        "fr": "Une procuration financière",
        "en": "A financial power of attorney"
       },
       {
        "fr": "Une décision prise par la famille en urgence",
        "en": "A decision made by the family in an emergency"
       }
      ],
      "explFr": "Loi sur les soins de fin de vie (2015) : toute personne majeure et apte peut rédiger ses DMA pour préciser si elle souhaite la RCR, assistance respiratoire, soins palliatifs, AMM, etc.",
      "explEn": "Act Respecting End-of-Life Care (2015): any capable adult may write advance medical directives to specify whether they wish CPR, respiratory assistance, palliative care, MAID, etc."
     },
     {
      "type": "tf",
      "fr": "L'aide médicale à mourir (AMM) peut être administrée par l'infirmière auxiliaire.",
      "en": "Medical assistance in dying (MAID) can be administered by a licensed practical nurse.",
      "isTrue": false,
      "explFr": "Faux. Au Québec, l'AMM est administrée par un médecin ou une infirmière praticienne spécialisée habilitée. L'infirmière auxiliaire peut soutenir le processus, assurer le confort et être présente, mais n'administre pas l'AMM.",
      "explEn": "False. In Quebec, MAID is administered by a physician or a qualified specialized nurse practitioner. The licensed practical nurse can support the process, ensure comfort, and be present, but does not administer MAID."
     },
     {
      "type": "scenario",
      "fr": "Mme Gagnon, 59 ans, atteinte d'un cancer en phase terminale, refuse les traitements et demande à rentrer mourir chez elle. Sa fille est en colère contre cette décision.\n\nQuelle est l'approche éthique du soignant ?",
      "en": "Mrs. Gagnon, 59, with terminal cancer, refuses treatment and asks to go home to die. Her daughter is angry about this decision.\n\nWhat is the ethical approach for the caregiver?",
      "choices": [
       {
        "fr": "Soutenir la décision de la famille car elle est plus rationnelle",
        "en": "Support the family's decision because it is more rational"
       },
       {
        "fr": "Respecter l'autonomie de Mme Gagnon, soutenir émotionnellement la fille et faciliter la transition vers les soins à domicile",
        "en": "Respect Mrs. Gagnon's autonomy, emotionally support the daughter, and facilitate the transition to home care",
        "correct": true
       },
       {
        "fr": "Essayer de convaincre la patiente de continuer les traitements",
        "en": "Try to convince the patient to continue treatment"
       },
       {
        "fr": "Demander une tutelle pour protéger la patiente",
        "en": "Request guardianship to protect the patient"
       }
      ],
      "explFr": "Le principe d'autonomie est fondamental : une personne apte a le droit de refuser tout traitement. Le rôle du soignant est de respecter ce choix, d'accompagner la famille dans son deuil anticipé et de coordonner les soins à domicile (CLSC, soins palliatifs).",
      "explEn": "The principle of autonomy is fundamental: a capable person has the right to refuse any treatment. The caregiver's role is to respect this choice, support the family through their anticipatory grief, and coordinate home care (CLSC, palliative care)."
     },
     {
      "fr": "Comment gérer la douleur efficacement en fin de vie ?",
      "en": "How can pain be managed effectively at end of life?",
      "choices": [
       {
        "fr": "Seulement PRN pour éviter la dépendance",
        "en": "Only PRN to avoid dependence"
       },
       {
        "fr": "Analgésiques réguliers (fond continu), doses de secours PRN, réévaluation fréquente, voie SC si voie orale impossible",
        "en": "Regular analgesics (continuous baseline), PRN rescue doses, frequent reassessment, SC route if oral route not possible",
        "correct": true
       },
       {
        "fr": "Diminuer les opioïdes vers la fin pour préserver la conscience",
        "en": "Decrease opioids toward the end to preserve consciousness"
       },
       {
        "fr": "Utiliser uniquement des méthodes non pharmacologiques",
        "en": "Use only non-pharmacological methods"
       }
      ],
      "explFr": "La douleur en fin de vie nécessite un traitement de fond régulier (pas seulement au besoin), titré jusqu'au confort. La voie sous-cutanée est privilégiée quand la voie orale n'est plus possible. L'objectif est la dignité, pas la souffrance.",
      "explEn": "Pain at end of life requires regular baseline treatment (not just as needed), titrated for comfort. The subcutaneous route is preferred when the oral route is no longer possible. The goal is dignity, not suffering."
     },
     {
      "fr": "Comment peut se manifester la douleur chez un patient inconscient en fin de vie ?",
      "en": "How can pain manifest in an unconscious patient at end of life?",
      "choices": [
       {
        "fr": "Il ne peut jamais ressentir de douleur",
        "en": "They can never feel pain"
       },
       {
        "fr": "Grimaces, gémissements, agitation, tension musculaire",
        "en": "Grimacing, moaning, agitation, muscle tension",
        "correct": true
       },
       {
        "fr": "Augmentation de l'appétit",
        "en": "Increased appetite"
       },
       {
        "fr": "Amélioration du sommeil",
        "en": "Improved sleep"
       }
      ],
      "explFr": "Même inconscient, un patient peut manifester la douleur par des signes non verbaux : grimaces, gémissements, agitation, raideur musculaire. Ces signes doivent être évalués avec une échelle comportementale.",
      "explEn": "Even unconscious, a patient can show signs of pain through non-verbal cues: grimacing, moaning, agitation, muscle stiffness. These signs should be assessed using a behavioral scale."
     },
     {
      "type": "tf",
      "fr": "En toute fin de vie, l'hydratation et l'alimentation forcées améliorent généralement le confort du patient.",
      "en": "At the very end of life, forced hydration and feeding generally improve patient comfort.",
      "isTrue": false,
      "explFr": "Faux. En fin de vie, le corps a souvent moins besoin de nourriture et de liquides, et forcer l'alimentation/l'hydratation peut causer de l'inconfort (nausées, œdème, sécrétions). Les soins de bouche fréquents sont privilégiés.",
      "explEn": "False. At end of life, the body often needs less food and fluids, and forcing feeding/hydration can cause discomfort (nausea, edema, secretions). Frequent mouth care is preferred."
     },
     {
      "type": "scenario",
      "fr": "La conjointe de M. Roussel, en fin de vie, pleure dans le couloir et vous dit se sentir dépassée et coupable de ne pas être assez présente.\n\nQuelle est votre meilleure réponse ?",
      "en": "Mr. Roussel's spouse, who is at end of life, cries in the hallway and tells you she feels overwhelmed and guilty for not being present enough.\n\nWhat is your best response?",
      "choices": [
       {
        "fr": "Lui dire qu'elle devrait être présente davantage",
        "en": "Tell her she should be present more"
       },
       {
        "fr": "L'écouter avec empathie, valider ses émotions et lui offrir des ressources de soutien (travailleur social, bénévoles)",
        "en": "Listen with empathy, validate her emotions, and offer support resources (social worker, volunteers)",
        "correct": true
       },
       {
        "fr": "Lui dire de ne pas s'inquiéter, tout ira bien",
        "en": "Tell her not to worry, everything will be fine"
       },
       {
        "fr": "Éviter la conversation pour ne pas envenimer la situation",
        "en": "Avoid the conversation to not make things worse"
       }
      ],
      "explFr": "Le soutien aux proches fait partie intégrante des soins palliatifs. L'écoute empathique, la validation des émotions et l'orientation vers des ressources (travail social, groupes de soutien) aident la famille à traverser cette épreuve.",
      "explEn": "Supporting loved ones is an integral part of palliative care. Empathetic listening, validating emotions, and referring to resources (social work, support groups) help the family through this ordeal."
     },
     {
      "fr": "Le deuil anticipé désigne :",
      "en": "Anticipatory grief refers to:",
      "choices": [
       {
        "fr": "Le deuil vécu après le décès uniquement",
        "en": "Grief experienced only after death"
       },
       {
        "fr": "Le processus de deuil qui commence avant le décès, face à une perte annoncée",
        "en": "The grieving process that begins before death, in the face of an impending loss",
        "correct": true
       },
       {
        "fr": "Une maladie psychiatrique",
        "en": "A psychiatric illness"
       },
       {
        "fr": "Un deuil qui ne touche que les enfants",
        "en": "Grief that only affects children"
       }
      ],
      "explFr": "Le deuil anticipé est le processus émotionnel que vivent les proches (et parfois le patient) avant le décès, en réaction à la perte annoncée. Il peut inclure des émotions similaires au deuil post-décès.",
      "explEn": "Anticipatory grief is the emotional process experienced by loved ones (and sometimes the patient) before death, in reaction to the impending loss. It can include emotions similar to post-death grief."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "type": "tf",
      "fr": "En soins palliatifs, l'objectif principal est de prolonger la vie le plus longtemps possible, peu importe la qualité de vie.",
      "en": "En soins palliatifs, l'objectif principal est de prolonger la vie le plus longtemps possible, peu importe la qualité de vie.",
      "isTrue": false,
      "explFr": "Faux. L'objectif des soins palliatifs est la qualité de vie et le confort, pas la prolongation de la vie. Cela peut inclure de ne pas réanimer ou de ne pas initier de traitements agressifs selon les volontés du patient.",
      "explEn": "Faux. L'objectif des soins palliatifs est la qualité de vie et le confort, pas la prolongation de la vie. Cela peut inclure de ne pas réanimer ou de ne pas initier de traitements agressifs selon les volontés du patient."
     },
     {
      "fr": "Quel rôle joue le soignant lors d'un décès en établissement ?",
      "en": "Quel rôle joue le soignant lors d'un décès en établissement ?",
      "choices": [
       {
        "fr": "Quitter la chambre immédiatement et prévenir la famille par téléphone",
        "en": "Quitter la chambre immédiatement et prévenir la famille par téléphone"
       },
       {
        "fr": "Confirmer le décès, prévenir l'infirmière, respecter la dignité du défunt, soutenir la famille et documenter",
        "en": "Confirmer le décès, prévenir l'infirmière, respecter la dignité du défunt, soutenir la famille et documenter",
        "correct": true
       },
       {
        "fr": "Retirer immédiatement tous les appareils et effets personnels",
        "en": "Retirer immédiatement tous les appareils et effets personnels"
       },
       {
        "fr": "Attendre que la famille arrive avant de faire quoi que ce soit",
        "en": "Attendre que la famille arrive avant de faire quoi que ce soit"
       }
      ],
      "explFr": "Lors d'un décès, le soignant doit : appeler l'infirmière pour constater le décès, maintenir la dignité du défunt (position, propreté), soutenir les proches avec empathie, et documenter selon le protocole de l'établissement.",
      "explEn": "Lors d'un décès, le soignant doit : appeler l'infirmière pour constater le décès, maintenir la dignité du défunt (position, propreté), soutenir les proches avec empathie, et documenter selon le protocole de l'établissement."
     },
     {
      "type": "scenario",
      "fr": "M. Larochelle, 74 ans, vous dit en confidence : 'J'ai peur de mourir seul la nuit. Est-ce que vous pouvez rester avec moi ?'\n\nQuelle est votre réponse la plus appropriée ?",
      "en": "M. Larochelle, 74 ans, vous dit en confidence : 'J'ai peur de mourir seul la nuit. Est-ce que vous pouvez rester avec moi ?'\n\nQuelle est votre réponse la plus appropriée ?",
      "choices": [
       {
        "fr": "Lui promettre d'être là toute la nuit quoi qu'il arrive",
        "en": "Lui promettre d'être là toute la nuit quoi qu'il arrive"
       },
       {
        "fr": "L'écouter avec présence, valider sa peur, lui expliquer comment vous joindre et en parler à l'équipe pour organiser un soutien accru",
        "en": "L'écouter avec présence, valider sa peur, lui expliquer comment vous joindre et en parler à l'équipe pour organiser un soutien accru",
        "correct": true
       },
       {
        "fr": "Lui dire que tout le monde meurt seul de toute façon",
        "en": "Lui dire que tout le monde meurt seul de toute façon"
       },
       {
        "fr": "Changer rapidement de sujet pour éviter la conversation sur la mort",
        "en": "Changer rapidement de sujet pour éviter la conversation sur la mort"
       }
      ],
      "explFr": "La peur de mourir seul est une angoisse existentielle légitime. On valide sans fausses promesses, on explore ses besoins, et on implique l'équipe (bénévoles d'accompagnement, horaires adaptés) pour réduire l'isolement.",
      "explEn": "La peur de mourir seul est une angoisse existentielle légitime. On valide sans fausses promesses, on explore ses besoins, et on implique l'équipe (bénévoles d'accompagnement, horaires adaptés) pour réduire l'isolement."
     },
     {
      "fr": "En quoi consistent les soins de bouche (hygiène buccale) en fin de vie ?",
      "en": "En quoi consistent les soins de bouche (hygiène buccale) en fin de vie ?",
      "choices": [
       {
        "fr": "Brossage vigoureux des dents et rinçage au rince-bouche trois fois par jour",
        "en": "Brossage vigoureux des dents et rinçage au rince-bouche trois fois par jour"
       },
       {
        "fr": "Humidification régulière des muqueuses, nettoyage doux avec une éponge buccale, application de lubrifiant labial",
        "en": "Humidification régulière des muqueuses, nettoyage doux avec une éponge buccale, application de lubrifiant labial",
        "correct": true
       },
       {
        "fr": "Application d'un gel anesthésique toutes les 4 heures pour prévenir la douleur",
        "en": "Application d'un gel anesthésique toutes les 4 heures pour prévenir la douleur"
       },
       {
        "fr": "Irrigation à l'eau oxygénée pour prévenir les infections bactériennes",
        "en": "Irrigation à l'eau oxygénée pour prévenir les infections bactériennes"
       }
      ],
      "explFr": "En fin de vie, la bouche s'assèche souvent. Les soins buccaux fréquents (toutes les 2h) hydratent les muqueuses, préviennent l'inconfort et favorisent la dignité. On évite le brossage agressif — on préfère les éponges douces et la glycérine citron.",
      "explEn": "En fin de vie, la bouche s'assèche souvent. Les soins buccaux fréquents (toutes les 2h) hydratent les muqueuses, préviennent l'inconfort et favorisent la dignité. On évite le brossage agressif — on préfère les éponges douces et la glycérine citron."
     },
     {
      "type": "tf",
      "fr": "En fin de vie, le patient qui refuse de manger doit être nourri par sonde nasogastrique pour éviter la dénutrition.",
      "en": "En fin de vie, le patient qui refuse de manger doit être nourri par sonde nasogastrique pour éviter la dénutrition.",
      "isTrue": false,
      "explFr": "Faux. En phase terminale, le corps réduit naturellement ses besoins nutritionnels. La nutrition artificielle forcée peut causer de l'inconfort (œdème, nausées, sécrétions accrues). Les soins de bouche et le respect des volontés du patient priment.",
      "explEn": "Faux. En phase terminale, le corps réduit naturellement ses besoins nutritionnels. La nutrition artificielle forcée peut causer de l'inconfort (œdème, nausées, sécrétions accrues). Les soins de bouche et le respect des volontés du patient priment."
     },
     {
      "fr": "Qu'est-ce que le plan d'intervention interdisciplinaire (PII) en soins palliatifs ?",
      "en": "Qu'est-ce que le plan d'intervention interdisciplinaire (PII) en soins palliatifs ?",
      "choices": [
       {
        "fr": "Un formulaire d'admission spécifique aux soins palliatifs signé par le médecin",
        "en": "Un formulaire d'admission spécifique aux soins palliatifs signé par le médecin"
       },
       {
        "fr": "Un plan de soins coordonné entre médecin, infirmière, travailleur social, aumônier et famille, centré sur les objectifs du patient",
        "en": "Un plan de soins coordonné entre médecin, infirmière, travailleur social, aumônier et famille, centré sur les objectifs du patient",
        "correct": true
       },
       {
        "fr": "Un document légal de refus de réanimation signé par le patient et ses proches",
        "en": "Un document légal de refus de réanimation signé par le patient et ses proches"
       },
       {
        "fr": "Un protocole pharmacologique standardisé pour la gestion de la douleur terminale",
        "en": "Un protocole pharmacologique standardisé pour la gestion de la douleur terminale"
       }
      ],
      "explFr": "Le PII rassemble l'équipe interdisciplinaire autour des besoins et des objectifs du patient. Il intègre les dimensions physique, psychologique, sociale et spirituelle, et est réévalué régulièrement selon l'évolution.",
      "explEn": "Le PII rassemble l'équipe interdisciplinaire autour des besoins et des objectifs du patient. Il intègre les dimensions physique, psychologique, sociale et spirituelle, et est réévalué régulièrement selon l'évolution."
     },
     {
      "type": "scenario",
      "fr": "La conjointe de M. Tremblay, en fin de vie, est très en colère contre l'équipe et dit : 'Vous ne faites rien pour le sauver !'\n\nComment répondez-vous ?",
      "en": "La conjointe de M. Tremblay, en fin de vie, est très en colère contre l'équipe et dit : 'Vous ne faites rien pour le sauver !'\n\nComment répondez-vous ?",
      "choices": [
       {
        "fr": "Lui expliquer que le patient a fait ses choix et que l'équipe ne peut qu'obéir à ses directives",
        "en": "Lui expliquer que le patient a fait ses choix et que l'équipe ne peut qu'obéir à ses directives"
       },
       {
        "fr": "L'écouter avec calme et empathie, valider sa colère et proposer une rencontre avec l'infirmière et le médecin pour clarifier les soins",
        "en": "L'écouter avec calme et empathie, valider sa colère et proposer une rencontre avec l'infirmière et le médecin pour clarifier les soins",
        "correct": true
       },
       {
        "fr": "Lui remettre les documents sur les soins palliatifs sans commenter pour éviter d'envenimer la situation",
        "en": "Lui remettre les documents sur les soins palliatifs sans commenter pour éviter d'envenimer la situation"
       },
       {
        "fr": "Demander à un autre soignant d'intervenir, car la confrontation ne fait pas partie de votre rôle",
        "en": "Demander à un autre soignant d'intervenir, car la confrontation ne fait pas partie de votre rôle"
       }
      ],
      "explFr": "La colère d'un proche est souvent de la détresse et de la peur déguisées. On valide l'émotion sans se défendre ni juger. Proposer une rencontre avec l'équipe permet d'expliquer les soins, de clarifier les objectifs et d'impliquer la famille.",
      "explEn": "La colère d'un proche est souvent de la détresse et de la peur déguisées. On valide l'émotion sans se défendre ni juger. Proposer une rencontre avec l'équipe permet d'expliquer les soins, de clarifier les objectifs et d'impliquer la famille."
     },
     {
      "fr": "À quel moment idéal les soins palliatifs devraient-ils être intégrés dans la trajectoire de soins ?",
      "en": "À quel moment idéal les soins palliatifs devraient-ils être intégrés dans la trajectoire de soins ?",
      "choices": [
       {
        "fr": "Uniquement dans les derniers jours ou heures précédant le décès prévisible",
        "en": "Uniquement dans les derniers jours ou heures précédant le décès prévisible"
       },
       {
        "fr": "Dès l'annonce d'une maladie grave, en parallèle des traitements curatifs, selon les besoins du patient",
        "en": "Dès l'annonce d'une maladie grave, en parallèle des traitements curatifs, selon les besoins du patient",
        "correct": true
       },
       {
        "fr": "Seulement lorsque tous les traitements curatifs ont échoué ou ont été abandonnés",
        "en": "Seulement lorsque tous les traitements curatifs ont échoué ou ont été abandonnés"
       },
       {
        "fr": "Exclusivement en milieu hospitalier spécialisé, jamais en CHSLD ou à domicile",
        "en": "Exclusivement en milieu hospitalier spécialisé, jamais en CHSLD ou à domicile"
       }
      ],
      "explFr": "L'OMS recommande l'intégration précoce des soins palliatifs dès le diagnostic d'une maladie grave. Cela améliore la qualité de vie, réduit les hospitalisations inutiles et permet une meilleure préparation du patient et de sa famille.",
      "explEn": "L'OMS recommande l'intégration précoce des soins palliatifs dès le diagnostic d'une maladie grave. Cela améliore la qualité de vie, réduit les hospitalisations inutiles et permet une meilleure préparation du patient et de sa famille."
     },
     {
      "fr": "Quelle est la définition clinique de la phase agonique (déclin actif) ?",
      "en": "Quelle est la définition clinique de la phase agonique (déclin actif) ?",
      "choices": [
       {
        "fr": "Toute période de somnolence prolongée chez un patient âgé",
        "en": "Toute période de somnolence prolongée chez un patient âgé"
       },
       {
        "fr": "Stade ultime de la fin de vie avec signes de défaillance multi-organique et décès imminent (heures à jours)",
        "en": "Stade ultime de la fin de vie avec signes de défaillance multi-organique et décès imminent (heures à jours)",
        "correct": true
       },
       {
        "fr": "Un état d'inconfort psychologique sans corrélat physique observable",
        "en": "Un état d'inconfort psychologique sans corrélat physique observable"
       },
       {
        "fr": "Une phase de rémission partielle précédant une rechute de la maladie",
        "en": "Une phase de rémission partielle précédant une rechute de la maladie"
       }
      ],
      "explFr": "L'agonie correspond aux dernières heures ou jours. Signes : somnolence majeure, respiration de Cheyne-Stokes, marbrures, hypotension, oligurie, inconscience croissante. Ces signes permettent d'anticiper et de soutenir la famille.",
      "explEn": "L'agonie correspond aux dernières heures ou jours. Signes : somnolence majeure, respiration de Cheyne-Stokes, marbrures, hypotension, oligurie, inconscience croissante. Ces signes permettent d'anticiper et de soutenir la famille."
     },
     {
      "fr": "Comment gère-t-on la dyspnée en fin de vie quand le patient ne peut plus avaler ?",
      "en": "Comment gère-t-on la dyspnée en fin de vie quand le patient ne peut plus avaler ?",
      "choices": [
       {
        "fr": "Augmenter le débit d'O₂ à 15 L/min via masque à haute concentration",
        "en": "Augmenter le débit d'O₂ à 15 L/min via masque à haute concentration"
       },
       {
        "fr": "Morphine par voie SC ou IV à faible dose pour réduire la sensation de manque d'air",
        "en": "Morphine par voie SC ou IV à faible dose pour réduire la sensation de manque d'air",
        "correct": true
       },
       {
        "fr": "Encourager des exercices de respiration profonde trois fois par heure",
        "en": "Encourager des exercices de respiration profonde trois fois par heure"
       },
       {
        "fr": "Placer le patient en Trendelenburg pour améliorer le retour veineux",
        "en": "Placer le patient en Trendelenburg pour améliorer le retour veineux"
       }
      ],
      "explFr": "La morphine à faible dose réduit efficacement la dyspnée en fin de vie. Elle est titrée jusqu'au confort. La voie SC est privilégiée quand la voie orale est impossible. L'objectif est le confort, pas la correction de la saturation.",
      "explEn": "La morphine à faible dose réduit efficacement la dyspnée en fin de vie. Elle est titrée jusqu'au confort. La voie SC est privilégiée quand la voie orale est impossible. L'objectif est le confort, pas la correction de la saturation."
     },
     {
      "fr": "Quelle est la fréquence recommandée des soins de bouche en phase agonique ?",
      "en": "Quelle est la fréquence recommandée des soins de bouche en phase agonique ?",
      "choices": [
       {
        "fr": "Une fois par quart de travail suffit amplement",
        "en": "Une fois par quart de travail suffit amplement"
       },
       {
        "fr": "Toutes les 2 heures ou plus souvent si la sécheresse est marquée",
        "en": "Toutes les 2 heures ou plus souvent si la sécheresse est marquée",
        "correct": true
       },
       {
        "fr": "Uniquement si le patient le demande verbalement",
        "en": "Uniquement si le patient le demande verbalement"
       },
       {
        "fr": "Toutes les heures systématiquement si l'alimentation orale est impossible",
        "en": "Toutes les heures systématiquement si l'alimentation orale est impossible"
       }
      ],
      "explFr": "En phase terminale, la bouche s'assèche rapidement (respiration buccale, médicaments). Les soins buccaux toutes les 2 heures avec éponges douces, soluté physiologique et lubrifiant labial sont essentiels pour le confort.",
      "explEn": "En phase terminale, la bouche s'assèche rapidement (respiration buccale, médicaments). Les soins buccaux toutes les 2 heures avec éponges douces, soluté physiologique et lubrifiant labial sont essentiels pour le confort."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Qu'est-ce que le 'rattle' (stertors terminaux) et comment le prend-on en charge ?",
      "en": "Qu'est-ce que le 'rattle' (stertors terminaux) et comment le prend-on en charge ?",
      "choices": [
       {
        "fr": "Douleur abdominale caractéristique des dernières heures de vie",
        "en": "Douleur abdominale caractéristique des dernières heures de vie"
       },
       {
        "fr": "Bruit respiratoire causé par des sécrétions que le patient ne peut plus expectorer — gestion par position latérale, aspiration douce et hyoscine SC",
        "en": "Bruit respiratoire causé par des sécrétions que le patient ne peut plus expectorer — gestion par position latérale, aspiration douce et hyoscine SC",
        "correct": true
       },
       {
        "fr": "Toux sèche indicatrice d'une pneumonie terminale nécessitant des antibiotiques",
        "en": "Toux sèche indicatrice d'une pneumonie terminale nécessitant des antibiotiques"
       },
       {
        "fr": "Sifflement bronchique lié à une obstruction tumorale",
        "en": "Sifflement bronchique lié à une obstruction tumorale"
       }
      ],
      "explFr": "Les stertors (rattle) sont des bruits causés par des sécrétions pharyngées. Ils indiquent la proximité de la mort mais ne sont pas douloureux (patient souvent inconscient). Priorité : soutenir la famille et expliquer.",
      "explEn": "Les stertors (rattle) sont des bruits causés par des sécrétions pharyngées. Ils indiquent la proximité de la mort mais ne sont pas douloureux (patient souvent inconscient). Priorité : soutenir la famille et expliquer."
     },
     {
      "fr": "Quel est le rôle du travailleur social en soins palliatifs ?",
      "en": "Quel est le rôle du travailleur social en soins palliatifs ?",
      "choices": [
       {
        "fr": "Uniquement assister le patient dans ses démarches financières et administratives",
        "en": "Uniquement assister le patient dans ses démarches financières et administratives"
       },
       {
        "fr": "Soutien psychosocial, mobilisation des ressources, aide aux décisions, soutien au deuil de la famille",
        "en": "Soutien psychosocial, mobilisation des ressources, aide aux décisions, soutien au deuil de la famille",
        "correct": true
       },
       {
        "fr": "Prescrire les médicaments palliatifs et coordonner les soins médicaux",
        "en": "Prescrire les médicaments palliatifs et coordonner les soins médicaux"
       },
       {
        "fr": "Remplacer l'infirmière pour les soins de confort quotidiens",
        "en": "Remplacer l'infirmière pour les soins de confort quotidiens"
       }
      ],
      "explFr": "Le travailleur social en palliatif : évaluation psychosociale, soutien émotionnel, aide aux démarches, coordination du retour à domicile, médiation familiale, accompagnement du deuil avant et après le décès.",
      "explEn": "Le travailleur social en palliatif : évaluation psychosociale, soutien émotionnel, aide aux démarches, coordination du retour à domicile, médiation familiale, accompagnement du deuil avant et après le décès."
     },
     {
      "fr": "Qu'est-ce que le deuil anticipé et comment se manifeste-t-il ?",
      "en": "Qu'est-ce que le deuil anticipé et comment se manifeste-t-il ?",
      "choices": [
       {
        "fr": "Un deuil intense survenant immédiatement après le décès",
        "en": "Un deuil intense survenant immédiatement après le décès"
       },
       {
        "fr": "Le processus de deuil vécu avant le décès d'un proche face à une perte imminente annoncée",
        "en": "Le processus de deuil vécu avant le décès d'un proche face à une perte imminente annoncée",
        "correct": true
       },
       {
        "fr": "Une dépression clinique qui nécessite toujours une médication psychiatrique",
        "en": "Une dépression clinique qui nécessite toujours une médication psychiatrique"
       },
       {
        "fr": "Un deuil considéré pathologique qui doit être évité par le personnel soignant",
        "en": "Un deuil considéré pathologique qui doit être évité par le personnel soignant"
       }
      ],
      "explFr": "Le deuil anticipé permet à la famille d'intégrer la perte avant le décès. Il inclut des émotions similaires au deuil post-décès (tristesse, colère, négociation). Les soignants soutiennent ce processus par l'écoute et la présence.",
      "explEn": "Le deuil anticipé permet à la famille d'intégrer la perte avant le décès. Il inclut des émotions similaires au deuil post-décès (tristesse, colère, négociation). Les soignants soutiennent ce processus par l'écoute et la présence."
     },
     {
      "fr": "À quel moment idéal les soins palliatifs devraient-ils être intégrés dans la trajectoire de soins ?",
      "en": "À quel moment idéal les soins palliatifs devraient-ils être intégrés dans la trajectoire de soins ?",
      "choices": [
       {
        "fr": "Uniquement dans les derniers jours précédant le décès prévisible",
        "en": "Uniquement dans les derniers jours précédant le décès prévisible"
       },
       {
        "fr": "Dès l'annonce d'une maladie grave, en parallèle des traitements curatifs, selon les besoins du patient",
        "en": "Dès l'annonce d'une maladie grave, en parallèle des traitements curatifs, selon les besoins du patient",
        "correct": true
       },
       {
        "fr": "Seulement quand tous les traitements curatifs ont échoué ou été abandonnés",
        "en": "Seulement quand tous les traitements curatifs ont échoué ou été abandonnés"
       },
       {
        "fr": "Exclusivement en milieu hospitalier spécialisé",
        "en": "Exclusivement en milieu hospitalier spécialisé"
       }
      ],
      "explFr": "L'OMS recommande l'intégration précoce des soins palliatifs dès le diagnostic. Cela améliore la qualité de vie, réduit les hospitalisations inutiles et permet une meilleure préparation du patient et de sa famille.",
      "explEn": "L'OMS recommande l'intégration précoce des soins palliatifs dès le diagnostic. Cela améliore la qualité de vie, réduit les hospitalisations inutiles et permet une meilleure préparation du patient et de sa famille."
     },
     {
      "fr": "Qu'est-ce que le plan d'intervention interdisciplinaire (PII) en soins palliatifs ?",
      "en": "Qu'est-ce que le plan d'intervention interdisciplinaire (PII) en soins palliatifs ?",
      "choices": [
       {
        "fr": "Un formulaire d'admission spécifique aux soins palliatifs signé par le médecin",
        "en": "Un formulaire d'admission spécifique aux soins palliatifs signé par le médecin"
       },
       {
        "fr": "Un plan de soins coordonné entre médecin, infirmière, travailleur social, aumônier et famille, centré sur les objectifs du patient",
        "en": "Un plan de soins coordonné entre médecin, infirmière, travailleur social, aumônier et famille, centré sur les objectifs du patient",
        "correct": true
       },
       {
        "fr": "Un document légal de refus de réanimation signé par le patient",
        "en": "Un document légal de refus de réanimation signé par le patient"
       },
       {
        "fr": "Un protocole pharmacologique standardisé pour la gestion de la douleur",
        "en": "Un protocole pharmacologique standardisé pour la gestion de la douleur"
       }
      ],
      "explFr": "Le PII rassemble l'équipe interdisciplinaire autour des besoins du patient. Il intègre dimensions physique, psychologique, sociale et spirituelle, et est réévalué régulièrement selon l'évolution.",
      "explEn": "Le PII rassemble l'équipe interdisciplinaire autour des besoins du patient. Il intègre dimensions physique, psychologique, sociale et spirituelle, et est réévalué régulièrement selon l'évolution."
     },
     {
      "type": "tf",
      "fr": "En soins palliatifs, la morphine à dose thérapeutique vise à hâter le décès du patient.",
      "en": "En soins palliatifs, la morphine à dose thérapeutique vise à hâter le décès du patient.",
      "isTrue": false,
      "explFr": "Faux. La morphine est titrée pour soulager la douleur et la dyspnée, pas pour provoquer la mort. Des études montrent que des doses correctement titrées ne raccourcissent pas la vie (principe du double effet).",
      "explEn": "Faux. La morphine est titrée pour soulager la douleur et la dyspnée, pas pour provoquer la mort. Des études montrent que des doses correctement titrées ne raccourcissent pas la vie (principe du double effet)."
     },
     {
      "type": "tf",
      "fr": "La famille d'un patient conscient et apte peut décider de l'arrêt des traitements à sa place.",
      "en": "La famille d'un patient conscient et apte peut décider de l'arrêt des traitements à sa place.",
      "isTrue": false,
      "explFr": "Faux. Tant que le patient est apte, c'est lui seul qui décide. La famille peut être consultée et soutenue, mais n'a pas pouvoir de décision. Si le patient devient inapte, le mandataire légal ou la famille agit selon les directives anticipées.",
      "explEn": "Faux. Tant que le patient est apte, c'est lui seul qui décide. La famille peut être consultée et soutenue, mais n'a pas pouvoir de décision. Si le patient devient inapte, le mandataire légal ou la famille agit selon les directives anticipées."
     },
     {
      "type": "tf",
      "fr": "Les soins de confort en fin de vie peuvent inclure musique, toucher thérapeutique et présence des proches.",
      "en": "Les soins de confort en fin de vie peuvent inclure musique, toucher thérapeutique et présence des proches.",
      "isTrue": true,
      "explFr": "Vrai. Le confort en fin de vie est holistique : soins de bouche, positionnement, gestion de la douleur, mais aussi présence aimante, musique douce, lumière tamisée et accompagnement spirituel selon les préférences.",
      "explEn": "Vrai. Le confort en fin de vie est holistique : soins de bouche, positionnement, gestion de la douleur, mais aussi présence aimante, musique douce, lumière tamisée et accompagnement spirituel selon les préférences."
     },
     {
      "type": "scenario",
      "fr": "La famille de Mme Beausoleil, 87 ans, en phase agonique, exige une alimentation par sonde nasogastrique car 'elle doit manger pour garder ses forces'.\n\nComment gérez-vous cette situation ?",
      "en": "La famille de Mme Beausoleil, 87 ans, en phase agonique, exige une alimentation par sonde nasogastrique car 'elle doit manger pour garder ses forces'.\n\nComment gérez-vous cette situation ?",
      "choices": [
       {
        "fr": "Installer la sonde pour répondre à la demande de la famille",
        "en": "Installer la sonde pour répondre à la demande de la famille"
       },
       {
        "fr": "Expliquer avec empathie que l'alimentation forcée peut causer de l'inconfort en phase agonique et proposer une rencontre avec le médecin",
        "en": "Expliquer avec empathie que l'alimentation forcée peut causer de l'inconfort en phase agonique et proposer une rencontre avec le médecin",
        "correct": true
       },
       {
        "fr": "Refuser directement sans explication pour respecter les soins de confort",
        "en": "Refuser directement sans explication pour respecter les soins de confort"
       },
       {
        "fr": "Demander au médecin de prescrire la nutrition pour satisfaire la famille",
        "en": "Demander au médecin de prescrire la nutrition pour satisfaire la famille"
       }
      ],
      "explFr": "La famille réagit par culpabilité ('ne rien faire = abandon'). Expliquer que le corps en phase agonique ne peut plus métaboliser les nutriments, et que l'alimentation forcée peut causer inconfort et sécrétions. L'équipe coordonne la rencontre.",
      "explEn": "La famille réagit par culpabilité ('ne rien faire = abandon'). Expliquer que le corps en phase agonique ne peut plus métaboliser les nutriments, et que l'alimentation forcée peut causer inconfort et sécrétions. L'équipe coordonne la rencontre."
     },
     {
      "type": "scenario",
      "fr": "M. Gagné, 65 ans, cancer en phase terminale, vous confie vouloir demander l'AMM et vous demande de garder le secret vis-à-vis de sa famille.\n\nComment répondez-vous ?",
      "en": "M. Gagné, 65 ans, cancer en phase terminale, vous confie vouloir demander l'AMM et vous demande de garder le secret vis-à-vis de sa famille.\n\nComment répondez-vous ?",
      "choices": [
       {
        "fr": "Lui promettre de garder le secret et ne pas en parler à l'équipe",
        "en": "Lui promettre de garder le secret et ne pas en parler à l'équipe"
       },
       {
        "fr": "L'écouter avec empathie, valider sa démarche, l'informer du processus et aviser l'infirmière pour enclencher le suivi approprié",
        "en": "L'écouter avec empathie, valider sa démarche, l'informer du processus et aviser l'infirmière pour enclencher le suivi approprié",
        "correct": true
       },
       {
        "fr": "Lui expliquer qu'il doit d'abord en parler à sa famille avant toute décision",
        "en": "Lui expliquer qu'il doit d'abord en parler à sa famille avant toute décision"
       },
       {
        "fr": "Lui remettre le formulaire de demande d'AMM sans en parler à l'équipe",
        "en": "Lui remettre le formulaire de demande d'AMM sans en parler à l'équipe"
       }
      ],
      "explFr": "La demande d'AMM est un droit légal au Québec. Le soignant accueille avec respect et informe l'infirmière pour enclencher le processus. La confidentialité vis-à-vis de la famille est respectée tant que le patient est apte.",
      "explEn": "La demande d'AMM est un droit légal au Québec. Le soignant accueille avec respect et informe l'infirmière pour enclencher le processus. La confidentialité vis-à-vis de la famille est respectée tant que le patient est apte."
     },
     {
      "fr": "Qu'est-ce que la détresse existentielle en soins palliatifs et comment la soignant peut-il y répondre ?",
      "en": "Qu'est-ce que la détresse existentielle en soins palliatifs et comment la soignant peut-il y répondre ?",
      "choices": [
       {
        "fr": "Une douleur physique intense causée par la progression de la maladie terminale",
        "en": "Une douleur physique intense causée par la progression de la maladie terminale"
       },
       {
        "fr": "Une souffrance profonde liée à la perte de sens, à la peur de la mort et aux questions sur l'existence — abordée par la présence, l'écoute et le recours à l'intervenante spirituelle",
        "en": "Une souffrance profonde liée à la perte de sens, à la peur de la mort et aux questions sur l'existence — abordée par la présence, l'écoute et le recours à l'intervenante spirituelle",
        "correct": true
       },
       {
        "fr": "Un trouble psychiatrique fréquent en fin de vie nécessitant toujours une médication",
        "en": "Un trouble psychiatrique fréquent en fin de vie nécessitant toujours une médication"
       },
       {
        "fr": "Un état de confusion mentale lié aux médicaments opioïdes en phase terminale",
        "en": "Un état de confusion mentale lié aux médicaments opioïdes en phase terminale"
       }
      ],
      "explFr": "La détresse existentielle (peur de la mort, perte de sens, regrets) est fréquente en fin de vie. Le soignant y répond par la présence active, l'écoute sans jugement, et l'orientation vers l'aumônier ou l'intervenant en soins spirituels si le patient le souhaite.",
      "explEn": "La détresse existentielle (peur de la mort, perte de sens, regrets) est fréquente en fin de vie. Le soignant y répond par la présence active, l'écoute sans jugement, et l'orientation vers l'aumônier ou l'intervenant en soins spirituels si le patient le souhaite."
     }
    ]
   }
  ]
 }
];

/* ---- Textes de l'interface (bilingue) ---- */
const UI_TEXT = {
  fr: {
    appName: "SASIQuest",
    tagline: "Deviens un pro des soins — DEP 5325",
    start: "Commencer l'aventure",
    yourName: "Ton prénom",
    chooseAvatar: "Choisis ton avatar",
    map: "Mon parcours",
    badges: "Badges",
    trophies: "Trophées",
    leaderboard: "Palmarès",
    profile: "Profil",
    level: "Niveau",
    xp: "XP",
    locked: "Verrouillé",
    completeToUnlock: "Termine la quête précédente pour déverrouiller",
    startQuest: "Démarrer la quête",
    retryQuest: "Reprendre la quête",
    question: "Question",
    of: "sur",
    submit: "Valider",
    next: "Suivant",
    finish: "Terminer",
    correct: "Bonne réponse!",
    incorrect: "Ce n'est pas ça...",
    questResult: "Résultat de la quête",
    score: "Score",
    passed: "Quête réussie! Badge débloqué 🎉",
    failed: "Pas encore réussi — réessaie pour débloquer le badge (seuil: 70%)",
    backToMap: "Retour à la carte",
    newBadge: "Nouveau badge!",
    newTrophy: "Nouveau trophée!",
    hours: "heures",
    switchLang: "EN",
    privacy: "Confidentialité",
    resetProgress: "Réinitialiser tout",
    confirmReset: "Tout réinitialiser? Ton avatar, tes badges, trophées et toute ta progression seront effacés. Cette action est irréversible.",
    installApp: "Installer l'application",
    rank: "Rang",
    you: "Toi",
    leaderboardNote: "Classement local (démo) — un vrai palmarès de classe nécessite un serveur partagé.",
    completedQuests: "quêtes complétées",
    chooseVehicle: "Choisis ta machine",
    myVehicle: "Ta machine",
    vehicleGrows: "Évolue avec ton expérience",
    maxSize: "Taille maximale atteinte!",
    trueLabel: "Vrai",
    falseLabel: "Faux",
    tfPrompt: "Vrai ou faux?",
    masteredLabel: "compétences maîtrisées",
    tierLabel: "Palier",
    matchPrompt: "Touche un terme, puis sa définition qui correspond.",
    scenarioLabel: "Mise en situation",
    masteryUnlocked: "Compétence maîtrisée!",
    accessCodeTitle: "Code d'accès",
    accessCodePrompt: "Entre le code d'accès fourni par ton enseignant pour continuer.",
    accessCodeTrialOver: "Ton essai gratuit de 7 jours est terminé. Entre le code d'accès fourni par ton centre de formation pour continuer.",
    accessCodePlaceholder: "Code d'accès",
    accessCodeSubmit: "Valider",
    accessCodeChecking: "Vérification...",
    accessCodeInvalid: "Code invalide ou inactif. Vérifie auprès de ton enseignant.",
    accessCodeOffline: "Connexion Internet requise pour valider ton code la première fois. Réessaie une fois connecté.",
    accessCodeNotConfigured: "L'application n'est pas encore configurée. Contacte ton enseignant.",
    welcomeHeading: "Comment ça marche",
    welcomeIntro: "Avant de commencer, voici un survol rapide de l'application.",
    welcomeSteps: [
      { icon: "🗺️", title: "Mon parcours", text: "Chaque compétence du programme est une quête sur la carte. Termine-les dans l'ordre pour avancer." },
      { icon: "📝", title: "Questions", text: "Réponds à des questions à choix multiples et vrai/faux liées à chaque compétence." },
      { icon: "🎖️", title: "Badges", text: "Réussis une quête à 70% ou plus pour débloquer son badge." },
      { icon: "🏆", title: "Trophées", text: "Décroche des trophées spéciaux pour tes exploits et ta progression." },
      { icon: "📊", title: "Palmarès", text: "Compare ton avancement avec celui du reste de la classe." },
      { icon: "👷", title: "Ton avatar", text: "Choisis ton avatar — il évolue à mesure que tu gagnes de l'expérience." }
    ]
  },
  en: {
    appName: "SASIQuest",
    tagline: "Become a care pro — DVS 5325",
    start: "Start the adventure",
    yourName: "Your first name",
    chooseAvatar: "Choose your avatar",
    map: "My path",
    badges: "Badges",
    trophies: "Trophies",
    leaderboard: "Leaderboard",
    profile: "Profile",
    level: "Level",
    xp: "XP",
    locked: "Locked",
    completeToUnlock: "Complete the previous quest to unlock",
    startQuest: "Start quest",
    retryQuest: "Retry quest",
    question: "Question",
    of: "of",
    submit: "Submit",
    next: "Next",
    finish: "Finish",
    correct: "Correct!",
    incorrect: "Not quite...",
    questResult: "Quest Result",
    score: "Score",
    passed: "Quest passed! Badge unlocked 🎉",
    failed: "Not passed yet — try again to unlock the badge (threshold: 70%)",
    backToMap: "Back to map",
    newBadge: "New badge!",
    newTrophy: "New trophy!",
    hours: "hours",
    switchLang: "FR",
    privacy: "Privacy",
    resetProgress: "Reset everything",
    confirmReset: "Reset everything? Your avatar, badges, trophies and all progress will be erased. This cannot be undone.",
    installApp: "Install the app",
    rank: "Rank",
    you: "You",
    leaderboardNote: "Local (demo) ranking — a real class leaderboard needs a shared server.",
    completedQuests: "quests completed",
    chooseVehicle: "Choose your machine",
    myVehicle: "Your machine",
    vehicleGrows: "Evolves with your experience",
    maxSize: "Maximum size reached!",
    trueLabel: "True",
    falseLabel: "False",
    tfPrompt: "True or false?",
    masteredLabel: "competencies mastered",
    tierLabel: "Tier",
    matchPrompt: "Tap a term, then its matching definition.",
    scenarioLabel: "Scenario",
    masteryUnlocked: "Competency mastered!",
    accessCodeTitle: "Access code",
    accessCodePrompt: "Enter the access code given by your teacher to continue.",
    accessCodeTrialOver: "Your free 7-day trial has ended. Enter the access code provided by your training center to continue.",
    accessCodePlaceholder: "Access code",
    accessCodeSubmit: "Submit",
    accessCodeChecking: "Checking...",
    accessCodeInvalid: "Invalid or inactive code. Check with your teacher.",
    accessCodeOffline: "Internet connection required to validate your code the first time. Try again once connected.",
    accessCodeNotConfigured: "The app isn't configured yet. Contact your teacher.",
    welcomeHeading: "How it works",
    welcomeIntro: "Before you start, here's a quick overview of the app.",
    welcomeSteps: [
      { icon: "🗺️", title: "My path", text: "Each program competency is a quest on the map. Complete them in order to move forward." },
      { icon: "📝", title: "Questions", text: "Answer multiple-choice and true/false questions tied to each competency." },
      { icon: "🎖️", title: "Badges", text: "Pass a quest with 70% or more to unlock its badge." },
      { icon: "🏆", title: "Trophies", text: "Earn special trophies for your achievements and progress." },
      { icon: "📊", title: "Leaderboard", text: "Compare your progress with the rest of the class." },
      { icon: "👷", title: "Your avatar", text: "Choose your avatar — it evolves as you earn experience." }
    ]
  }
};

/* ---- Paliers de niveau (basés sur XP total) ---- */
const LEVELS = [
  { min: 0,    name_fr: "Novice",       name_en: "Novice",     avatarStage: 0 },
  { min: 200,  name_fr: "Apprenti(e)",  name_en: "Apprentice", avatarStage: 2 },
  { min: 500,  name_fr: "Compétent(e)", name_en: "Competent",  avatarStage: 4 },
  { min: 1000, name_fr: "Chevronné(e)", name_en: "Seasoned",   avatarStage: 6 },
  { min: 2000, name_fr: "Expert(e)",    name_en: "Expert",     avatarStage: 9 },
  { min: 3500, name_fr: "Maître",       name_en: "Master",     avatarStage: 11 }
];

/* ---- Personnages d'avatar (ouvriers de chantier / camionneurs) ----
   Chaque personnage est dessiné en SVG dans app.js (fonction AVATAR_SVG).
   "accent" = couleur par défaut du casque/gilet, modifiable via la
   sélection de couleur. */
const AVATAR_CHARACTERS = [
 {
  "id": "dragon",
  "name_fr": "Dragon",
  "name_en": "Dragon",
  "title_fr": "Le Sage",
  "title_en": "The Sage",
  "stages": [
   "🥚",
   "🥚",
   "🦎",
   "🦎",
   "🐲",
   "🐲",
   "🐉",
   "🐉",
   "🐉",
   "🐉",
   "🐉",
   "🐉"
  ]
 },
 {
  "id": "licorne",
  "name_fr": "Licorne",
  "name_en": "Unicorn",
  "title_fr": "La Guérisseuse",
  "title_en": "The Healer",
  "stages": [
   "🥚",
   "🥚",
   "🐴",
   "🐴",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄"
  ]
 },
 {
  "id": "phenix",
  "name_fr": "Phénix",
  "name_en": "Phoenix",
  "title_fr": "Le Résilient",
  "title_en": "The Resilient One",
  "stages": [
   "🥚",
   "🥚",
   "🐣",
   "🐣",
   "🐦",
   "🐦",
   "🦅",
   "🦅",
   "🦅",
   "🦅",
   "🦅",
   "🦅"
  ]
 },
 {
  "id": "griffon",
  "name_fr": "Griffon",
  "name_en": "Griffin",
  "title_fr": "Le Courageux",
  "title_en": "The Brave One",
  "stages": [
   "🥚",
   "🥚",
   "🐱",
   "🐱",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁"
  ]
 }
];

const AVATAR_COLORS = [
  { id: "jaune",  hex: "#f7b500", name_fr: "Jaune sécurité", name_en: "Safety Yellow" },
  { id: "orange", hex: "#ff7a1a", name_fr: "Orange chantier", name_en: "Site Orange" },
  { id: "vert",   hex: "#3bb54a", name_fr: "Vert forêt", name_en: "Forest Green" },
  { id: "bleu",   hex: "#2a7de1", name_fr: "Bleu acier", name_en: "Steel Blue" },
  { id: "rouge",  hex: "#e13c3c", name_fr: "Rouge feu", name_en: "Fire Red" }
];

/* ---- Machines de l'élève (grossissent avec le XP) ----
   Le dessin SVG de chaque machine est dans app.js (fonction vehicleSVG). */
const VEHICLE_TYPES = [
  { id: "camion", name_fr: "Camion à benne", name_en: "Dump Truck" },
  { id: "pelle", name_fr: "Pelle mécanique", name_en: "Excavator" },
  { id: "bouteur", name_fr: "Bouteur", name_en: "Bulldozer" },
  { id: "chargeuse", name_fr: "Chargeuse", name_en: "Loader" }
];

/* La hauteur affichée (en pixels) interpole entre minHeight et maxHeight
   selon le XP actuel de l'élève (voir vehicleHeight() dans app.js). La
   largeur est calculée automatiquement pour respecter les proportions
   propres à chaque machine (voir VEHICLE_VIEWBOX dans app.js). */
const VEHICLE_GROWTH = { minHeight: 78, maxHeight: 178, maxXP: 3500 };

/* ---- Commandes de cabine (questions basées sur une image) ----
   Chaque machine a 4 commandes numérotées, dessinées par cabinSVG()
   dans app.js aux coordonnées cx/cy (viewBox 0 0 360 220). Ces mêmes
   coordonnées servent à la fois à dessiner l'illustration et à
   positionner les zones cliquables des questions de type "hotspot" —
   l'image et les questions restent donc toujours alignées.
   Configuration générique à titre pédagogique — la disposition réelle
   varie selon le fabricant et le modèle (à valider par l'enseignant). */
const CABIN_CONTROLS = {
  pelle: [
    { num: 1, cx: 100, cy: 168, kind: "joystick",
      label_fr: "Joystick gauche", label_en: "Left joystick",
      desc_fr: "Contrôle la rotation de la tourelle et le godet",
      desc_en: "Controls turret rotation and the bucket" },
    { num: 2, cx: 210, cy: 168, kind: "joystick",
      label_fr: "Joystick droit", label_en: "Right joystick",
      desc_fr: "Contrôle la flèche et le bras (balancier)",
      desc_en: "Controls the boom and the stick (arm)" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédales de translation", label_en: "Travel pedals",
      desc_fr: "Font avancer ou reculer les chenilles",
      desc_en: "Move the tracks forward or backward" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  bouteur: [
    { num: 1, cx: 110, cy: 172, kind: "lever",
      label_fr: "Levier de la lame", label_en: "Blade control lever",
      desc_fr: "Lève, abaisse et incline la lame",
      desc_en: "Raises, lowers and tilts the blade" },
    { num: 2, cx: 210, cy: 172, kind: "lever",
      label_fr: "Manettes de direction (chenilles)", label_en: "Steering clutch levers",
      desc_fr: "Contrôlent la direction en ralentissant une chenille à la fois",
      desc_en: "Control steering by slowing one track at a time" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédale de frein", label_en: "Brake pedal",
      desc_fr: "Ralentit ou immobilise la machine",
      desc_en: "Slows or stops the machine" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  chargeuse: [
    { num: 1, cx: 210, cy: 168, kind: "lever",
      label_fr: "Levier de commande du godet", label_en: "Bucket control lever",
      desc_fr: "Lève, abaisse et bascule le godet",
      desc_en: "Raises, lowers and tilts the bucket" },
    { num: 2, cx: 110, cy: 172, kind: "wheel",
      label_fr: "Volant de direction", label_en: "Steering wheel",
      desc_fr: "Contrôle la direction des roues",
      desc_en: "Controls the direction of the wheels" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédale d'accélérateur", label_en: "Accelerator pedal",
      desc_fr: "Contrôle le régime moteur et la vitesse",
      desc_en: "Controls engine speed and travel speed" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  niveleuse: [
    { num: 1, cx: 190, cy: 172, kind: "lever",
      label_fr: "Leviers de la lame", label_en: "Blade control levers",
      desc_fr: "Ajustent l'angle, la hauteur et l'inclinaison de la lame",
      desc_en: "Adjust the blade's angle, height and tilt" },
    { num: 2, cx: 100, cy: 172, kind: "wheel",
      label_fr: "Volant de direction", label_en: "Steering wheel",
      desc_fr: "Contrôle la direction des roues avant",
      desc_en: "Controls the direction of the front wheels" },
    { num: 3, cx: 255, cy: 172, kind: "switch",
      label_fr: "Commande d'articulation du châssis", label_en: "Frame articulation control",
      desc_fr: "Articule le châssis pour resserrer le rayon de braquage",
      desc_en: "Articulates the frame to tighten the turning radius" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ]
};

/* ---- Trophées (méta-réussites) ---- */
const TROPHIES = [
  { id: "t_first", name_fr: "Premier pas", name_en: "First Step", icon: "🥉",
    desc_fr: "Réussir ton premier palier de compétence", desc_en: "Pass your first competency tier",
    check: (state) => Object.keys(state.completed).length >= 1 },
  { id: "t_half", name_fr: "Mi-parcours", name_en: "Halfway There", icon: "🥈",
    desc_fr: "Maîtriser 10 compétences (palier Avancé)", desc_en: "Master 10 competencies (Advanced tier)",
    check: (state) => (state.badges || []).length >= 10 },
  { id: "t_all", name_fr: "Diplômé virtuel", name_en: "Virtual Graduate", icon: "🏆",
    desc_fr: "Maîtriser les 20 compétences du programme", desc_en: "Master all 20 competencies of the program",
    check: (state) => (state.badges || []).length >= 20 },
  { id: "t_perfect", name_fr: "Sans faute", name_en: "Flawless", icon: "💯",
    desc_fr: "Obtenir 100% à un palier", desc_en: "Score 100% on a tier",
    check: (state) => Object.values(state.completed).some(s => s.score === 100) },
  { id: "t_safety", name_fr: "Zone sécurité", name_en: "Safety Zone", icon: "🦺",
    desc_fr: "Réussir le palier Débutant du module Santé et sécurité", desc_en: "Pass the Beginner tier of the Health & Safety module",
    check: (state) => state.completed["c02_1"] && state.completed["c02_1"].score >= 70 },
  { id: "t_streak", name_fr: "Assidu", name_en: "Dedicated", icon: "🔥",
    desc_fr: "Se connecter 3 jours différents", desc_en: "Log in on 3 different days",
    check: (state) => (state.loginDays || []).length >= 3 },
  { id: "t_podium", name_fr: "Sur le podium", name_en: "On the Podium", icon: "🏅",
    desc_fr: "Atteindre le top 3 du palmarès", desc_en: "Reach the top 3 of the leaderboard",
    check: (state) => (LEADERBOARD_SEED.filter(p => p.xp > state.xp).length) < 3 },
  { id: "t_matcher", name_fr: "Bon association", name_en: "Great Match", icon: "🧩",
    desc_fr: "Réussir 15 questions d'association de termes", desc_en: "Complete 15 term-matching questions",
    check: (state) => (state.matchesCompleted || 0) >= 15 }
];

/* ---- Palmarès (données d'exemple — classe fictive) ----
   À remplacer par de vraies données élèves lorsqu'un backend
   partagé sera branché (voir README). */
const LEADERBOARD_SEED = [
  { name: "Mia-Rose T.", xp: 3120, avatarChar: "operatrice_bouteur", avatarColor: "vert" },
  { name: "Xavier L.", xp: 2450, avatarChar: "contremaitre", avatarColor: "bleu" },
  { name: "Sam D.", xp: 1780, avatarChar: "camionneur", avatarColor: "orange" },
  { name: "Alicia P.", xp: 1290, avatarChar: "camionneuse", avatarColor: "rouge" },
  { name: "Kevin R.", xp: 860, avatarChar: "contremaitre", avatarColor: "jaune" },
  { name: "Noémie B.", xp: 430, avatarChar: "mecanicienne", avatarColor: "bleu" },
  { name: "Tommy G.", xp: 120, avatarChar: "camionneur", avatarColor: "vert" }
];
