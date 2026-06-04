/* ============================================================
   AERYS — Micro-learning : 5 clés du service Hyatt
   Format lecture + quiz flash, 5 minutes pour l'essentiel
   ============================================================ */

const ML_CARDS = [
  {
    id: 1,
    key: 'Présence totale',
    emoji: '👁',
    color: 'var(--violet)',
    colorSoft: 'var(--violet-soft)',
    colorLight: 'var(--violet-light)',
    headline: 'Être là, vraiment.',
    body: 'Un employé Hyatt n\'est jamais "absent" même physiquement présent. Regarder son téléphone, parler à un collègue ou sembler distrait envoie un signal négatif fort au client.',
    example: '✅ Interrompre une conversation entre collègues dès qu\'un client s\'approche à moins de 3 mètres.',
    stat: '93% des clients remarquent si l\'employé est distrait lors de leur interaction.',
    quiz: {
      q: 'Un client s\'approche alors que vous discutez avec un collègue. Que faites-vous ?',
      choices: [
        { text: 'Lever un doigt pour demander au client de patienter.', correct: false },
        { text: 'Interrompre la conversation, sourire et se tourner vers le client.', correct: true },
        { text: 'Terminer votre phrase puis accueillir le client.', correct: false },
      ],
    },
  },
  {
    id: 2,
    key: 'Personnalisation',
    emoji: '🎯',
    color: 'var(--gold)',
    colorSoft: 'var(--gold-light)',
    colorLight: '#f5e8c8',
    headline: 'Chaque client est unique.',
    body: 'Hyatt forme ses équipes à mémoriser et utiliser le nom du client, ses préférences et son historique. Un client qui se sent reconnu revient et dépense davantage.',
    example: '✅ « Bonjour M. Larbi, votre chambre habituelle au 5ème est prête, avec vue sur la mer comme vous préférez. »',
    stat: 'Les clients appelés par leur nom ont 47% plus de chances de recommander l\'hôtel.',
    quiz: {
      q: 'Un client régulier arrive. Vous avez accès à son profil. Quelle est la priorité ?',
      choices: [
        { text: 'Effectuer le check-in le plus vite possible.', correct: false },
        { text: 'L\'accueillir par son nom et évoquer une préférence notée dans son profil.', correct: true },
        { text: 'Lui donner le formulaire à remplir.', correct: false },
      ],
    },
  },
  {
    id: 3,
    key: 'Anticipation',
    emoji: '🔮',
    color: 'var(--green)',
    colorSoft: 'var(--green-light)',
    colorLight: '#d0f0e0',
    headline: 'Répondre avant qu\'on demande.',
    body: 'Le plus haut niveau de service consiste à anticiper les besoins. Observer, écouter, analyser les indices — et agir avant que le client formule sa demande.',
    example: '✅ Voir un client avec une valise lourde → proposer l\'aide immédiatement, sans attendre qu\'il demande.',
    stat: 'L\'anticipation réduit de 60% les demandes au service et augmente le score NPS de 22 points.',
    quiz: {
      q: 'Vous voyez un couple entrer avec des valises de mariage. Quelle est votre réaction idéale ?',
      choices: [
        { text: 'Attendre qu\'ils viennent à la réception.', correct: false },
        { text: 'Aller à leur rencontre, les féliciter et proposer une surprise pour leur chambre.', correct: true },
        { text: 'Les enregistrer rapidement pour ne pas les faire attendre.', correct: false },
      ],
    },
  },
  {
    id: 4,
    key: 'Résolution rapide',
    emoji: '⚡',
    color: 'var(--orange)',
    colorSoft: 'var(--orange-light)',
    colorLight: '#fce8cc',
    headline: '15 minutes pour tout résoudre.',
    body: 'Hyatt applique la règle des 15 minutes : tout problème signalé doit avoir une réponse ou une solution dans les 15 minutes suivantes. Passé ce délai, le client perd confiance.',
    example: '✅ Chambre froide signalée → technicien envoyé + appel de suivi dans 10 min + upgrade proposé si non résolu.',
    stat: 'Un problème résolu en moins de 15 min crée autant de satisfaction qu\'un séjour sans incident.',
    quiz: {
      q: 'Un client vous signale une fuite d\'eau dans sa salle de bain. Quelle est la bonne séquence ?',
      choices: [
        { text: 'Notez le problème et transmettez à la maintenance en fin de service.', correct: false },
        { text: 'Excusez-vous, appelez la maintenance immédiatement et proposez une chambre de remplacement si besoin.', correct: true },
        { text: 'Dites-lui que la maintenance passera dans la journée.', correct: false },
      ],
    },
  },
  {
    id: 5,
    key: 'Signature émotionnelle',
    emoji: '💫',
    color: '#8B5CF6',
    colorSoft: 'var(--violet-soft)',
    colorLight: 'var(--violet-light)',
    headline: 'Créer le souvenir.',
    body: 'La signature émotionnelle est ce dont le client se souvient après son départ. Ce n\'est pas la chambre ni le buffet — c\'est ce que vous avez fait de spécial, d\'humain, d\'inattendu.',
    example: '✅ Laisser un mot manuscrit souhaitant bon courage à un client qui part en réunion difficile, basé sur une conversation la veille.',
    stat: '82% des avis 5 étoiles sur TripAdvisor mentionnent une action personnelle d\'un employé.',
    quiz: {
      q: 'Un client vous a mentionné hier que c\'est l\'anniversaire de sa fille aujourd\'hui. Le matin, que faites-vous ?',
      choices: [
        { text: 'Rien — ce n\'est pas votre rôle.', correct: false },
        { text: 'Préparer une petite surprise (gâteau, dessin, mot) déposée en chambre avant qu\'il parte.', correct: true },
        { text: 'Lui souhaiter verbalement à son départ.', correct: false },
      ],
    },
  },
];

// ---- State ----
let _mlStep      = 0;
let _mlPhase     = 'intro';   // intro | read | quiz | result
let _mlQuizScore = 0;
let _mlAnswers   = [];
let _mlAnswered  = false;

function initML(){
  _mlStep = 0; _mlPhase = 'intro';
  _mlQuizScore = 0; _mlAnswers = []; _mlAnswered = false;
}

// ---- Render ----
function empMicroLearning(){
  if(_mlPhase === 'intro')  return mlIntro();
  if(_mlPhase === 'read')   return mlRead();
  if(_mlPhase === 'quiz')   return mlQuiz();
  if(_mlPhase === 'result') return mlResult();
  return mlIntro();
}

function mlIntro(){
  const a = DATA.activities.find(x=>x.id==='m1');
  return `
    <div class="flex items-center between mb24">
      <button class="bell" onclick="setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center">
        <div class="h3">Micro-learning</div>
        <span class="badge-pill badge-violet" style="margin-top:6px">5 clés du service Hyatt</span>
      </div>
      <div class="flex items-center gap12">${bell()}<div onclick="setProfileTab()" style="cursor:pointer">${avatarEl(STATE.user,46,true)}</div></div>
    </div>

    <div style="border-radius:var(--r-lg);overflow:hidden;position:relative;margin-bottom:20px;height:170px">
      <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80" alt="" style="width:100%;height:170px;object-fit:cover;opacity:.55;background:var(--navy)">
      <div style="position:absolute;inset:0;padding:24px;background:linear-gradient(to top,rgba(11,15,58,.85) 0%,transparent 60%);display:flex;flex-direction:column;justify-content:flex-end">
        <div style="color:#fff;font-family:var(--font-display);font-weight:800;font-size:24px">5 clés du service Hyatt 🗝</div>
        <div style="color:rgba(255,255,255,.75);font-size:14px;margin-top:6px">5 minutes pour retenir l'essentiel</div>
      </div>
    </div>

    ${a && a.progress ? `
    <div class="card flat mb16" style="background:var(--violet-soft);border-color:var(--violet-light)">
      <div class="flex items-center between mb8">
        <div style="font-weight:700;font-size:13.5px">Progression</div>
        <span style="font-weight:800;font-size:14px;color:var(--violet)">${a.progress}%</span>
      </div>
      <div class="progress"><span style="width:${a.progress}%"></span></div>
      <div class="lead" style="font-size:12.5px;margin-top:8px">Vous avez déjà commencé ! Continuez pour gagner les ${a.points} pts.</div>
    </div>` : ''}

    <div class="card mb16" style="border-left:4px solid var(--gold)">
      <div style="font-family:var(--font-display);font-weight:700;font-size:16px;margin-bottom:10px">📖 Format</div>
      <div class="lead" style="font-size:14px;line-height:1.7">Chaque clé = <strong>1 carte de lecture</strong> + <strong>1 question flash</strong>. Lisez, retenez l'essentiel, répondez. Total : <strong>~5 minutes</strong>.</div>
    </div>

    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
      ${ML_CARDS.map((c,i)=>`
        <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:var(--r-md);background:var(--white);border:2px solid var(--grey-200)">
          <div style="width:38px;height:38px;border-radius:12px;background:${c.colorSoft};display:flex;align-items:center;justify-content:center;font-size:20px;flex:none">${c.emoji}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:14px;color:${c.color}">Clé ${i+1}</div>
            <div style="font-weight:700;font-size:13.5px;color:var(--navy)">${c.key}</div>
          </div>
          <div style="color:var(--grey-muted);font-size:13px">~1 min</div>
        </div>`).join('')}
    </div>

    <button class="btn btn-primary btn-block" onclick="startML()" style="font-size:17px;padding:18px">
      ${icon('arrowright')} Commencer
    </button>
  `;
}

function mlRead(){
  const c = ML_CARDS[_mlStep];
  const progress = ((_mlStep * 2) / (ML_CARDS.length * 2)) * 100;

  return `
    <div class="flex items-center between mb20">
      <button class="bell" onclick="initML();setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${c.color}">Clé ${_mlStep+1} sur ${ML_CARDS.length}</div>
        <div class="h3" style="margin-top:2px">${c.key}</div>
      </div>
      <div style="width:42px;height:42px;border-radius:50%;background:${c.colorSoft};display:flex;align-items:center;justify-content:center;font-size:22px">${c.emoji}</div>
    </div>

    <div style="background:var(--grey-100);border-radius:99px;height:5px;margin-bottom:20px;overflow:hidden">
      <div style="background:${c.color};height:100%;width:${progress}%;border-radius:99px;transition:.4s"></div>
    </div>

    <!-- Reading card -->
    <div class="card mb14" style="border-top:4px solid ${c.color};padding:22px">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
        <div style="width:50px;height:50px;border-radius:16px;background:${c.colorSoft};display:flex;align-items:center;justify-content:center;font-size:28px;flex:none">${c.emoji}</div>
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${c.color}">Clé ${_mlStep+1}</div>
          <div style="font-family:var(--font-display);font-weight:800;font-size:20px;color:var(--navy);line-height:1.1;margin-top:2px">${c.headline}</div>
        </div>
      </div>
      <div style="font-size:14.5px;line-height:1.7;color:var(--navy);margin-bottom:16px">${c.body}</div>
      <div style="background:${c.colorSoft};border-radius:var(--r-md);padding:14px;border-left:3px solid ${c.color};margin-bottom:14px">
        <div style="font-size:13px;line-height:1.6;color:var(--navy)">${c.example}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;background:var(--grey-100);border-radius:var(--r-md);padding:12px 14px">
        <div style="font-size:18px">📊</div>
        <div style="font-size:12.5px;color:var(--grey-text);line-height:1.5;font-style:italic">${c.stat}</div>
      </div>
    </div>

    <button class="btn btn-primary btn-block" onclick="goToMLQuiz()" style="font-size:16px;padding:16px">
      Question flash ${icon('arrowright')}
    </button>
  `;
}

function mlQuiz(){
  const c  = ML_CARDS[_mlStep];
  const q  = c.quiz;
  const progress = ((_mlStep * 2 + 1) / (ML_CARDS.length * 2)) * 100;

  return `
    <div class="flex items-center between mb20">
      <button class="bell" onclick="_mlPhase='read';render()" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${c.color}">Quiz flash — Clé ${_mlStep+1}</div>
        <div class="lead" style="font-size:12px;margin-top:2px">${c.key}</div>
      </div>
      <div style="width:42px;height:42px;border-radius:50%;background:${c.colorSoft};display:flex;align-items:center;justify-content:center;font-size:22px">${c.emoji}</div>
    </div>

    <div style="background:var(--grey-100);border-radius:99px;height:5px;margin-bottom:20px;overflow:hidden">
      <div style="background:${c.color};height:100%;width:${progress}%;border-radius:99px;transition:.4s"></div>
    </div>

    <!-- Quiz card -->
    <div class="card mb16" style="background:linear-gradient(135deg,${c.colorSoft},#fff);border-color:${c.colorLight};padding:20px;text-align:center">
      <div style="font-size:36px;margin-bottom:10px">⚡</div>
      <div style="font-family:var(--font-display);font-weight:700;font-size:15.5px;color:var(--navy);line-height:1.4">${q.q}</div>
    </div>

    <div id="mlChoices" style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">
      ${q.choices.map((ch,i)=>`
        <div class="ml-choice" id="mlc-${i}" onclick="answerML(${i})"
          style="border:2px solid var(--grey-200);border-radius:var(--r-md);padding:14px 16px;cursor:pointer;background:var(--white);display:flex;gap:12px;align-items:flex-start;transition:.15s">
          <div style="width:30px;height:30px;border-radius:10px;background:${c.colorSoft};color:${c.color};font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex:none">${['A','B','C'][i]}</div>
          <div style="font-size:14px;line-height:1.5;color:var(--navy)">${ch.text}</div>
        </div>`).join('')}
    </div>

    <div id="mlFeedback"></div>
  `;
}

function mlResult(){
  const max = ML_CARDS.length;
  const pct = Math.round(_mlQuizScore / max * 100);
  const stars = pct >= 80 ? 3 : pct >= 60 ? 2 : pct >= 40 ? 1 : 0;
  const msgs = ['Relisez les fiches — les clés Hyatt méritent d\'être retenues.', 'Bien ! Quelques clés à retravailler.', 'Très bien ! Vous maîtrisez les fondamentaux.', '🏆 Parfait ! Toutes les clés sont intégrées.'];
    const starsHtml = Array.from({length:3},(_,i)=>{ const f=i<stars?'none':'grayscale(1) opacity(.25)'; return '<span style="font-size:'+('38px')+';filter:'+f+'">⭐</span>'; }).join('');
  const earnedPts = DATA.activities.find(x=>x.id==='m1')?.points || 10;

  return `
    <div class="flex items-center between mb24">
      <button class="bell" onclick="setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center"><div class="h3">Résultats</div></div>
      <div style="width:42px"></div>
    </div>

    <div class="card mb16" style="text-align:center;padding:32px 24px;background:linear-gradient(135deg,var(--gold-light),#fffaf0);border-color:var(--gold)">
      <div style="display:flex;justify-content:center;gap:4px;margin-bottom:16px">${starsHtml}</div>
      <div style="font-family:var(--font-display);font-weight:800;font-size:52px;color:var(--gold);line-height:1">${_mlQuizScore}/${max}</div>
      <div style="color:var(--grey-text);font-size:15px;margin-top:4px">bonnes réponses</div>
      <div style="margin:14px auto 0;max-width:280px;font-size:14.5px;font-weight:600;color:var(--navy)">${msgs[stars]}</div>
    </div>

    <!-- Keys recap -->
    <div class="card mb16">
      <div style="font-weight:700;font-size:14px;margin-bottom:14px">🗝 Récapitulatif des 5 clés</div>
      ${ML_CARDS.map((c,i)=>{
        const ok = _mlAnswers[i];
        return `
          <div class="flex items-center gap12" style="padding:10px 0;${i<ML_CARDS.length-1?'border-bottom:1px solid var(--grey-100)':''}">
            <div style="width:34px;height:34px;border-radius:11px;background:${c.colorSoft};display:flex;align-items:center;justify-content:center;font-size:18px;flex:none">${c.emoji}</div>
            <div style="flex:1"><div style="font-weight:700;font-size:13.5px;color:${c.color}">${c.key}</div></div>
            <span style="font-size:18px">${ok ? '✅' : '❌'}</span>
          </div>`;
      }).join('')}
    </div>

    ${stars >= 2 ? `
    <div class="card flat mb16" style="background:var(--gold-light);border-color:var(--gold);display:flex;align-items:center;gap:14px">
      <div style="font-size:32px">🗝</div>
      <div>
        <div style="font-weight:800;color:var(--gold);font-family:var(--font-display)">Badge : Maître des 5 Clés</div>
        <div class="lead" style="font-size:13px;margin-top:3px">Vous avez retenu l'essentiel du service Hyatt.</div>
      </div>
    </div>` : ''}

    <div class="flex gap12">
      <button class="btn btn-ghost" style="flex:1" onclick="startML()">${icon('arrowleft')} Rejouer</button>
      <button class="btn btn-primary" style="flex:1" onclick="setTab('emp-activities')">Activités ${icon('arrowright')}</button>
    </div>
  `;
}

// ---- Controllers ----
function startML(){
  _mlStep = 0; _mlPhase = 'read'; _mlQuizScore = 0;
  _mlAnswers = []; _mlAnswered = false;
  render();
}

function goToMLQuiz(){
  _mlAnswered = false;
  _mlPhase = 'quiz';
  render();
}

function answerML(idx){
  if(_mlAnswered) return;
  _mlAnswered = true;
  const c  = ML_CARDS[_mlStep];
  const ch = c.quiz.choices[idx];
  const ok = ch.correct;
  if(ok) _mlQuizScore++;
  _mlAnswers.push(ok);

  document.querySelectorAll('.ml-choice').forEach(el => {
    el.style.pointerEvents = 'none'; el.onmouseover = null; el.onmouseout = null;
  });
  const picked = document.getElementById('mlc-'+idx);
  if(ok){ if(picked){ picked.style.borderColor='var(--green)'; picked.style.background='var(--green-light)'; } }
  else {
    if(picked){ picked.style.borderColor='var(--red)'; picked.style.background='var(--red-light)'; }
    c.quiz.choices.forEach((ch,i) => { if(ch.correct){ const b=document.getElementById('mlc-'+i); if(b){ b.style.borderColor='var(--green)'; b.style.background='var(--green-light)'; } } });
  }

  const fb = document.getElementById('mlFeedback');
  const isLast = _mlStep >= ML_CARDS.length-1;
  if(fb) fb.innerHTML = `
    <div class="card flat mb16" style="background:${ok?'var(--green-light)':'var(--red-light)'};border-color:${ok?'var(--green)':'var(--red)'}">
      <div style="font-weight:800;font-size:15px;color:${ok?'var(--green)':'var(--red)'};">${ok ? '✅ Exact !' : '❌ Pas tout à fait.'}</div>
      ${!ok ? '<div style="font-size:13.5px;margin-top:6px;color:var(--navy)">La bonne réponse : <strong>'+c.quiz.choices.find(x=>x.correct).text+'</strong></div>' : ''}
    </div>
    <button class="btn btn-primary btn-block" onclick="nextML()">
      ${isLast ? 'Voir mes résultats' : 'Clé suivante'} ${icon('arrowright')}
    </button>`;
}

function nextML(){
  _mlAnswered = false;
  if(_mlStep >= ML_CARDS.length-1){
    const pts = DATA.activities.find(x=>x.id==='m1')?.points || 10;
    STATE.user.points = (STATE.user.points||0) + pts;
    toast(`Micro-learning terminé ! +${pts} pts`);
    _mlPhase = 'result';
    render();
  } else {
    _mlStep++;
    _mlPhase = 'read';
    render();
  }
}
