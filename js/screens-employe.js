/* ============================================================
   AERYS — Espace Employé
   Onglets : Accueil · Activités · Planning · Récompenses · Profil
   ============================================================ */

const EMP_TABS = [
  { id:'emp-home', icon:'home', label:'Accueil' },
  { id:'emp-activities', icon:'gamepad', label:'Activités' },
  { id:'emp-planning', icon:'planning', label:'Planning' },
  { id:'emp-rewards', icon:'trophy', label:'Récompenses' },
  { id:'emp-profile', icon:'user', label:'Profil' },
];

// ---- Accueil employé ----
function empHome(){
  const u = STATE.user;
  const stats = [
    { icon:'cap', tone:'it-violet-soft', label:'Formations en cours', value:'3' },
    { icon:'quiz', tone:'it-blue', label:'Quiz complétés', value:'14' },
    { icon:'gamepad', tone:'it-green', label:'Jeux terminés', value:'7' },
    { icon:'star', tone:'it-orange', label:'Score moyen', value:'86%' },
    { icon:'coin', tone:'it-gold-soft', label:'Points accumulés', value:'1250', raw:true },
    { icon:'medal', tone:'it-violet', label:'Badges obtenus', value:'5' },
  ];
  const reco = DATA.activities.slice(0,3);
  return `
    ${mobileGreeting(u, u.roleLabel)}
    <div class="input-wrap mb24">${icon('search','class="lead-icon"')}
      <input class="inp" placeholder="Rechercher une activité, un quiz, un jeu...">
    </div>

    <div class="grid g3 mb24">
      ${stats.map(s=>`<div class="stat-card">
        <div class="sc-icon ${s.tone}">${s.raw?'<span style="width:21px;height:21px;display:block">'+icon('coin')+'</span>':icon(s.icon)}</div>
        <div class="sc-value" style="font-size:24px;margin-top:12px">${s.value}</div>
        <div class="sc-label">${s.label}</div>
      </div>`).join('')}
    </div>

    <div class="banner-grad mb24">
      <div>
        <div style="font-weight:800;font-size:18px;font-family:var(--font-display)">Ma prochaine activité</div>
        <div style="opacity:.92;margin-top:6px">Classe virtuelle · 14h00 — L\u2019art d\u2019accueillir un client VIP</div>
      </div>
      <button class="btn" style="width:auto;background:#fff;color:var(--violet);padding:12px 20px" onclick="setTab('emp-planning')">Continuer</button>
    </div>

    <div class="flex between items-center mb16">
      <h3 class="section-title">Recommandé pour vous</h3>
      <a class="accent" style="font-weight:700;cursor:pointer" onclick="setTab('emp-activities')">Voir tout</a>
    </div>
    <div class="grid" style="gap:14px">${reco.map(activityCard).join('')}</div>

    <h3 class="section-title mt32 mb16">Mes badges récents</h3>
    <div class="scroll-x">${DATA.badges.map(b=>badgeChip(b)).join('')}</div>
  `;
}

function badgeChip(b){
  return `<div class="card flat" style="min-width:120px;text-align:center;padding:16px 14px;opacity:${b.got?1:.45}">
    <div class="icon-tile ${b.got?'it-violet':'it-violet-soft'}" style="margin:0 auto 10px">${icon(b.icon)}</div>
    <div style="font-weight:700;font-size:13.5px">${b.name}</div>
    <div class="lead" style="font-size:12px;margin-top:2px">${b.got?'Obtenu':'À débloquer'}</div>
  </div>`;
}

// activity card (catalogue)
function activityCard(a){
  return `<div class="act-card" onclick="openActivity('${a.id}')">
    <div class="ac-thumb"><img src="${a.img}" alt="">
      <div class="ac-type-icon">${icon(a.icon)}</div></div>
    <div class="ac-body">
      <div class="ac-type">${a.type}</div>
      <div class="ac-title">${a.title}</div>
      <div class="ac-desc">${a.desc}</div>
      ${a.progress?`<div class="mt8">${progressBar(a.progress)}</div>`:''}
      <div class="ac-foot">
        <span class="lead" style="font-size:13px">${icon('clock','width="14" height="14" style=\"display:inline;vertical-align:-2px\"')} ${a.meta} · ${a.difficulty}</span>
        <span class="ac-pts">+${a.points} <small>pts</small></span>
      </div>
    </div>
  </div>`;
}

// ---- Activités (catalogue) ----
let _actFilter = 'Tous';
function empActivities(){
  const u = STATE.user;
  const list = _actFilter==='Tous' ? DATA.activities : DATA.activities.filter(a=>a.type===_actFilter);
  return `
    <div class="flex between" style="align-items:flex-start">
      <div><div class="h2">Choisissez une activité</div>
      <div class="lead mt8">Apprenez, testez vos connaissances et progressez de manière interactive.</div></div>
      <div class="flex items-center gap12 mobile-only">${bell()}${avatarEl(u,52,true)}</div>
    </div>
    <div class="filters mt24 mb24">
      ${DATA.activityFilters.map(f=>`<span class="chip${f===_actFilter?' active':''}" onclick="setActFilter('${f}')">${f}</span>`).join('')}
    </div>
    <div class="grid" style="gap:14px">${list.map(activityCard).join('')}</div>
  `;
}
function setActFilter(f){ _actFilter=f; render(); }

// ---- Activité interactive (quiz) ----
let _quizAnswered = false;
function empActivityDetail(){
  const q = DATA.quiz;
  const opts = q.options.map(o=>`
    <div class="quiz-opt" data-correct="${o.correct}" onclick="answerQuiz(this)">
      <div class="qo-letter">${o.l}</div>
      <div class="qo-text">${o.t}</div>
      <div class="qo-mark">${icon('check')}</div>
    </div>`).join('');
  return `
    <div class="flex items-center between mb24">
      <button class="bell" onclick="setTab('emp-activities')" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div style="text-align:center"><div class="h3">Activité interactive</div>
        <span class="badge-pill badge-violet" style="margin-top:6px">${q.title.includes('Quiz')?'Quiz':'Quiz'}</span></div>
      <div class="flex items-center gap12">${bell()}${avatarEl(STATE.user,46,true)}</div>
    </div>
    <div class="card" style="padding:24px">
      <div class="flex between items-center mb12">
        <div class="h3">Question <span class="accent">${q.current}</span> <span class="muted" style="font-weight:600">/ ${q.total}</span></div>
      </div>
      ${progressBar(q.current/q.total*100)}
      <h2 class="h2 mt24 mb24" style="font-size:23px">${q.question}</h2>
      ${opts}
      <div id="quizFeedback"></div>
      <button class="btn btn-primary mt24" id="quizNext" onclick="nextQuiz()">Question suivante ${icon('arrowright')}</button>
    </div>
  `;
}
function answerQuiz(el){
  if(_quizAnswered) return;
  _quizAnswered = true;
  const correct = el.dataset.correct==='true';
  document.querySelectorAll('.quiz-opt').forEach(o=>{
    o.classList.add('disabled');
    if(o.dataset.correct==='true') o.classList.add('correct');
  });
  if(!correct) el.classList.add('wrong');
  const q = DATA.quiz;
  const fb = document.getElementById('quizFeedback');
  fb.innerHTML = `
    <div class="card flat mt16 flex items-center gap12" style="background:${correct?'var(--green-light)':'var(--red-light)'};border-color:${correct?'var(--green)':'var(--red)'}">
      <div class="icon-tile ${correct?'it-green':'it-red'}" style="width:46px;height:46px;background:${correct?'var(--green)':'var(--red)'};color:#fff">${icon(correct?'check':'plus','transform=\"rotate(45)\"')}</div>
      <div><div style="font-weight:800;color:${correct?'var(--green)':'var(--red)'};font-size:17px;font-family:var(--font-display)">${correct?'Bonne réponse !':'Pas tout à fait...'}</div>
      <div class="accent" style="font-weight:800">+${correct?q.points:0} points</div></div>
    </div>
    <div class="card flat mt12 flex items-center gap12" style="background:var(--violet-soft);border-color:var(--violet-light)">
      <div class="icon-tile it-violet" style="width:46px;height:46px">${icon('bulb')}</div>
      <div class="lead" style="color:var(--navy)">${q.explanation}</div>
    </div>
    <div class="card flat mt12 flex items-center gap12">
      <div class="icon-tile it-violet" style="width:46px;height:46px">${icon('shieldstar')}</div>
      <div style="flex:1"><div style="font-weight:700">Badge possible : <span class="accent">${q.badge.name}</span></div>
        <div class="lead" style="font-size:13px;margin:4px 0">${q.badge.progress}</div>${progressBar(q.badge.pct)}</div>
    </div>`;
  if(correct) STATE.user.points += q.points;
}
function nextQuiz(){
  if(!_quizAnswered){ toast('Choisissez une réponse'); return; }
  _quizAnswered = false;
  DATA.quiz.current = DATA.quiz.current >= DATA.quiz.total ? DATA.quiz.total : DATA.quiz.current+1;
  if(DATA.quiz.current >= DATA.quiz.total){
    openModal(`<div style="text-align:center">
      <div class="icon-tile it-violet" style="margin:0 auto 16px;width:64px;height:64px;border-radius:20px">${icon('trophy')}</div>
      <div class="h2">Quiz terminé !</div>
      <p class="lead mt12">Vous avez gagné des points et progressé vers le badge Accueil Pro.</p>
      <button class="btn btn-primary mt24" onclick="closeModal();DATA.quiz.current=3;setTab('emp-activities')">Retour aux activités</button>
    </div>`);
    return;
  }
  render();
}
function openActivity(id){ STATE.tab='emp-activity-detail'; STATE.activeActivity=id; render(); }

// ---- Planning employé ----
function empPlanning(){
  const u = STATE.user;
  const w = DATA.week;
  const days = w.days.map(d=>`<div class="week-day${d.active?' active':''}">
    <div class="wd-name">${d.n}</div><div class="wd-num">${d.d}</div>${d.dot?'<div class="wd-dot"></div>':''}</div>`).join('');
  const rows = DATA.planning.map(p=>`
    <div class="tl-row">
      <div class="tl-time">${p.time}</div><div class="tl-dot"></div>
      <div class="card tap flex items-center gap16">
        <div class="icon-tile it-violet-soft">${icon(p.icon)}</div>
        <div style="flex:1">
          <div class="accent" style="font-weight:700;font-size:13.5px">${p.type}</div>
          <div class="h3" style="font-size:17px">${p.title}</div>
          <div class="flex items-center gap8 mt8">
            ${p.live?`<span class="badge-pill badge-green">● En ligne</span>`:`<span class="lead" style="font-size:13px">○ ${p.status}</span>`}
          </div>
        </div>
        ${p.live?`<button class="btn btn-primary btn-sm" onclick="toast('Connexion à la classe virtuelle...')">Rejoindre</button>`:`<span style="color:var(--grey-muted)">${icon('chevright')}</span>`}
      </div>
    </div>`).join('');
  const summary = [
    { icon:'calendar', v:'3', l:'Sessions programmées' },
    { icon:'classvirtual', v:'1', l:'Classe virtuelle' },
    { icon:'cap', v:'1', l:'Formation obligatoire' },
    { icon:'bell', v:'2', l:'Rappels actifs' },
  ];
  return `
    <div class="flex between" style="align-items:flex-start">
      <div><div class="h2">Planning de la semaine</div>
      <div class="lead mt8">Organisez vos activités et continuez à progresser.</div></div>
      <div class="flex items-center gap12 mobile-only">${bell()}${avatarEl(u,52,true)}</div>
    </div>
    <div class="card mt24 mb24">
      <div class="flex between items-center mb16">
        <button class="bell" style="width:38px;height:38px" onclick="toast('Semaine précédente')">${icon('chevleft')}</button>
        <div class="h3">${w.label}</div>
        <button class="bell" style="width:38px;height:38px" onclick="toast('Semaine suivante')">${icon('chevright')}</button>
      </div>
      <div class="week-strip"><span></span>${days}<span></span></div>
    </div>
    <div class="flex items-center gap8 mb16"><span class="accent">${icon('planning')}</span><h3 class="section-title">Activités programmées</h3></div>
    <div class="timeline">${rows}</div>
    <div class="card flat mt16 flex items-center gap12" style="background:var(--violet-soft);border-color:var(--violet-light)">
      <span class="accent">${icon('bell')}</span>
      <div class="lead" style="color:var(--navy)">Terminez vos activités avant le 26 mai pour gagner plus de points.</div>
    </div>
    <h3 class="section-title mt32 mb16">Résumé de la semaine</h3>
    <div class="grid g4">${summary.map(s=>`<div class="stat-card" style="text-align:left">
      <div class="flex items-center gap8"><span class="accent">${icon(s.icon)}</span><span class="sc-value" style="font-size:24px">${s.v}</span></div>
      <div class="sc-label mt8">${s.l}</div></div>`).join('')}</div>
  `;
}

// ---- Récompenses / Boutique ----
let _shopFilter = 'Tous';
function empRewards(){
  const list = _shopFilter==='Tous' ? DATA.shop : DATA.shop.filter(s=>s.cat===_shopFilter);
  const fIcon = { 'Tous':'gift','Expériences':'plane','Cartes cadeaux':'giftcard','Goodies':'bag','Autres':'dots' };
  return `
    <div class="flex between" style="align-items:flex-start">
      <div><div class="h2">Boutique</div><div class="lead mt8">Échangez vos points contre des récompenses exclusives !</div></div>
      <div class="flex items-center gap12">
        <div class="card flat flex items-center gap12" style="padding:10px 16px">
          <span style="width:30px;height:30px;display:block">${icon('coin')}</span>
          <div><div class="lead" style="font-size:12px">Mes points</div><div class="accent" style="font-family:var(--font-display);font-weight:800;font-size:18px">${STATE.user.points} <small style="color:var(--grey-text)">pts</small></div></div>
        </div>
        <div class="bell" style="position:relative;cursor:pointer" onclick="openSub('cart')">${icon('cart')}<span class="dot" style="background:var(--violet)">2</span></div>
      </div>
    </div>
    <div class="banner-grad mt24 mb24">
      <div class="flex items-center gap16"><span style="font-size:38px">🎁</span>
        <div><div style="font-weight:800;font-size:17px;font-family:var(--font-display)">Plus vous progressez, plus vous gagnez !</div></div>
      </div>
      <div class="flex items-center gap12" style="border-left:1px solid rgba(255,255,255,.3);padding-left:20px">
        <div class="icon-tile" style="background:rgba(255,255,255,.18);color:#fff">${icon('crown')}</div>
        <div><div style="opacity:.85;font-size:13px">Niveau actuel</div><div style="font-weight:800">${STATE.user.level}</div></div>
      </div>
    </div>
    <h3 class="section-title mb16">Explorer la boutique</h3>
    <div class="filters mb24">${DATA.shopFilters.map(f=>`<span class="chip${f===_shopFilter?' active':''}" onclick="setShopFilter('${f}')">${icon(fIcon[f])}${f}</span>`).join('')}</div>
    <div class="grid g3">${list.map(shopCard).join('')}</div>
    <div class="card flat mt24 flex items-center between" style="background:var(--violet-soft);border-color:var(--violet-light)">
      <div class="flex items-center gap12"><span class="accent">${icon('giftcard')}</span>
        <div><div style="font-weight:700">Les points expirent dans 12 mois.</div><div class="lead" style="font-size:13px">Dépensez-les avant qu\u2019ils n\u2019expirent !</div></div></div>
      <a class="accent" style="font-weight:700;cursor:pointer" onclick="toast('Voir les conditions')">En savoir plus ›</a>
    </div>
  `;
}
function shopCard(s){
  const afford = STATE.user.points >= s.pts;
  return `<div class="shop-card">
    <div class="sh-img"><img src="${s.img}" alt=""><span class="sh-stock">Stock : ${s.stock}</span></div>
    <div class="sh-body">
      <div class="sh-name">${s.name}</div>
      <div class="sh-desc">${s.desc}</div>
      <div class="sh-foot">
        <div class="sh-pts"><span class="coin">${icon('coin')}</span>${s.pts} <small style="color:var(--grey-text);font-weight:600">pts</small></div>
        <button class="btn ${afford?'btn-primary':'btn-ghost'} btn-sm" onclick="exchange('${s.name.replace(/'/g,"\\'")}',${s.pts})">${afford?'Échanger':'Bientôt'}</button>
      </div>
    </div>
  </div>`;
}
function setShopFilter(f){ _shopFilter=f; render(); }
function exchange(name, pts){
  if(STATE.user.points < pts){ toast('Points insuffisants'); return; }
  openModal(`<div style="text-align:center">
    <div class="icon-tile it-gold" style="margin:0 auto 16px;width:64px;height:64px;border-radius:20px">${icon('gift')}</div>
    <div class="h3">Confirmer l\u2019échange</div>
    <p class="lead mt12">Échanger <b>${pts} pts</b> contre « ${name} » ?<br>Solde après échange : <b>${STATE.user.points-pts} pts</b></p>
    <div class="flex gap12 mt24"><button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
    <button class="btn btn-primary" onclick="confirmExchange(${pts},'${name.replace(/'/g,"\\'")}')">Confirmer</button></div>
  </div>`);
}
function confirmExchange(pts, name){
  STATE.user.points -= pts; closeModal(); render(); toast(`« ${name} » échangé · validé par RH`);
}

// ---- Profil employé ----
function empProfile(){
  const u = STATE.user;
  const rows = [
    { icon:'user', label:'Informations personnelles', sub:'info' },
    { icon:'medal', label:'Mes badges', sub:'badges' },
    { icon:'report', label:'Certificats', sub:'certificates' },
    { icon:'chartline', label:'Compétences', sub:'skills' },
    { icon:'clock', label:'Historique des activités', sub:'history' },
    { icon:'settings', label:'Paramètres', sub:'settings' },
    { icon:'info', label:'Aide & Support', sub:'help' },
  ];
  return `
    <div class="flex between items-center mb24"><div class="h2">Profil</div><button class="bell" onclick="openSub('settings')">${icon('settings')}</button></div>
    <div class="flex items-center gap16 mb24" style="flex-wrap:wrap">
      ${avatarEl(u,96,true)}
      <div style="flex:1;min-width:180px">
        <div class="h1" style="font-size:30px">${u.name}</div>
        <div class="flex items-center gap8 mt8 lead"><span class="accent">${icon('calendar')}</span> ${u.roleLabel}</div>
        <div class="flex items-center gap8 mt8"><span class="accent">${icon('chartline')}</span> <span class="accent" style="font-weight:700">${u.level}</span> <span style="color:var(--violet)">${icon('shieldstar')}</span></div>
        <div class="lead mt8" style="font-size:13px">Membre depuis ${u.member}</div>
      </div>
    </div>
    <div class="card flex items-center" style="gap:0">
      <div class="flex items-center gap12" style="flex:1;padding-right:20px;border-right:1px solid var(--grey-200)">
        <span class="accent">${icon('star')}</span>
        <div><div class="lead" style="font-size:13px">Mes points</div><div class="accent" style="font-family:var(--font-display);font-weight:800;font-size:22px">${u.points} <small style="color:var(--grey-text)">pts</small></div></div>
      </div>
      <div class="flex items-center gap12" style="flex:1;padding-left:20px">
        <span class="accent">${icon('chartline')}</span>
        <div><div class="lead" style="font-size:13px">Niveau actuel</div><div style="font-family:var(--font-display);font-weight:800;font-size:18px">${u.level}</div></div>
      </div>
    </div>
    <div class="card mt24" style="padding:6px 16px">
      ${rows.map(r=>`<div class="list-row" onclick="openSub('${r.sub}')">
        <div class="lr-icon">${icon(r.icon)}</div><div class="lr-label">${r.label}</div><span class="chev">${icon('chevright')}</span></div>`).join('')}
    </div>
    <button class="btn btn-ghost mt24" style="background:var(--violet-soft)" onclick="logout()">${icon('logout')} Se déconnecter</button>
  `;
}
