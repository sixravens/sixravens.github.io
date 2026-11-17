/* Home v2 motion (/next/v2). No library. Everything marked .rv arrives as it
   scrolls into view; headings arrive a word at a time; section numbers roll
   like a scoreboard; "understanding." decodes itself; signals drift over the
   whole page; beliefs beside the opening are red-teamed; in 003 each
   situation wipes in in its own colour; the 002 figure is a small game on a canvas.
   People who ask for reduced motion get the finished page. */
(function () {
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- headings, a word at a time ---- */
  document.querySelectorAll('.v2-words').forEach(function (h) {
    var i = 0;
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span');
            s.className = 'w'; s.style.setProperty('--i', i++); s.textContent = part;
            frag.appendChild(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          if (n.classList.contains('v2-decode')) { n.classList.add('w'); n.style.setProperty('--i', i++); }
          else split(n);
        }
      });
    })(h);
  });

  /* ---- section numbers roll to their value ---- */
  function roll(el) {
    var final = el.textContent, t0 = performance.now(), dur = 900;
    (function step(t) {
      var p = (t - t0) / dur;
      if (p >= 1) { el.textContent = final; return; }
      el.textContent = final.split('').map(function (c, k) {
        return p > (k + 1) / (final.length + 1) ? c : String(Math.floor(Math.random() * 10));
      }).join('');
      requestAnimationFrame(step);
    })(t0);
  }

  /* ---- "understanding." decodes from noise ---- */
  function decode(el) {
    var final = el.textContent, glyphs = 'abcdefghijklmnopqrstuvwxyz#%&/<>=+*', t0 = performance.now(), dur = 1300;
    (function step(t) {
      var p = Math.min(1, (t - t0) / dur), out = '';
      for (var k = 0; k < final.length; k++) {
        out += p * final.length * 1.15 > k + 2 ? final[k] : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = p >= 1 ? final : out;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---- arrival ---- */
  document.querySelectorAll('.rv-group').forEach(function (g) {
    g.querySelectorAll(':scope > .rv').forEach(function (el, k) { el.style.setProperty('--d', k * 140 + 'ms'); });
  });
  function arrive(el) {
    el.classList.add('in');
    var no = el.matches('.sec-head') && el.querySelector('.no');
    if (no && !still) roll(no);
    if (el.matches('.v2-uses article') && !still) { var n3 = el.querySelector('.no'); setTimeout(function () { roll(n3); }, (parseInt(el.style.getPropertyValue('--d'), 10) || 0) + 550); }
    if (el.matches('.v2-claims li')) setTimeout(function () { el.classList.add('lit'); }, still ? 0 : 450);
  }
  var rvs = document.querySelectorAll('.rv');
  if (still || !('IntersectionObserver' in window)) {
    rvs.forEach(arrive);
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { arrive(e.target.v2rv); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    /* a section head is display: contents on wide screens, which never
       intersects; watch its number instead */
    rvs.forEach(function (el) {
      var t = el.matches('.sec-head') ? el.querySelector('.no') : el;
      t.v2rv = el; io.observe(t);
    });
  }
  /* the opening plays at once */
  var hero = document.querySelector('.v2-hero h1');
  if (hero) {
    requestAnimationFrame(function () { hero.classList.add('in'); });
    var dc = hero.querySelector('.v2-decode');
    if (dc && !still) setTimeout(function () { decode(dc); }, 350);
  }

  /* ---- the opening: beliefs, red-teamed ---- */
  var bel = document.querySelector('.v2-belief');
  if (bel) {
    var said = Array.prototype.map.call(bel.querySelectorAll('.v2-beliefs li'), function (li) {
      return { c: li.textContent.trim(), q: li.dataset.q };
    });
    for (var j = said.length - 1; j > 0; j--) { var x = Math.floor(Math.random() * (j + 1)), sw = said[j]; said[j] = said[x]; said[x] = sw; }
    var typed = bel.querySelector('.t'), note = bel.querySelector('.v2-bel-note'), b = 0;
    var count = bel.querySelector('.v2-bel-n');
    /* each claim's number comes from its words, so a claim seen twice has
       the same number both times */
    var num = function (c) { var h = 7; for (var k = 0; k < c.length; k++) h = (h * 31 + c.charCodeAt(k)) % 900; return '#' + (100 + h); };
    var show = function () {
      var it = said[b % said.length], i = 0;
      count.textContent = num(it.c); b++;
      typed.textContent = ''; note.textContent = it.q;
      bel.classList.remove('out', 'noted');
      (function type() {
        typed.textContent = it.c.slice(0, ++i);
        if (i < it.c.length) return setTimeout(type, 28 + Math.random() * 50);
        setTimeout(function () { bel.classList.add('noted'); }, 900);
        setTimeout(function () { bel.classList.add('out'); }, 5200);
        setTimeout(show, 5800);
      })();
    };
    if (still) { typed.textContent = said[0].c; note.textContent = said[0].q; count.textContent = num(said[0].c); bel.classList.add('noted'); }
    else setTimeout(show, 1800);
  }

  /* ---- signals drift over the whole page, a foretaste of the 002 game.
     They sit on the page and scroll with it. Any that touch "understanding.",
     a section number or the corner raven glow amber, and fade back as they
     drift on, so the glow is always near whatever caused it. The
     raven is read from the same image, placed as system.css places it. ---- */
  var mc = document.querySelector('.v2-motes');
  if (mc && !still) (function () {
    var c = mc.getContext('2d'), word = document.querySelector('.v2-decode');
    var nos = document.querySelectorAll('.v2 .sec-head .no, .v2-uses .v2-label .no');
    var paper = document.querySelector('.v2-paper'), game = document.querySelector('.v2-fig');
    var w = 0, h = 0, r = 1, dots = [], t0 = 0, sy = scrollY, amber = '', fg = '';
    var bird = { img: new Image(), a: null, x: 0, y: 0, w: 0, h: 0 };
    bird.img.onload = place; bird.img.src = '/assets/images/raven-line.png';
    function place() {
      if (!bird.img.naturalWidth) return;
      var vw = document.documentElement.clientWidth, vh = innerHeight, small = vw < 720;
      bird.w = Math.round(small ? vw * 0.56 : Math.min(vh * 0.48, vw * 0.34));
      bird.h = Math.round(bird.w * bird.img.naturalHeight / bird.img.naturalWidth);
      bird.x = vw + (small ? 0.10 : 0.04) * vw - bird.w;
      bird.y = vh + (small ? 0.04 : 0.06) * vh - bird.h;
      var o = document.createElement('canvas'); o.width = bird.w; o.height = bird.h;
      var oc = o.getContext('2d'); oc.drawImage(bird.img, 0, 0, bird.w, bird.h);
      try { bird.a = oc.getImageData(0, 0, bird.w, bird.h).data; } catch (e) { bird.a = null; }
    }
    function onBird(px, py) {
      if (!bird.a) return false;
      for (var k = 0; k < 5; k++) {
        var x = Math.round(px - bird.x + [0, 3, -3, 0, 0][k]), y = Math.round(py - bird.y + [0, 0, 0, 3, -3][k]);
        if (x >= 0 && y >= 0 && x < bird.w && y < bird.h && bird.a[(y * bird.w + x) * 4 + 3] > 60) return true;
      }
      return false;
    }
    function inRect(b, x, y, pad) { return b && x > b.left - pad && x < b.right + pad && y > b.top - pad && y < b.bottom + pad; }
    function fit() {
      r = Math.min(2, devicePixelRatio || 1);
      w = document.documentElement.clientWidth; h = innerHeight;
      mc.width = Math.round(w * r); mc.height = Math.round(h * r);
      var n = Math.min(320, Math.round(w * h / 5200));   // density
      while (dots.length < n) dots.push(mote(true));
      dots.length = n;
      var cs = getComputedStyle(mc); amber = cs.getPropertyValue('--amber').trim(); fg = cs.getPropertyValue('--fg').trim();
      place();
    }
    function mote(anywhere) {
      var y = Math.random() * h;
      return { x: anywhere ? Math.random() * w : -4, y: y, y0: y, v: 10 + Math.random() * 22, amp: 4 + Math.random() * 12, ph: Math.random() * 6.28, lit: 0 };
    }
    function hex(col, a) { var m = col.match(/^#(..)(..)(..)$/); return m ? 'rgba(' + [1, 2, 3].map(function (i) { return parseInt(m[i], 16); }).join(',') + ',' + a + ')' : col; }
    function tick(t) {
      var dt = Math.min(0.05, (t - (t0 || t)) / 1000); t0 = t;
      var dy = scrollY - sy; sy = scrollY;
      var wb = word && word.getBoundingClientRect(), pb = paper && paper.getBoundingClientRect(), gb = game && game.getBoundingClientRect();
      var nb = Array.prototype.map.call(nos, function (n) { return n.getBoundingClientRect(); }).filter(function (b) { return b.bottom > 0 && b.top < h; });
      c.setTransform(r, 0, 0, r, 0, 0); c.clearRect(0, 0, w, h);
      dots.forEach(function (d) {
        d.x += d.v * dt; d.y0 -= dy;
        if (d.y0 < -30) { d.y0 += h + 60; d.lit = 0; } else if (d.y0 > h + 30) { d.y0 -= h + 60; d.lit = 0; }
        d.y = d.y0 + Math.sin(d.x / 70 + d.ph) * d.amp;
        if (inRect(gb, d.x, d.y, 0)) return;   // the game draws its own
        var touch = (wb && d.x > wb.left && d.x < wb.right && d.y > wb.top + wb.height * 0.2 && d.y < wb.bottom - wb.height * 0.1) || onBird(d.x, d.y);
        for (var k = 0; !touch && k < nb.length; k++) if (inRect(nb[k], d.x, d.y, -2)) touch = true;
        d.lit = touch ? 1 : Math.max(0, d.lit - dt / 2.4);
        c.fillStyle = inRect(pb, d.x, d.y, 0) ? 'rgba(32,41,46,.28)' : hex(fg, 0.2);
        c.beginPath(); c.arc(d.x, d.y, 1.1, 0, 7); c.fill();
        if (d.lit > 0.02) {
          c.strokeStyle = hex(amber, 0.3 * d.lit); c.lineWidth = 1.5;
          c.beginPath(); c.moveTo(d.x - 8 - d.v * 0.3, d.y); c.lineTo(d.x, d.y); c.stroke();
          c.fillStyle = hex(amber, 0.95 * d.lit);
          c.beginPath(); c.arc(d.x, d.y, 1.1 + 0.8 * d.lit, 0, 7); c.fill();
        }
        if (d.x > w + 10) Object.assign(d, mote(false));
      });
      requestAnimationFrame(tick);
    }
    fit();
    addEventListener('resize', fit);
    requestAnimationFrame(tick);
  })();

  /* ---- 002: six forces, and what happens to them ----
     Six illustrative forces on a hexagon, each tied to some of the others:
     move one and its neighbours follow part of the way. Things happen, good
     and bad, and add up: each event moves some forces out or in from where
     they were, so the six drift out of step and back together. Signals stream
     through from the left; ordinary ones are handled where all six overlap
     (amber). The rare unexpected one (white) is noticed only where exactly
     five overlap, and explained away (greyed) where all six agree. Each event
     is captioned as the claims in the opening are: what happened, then what
     it changed. Left alone it moves on every few seconds; a tap or click
     brings the next one; with a mouse a ring can be dragged, and stays. */
  var cv = document.querySelector('.v2-canvas');
  if (!cv) return;
  var fig = cv.closest('.v2-fig'), ctx = cv.getContext('2d');
  var what = fig.querySelector('.v2-said-what'), so = fig.querySelector('.v2-said-so'), sayBox = fig.querySelector('.v2-said');
  var NAMES = ['knowledge', 'authority', 'incentives', 'relationships', 'identity', 'technology'];
  var TIES = [[0, 5], [0, 3], [1, 2], [1, 3], [4, 3], [4, 2]];   // who moves whom
  var REST = [0.5, 0.5, 0.5, 0.5, 0.85, 0.5];                   // x R, from the middle; no organization is symmetrical
  var WHITE = 0.05;                                             // share of signals that are unexpected
  /* what happens: from _data/v2_events.yml, by way of the page. Each moves
     the named forces out (+) or in (-), in ring radii, from where they are */
  var EVENTS = [];
  try { EVENTS = JSON.parse(fig.querySelector('.v2-events').textContent) || []; } catch (e) {}
  EVENTS.forEach(function (e) {
    var by = {};
    Object.keys(e.by || {}).forEach(function (n) { var k = NAMES.indexOf(n); if (k > -1) by[k] = +e.by[n]; });
    e.by = by; e.w = +e.w || 0;
  });
  var NEAR = 0.15, FAR = 0.9;   // anchored: however bad it gets, the six always share some ground
  var W = 0, H = 0, dpr = 1, R = 0, cx = 0, cy = 0, col = {};
  var rings = NAMES.map(function (n, k) {
    var a = -Math.PI / 2 + k * Math.PI / 3;
    return { ax: Math.cos(a), ay: Math.sin(a), hr: REST[k], hx: 0, hy: 0, ox: 0, oy: 0, x: 0, y: 0, hot: 0, lit: 0, ph: Math.random() * 6.28 };
  });
  var motes = [], pings = [];
  var drag = null, hover = -1, visible = false, progress = still ? 1 : 0, last = 0, clock = 0;
  var next = 3, held = 0, recent = [], down = null;

  function colours() {
    var cs = getComputedStyle(fig);
    ['--fg', '--fg-2', '--muted', '--amber', '--on-accent'].forEach(function (v) { col[v] = cs.getPropertyValue(v).trim(); });
    col.font = cs.getPropertyValue('--font');
  }
  function rgba(hex, a) {
    var m = hex.match(/^#(..)(..)(..)$/);
    return m ? 'rgba(' + parseInt(m[1], 16) + ',' + parseInt(m[2], 16) + ',' + parseInt(m[3], 16) + ',' + a + ')' : hex;
  }
  function len(x, y) { return Math.sqrt(x * x + y * y); }
  function home(g) { g.hx = g.ax * g.hr * R; g.hy = g.ay * g.hr * R; }
  function size() {
    var r = cv.getBoundingClientRect(), oldR = R;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height; cx = W / 2; cy = H / 2;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    R = Math.min(W, H) * (W < 500 ? 0.22 : 0.2);
    rings.forEach(function (g, k) {
      if (!oldR) { g.ox = g.ax * REST[k] * R; g.oy = g.ay * REST[k] * R; }
      else { g.ox *= R / oldR; g.oy *= R / oldR; }
      home(g);
    });
    var n = Math.min(240, Math.round(W * H / 1500));
    while (motes.length < n) motes.push(spawn(true));
    motes.length = n;
  }
  function spawn(anywhere) {
    var y = cy + (Math.random() + Math.random() + Math.random() - 1.5) * H * 0.5;
    return { x: anywhere ? Math.random() * W : -6 - Math.random() * 30, y: y, y0: y, ph: Math.random() * 6.28,
             v: (26 + Math.random() * 40) * Math.max(0.6, W / 560), amp: 3 + Math.random() * 10,
             white: Math.random() < WHITE, state: '', band: false, n: 0 };
  }

  /* ---- events: chosen so that things never fall apart, or lock up, for long ---- */
  function spread() { var t = 0; rings.forEach(function (g) { t += g.hr; }); return t / 6; }
  function happen() {
    if (!EVENTS.length) return;
    var m = spread(), all = EVENTS.map(function (e, i) { return i; }).filter(function (i) { return recent.indexOf(i) < 0; });
    var pool = all.filter(function (i) {
      var w = EVENTS[i].w;
      if (m > 0.72) return w === 1;            // badly out of step: something helps
      if (m < 0.38) return w === -1;           // locked together: the world intrudes
      return true;
    });
    if (!pool.length) pool = all.length ? all : EVENTS.map(function (e, i) { return i; });
    var i = pool[Math.floor(Math.random() * pool.length)], e = EVENTS[i];
    recent.push(i); if (recent.length > Math.min(8, EVENTS.length - 1)) recent.shift();
    rings.forEach(function (g, k) {
      if (e.by[k] === undefined) return;
      g.hr = Math.max(NEAR, Math.min(FAR, g.hr + e.by[k])); home(g); g.lit = 1;
    });
    sayBox.classList.add('out');
    setTimeout(function () {
      what.textContent = e.what; so.textContent = e.so;
      sayBox.classList.remove('out');
    }, still ? 0 : 350);
    if (still) { rings.forEach(function (g) { g.ox = g.hx; g.oy = g.hy; }); step(0); draw(0); }
  }

  function step(dt) {
    var k1 = Math.min(1, dt * 2.4);
    /* left to themselves, things settle back, slowly */
    rings.forEach(function (g, k) { if (!(drag && drag.k === k)) { g.hr += (REST[k] - g.hr) * Math.min(1, dt / 40); home(g); } });
    rings.forEach(function (g, i) {
      if (drag && drag.k === i) { g.ox = drag.x - drag.gx - cx; g.oy = drag.y - drag.gy - cy; return; }
      /* towards its place, and towards where its ties would have it */
      var fx = g.hx - g.ox, fy = g.hy - g.oy, n = 1;
      TIES.forEach(function (t) {
        var j = t[0] === i ? t[1] : t[1] === i ? t[0] : -1;
        if (j < 0) return;
        var o = rings[j];
        fx += 0.8 * (o.ox + (g.hx - o.hx) - g.ox); fy += 0.8 * (o.oy + (g.hy - o.hy) - g.oy); n += 0.8;
      });
      g.ox += fx / n * k1; g.oy += fy / n * k1;
      var d = len(g.ox, g.oy), max = FAR * R;   // its ties can pull it, but not out of reach
      if (d > max) { g.ox *= max / d; g.oy *= max / d; }
    });
    var sp = 1 + 1.6 * Math.pow(1 - progress, 2);
    rings.forEach(function (g, k) {
      var wob = R * 0.035;
      g.x = cx + g.ox * sp + Math.sin(clock * 0.5 + g.ph) * wob;
      g.y = cy + g.oy * sp + Math.cos(clock * 0.37 + g.ph * 1.3) * wob;
      g.lit = Math.max(0, g.lit - dt / 3);
      var on = hover === k || (drag && drag.k === k) || g.lit > 0;
      g.hot += ((on ? 1 : 0) - g.hot) * 0.12;
    });
  }
  function inside(g, x, y) { var dx = x - g.x, dy = y - g.y; return dx * dx + dy * dy < R * R; }
  function circle(g) { ctx.beginPath(); ctx.arc(g.x, g.y, R, 0, 7); }

  function draw(dt) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var fs = Math.max(11, Math.min(14, W / 38));

    rings.forEach(function (g) { circle(g); ctx.fillStyle = rgba(col['--fg'], 0.035); ctx.fill(); });
    ctx.save();
    rings.forEach(function (g) { circle(g); ctx.clip(); });
    ctx.beginPath(); ctx.rect(0, 0, W, H);
    ctx.fillStyle = rgba(col['--amber'], 0.22); ctx.fill();
    ctx.restore();

    /* the ties */
    ctx.setLineDash([3, 5]); ctx.lineWidth = 1;
    TIES.forEach(function (t) {
      var a = rings[t[0]], b = rings[t[1]], h = Math.max(a.hot, b.hot);
      ctx.strokeStyle = rgba(h > 0.05 ? col['--amber'] : col['--fg'], 0.12 + 0.45 * h);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    });
    ctx.setLineDash([]);

    motes.forEach(function (m) {
      if (!still) {
        m.x += m.v * dt * (m.n >= 5 ? 0.6 : 1);
        m.y = m.y0 + Math.sin(m.x / 55 + m.ph + clock * 0.8) * m.amp;
      }
      var n = 0;
      for (var k = 0; k < 6; k++) if (inside(rings[k], m.x, m.y)) n++;
      m.n = n;
      if (progress > 0.9 && !still) {
        if (!m.white) {
          if (n === 6 && !m.state) { m.state = 'got'; pings.push({ x: m.x, y: m.y, t: 0, c: col['--amber'] }); }
        } else if (!m.state) {
          if (n === 6) m.state = 'lost';                       // explained away
          else if (n === 5) m.band = true;
          else if (m.band) { m.state = 'seen'; pings.push({ x: m.x, y: m.y, t: 0, c: col['--fg'], big: 1 }); }
        }
      }
      var trail = 0, rad, fill;
      if (!m.white) {
        if (m.state === 'got') { rad = 2.3; fill = col['--amber']; trail = 1; }
        else { rad = 0.9 + n * 0.18; fill = rgba(col['--fg'], 0.18 + n * 0.08); }
      } else if (m.state === 'seen') { rad = 3.2; fill = col['--fg']; trail = 2; }
      else if (m.state === 'lost') { rad = 1.6; fill = rgba(col['--fg'], 0.25); }
      else {
        rad = 2.6; fill = col['--fg'];
        ctx.fillStyle = rgba(col['--fg'], 0.1); ctx.beginPath(); ctx.arc(m.x, m.y, 6, 0, 7); ctx.fill();
      }
      if (trail && !still) {
        ctx.strokeStyle = trail === 2 ? rgba(col['--fg'], 0.4) : rgba(col['--amber'], 0.32); ctx.lineWidth = trail === 2 ? 2.4 : 2;
        ctx.beginPath(); ctx.moveTo(m.x - 12 - m.v * 0.2, m.y); ctx.lineTo(m.x, m.y); ctx.stroke();
      }
      ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(m.x, m.y, rad, 0, 7); ctx.fill();
      if (m.x > W + 16) Object.assign(m, spawn(false));
    });
    pings = pings.filter(function (p) {
      p.t += dt;
      var k = p.t / (p.big ? 1 : 0.7);
      if (k >= 1) return false;
      ctx.strokeStyle = rgba(p.c, 0.8 * (1 - k)); ctx.lineWidth = p.big ? 2 : 1.5;
      ctx.beginPath(); ctx.arc(p.x, p.y, 3 + k * (p.big ? 30 : 18), 0, 7); ctx.stroke();
      return true;
    });

    rings.forEach(function (g) {
      circle(g);
      ctx.lineWidth = 1 + g.hot * 1.5;
      ctx.strokeStyle = g.hot > 0.05 ? rgba(col['--amber'], 0.4 + 0.6 * g.hot) : rgba(col['--fg'], 0.35);
      ctx.stroke();
    });
    ctx.font = '400 ' + fs + 'px ' + col.font; ctx.textBaseline = 'middle';
    rings.forEach(function (g, k) {
      var dx = g.x - cx, dy = g.y - cy, d = len(dx, dy);
      var ux = d > 4 ? dx / d : g.ax, uy = d > 4 ? dy / d : g.ay;
      var tx = g.x + ux * (R + 8), ty = g.y + uy * (R + 8 + fs * 0.4);
      ctx.textAlign = ux > 0.35 ? 'left' : ux < -0.35 ? 'right' : 'center';
      var w = ctx.measureText(NAMES[k]).width;
      if (ctx.textAlign === 'left') tx = Math.min(tx, W - w - 6); else if (ctx.textAlign === 'right') tx = Math.max(tx, w + 6); else tx = Math.max(w / 2 + 6, Math.min(W - w / 2 - 6, tx));
      ty = Math.max(fs, Math.min(H - fs, ty));
      ctx.fillStyle = g.hot > 0.05 ? col['--amber'] : rgba(col['--fg'], 0.8);
      ctx.fillText(NAMES[k], tx, ty);
    });
  }

  function scrollProgress() {
    var r = fig.getBoundingClientRect(), vh = innerHeight;
    return Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.8)));
  }
  function frame(t) {
    var dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
    clock += dt; held = Math.max(0, held - dt);
    progress += (Math.max(progress, scrollProgress()) - progress) * 0.06;
    if (progress > 0.97 && !drag && !held && (next -= dt) <= 0) { happen(); next = 6.5; }
    step(dt); draw(dt);
    if (visible) requestAnimationFrame(frame); else last = 0;
  }

  function pt(e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function nearest(p) {
    var best = -1, bd = R * 1.15;
    rings.forEach(function (g, k) { var d = len(p.x - g.x, p.y - g.y); if (d < bd) { bd = d; best = k; } });
    return best;
  }
  cv.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    var p = pt(e);
    if (down && !drag && len(p.x - down.x, p.y - down.y) > 6 && down.k > -1) {
      var g = rings[down.k];
      drag = { k: down.k, x: p.x, y: p.y, gx: down.x - (cx + g.ox), gy: down.y - (cy + g.oy) };
      cv.classList.add('grabbing');
    }
    if (drag) { drag.x = p.x; drag.y = p.y; return; }
    hover = nearest(p);
    cv.classList.toggle('grab', hover > -1);
  });
  cv.addEventListener('pointerleave', function () { if (!drag) { hover = -1; cv.classList.remove('grab'); } });
  cv.addEventListener('pointerdown', function (e) {
    var p = pt(e);
    down = { x: p.x, y: p.y, k: e.pointerType === 'mouse' ? nearest(p) : -1 };
    if (e.pointerType === 'mouse') cv.setPointerCapture(e.pointerId);
  });
  cv.addEventListener('pointerup', function (e) {
    if (drag) {
      var g = rings[drag.k], d = len(g.ox, g.oy);   // it stays where you put it, within reach of the others
      g.hr = Math.max(NEAR, Math.min(FAR, d / R));
      if (d > 1) { g.ax = g.ox / d; g.ay = g.oy / d; }
      home(g);
      drag = null; held = 8; cv.classList.remove('grabbing');
    } else if (down) {
      var p = pt(e);
      if (len(p.x - down.x, p.y - down.y) < 10) { happen(); next = 6.5; held = 0; }   // a tap or click: what happens next
    }
    down = null;
  });
  cv.addEventListener('pointercancel', function () { down = null; drag = null; cv.classList.remove('grabbing'); });

  colours(); size();
  if (still) { step(0); draw(0); happen(); }
  if (window.ResizeObserver) new ResizeObserver(function () { size(); if (still) { step(0); draw(0); } }).observe(cv);
  new IntersectionObserver(function (es) {
    var was = visible; visible = es[0].isIntersecting;
    if (visible && !was && !still) requestAnimationFrame(frame);
  }).observe(cv);
})();
