/* ============================================================
   AERYS — Mini-jeu : Mission Hyatt
   Scénario gamifié : aidez le client à vivre la meilleure expérience
   ============================================================ */

const MISSION_SCENARIOS = [
  {
    id: 1,
    scene: 'check-in',
    location: 'Réception • Hall principal',
    avatar: '👩‍💼',
    clientName: 'Mme Larbi',
    situation: 'Mme Larbi arrive à l\'hôtel après un long voyage. Elle a l\'air fatiguée et légèrement stressée.',
    clientSays: '« Bonsoir… J\'ai une réservation au nom de Larbi. Je suis vraiment épuisée par le voyage. »',
    question: 'Quelle est votre première réaction ?',
    choices: [
      { id:'a', text: 'Sourire chaleureusement, l\'accueillir par son nom et lui proposer de s\'occuper de tout rapidement.', score: 3, feedback: 'Excellent ! Accueillir le client par son nom et montrer de l\'empathie est la base de l\'hospitalité 5 étoiles.', correct: true },
      { id:'b', text: 'Lui demander de patienter pendant que vous terminez une autre tâche.', score: 0, feedback: 'Un client qui arrive ne doit jamais attendre sans être reconnu. Toujours signaler votre présence immédiatement.', correct: false },
      { id:'c', text: 'Vérifier rapidement la réservation sans commentaire particulier.', score: 1, feedback: 'Correct techniquement, mais sans chaleur humaine. Le service Hyatt va bien au-delà de l\'efficacité.', correct: false },
    ],
    tip: 'Règle Hyatt : saluer le client dans les 5 secondes, utiliser son nom et établir un contact visuel.',
    points: 20,
  },
  {
    id: 2,
    scene: 'room',
    location: 'Chambre 312 • Étage',
    avatar: '👨‍💼',
    clientName: 'M. Benali',
    situation: 'M. Benali appelle la réception pour signaler que le climatiseur de sa chambre fait du bruit et qu\'il n\'arrive pas à dormir. Il est 23h00.',
    clientSays: '« Votre climatiseur est bruyant, ça m\'empêche de dormir. Je dois être en forme demain matin pour une réunion importante ! »',
    question: 'Comment gérez-vous cette situation ?',
    choices: [
      { id:'a', text: 'S\'excuser sincèrement, proposer immédiatement une autre chambre équivalente et envoyer quelqu\'un pour l\'aider à déménager.', score: 3, feedback: 'Parfait ! Vous avez transformé un problème en opportunité de fidélisation.', correct: true },
      { id:'b', text: 'Dire que le technicien passera demain matin.', score: 0, feedback: 'Ne jamais renvoyer un problème de confort à plus tard quand le client en a besoin maintenant.', correct: false },
      { id:'c', text: 'Proposer des bouchons d\'oreilles depuis le service housekeeping.', score: 0, feedback: 'Cette réponse ne résout pas le problème et peut vexer le client.', correct: false },
    ],
    tip: 'Standard Hyatt : résoudre tout problème de chambre en moins de 15 minutes ou proposer une alternative.',
    points: 20,
  },
  {
    id: 3,
    scene: 'restaurant',
    location: 'Restaurant Le Panorama',
    avatar: '👩',
    clientName: 'Mme Tizi',
    situation: 'Une cliente au restaurant signale qu\'elle est allergique aux noix. Elle regarde la carte avec inquiétude.',
    clientSays: '« Je suis allergique aux noix. Est-ce que je peux manger quelque chose ici en toute sécurité ? »',
    question: 'Quelle est la meilleure réponse ?',
    choices: [
      { id:'a', text: 'Rassurer la cliente, appeler le chef, présenter les plats sans noix et noter l\'allergie pour tout le service.', score: 3, feedback: 'Excellent réflexe ! La sécurité alimentaire est non-négociable. Bravo pour la traçabilité.', correct: true },
      { id:'b', text: 'Lui dire que la plupart des plats ne contiennent pas de noix.', score: 1, feedback: '"La plupart" n\'est pas suffisant face à une allergie. Une allergie peut être mortelle.', correct: false },
      { id:'c', text: 'Lui conseiller de prendre une salade pour être prudente.', score: 0, feedback: 'Réponse insuffisante. Les salades peuvent aussi contenir des noix. Il faut vérifier avec le chef.', correct: false },
    ],
    tip: 'Les allergies sont une priorité absolue. Toujours confirmer avec la cuisine et documenter.',
    points: 20,
  },
  {
    id: 4,
    scene: 'concierge',
    location: 'Conciergerie • Lobby',
    avatar: '👴',
    clientName: 'M. et Mme Ouali',
    situation: 'Un couple fête son anniversaire de mariage. Ils cherchent une activité romantique pour la soirée mais semblent hésitants.',
    clientSays: '« On fête nos 25 ans de mariage ce soir… vous avez des idées ? On ne sait pas trop ce qui est disponible… »',
    question: 'Comment répondez-vous ?',
    choices: [
      { id:'a', text: 'Les féliciter chaleureusement, proposer un dîner aux chandelles en terrasse avec vue, réserver une surprise florale en chambre et suggérer un spa en couple.', score: 3, feedback: 'Magnifique ! Vous avez créé un moment mémorable. C\'est ça, l\'hospitalité Hyatt.', correct: true },
      { id:'b', text: 'Donner une brochure des activités disponibles en ville.', score: 1, feedback: 'Correct mais impersonnel. Un anniversaire mérite une attention particulière.', correct: false },
      { id:'c', text: 'Suggérer le restaurant de l\'hôtel sans plus de détail.', score: 1, feedback: 'Trop basique pour une occasion spéciale. Anticipez et personnalisez.', correct: false },
    ],
    tip: 'Hyatt valorise les moments marquants : anniversaires, lune de miel, fêtes. Anticipez et dépassez les attentes.',
    points: 20,
  },
  {
    id: 5,
    scene: 'checkout',
    location: 'Réception • Check-out',
    avatar: '👨',
    clientName: 'M. Hamici',
    situation: 'M. Hamici est mécontent en partant. Il dit que son séjour était globalement bien mais que le petit-déjeuner l\'a déçu.',
    clientSays: '« Tout était bien mais franchement le petit-déjeuner n\'était pas à la hauteur pour le prix… »',
    question: 'Comment terminez-vous ce séjour ?',
    choices: [
      { id:'a', text: 'Remercier sincèrement pour le retour, s\'excuser pour la déception, noter le feedback et offrir un bon de réduction sur le prochain séjour.', score: 3, feedback: 'Parfait ! Vous avez transformé une critique en fidélisation. Le client reviendra probablement.', correct: true },
      { id:'b', text: 'Expliquer que le buffet est standard et que les avis sont généralement positifs.', score: 0, feedback: 'Ne jamais justifier ni minimiser une plainte. Le client a toujours sa perception.', correct: false },
      { id:'c', text: 'S\'excuser brièvement et encaisser rapidement.', score: 1, feedback: 'L\'excuse est bien mais sans action concrète. Le client repart sans impression positive.', correct: false },
    ],
    tip: 'Un client qui se plaint est une chance : 95% ne disent rien et ne reviennent pas. Agissez toujours.',
    points: 20,
  },
];

// ---- State ----
let _missionStep = 0;
let _missionScore = 0;
let _missionAnswers = [];
let _missionAnswered = false;
let _missionPhase = 'intro'; // 'intro' | 'play' | 'result'

function initMission(){
  _missionStep = 0;
  _missionScore = 0;
  _missionAnswers = [];
  _missionAnswered = false;
  _missionPhase = 'intro';
}

// ---- Scene icons ----
const SCENE_ICONS = {
  'check-in':   'hotel',
  'room':       'bell',
  'restaurant': 'fork',
  'concierge':  'star',
  'checkout':   'check',
};

function sceneIcon(scene){
  const map = { 'check-in':'🏨', 'room':'🛏', 'restaurant':'🍽', 'concierge':'✨', 'checkout':'🤝' };
  return map[scene] || '🏨';
}

// ---- Stars display ----
function missionStars(score, max){
  const pct = score / max;
  const filled = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct >= 0.3 ? 1 : 0;
  return Array.from({length:3}, (_,i) =>
    `<span style="font-size:28px;filter:${i<filled?'none':'grayscale(1) opacity(.3)'}"}>⭐</span>`
  ).join('');
}

// ---- Render mission ----
function empMissionHyatt(){
  if(_missionPhase === 'intro') return missionIntro();
  if(_missionPhase === 'result') return missionResult();
  return missionPlay();
}

function missionIntro(){
  return `
    <div class="flex items-center between mb24">
      <button class="bell" onclick="setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center"><div class="h3">Mini-jeu</div>
        <span class="badge-pill badge-violet" style="margin-top:6px">Mission Hyatt</span></div>
      <div class="flex items-center gap12">${bell()}<div onclick="setProfileTab()" style="cursor:pointer">${avatarEl(STATE.user,46,true)}</div></div>
    </div>

    <!-- Hero banner -->
    <div style="border-radius:var(--r-lg);overflow:hidden;position:relative;margin-bottom:20px;min-height:180px;background:var(--navy)">
      <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80" alt="" style="width:100%;height:180px;object-fit:cover;opacity:.55">
      <div style="position:absolute;inset:0;padding:24px;display:flex;flex-direction:column;justify-content:flex-end">
        <div style="color:#fff;font-family:var(--font-display);font-weight:800;font-size:26px;line-height:1.1">Mission Hyatt 🏨</div>
        <div style="color:rgba(255,255,255,.8);font-size:14px;margin-top:6px">Aidez le client à vivre la meilleure expérience</div>
      </div>
    </div>

    <!-- Brief -->
    <div class="card mb16" style="border-left:4px solid var(--violet)">
      <div style="font-family:var(--font-display);font-weight:700;font-size:16px;margin-bottom:10px">🎯 Votre mission</div>
      <div class="lead" style="font-size:14px;line-height:1.6">Vous êtes employé(e) Hyatt Regency Alger. Vous allez traverser <strong>5 situations réelles</strong> avec des clients. À chaque étape, choisissez la meilleure réponse selon les standards Hyatt.</div>
    </div>

    <!-- Steps preview -->
    <div class="card mb20">
      <div style="font-weight:700;font-size:14px;margin-bottom:14px">📍 Les 5 étapes du parcours</div>
      ${MISSION_SCENARIOS.map((s,i) => `
        <div class="flex items-center gap12" style="padding:10px 0;${i<4?'border-bottom:1px solid var(--grey-100)':''}">
          <div style="width:36px;height:36px;border-radius:12px;background:var(--violet-soft);display:flex;align-items:center;justify-content:center;font-size:18px;flex:none">${sceneIcon(s.scene)}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:14px">${s.location}</div>
            <div class="lead" style="font-size:12.5px;margin-top:2px">Scénario ${i+1} · +${s.points} pts max</div>
          </div>
          <span class="badge-pill" style="background:var(--grey-100);color:var(--grey-text);flex:none">${i+1}/5</span>
        </div>`).join('')}
    </div>

    <!-- Scoring -->
    <div class="card flat mb24" style="background:var(--violet-soft);border-color:var(--violet-light)">
      <div class="flex items-center gap16">
        <div style="font-size:32px">⭐</div>
        <div>
          <div style="font-weight:800;font-family:var(--font-display)">Système de score</div>
          <div class="lead" style="font-size:13px;margin-top:4px">Chaque scénario rapporte jusqu'à <strong style="color:var(--violet)">20 points</strong>. Obtenez 3 étoiles avec 90 pts ou plus !</div>
        </div>
      </div>
    </div>

    <button class="btn btn-primary btn-block" onclick="startMission()" style="font-size:17px;padding:18px">
      ${icon('arrowright')} Commencer la Mission
    </button>
  `;
}

function missionPlay(){
  const s = MISSION_SCENARIOS[_missionStep];
  const progress = ((_missionStep) / MISSION_SCENARIOS.length) * 100;
  return `
    <div class="flex items-center between mb20">
      <button class="bell" onclick="quitMission()" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center">
        <div class="h3">Étape ${_missionStep+1} <span style="color:var(--grey-muted);font-weight:500">/ ${MISSION_SCENARIOS.length}</span></div>
        <div class="lead" style="font-size:12px;margin-top:2px">${s.location}</div>
      </div>
      <div style="text-align:right">
        <div style="font-family:var(--font-display);font-weight:800;font-size:18px;color:var(--violet)">${_missionScore}</div>
        <div class="lead" style="font-size:11px">pts</div>
      </div>
    </div>

    <!-- Progress bar -->
    <div style="background:var(--grey-100);border-radius:99px;height:6px;margin-bottom:20px;overflow:hidden">
      <div style="background:linear-gradient(90deg,var(--violet),var(--violet-600));height:100%;width:${progress}%;border-radius:99px;transition:.4s"></div>
    </div>

    <!-- Scene card -->
    <div class="card mb16" style="border:none;background:linear-gradient(135deg,var(--navy) 0%,var(--navy-soft) 100%);padding:20px">
      <div class="flex items-center gap12 mb14">
        <div style="width:44px;height:44px;border-radius:14px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:22px;flex:none">${sceneIcon(s.scene)}</div>
        <div>
          <div style="color:#fff;font-weight:700;font-size:15px">${s.clientName}</div>
          <div style="color:rgba(255,255,255,.55);font-size:13px">${s.location}</div>
        </div>
      </div>
      <div style="color:rgba(255,255,255,.75);font-size:13.5px;line-height:1.6;margin-bottom:12px">${s.situation}</div>
      <div style="background:rgba(255,255,255,.1);border-radius:var(--r-md);padding:14px;border-left:3px solid var(--violet-600)">
        <div style="color:#fff;font-size:14px;line-height:1.5;font-style:italic">${s.clientSays}</div>
      </div>
    </div>

    <!-- Question -->
    <div style="font-family:var(--font-display);font-weight:700;font-size:16px;color:var(--navy);margin-bottom:14px">${s.question}</div>

    <!-- Choices -->
    <div id="missionChoices" style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
      ${s.choices.map(c => `
        <div class="mission-choice" id="mc-${c.id}" onclick="answerMission('${c.id}')"
          style="border:2px solid var(--grey-200);border-radius:var(--r-md);padding:14px 16px;cursor:pointer;transition:.2s;background:var(--white);display:flex;align-items:flex-start;gap:12px">
          <div style="width:30px;height:30px;border-radius:10px;background:var(--violet-soft);color:var(--violet);font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;flex:none">${c.id.toUpperCase()}</div>
          <div style="font-size:14px;line-height:1.5;color:var(--navy);flex:1">${c.text}</div>
        </div>`).join('')}
    </div>

    <div id="missionFeedback"></div>
  `;
}

function missionResult(){
  const max = MISSION_SCENARIOS.length * 20;
  const pct = Math.round(_missionScore / max * 100);
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
  const msgs = [
    'Continuez à vous former, chaque progrès compte !',
    'Bon début ! Revoyez les standards Hyatt.',
    'Bien joué ! Encore quelques points à perfectionner.',
    '🏆 Excellent ! Vous maîtrisez le service Hyatt 5 étoiles !'
  ];
  const starsHtml = Array.from({length:3},(_,i)=>`<span style="font-size:40px;transition:.3s;transform:scale(${i<stars?1.1:.8});filter:${i<stars?'none':'grayscale(1) opacity(.25)'}">⭐</span>`).join('');

  const breakdown = MISSION_SCENARIOS.map((s,i) => {
    const ans = _missionAnswers[i];
    const choice = s.choices.find(c => c.id === ans);
    const sc = choice ? choice.score : 0;
    return `
      <div class="flex items-center gap12" style="padding:10px 0;${i<MISSION_SCENARIOS.length-1?'border-bottom:1px solid var(--grey-100)':''}">
        <div style="font-size:18px">${sceneIcon(s.scene)}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:13.5px">${s.location}</div>
        </div>
        <div style="display:flex;gap:4px">
          ${Array.from({length:3},(_,j)=>`<div style="width:8px;height:8px;border-radius:50%;background:${j<sc?'var(--violet)':'var(--grey-200)'}"></div>`).join('')}
        </div>
        <span style="font-weight:800;font-size:14px;color:${sc===3?'var(--green)':sc>=1?'var(--orange)':'var(--red)'};min-width:40px;text-align:right">${sc*100/3|0}%</span>
      </div>`;
  }).join('');

  return `
    <div class="flex items-center between mb24">
      <button class="bell" onclick="setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center"><div class="h3">Résultats</div></div>
      <div style="width:42px"></div>
    </div>

    <!-- Score hero -->
    <div class="card mb16" style="text-align:center;padding:32px 24px;background:linear-gradient(135deg,var(--violet-soft) 0%,#f0ebff 100%);border-color:var(--violet-light)">
      <div style="display:flex;justify-content:center;gap:4px;margin-bottom:16px">${starsHtml}</div>
      <div style="font-family:var(--font-display);font-weight:800;font-size:52px;color:var(--violet);line-height:1">${_missionScore}</div>
      <div style="color:var(--grey-text);font-size:15px;margin-top:4px">points sur ${max}</div>
      <div style="margin:16px auto 0;max-width:280px;font-size:14.5px;font-weight:600;color:var(--navy)">${msgs[stars]}</div>
    </div>

    <!-- Score breakdown -->
    <div class="card mb16">
      <div style="font-weight:700;font-size:14px;margin-bottom:4px">📊 Détail par scénario</div>
      ${breakdown}
    </div>

    <!-- Badge reward -->
    ${stars >= 2 ? `
    <div class="card flat mb16" style="background:var(--gold-light);border-color:var(--gold);display:flex;align-items:center;gap:14px">
      <div style="font-size:36px">🥇</div>
      <div>
        <div style="font-weight:800;color:var(--gold);font-family:var(--font-display)">Badge débloqué : Service Excellence</div>
        <div class="lead" style="font-size:13px;margin-top:4px">Votre sens du service client est au rendez-vous !</div>
      </div>
    </div>` : ''}

    <div class="flex gap12">
      <button class="btn btn-ghost" style="flex:1" onclick="replayMission()">${icon('arrowleft')} Rejouer</button>
      <button class="btn btn-primary" style="flex:1" onclick="setTab('emp-activities')">Activités ${icon('arrowright')}</button>
    </div>
  `;
}

// ---- Controllers ----
function startMission(){
  initMission();
  _missionPhase = 'play';
  render();
}

function quitMission(){
  initMission();
  setTab('emp-activities');
}

function replayMission(){
  initMission();
  _missionPhase = 'intro';
  render();
}

function answerMission(choiceId){
  if(_missionAnswered) return;
  _missionAnswered = true;

  const s = MISSION_SCENARIOS[_missionStep];
  const choice = s.choices.find(c => c.id === choiceId);
  const pts = choice ? choice.score * (s.points/3) : 0;
  _missionScore += pts;
  _missionAnswers.push(choiceId);

  // Style all choices
  document.querySelectorAll('.mission-choice').forEach(el => {
    el.style.cursor = 'default';
    el.style.pointerEvents = 'none';
  });

  const picked = document.getElementById('mc-' + choiceId);
  const isCorrect = choice && choice.correct;

  if(isCorrect){
    if(picked){ picked.style.borderColor='var(--green)'; picked.style.background='var(--green-light)'; }
  } else {
    if(picked){ picked.style.borderColor='var(--red)'; picked.style.background='var(--red-light)'; }
    // highlight best
    const best = s.choices.find(c=>c.correct);
    if(best){
      const bestEl = document.getElementById('mc-'+best.id);
      if(bestEl){ bestEl.style.borderColor='var(--green)'; bestEl.style.background='var(--green-light)'; }
    }
  }

  // Show feedback
  const fb = document.getElementById('missionFeedback');
  if(fb){
    fb.innerHTML = `
      <div class="card flat mb16" style="background:${isCorrect?'var(--green-light)':'var(--red-light)'};border-color:${isCorrect?'var(--green)':'var(--red)'}">
        <div style="font-weight:800;font-size:15px;color:${isCorrect?'var(--green)':'var(--red)'};margin-bottom:6px">${isCorrect ? '✅ Excellente réponse !' : '❌ Pas tout à fait…'}</div>
        <div style="font-size:13.5px;line-height:1.5;color:var(--navy)">${choice ? choice.feedback : ''}</div>
        ${pts > 0 ? '<div style="margin-top:8px;font-weight:800;color:var(--violet);font-family:var(--font-display)">+'+pts+' pts</div>' : ''}
      </div>
      <div class="card flat mb20" style="background:var(--violet-soft);border-color:var(--violet-light);display:flex;align-items:flex-start;gap:12px">
        <div style="font-size:18px;flex:none;margin-top:2px">💡</div>
        <div>
          <div style="font-weight:700;font-size:13.5px;color:var(--violet);margin-bottom:4px">Standard Hyatt</div>
          <div style="font-size:13px;line-height:1.5;color:var(--navy)">${s.tip}</div>
        </div>
      </div>
      <button class="btn btn-primary btn-block" onclick="nextMissionStep()">
        ${_missionStep < MISSION_SCENARIOS.length - 1 ? 'Scénario suivant' : 'Voir mes résultats'} ${icon('arrowright')}
      </button>
    `;
  }
}

function nextMissionStep(){
  _missionAnswered = false;
  if(_missionStep >= MISSION_SCENARIOS.length - 1){
    // Award points
    STATE.user.points = (STATE.user.points || 0) + _missionScore;
    toast(`Mission terminée ! +${_missionScore} pts gagnés`);
    _missionPhase = 'result';
    render();
  } else {
    _missionStep++;
    render();
  }
}
