/* ============================================================
   Thème saisonnier — couche d'accents visuels Quest
   ------------------------------------------------------------
   Ce module AJOUTE une mince couche décorative par-dessus
   l'identité visuelle de l'app. Il ne remplace jamais la palette
   de marque : le rouge d'action, les boutons, les CTA et les
   couleurs de progression restent intacts toute l'année.

   Il est volontairement AUTONOME : aucune dépendance à une app
   en particulier (pas de data.js, pas de state, pas de fonction
   de l'app). On peut le copier tel quel dans n'importe quel
   Quest ; il suffit d'ajouter le <script> dans index.html et le
   fichier dans la liste ASSETS du service worker.

   L'app porte une couleur TOUTE l'année : les 4 saisons couvrent le
   calendrier au complet, et une fête (Halloween, Noël, Pâques) prend
   le dessus sur la saison pendant sa fenêtre.

   APERÇU / DÉMO (sans attendre la bonne date) :
     Fêtes    : ?theme=halloween | ?theme=noel | ?theme=paques
     Saisons  : ?theme=automne | ?theme=hiver | ?theme=printemps | ?theme=ete
     Debug    : ?theme=aucun    → force « aucun thème » (app d'origine)
                ?theme=auto     → efface l'aperçu, retour au calendrier
   Le choix d'aperçu est retenu pour l'onglet courant (sessionStorage),
   donc la navigation interne de l'app le conserve.

   API console : window.ThemeSaisonnier
     .themeDuJour()          → le thème actif selon la date
     .dateDePaques(2027)     → Date (computus de Gauss/Meeus)
     .appliquer("noel")      → applique à chaud
     .retirer()              → enlève tout
   ============================================================ */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     1) CONFIGURATION — ajouter un thème = ajouter une entrée ici.
        Rien d'autre à modifier dans le fichier.

        rang     : 1 = fête, 2 = saison. Quand deux thèmes tombent le
                   même jour, le plus petit rang gagne. C'est ce qui
                   fait qu'Halloween l'emporte sur l'automne, et Noël
                   sur l'hiver, sans que l'ordre du tableau compte.
        periode  : { debut:"MM-JJ", fin:"MM-JJ" }   (bornes incluses,
                   peut chevaucher le 31 décembre : debut > fin)
              ou  { calcul:"paques", avant:N, apres:N } (fenêtre de
                   N jours autour de la date calculée de Pâques)
        couleurs : [accent1, accent2, accent3] — vives, jamais
                   délavées, jamais sombres. La 1re teinte les
                   bordures : éviter d'y mettre un vert franc ou un
                   rouge franc, qui se liraient comme « réussi » /
                   « erreur » dans l'app.
     ------------------------------------------------------------ */
  var THEMES = [
    {
      id: "paques",
      rang: 1,               // fête : prioritaire sur la saison
      nomFr: "Pâques",
      nomEn: "Easter",
      emoji: "🌷",            // icône du cartouche (de chaque côté du nom)
      deco: "🌸",             // filigrane, coin droit des cartes
      deco2: "🐣",            // filigrane, coin gauche des cartes
      // Corail en tête : le vert franc est déjà la couleur « réussi » de l'app,
      // on évite de le mettre sur les bordures pour ne pas brouiller le message.
      couleurs: ["#ff5a3c", "#00c853", "#ffd400"], // corail vif, vert printemps, jaune soleil
      fondBadge: "#00c853",
      texteBadge: "#07220f",
      periode: { calcul: "paques", avant: 4, apres: 3 }
    },
    {
      id: "halloween",
      rang: 1,               // fête : prioritaire sur la saison
      nomFr: "Halloween",
      nomEn: "Halloween",
      emoji: "🎃",
      deco: "👻",
      deco2: "🦇",
      couleurs: ["#ff6a00", "#9b1fe0", "#ffc400"], // citrouille, violet vif, ambre
      fondBadge: "#ff6a00",
      texteBadge: "#160b1f",
      periode: { debut: "10-15", fin: "11-01" }
    },
    {
      id: "noel",
      rang: 1,               // fête : prioritaire sur la saison
      nomFr: "Temps des Fêtes",
      nomEn: "Holidays",
      emoji: "🎄",
      deco: "❄️",
      deco2: "🎁",
      // Vert sapin en tête : le rouge de marque reste la couleur d'action de
      // l'app, on ne le met pas sur des bordures décoratives (ça se lirait
      // comme une erreur). Il revient dans le dégradé et le cartouche.
      couleurs: ["#00a03c", "#d42a1c", "#ffc93c"], // sapin vif, rouge de marque, doré
      fondBadge: "#d42a1c",
      texteBadge: "#ffffff",
      periode: { debut: "12-01", fin: "01-06" }
    },

    /* --- Les 4 saisons (rang 2). Elles se relaient pour couvrir le
           calendrier au complet : l'app a toujours une couleur, même
           hors période de fête. Bornes astronomiques arrondies. --- */
    {
      id: "automne",
      rang: 2,
      nomFr: "Automne",
      nomEn: "Fall",
      emoji: "🍁",
      deco: "🍂",
      deco2: "🌰",
      couleurs: ["#ff7a00", "#e0431f", "#ffc400"], // orange brûlé, rouge érable, or
      fondBadge: "#e0431f",
      texteBadge: "#ffffff",
      periode: { debut: "09-22", fin: "12-20" }   // Halloween prend le dessus mi-oct → 1er nov
    },
    {
      id: "hiver",
      rang: 2,
      nomFr: "Hiver",
      nomEn: "Winter",
      emoji: "⛄",
      // Pas de flocon ici : ❄️ est déjà le filigrane de Noël, on garde
      // les deux fêtes/saisons visuellement distinctes.
      deco: "🧊",
      deco2: "🧣",
      couleurs: ["#00b8ff", "#6c8cff", "#e8f6ff"], // bleu glacier, bleu givre, blanc argenté
      fondBadge: "#00b8ff",
      texteBadge: "#04222e",
      periode: { debut: "12-21", fin: "03-19" }   // Noël prend le dessus jusqu'au 6 janvier
    },
    {
      id: "printemps",
      rang: 2,
      nomFr: "Printemps",
      nomEn: "Spring",
      emoji: "🌱",
      deco: "🌼",
      deco2: "🐝",
      // Rose vif en tête plutôt que le vert : le vert franc est la
      // couleur « réussi » de l'app. Il reste dans le dégradé.
      couleurs: ["#ff3d8b", "#00d45e", "#ffd400"], // rose vif, vert pousse, jaune
      fondBadge: "#ff3d8b",
      texteBadge: "#ffffff",
      periode: { debut: "03-20", fin: "06-20" }   // Pâques prend le dessus sa semaine
    },
    {
      id: "ete",
      rang: 2,
      nomFr: "Été",
      nomEn: "Summer",
      emoji: "☀️",
      deco: "🌊",
      deco2: "🍉",
      // Turquoise puis bleu vif : ce sont les deux teintes qui colorent le
      // fond (mer et ciel). Le jaune soleil reste en 3e, en accents (ruban,
      // liseré du cartouche) — en 2e il virait au kaki sur fond sombre, et
      // il entrerait en concurrence avec le jaune de marque de l'app.
      couleurs: ["#00d1c1", "#00a3ff", "#ffcc00"], // turquoise, bleu vif, soleil
      fondBadge: "#00d1c1",
      texteBadge: "#04302c",
      periode: { debut: "06-21", fin: "09-21" }
    }
    /* Exemples à ajouter plus tard, même format (rang 1 = fête) :
       { id:"st-valentin", nomFr:"Saint-Valentin", nomEn:"Valentine's",
         emoji:"💖", deco:"💌", deco2:"🌹", couleurs:["#ff2d6f","#ff85a1","#ffd400"],
         fondBadge:"#ff2d6f", texteBadge:"#fff",
         periode:{ debut:"02-10", fin:"02-15" } },
       { id:"fete-nationale", nomFr:"Fête nationale", nomEn:"Québec Day",
         emoji:"⚜️", deco:"⚜️", deco2:"🎆", couleurs:["#0a66ff","#ffffff","#7fb3ff"],
         fondBadge:"#0a66ff", texteBadge:"#fff",
         periode:{ debut:"06-20", fin:"06-25" } },
       { id:"rentree", nomFr:"Rentrée", nomEn:"Back to school",
         emoji:"🍁", deco:"✏️", deco2:"📚", couleurs:["#ff7a00","#ffc400","#00c853"],
         fondBadge:"#ff7a00", texteBadge:"#1a1208",
         periode:{ debut:"08-20", fin:"09-10" } }
    */
  ];

  var ATTR = "data-saison";              // posé sur <html>
  var CLE_APERCU = "quest_apercu_saison"; // sessionStorage
  var ID_STYLE = "theme-saisonnier-css";

  /* ------------------------------------------------------------
     2) DATE DE PÂQUES — computus grégorien (Gauss / Meeus-Jones-
        Butcher). Calcul réel, valable pour toute année : aucune
        table codée en dur, rien à mettre à jour chaque année.
     ------------------------------------------------------------ */
  function dateDePaques(annee) {
    var a = annee % 19;
    var b = Math.floor(annee / 100);
    var c = annee % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var mois = Math.floor((h + l - 7 * m + 114) / 31);   // 3 = mars, 4 = avril
    var jour = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(annee, mois - 1, jour);
  }

  /* ------------------------------------------------------------
     3) Périodes
     ------------------------------------------------------------ */
  function jourSeul(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function mmjj(d) { return (d.getMonth() + 1) * 100 + d.getDate(); }
  function mmjjDeTexte(s) {
    var p = String(s).split("-");
    return parseInt(p[0], 10) * 100 + parseInt(p[1], 10);
  }

  function dansPeriodeFixe(d, periode) {
    var v = mmjj(d);
    var deb = mmjjDeTexte(periode.debut);
    var fin = mmjjDeTexte(periode.fin);
    if (deb <= fin) return v >= deb && v <= fin;
    return v >= deb || v <= fin; // période à cheval sur le 31 décembre
  }

  function dansPeriodePaques(d, periode) {
    var avant = periode.avant == null ? 4 : periode.avant;
    var apres = periode.apres == null ? 3 : periode.apres;
    var jour = jourSeul(d).getTime();
    // On teste l'année courante et la précédente : la fenêtre ne
    // traverse jamais le Nouvel An, mais ça reste sans risque.
    var annees = [d.getFullYear(), d.getFullYear() - 1];
    for (var n = 0; n < annees.length; n++) {
      var p = dateDePaques(annees[n]);
      var debut = new Date(p.getFullYear(), p.getMonth(), p.getDate() - avant).getTime();
      var fin = new Date(p.getFullYear(), p.getMonth(), p.getDate() + apres).getTime();
      if (jour >= debut && jour <= fin) return true;
    }
    return false;
  }

  function estActif(theme, d) {
    var p = theme.periode || {};
    if (p.calcul === "paques") return dansPeriodePaques(d, p);
    if (p.debut && p.fin) return dansPeriodeFixe(d, p);
    return false;
  }

  function rangDe(th) { return th && th.rang != null ? th.rang : 9; }

  /* Parmi tous les thèmes actifs ce jour-là, on garde le plus petit
     rang : une FÊTE (rang 1) l'emporte toujours sur la SAISON (rang 2).
     Le 25 octobre → Halloween, pas automne. Le 24 décembre → Noël, pas
     hiver. À rang égal, le premier de la liste gagne. */
  function themeDuJour(d) {
    var jour = d || new Date();
    var meilleur = null;
    for (var i = 0; i < THEMES.length; i++) {
      if (!estActif(THEMES[i], jour)) continue;
      if (!meilleur || rangDe(THEMES[i]) < rangDe(meilleur)) meilleur = THEMES[i];
    }
    return meilleur;
  }

  function parId(id) {
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i];
    return null;
  }

  /* ------------------------------------------------------------
     4) Aperçu forcé (?theme=…)
     ------------------------------------------------------------ */
  function lireParametre() {
    try {
      var q = new URLSearchParams(window.location.search);
      var v = q.get("theme") || q.get("saison");
      return v ? String(v).toLowerCase().trim() : null;
    } catch (e) { return null; }
  }

  function memoire(valeur) {
    try {
      if (valeur === undefined) return sessionStorage.getItem(CLE_APERCU);
      if (valeur === null) sessionStorage.removeItem(CLE_APERCU);
      else sessionStorage.setItem(CLE_APERCU, valeur);
    } catch (e) { /* mode privé : on continue sans mémoire */ }
    return valeur;
  }

  /* Retourne : un thème, "aucun" (forcé sans thème), ou null (= calendrier). */
  function apercu() {
    var v = lireParametre();
    if (v === "auto" || v === "calendrier") { memoire(null); return null; }
    if (v) memoire(v);
    else v = memoire();
    if (!v) return null;
    if (v === "aucun" || v === "none" || v === "off" || v === "rien") return "aucun";
    return parId(v) || null;
  }

  /* ------------------------------------------------------------
     5) Feuille de style — un bloc statique + une ligne de
        variables par thème (générée depuis la config).
     ------------------------------------------------------------ */
  /* "#ff6a00" → "255,106,0". Sert à fabriquer les voiles de couleur en
     rgba() sans que la config ait à répéter chaque teinte. */
  function hexEnRgb(hex) {
    var h = String(hex).replace("#", "").trim();
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) return "255,255,255";
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(",");
  }

  /* Guirlande d'emoji affichée en haut du contenu de chaque écran. */
  function guirlande(th) {
    var a = th.emoji, b = th.deco || th.emoji, c = th.deco2 || th.deco || th.emoji;
    return [a, b, c, a, b, c, a].join(" ");
  }

  function variablesDeTheme(th) {
    var c1 = th.couleurs[0];
    var c2 = th.couleurs[1] || c1;
    var c3 = th.couleurs[2] || c1;
    return ':root[' + ATTR + '="' + th.id + '"]{' +
      "--saison-1:" + c1 + ";--saison-2:" + c2 + ";--saison-3:" + c3 + ";" +
      "--saison-1-rgb:" + hexEnRgb(c1) + ";" +
      "--saison-2-rgb:" + hexEnRgb(c2) + ";" +
      "--saison-3-rgb:" + hexEnRgb(c3) + ";" +
      '--saison-emoji:"' + th.emoji + '";' +
      '--saison-deco:"' + (th.deco || th.emoji) + '";' +
      '--saison-deco2:"' + (th.deco2 || th.deco || th.emoji) + '";' +
      '--saison-guirlande:"' + guirlande(th) + '";' +
      "--saison-badge-fond:" + (th.fondBadge || c1) + ";" +
      "--saison-badge-texte:" + (th.texteBadge || "#ffffff") + ";" +
      "}";
  }

  var R = ":root[" + ATTR + "] ";   // raccourci de lecture

  var CSS_STATIQUE = [
    /* --- Éléments créés par le module. Ils vivent dans <body>, hors
           du conteneur de l'app : ils survivent à chaque re-rendu. --- */
    /* Ruban large et saturé, collé en haut de l'écran. */
    ".saison-ruban{position:fixed;top:env(safe-area-inset-top,0px);left:0;right:0;height:8px;z-index:900;" +
      "pointer-events:none;box-shadow:0 2px 14px rgba(var(--saison-1-rgb),.6);" +
      "background:linear-gradient(90deg,var(--saison-1),var(--saison-2),var(--saison-3),var(--saison-2),var(--saison-1));}",

    /* Cartouche : bannière suspendue au ruban, emoji de chaque côté. */
    ".saison-cartouche{position:fixed;top:calc(env(safe-area-inset-top,0px) + 8px);left:50%;" +
      "transform:translateX(-50%);z-index:901;pointer-events:none;display:flex;align-items:center;gap:7px;" +
      "padding:5px 18px 7px;border-radius:0 0 16px 16px;font-family:inherit;font-size:13.5px;font-weight:800;" +
      "line-height:1.25;letter-spacing:.3px;white-space:nowrap;border-bottom:3px solid var(--saison-3);" +
      "background:var(--saison-badge-fond);color:var(--saison-badge-texte);" +
      "box-shadow:0 6px 20px rgba(var(--saison-1-rgb),.55),0 2px 6px rgba(0,0,0,.35);}",
    ".saison-cartouche .saison-cartouche-emoji{font-size:16px;}",

    /* --- Accents posés sur l'app. Chaque règle est facultative :
           si la classe n'existe pas dans l'app, il ne se passe rien. --- */

    /* 1. Voile de couleur sur toute la page — c'est ce qui rend le thème
          visible d'un coup d'œil, sans toucher aux couleurs de marque.
          On n'écrase que background-image : la couleur de fond de l'app
          reste dessous, donc le texte garde son contraste. */
    R + "body{background-image:linear-gradient(180deg,rgba(var(--saison-1-rgb),.22),rgba(var(--saison-2-rgb),.16));}",
    /* Le padding du haut laisse la place au ruban + au cartouche : sans lui,
       la bannière recouvrirait le nom du totem dans la barre du haut. */
    R + "#app{padding-top:calc(env(safe-area-inset-top,0px) + 40px);background-image:" +
      "linear-gradient(180deg,rgba(var(--saison-1-rgb),.34) 0,rgba(var(--saison-1-rgb),.12) 260px," +
      "rgba(var(--saison-2-rgb),.12) 62%,rgba(var(--saison-2-rgb),.26) 100%);}",

    /* 2. Guirlande d'emoji en tête de chaque écran. */
    R + ".content::before," + R + ".onboarding::before{content:var(--saison-guirlande);display:block;" +
      "text-align:center;font-size:17px;line-height:1.1;word-spacing:11px;padding:4px 0 10px;" +
      "filter:drop-shadow(0 2px 7px rgba(var(--saison-1-rgb),.6));}",

    /* 3. Barre du haut : anneau lumineux autour de l'avatar. */
    R + ".avatar-chip{box-shadow:0 0 0 3px var(--saison-1),0 0 16px 3px rgba(var(--saison-1-rgb),.6);}",

    /* 4. Onglets : les inactifs prennent la teinte (l'onglet actif garde
          la couleur de marque de l'app), liseré épais en dessous. */
    R + ".tabs button:not(.active){background-color:rgba(var(--saison-1-rgb),.3);color:#fff;}",
    R + ".tabs button:not(.active):nth-child(even){background-color:rgba(var(--saison-2-rgb),.3);}",
    R + ".tabs{position:relative;}",
    R + ".tabs::after{content:\"\";position:absolute;left:16px;right:16px;bottom:3px;height:3px;" +
      "border-radius:3px;background:linear-gradient(90deg,var(--saison-1),var(--saison-2),var(--saison-3),var(--saison-1));}",

    /* 5. Carte de l'avatar et carte du totem : bordure pleine, halo coloré,
          fond teinté et DEUX filigranes (un par coin). */
    R + ".vehicle-showcase{position:relative;border:2px solid var(--saison-1);" +
      "background-image:linear-gradient(160deg,rgba(var(--saison-1-rgb),.28),rgba(var(--saison-2-rgb),.14));" +
      "box-shadow:0 0 0 1px rgba(var(--saison-3-rgb),.55),0 10px 28px rgba(var(--saison-1-rgb),.3);}",
    R + ".totem-card{position:relative;border-color:var(--saison-2);border-left:6px solid var(--saison-1);" +
      "background-image:linear-gradient(160deg,rgba(var(--saison-1-rgb),.26),rgba(var(--saison-2-rgb),.13));" +
      "box-shadow:0 10px 26px rgba(var(--saison-1-rgb),.28);}",
    R + ".vehicle-showcase::after," + R + ".totem-card::after{content:var(--saison-deco);" +
      "position:absolute;top:8px;right:12px;font-size:23px;line-height:1;pointer-events:none;" +
      "filter:drop-shadow(0 2px 6px rgba(0,0,0,.45));}",
    R + ".vehicle-showcase::before," + R + ".totem-card::before{content:var(--saison-deco2);" +
      "position:absolute;top:8px;left:12px;font-size:23px;line-height:1;pointer-events:none;" +
      "filter:drop-shadow(0 2px 6px rgba(0,0,0,.45));}",

    /* 6. Cartes de compétence : fond teinté (le vert « réussi » et les
          pastilles de palier, eux, ne bougent pas). */
    R + ".quest-node{background-image:linear-gradient(135deg,rgba(var(--saison-1-rgb),.2),rgba(var(--saison-2-rgb),.1));}"

    /* Volontairement PAS touché : les boutons d'action et CTA, la barre de
       progression, les pastilles de palier, l'onglet actif et les couleurs
       réussite/erreur du quiz. L'amplification reste décorative. */
  ].join("\n");

  function injecterStyle() {
    var el = document.getElementById(ID_STYLE);
    if (el) return;
    el = document.createElement("style");
    el.id = ID_STYLE;
    var vars = "";
    for (var i = 0; i < THEMES.length; i++) vars += variablesDeTheme(THEMES[i]) + "\n";
    el.textContent = "/* thème saisonnier */\n" + vars + CSS_STATIQUE;
    (document.head || document.documentElement).appendChild(el);
  }

  /* ------------------------------------------------------------
     6) Application
     ------------------------------------------------------------ */
  var themeCourant = null;

  function langue() {
    var l = (document.documentElement.getAttribute("lang") || "fr").toLowerCase();
    return l.indexOf("en") === 0 ? "en" : "fr";
  }

  function majCartouche() {
    var c = document.querySelector(".saison-cartouche");
    if (!c || !themeCourant) return;
    var nom = langue() === "en" ? (themeCourant.nomEn || themeCourant.nomFr) : themeCourant.nomFr;
    c.innerHTML = '<span class="saison-cartouche-emoji"></span>' +
                  '<span class="saison-cartouche-nom"></span>' +
                  '<span class="saison-cartouche-emoji"></span>';
    var spans = c.childNodes;
    spans[0].textContent = themeCourant.emoji;
    spans[1].textContent = nom;
    spans[2].textContent = themeCourant.emoji;
    c.setAttribute("aria-hidden", "true");
  }

  function decor(actif) {
    var ruban = document.querySelector(".saison-ruban");
    var cart = document.querySelector(".saison-cartouche");
    if (!actif) {
      if (ruban) ruban.remove();
      if (cart) cart.remove();
      return;
    }
    if (!document.body) return;
    if (!ruban) {
      ruban = document.createElement("div");
      ruban.className = "saison-ruban";
      ruban.setAttribute("aria-hidden", "true");
      document.body.appendChild(ruban);
    }
    if (!cart) {
      cart = document.createElement("div");
      cart.className = "saison-cartouche";
      document.body.appendChild(cart);
    }
    majCartouche();
  }

  function appliquer(theme) {
    var th = typeof theme === "string" ? parId(theme) : theme;
    themeCourant = th || null;
    injecterStyle();
    if (!themeCourant) {
      document.documentElement.removeAttribute(ATTR);
      decor(false);
      return null;
    }
    document.documentElement.setAttribute(ATTR, themeCourant.id);
    decor(true);
    return themeCourant;
  }

  function retirer() { return appliquer(null); }

  function demarrer() {
    try {
      var forcee = apercu();               // thème | "aucun" | null
      if (forcee === "aucun") { appliquer(null); return; }
      appliquer(forcee || themeDuJour());
      // La langue de l'app peut changer sans rechargement : on suit
      // l'attribut lang de <html> pour retraduire le cartouche.
      if (window.MutationObserver) {
        new MutationObserver(majCartouche).observe(document.documentElement, {
          attributes: true, attributeFilter: ["lang"]
        });
      }
    } catch (e) {
      // Un thème décoratif ne doit JAMAIS empêcher l'app de fonctionner.
      try { console.warn("Thème saisonnier désactivé :", e); } catch (e2) {}
    }
  }

  window.ThemeSaisonnier = {
    themes: THEMES,
    dateDePaques: dateDePaques,
    themeDuJour: themeDuJour,
    appliquer: appliquer,
    retirer: retirer,
    apercu: apercu
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
