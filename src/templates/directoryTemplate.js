import { sharedStyles } from './components/styles.js';
import { clientScripts } from './components/clientScripts.js';

/**
 * Renders the main Anti-Gravity marketplace / showcase directory page (index.html).
 * @param {Array<Object>} professionals - Normalized professional records
 * @param {Object} options - Metadata options
 * @returns {string} Fully valid HTML document string
 */
export function renderDirectoryPage(professionals = [], options = {}) {
  const cardsHtml = professionals.map((p, idx) => {
    const floatClass = `float-${(idx % 3) + 1}`;
    const skillsList = p.skills.slice(0, 4);

    return `
      <div class="glass-card tilt-card professional-card ${floatClass}" data-search="${(p.name + ' ' + p.title + ' ' + p.skills.join(' ')).toLowerCase()}">
        <div class="card-top">
          <div class="card-avatar-wrap">
            <div class="card-avatar-glow"></div>
            <img src="${p.avatarUrl}" alt="${p.name}" class="card-avatar" loading="lazy" />
          </div>
          <div class="card-head-meta">
            <span class="status-badge">
              <span class="pulse-dot"></span>
              <span>${p.status}</span>
            </span>
            <span class="rate-badge">${p.hourlyRate}</span>
          </div>
        </div>

        <div class="card-body">
          <h3 class="prof-name">${p.name}</h3>
          <p class="prof-title">${p.title}</p>
          <p class="prof-bio">${p.bio.length > 110 ? p.bio.substring(0, 110) + '...' : p.bio}</p>

          <div class="skills-row">
            ${skillsList.map(s => `<span class="tag-pill">${s}</span>`).join('')}
            ${p.skills.length > 4 ? `<span class="tag-pill" style="opacity: 0.6">+${p.skills.length - 4}</span>` : ''}
          </div>
        </div>

        <div class="card-footer">
          <span class="loc-text">📍 ${p.location}</span>
          <a href="./professionals/${p.username}/index.html" class="btn-gravity btn-card">
            <span>View Portfolio</span>
            <span>→</span>
          </a>
        </div>
      </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anti-Gravity Portfolio Platform | Elite Freelance Network</title>
  <meta name="description" content="A weightless, ultra-fast Jamstack freelance platform showcasing top independent talent.">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <style>
    ${sharedStyles}

    /* Marketplace Header */
    .market-hero {
      text-align: center;
      padding: 60px 0 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 9999px;
      background: rgba(0, 240, 255, 0.1);
      border: 1px solid rgba(0, 240, 255, 0.3);
      color: var(--neon-cyan);
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .market-hero h1 {
      font-size: 3.2rem;
      line-height: 1.15;
      margin-bottom: 18px;
    }
    @media (max-width: 768px) {
      .market-hero h1 {
        font-size: 2.2rem;
      }
    }
    .market-hero p {
      font-size: 1.15rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Search & Stats Bar */
    .search-section {
      max-width: 650px;
      margin: 0 auto 50px;
      position: relative;
    }
    .search-input {
      width: 100%;
      padding: 16px 24px;
      border-radius: 16px;
      background: rgba(18, 24, 48, 0.8);
      border: 1px solid var(--border-glass);
      color: #fff;
      font-size: 1rem;
      outline: none;
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }
    .search-input:focus {
      border-color: var(--neon-cyan);
      box-shadow: 0 0 25px rgba(0, 240, 255, 0.35);
    }
    .search-input::placeholder {
      color: var(--text-subtle);
    }

    /* Professionals Grid */
    .professionals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 32px;
    }
    @media (max-width: 480px) {
      .professionals-grid {
        grid-template-columns: 1fr;
      }
    }

    .professional-card {
      padding: 28px;
      display: flex;
      flex-direction: column;
      border-radius: 20px;
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    .card-avatar-wrap {
      position: relative;
      width: 76px;
      height: 76px;
    }
    .card-avatar-glow {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
      filter: blur(6px);
      opacity: 0.7;
    }
    .card-avatar {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(255, 255, 255, 0.8);
      z-index: 2;
    }
    .card-head-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }
    .rate-badge {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--neon-cyan);
    }

    .card-body {
      flex: 1;
      margin-bottom: 24px;
    }
    .prof-name {
      font-size: 1.4rem;
      margin-bottom: 4px;
    }
    .prof-title {
      color: #c084fc;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 12px;
    }
    .prof-bio {
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 18px;
    }
    .skills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .loc-text {
      color: var(--text-subtle);
      font-size: 0.85rem;
    }
    .btn-card {
      padding: 8px 18px;
      font-size: 0.85rem;
      border-radius: 10px;
    }

    /* Stats strip */
    .stats-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 60px 0 30px;
      padding: 24px;
      border-radius: 18px;
    }
    .stat-item {
      text-align: center;
    }
    .stat-number {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--neon-cyan);
      font-family: var(--font-heading);
    }
    .stat-label {
      color: var(--text-muted);
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <!-- Space Background Canvas -->
  <canvas id="space-canvas"></canvas>

  <!-- Ambient Light Orbs -->
  <div class="cosmic-orb orb-1"></div>
  <div class="cosmic-orb orb-2"></div>

  <div class="container">
    <!-- Navigation -->
    <nav class="nav-bar">
      <a href="./index.html" class="nav-logo">
        <span class="nav-logo-icon">▲</span>
        <span>Anti-Gravity Portfolios</span>
      </a>
      <div style="display: flex; align-items: center; gap: 14px;">
        <div class="status-badge" style="display: none; @media(min-width: 640px){ display: inline-flex; }">
          <span class="pulse-dot"></span>
          <span>Auto-Sync Online</span>
        </div>
        <a href="./join.html" class="btn-gravity" style="padding: 9px 18px; font-size: 0.88rem;">
          <span>⚡ Join Platform</span>
        </a>
      </div>
    </nav>

    <!-- Marketplace Hero -->
    <header class="market-hero">
      <div class="hero-badge">Zero-G Jamstack Architecture</div>
      <h1>Defy Ordinary Portfolios. <br/><span class="gradient-text">Hire Weightless Talent.</span></h1>
      <p>A headless, Google-powered directory of top freelance engineers, architects, and creative technologists.</p>
    </header>

    <!-- Instant Search Bar -->
    <div class="search-section">
      <input type="text" id="live-search" class="search-input" placeholder="🔍 Filter by discipline, name, or skill (e.g., Three.js, Cloud, Design)..." />
    </div>

    <!-- Professionals Grid -->
    <div class="professionals-grid" id="prof-grid">
      ${cardsHtml}
    </div>

    <!-- Stats Bar -->
    <div class="glass-card stats-bar">
      <div class="stat-item">
        <div class="stat-number">${professionals.length}</div>
        <div class="stat-label">Active Specialists</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">100%</div>
        <div class="stat-label">Static Edge Delivery</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">&lt; 50ms</div>
        <div class="stat-label">Average Load Speed</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">$0/mo</div>
        <div class="stat-label">Hosting Overhead</div>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <p>Anti-Gravity Portfolio Platform · Automated via GitHub Actions & Google Sheets · Powered by Jamstack</p>
    </footer>
  </div>

  <script>
    ${clientScripts}

    // Instant Client-side Search Filtering
    const searchInput = document.getElementById('live-search');
    const cards = document.querySelectorAll('.professional-card');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        cards.forEach((card) => {
          const searchData = card.getAttribute('data-search') || '';
          if (!query || searchData.includes(query)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
  </script>
</body>
</html>`;
}
