/* ============================================================
   AERYS — Router / Controller
   Single-page vanilla JS app. No framework, no build, no DB.
   ============================================================ */

// ---- Global application state ----
const STATE = {
  screen: 'landing',   // 'landing' | 'discover' | 'login' | 'app'
  role: null,          // 'employe' | 'manager' | 'formateur'
  user: null,
  tab: null,           // active in-app tab id
  activeActivity: null,
  sub: null,           // active sub-page key (profile detail pages, cart, etc.)
};

// ---- Tab registry per role ----
const TABS_BY_ROLE = {
  employe: EMP_TABS,
  manager: MGR_TABS,
  formateur: FORM_TABS,
};

// ---- Map every tab/sub-screen id to its render function ----
const SCREEN_MAP = {
  // Employé
  'emp-home': empHome,
  'emp-activities': empActivities,
  'emp-activity-detail': empActivityDetail,
  'emp-planning': empPlanning,
  'emp-rewards': empRewards,
  'emp-profile': empProfile,
  // Manager
  'mgr-dashboard': mgrDashboard,
  'mgr-teams': mgrTeams,
  'mgr-reports': mgrReports,
  'mgr-planning': mgrPlanning,
  'mgr-assign': mgrAssign,
  'mgr-trainers': mgrTrainers,
  'mgr-request': mgrRequest,
  'mgr-profile': mgrProfile,
  'mgr-dept-detail': mgrDeptDetail,
  'mgr-emp-detail': mgrEmpDetail,
  'mgr-send-reminder': mgrSendReminder,
  'mgr-late': mgrLateFormations,
  // Formateur
  'form-home': formHome,
  'form-create': formCreate,
  'form-library': formLibrary,
  'form-sessions': formSessions,
  'form-tracking': formTracking,
  'form-profile': formProfile,
  'form-edit': formEdit,
  'form-stats': formStats,
  'form-send-reminder': formSendReminder,
};

// Sub-screens not present in the bottom tab bar -> highlight their parent tab
const TAB_ALIAS = {
  'emp-activity-detail': 'emp-activities',
  'mgr-assign': 'mgr-teams',
  'mgr-trainers': 'mgr-dashboard',
  'mgr-request': 'mgr-dashboard',
  'mgr-dept-detail': 'mgr-teams',
  'mgr-emp-detail': 'mgr-teams',
  'mgr-send-reminder': 'mgr-teams',
  'mgr-late': 'mgr-teams',
  'form-sessions': 'form-tracking',
  'form-edit': 'form-library',
  'form-stats': 'form-library',
  'form-send-reminder': 'form-home',
};

// ---- Navigation API (used by every screen) ----
function go(screen, arg) {
  STATE.screen = screen;
  if (screen === 'login') _loginRole = arg || _loginRole || 'employe';
  render();
  window.scrollTo(0, 0);
}

function setTab(tabId) {
  STATE.tab = tabId;
  STATE.sub = null;
  render();
  // scroll the content region back to top
  const main = document.querySelector('.main');
  if (main) main.scrollTop = 0;
  window.scrollTo(0, 0);
}

// ---- Sub-pages (profile detail pages, cart, etc.) ----
function openSub(key) {
  STATE.sub = key;
  render();
  const main = document.querySelector('.main');
  if (main) main.scrollTop = 0;
  window.scrollTo(0, 0);
}
function closeSub() {
  STATE.sub = null;
  render();
  window.scrollTo(0, 0);
}


// ---- Navigate to profile for current role ----
function setProfileTab() {
  const profileTab = { employe: 'emp-profile', manager: 'mgr-profile', formateur: 'form-profile' }[STATE.role];
  if (profileTab) setTab(profileTab);
}
function logout() {
  STATE.screen = 'landing';
  STATE.role = null;
  STATE.user = null;
  STATE.tab = null;
  STATE.activeActivity = null;
  STATE.sub = null;
  render();
  window.scrollTo(0, 0);
}

// ---- Sidebar (desktop) ----
function sidebar() {
  const u = STATE.user;
  const tabs = TABS_BY_ROLE[STATE.role] || [];
  const active = TAB_ALIAS[STATE.tab] || STATE.tab;
  const gold = STATE.role === 'manager' ? ' gold' : '';
  const roleName = { employe: 'Espace Employé', manager: 'Espace Manager', formateur: 'Espace Formateur' }[STATE.role] || '';

  return `
    <aside class="sidebar${gold}">
      <div class="side-brand">${brand(false, 'Hyatt Regency Alger')}</div>
      <div class="side-nav">
        ${tabs.map(t => `
          <div class="nav-item${active === t.id ? ' active' : ''}" onclick="setTab('${t.id}')">
            ${icon(t.icon)}<span>${t.label}</span>
          </div>`).join('')}
      </div>
      <div class="side-foot">
        <div class="side-user mb12">
          ${avatarEl(u, 40)}
          <div style="min-width:0">
            <div class="su-name">${u.name}</div>
            <div class="su-role">${roleName}</div>
          </div>
        </div>
        <div class="nav-item" onclick="logout()">${icon('logout')}<span>Déconnexion</span></div>
      </div>
    </aside>`;
}

// ---- Mobile bottom tab bar ----
function tabbar() {
  const tabs = TABS_BY_ROLE[STATE.role] || [];
  const active = TAB_ALIAS[STATE.tab] || STATE.tab;
  const gold = STATE.role === 'manager' ? ' gold' : '';
  return `
    <nav class="tabbar${gold}">
      <div class="tabs">
        ${tabs.map(t => `
          <div class="tab${active === t.id ? ' active' : ''}" onclick="setTab('${t.id}')">
            ${icon(t.icon)}<span>${t.label}</span>
          </div>`).join('')}
      </div>
    </nav>`;
}

// ---- App shell (logged-in) ----
function appShell() {
  const fn = SCREEN_MAP[STATE.tab] || SCREEN_MAP[defaultTab(STATE.role)];
  const content = STATE.sub ? subPage(STATE.sub) : (fn ? fn() : '<div class="card">Écran introuvable.</div>');
  return `
    <div class="app-layout">
      ${sidebar()}
      <main class="main">
        <div class="main-inner">${content}</div>
      </main>
      ${tabbar()}
    </div>`;
}

// ---- Master render ----
function render() {
  const root = document.getElementById('app');
  let html = '';
  try {
    switch (STATE.screen) {
      case 'landing':  html = screenLanding();  break;
      case 'discover': html = screenDiscover(); break;
      case 'login':    html = screenLogin(_loginRole); break;
      case 'app':      html = appShell();       break;
      default:         html = screenLanding();
    }
  } catch(e) {
    console.error('Render error:', e);
    // Fallback: try to render dashboard
    try {
      STATE.tab = STATE.role === 'manager' ? 'mgr-dashboard' : STATE.role === 'formateur' ? 'form-home' : 'emp-home';
      html = appShell();
    } catch(e2) {
      html = `<div style="padding:40px;text-align:center"><div style="font-size:18px;font-weight:700;color:#5B21D6">Erreur d'affichage</div><div style="margin-top:8px;color:#666">${e.message}</div><button onclick="location.reload()" style="margin-top:20px;padding:12px 24px;background:#5B21D6;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer">Recharger</button></div>`;
    }
  }
  root.innerHTML = html;
}

// ---- Boot ----
document.addEventListener('DOMContentLoaded', render);
