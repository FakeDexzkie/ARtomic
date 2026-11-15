/* ARtomic website — no frameworks or build step needed. */
(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Fade in sections as they scroll into view.
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(node => observer.observe(node));
  } else {
    reveals.forEach(node => node.classList.add('is-visible'));
  }

  const canvas = document.getElementById('particles');
  if (!canvas || !canvas.getContext) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  let points = [], raf = 0, w = 0, h = 0, dpr = 1;
  let pointer = { x: -1000, y: -1000 };

  const reset = () => {
    w = window.innerWidth; h = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(65, Math.floor(w * h / 19000));
    points = Array.from({length: count}, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.35 + .35,
      vx: (Math.random() - .5) * .25,
      vy: (Math.random() - .5) * .27,
      shade: Math.random() > .68 ? '164,115,255' : '77,211,241',
      alpha: Math.random() * .42 + .16,
    }));
  };
  let last = 0;
  const draw = (time) => {
    raf = requestAnimationFrame(draw);
    if (document.hidden || time - last < 26) return;
    last = time;
    context.clearRect(0, 0, w, h);
    for (const p of points) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      const dx = p.x - pointer.x, dy = p.y - pointer.y;
      const near = dx * dx + dy * dy < 16000;
      context.beginPath();
      context.arc(p.x, p.y, p.r * (near ? 1.5 : 1), 0, Math.PI * 2);
      context.fillStyle = `rgba(${p.shade},${near ? p.alpha * 1.8 : p.alpha})`;
      context.fill();
    }
  };
  reset();
  raf = requestAnimationFrame(draw);
  let resizeDelay;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDelay);
    resizeDelay = setTimeout(reset, 180);
  }, {passive: true});
  window.addEventListener('pointermove', event => {
    pointer.x = event.clientX; pointer.y = event.clientY;
  }, {passive: true});
  window.addEventListener('pointerleave', () => { pointer.x = -1000; pointer.y = -1000; }, {passive:true});
  window.addEventListener('pagehide', () => cancelAnimationFrame(raf), {once: true});
})();
