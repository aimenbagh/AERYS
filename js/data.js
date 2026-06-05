/* ============================================================
   AERYS — Données en mémoire (aucune base de données)
   Tout est statique / runtime JS. Persistance volontairement absente.
   ============================================================ */

const IMG = 'assets/img/';

const DATA = {
  // ---- Utilisateur courant (par rôle) ----
  users: {
    employe: {
      name: 'Rania', firstName: 'Rania', role: 'employe', roleLabel: 'Réception – Front Office',
      dept: 'Réception', email: 'rania@hyattalger.com', avatar: null,
      points: 1250, level: 'Expert en service', member: 'janvier 2026',
    },
    manager: {
      name: 'Rania', role: 'manager', roleLabel: 'Manager Formation',
      dept: 'Hyatt Regency Alger Airport', email: 'rania.m@hyattalger.com',
      points: null, avatar: null,
    },
    formateur: {
      name: 'Rania', role: 'formateur', roleLabel: 'Formatrice',
      dept: 'Excellence & Service', email: 'rania.f@hyattalger.com', avatar: null,
    },
  },

  // ---- Activités (catalogue employé) ----
  activities: [
    { id:'q1', type:'Quiz', icon:'quiz', title:'Accueil client parfait', desc:'10 questions • Réception',
      meta:'10 questions', points:10, difficulty:'Facile', progress:0,
      img:'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=70' },
    { id:'j1', type:'Jeu', icon:'gamepad', title:'Mission Hyatt', desc:'Aidez le client à vivre la meilleure expérience',
      meta:'Mini-jeu', points:20, difficulty:'Moyen', progress:0,
      img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=70' },
    { id:'d1', type:'Devinette', icon:'riddle', title:'Qui suis-je ?', desc:'Devinez l\u2019objet ou le service mystère',
      meta:'Devinette', points:15, difficulty:'Facile', progress:0,
      img:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=70' },
    { id:'s1', type:'Simulation', icon:'simulation', title:'Gestion des réclamations', desc:'Gérez la situation comme un professionnel',
      meta:'Mise en situation', points:30, difficulty:'Avancé', progress:0,
      img:'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=70' },
    { id:'m1', type:'Micro-learning', icon:'microlearning', title:'5 clés du service Hyatt', desc:'5 minutes pour retenir l\u2019essentiel',
      meta:'5 min', points:10, difficulty:'Facile', progress:60,
      img:'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=70' },
    { id:'v1', type:'Vidéo', icon:'video', title:'Standards de service', desc:'Vidéo courte • Restauration',
      meta:'4 min', points:10, difficulty:'Facile', progress:0,
      img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70' },
  ],

  activityFilters: ['Tous','Quiz','Jeu','Devinette','Simulation','Micro-learning','Vidéo'],

  // ---- Quiz interactif ----
  quiz: {
    title:'Accueil client parfait', total:10, current:1, score:0,
    points:10,
    badge:{ name:'Accueil Pro', progress:'0 / 10 bonnes réponses', pct:0 },
    questions:[
      {
        question:'Quelle est la première chose à faire lorsqu\u2019un client arrive à la réception ?',
        options:[
          { l:'A', t:'Le laisser attendre quelques secondes', correct:false },
          { l:'B', t:'Le saluer chaleureusement et établir un contact visuel', correct:true },
          { l:'C', t:'Demander directement sa réservation', correct:false },
          { l:'D', t:'Appeler un coll\u00e8gue pour l\u2019aider', correct:false },
        ],
        explanation:'Un bon accueil commence par un sourire et un contact visuel imm\u00e9diat.',
      },
      {
        question:'Quelle information doit \u00eatre v\u00e9rifi\u00e9e avant de remettre la cl\u00e9 de la chambre ?',
        options:[
          { l:'A', t:'Le num\u00e9ro de t\u00e9l\u00e9phone du client', correct:false },
          { l:'B', t:'L\u2019identit\u00e9 et la r\u00e9servation du client', correct:true },
          { l:'C', t:'Son moyen de transport', correct:false },
          { l:'D', t:'Son programme touristique', correct:false },
        ],
        explanation:'V\u00e9rifier l\u2019identit\u00e9 et la r\u00e9servation garantit la s\u00e9curit\u00e9 et \u00e9vite les erreurs d\u2019attribution de chambre.',
      },
      {
        question:'Quelle est la meilleure attitude face \u00e0 une r\u00e9clamation client ?',
        options:[
          { l:'A', t:'Se justifier imm\u00e9diatement', correct:false },
          { l:'B', t:'Ignorer le probl\u00e8me', correct:false },
          { l:'C', t:'\u00c9couter attentivement et proposer une solution', correct:true },
          { l:'D', t:'Rediriger le client vers un autre service', correct:false },
        ],
        explanation:'L\u2019\u00e9coute active et une solution rapide transforment une plainte en exp\u00e9rience positive.',
      },
      {
        question:'Apr\u00e8s combien de sonneries un appel doit-il id\u00e9alement \u00eatre pris \u00e0 la r\u00e9ception ?',
        options:[
          { l:'A', t:'6 sonneries', correct:false },
          { l:'B', t:'5 sonneries', correct:false },
          { l:'C', t:'3 sonneries maximum', correct:true },
          { l:'D', t:'8 sonneries', correct:false },
        ],
        explanation:'D\u00e9crocher avant la 3\u00e8me sonnerie est le standard professionnel de l\u2019h\u00f4tellerie.',
      },
      {
        question:'Quel \u00e9l\u00e9ment influence le plus la premi\u00e8re impression d\u2019un client ?',
        options:[
          { l:'A', t:'Le prix de la chambre', correct:false },
          { l:'B', t:'L\u2019accueil et le sourire du personnel', correct:true },
          { l:'C', t:'Le restaurant', correct:false },
          { l:'D', t:'Le parking', correct:false },
        ],
        explanation:'La premi\u00e8re impression se forme en quelques secondes et repose avant tout sur le comportement du personnel.',
      },
      {
        question:'Que doit faire un r\u00e9ceptionniste avec les informations personnelles des clients ?',
        options:[
          { l:'A', t:'Les partager avec les coll\u00e8gues', correct:false },
          { l:'B', t:'Les afficher au comptoir', correct:false },
          { l:'C', t:'Les conserver de mani\u00e8re confidentielle', correct:true },
          { l:'D', t:'Les communiquer aux autres clients', correct:false },
        ],
        explanation:'La confidentialit\u00e9 des donn\u00e9es clients est une obligation l\u00e9gale (RGPD) et un gage de confiance.',
      },
      {
        question:'Lors d\u2019un check-in, que peut proposer le r\u00e9ceptionniste pour augmenter le chiffre d\u2019affaires ?',
        options:[
          { l:'A', t:'Ignorer les services compl\u00e9mentaires', correct:false },
          { l:'B', t:'Un surclassement ou des services additionnels', correct:true },
          { l:'C', t:'Une r\u00e9duction syst\u00e9matique', correct:false },
          { l:'D', t:'Une chambre moins ch\u00e8re', correct:false },
        ],
        explanation:'L\u2019upselling au check-in est une opportunit\u00e9 de g\u00e9n\u00e9rer des revenus tout en am\u00e9liorant l\u2019exp\u00e9rience client.',
      },
      {
        question:'Que doit faire un employ\u00e9 s\u2019il constate une situation inhabituelle dans l\u2019h\u00f4tel ?',
        options:[
          { l:'A', t:'Ne rien signaler', correct:false },
          { l:'B', t:'Attendre la fin du service', correct:false },
          { l:'C', t:'Informer imm\u00e9diatement son responsable', correct:true },
          { l:'D', t:'En parler aux clients', correct:false },
        ],
        explanation:'Signaler rapidement toute anomalie est essentiel pour la s\u00e9curit\u00e9 des clients et du personnel.',
      },
      {
        question:'Quel service est responsable de la propret\u00e9 des chambres ?',
        options:[
          { l:'A', t:'R\u00e9ception', correct:false },
          { l:'B', t:'Restauration', correct:false },
          { l:'C', t:'Housekeeping / \u00c9tages', correct:true },
          { l:'D', t:'Comptabilit\u00e9', correct:false },
        ],
        explanation:'Le service Housekeeping est d\u00e9di\u00e9 \u00e0 l\u2019entretien et \u00e0 la propret\u00e9 des chambres et des espaces communs.',
      },
      {
        question:'Quel est l\u2019objectif principal de chaque employ\u00e9 d\u2019un h\u00f4tel ?',
        options:[
          { l:'A', t:'Finir son service rapidement', correct:false },
          { l:'B', t:'R\u00e9duire les d\u00e9penses du client', correct:false },
          { l:'C', t:'Garantir la satisfaction et la fid\u00e9lisation du client', correct:true },
          { l:'D', t:'Vendre uniquement des chambres', correct:false },
        ],
        explanation:'La satisfaction client est le c\u0153ur du m\u00e9tier h\u00f4telier : un client satisfait revient et recommande l\u2019\u00e9tablissement.',
      },
    ],
  },

  // ---- Planning employé ----
  week: { label:'20 – 26 mai 2026', days:[
    {n:'Lun',d:20,dot:true},{n:'Mar',d:21,dot:true},{n:'Mer',d:22,dot:true},
    {n:'Jeu',d:23,dot:true,active:true},{n:'Ven',d:24,dot:true},{n:'Sam',d:25,dot:true},{n:'Dim',d:26,dot:true},
  ]},
  planning: [
    { time:'10h00', type:'Quiz', icon:'quiz', title:'Accueil client parfait', status:'À compléter', live:false },
    { time:'14h00', type:'Classe virtuelle', icon:'classvirtual', title:'L\u2019art d\u2019accueillir un client VIP', status:'En ligne', live:true },
    { time:'16h00', type:'Jeu', icon:'gamepad', title:'Mission Hyatt', status:'À compléter', live:false },
  ],

  // ---- Récompenses / boutique ----
  shopFilters: ['Tous','Expériences','Cartes cadeaux','Goodies','Autres'],
  shop: [
    { name:'Carte Starbucks', desc:'Profitez d\u2019un café offert chez Starbucks.', pts:500, stock:15, cat:'Cartes cadeaux',
      img:'https://images.unsplash.com/photo-1572286258217-215cf8e667d2?w=400&q=70' },
    { name:'Bon repas Hyatt', desc:'Savourez un repas dans nos restaurants Hyatt.', pts:1500, stock:8, cat:'Expériences',
      img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=70' },
    { name:'Bon cinéma', desc:'Une place de cinéma pour vous détendre.', pts:2000, stock:10, cat:'Expériences',
      img:'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=70' },
    { name:'Coffret cadeau Hyatt', desc:'Un coffret exclusif signé Hyatt.', pts:5000, stock:5, cat:'Goodies',
      img:'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=70' },
    { name:'Nuitée gratuite Hyatt', desc:'Profitez d\u2019une nuit gratuite dans nos hôtels.', pts:10000, stock:2, cat:'Expériences',
      img:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=70' },
    { name:'Bon voyage', desc:'Réduction sur votre prochain voyage.', pts:7000, stock:6, cat:'Expériences',
      img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=70' },
  ],

  // ---- Manager : dashboard ----
  mgrStats: [
    { icon:'users', tone:'it-violet-soft', label:'Employés inscrits', value:'128', unit:'employés' },
    { icon:'target', tone:'it-green', label:'Taux de participation', value:'72 %', unit:'', ring:72, ringColor:'#1FA463' },
    { icon:'cap', tone:'it-blue', label:'Formations terminées', value:'156', unit:'formations' },
    { icon:'star', tone:'it-orange', label:'Score moyen', value:'83 %', unit:'' },
    { icon:'clock', tone:'it-red', label:'Employés en retard', value:'5', unit:'employés' },
    { icon:'calendar', tone:'it-gold-soft', label:'Sessions à venir', value:'3', unit:'sessions' },
  ],
  mgrAlerts: [
    { icon:'alertuser', tone:'it-red', text:'5 employés en retard sur leurs formations', action:'Voir les employés', go:'mgr-late' },
    { icon:'cap', tone:'it-orange', text:'3 formations obligatoires non terminées', action:'Relancer', go:'mgr-send-reminder' },
    { icon:'mail', tone:'it-violet-soft', text:'1 demande de formation en attente de réponse du formateur', action:'Suivre la demande', go:'mgr-trainers' },
  ],
  mgrQuick: [
    { icon:'userplus', tone:'it-violet', label:'Assigner une formation', go:'mgr-assign' },
    { icon:'edit', tone:'it-green', label:'Demander une formation spécifique', go:'mgr-trainers' },
    { icon:'bell', tone:'it-gold', label:'Envoyer un rappel', go:'mgr-send-reminder' },
    { icon:'chartline', tone:'it-blue', label:'Voir rapport mensuel', go:'mgr-reports' },
  ],

  // ---- Manager : Rapports & Formateurs (détection des besoins) ----
  trainersStats: [
    { icon:'target', tone:'it-violet-soft', label:'Compétences à renforcer', value:'4' },
    { icon:'user', tone:'it-violet-soft', label:'Employés concernés', value:'18' },
    { icon:'users', tone:'it-violet-soft', label:'Formateurs disponibles', value:'6' },
  ],
  skillGaps: [
    { icon:'info', name:'Gestion des réclamations', v:62, prio:'Priorité haute', ptone:'badge-red', count:7 },
    { icon:'trend', name:'Upselling & vente', v:58, prio:'Priorité moyenne', ptone:'badge-orange', count:5 },
    { icon:'compass', name:'Anglais professionnel', v:54, prio:'Priorité haute', ptone:'badge-red', count:4 },
    { icon:'star', name:'Service VIP', v:49, prio:'Priorité moyenne', ptone:'badge-orange', count:2 },
  ],
  trainerReco: 'Le Front Office présente une faiblesse en gestion des réclamations. Une formation pratique est recommandée cette semaine.',
  recommendedTrainers: [
    { name:'Sofia Benali', role:'Experte relation client', rating:'4,9/5', photo:'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&fit=crop&crop=faces',
      offer:'Simulation « Gérer les réclamations clients difficiles »', format:'classe virtuelle + cas pratiques' },
    { name:'Karim Aït', role:'Formateur vente hôtelière', rating:'4,7/5', photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces',
      offer:'Atelier « Upselling à la réception »', format:'quiz + mise en situation' },
    { name:'Leïla Mansouri', role:'Formatrice langues & service', rating:'4,8/5', photo:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=faces',
      offer:'« English for Front Office »', format:'micro-learning + session live' },
  ],

  // ---- Manager : formulaire « Demande de formation » ----
  requestTypes: [
    { id:'quiz', icon:'quiz', label:'Quiz' },
    { id:'jeu', icon:'gamepad', label:'Jeu' },
    { id:'simulation', icon:'users', label:'Simulation' },
    { id:'classvirtual', icon:'video', label:'Classe virtuelle' },
  ],
  requestDepartments: ['Réception','Housekeeping','Restauration','Maintenance','Commercial','RH'],
  requestAudiences: ['Équipe Front Office','Équipe Housekeeping','Équipe Restauration','Tous les employés','Nouveaux arrivants'],

  // ---- Manager : équipes ----
  departments: [
    { name:'Réception', count:24, prog:75, late:2, score:82, icon:'user', color:'#5B21D6' },
    { name:'Housekeeping', count:32, prog:68, late:4, score:78, icon:'bed', color:'#1FA463' },
    { name:'Restauration', count:18, prog:70, late:1, score:84, icon:'giftcard', color:'#E8912B' },
    { name:'Maintenance', count:12, prog:65, late:2, score:76, icon:'wrench', color:'#2E7BD6' },
    { name:'Commercial', count:14, prog:80, late:0, score:88, icon:'briefcase', color:'#5B21D6' },
    { name:'RH', count:8, prog:60, late:1, score:76, icon:'users', color:'#E0413B' },
  ],
  employees: [
    { name:'Yasmine Belkacem', poste:'Réceptionniste', prog:88, score:90, badges:5, status:'À jour', tone:'badge-green' },
    { name:'Amine Khelifi', poste:'Réceptionniste', prog:72, score:78, badges:3, status:'En cours', tone:'badge-orange' },
    { name:'Sofia Benali', poste:'Guest Relations', prog:55, score:70, badges:2, status:'En retard', tone:'badge-red' },
    { name:'Khaled Nasri', poste:'Night Auditor', prog:92, score:95, badges:6, status:'À jour', tone:'badge-green' },
    { name:'Leila Hamdi', poste:'Réceptionniste', prog:40, score:60, badges:1, status:'En retard', tone:'badge-red' },
    { name:'Nadia Cherif', poste:'Femme de chambre', prog:80, score:85, badges:4, status:'À jour', tone:'badge-green' },
    { name:'Omar Saidi', poste:'Gouvernant', prog:64, score:74, badges:2, status:'En cours', tone:'badge-orange' },
    { name:'Rania Touati', poste:'Serveuse', prog:78, score:82, badges:3, status:'À jour', tone:'badge-green' },
    { name:'Yacine Boumediene', poste:'Chef de rang', prog:50, score:66, badges:2, status:'En retard', tone:'badge-red' },
    { name:'Karim Ould', poste:'Cuisinier', prog:70, score:80, badges:3, status:'En cours', tone:'badge-orange' },
    { name:'Samir Brahimi', poste:'Technicien de maintenance', prog:60, score:72, badges:2, status:'En cours', tone:'badge-orange' },
    { name:'Lina Mansour', poste:'Commercial', prog:90, score:88, badges:5, status:'À jour', tone:'badge-green' },
    { name:'Walid Ferhat', poste:'Chargé RH', prog:58, score:76, badges:2, status:'En cours', tone:'badge-orange' },
  ],

  // ---- Manager : rapports ----
  reportKpis: [
    { icon:'cap', tone:'it-violet-soft', label:'Taux de complétion', value:'72 %', delta:'+6% vs Avr.', up:true },
    { icon:'checkcircle', tone:'it-green', label:'Taux de réussite', value:'83 %', delta:'+4% vs Avr.', up:true },
    { icon:'book', tone:'it-blue', label:'Formations terminées', value:'156', delta:'+18 vs Avr.', up:true },
    { icon:'clock', tone:'it-orange', label:'Heures de formation', value:'542 h', delta:'+42h vs Avr.', up:true },
    { icon:'alertuser', tone:'it-red', label:'Employés en retard', value:'5', delta:'+2 vs Avr.', up:false },
  ],
  reportTrend: [
    {m:'Déc.',v:78},{m:'Janv.',v:92},{m:'Févr.',v:110},{m:'Mars',v:130},{m:'Avr.',v:138},{m:'Mai',v:156},
  ],
  reportDeptPerf: [
    { name:'Réception', comp:75, score:84 },
    { name:'Housekeeping', comp:68, score:80 },
    { name:'Restauration', comp:70, score:82 },
    { name:'Maintenance', comp:65, score:78 },
    { name:'Commercial', comp:80, score:88 },
    { name:'RH', comp:60, score:76 },
  ],
  skillsTop: [
    {n:'Service client',v:90},{n:'Communication',v:85},{n:'Travail en équipe',v:82},{n:'Gestion des réclamations',v:78},{n:'Upselling',v:75},
  ],
  skillsLow: [
    {n:'Gestion du stress',v:55},{n:'Connaissance produit',v:60},{n:'Langues étrangères',v:62},{n:'Leadership',v:65},{n:'Outils digitaux',v:68},
  ],
  formationMix: [
    { n:'Quiz', v:35, c:'#5B21D6' },{ n:'Classe virtuelle', v:25, c:'#2E7BD6' },
    { n:'Simulation', v:20, c:'#1FA463' },{ n:'Micro-learning', v:15, c:'#E8912B' },{ n:'Jeu', v:5, c:'#E0413B' },
  ],

  // ---- Formateur : accueil ----
  formKpis: [
    { icon:'library', tone:'it-violet-soft', value:'12', label:'Modules créés' },
    { icon:'users', tone:'it-green', value:'156', label:'Apprenants actifs', delta:'+12%' },
    { icon:'trend', tone:'it-green', value:'87%', label:'Taux de réussite', delta:'+6 pts' },
    { icon:'calendar', tone:'it-orange', value:'8', label:'Sessions à venir', note:'Prochain : 22/05' },
  ],
  formAI: [
    { icon:'quiz', title:'Optimisez le quiz "Accueil client parfait"', desc:'Le taux d\u2019échec est élevé sur 2 questions clés.', action:'Voir les insights', go:'form-stats', goArg:'Quiz \u2013 Accueil client parfait' },
    { icon:'target', title:'Relancez le module "Service d\u2019exception"', desc:'Seulement 42% des apprenants l\u2019ont terminé.', action:'Relancer', go:'form-send-reminder' },
    { icon:'classvirtual', title:'Planifiez une classe virtuelle', desc:'Renforcez l\u2019engagement avec une session live.', action:'Planifier', go:'form-sessions' },
  ],
  formRecent: [
    { type:'Quiz', icon:'quiz', title:'Quiz – Accueil client parfait', date:'Mis à jour le 18/05/2026', learners:104, rate:'86% réussite',
      img:'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=200&q=70' },
    { type:'Jeu', icon:'gamepad', title:'Jeu – Mission Hyatt', date:'Créé le 15/05/2026', learners:98, rate:'78% réussite',
      img:'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=200&q=70' },
    { type:'Vidéo', icon:'video', title:'Vidéo – Standards de service', date:'Créé le 10/05/2026', learners:156, rate:'92% réussite',
      img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=70' },
  ],
  contentFormats: [
    { id:'quiz', icon:'quiz', label:'Quiz', desc:'Questions à choix multiples' },
    { id:'jeu', icon:'gamepad', label:'Jeu', desc:'Scénario gamifié à étapes' },
    { id:'devinette', icon:'riddle', label:'Devinette', desc:'Indices progressifs' },
    { id:'simulation', icon:'simulation', label:'Simulation', desc:'Mise en situation client' },
    { id:'video', icon:'video', label:'Vidéo', desc:'Vidéo courte pédagogique' },
    { id:'micro', icon:'microlearning', label:'Micro-learning', desc:'Format 5 minutes' },
    { id:'classe', icon:'classvirtual', label:'Classe virtuelle', desc:'Session live Teams/Zoom' },
  ],
  library: [
    { title:'Accueil client parfait', format:'Quiz', icon:'quiz', dept:'Réception', level:'Débutant', status:'Publié', stat:'104 apprenants • 86%' },
    { title:'Mission Hyatt', format:'Jeu', icon:'gamepad', dept:'Tous', level:'Intermédiaire', status:'Publié', stat:'98 apprenants • 78%' },
    { title:'Gestion des réclamations', format:'Simulation', icon:'simulation', dept:'Réception', level:'Avancé', status:'Brouillon', stat:'Non publié' },
    { title:'5 clés du service Hyatt', format:'Micro-learning', icon:'microlearning', dept:'Tous', level:'Débutant', status:'Publié', stat:'132 apprenants • 91%' },
    { title:'Standards de service', format:'Vidéo', icon:'video', dept:'Restauration', level:'Débutant', status:'Publié', stat:'156 apprenants • 92%' },
  ],
  sessions: [
    { title:'L\u2019art d\u2019accueillir un client VIP', date:'23 mai 2026', time:'14h00', dur:'45 min', dept:'Réception', tool:'Teams', enrolled:24 },
    { title:'Gérer une réclamation difficile', date:'25 mai 2026', time:'10h00', dur:'60 min', dept:'Tous', tool:'Zoom', enrolled:38 },
    { title:'Upselling au restaurant', date:'28 mai 2026', time:'16h00', dur:'30 min', dept:'Restauration', tool:'Meet', enrolled:18 },
  ],
  learners: [
    { name:'Yasmine Belkacem', dept:'Réception', prog:88, score:90, status:'À jour', tone:'badge-green' },
    { name:'Amine Khelifi', dept:'Réception', prog:72, score:78, status:'En cours', tone:'badge-orange' },
    { name:'Sofia Benali', dept:'Réception', prog:55, score:70, status:'Difficulté', tone:'badge-red' },
    { name:'Mehdi Ould', dept:'Restauration', prog:94, score:96, status:'À jour', tone:'badge-green' },
    { name:'Nadia Cherif', dept:'Housekeeping', prog:61, score:74, status:'En cours', tone:'badge-orange' },
  ],

  // ---- Gamification (référence) ----
  gamification: [
    { action:'Quiz complété', pts:'+10 à +30', rule:'Selon difficulté et score.' },
    { action:'Jeu réussi', pts:'+20 à +50', rule:'Bonus si réussite parfaite.' },
    { action:'Devinette correcte', pts:'+5 à +20', rule:'Moins de points si plusieurs indices.' },
    { action:'Simulation réussie', pts:'+30 à +80', rule:'Selon comportement professionnel.' },
    { action:'Classe virtuelle suivie', pts:'+50', rule:'Présence validée par formateur.' },
    { action:'Badge spécial', pts:'+100', rule:'Performance exceptionnelle.' },
  ],
  badges: [
    { name:'Accueil Pro', icon:'handshake', got:true },
    { name:'Quiz Master', icon:'quiz', got:true },
    { name:'Esprit d\u2019équipe', icon:'users', got:true },
    { name:'Service 5★', icon:'starfill', got:false },
    { name:'Expert VIP', icon:'crown', got:false },
  ],
  levels: [
    { name:'Bronze', min:0 },{ name:'Silver', min:1000 },{ name:'Gold', min:3000 },{ name:'Platinum', min:6000 },
  ],

  // ---- Données des sous-pages de profil ----
  empCertificates: [
    { name:'Accueil client parfait', date:'12 mars 2026', score:'92%', valid:true },
    { name:'Standards de service Hyatt', date:'28 février 2026', score:'88%', valid:true },
    { name:'Gestion des situations délicates', date:'15 janvier 2026', score:'85%', valid:true },
  ],
  empSkills: [
    { n:'Accueil & relation client', v:90 },
    { n:'Communication professionnelle', v:84 },
    { n:'Gestion des réclamations', v:72 },
    { n:'Upselling & vente', v:65 },
    { n:'Anglais professionnel', v:78 },
  ],
  empHistory: [
    { icon:'quiz', t:'Quiz « Accueil client parfait »', d:'Score 92% · +30 pts', when:'Aujourd’hui, 10:24' },
    { icon:'video', t:'Vidéo « Standards de service »', d:'Terminée', when:'Hier, 16:10' },
    { icon:'gamepad', t:'Jeu « Mission Hyatt »', d:'Réussi · +45 pts', when:'2 mai 2026' },
    { icon:'simulation', t:'Simulation « Réclamations »', d:'En cours · 60%', when:'30 avr. 2026' },
    { icon:'medal', t:'Badge « Quiz Master » obtenu', d:'+100 pts', when:'28 avr. 2026' },
  ],
  notifications: [
    { icon:'cap', tone:'it-violet-soft', t:'Nouvelle formation assignée', d:'« Gestion des réclamations » à terminer avant le 30 mai.', when:'Il y a 2 h' },
    { icon:'medal', tone:'it-gold-soft', t:'Badge débloqué', d:'Vous avez obtenu le badge « Quiz Master ».', when:'Hier' },
    { icon:'bell', tone:'it-blue', t:'Rappel de session', d:'Classe virtuelle demain à 14h00.', when:'Hier' },
    { icon:'star', tone:'it-green', t:'Objectif atteint', d:'Vous avez dépassé 1200 points ce mois-ci.', when:'2 jours' },
  ],
  formExpertise: [
    { n:'Relation client & accueil', lvl:'Expert' },
    { n:'Gestion des réclamations', lvl:'Expert' },
    { n:'Techniques de vente & upselling', lvl:'Avancé' },
    { n:'Anglais professionnel hôtelier', lvl:'Avancé' },
  ],
  formEvaluations: [
    { name:'Yasmine Belkacem', stars:5, txt:'Formation très claire et concrète, applicable directement.', when:'Mai 2026' },
    { name:'Amine Khelifi', stars:5, txt:'Excellents cas pratiques, formatrice à l’écoute.', when:'Avr. 2026' },
    { name:'Khaled Nasri', stars:4, txt:'Bon contenu, j’aurais aimé plus d’exercices.', when:'Avr. 2026' },
  ],
  formCreatedHistory: [
    { icon:'quiz', t:'Quiz « Accueil client parfait »', d:'Publié · 128 apprenants', when:'Mars 2026' },
    { icon:'simulation', t:'Simulation « Gestion des réclamations »', d:'Publié · 64 apprenants', when:'Févr. 2026' },
    { icon:'video', t:'Vidéo « Standards de service »', d:'Publié · 156 apprenants', when:'Janv. 2026' },
  ],
};

// Initials helper for avatars without photo
function initials(name){ return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase(); }
