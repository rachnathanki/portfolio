// ---- Preloader ----
  window.addEventListener("load", () => {
    setTimeout(() => document.getElementById("preloader").classList.add("done"), 900);
  });

  // ---- Particle network background ----
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let W, H, parts = [];
  function sizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  const COUNT = Math.min(70, Math.floor(window.innerWidth / 18));
  for (let i = 0; i < COUNT; i++) {
    parts.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.8 + .6,
    });
  }
  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(96,165,250,0.5)";
      ctx.fill();
    }
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i], b = parts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(96,165,250,${(1 - d / 130) * 0.16})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // ---- Cursor glow ----
  const glow = document.getElementById("cursorGlow");
  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });

  // ---- Typing animation ----
  const roles = ["Backend Developer", "PHP · Laravel · Yii2", "API Integration Specialist", "Full-Stack Capable"];
  const typedEl = document.getElementById("typed");
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const word = roles[ri];
    typedEl.textContent = word.slice(0, ci);
    if (!deleting) {
      if (ci < word.length) { ci++; setTimeout(type, 70); }
      else { deleting = true; setTimeout(type, 1600); }
    } else {
      if (ci > 0) { ci--; setTimeout(type, 38); }
      else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 300); }
    }
  }
  type();

  // ---- Reveal on scroll ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal, .stagger, .slide-left, .slide-right").forEach(el => observer.observe(el));

  // ---- Counter animation ----
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || "";
      let cur = 0;
      const step = () => {
        cur += Math.max(1, Math.round(target / 30));
        if (cur >= target) { el.textContent = target + suffix; }
        else { el.textContent = cur + suffix; requestAnimationFrame(step); }
      };
      step();
      statObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".stat .num").forEach(el => statObserver.observe(el));

  // ---- 3D tilt on cards ----
  document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${ -y * 10}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });

  // ---- Scroll progress bar + to-top ----
  const bar = document.getElementById("scrollbarTop");
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    const sc = window.scrollY, max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (sc / max * 100) + "%";
    toTop.classList.toggle("show", sc > 500);
  });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ---- Mobile menu ----
  const burger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
