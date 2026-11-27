/* Independent decorative renderer: never touches V3 simulation state. */
(() => {
  'use strict';
  const hero = document.getElementById('home');
  const canvas = document.getElementById('auroraStars');
  const toggle = document.getElementById('motionToggle');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const ctx = canvas.getContext('2d');
  let paused = reduce.matches, visible = true, raf = 0, w = 0, h = 0, stars = [], last = 0, t = 0;
  function resize() {
    const rect = hero.getBoundingClientRect();
    w = rect.width; h = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr);
    if (!ctx) return;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    stars = Array.from({length: w < 650 ? 95 : 210}, () => ({x:Math.random()*w,y:Math.random()*h,r:.35+Math.random()**3*1.5,phase:Math.random()*6.28,drift:.4+Math.random()*2,tint:Math.random()>.68?'190,175,255':'193,233,255'}));
    draw();
  }
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0,0,w,h);
    for (const s of stars) {
      const x = (s.x + t*s.drift) % w, y = (s.y + t*s.drift*.22) % h;
      const alpha = .24+.45*(.5+.5*Math.sin(t*.9+s.phase));
      ctx.fillStyle = `rgba(${s.tint},${alpha})`;
      ctx.beginPath();ctx.arc(x,y,s.r,0,Math.PI*2);ctx.fill();
      if(s.r>1.45){ctx.fillStyle=`rgba(${s.tint},${alpha*.28})`;ctx.fillRect(x-4,y-.35,8,.7);ctx.fillRect(x-.35,y-4,.7,8);}
    }
  }
  function frame(now) { raf=0; if(paused || !visible || document.hidden) return; if(last){t+=Math.min((now-last)/1000,.05);} last=now;draw();raf=requestAnimationFrame(frame); }
  function sync() {
    hero.classList.toggle('motion-off',paused || !visible || document.hidden);
    toggle.setAttribute('aria-pressed',String(paused));
    toggle.textContent = paused ? '▶  Resume ambience' : 'Ⅱ  Pause ambience';
    if(raf){cancelAnimationFrame(raf);raf=0;}last=0;
    if(!paused && visible && !document.hidden && ctx) raf=requestAnimationFrame(frame);
  }
  toggle.addEventListener('click',()=>{paused=!paused;sync();});
  reduce.addEventListener('change',e=>{paused=e.matches;sync();});
  window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',sync);
  if('IntersectionObserver' in window) new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:0.01}).observe(hero);
  hero.addEventListener('pointermove',e=>{if(paused||reduce.matches||e.pointerType==='touch')return;const r=hero.getBoundingClientRect();hero.style.setProperty('--px',`${(e.clientX/r.width-.5)*-32}px`);hero.style.setProperty('--py',`${((e.clientY-r.top)/r.height-.5)*-24}px`);},{passive:true});
  hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--px','0px');hero.style.setProperty('--py','0px');});
  resize();sync();
  // Do not intercept navigation or the original Atlas button handler.
  document.querySelectorAll('.morph-button').forEach(button=>{
    let timer;
    button.addEventListener('click',()=>{button.classList.add('is-launching');const icon=button.querySelector('.morph-icon');if(!icon)return;const original=icon.dataset.original||icon.textContent;icon.dataset.original=original;icon.textContent='✦';clearTimeout(timer);timer=setTimeout(()=>{button.classList.remove('is-launching');icon.textContent=original;},650);});
  });
  document.querySelectorAll('.lab-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--cardx',`${(e.clientX-r.left)/r.width*100}%`);card.style.setProperty('--cardy',`${(e.clientY-r.top)/r.height*100}%`);},{passive:true}));
  if(!reduce.matches && 'IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('revealed');obs.unobserve(e.target);}},{threshold:.1});document.querySelectorAll('.section-top,.planet-feature,.lab-card,.closing-inner').forEach(el=>{el.classList.add('reveal-ready');obs.observe(el);});}
})();
