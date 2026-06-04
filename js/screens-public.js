/* ============================================================
   AERYS — Écrans publics : Accueil, Découvrir, Connexion
   Rendus dans un "frame" centré (style mobile premium) sur desktop.
   ============================================================ */

const statusBar = ``;

function publicFrame(inner){
  return `<div class="public-stage"><div class="public-frame"><div class="screen-pad page-enter">${inner}</div></div></div>`;
}

// ---- Écran 1 : Page d'accueil (landing) ----
function screenLanding(){
  const spaces = [
    { icon:'user', tone:'it-violet', title:'Espace Employé', desc:'Accédez à vos formations et progressez à votre rythme.', role:'employe', gold:false },
    { icon:'briefcase', tone:'it-gold', title:'Espace Manager', desc:'Suivez votre équipe et pilotez le développement des compétences.', role:'manager', gold:true },
    { icon:'cap', tone:'it-violet-soft', title:'Espace Formateur', desc:'Créez, animez et gérez vos parcours de formation.', role:'formateur', gold:false },
  ];
  const cards = spaces.map(s=>`
    <button class="card tap flex items-center gap16 mb12" style="width:100%;text-align:left;padding:16px"
       onclick="go('login','${s.role}')">
      <div class="icon-tile ${s.tone}">${icon(s.icon)}</div>
      <div style="flex:1">
        <div class="h3" style="font-size:17px">${s.title}</div>
        <div class="lead" style="font-size:13.5px;margin-top:3px">${s.desc}</div>
      </div>
      <span style="color:${s.gold?'var(--gold)':'var(--violet)'}">${icon('chevright')}</span>
    </button>`).join('');

  return publicFrame(`
    ${brand(false)}
    <div class="hero-img mt24" style="height:200px">
      <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=75" alt="Hyatt Regency Alger Airport">
    </div>
    <div class="flex between" style="align-items:flex-start;margin-top:22px">
      <h1 class="h1" style="font-size:38px">Former aujourd\u2019hui,<br><span class="accent-gold">exceller demain.</span></h1>
    </div>
    <p class="lead mt16" style="font-size:15.5px">AERYS accompagne les employés, les managers et les formateurs dans le développement des compétences et l\u2019excellence au service de nos clients.</p>
    <div class="mt24">${cards}</div>
    <button class="btn btn-primary mt12" onclick="go('login')">${icon('user')} Se connecter</button>
    <button class="btn btn-ghost mt12" onclick="go('discover')">${icon('compass')} Découvrir la plateforme</button>
  `);
}

// ---- Écran 1.1 : Découvrir l'application ----
function screenDiscover(){
  const spaces = [
    { tone:'it-violet-soft', icolor:'var(--violet)', word:'Employé', wc:'var(--violet)',
      icon:'user', desc:'Apprendre de façon interactive grâce aux quiz, jeux, simulations, planning et récompenses.',
      chips:[['gamepad','Quiz & jeux'],['planning','Planning'],['star','Récompenses'],['user','Profil']], gold:false },
    { tone:'it-gold-soft', icolor:'var(--gold)', word:'Manager', wc:'var(--gold)',
      icon:'briefcase', desc:'Piloter la progression des équipes, suivre les indicateurs et analyser la performance.',
      chips:[['dashboard','Dashboard'],['users','Équipes'],['report','Rapports'],['user','Profil']], gold:true },
    { tone:'it-violet-soft', icolor:'var(--violet)', word:'Formateur', wc:'var(--violet)',
      icon:'cap', desc:'Créer des contenus, animer des sessions et suivre les apprenants.',
      chips:[['edit','Création'],['library','Bibliothèque'],['play','Sessions'],['trend','Suivi']], gold:false },
  ];
  const blocks = spaces.map(s=>`
    <div class="card mb16">
      <div class="flex gap16" style="align-items:flex-start">
        <div class="icon-tile ${s.tone}">${icon(s.icon)}</div>
        <div style="flex:1">
          <div class="h3">Espace <span style="color:${s.wc}">${s.word}</span></div>
          <div class="lead mt8" style="font-size:14px">${s.desc}</div>
        </div>
      </div>
      <div class="flex wrap gap8 mt16">
        ${s.chips.map(c=>`<span class="chip${s.gold?' gold':''}">${icon(c[0])}${c[1]}</span>`).join('')}
      </div>
    </div>`).join('');

  const why = [
    { icon:'gamepad', t:'Formation interactive', d:'Des contenus engageants pour apprendre autrement.' },
    { icon:'user', t:'Suivi personnalisé', d:'Des parcours adaptés à chaque profil et à vos objectifs.' },
    { icon:'users', t:'Collaboration', d:'Échangez, partagez et progressez ensemble au quotidien.' },
  ].map(w=>`<div class="card flat" style="padding:16px">
      <div class="icon-tile it-violet-soft" style="width:42px;height:42px;border-radius:12px">${icon(w.icon)}</div>
      <div class="h3 mt12" style="font-size:15px">${w.t}</div>
      <div class="lead mt8" style="font-size:13px">${w.d}</div>
    </div>`).join('');

  return publicFrame(`
    <div class="flex items-center between mb16">
      <button class="bell" onclick="go('landing')" style="width:40px;height:40px">${icon('arrowleft')}</button>
      ${brand(true)}
      <span style="width:40px"></span>
    </div>
    <h1 class="h1" style="text-align:center;font-size:34px">Découvrir <span class="accent">AERYS</span></h1>
    <div style="width:48px;height:4px;background:var(--gold);border-radius:99px;margin:12px auto 0"></div>
    <p class="lead" style="text-align:center;margin-top:14px">Une plateforme mobile de formation continue pensée pour trois profils.</p>
    <div class="mt24">${blocks}</div>
    <h3 class="section-title" style="text-align:center;margin:8px 0 16px">Pourquoi AERYS ?</h3>
    <div class="grid g3" style="gap:12px">${why}</div>
    <button class="btn btn-primary mt24" onclick="go('login')">${icon('lock')} Se connecter</button>
    <button class="btn btn-ghost mt12" onclick="go('landing')">${icon('grid')} Choisir mon espace</button>
  `);
}

// ---- Écran 2 : Connexion par rôle ----
let _loginRole = 'employe';
function screenLogin(preRole){
  if (preRole) _loginRole = preRole;
  const roles = [
    { id:'employe', icon:'user', tone:'it-violet-soft', title:'Employé', sub:'Accéder à mes formations' },
    { id:'manager', icon:'briefcase', tone:'it-gold-soft', title:'Manager', sub:'Suivre les équipes et les compétences' },
    { id:'formateur', icon:'cap', tone:'it-violet-soft', title:'Formateur externe', sub:'Gérer les contenus et les sessions' },
  ];
  const roleEls = roles.map(r=>`
    <div class="role-option${r.id===_loginRole?' selected':''}" data-role="${r.id}" onclick="selectLoginRole('${r.id}')">
      <div class="ro-icon ${r.tone}">${icon(r.icon)}</div>
      <div class="ro-body"><div class="ro-title" style="${r.id===_loginRole?'color:var(--violet)':''}">${r.title}</div><div class="ro-sub">${r.sub}</div></div>
      <div class="ro-check">${icon('check')}</div>
    </div>`).join('');

  return publicFrame(`
    <div class="flex items-center between mb16">
      <button class="bell" onclick="go('landing')" style="width:40px;height:40px">${icon('arrowleft')}</button>
      ${brand(true)}
      <span style="width:40px"></span>
    </div>
    <h1 class="h1" style="text-align:center;font-size:34px">Connexion <span class="accent">par rôle</span></h1>
    <div style="width:48px;height:4px;background:var(--gold);border-radius:99px;margin:12px auto 0"></div>
    <p class="lead" style="text-align:center;margin-top:14px">Accédez à votre espace selon votre profil.</p>
    <div class="hero-img mt24" style="height:150px">
      <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=75" alt="Lobby Hyatt">
    </div>
    <div class="mt24">
      <div class="field">
        <label>Email professionnel</label>
        <div class="input-wrap">${icon('mail','class="lead-icon"')}
          <input class="inp" id="loginEmail" type="email" placeholder="exemple@hyattalger.com" value="rania@hyattalger.com">
        </div>
      </div>
      <div class="field">
        <label>Mot de passe</label>
        <div class="input-wrap">${icon('lock','class="lead-icon"')}
          <input class="inp" id="loginPwd" type="password" placeholder="••••••••" value="aerys2026">
          <button class="trail-btn" onclick="togglePwd(this)">${icon('eyeoff')}</button>
        </div>
        <div style="text-align:right;margin-top:8px"><a class="accent" style="font-weight:700;font-size:14px;cursor:pointer" onclick="forgotPwd()">Mot de passe oublié ?</a></div>
      </div>
      <label style="font-weight:700;font-size:14.5px;display:block;margin-bottom:10px">Sélectionnez votre profil</label>
      ${roleEls}
      <button class="btn btn-primary mt16" onclick="doLogin()">${icon('lock')} Se connecter</button>
      <p class="lead" style="text-align:center;margin-top:16px;font-size:13.5px">Vous n\u2019avez pas de compte ? <a class="accent" style="font-weight:700;cursor:pointer" onclick="toast('Contactez l\\'administrateur RH')">Contacter l\u2019administrateur.</a></p>
      <div class="card flat mt16 flex items-center gap12" style="background:var(--violet-soft);border-color:var(--violet-light)">
        <div class="icon-tile it-violet" style="width:42px;height:42px;border-radius:12px">${icon('shield')}</div>
        <div><div style="font-weight:700">Plateforme sécurisée</div><div class="lead" style="font-size:13px">Vos données sont protégées et confidentielles.</div></div>
      </div>
    </div>
  `);
}

function selectLoginRole(r){ _loginRole=r; render(); }
function togglePwd(btn){
  const inp = btn.closest('.input-wrap').querySelector('input');
  if(inp.type==='password'){ inp.type='text'; btn.innerHTML=icon('eye'); }
  else { inp.type='password'; btn.innerHTML=icon('eyeoff'); }
}
function forgotPwd(){
  openModal(`<div class="flex between items-center mb16"><div class="h3">Mot de passe oublié</div>
    <button class="bell" style="width:36px;height:36px" onclick="closeModal()">${icon('plus','transform=\"rotate(45)\"')}</button></div>
    <p class="lead">Saisissez votre email professionnel, vous recevrez un lien de réinitialisation.</p>
    <div class="field mt16"><div class="input-wrap">${icon('mail','class="lead-icon"')}<input class="inp" placeholder="exemple@hyattalger.com"></div></div>
    <button class="btn btn-primary" onclick="closeModal();toast('Lien envoyé par email')">${icon('send')} Envoyer le lien</button>`);
}
function doLogin(){
  STATE.role = _loginRole;
  STATE.user = DATA.users[_loginRole];
  STATE.screen = 'app';
  STATE.tab = defaultTab(_loginRole);
  render();
  toast(`Bienvenue ${STATE.user.name} !`);
}
function defaultTab(role){
  return role==='manager' ? 'mgr-dashboard' : role==='formateur' ? 'form-home' : 'emp-home';
}
