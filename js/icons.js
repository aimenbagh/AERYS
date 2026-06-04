/* ============================================================
   AERYS — Icônes fixes et cohérentes (SVG inline, stroke 1.9)
   Une seule définition par concept => même icône partout.
   ============================================================ */
const ICONS = (() => {
  const w = (p, extra='') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
  return {
    // navigation fixes
    home:        w('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>'),
    activities:  w('<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M8 3v3M16 3v3"/><circle cx="8.5" cy="12.5" r="1.3" fill="currentColor" stroke="none"/><path d="M13 11h5M13 14h3"/>'),
    gamepad:     w('<rect x="2.5" y="7" width="19" height="10" rx="4"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="16" cy="11.5" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="13.5" r="1" fill="currentColor" stroke="none"/>'),
    planning:    w('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9h18M8 3v4M16 3v4"/><path d="m8.5 14.5 2 2 4-4"/>'),
    reward:      w('<path d="M8 21h8M12 17v4"/><path d="M6 4h12v4a6 6 0 0 1-12 0Z"/><path d="M6 5H4a2 2 0 0 0 0 4h2M18 5h2a2 2 0 0 1 0 4h-2"/>'),
    trophy:      w('<path d="M8 21h8M12 17v4"/><path d="M6 4h12v4a6 6 0 0 1-12 0Z"/><path d="M6 5H4a2 2 0 0 0 0 4h2M18 5h2a2 2 0 0 1 0 4h-2"/><path d="M12 9.5l.6 1.2 1.4.2-1 1 .3 1.4-1.3-.7-1.3.7.3-1.4-1-1 1.4-.2Z" fill="currentColor" stroke="none"/>'),
    user:        w('<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>'),
    users:       w('<circle cx="9" cy="8" r="3.4"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.2a3.4 3.4 0 0 1 0 6.6M18 20a6 6 0 0 0-3-5.2"/>'),
    dashboard:   w('<path d="M4 13v7M9 9v11M14 5v15M19 11v9"/>'),
    report:      w('<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M9 8h6M9 12h6M9 16h4"/>'),
    chartline:   w('<path d="M4 4v16h16"/><path d="m7 14 3-3 3 2 4-5"/>'),
    // formateur
    create:      w('<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'),
    library:     w('<path d="M5 4h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H5Z"/><path d="M19 4h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6Z"/>'),
    play:        w('<circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3Z" fill="currentColor" stroke="none"/>'),
    trend:       w('<path d="M4 17 9 12l3 3 7-8"/><path d="M15 7h5v5"/>'),
    // content types
    quiz:        w('<rect x="4" y="3" width="16" height="18" rx="3"/><path d="m8 8.5 1.2 1.2L11.5 7M8 14.5l1.2 1.2L11.5 13M14 8h3M14 14h3"/>'),
    riddle:      w('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7"/><circle cx="12" cy="16.5" r=".6" fill="currentColor" stroke="none"/>'),
    simulation:  w('<circle cx="9" cy="8" r="3"/><path d="M3 19a6 6 0 0 1 11 0"/><path d="M16 4a3 3 0 0 1 0 6M19 19a6 6 0 0 0-2.5-4.9"/>'),
    video:       w('<rect x="3" y="6" width="13" height="12" rx="3"/><path d="m16 10 5-3v10l-5-3Z"/>'),
    microlearning: w('<path d="M3 6.5 12 3l9 3.5L12 10 3 6.5Z"/><path d="M7 8.5V13c0 1.5 2.2 3 5 3s5-1.5 5-3V8.5M21 6.5V12"/>'),
    classvirtual: w('<rect x="3" y="4" width="18" height="12" rx="3"/><path d="M8 20h8M12 16v4"/><circle cx="12" cy="9.5" r="2"/><path d="M8.5 13a3.5 3.5 0 0 1 7 0"/>'),
    // ui
    search:      w('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    bell:        w('<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/>'),
    mail:        w('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>'),
    lock:        w('<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    eye:         w('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>'),
    eyeoff:      w('<path d="M3 3l18 18M10.6 6.1A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-3.3 3.9M6.3 8.1A16 16 0 0 0 2.5 12S6 18 12 18a9 9 0 0 0 3-.5"/><path d="M9.5 9.5a3 3 0 0 0 4.2 4.2"/>'),
    check:       w('<path d="m5 12 4.5 4.5L19 7"/>'),
    checkcircle: w('<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.3 2.3L16 9.5"/>'),
    chevright:   w('<path d="m9 6 6 6-6 6"/>'),
    chevleft:    w('<path d="m15 6-6 6 6 6"/>'),
    chevdown:    w('<path d="m6 9 6 6 6-6"/>'),
    arrowleft:   w('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    arrowright:  w('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    settings:    w('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'),
    logout:      w('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 12H3M6 8l-4 4 4 4"/>'),
    briefcase:   w('<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7M3 12h18"/>'),
    cap:         w('<path d="M3 8.5 12 5l9 3.5L12 12 3 8.5Z"/><path d="M7 10.5V14c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-3.5M21 8.5V13"/>'),
    compass:     w('<circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4Z" fill="currentColor" stroke="none"/>'),
    grid:        w('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'),
    plane:       w('<path d="M10 13 3 11l2-2 5 1 4-5a2 2 0 0 1 3 3l-5 4 1 5-2 2-2-7-3 3v3l-2-2v-3l3-3Z"/>'),
    giftcard:    w('<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M3 10h18M7 14h4"/>'),
    bag:         w('<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>'),
    gift:        w('<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M4 12h16M12 9v11"/><path d="M12 9C9 9 8 4 12 4s3 5 0 5ZM12 9c3 0 4-5 0-5"/>'),
    star:        w('<path d="m12 4 2.3 4.7 5.2.8-3.8 3.6.9 5.1L12 16l-4.6 2.4.9-5.1L4.5 9.5l5.2-.8L12 4Z"/>'),
    starfill:    w('<path d="m12 4 2.3 4.7 5.2.8-3.8 3.6.9 5.1L12 16l-4.6 2.4.9-5.1L4.5 9.5l5.2-.8L12 4Z" fill="currentColor"/>'),
    coin:        `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#F6C04A"/><circle cx="12" cy="12" r="7" fill="#E9A82F"/><path d="m12 7.5 1.3 2.6 2.9.4-2.1 2 .5 2.9L12 16l-2.6 1.4.5-2.9-2.1-2 2.9-.4L12 7.5Z" fill="#fff"/></svg>`,
    crown:       w('<path d="M4 18h16M5 9l3 3 4-6 4 6 3-3-1.5 9H6.5L5 9Z"/>'),
    medal:       w('<circle cx="12" cy="14" r="5"/><path d="m8.5 9.5-2-6h4l1.5 4M15.5 9.5l2-6h-4l-1.5 4"/><path d="m12 12 .7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2Z" fill="currentColor" stroke="none"/>'),
    bulb:        w('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 1 4 10.5c-.6.6-1 1.2-1 2H9c0-.8-.4-1.4-1-2A6 6 0 0 1 12 3Z"/>'),
    shield:      w('<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>'),
    shieldstar:  w('<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m12 8 1 2 2.2.3-1.6 1.5.4 2.2L12 13l-2 1 .4-2.2L8.8 10.3 11 10l1-2Z" fill="currentColor" stroke="none"/>'),
    clock:       w('<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>'),
    calendar:    w('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9h18M8 3v4M16 3v4"/>'),
    plus:        w('<path d="M12 5v14M5 12h14"/>'),
    edit:        w('<path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17l-1 3Z"/><path d="M14 7l3 3"/>'),
    duplicate:   w('<rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
    trash:       w('<path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13h10l1-13"/>'),
    filter:      w('<path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z"/>'),
    download:    w('<path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 19h14"/>'),
    send:        w('<path d="M4 12 20 4l-7 16-2.5-6L4 12Z"/>'),
    filepdf:     w('<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8 12h2a1.5 1.5 0 0 0 0-3H8v6M14 9v6M14 9h2.5M14 12h2"/>'),
    fileexcel:   w('<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="m9 9 3 6M12 9l-3 6M16 9v6h-2"/>'),
    dots:        w('<circle cx="6" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.4" fill="currentColor" stroke="none"/>'),
    sparkles:    w('<path d="m12 4 1.5 4L18 9.5 13.5 11 12 15l-1.5-4L6 9.5 10.5 8 12 4Z"/><path d="M5 16l.8 2 2 .8-2 .8L5 22l-.8-2-2-.8 2-.8L5 16Z" fill="currentColor" stroke="none"/>'),
    target:      w('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>'),
    alertuser:   w('<circle cx="10" cy="8" r="3.4"/><path d="M3 20a7 7 0 0 1 12-5"/><path d="M19 9v4M19 17v.5" stroke-width="2.2"/>'),
    userplus:    w('<circle cx="9" cy="8" r="3.4"/><path d="M3 20a6 6 0 0 1 11-3.4"/><path d="M18 9v6M15 12h6"/>'),
    book:        w('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3Z"/><path d="M5 4v16"/>'),
    phone:       w('<rect x="6" y="3" width="12" height="18" rx="3"/><path d="M10 18h4"/>'),
    handshake:   w('<path d="m3 11 4-4 5 2 5-2 4 4-4 5-2-2-3 2-3-2-2 2-4-5Z"/>'),
    grad2:       w('<path d="M3 8.5 12 5l9 3.5L12 12 3 8.5Z"/><path d="M7 10.5V14c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-3.5"/>'),
    wrench:      w('<path d="M14 7a4 4 0 0 0-5 5l-6 6 2 2 6-6a4 4 0 0 0 5-5l-2.5 2.5L11 12l-.5-2L13 7.5 14 7Z"/>'),
    bed:         w('<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 14h18M3 18v2M21 18v2"/><path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>'),
    cart:        w('<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2 12h11l2-8H6"/>'),
    info:        w('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/>'),
  };
})();

function icon(name, extra='') {
  let svg = ICONS[name] || ICONS.grid;
  if (extra) svg = svg.replace('<svg ', `<svg ${extra} `);
  return svg;
}

// AERYS logo mark (cube/diamond gradient) — used everywhere identically
const LOGO_MARK = `<svg class="logo-mark" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="ag" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
      <stop stop-color="#8B5CF6"/><stop offset="1" stop-color="#5B21D6"/>
    </linearGradient>
    <linearGradient id="ag2" x1="20" y1="14" x2="44" y2="40" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C4B0FF"/><stop offset="1" stop-color="#7C4DEF"/>
    </linearGradient>
  </defs>
  <path d="M32 4 56 18v28L32 60 8 46V18L32 4Z" fill="url(#ag)"/>
  <path d="M32 16 44 23v14L32 44 20 37V23L32 16Z" fill="url(#ag2)"/>
  <path d="M32 16 44 23 32 30 20 23 32 16Z" fill="#fff" opacity=".55"/>
</svg>`;

function brand(small=false, sub='Hyatt Regency Alger') {
  return `<div class="brand${small ? ' sm':''}">${LOGO_MARK}
    <div class="logo-text"><div class="name">AERYS</div><div class="sub">${sub}</div></div></div>`;
}
