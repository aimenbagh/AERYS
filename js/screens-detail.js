/* ============================================================
   AERYS — Sous-pages (détail) accessibles depuis les profils
   Rendus via STATE.sub + subPage(key). Bouton retour -> profil.
   ============================================================ */

function subHeader(title, sub){
  const backTab = STATE.role === 'manager' ? 'mgr-profile'
                : STATE.role === 'formateur' ? 'form-profile'
                : 'emp-profile';
  return `
    <div class="flex items-center gap16 mb24">
      <button class="bell" onclick="closeSub()" style="width:42px;height:42px">${icon('arrowleft')}</button>
      <div><div class="h2">${title}</div>${sub?`<div class="lead mt8">${sub}</div>`:''}</div>
    </div>`;
}

function infoRow(label, value){
  return `<div class="flex between items-center" style="padding:14px 0;border-bottom:1px solid var(--grey-100)">
    <span class="lead" style="font-weight:600">${label}</span><b style="text-align:right">${value}</b></div>`;
}

// ---- Informations personnelles ----
function subInfo(){
  const u = STATE.user;
  const role = { employe:'Employé', manager:'Manager', formateur:'Formateur externe' }[STATE.role];
  return `
    ${subHeader('Informations personnelles', 'Vos coordonnées et informations de compte.')}
    <div class="card flex items-center gap16 mb24" style="flex-wrap:wrap">
      ${avatarEl(u,84,true)}
      <div style="flex:1;min-width:180px">
        <div class="h3" style="font-size:22px">${u.name}</div>
        <div class="lead mt8">${u.roleLabel}</div>
      </div>
      <button class="btn btn-ghost btn-sm" style="flex:none" onclick="toast('Modifier la photo')">${icon('edit')} Modifier la photo</button>
    </div>
    <div class="card">
      <h3 class="section-title mb8">Détails du compte</h3>
      ${infoRow('Nom complet', u.name)}
      ${infoRow('Rôle', role)}
      ${infoRow('Poste', u.roleLabel)}
      ${infoRow('Département', u.dept || '—')}
      ${infoRow('E-mail', u.email)}
      ${u.member?infoRow('Membre depuis', u.member):''}
      <div class="flex gap12 mt24">
        <button class="btn btn-primary" style="width:auto" onclick="toast('Modifications enregistrées')">${icon('check')} Enregistrer</button>
        <button class="btn btn-ghost" style="width:auto" onclick="closeSub()">Annuler</button>
      </div>
    </div>`;
}

// ---- Mes badges ----
function subBadges(){
  const got = DATA.badges.filter(b=>b.got).length;
  const grid = DATA.badges.map(b=>`
    <div class="card flat" style="text-align:center;padding:22px 14px;opacity:${b.got?1:.5}">
      <div class="icon-tile ${b.got?'it-gold':'it-violet-soft'}" style="margin:0 auto 12px;width:54px;height:54px">${icon(b.icon)}</div>
      <div style="font-weight:700;font-size:14px">${b.name}</div>
      <div class="lead" style="font-size:12px;margin-top:4px">${b.got?'✓ Obtenu':'À débloquer'}</div>
    </div>`).join('');
  return `
    ${subHeader('Mes badges', `${got} badges obtenus sur ${DATA.badges.length}.`)}
    <div class="grid g4" style="gap:14px">${grid}</div>
    <div class="banner-grad mt24 flex items-center gap16">
      <div class="icon-tile" style="background:rgba(255,255,255,.18);color:#fff;flex:none">${icon('sparkles')}</div>
      <div style="flex:1;font-weight:600">Continuez vos activités pour débloquer les badges Service 5★ et Expert VIP !</div>
    </div>`;
}

// ---- Certificats ----
function subCertificates(){
  const rows = DATA.empCertificates.map(c=>`
    <div class="card flat flex items-center gap16 mb12">
      <div class="icon-tile it-violet-soft" style="flex:none">${icon('report')}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:14.5px">${c.name}</div>
        <div class="lead" style="font-size:13px;margin-top:2px">Obtenu le ${c.date} · Score ${c.score}</div>
      </div>
      <span class="badge-pill badge-green" style="flex:none">Validé</span>
      <button class="btn btn-ghost btn-sm" style="flex:none" onclick="toast('Téléchargement du certificat')">${icon('download')}</button>
    </div>`).join('');
  return `
    ${subHeader('Certificats', `${DATA.empCertificates.length} certificats obtenus.`)}
    ${rows}`;
}

// ---- Compétences ----
function subSkills(){
  const bars = DATA.empSkills.map(s=>`
    <div class="flex items-center gap12 mb16">
      <div style="flex:1;font-weight:600;font-size:14px">${s.n}</div>
      <div style="width:160px">${progressBar(s.v, s.v>=80?'green':s.v>=65?'':'orange')}</div>
      <b style="width:44px;text-align:right">${s.v}%</b>
    </div>`).join('');
  return `
    ${subHeader('Compétences', 'Votre progression par domaine de compétence.')}
    <div class="card">${bars}</div>`;
}

// ---- Historique des activités ----
function subHistory(list, title){
  const rows = (list||DATA.empHistory).map(h=>`
    <div class="flex items-center gap16" style="padding:14px 0;border-bottom:1px solid var(--grey-100)">
      <div class="icon-tile it-violet-soft" style="flex:none">${icon(h.icon)}</div>
      <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px">${h.t}</div>
        <div class="lead" style="font-size:13px;margin-top:2px">${h.d}</div></div>
      <span class="lead" style="font-size:12.5px;flex:none">${h.when}</span>
    </div>`).join('');
  return `
    ${subHeader(title||'Historique des activités', 'Vos dernières actions sur la plateforme.')}
    <div class="card">${rows}</div>`;
}

// ---- Notifications ----
function subNotifications(){
  const rows = DATA.notifications.map(n=>`
    <div class="flex items-center gap16" style="padding:14px 0;border-bottom:1px solid var(--grey-100)">
      <div class="icon-tile ${n.tone}" style="flex:none">${icon(n.icon)}</div>
      <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px">${n.t}</div>
        <div class="lead" style="font-size:13px;margin-top:2px">${n.d}</div></div>
      <span class="lead" style="font-size:12.5px;flex:none">${n.when}</span>
    </div>`).join('');
  return `
    ${subHeader('Notifications', 'Vos alertes et rappels récents.')}
    <div class="flex between items-center mb16">
      <span class="badge-pill badge-violet">${DATA.notifications.length} notifications</span>
      <a class="accent" style="font-weight:700;cursor:pointer" onclick="toast('Tout marqué comme lu')">Tout marquer comme lu</a>
    </div>
    <div class="card">${rows}</div>`;
}

// ---- Sécurité ----
function subSecurity(){
  return `
    ${subHeader('Sécurité', 'Gérez votre mot de passe et la sécurité du compte.')}
    <div class="card mb16">
      <h3 class="section-title mb16">Changer le mot de passe</h3>
      <div class="field"><label>Mot de passe actuel</label><div class="input-wrap">${icon('lock','class="lead-icon"')}<input class="inp" type="password" value="aerys2026"></div></div>
      <div class="field"><label>Nouveau mot de passe</label><div class="input-wrap">${icon('lock','class="lead-icon"')}<input class="inp" type="password" placeholder="••••••••"></div></div>
      <div class="field" style="margin-bottom:0"><label>Confirmer le nouveau mot de passe</label><div class="input-wrap">${icon('lock','class="lead-icon"')}<input class="inp" type="password" placeholder="••••••••"></div></div>
      <button class="btn btn-primary mt16" style="width:auto" onclick="toast('Mot de passe mis à jour')">${icon('check')} Mettre à jour</button>
    </div>
    <div class="card">
      <h3 class="section-title mb8">Options de sécurité</h3>
      <div class="flex between items-center" style="padding:14px 0;border-bottom:1px solid var(--grey-100)">
        <div><div style="font-weight:700;font-size:14px">Authentification à deux facteurs</div><div class="lead" style="font-size:13px">Renforce la protection de votre compte.</div></div>
        <button class="btn btn-ghost btn-sm" onclick="toast('2FA activée')">Activer</button>
      </div>
      <div class="flex between items-center" style="padding:14px 0">
        <div><div style="font-weight:700;font-size:14px">Sessions actives</div><div class="lead" style="font-size:13px">1 appareil connecté.</div></div>
        <button class="btn btn-ghost btn-sm" onclick="toast('Déconnexion des autres appareils')">Gérer</button>
      </div>
    </div>`;
}

// ---- Statistiques personnelles (manager) ----
function subStats(){
  const kpis = [
    { icon:'users', tone:'it-violet-soft', label:'Employés suivis', value:'128' },
    { icon:'cap', tone:'it-gold-soft', label:'Formations supervisées', value:'42' },
    { icon:'calendar', tone:'it-blue', label:'Sessions organisées', value:'36' },
    { icon:'star', tone:'it-green', label:'Score moyen équipes', value:'83%' },
  ].map(s=>`<div class="stat-card"><div class="sc-icon ${s.tone}">${icon(s.icon)}</div>
    <div class="sc-value mt12" style="font-size:26px">${s.value}</div><div class="sc-label">${s.label}</div></div>`).join('');
  return `
    ${subHeader('Statistiques personnelles', 'Votre activité de management en un coup d’œil.')}
    <div class="grid g4 mb24">${kpis}</div>
    <div class="card"><h3 class="section-title mb16">Évolution des formations terminées</h3>${lineChart(DATA.reportTrend)}</div>`;
}

// ---- Domaines d'expertise (formateur) ----
function subExpertise(){
  const rows = DATA.formExpertise.map(e=>`
    <div class="flex between items-center" style="padding:14px 0;border-bottom:1px solid var(--grey-100)">
      <div class="flex items-center gap12"><span class="accent">${icon('cap')}</span><span style="font-weight:600;font-size:14.5px">${e.n}</span></div>
      <span class="badge-pill ${e.lvl==='Expert'?'badge-violet':'badge-green'}">${e.lvl}</span>
    </div>`).join('');
  return `
    ${subHeader('Domaines d’expertise', 'Vos spécialités de formation.')}
    <div class="card">${rows}</div>`;
}

// ---- Évaluations reçues (formateur) ----
function subEvaluations(){
  const stars = n => Array.from({length:5},(_,i)=>`<span style="color:${i<n?'var(--gold)':'var(--grey-300)'};width:16px;height:16px;display:inline-flex">${icon('starfill')}</span>`).join('');
  const rows = DATA.formEvaluations.map(e=>`
    <div class="card flat mb12">
      <div class="flex between items-center mb8">
        <div class="flex items-center gap12">${avatarEl({name:e.name},38)}<b>${e.name}</b></div>
        <div class="flex items-center gap4">${stars(e.stars)}</div>
      </div>
      <div class="lead" style="font-size:13.5px">« ${e.txt} »</div>
      <div class="lead" style="font-size:12px;margin-top:6px">${e.when}</div>
    </div>`).join('');
  return `
    ${subHeader('Évaluations reçues', 'Note moyenne 4,8 / 5 sur 156 apprenants.')}
    <div class="card flat flex items-center gap16 mb24" style="background:var(--violet-soft);border-color:var(--violet-light)">
      <div style="font-family:var(--font-display);font-weight:800;font-size:40px;color:var(--violet)">4,8</div>
      <div><div class="flex items-center gap4">${stars(5)}</div><div class="lead" style="font-size:13px;margin-top:4px">Basé sur 156 évaluations</div></div>
    </div>
    ${rows}`;
}

// ---- Paramètres ----
function subSettings(){
  const toggle = (label, desc, on)=>`
    <div class="flex between items-center" style="padding:14px 0;border-bottom:1px solid var(--grey-100)">
      <div style="flex:1"><div style="font-weight:700;font-size:14px">${label}</div><div class="lead" style="font-size:13px">${desc}</div></div>
      <button class="btn btn-ghost btn-sm" onclick="toast('${label} : modifié')">${on?'Activé':'Désactivé'}</button>
    </div>`;
  return `
    ${subHeader('Paramètres', 'Personnalisez votre expérience AERYS.')}
    <div class="card mb16">
      <h3 class="section-title mb8">Préférences</h3>
      ${toggle('Notifications push','Recevoir les alertes sur l’appareil.',true)}
      ${toggle('Notifications e-mail','Recevoir un résumé hebdomadaire.',true)}
      ${toggle('Mode sombre','Thème sombre de l’interface.',false)}
      ${toggle('Sons & vibrations','Retour sonore lors des activités.',true)}
    </div>
    <div class="card">
      <h3 class="section-title mb8">Langue</h3>
      <div class="field" style="margin-bottom:0"><label>Langue de l’interface</label>
        <select class="inp"><option>Français</option><option>English</option><option>العربية</option></select></div>
    </div>`;
}

// ---- Aide & Support ----
function subHelp(){
  const faqs = [
    ['Comment gagner des points ?','Complétez des quiz, jeux, simulations et classes virtuelles pour cumuler des points.'],
    ['Comment échanger mes points ?','Rendez-vous dans la boutique Récompenses et choisissez une récompense disponible.'],
    ['Comment voir mes certificats ?','Vos certificats sont disponibles dans votre profil, section « Certificats ».'],
  ].map(f=>`<div class="card flat mb12"><div style="font-weight:700;font-size:14px">${f[0]}</div><div class="lead" style="font-size:13.5px;margin-top:6px">${f[1]}</div></div>`).join('');
  return `
    ${subHeader('Aide & Support', 'Trouvez de l’aide ou contactez notre équipe.')}
    <div class="grid g2 mb24" style="gap:14px">
      <button class="card tap" style="text-align:left;padding:18px" onclick="toast('Ouverture du chat support')">
        <div class="icon-tile it-violet-soft mb12">${icon('mail')}</div>
        <div style="font-weight:700">Contacter le support</div><div class="lead" style="font-size:13px;margin-top:4px">Réponse sous 24 h.</div></button>
      <button class="card tap" style="text-align:left;padding:18px" onclick="toast('Ouverture du guide')">
        <div class="icon-tile it-green mb12">${icon('book')}</div>
        <div style="font-weight:700">Guide d’utilisation</div><div class="lead" style="font-size:13px;margin-top:4px">Tout savoir sur AERYS.</div></button>
    </div>
    <h3 class="section-title mb16">Questions fréquentes</h3>
    ${faqs}`;
}

// ---- Panier (boutique) ----
function subCart(){
  const items = DATA.shop.slice(0,2);
  const total = items.reduce((s,i)=>s+i.pts,0);
  const rows = items.map(i=>`
    <div class="flex items-center gap16" style="padding:14px 0;border-bottom:1px solid var(--grey-100)">
      <img src="${i.img}" alt="" style="width:60px;height:60px;border-radius:12px;object-fit:cover;flex:none">
      <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14.5px">${i.name}</div>
        <div class="accent" style="font-weight:800;margin-top:4px">${i.pts} pts</div></div>
      <button class="bell" style="width:36px;height:36px;flex:none" onclick="toast('Retiré du panier')">${icon('trash')}</button>
    </div>`).join('');
  return `
    ${subHeader('Mon panier', `${items.length} articles · ${STATE.user.points} pts disponibles.`)}
    <div class="card mb16">${rows}
      <div class="flex between items-center mt16"><b style="font-size:16px">Total</b>
        <b class="accent" style="font-family:var(--font-display);font-size:20px">${total} pts</b></div>
    </div>
    <button class="btn btn-primary btn-block" onclick="STATE.user.points-=${total};closeSub();toast('Commande validée · validée par RH')">${icon('check')} Valider l’échange (${total} pts)</button>
    <button class="btn btn-ghost btn-block mt12" onclick="setTab('emp-rewards')">Continuer mes achats</button>`;
}

// ---- Routeur des sous-pages ----
const SUB_MAP = {
  'info': subInfo,
  'badges': subBadges,
  'certificates': subCertificates,
  'skills': subSkills,
  'history': () => subHistory(DATA.empHistory, 'Historique des activités'),
  'history-mgr': () => subHistory(DATA.empHistory, 'Historique récent'),
  'created-history': () => subHistory(DATA.formCreatedHistory, 'Historique des formations créées'),
  'notifications': subNotifications,
  'security': subSecurity,
  'stats': subStats,
  'expertise': subExpertise,
  'evaluations': subEvaluations,
  'settings': subSettings,
  'help': subHelp,
  'cart': subCart,
};

function subPage(key){
  const fn = SUB_MAP[key];
  return fn ? fn() : subHeader('Page', 'Contenu indisponible.');
}
