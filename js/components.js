/* ============================================================
   AERYS — Composants & helpers UI partagés
   ============================================================ */

// avatar markup: photo if available else gradient initials
function avatarEl(user, size=44, ring=false){
  const cls = `avatar${ring?' ring-v':''}`;
  if (user && user.avatar) {
    return `<img class="${cls}" src="${user.avatar}" style="width:${size}px;height:${size}px" alt="">`;
  }
  const ini = initials((user&&user.name)||'AE');
  return `<div class="${cls}" style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;
     background:linear-gradient(135deg,#7C4DEF,#5B21D6);color:#fff;font-family:var(--font-display);font-weight:800;font-size:${Math.round(size*0.36)}px">${ini}</div>`;
}

function bell(count=3){
  return `<div class="bell" onclick="openSub('notifications')" style="cursor:pointer">${icon('bell')}${count?`<span class="dot">${count}</span>`:''}</div>`;
}

// header used on mobile-style screens (greeting + bell + avatar)
function mobileGreeting(user, sub){
  return `<div class="flex between items-center mb16">
    <div>
      <div class="h2">Bonjour ${user.name} 👋</div>
      <div class="lead mt8">${sub||''}</div>
    </div>
    <div class="flex items-center gap12">${bell()}<div onclick="setProfileTab()" style="cursor:pointer">${avatarEl(user,52,true)}</div></div>
  </div>`;
}

// stat card
function statCard(s){
  const ring = s.ring ? `<div class="ring" style="background:conic-gradient(${s.ringColor||'#5B21D6'} ${s.ring*3.6}deg, var(--grey-200) 0)">
      <div class="ring-mid">${s.value}</div></div>` : '';
  if (s.ring) {
    return `<div class="stat-card"><div class="flex items-center gap12">
       ${ring}<div><div class="sc-label">${s.label}</div></div></div></div>`;
  }
  return `<div class="stat-card">
     <div class="sc-top">
       <div class="sc-icon ${s.tone}">${icon(s.icon)}</div>
       ${s.delta?`<span class="badge-pill ${s.up===false?'badge-red':'badge-green'}">${s.up===false?'▲':'▲'} ${s.delta}</span>`:''}
     </div>
     <div class="sc-label mt12">${s.label}</div>
     <div class="sc-value">${s.value}</div>
     ${s.unit?`<div class="sc-unit">${s.unit}</div>`:''}
     ${s.note?`<div class="sc-unit accent">${s.note}</div>`:''}
   </div>`;
}

function progressBar(pct, tone=''){ return `<div class="progress ${tone}"><span style="width:${pct}%"></span></div>`; }

// content-type -> icon + tone
const TYPE_ICON = {
  'Quiz':'quiz','Jeu':'gamepad','Devinette':'riddle','Simulation':'simulation',
  'Micro-learning':'microlearning','Vidéo':'video','Classe virtuelle':'classvirtual',
};

// toast
let _toastTimer;
function toast(msg){
  let wrap = document.querySelector('.toast-wrap');
  if(!wrap){ wrap=document.createElement('div'); wrap.className='toast-wrap'; document.body.appendChild(wrap); }
  const t=document.createElement('div'); t.className='toast'; t.innerHTML=`${icon('checkcircle')}<span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='.3s'; setTimeout(()=>t.remove(),300); }, 2400);
}

// modal
function openModal(html){
  closeModal();
  const back=document.createElement('div'); back.className='modal-back';
  back.innerHTML=`<div class="modal" onclick="event.stopPropagation()">${html}</div>`;
  back.addEventListener('click',closeModal);
  document.body.appendChild(back);
}
function closeModal(){ const m=document.querySelector('.modal-back'); if(m) m.remove(); }

// simple SVG line chart for reports
function lineChart(points, w=560, h=210, color='#5B21D6'){
  const max = Math.max(...points.map(p=>p.v)) * 1.1;
  const pad = 30; const cw = w-pad*2; const ch = h-pad*2;
  const step = cw/(points.length-1);
  const xy = points.map((p,i)=>[pad+i*step, pad+ch-(p.v/max)*ch]);
  const path = xy.map((c,i)=>(i?'L':'M')+c[0].toFixed(1)+' '+c[1].toFixed(1)).join(' ');
  const area = path+` L ${pad+cw} ${pad+ch} L ${pad} ${pad+ch} Z`;
  const grid = [0,.5,1].map(g=>`<line x1="${pad}" y1="${pad+ch*g}" x2="${pad+cw}" y2="${pad+ch*g}" stroke="#E6E6EF" stroke-width="1"/>`).join('');
  const dots = xy.map((c,i)=>`<circle cx="${c[0]}" cy="${c[1]}" r="4" fill="#fff" stroke="${color}" stroke-width="2.5"/><text x="${c[0]}" y="${c[1]-12}" text-anchor="middle" font-size="12" font-weight="700" fill="#0B0F3A">${points[i].v}</text>`).join('');
  const labels = points.map((p,i)=>`<text x="${pad+i*step}" y="${h-6}" text-anchor="middle" font-size="11" fill="#6B7185">${p.m}</text>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto">
    <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${color}" stop-opacity=".18"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
    ${grid}<path d="${area}" fill="url(#lg)"/><path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${dots}${labels}</svg>`;
}

// donut chart for formation mix
function donut(slices, size=160){
  const total = slices.reduce((a,s)=>a+s.v,0);
  let acc=0; const r=size/2, ir=r*0.58; const cx=r, cy=r;
  const arcs = slices.map(s=>{
    const a0=acc/total*2*Math.PI - Math.PI/2; acc+=s.v; const a1=acc/total*2*Math.PI - Math.PI/2;
    const large = (s.v/total)>0.5?1:0;
    const x0=cx+r*Math.cos(a0), y0=cy+r*Math.sin(a0), x1=cx+r*Math.cos(a1), y1=cy+r*Math.sin(a1);
    const xi0=cx+ir*Math.cos(a1), yi0=cy+ir*Math.sin(a1), xi1=cx+ir*Math.cos(a0), yi1=cy+ir*Math.sin(a0);
    return `<path d="M${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1} L${xi0} ${yi0} A${ir} ${ir} 0 ${large} 0 ${xi1} ${yi1} Z" fill="${s.c}"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${size} ${size}" style="width:${size}px;height:${size}px">${arcs}</svg>`;
}

// donut ring for dept progression
function progRing(pct, color, size=72){
  return `<div class="ring" style="width:${size}px;height:${size}px;background:conic-gradient(${color} ${pct*3.6}deg, var(--grey-200) 0)">
    <div class="ring-mid" style="font-size:15px">${pct}%</div></div>`;
}
