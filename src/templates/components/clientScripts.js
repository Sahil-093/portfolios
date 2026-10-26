/**
 * Client-side script injection for Interactive 3D Card Tilt & Zero-G Particle Physics
 */
export const clientScripts = `
  // 1. Zero-G Interactive Particle Field
  (function initSpaceCanvas() {
    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(80, Math.floor((width * height) / 15000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        speedY: -(Math.random() * 0.4 + 0.1), // Gentle upwards drift
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.7 + 0.2,
        hue: Math.random() > 0.5 ? 180 : 270 // Cyan or Violet subtle stars
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around viewport edges
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = \`hsla(\${p.hue}, 80%, 70%, \${p.opacity})\`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.hue === 180 ? '#00f0ff' : '#a855f7';
        ctx.fill();
      });

      requestAnimationFrame(render);
    }

    render();
  })();

  // 2. Interactive 3D Tilt Effect on Floating Cards
  (function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach((card) => {
      let bounds;

      function onMouseEnter(e) {
        bounds = card.getBoundingClientRect();
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease';
      }

      function onMouseMove(e) {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = mouseX / bounds.width - 0.5; // -0.5 to 0.5
        const yPct = mouseY / bounds.height - 0.5;

        const maxTilt = 12; // Degrees
        const rotateY = xPct * maxTilt;
        const rotateX = -yPct * maxTilt;

        card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateY(-8px) scale(1.02)\`;
      }

      function onMouseLeave() {
        card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
      }

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
    });
  })();
`;
