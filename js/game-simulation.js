/* ============================================================
   AERYS — Simulation : Gestion des réclamations
   Mise en situation avancée avec un client mécontent
   ============================================================ */

const SIMULATION_STEPS = [
  {
    id: 1,
    phase: 'Écoute active',
    phaseIcon: '👂',
    situation: 'M. Mansour entre à la réception, visiblement irrité. Il a attendu 45 minutes son taxi commandé via la conciergerie et a manqué son rendez-vous d\'affaires.',
    clientEmotion: 'Très en colère 😠',
    clientSays: '« C\'est inadmissible ! Votre conciergerie m\'a laissé tomber. J\'ai manqué un rendez-vous crucial à cause de vous ! Je veux voir le responsable MAINTENANT. »',
    question: 'Quelle est votre première action ?',
    choices: [
      { id:'a', text:'Rester calme, le regarder dans les yeux, l\'écouter sans l\'interrompre et hocher la tête pour montrer que vous comprenez.', score:3, correct:true, feedback:'Excellent ! L\'écoute active est la première étape. Ne jamais interrompre un client en colère.' },
      { id:'b', text:'Lui expliquer immédiatement que le taxi est une prestation externe et que ce n\'est pas la faute de l\'hôtel.', score:0, correct:false, feedback:'Jamais se défausser sur un tiers. Aux yeux du client, l\'hôtel est responsable de tout ce qu\'il recommande.' },
      { id:'c', text:'Lui dire que vous allez appeler le responsable et lui tourner le dos pour téléphoner.', score:0, correct:false, feedback:'Ne jamais tourner le dos à un client en colère. Maintenez toujours le contact visuel et la présence.' },
    ],
    tip: 'Règle d\'or : Laissez le client exprimer toute sa frustration. 70% des conflits se résolvent simplement parce que le client se sent entendu.',
    points: 10,
  },
  {
    id: 2,
    phase: 'Empathie & Excuse',
    phaseIcon: '🤝',
    situation: 'M. Mansour a exprimé sa colère. Il est toujours debout, bras croisés, mais semble attendre votre réaction.',
    clientEmotion: 'Frustré mais en attente 😤',
    clientSays: '« Alors ? Qu\'est-ce que vous avez à dire pour votre défense ? »',
    question: 'Comment formulez-vous vos excuses ?',
    choices: [
      { id:'a', text:'« Monsieur Mansour, je comprends votre frustration et je vous présente mes sincères excuses pour ce désagrément qui a impacté votre rendez-vous. »', score:3, correct:true, feedback:'Parfait. Vous utilisez son nom, validez son émotion et présentez des excuses sincères sans minimiser.' },
      { id:'b', text:'« Je suis désolé mais ce genre de chose peut arriver, les taxis c\'est parfois aléatoire… »', score:0, correct:false, feedback:'Le "mais" annule les excuses. Et justifier la situation empire les choses.' },
      { id:'c', text:'« Excusez-nous pour le dérangement. »', score:1, correct:false, feedback:'Trop vague et impersonnel. Les excuses doivent nommer le problème précis et reconnaître l\'impact.' },
    ],
    tip: 'Une excuse efficace = Reconnaissance + Validation de l\'émotion + Absence de justification. Utilisez toujours le nom du client.',
    points: 10,
  },
  {
    id: 3,
    phase: 'Enquête & Responsabilité',
    phaseIcon: '🔍',
    situation: 'Les excuses ont légèrement apaisé M. Mansour. Il attend maintenant une explication.',
    clientEmotion: 'Légèrement calmé 😐',
    clientSays: '« Comment ça a pu arriver ? Quelqu\'un a vérifié ? »',
    question: 'Comment gérez-vous l\'explication ?',
    choices: [
      { id:'a', text:'Reconnaître que vous allez enquêter personnellement sur ce qui s\'est passé, noter son nom et lui promettre un retour précis dans l\'heure.', score:3, correct:true, feedback:'Excellent ! Prendre la responsabilité de l\'investigation rassure le client que sa situation est prise au sérieux.' },
      { id:'b', text:'Lui dire que c\'est probablement une erreur du chauffeur de taxi et qu\'il faudra le signaler à la société.', score:0, correct:false, feedback:'Ne jamais pointer un tiers responsable. Le client s\'en moque — il veut que l\'HÔTEL règle le problème.' },
      { id:'c', text:'Appeler immédiatement la conciergerie devant le client pour comprendre ce qui s\'est passé.', score:2, correct:false, feedback:'Bien mais risqué : si la conciergerie se justifie ou l\'appel dure, le client s\'impatiente davantage. Mieux vaut promettre un suivi privé.' },
    ],
    tip: 'Toujours prendre ownership. "Je vais personnellement vérifier" vaut mieux que "on va voir". La responsabilité individuelle rassure.',
    points: 10,
  },
  {
    id: 4,
    phase: 'Solution & Compensation',
    phaseIcon: '🎁',
    situation: 'M. Mansour attend concrètement une action corrective. Il mentionne que son rendez-vous a été décalé au lendemain matin.',
    clientEmotion: 'Attentif 🧐',
    clientSays: '« Bon. Et concrètement, qu\'est-ce que vous allez faire pour moi ? »',
    question: 'Quelle compensation proposez-vous ?',
    choices: [
      { id:'a', text:'Proposer un transfert aéroport gratuit demain matin, offrir le dîner de ce soir au restaurant de l\'hôtel et rédiger une lettre d\'excuses formelle.', score:3, correct:true, feedback:'Parfait. Vous résolvez le problème immédiat (transfert demain), compensez l\'expérience (dîner) et créez une trace formelle (lettre).' },
      { id:'b', text:'Lui offrir un bon de réduction de 10% sur son prochain séjour.', score:1, correct:false, feedback:'Une réduction future est peu engageante pour quelqu\'un de mécontent maintenant. Elle ne règle rien aujourd\'hui.' },
      { id:'c', text:'Lui dire que vous allez en parler au directeur qui décidera de la compensation.', score:0, correct:false, feedback:'Renvoyer la décision à une autre personne montre que vous n\'êtes pas autonome. Le client perd confiance dans l\'équipe.' },
    ],
    tip: 'La compensation doit être : immédiate, proportionnelle et liée au problème. Surprenez positivement — c\'est là que naît la fidélité.',
    points: 10,
  },
  {
    id: 5,
    phase: 'Clôture & Fidélisation',
    phaseIcon: '✨',
    situation: 'M. Mansour accepte la compensation. Son ton a changé, il semble apaisé. La réclamation est résolue.',
    clientEmotion: 'Apaisé 🙂',
    clientSays: '« D\'accord… c\'est correct. J\'apprécie l\'effort. »',
    question: 'Comment clôturez-vous cette interaction ?',
    choices: [
      { id:'a', text:'Le remercier pour sa compréhension, confirmer les arrangements par écrit, lui donner votre carte et lui dire qu\'il peut vous appeler directement si besoin.', score:3, correct:true, feedback:'Excellent ! Vous transformez un client mécontent en ambassadeur potentiel. La note personnelle crée une relation de confiance durable.' },
      { id:'b', text:'Lui dire "bonne journée" et retourner à vos tâches.', score:0, correct:false, feedback:'Clôturer sans confirmer ni laisser de contact = risque que le problème resurface sans suivi.' },
      { id:'c', text:'Lui demander de remplir une fiche de satisfaction client.', score:1, correct:false, feedback:'Pas le bon moment — peut sembler calculé. Attendez le lendemain après le check-out pour demander un feedback.' },
    ],
    tip: 'Un client dont la réclamation est bien gérée devient souvent plus fidèle qu\'un client qui n\'a jamais eu de problème. C\'est la loi du service recovery.',
    points: 10,
  },
];

// ---- State ----
let _simStep     = 0;
let _simScore    = 0;
let _simAnswers  = [];
let _simAnswered = false;
let _simPhase    = 'intro';

function initSim(){
  _simStep = 0; _simScore = 0; _simAnswers = [];
  _simAnswered = false; _simPhase = 'intro';
}

// ---- Render ----
function empSimulation(){
  if(_simPhase === 'intro')  return simIntro();
  if(_simPhase === 'result') return simResult();
  return simPlay();
}

function simIntro(){
  return `
    <div class="flex items-center between mb24">
      <button class="bell" onclick="setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center">
        <div class="h3">Simulation</div>
        <span class="badge-pill badge-violet" style="margin-top:6px">Gestion des réclamations</span>
      </div>
      <div class="flex items-center gap12">${bell()}<div onclick="setProfileTab()" style="cursor:pointer">${avatarEl(STATE.user,46,true)}</div></div>
    </div>

    <div style="border-radius:var(--r-lg);overflow:hidden;position:relative;margin-bottom:20px;height:170px;background:var(--navy)">
      <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80" alt="" style="width:100%;height:170px;object-fit:cover;opacity:.45">
      <div style="position:absolute;inset:0;padding:24px;display:flex;flex-direction:column;justify-content:flex-end">
        <div style="color:#fff;font-family:var(--font-display);font-weight:800;font-size:24px">Gestion des réclamations 🎭</div>
        <div style="color:rgba(255,255,255,.75);font-size:14px;margin-top:6px">Gérez la situation comme un professionnel</div>
      </div>
    </div>

    <div class="card mb16" style="border-left:4px solid var(--red)">
      <div style="font-family:var(--font-display);font-weight:700;font-size:16px;margin-bottom:10px">🎭 Mise en situation</div>
      <div class="lead" style="font-size:14px;line-height:1.7">Vous êtes réceptionniste au <strong>Hyatt Regency Alger</strong>. Un client très mécontent vient vous voir. Traversez les <strong>5 phases de gestion d'une réclamation</strong> et choisissez la meilleure réaction à chaque étape.</div>
    </div>

    <div class="card mb16">
      <div style="font-weight:700;font-size:14px;margin-bottom:14px">🔄 Les 5 phases</div>
      ${SIMULATION_STEPS.map((s,i)=>`
        <div class="flex items-center gap12" style="padding:9px 0;${i<4?'border-bottom:1px solid var(--grey-100)':''}">
          <div style="width:34px;height:34px;border-radius:11px;background:var(--violet-soft);display:flex;align-items:center;justify-content:center;font-size:18px;flex:none">${s.phaseIcon}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13.5px">Phase ${i+1} — ${s.phase}</div>
          </div>
          <span style="font-weight:800;font-size:13px;color:var(--violet)">+${s.points} pts</span>
        </div>`).join('')}
    </div>

    <div class="card flat mb24" style="background:var(--red-light);border-color:var(--red);display:flex;gap:14px;align-items:center">
      <div style="font-size:28px">⚠️</div>
      <div class="lead" style="font-size:13.5px">Niveau <strong style="color:var(--red)">Avancé</strong>. Il n'y a pas toujours une réponse évidente. Faites confiance à votre empathie et aux standards Hyatt.</div>
    </div>

    <button class="btn btn-primary btn-block" onclick="startSim()" style="font-size:17px;padding:18px">
      ${icon('arrowright')} Démarrer la simulation
    </button>
  `;
}

function simPlay(){
  const s = SIMULATION_STEPS[_simStep];
  const progress = (_simStep / SIMULATION_STEPS.length) * 100;
  const emotionColor = _simStep <= 1 ? 'var(--red)' : _simStep === 2 ? 'var(--orange)' : 'var(--green)';

  return `
    <div class="flex items-center between mb20">
      <button class="bell" onclick="initSim();setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center">
        <div style="font-size:12px;font-weight:700;color:var(--violet);text-transform:uppercase;letter-spacing:.05em">${s.phaseIcon} ${s.phase}</div>
        <div class="lead" style="font-size:11.5px;margin-top:2px">Étape ${_simStep+1} / ${SIMULATION_STEPS.length}</div>
      </div>
      <div style="text-align:right">
        <div style="font-family:var(--font-display);font-weight:800;font-size:18px;color:var(--violet)">${_simScore}</div>
        <div class="lead" style="font-size:11px">pts</div>
      </div>
    </div>

    <!-- Progress -->
    <div style="background:var(--grey-100);border-radius:99px;height:6px;margin-bottom:20px;overflow:hidden">
      <div style="background:linear-gradient(90deg,var(--red),var(--violet));height:100%;width:${progress}%;border-radius:99px;transition:.4s"></div>
    </div>

    <!-- Client card -->
    <div class="card mb14" style="background:linear-gradient(135deg,var(--navy),var(--navy-soft));border:none;padding:18px">
      <div class="flex items-center gap12 mb12">
        <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:22px;flex:none">👨‍💼</div>
        <div>
          <div style="color:#fff;font-weight:700;font-size:15px">M. Mansour</div>
          <div style="background:${emotionColor}22;border:1px solid ${emotionColor}66;border-radius:var(--r-pill);padding:2px 10px;display:inline-block;margin-top:4px">
            <span style="color:${emotionColor};font-size:12px;font-weight:700">${s.clientEmotion}</span>
          </div>
        </div>
      </div>
      <div style="color:rgba(255,255,255,.6);font-size:13px;line-height:1.5;margin-bottom:12px">${s.situation}</div>
      <div style="background:rgba(255,255,255,.1);border-radius:var(--r-md);padding:13px 15px;border-left:3px solid ${emotionColor}">
        <div style="color:#fff;font-size:14px;line-height:1.5;font-style:italic">${s.clientSays}</div>
      </div>
    </div>

    <!-- Question -->
    <div style="font-family:var(--font-display);font-weight:700;font-size:15px;color:var(--navy);margin-bottom:12px">${s.question}</div>

    <!-- Choices -->
    <div id="simChoices" style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">
      ${s.choices.map(c=>`
        <div class="sim-choice" id="sc-${c.id}" onclick="answerSim('${c.id}')"
          style="border:2px solid var(--grey-200);border-radius:var(--r-md);padding:13px 15px;cursor:pointer;background:var(--white);display:flex;align-items:flex-start;gap:12px;transition:.15s">
          <div style="width:30px;height:30px;border-radius:10px;background:var(--violet-soft);color:var(--violet);font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex:none">${c.id.toUpperCase()}</div>
          <div style="font-size:14px;line-height:1.5;color:var(--navy)">${c.text}</div>
        </div>`).join('')}
    </div>

    <div id="simFeedback"></div>
  `;
}

function simResult(){
  const max = SIMULATION_STEPS.length * 10;
  const pct = Math.round(_simScore / max * 100);
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
  const msgs = ['À perfectionner — révisez les techniques de gestion client.', 'Bon début ! Quelques réflexes à travailler.', 'Très bien ! Vous maîtrisez l\'essentiel.', '🏆 Expert ! Vous gérez les réclamations comme un pro.'];
    const starsHtml = Array.from({length:3},(_,i)=>{ const f=i<stars?'none':'grayscale(1) opacity(.25)'; return '<span style="font-size:'+('38px')+';filter:'+f+'">⭐</span>'; }).join('');

  return `
    <div class="flex items-center between mb24">
      <button class="bell" onclick="setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center"><div class="h3">Résultats</div></div>
      <div style="width:42px"></div>
    </div>

    <div class="card mb16" style="text-align:center;padding:32px 24px;background:linear-gradient(135deg,var(--red-light),#fff5f5);border-color:var(--red)">
      <div style="display:flex;justify-content:center;gap:4px;margin-bottom:16px">${starsHtml}</div>
      <div style="font-family:var(--font-display);font-weight:800;font-size:52px;color:var(--red);line-height:1">${_simScore}</div>
      <div style="color:var(--grey-text);font-size:15px;margin-top:4px">points sur ${max}</div>
      <div style="margin:14px auto 0;max-width:280px;font-size:14.5px;font-weight:600;color:var(--navy)">${msgs[stars]}</div>
    </div>

    <div class="card mb16">
      <div style="font-weight:700;font-size:14px;margin-bottom:14px">📋 Par phase</div>
      ${SIMULATION_STEPS.map((s,i)=>{
        const sc = _simAnswers[i] || 0;
        return `
          <div class="flex items-center gap12" style="padding:9px 0;${i<SIMULATION_STEPS.length-1?'border-bottom:1px solid var(--grey-100)':''}">
            <div style="font-size:20px">${s.phaseIcon}</div>
            <div style="flex:1"><div style="font-weight:700;font-size:13px">${s.phase}</div></div>
            <span style="font-weight:800;font-size:14px;color:${sc===10?'var(--green)':sc>0?'var(--orange)':'var(--red)'}">+${sc} pts</span>
          </div>`;
      }).join('')}
    </div>

    ${stars >= 2 ? `
    <div class="card flat mb16" style="background:var(--green-light);border-color:var(--green);display:flex;align-items:center;gap:14px">
      <div style="font-size:32px">🎭</div>
      <div>
        <div style="font-weight:800;color:var(--green);font-family:var(--font-display)">Badge : Médiateur Expert</div>
        <div class="lead" style="font-size:13px;margin-top:3px">Vous savez transformer un conflit en fidélisation.</div>
      </div>
    </div>` : ''}

    <div class="flex gap12">
      <button class="btn btn-ghost" style="flex:1" onclick="startSim()">${icon('arrowleft')} Rejouer</button>
      <button class="btn btn-primary" style="flex:1" onclick="setTab('emp-activities')">Activités ${icon('arrowright')}</button>
    </div>
  `;
}

// ---- Controllers ----
function startSim(){
  _simStep = 0; _simScore = 0; _simAnswers = [];
  _simAnswered = false; _simPhase = 'play';
  render();
}

function answerSim(choiceId){
  if(_simAnswered) return;
  _simAnswered = true;
  const s = SIMULATION_STEPS[_simStep];
  const choice = s.choices.find(c => c.id === choiceId);
  const pts = choice ? choice.score * (s.points / 3) : 0;
  _simScore += pts;
  _simAnswers.push(pts);

  document.querySelectorAll('.sim-choice').forEach(el => {
    el.style.cursor = 'default'; el.style.pointerEvents = 'none';
  });
  const picked = document.getElementById('sc-' + choiceId);
  const isCorrect = choice && choice.correct;
  if(isCorrect){
    if(picked){ picked.style.borderColor='var(--green)'; picked.style.background='var(--green-light)'; }
  } else {
    if(picked){ picked.style.borderColor='var(--red)'; picked.style.background='var(--red-light)'; }
    const best = s.choices.find(c=>c.correct);
    if(best){ const b = document.getElementById('sc-'+best.id); if(b){ b.style.borderColor='var(--green)'; b.style.background='var(--green-light)'; } }
  }

  const fb = document.getElementById('simFeedback');
  if(fb) fb.innerHTML = `
    <div class="card flat mb14" style="background:${isCorrect?'var(--green-light)':'var(--red-light)'};border-color:${isCorrect?'var(--green)':'var(--red)'}">
      <div style="font-weight:800;font-size:15px;color:${isCorrect?'var(--green)':'var(--red)'};margin-bottom:6px">${isCorrect?'✅ Parfait !':'❌ Pas la meilleure réaction…'}</div>
      <div style="font-size:13.5px;line-height:1.5;color:var(--navy)">${choice ? choice.feedback : ''}</div>
      ${pts > 0 ? '<div style="margin-top:6px;font-weight:800;color:var(--violet)">+'+pts+' pts</div>' : ''}
    </div>
    <div class="card flat mb20" style="background:var(--violet-soft);border-color:var(--violet-light);display:flex;gap:12px">
      <div style="font-size:18px;flex:none;margin-top:2px">💡</div>
      <div style="font-size:13px;line-height:1.5;color:var(--navy)">${s.tip}</div>
    </div>
    <button class="btn btn-primary btn-block" onclick="nextSim()">
      ${_simStep < SIMULATION_STEPS.length-1 ? 'Phase suivante' : 'Voir mes résultats'} ${icon('arrowright')}
    </button>`;
}

function nextSim(){
  _simAnswered = false;
  if(_simStep >= SIMULATION_STEPS.length-1){
    STATE.user.points = (STATE.user.points||0) + _simScore;
    toast(`Simulation terminée ! +${_simScore} pts`);
    _simPhase = 'result';
    render();
  } else {
    _simStep++;
    render();
  }
}
