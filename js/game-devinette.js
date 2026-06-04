/* ============================================================
   AERYS — Devinette : Qui suis-je ?
   Devinez l'objet ou le service mystère hôtelier
   ============================================================ */

const RIDDLES = [
  {
    id: 1,
    answer: 'Le Room Service',
    emoji: '🍽',
    indices: [
      'Je suis disponible 24h/24 dans un hôtel 5 étoiles.',
      'Je vous apporte ce dont vous avez besoin sans que vous bougez de votre chambre.',
      'Je peux vous servir un petit-déjeuner, un dîner gastronomique ou même une bouteille de champagne.',
      "Mon numéro est généralement le \"0\" ou le \"9\" sur votre téléphone de chambre.",
    ],
    tip: "Le Room Service est l'un des services les plus emblématiques d'un hôtel de luxe. Rapidité et discrétion sont essentielles.",
    choices: ['Le Concierge', 'Le Room Service', 'La Conciergerie', 'Le Service Étage'],
  },
  {
    id: 2,
    answer: 'Le Minibar',
    emoji: '🥂',
    indices: [
      'Je suis petit mais précieux dans votre chambre.',
      'Je contiens des boissons, des snacks et parfois des surprises locales.',
      'Mon contenu est vérifié et réapprovisionné chaque jour par le housekeeping.',
      "Consommer mes produits a un coût… qui s'ajoute à votre facture finale.",
    ],
    tip: "Le minibar génère des revenus importants. Toujours vérifier son état lors du check-out client.",
    choices: ['Le Coffre-fort', 'Le Minibar', 'La Télévision', 'Le Sèche-cheveux'],
  },
  {
    id: 3,
    answer: 'La Clé de Chambre',
    emoji: '🗝',
    indices: [
      "Je suis aujourd'hui souvent sous forme de carte magnétique.",
      "Je contrôle l'accès à votre espace privé dans l'hôtel.",
      'On me remet au client lors du check-in avec un sourire.',
      'Si je suis perdue, la sécurité doit être immédiatement prévenue.',
    ],
    tip: "La remise de la clé est un moment clé (!) de l'accueil. Se faire expliquer les équipements lors de cette étape améliore la satisfaction client.",
    choices: ['Le Badge SPA', 'Le Pass Restaurant', 'La Clé de Chambre', 'La Carte Fidélité'],
  },
  {
    id: 4,
    answer: 'Le Concierge',
    emoji: '🎩',
    indices: [
      'Je porte souvent des gants blancs et un badge doré dans les grands hôtels.',
      'Je peux réserver votre table dans le meilleur restaurant de la ville.',
      'Je connais tous les bons plans, taxis, visites, événements culturels.',
      "Je suis la mémoire vivante de l'hôtel et de la destination.",
    ],
    tip: "Un bon concierge peut transformer un séjour ordinaire en expérience inoubliable. Développer ce réseau local est un atout précieux.",
    choices: ['Le Réceptionniste', "Le Maître d'Hôtel", 'Le Concierge', 'Le Bagagiste'],
  },
  {
    id: 5,
    answer: 'Le Turndown Service',
    emoji: '🌙',
    indices: [
      'Je suis un service discret effectué en soirée pendant que le client dîne.',
      'Je prépare la chambre pour la nuit : lumières tamisées, rideaux fermés.',
      'Je plie le coin du lit et dépose parfois un chocolat ou un mot de bonne nuit.',
      "Mon existence même est le signe d'un hôtel haut de gamme.",
    ],
    tip: "Le Turndown Service est un détail qui fait toute la différence dans la perception du luxe. Personnaliser ce service (photo de famille sortie, animal en serviette) crée des souvenirs.",
    choices: ['Le Room Service', 'La Mise en Place', 'Le Turndown Service', 'Le Housekeeping'],
  },
];

// ---- State ----
let _riddleStep     = 0;
let _riddleScore    = 0;
let _riddleHints    = 0;
let _riddleAnswered = false;
let _riddlePhase    = 'intro'; // intro | play | result
let _riddleAnswers  = [];

function initRiddle(){
  _riddleStep     = 0;
  _riddleScore    = 0;
  _riddleHints    = 1;
  _riddleAnswered = false;
  _riddlePhase    = 'intro';
  _riddleAnswers  = [];
}

// Points selon nb indices utilisés : 1→15, 2→10, 3→7, 4→3
function riddlePoints(hintsUsed){ return [15,10,7,3][Math.min(hintsUsed,4)-1]; }

// ---- Render ----
function empDevinette(){
  if(_riddlePhase === 'intro')  return riddleIntro();
  if(_riddlePhase === 'result') return riddleResult();
  return riddlePlay();
}

function riddleIntro(){
  return `
    <div class="flex items-center between mb24">
      <button class="bell" onclick="setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center">
        <div class="h3">Devinette</div>
        <span class="badge-pill badge-violet" style="margin-top:6px">Qui suis-je ?</span>
      </div>
      <div class="flex items-center gap12">${bell()}<div onclick="setProfileTab()" style="cursor:pointer">${avatarEl(STATE.user,46,true)}</div></div>
    </div>

    <div style="border-radius:var(--r-lg);overflow:hidden;position:relative;margin-bottom:20px;height:170px;background:var(--navy)">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" alt="" style="width:100%;height:170px;object-fit:cover;opacity:.5">
      <div style="position:absolute;inset:0;padding:24px;display:flex;flex-direction:column;justify-content:flex-end">
        <div style="color:#fff;font-family:var(--font-display);font-weight:800;font-size:26px">Qui suis-je ? 🔍</div>
        <div style="color:rgba(255,255,255,.75);font-size:14px;margin-top:6px">Devinez l'objet ou le service mystère</div>
      </div>
    </div>

    <div class="card mb16" style="border-left:4px solid var(--violet)">
      <div style="font-family:var(--font-display);font-weight:700;font-size:16px;margin-bottom:10px">🎯 Comment jouer</div>
      <div class="lead" style="font-size:14px;line-height:1.7">
        Chaque round, <strong>des indices apparaissent</strong> un par un. Devinez le service ou l'objet hôtelier le plus tôt possible.<br><br>
        Plus vous devinez vite, <strong>plus vous gagnez de points</strong> :
      </div>
      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
        ${[['1 indice','15 pts','var(--green)'],['2 indices','10 pts','var(--violet)'],['3 indices','7 pts','var(--orange)'],['4 indices','3 pts','var(--grey-text)']].map(([l,p,c])=>`
          <div style="flex:1;min-width:80px;text-align:center;background:var(--grey-100);border-radius:var(--r-md);padding:12px 8px">
            <div style="font-weight:800;font-size:18px;color:${c}">${p}</div>
            <div style="font-size:12px;color:var(--grey-text);margin-top:3px">${l}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="card flat mb24" style="background:var(--violet-soft);border-color:var(--violet-light);display:flex;gap:14px;align-items:center">
      <div style="font-size:32px">🏨</div>
      <div class="lead" style="font-size:13.5px"><strong style="color:var(--violet)">${RIDDLES.length} devinettes</strong> autour des services et objets d'un hôtel 5 étoiles. Testez votre connaissance du monde hôtelier !</div>
    </div>

    <button class="btn btn-primary btn-block" onclick="startRiddle()" style="font-size:17px;padding:18px">
      ${icon('arrowright')} Commencer
    </button>
  `;
}

function riddlePlay(){
  const r        = RIDDLES[_riddleStep];
  const progress = (_riddleStep / RIDDLES.length) * 100;
  const maxHints = r.indices.length;
  const pts      = riddlePoints(_riddleHints);

  const hintBtn = _riddleHints < maxHints
    ? `<button class="btn btn-ghost" style="flex:1;width:auto" onclick="revealHint()">💡 Indice (${riddlePoints(_riddleHints+1)} pts max)</button>`
    : '';
  const guessBtn = `<button class="btn btn-primary" style="flex:${_riddleHints < maxHints ? 1 : 2};width:auto" onclick="showRiddleChoices()">Je devine ! →</button>`;

  return `
    <div class="flex items-center between mb20">
      <button class="bell" onclick="initRiddle();setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center">
        <div class="h3">Devinette ${_riddleStep+1} <span style="color:var(--grey-muted);font-weight:500">/ ${RIDDLES.length}</span></div>
      </div>
      <div style="text-align:right">
        <div style="font-family:var(--font-display);font-weight:800;font-size:18px;color:var(--violet)">${_riddleScore}</div>
        <div class="lead" style="font-size:11px">pts</div>
      </div>
    </div>

    <div style="background:var(--grey-100);border-radius:99px;height:6px;margin-bottom:20px;overflow:hidden">
      <div style="background:linear-gradient(90deg,var(--violet),var(--violet-600));height:100%;width:${progress}%;border-radius:99px"></div>
    </div>

    <div class="card mb16" style="background:linear-gradient(135deg,var(--navy),var(--navy-soft));border:none;text-align:center;padding:28px 20px">
      <div style="font-size:56px;margin-bottom:12px">❓</div>
      <div style="color:#fff;font-family:var(--font-display);font-weight:800;font-size:20px">Qui suis-je ?</div>
      <div style="margin-top:12px">
        <span style="background:rgba(255,255,255,.12);color:rgba(255,255,255,.75);padding:6px 16px;border-radius:var(--r-pill);font-size:13px">
          Répondre maintenant → <strong style="color:var(--gold)">+${pts} pts</strong>
        </span>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
      ${r.indices.map((ind, i) => i < _riddleHints ? `
        <div style="display:flex;gap:12px;align-items:flex-start;background:var(--white);border:2px solid var(--violet-light);border-radius:var(--r-md);padding:14px 16px">
          <div style="width:28px;height:28px;border-radius:10px;background:var(--violet-soft);color:var(--violet);font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex:none">${i+1}</div>
          <div style="font-size:14px;line-height:1.5;color:var(--navy)">${ind}</div>
        </div>` : `
        <div style="display:flex;gap:12px;align-items:center;background:var(--grey-100);border:2px dashed var(--grey-200);border-radius:var(--r-md);padding:14px 16px;opacity:.5">
          <div style="width:28px;height:28px;border-radius:10px;background:var(--grey-200);font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex:none">${i+1}</div>
          <div style="font-size:14px;color:var(--grey-text)">Indice caché…</div>
        </div>`
      ).join('')}
    </div>

    <div id="riddleActions">
      ${_riddleAnswered ? '' : `<div style="display:flex;gap:10px;margin-bottom:14px">${hintBtn}${guessBtn}</div>`}
    </div>
    <div id="riddleChoices"></div>
    <div id="riddleFeedback"></div>
  `;
}

function riddleResult(){
  const max  = RIDDLES.length * 15;
  const pct  = Math.round(_riddleScore / max * 100);
  const stars = pct >= 85 ? 3 : pct >= 55 ? 2 : pct >= 25 ? 1 : 0;
  const msgs  = [
    'Continuez, chaque essai compte !',
    'Pas mal ! Essayez de deviner plus tôt.',
    "Bien joué ! Vos réflexes s'améliorent.",
    '🏆 Expert hôtelier ! Vous connaissez tout !'
  ];
  const starsHtml = Array.from({length:3},(_,i)=>{
    const f = i < stars ? 'none' : 'grayscale(1) opacity(.25)';
    return `<span style="font-size:38px;filter:${f}">⭐</span>`;
  }).join('');

  return `
    <div class="flex items-center between mb24">
      <button class="bell" onclick="setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center"><div class="h3">Résultats</div></div>
      <div style="width:42px"></div>
    </div>

    <div class="card mb16" style="text-align:center;padding:32px 24px;background:linear-gradient(135deg,var(--violet-soft),#f0ebff);border-color:var(--violet-light)">
      <div style="display:flex;justify-content:center;gap:4px;margin-bottom:16px">${starsHtml}</div>
      <div style="font-family:var(--font-display);font-weight:800;font-size:52px;color:var(--violet);line-height:1">${_riddleScore}</div>
      <div style="color:var(--grey-text);font-size:15px;margin-top:4px">points sur ${max}</div>
      <div style="margin:14px auto 0;max-width:280px;font-size:14.5px;font-weight:600;color:var(--navy)">${msgs[stars]}</div>
    </div>

    <div class="card mb16">
      <div style="font-weight:700;font-size:14px;margin-bottom:14px">📋 Récapitulatif</div>
      ${RIDDLES.map((r,i)=>{
        const sc = _riddleAnswers[i] || 0;
        return `
        <div class="flex items-center gap12" style="padding:10px 0;${i<RIDDLES.length-1?'border-bottom:1px solid var(--grey-100)':''}">
          <div style="font-size:22px">${r.emoji}</div>
          <div style="flex:1"><div style="font-weight:700;font-size:13.5px">${r.answer}</div></div>
          <span style="font-weight:800;font-size:14px;color:${sc>=10?'var(--green)':sc>=5?'var(--orange)':'var(--red)'}">+${sc} pts</span>
        </div>`;
      }).join('')}
    </div>

    ${stars >= 2 ? `
    <div class="card flat mb16" style="background:var(--gold-light);border-color:var(--gold);display:flex;align-items:center;gap:14px">
      <div style="font-size:32px">🔍</div>
      <div>
        <div style="font-weight:800;color:var(--gold);font-family:var(--font-display)">Badge : Détective Hôtelier</div>
        <div class="lead" style="font-size:13px;margin-top:3px">Vous connaissez les services comme votre poche !</div>
      </div>
    </div>` : ''}

    <div class="flex gap12">
      <button class="btn btn-ghost" style="flex:1;width:auto" onclick="startRiddle()">${icon('arrowleft')} Rejouer</button>
      <button class="btn btn-primary" style="flex:1;width:auto" onclick="setTab('emp-activities')">Activités ${icon('arrowright')}</button>
    </div>
  `;
}

// ---- Controllers ----
function startRiddle(){
  _riddleStep = 0; _riddleScore = 0; _riddleHints = 1;
  _riddleAnswered = false; _riddlePhase = 'play'; _riddleAnswers = [];
  render();
}

function revealHint(){
  const r = RIDDLES[_riddleStep];
  if(_riddleHints < r.indices.length){ _riddleHints++; render(); }
}

function showRiddleChoices(){
  const r     = RIDDLES[_riddleStep];
  const el    = document.getElementById('riddleChoices');
  const actEl = document.getElementById('riddleActions');
  if(actEl) actEl.innerHTML = '';
  if(!el) return;
  el.innerHTML = `
    <div style="font-family:var(--font-display);font-weight:700;font-size:15px;margin-bottom:12px">Votre réponse :</div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${r.choices.map(c=>`
        <div onclick="answerRiddle(this.dataset.val)" data-val="${c.replace(/"/g,'&quot;')}"
          style="border:2px solid var(--grey-200);border-radius:var(--r-md);padding:14px 18px;cursor:pointer;font-size:14.5px;font-weight:600;color:var(--navy);background:var(--white);transition:.15s"
          onmouseover="this.style.borderColor='var(--violet)';this.style.background='var(--violet-soft)'"
          onmouseout="this.style.borderColor='var(--grey-200)';this.style.background='var(--white)'">
          ${c}
        </div>`).join('')}
    </div>`;
}

function answerRiddle(choice){
  if(_riddleAnswered) return;
  _riddleAnswered = true;
  const r       = RIDDLES[_riddleStep];
  const correct = choice === r.answer;
  const pts     = correct ? riddlePoints(_riddleHints) : 0;
  _riddleScore += pts;
  _riddleAnswers.push(pts);

  const choicesEl = document.getElementById('riddleChoices');
  if(choicesEl){
    choicesEl.querySelectorAll('div[data-val]').forEach(el => {
      el.style.pointerEvents = 'none';
      el.onmouseover = null; el.onmouseout = null;
      const val = el.dataset.val;
      if(val === r.answer){ el.style.borderColor='var(--green)'; el.style.background='var(--green-light)'; }
      else if(val === choice && !correct){ el.style.borderColor='var(--red)'; el.style.background='var(--red-light)'; }
    });
  }

  const fb = document.getElementById('riddleFeedback');
  if(fb) fb.innerHTML = `
    <div class="card flat mt14 mb16" style="background:${correct?'var(--green-light)':'var(--red-light)'};border-color:${correct?'var(--green)':'var(--red)'}">
      <div style="font-weight:800;font-size:15px;color:${correct?'var(--green)':'var(--red)'};margin-bottom:6px">${correct?'✅ Bravo !':'❌ Pas tout à fait…'}</div>
      <div style="font-size:13.5px;line-height:1.5;color:var(--navy)">La réponse était : <strong>${r.answer}</strong> ${r.emoji}</div>
      ${pts ? `<div style="margin-top:6px;font-weight:800;color:var(--violet)">+${pts} pts</div>` : ''}
    </div>
    <div class="card flat mb20" style="background:var(--violet-soft);border-color:var(--violet-light);display:flex;gap:12px">
      <div style="font-size:18px;flex:none;margin-top:2px">💡</div>
      <div style="font-size:13px;line-height:1.5;color:var(--navy)">${r.tip}</div>
    </div>
    <button class="btn btn-primary btn-block" onclick="nextRiddle()">
      ${_riddleStep < RIDDLES.length-1 ? 'Devinette suivante' : 'Voir mes résultats'} ${icon('arrowright')}
    </button>`;
}

function nextRiddle(){
  _riddleAnswered = false;
  _riddleHints    = 1;
  if(_riddleStep >= RIDDLES.length-1){
    STATE.user.points = (STATE.user.points||0) + _riddleScore;
    toast('Bravo ! +' + _riddleScore + ' pts gagnés');
    _riddlePhase = 'result';
    render();
  } else {
    _riddleStep++;
    render();
  }
}
