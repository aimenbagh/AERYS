/* ============================================================
   AERYS — Espace Formateur
   Onglets : Accueil · Créer · Bibliothèque · Suivi · Profil
   (+ Sessions accessible via accueil)
   ============================================================ */

const FORM_TABS = [
  { id:'form-home', icon:'home', label:'Accueil' },
  { id:'form-create', icon:'create', label:'Créer' },
  { id:'form-library', icon:'library', label:'Bibliothèque' },
  { id:'form-tracking', icon:'trend', label:'Suivi' },
  { id:'form-profile', icon:'user', label:'Profil' },
];

// ---- Accueil formateur ----
function formHome(){
  const u = STATE.user;
  const kpis = DATA.formKpis.map(k=>`
    <div class="card flat" style="padding:18px">
      <div class="flex between items-start">
        <div class="icon-tile ${k.tone}" style="width:46px;height:46px;border-radius:13px">${icon(k.icon)}</div>
        ${k.delta?`<span class="badge-pill badge-green">▲ ${k.delta}</span>`:k.note?`<span class="badge-pill badge-orange">${k.note}</span>`:''}
      </div>
      <div class="flex items-center gap8 mt16"><div class="sc-value" style="font-size:28px">${k.value}</div></div>
      <div class="sc-label">${k.label}</div>
    </div>`).join('');

  const ai = DATA.formAI.map(a=>`
    <div class="card flat flex items-center gap12 mb12" style="background:#fff">
      <div class="icon-tile it-violet-soft" style="width:44px;height:44px">${icon(a.icon)}</div>
      <div style="flex:1"><div style="font-weight:700">${a.title}</div><div class="lead" style="font-size:13px;margin-top:3px">${a.desc}</div></div>
      <button class="btn btn-ghost btn-sm" onclick="toast('${a.action}')">${a.action} ${icon('chevright')}</button>
    </div>`).join('');

  const recent = DATA.formRecent.map(r=>`
    <div class="card flat flex items-center gap16 mb12">
      <div style="width:56px;height:56px;border-radius:14px;overflow:hidden;flex:none;position:relative;background:var(--navy)">
        <img src="${r.img}" style="width:100%;height:100%;object-fit:cover" alt="">
        <div style="position:absolute;inset:auto 0 0 0;display:flex;justify-content:center;padding-bottom:2px"></div>
      </div>
      <div style="flex:1"><div style="font-weight:700">${r.title}</div>
        <div class="lead" style="font-size:13px;margin-top:3px">${r.date} · ${icon('users','width="14" height="14" style=\"display:inline;vertical-align:-2px\"')} ${r.learners} apprenants</div></div>
      <span class="badge-pill badge-green">${r.rate}</span>
      <button class="bell" style="width:34px;height:34px;box-shadow:none;border:none" onclick="toast('Options')">${icon('dots')}</button>
    </div>`).join('');

  return `
    <div class="flex between" style="align-items:flex-start">
      <div><div class="h2">Bonjour ${u.name} 👋</div><div class="lead mt8">${u.roleLabel} • Suivez vos contenus et accompagnez vos apprenants.</div></div>
      <div class="flex items-center gap12 mobile-only">${bell(1)}${avatarEl(u,52,true)}</div>
    </div>
    <div class="grid g2 mt24 mb24">${kpis}</div>
    <div class="card mb24" style="background:var(--violet-soft);border-color:var(--violet-light)">
      <div class="flex between items-center mb16"><div class="flex items-center gap8"><span class="accent">${icon('sparkles')}</span><h3 class="section-title">Assistant IA</h3></div>
        <a class="accent" style="font-weight:700;cursor:pointer" onclick="toast('Recommandations IA')">Recommandations pour vous</a></div>
      ${ai}
    </div>
    <div class="flex between items-center mb16"><h3 class="section-title">Activités récentes</h3><a class="accent" style="font-weight:700;cursor:pointer" onclick="setTab('form-library')">Voir tout</a></div>
    ${recent}
    <h3 class="section-title mt32 mb16">Actions rapides</h3>
    <div class="grid g3">
      <button class="card tap" style="text-align:center;padding:20px" onclick="setTab('form-create')"><div class="icon-tile it-violet" style="margin:0 auto 12px;border-radius:50%">${icon('plus')}</div><div style="font-weight:700">Créer une activité</div></button>
      <button class="card tap" style="text-align:center;padding:20px" onclick="setTab('form-sessions')"><div class="icon-tile it-violet-soft" style="margin:0 auto 12px;border-radius:50%">${icon('calendar')}</div><div style="font-weight:700">Planifier une classe</div></button>
      <button class="card tap" style="text-align:center;padding:20px" onclick="setTab('form-tracking')"><div class="icon-tile it-violet-soft" style="margin:0 auto 12px;border-radius:50%">${icon('chartline')}</div><div style="font-weight:700">Voir le suivi</div></button>
    </div>
  `;
}

// ---- Créer une activité ----
let _createFormat = 'quiz';
function formCreate(){
  const formats = DATA.contentFormats.map(f=>`
    <button class="card tap" style="text-align:left;padding:16px;${f.id===_createFormat?'border:1.6px solid var(--violet);background:var(--violet-soft)':''}" onclick="setCreateFormat('${f.id}')">
      <div class="icon-tile ${f.id===_createFormat?'it-violet':'it-violet-soft'}" style="width:44px;height:44px">${icon(f.icon)}</div>
      <div class="h3 mt12" style="font-size:15px">${f.label}</div>
      <div class="lead" style="font-size:12.5px;margin-top:3px">${f.desc}</div>
    </button>`).join('');

  return `
    <div class="h2">Créer une activité</div>
    <div class="lead mt8 mb24">Choisissez un format, puis renseignez les informations pédagogiques.</div>
    <h3 class="section-title mb16">Format de l\u2019activité</h3>
    <div class="grid" style="grid-template-columns:repeat(4,1fr);gap:14px" id="formatGrid">${formats}</div>
    <div class="card mt24">
      <h3 class="section-title mb16">Informations générales</h3>
      <div class="grid g2" style="gap:16px">
        <div class="field" style="margin:0"><label>Titre</label><div class="input-wrap"><input class="inp" style="padding-left:16px" placeholder="Ex : Accueil client parfait"></div></div>
        <div class="field" style="margin:0"><label>Objectif pédagogique</label><div class="input-wrap"><input class="inp" style="padding-left:16px" placeholder="Ce que l\u2019apprenant doit maîtriser"></div></div>
        <div class="field" style="margin:0"><label>Département</label><select class="inp">${DATA.departments.map(d=>`<option>${d.name}</option>`).join('')}<option>Tous</option></select></div>
        <div class="field" style="margin:0"><label>Public cible</label><select class="inp"><option>Tous les postes</option><option>Réceptionnistes</option><option>Serveurs</option></select></div>
        <div class="field" style="margin:0"><label>Niveau</label><select class="inp"><option>Débutant</option><option>Intermédiaire</option><option>Avancé</option></select></div>
        <div class="field" style="margin:0"><label>Durée estimée</label><div class="input-wrap">${icon('clock','class="lead-icon"')}<input class="inp" placeholder="10 min"></div></div>
        <div class="field" style="margin:0"><label>Points à gagner</label><div class="input-wrap"><span class="lead-icon" style="left:14px;width:22px;height:22px">${icon('coin')}</span><input class="inp" style="padding-left:46px" placeholder="10 à 30"></div></div>
        <div class="field" style="margin:0"><label>Badge associé</label><select class="inp"><option>Accueil Pro</option><option>Quiz Master</option><option>Service 5★</option></select></div>
      </div>
      ${formatSpecific(_createFormat)}
      <div class="flex gap12 mt24">
        <button class="btn btn-ghost" onclick="toast('Brouillon enregistré')">Enregistrer brouillon</button>
        <button class="btn btn-primary" onclick="setTab('form-library');toast('Activité créée et publiée')">${icon('check')} Publier l\u2019activité</button>
      </div>
    </div>
  `;
}
function formatSpecific(fmt){
  if(fmt==='quiz') return `
    <h3 class="section-title mt24 mb16">Questions</h3>
    <div class="card flat">
      <div class="field" style="margin:0 0 16px"><label>Question 1</label><div class="input-wrap"><input class="inp" style="padding-left:16px" placeholder="Saisissez votre question..."></div></div>
      <div class="grid g2" style="gap:12px">
        ${['A','B','C','D'].map(l=>`<div class="flex items-center gap8"><div class="qo-letter" style="width:32px;height:32px;font-size:14px">${l}</div><input class="inp" style="padding-left:16px" placeholder="Réponse ${l}"></div>`).join('')}
      </div>
      <div class="grid g2 mt16" style="gap:12px">
        <div class="field" style="margin:0"><label>Bonne réponse</label><select class="inp"><option>B</option><option>A</option><option>C</option><option>D</option></select></div>
        <div class="field" style="margin:0"><label>Points pour cette question</label><input class="inp" style="padding-left:16px" placeholder="10"></div>
      </div>
      <div class="field mt16" style="margin:0"><label>Explication / Indice</label><textarea class="inp" style="padding-left:16px;min-height:70px;resize:vertical" placeholder="Expliquez la bonne réponse"></textarea></div>
      <button class="btn btn-ghost btn-sm mt16" style="width:auto" onclick="toast('Question ajoutée')">${icon('plus')} Ajouter une question</button>
    </div>`;
  if(fmt==='jeu') return `<h3 class="section-title mt24 mb16">Scénario du jeu</h3>
    <div class="card flat"><div class="field"><label>Scénario</label><textarea class="inp" style="padding-left:16px;min-height:80px" placeholder="Décrivez la mission..."></textarea></div>
    <div class="field" style="margin:0"><label>Règles de réussite</label><input class="inp" style="padding-left:16px" placeholder="Conditions pour gagner"></div></div>`;
  if(fmt==='devinette') return `<h3 class="section-title mt24 mb16">Indices</h3>
    <div class="card flat"><div class="field"><label>Indice 1</label><input class="inp" style="padding-left:16px"></div>
    <div class="field"><label>Indice 2</label><input class="inp" style="padding-left:16px"></div>
    <div class="field" style="margin:0"><label>Réponse attendue</label><input class="inp" style="padding-left:16px"></div></div>`;
  if(fmt==='simulation') return `<h3 class="section-title mt24 mb16">Mise en situation</h3>
    <div class="card flat"><div class="field"><label>Situation client</label><textarea class="inp" style="padding-left:16px;min-height:80px"></textarea></div>
    <div class="field" style="margin:0"><label>Options de décision & feedback</label><input class="inp" style="padding-left:16px" placeholder="Définissez les choix possibles"></div></div>`;
  return `<h3 class="section-title mt24 mb16">Contenu</h3>
    <div class="card flat"><div class="field" style="margin:0"><label>Lien / fichier média</label><div class="input-wrap">${icon('video','class="lead-icon"')}<input class="inp" placeholder="URL de la vidéo ou support"></div></div></div>`;
}
function setCreateFormat(f){ _createFormat=f; render(); }

// ---- Bibliothèque ----
let _libFilter = 'Tous';
function formLibrary(){
  const filters = ['Tous','Quiz','Jeu','Simulation','Micro-learning','Vidéo'];
  const list = _libFilter==='Tous' ? DATA.library : DATA.library.filter(l=>l.format===_libFilter);
  const rows = list.map(l=>`
    <div class="card flat flex items-center gap16 mb12">
      <div class="icon-tile it-violet-soft">${icon(l.icon)}</div>
      <div style="flex:1"><div class="h3" style="font-size:16px">${l.title}</div>
        <div class="flex items-center gap8 mt8 wrap"><span class="badge-pill badge-violet">${l.format}</span>
          <span class="lead" style="font-size:12.5px">${l.dept} · ${l.level} · ${l.stat}</span></div></div>
      <span class="badge-pill ${l.status==='Publié'?'badge-green':'badge-grey'}">${l.status}</span>
      <div class="flex gap8 desktop-only">
        <button class="bell" style="width:36px;height:36px" title="Modifier" onclick="toast('Modifier ${l.title.replace(/'/g,"")}')">${icon('edit')}</button>
        <button class="bell" style="width:36px;height:36px" title="Dupliquer" onclick="toast('Dupliqué')">${icon('duplicate')}</button>
        <button class="bell" style="width:36px;height:36px" title="Statistiques" onclick="toast('Statistiques')">${icon('chartline')}</button>
      </div>
      <button class="bell mobile-only" style="width:36px;height:36px" onclick="toast('Options du contenu')">${icon('dots')}</button>
    </div>`).join('');
  return `
    <div class="flex between" style="align-items:flex-start">
      <div><div class="h2">Bibliothèque</div><div class="lead mt8">Gérez tous vos contenus pédagogiques.</div></div>
      <button class="btn btn-primary" style="width:auto" onclick="setTab('form-create')">${icon('plus')} Nouveau contenu</button>
    </div>
    <div class="filters mt24 mb24">${filters.map(f=>`<span class="chip${f===_libFilter?' active':''}" onclick="setLibFilter('${f}')">${f}</span>`).join('')}</div>
    ${rows}
  `;
}
function setLibFilter(f){ _libFilter=f; render(); }

// ---- Sessions en ligne ----
function formSessions(){
  const rows = DATA.sessions.map(s=>`
    <div class="card flat flex items-center gap16 mb12">
      <div class="icon-tile it-violet-soft">${icon('classvirtual')}</div>
      <div style="flex:1"><div class="h3" style="font-size:16px">${s.title}</div>
        <div class="lead mt8" style="font-size:13px">${s.date} · ${s.time} · ${s.dur} · ${s.dept}</div></div>
      <span class="badge-pill badge-violet">${s.tool}</span>
      <span class="badge-pill badge-green">${s.enrolled} inscrits</span>
      <button class="btn btn-ghost btn-sm" onclick="toast('Rappel envoyé')">${icon('bell')}</button>
    </div>`).join('');
  return `
    <div class="flex items-center gap16 mb24">
      <button class="bell" onclick="setTab('form-home')">${icon('arrowleft')}</button>
      <div style="flex:1"><div class="h2">Sessions en ligne</div><div class="lead mt8">Planifiez et gérez vos classes virtuelles.</div></div>
      <button class="btn btn-primary" style="width:auto" onclick="newSession()">${icon('plus')} Planifier</button>
    </div>
    <h3 class="section-title mb16">Sessions à venir</h3>
    ${rows}
  `;
}
function newSession(){
  openModal(`<div class="flex between items-center mb16"><div class="h3">Planifier une classe virtuelle</div>
    <button class="bell" style="width:36px;height:36px" onclick="closeModal()"><span style="transform:rotate(45deg);display:flex">${icon('plus')}</span></button></div>
    <div class="field"><label>Titre</label><input class="inp" style="padding-left:16px" placeholder="Titre de la session"></div>
    <div class="grid g2" style="gap:12px"><div class="field"><label>Date</label><input class="inp" style="padding-left:16px" value="23 mai 2026"></div>
    <div class="field"><label>Heure</label><input class="inp" style="padding-left:16px" value="14h00"></div></div>
    <div class="field"><label>Outil</label><select class="inp"><option>Teams</option><option>Zoom</option><option>Meet</option></select></div>
    <button class="btn btn-primary" onclick="closeModal();toast('Session planifiée · invitations envoyées')">${icon('calendar')} Planifier la session</button>`);
}

// ---- Suivi des apprenants ----
function formTracking(){
  const rows = DATA.learners.map(l=>`
    <tr><td><div class="u-cell">${avatarEl({name:l.name},36)}<span class="u-name">${l.name}</span></div></td>
    <td class="muted">${l.dept}</td>
    <td><div class="flex items-center gap12" style="min-width:150px">${progressBar(l.prog)}<b>${l.prog}%</b></div></td>
    <td><b class="${l.score>=80?'txt-green':l.score>=70?'txt-orange':'txt-red'}">${l.score}%</b></td>
    <td><span class="badge-pill ${l.tone}">${l.status}</span></td>
    <td><button class="btn btn-ghost btn-sm" onclick="noteLearner('${l.name.replace(/'/g,'')}')">${icon('edit')} Note</button></td></tr>`).join('');
  return `
    <div class="h2">Suivi des apprenants</div>
    <div class="lead mt8 mb24">Progression, scores et détection des difficultés par apprenant.</div>
    <div class="grid g4 mb24">
      ${[['users','Apprenants actifs','156','it-violet-soft'],['trend','Taux de réussite','87%','it-green'],['clock','En difficulté','12','it-red'],['cap','Certificats émis','64','it-gold-soft']].map(s=>`
        <div class="stat-card"><div class="sc-icon ${s[3]}">${icon(s[0])}</div><div class="sc-value mt12" style="font-size:24px">${s[2]}</div><div class="sc-label">${s[1]}</div></div>`).join('')}
    </div>
    <div class="card" style="padding:6px 8px;overflow-x:auto">
      <table class="tbl"><thead><tr><th>Apprenant</th><th>Département</th><th>Progression</th><th>Score</th><th>Statut</th><th>Action</th></tr></thead>
      <tbody>${rows}</tbody></table>
    </div>
    <div class="card flat mt16 flex items-center between" style="background:var(--orange-light);border-color:#f0d9b0">
      <div class="flex items-center gap12"><span class="txt-orange">${icon('alertuser')}</span><div class="lead" style="color:var(--navy)">3 apprenants rencontrent des difficultés sur la simulation « Gestion des réclamations ».</div></div>
      <button class="btn btn-ghost btn-sm" style="color:var(--orange);border-color:#f0d9b0" onclick="toast('Accompagnement proposé')">Accompagner</button>
    </div>
  `;
}

function noteLearner(name){
  openModal(`<div class="flex between items-center mb16"><div class="h3">Note — ${name}</div>
    <button class="bell" style="width:36px;height:36px" onclick="closeModal()"><span style="transform:rotate(45deg);display:flex">${icon('plus')}</span></button></div>
    <div class="field"><label>Commentaire / appréciation</label>
      <textarea class="inp" maxlength="300" placeholder="Saisissez une note pour cet apprenant..."></textarea></div>
    <div class="field" style="margin-bottom:0"><label>Recommandation</label>
      <select class="inp"><option>Aucune action</option><option>Proposer un accompagnement</option><option>Assigner une formation complémentaire</option><option>Féliciter l’apprenant</option></select></div>
    <button class="btn btn-primary mt16" onclick="closeModal();toast('Note enregistrée pour ${name}')">${icon('check')} Enregistrer la note</button>`);
}

// ---- Profil formateur ----
function formProfile(){
  const u = STATE.user;
  const rows = [
    { icon:'user', label:'Informations personnelles', sub:'info' },
    { icon:'cap', label:'Domaines d\u2019expertise', sub:'expertise' },
    { icon:'library', label:'Historique des formations créées', sub:'created-history' },
    { icon:'star', label:'Évaluations reçues', sub:'evaluations' },
    { icon:'bell', label:'Notifications', sub:'notifications' },
    { icon:'settings', label:'Paramètres', sub:'settings' },
  ];
  return `
    <div class="flex between items-center mb24"><div class="h2">Profil</div><button class="bell" onclick="openSub('settings')">${icon('settings')}</button></div>
    <div class="flex items-center gap16 mb24" style="flex-wrap:wrap">
      ${avatarEl(u,96,true)}
      <div style="flex:1;min-width:180px">
        <div class="h1" style="font-size:30px">${u.name}</div>
        <div class="lead mt8">${u.roleLabel} · ${u.dept}</div>
        <div class="flex items-center gap8 mt8"><span class="badge-pill badge-violet">${icon('starfill')} 4.8 / 5</span><span class="badge-pill badge-green">12 modules</span></div>
      </div>
    </div>
    <div class="grid g3 mb24">
      ${[['library','Modules créés','12'],['users','Apprenants formés','156'],['calendar','Sessions animées','36']].map(s=>`
        <div class="stat-card"><div class="sc-icon it-violet-soft">${icon(s[0])}</div><div class="sc-value mt12" style="font-size:26px">${s[2]}</div><div class="sc-label">${s[1]}</div></div>`).join('')}
    </div>
    <div class="card" style="padding:6px 16px">
      ${rows.map(r=>`<div class="list-row" onclick="openSub('${r.sub}')"><div class="lr-icon">${icon(r.icon)}</div><div class="lr-label">${r.label}</div><span class="chev">${icon('chevright')}</span></div>`).join('')}
    </div>
    <button class="btn btn-ghost mt24" style="background:var(--violet-soft)" onclick="logout()">${icon('logout')} Se déconnecter</button>
  `;
}
