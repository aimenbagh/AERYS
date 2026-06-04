/* ============================================================
   AERYS — Espace Manager
   Onglets : Dashboard · Équipes · Rapports · Planning · Profil
   Le manager pilote et contrôle (ne crée pas de contenu).
   ============================================================ */

const MGR_TABS = [
  { id:'mgr-dashboard', icon:'dashboard', label:'Dashboard' },
  { id:'mgr-teams', icon:'users', label:'Équipes' },
  { id:'mgr-reports', icon:'report', label:'Rapports' },
  { id:'mgr-planning', icon:'planning', label:'Planning' },
  { id:'mgr-profile', icon:'user', label:'Profil' },
];

// ---- Dashboard manager ----
function mgrDashboard(){
  const u = STATE.user;
  const cards = DATA.mgrStats.map(s=>{
    if(s.ring){
      return `<div class="stat-card"><div class="flex items-center gap16">
        ${progRing(s.ring, s.ringColor||'#1FA463', 76)}
        <div><div class="sc-label">${s.label}</div></div></div></div>`;
    }
    return statCard(s);
  }).join('');

  const alerts = DATA.mgrAlerts.map(a=>`
    <div class="card flat flex items-center gap16 mb12">
      <div class="icon-tile ${a.tone}">${icon(a.icon)}</div>
      <div style="flex:1;font-weight:600">${a.text}</div>
      <button class="btn btn-ghost btn-sm" onclick="toast('${a.action}')">${a.action} ${icon('chevright')}</button>
    </div>`).join('');

  const quick = DATA.mgrQuick.map(q=>`
    <button class="card tap" style="text-align:center;padding:20px 12px" onclick="${q.go?`setTab('${q.go}')`:`toast('${q.label}')`}">
      <div class="icon-tile ${q.tone}" style="margin:0 auto 12px">${icon(q.icon)}</div>
      <div style="font-weight:700;font-size:14px">${q.label}</div>
    </button>`).join('');

  return `
    <div class="flex between" style="align-items:flex-start">
      <div><div class="h2">Bonjour ${u.name} 👋</div><div class="lead mt8">Vue globale de l\u2019hôtel</div></div>
      <div class="flex items-center gap12">
        <button class="btn btn-ghost btn-sm" style="gap:8px" onclick="toast('Sélecteur de période')">${icon('calendar')} Mai 2026 ${icon('chevdown')}</button>
        <span class="mobile-only">${bell()}</span>
      </div>
    </div>
    <div class="grid g3 mt24 mb24">${cards}</div>
    <div class="flex between items-center mb16"><h3 class="section-title">Alertes prioritaires</h3><a class="accent" style="font-weight:700;cursor:pointer" onclick="setTab('mgr-teams')">Voir tout</a></div>
    ${alerts}
    <h3 class="section-title mt32 mb16">Actions rapides</h3>
    <div class="grid g4">${quick}</div>
  `;
}

// ---- Équipes ----
function mgrTeams(){
  const depts = DATA.departments.map((d,i)=>`
    <div class="card${i===0?'':' flat'}" style="min-width:230px;${i===0?'border:1.6px solid var(--violet)':''}">
      <div class="flex items-center gap12 mb16">
        <div class="icon-tile" style="background:${d.color}1a;color:${d.color};width:44px;height:44px">${icon(d.icon)}</div>
        <div><div style="font-weight:700">${d.name}</div><div class="lead" style="font-size:12.5px">${d.count} employés</div></div>
      </div>
      <div class="flex items-center gap16">
        ${progRing(d.prog, d.color, 70)}
        <div class="lead" style="font-size:13px">Progression<br>moyenne</div>
      </div>
      <div class="flex between mt16" style="font-size:13px">
        <div><div class="lead" style="font-size:12px">En retard</div><div class="txt-red" style="font-weight:800;font-size:18px">${d.late}</div></div>
        <div style="text-align:right"><div class="lead" style="font-size:12px">Score moyen</div><div class="txt-green" style="font-weight:800;font-size:18px">${d.score}%</div></div>
      </div>
      <button class="btn btn-ghost btn-sm mt16" style="width:100%;color:${d.color};border-color:${d.color}33" onclick="toast('Détail ${d.name}')">Voir détail</button>
    </div>`).join('');

  const rows = DATA.employees.map(e=>`
    <tr>
      <td><div class="u-cell">${avatarEl({name:e.name},36)}<span class="u-name">${e.name}</span></div></td>
      <td class="muted">${e.poste}</td>
      <td><div class="flex items-center gap12" style="min-width:160px">${progressBar(e.prog)}<b>${e.prog}%</b></div></td>
      <td><b class="${e.score>=80?'txt-green':e.score>=70?'txt-orange':'txt-red'}">${e.score}%</b></td>
      <td><div class="flex items-center gap8"><span class="accent">${icon('medal')}</span> +${e.badges}</div></td>
      <td><span class="badge-pill ${e.tone}">${e.status}</span></td>
      <td><button class="bell" style="width:34px;height:34px;box-shadow:none;border:none" onclick="toast('Options employé')">${icon('dots')}</button></td>
    </tr>`).join('');

  return `
    <div class="flex between" style="align-items:flex-start">
      <div><div class="h2">Équipes</div><div class="lead mt8">Suivez la progression de vos équipes et accompagnez leur développement.</div></div>
      <button class="btn btn-primary" style="width:auto;background:var(--violet)" onclick="setTab('mgr-assign')">${icon('cap')} Assigner une formation</button>
    </div>
    <div class="flex gap12 mt24 mb24">
      <div class="input-wrap" style="flex:1">${icon('search','class="lead-icon"')}<input class="inp" placeholder="Rechercher un département ou un employé..."></div>
      <button class="btn btn-ghost" style="width:auto" onclick="toast('Filtres')">${icon('filter')} Filtres</button>
    </div>
    <div class="flex between items-center mb16"><h3 class="section-title">Vue par département</h3>
      <button class="btn btn-ghost btn-sm" onclick="toast('Trier par…')">Trier par : Progression ${icon('chevdown')}</button></div>
    <div class="scroll-x mb32">${depts}</div>
    <div class="flex between items-center mb16">
      <h3 class="section-title">Vue par employé — Réception <span class="badge-pill badge-violet">24 employés</span></h3>
      <button class="btn btn-ghost btn-sm" onclick="toast('Export en cours…')">${icon('download')} Exporter</button>
    </div>
    <div class="card" style="padding:6px 8px;overflow-x:auto">
      <table class="tbl"><thead><tr><th>Employé</th><th>Poste</th><th>Progression</th><th>Score</th><th>Badges</th><th>Statut</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table>
    </div>
    <div class="grid g2 mt24" style="gap:18px">
      <div class="card">
        <h3 class="section-title mb16">Actions rapides — Réception</h3>
        ${[['users','Assigner une formation à l\u2019équipe'],['bell','Envoyer un rappel à l\u2019équipe'],['calendar','Planifier une session'],['clock','Voir les formations en retard']].map(a=>`
          <div class="list-row" onclick="toast('${a[1]}')"><div class="lr-icon">${icon(a[0])}</div><div class="lr-label" style="font-size:14.5px">${a[1]}</div><span class="chev">${icon('chevright')}</span></div>`).join('')}
      </div>
      <div class="card" style="display:flex;flex-direction:column">
        <h3 class="section-title mb16">Besoin d\u2019aide ?</h3>
        <div class="card flat flex items-center gap12" style="background:var(--violet-soft);border-color:var(--violet-light);flex:1">
          <div class="icon-tile it-violet" style="width:44px;height:44px">${icon('info')}</div>
          <div><div style="font-weight:700">Des questions sur le suivi des équipes ?</div>
          <div class="lead" style="font-size:13px;margin:6px 0">Consultez notre guide ou contactez le support.</div>
          <button class="btn btn-ghost btn-sm" onclick="toast('Ouverture du guide')">Voir le guide</button></div>
        </div>
      </div>
    </div>
  `;
}

// ---- Rapports ----
function mgrReports(){
  const kpis = DATA.reportKpis.map(k=>`
    <div class="stat-card">
      <div class="sc-icon ${k.tone}">${icon(k.icon)}</div>
      <div class="sc-label mt12">${k.label}</div>
      <div class="sc-value" style="font-size:26px">${k.value}</div>
      <div class="${k.up?'txt-green':'txt-red'}" style="font-size:12.5px;font-weight:700;margin-top:4px">▲ ${k.delta}</div>
    </div>`).join('');

  const deptPerf = DATA.reportDeptPerf.map(d=>`
    <tr><td style="font-weight:600">${d.name}</td>
    <td><div class="flex items-center gap12" style="min-width:170px">${progressBar(d.comp)}<b>${d.comp}%</b></div></td>
    <td style="text-align:right"><b class="${d.score>=82?'txt-green':d.score>=78?'txt-orange':'txt-red'}">${d.score}%</b></td></tr>`).join('');

  const skill = (arr, tone)=>arr.map(s=>`<div class="flex items-center gap12 mb12">
    <div style="flex:1;font-size:14px;font-weight:600">${s.n}</div>
    <div style="width:130px">${progressBar(s.v, tone)}</div><b style="width:42px;text-align:right">${s.v}%</b></div>`).join('');

  const mix = DATA.formationMix.map(m=>`<div class="flex items-center gap8 mb8">
    <span style="width:11px;height:11px;border-radius:3px;background:${m.c}"></span>
    <span style="flex:1;font-size:13.5px;font-weight:600">${m.n}</span><b>${m.v}%</b></div>`).join('');

  return `
    <div class="flex between" style="align-items:flex-start">
      <div><div class="h2">Rapports</div><div class="lead mt8">Analysez l\u2019impact de la formation sur la performance de vos équipes.</div></div>
      <div class="flex items-center gap12 desktop-only">
        <button class="btn btn-ghost btn-sm" onclick="toast('Sélecteur de période')">${icon('calendar')} Mai 2026 ${icon('chevdown')}</button>
        <button class="btn btn-ghost btn-sm" onclick="toast('Filtres')">${icon('filter')} Filtres</button>
      </div>
    </div>
    <div class="card mt24 mb24 desktop-only">
      <div class="grid" style="grid-template-columns:repeat(4,1fr) auto;gap:14px;align-items:end">
        ${[['Période','Mai 2026'],['Département','Tous les départements'],['Type de formation','Tous'],['Formateur','Tous']].map(f=>`
          <div><label style="font-weight:700;font-size:13px;display:block;margin-bottom:8px">${f[0]}</label>
          <select class="inp"><option>${f[1]}</option></select></div>`).join('')}
        <button class="btn btn-primary" style="width:auto" onclick="toast('Filtres appliqués')">Appliquer</button>
      </div>
    </div>
    <div class="grid" style="grid-template-columns:repeat(5,1fr);gap:14px" id="kpiRow">${kpis}</div>
    <div class="grid g2 mt24" style="gap:18px">
      <div class="card"><h3 class="section-title mb16">Évolution des formations terminées</h3>${lineChart(DATA.reportTrend)}</div>
      <div class="card"><div class="flex between items-center mb16"><h3 class="section-title">Performance par département</h3><a class="accent" style="font-weight:700;cursor:pointer" onclick="setTab('mgr-teams')">Voir tout</a></div>
        <table class="tbl"><thead><tr><th>Département</th><th>Taux de complétion</th><th style="text-align:right">Score moyen</th></tr></thead><tbody>${deptPerf}</tbody></table></div>
    </div>
    <div class="grid g3 mt24" style="gap:18px">
      <div class="card"><div class="flex between items-center mb16"><h3 class="section-title" style="font-size:16px">Top compétences développées</h3></div>${skill(DATA.skillsTop,'green')}</div>
      <div class="card"><div class="flex between items-center mb16"><h3 class="section-title" style="font-size:16px">Compétences à améliorer</h3></div>${skill(DATA.skillsLow,'orange')}</div>
      <div class="card"><h3 class="section-title mb16" style="font-size:16px">Répartition par type</h3>
        <div class="flex items-center gap16">${donut(DATA.formationMix,150)}<div style="flex:1">${mix}</div></div></div>
    </div>
    <div class="grid g3 mt24" style="gap:18px">
      <div class="card"><h3 class="section-title mb16" style="font-size:16px">Impact sur les indicateurs clés</h3>
        ${[['Satisfaction client','+8%'],['Upselling','+12%'],['Réduction des réclamations','+7%'],['Qualité de service','+9%']].map(i=>`
          <div class="flex between items-center mb12" style="padding-bottom:12px;border-bottom:1px solid var(--grey-100)"><span style="font-weight:600;font-size:14px">${i[0]}</span><span class="txt-green" style="font-weight:700">▲ ${i[1]}</span></div>`).join('')}</div>
      <div class="card"><h3 class="section-title mb16" style="font-size:16px">Activité des formations</h3>
        ${[['calendar','Sessions planifiées','18'],['checkcircle','Sessions réalisées','15'],['users','Taux de participation','82%'],['clock','Abandons','8%']].map(i=>`
          <div class="flex between items-center mb12"><div class="flex items-center gap12"><span class="accent">${icon(i[0])}</span><span style="font-weight:600;font-size:14px">${i[1]}</span></div><b>${i[2]}</b></div>`).join('')}</div>
      <div class="card"><h3 class="section-title mb12" style="font-size:16px">Export des rapports</h3><div class="lead mb16" style="font-size:13px">Téléchargez ou partagez vos rapports.</div>
        <button class="btn btn-ghost mb12" onclick="toast('Export PDF généré')"><span class="txt-red">${icon('filepdf')}</span> Exporter PDF</button>
        <button class="btn btn-ghost mb12" onclick="toast('Export Excel généré')"><span class="txt-green">${icon('fileexcel')}</span> Exporter Excel</button>
        <button class="btn btn-ghost" onclick="toast('Envoyé au service RH')"><span class="accent">${icon('send')}</span> Envoyer au service RH</button></div>
    </div>
  `;
}

// ---- Planning manager ----
function mgrPlanning(){
  const sessions = DATA.sessions.map(s=>`
    <div class="card flat flex items-center gap16 mb12">
      <div class="icon-tile it-violet-soft">${icon('classvirtual')}</div>
      <div style="flex:1"><div class="h3" style="font-size:16px">${s.title}</div>
        <div class="lead mt8" style="font-size:13px">${s.date} · ${s.time} · ${s.dur} · ${s.dept} · ${s.tool}</div></div>
      <span class="badge-pill badge-violet">${s.enrolled} inscrits</span>
    </div>`).join('');
  return `
    <div class="h2">Planning des formations</div>
    <div class="lead mt8 mb24">Sessions et échéances de formation programmées pour vos équipes.</div>
    <div class="grid g3 mb24">
      ${[['calendar','Sessions ce mois','18','it-violet-soft'],['users','Participants attendus','80','it-green'],['clock','Échéances cette semaine','5','it-orange']].map(s=>`
        <div class="stat-card"><div class="sc-icon ${s[3]}">${icon(s[0])}</div><div class="sc-value mt12" style="font-size:26px">${s[2]}</div><div class="sc-label">${s[1]}</div></div>`).join('')}
    </div>
    <h3 class="section-title mb16">Sessions à venir</h3>
    ${sessions}
    <div class="card flat mt16 flex items-center between" style="background:var(--gold-light);border-color:#f0dcae">
      <div class="flex items-center gap12"><span class="accent-gold">${icon('bell')}</span><div class="lead" style="color:var(--navy)">3 formations obligatoires arrivent à échéance le 26 mai.</div></div>
      <button class="btn btn-gold btn-sm" onclick="toast('Rappel envoyé aux équipes')">Relancer</button>
    </div>
  `;
}

// ---- Assigner une formation (depuis dashboard/équipes) ----
function mgrAssign(){
  return `
    <div class="flex items-center gap16 mb24">
      <button class="bell" onclick="setTab('mgr-teams')">${icon('arrowleft')}</button>
      <div><div class="h2">Assigner une formation</div><div class="lead mt8">Sélectionnez une formation et les équipes concernées.</div></div>
    </div>
    <div class="card">
      <div class="field"><label>Formation</label><select class="inp">
        <option>Accueil client parfait (Quiz)</option><option>Gestion des réclamations (Simulation)</option>
        <option>Mission Hyatt (Jeu)</option><option>5 clés du service Hyatt (Micro-learning)</option></select></div>
      <div class="field"><label>Département cible</label><select class="inp">
        ${DATA.departments.map(d=>`<option>${d.name}</option>`).join('')}<option>Tous les départements</option></select></div>
      <div class="field"><label>Date limite</label><div class="input-wrap">${icon('calendar','class="lead-icon"')}<input class="inp" type="text" value="26 mai 2026"></div></div>
      <div class="field"><label>Type</label>
        <div class="flex gap12"><span class="chip active">Obligatoire</span><span class="chip">Recommandée</span><span class="chip">Optionnelle</span></div></div>
      <div class="field"><label>Message (optionnel)</label>
        <textarea class="inp" style="padding-left:16px;min-height:90px;resize:vertical" placeholder="Ajoutez un message pour vos équipes..."></textarea></div>
      <div class="flex gap12 mt16">
        <button class="btn btn-ghost" onclick="setTab('mgr-teams')">Annuler</button>
        <button class="btn btn-primary" onclick="setTab('mgr-teams');toast('Formation assignée · rappel programmé')">${icon('send')} Assigner la formation</button>
      </div>
    </div>
  `;
}

// ---- Rapports & Formateurs (détection des besoins) ----
function mgrTrainers(){
  const stats = DATA.trainersStats.map(s=>`
    <div class="stat-card" style="text-align:center">
      <div class="sc-icon ${s.tone}" style="margin:0 auto">${icon(s.icon)}</div>
      <div class="sc-label mt12">${s.label}</div>
      <div class="sc-value" style="font-size:26px">${s.value}</div>
    </div>`).join('');

  const gaps = DATA.skillGaps.map(g=>`
    <div class="flex items-center gap16" style="padding:14px 0;border-bottom:1px solid var(--grey-100)">
      <div class="icon-tile it-violet-soft" style="flex:none">${icon(g.icon)}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:14.5px;margin-bottom:8px">${g.name}</div>
        <div class="flex items-center gap12">${progressBar(g.v)}<b style="font-size:13px">${g.v}%</b></div>
      </div>
      <span class="badge-pill ${g.ptone}" style="flex:none">${g.prio}</span>
      <div style="text-align:center;flex:none;min-width:64px"><div style="font-weight:800;font-size:18px">${g.count}</div><div class="lead" style="font-size:12px">employés</div></div>
    </div>`).join('');

  const trainers = DATA.recommendedTrainers.map(t=>`
    <div class="card trainer-card mb12">
      <img class="tc-photo" src="${t.photo}" alt="${t.name}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'tc-photo',style:'display:flex;align-items:center;justify-content:center;background:var(--violet);color:#fff;font-weight:700',innerText:'${initials(t.name)}'}))">
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:15px">${t.name}</div>
        <div class="lead" style="font-size:12.5px">${t.role}</div>
        <div class="flex items-center gap4" style="margin-top:4px;color:var(--gold);font-weight:700;font-size:13px"><span style="width:15px;height:15px;display:inline-flex">${icon('starfill')}</span>${t.rating}</div>
      </div>
      <div class="desktop-only" style="flex:1.4;font-size:13px;line-height:1.5">
        <div><b>Offre :</b> ${t.offer}</div>
        <div style="margin-top:4px"><b>Format :</b> ${t.format}</div>
      </div>
      <button class="btn btn-ghost btn-sm" style="flex:none" onclick="toast('Offre de ${t.name}')">Voir l’offre</button>
    </div>`).join('');

  return `
    <div class="flex between" style="align-items:flex-start">
      <div class="flex items-center gap16">
        <button class="bell" onclick="setTab('mgr-dashboard')">${icon('arrowleft')}</button>
        <div><div class="h2">Rapports &amp; Formateurs</div><div class="lead mt8">Identifiez les besoins de vos équipes et trouvez l’offre adaptée.</div></div>
      </div>
      <button class="btn btn-ghost btn-sm desktop-only" onclick="toast('Sélecteur de période')">${icon('calendar')} Mai 2026 ${icon('chevdown')}</button>
    </div>

    <div class="grid g3 mt24 mb24">${stats}</div>

    <div class="card mb24">
      <h3 class="section-title mb8">Lacunes détectées</h3>
      ${gaps}
    </div>

    <div class="banner-grad mb24 flex items-center gap16">
      <div class="icon-tile it-violet-soft" style="flex:none">${icon('sparkles')}</div>
      <div style="flex:1;font-weight:600;font-size:14px">${DATA.trainerReco}</div>
      <button class="btn btn-ghost btn-sm" style="flex:none;background:#fff" onclick="toast('Recommandation détaillée')">Voir recommandation</button>
    </div>

    <h3 class="section-title mb16">Formateurs recommandés</h3>
    ${trainers}

    <button class="btn btn-primary btn-block mt24" onclick="setTab('mgr-request')">${icon('cap')} Lancer une demande de formation</button>
  `;
}

// ---- Formulaire : Demande de formation ----
let _reqType = 'simulation';
let _reqPriority = 'haute';
function setReqType(t){ _reqType = t; render(); }
function setReqPriority(p){ _reqPriority = p; render(); }
function sendRequest(){
  setTab('mgr-dashboard');
  toast('Demande envoyée au formateur ✓');
}

function mgrRequest(){
  const types = DATA.requestTypes.map(t=>`
    <div class="type-tile${_reqType===t.id?' selected':''}" onclick="setReqType('${t.id}')">
      ${icon(t.icon)}<span>${t.label}</span>
    </div>`).join('');

  return `
    <div class="flex between" style="align-items:flex-start">
      <div class="flex items-center gap16">
        <button class="bell" onclick="setTab('mgr-trainers')">${icon('arrowleft')}</button>
        <div><div class="h2">Demande de formation</div><div class="lead mt8">Envoyer un besoin spécifique au formateur.</div></div>
      </div>
      <span class="mobile-only">${bell()}</span>
    </div>

    <div class="card mt24">
      <div class="field"><label>1. Titre de la demande</label>
        <input class="inp flat" type="text" value="Gestion des réclamations clients difficiles"></div>

      <div class="field"><label>2. Type de formation souhaité</label>
        <div class="type-grid">${types}</div></div>

      <div class="field"><label>3. Objectif</label>
        <textarea class="inp" maxlength="200" placeholder="Décrivez l’objectif de la formation...">Renforcer la capacité des équipes à gérer les réclamations complexes avec professionnalisme.</textarea>
        <div class="char-count">81/200</div></div>

      <div class="grid g2" style="gap:16px">
        <div class="field"><label>4. Département concerné</label>
          <select class="inp">${DATA.requestDepartments.map(d=>`<option${d==='Réception'?' selected':''}>${d}</option>`).join('')}</select></div>
        <div class="field"><label>5. Public cible</label>
          <select class="inp">${DATA.requestAudiences.map(a=>`<option>${a}</option>`).join('')}</select></div>
      </div>

      <div class="field"><label>6. Niveau de priorité</label>
        <div class="radio-row">
          <div class="radio-opt${_reqPriority==='normale'?' selected':''}" onclick="setReqPriority('normale')"><span class="radio-dot"></span>Normale</div>
          <div class="radio-opt${_reqPriority==='haute'?' selected':''}" onclick="setReqPriority('haute')"><span class="radio-dot"></span>Haute</div>
        </div></div>

      <div class="field"><label>7. Date souhaitée</label>
        <div class="input-wrap">${icon('calendar','class=\"lead-icon\"')}<input class="inp" type="text" value="30 mai 2026"></div></div>

      <div class="field" style="margin-bottom:0"><label>8. Message au formateur</label>
        <textarea class="inp" maxlength="200" placeholder="Ajoutez un message...">Merci de proposer une formation adaptée sous forme interactive avec cas pratiques.</textarea>
        <div class="char-count">85/200</div></div>
    </div>

    <div class="banner-grad mt24 mb24 flex items-center gap16">
      <div class="icon-tile it-violet-soft" style="flex:none">${icon('info')}</div>
      <div style="flex:1;font-weight:600;font-size:13.5px">Le formateur recevra une notification et pourra proposer une offre de formation adaptée.</div>
    </div>

    <button class="btn btn-primary btn-block" onclick="sendRequest()">Envoyer la demande</button>
    <button class="btn btn-ghost btn-block mt12" style="border:none;color:var(--violet)" onclick="toast('Aucune demande envoyée pour le moment')">Voir les demandes envoyées</button>
  `;
}

// ---- Profil manager ----
function mgrProfile(){
  const u = STATE.user;
  const rows = [
    { icon:'user', label:'Informations personnelles', sub:'info' },
    { icon:'chartline', label:'Statistiques personnelles', sub:'stats' },
    { icon:'clock', label:'Historique récent', sub:'history-mgr' },
    { icon:'bell', label:'Notifications', sub:'notifications' },
    { icon:'shield', label:'Sécurité', sub:'security' },
    { icon:'settings', label:'Paramètres', sub:'settings' },
  ];
  return `
    <div class="flex between items-center mb24"><div class="h2">Profil</div><button class="bell" onclick="openSub('settings')">${icon('settings')}</button></div>
    <div class="flex items-center gap16 mb24" style="flex-wrap:wrap">
      ${avatarEl(u,96,true)}
      <div style="flex:1;min-width:180px">
        <div class="h1" style="font-size:30px">${u.name}</div>
        <div class="lead mt8">${u.roleLabel} · ${u.dept}</div>
        <div class="flex items-center gap8 mt8 lead"><span class="accent-gold">${icon('briefcase')}</span> ${u.email}</div>
      </div>
    </div>
    <div class="grid g3 mb24">
      ${[['cap','Formations supervisées','42'],['users','Employés suivis','128'],['calendar','Sessions organisées','36']].map(s=>`
        <div class="stat-card"><div class="sc-icon it-gold-soft">${icon(s[0])}</div><div class="sc-value mt12" style="font-size:26px">${s[2]}</div><div class="sc-label">${s[1]}</div></div>`).join('')}
    </div>
    <div class="card" style="padding:6px 16px">
      ${rows.map(r=>`<div class="list-row" onclick="openSub('${r.sub}')"><div class="lr-icon">${icon(r.icon)}</div><div class="lr-label">${r.label}</div><span class="chev">${icon('chevright')}</span></div>`).join('')}
    </div>
    <button class="btn btn-ghost mt24" style="background:var(--violet-soft)" onclick="logout()">${icon('logout')} Se déconnecter</button>
  `;
}
