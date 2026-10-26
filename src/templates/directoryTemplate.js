import { sharedStyles } from './components/styles.js';
import { clientScripts } from './components/clientScripts.js';

/**
 * Renders the Universal Career Directory Showcase (index.html).
 */
export function renderDirectoryPage(professionals = [], options = {}) {
  const cardsHtml = professionals.map((p, idx) => {
    const floatClass = `float-${(idx % 3) + 1}`;
    const skillsList = p.skills.slice(0, 4);

    return `
      <div class="glass-card tilt-card professional-card ${floatClass}" 
           data-search="${(p.name + ' ' + p.title + ' ' + p.department + ' ' + p.jobType + ' ' + p.skills.join(' ')).toLowerCase()}"
           data-department="${(p.department || '').toLowerCase()}">
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
            <span class="rate-badge">${p.salary}</span>
          </div>
        </div>

        <div class="card-body">
          <div class="dept-tag">${p.department}</div>
          <h3 class="prof-name">${p.name}</h3>
          <p class="prof-title">${p.title}</p>
          
          <div class="meta-strip">
            <span>💼 ${p.jobType}</span>
            <span>⏱️ ${p.experience}</span>
          </div>

          <p class="prof-bio">${p.bio.length > 115 ? p.bio.substring(0, 115) + '...' : p.bio}</p>

          <div class="skills-row">
            ${skillsList.map(s => `<span class="tag-pill">${s}</span>`).join('')}
            ${p.skills.length > 4 ? `<span class="tag-pill" style="opacity: 0.6">+${p.skills.length - 4}</span>` : ''}
          </div>
        </div>

        <div class="card-footer">
          <span class="loc-text">📍 ${p.location}</span>
          <a href="./professionals/${p.username}/index.html" class="btn-gravity btn-card">
            <span>View Career Profile</span>
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
  <title>Anti-Gravity Career Directory | Elite Candidates & Interactive Resumes</title>
  <meta name="description" content="Discover top candidates defying ordinary resumes. Dedicated career profiles for Full-Time, Remote & Leadership roles.">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <style>
    ${sharedStyles}

    .market-hero {
      text-align: center;
      padding: 50px 0 32px;
      max-width: 860px;
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
      margin-bottom: 18px;
    }
    .market-hero h1 {
      font-size: 3.2rem;
      line-height: 1.15;
      margin-bottom: 16px;
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

    /* Recruiter Filter & Search Hub */
    .filter-hub {
      max-width: 800px;
      margin: 0 auto 40px;
      display: flex;
      flex-direction: column;
      gap: 16px;
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

    .dept-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }
    .filter-chip {
      padding: 8px 16px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      color: var(--text-muted);
      font-size: 0.82rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .filter-chip:hover,
    .filter-chip.active {
      background: rgba(0, 240, 255, 0.15);
      border-color: var(--neon-cyan);
      color: #fff;
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.25);
    }

    /* Candidate Cards */
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
      padding: 26px;
      display: flex;
      flex-direction: column;
      border-radius: 20px;
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
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
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--neon-cyan);
    }

    .dept-tag {
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #c084fc;
      margin-bottom: 4px;
    }

    .card-body {
      flex: 1;
      margin-bottom: 20px;
    }
    .prof-name {
      font-size: 1.35rem;
      margin-bottom: 3px;
    }
    .prof-title {
      color: #e2e8f0;
      font-size: 0.88rem;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .meta-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 14px;
      padding: 6px 10px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .prof-bio {
      color: var(--text-muted);
      font-size: 0.88rem;
      line-height: 1.5;
      margin-bottom: 16px;
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
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .loc-text {
      color: var(--text-subtle);
      font-size: 0.85rem;
    }
    .btn-card {
      padding: 8px 16px;
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
  <canvas id="space-canvas"></canvas>
  <div class="cosmic-orb orb-1"></div>
  <div class="cosmic-orb orb-2"></div>

  <div class="container">
    <!-- Navigation -->
    <nav class="nav-bar">
      <a href="./index.html" class="nav-logo">
        <span class="nav-logo-icon">▲</span>
        <span>Anti-Gravity Career Directory</span>
      </a>
      <div style="display: flex; align-items: center; gap: 14px;">
        <div class="status-badge" style="display: none; @media(min-width: 640px){ display: inline-flex; }">
          <span class="pulse-dot"></span>
          <span>Recruiter Engine Live</span>
        </div>
        <a href="./join.html" class="btn-gravity" style="padding: 9px 18px; font-size: 0.88rem;">
          <span>⚡ Create Career Profile</span>
        </a>
      </div>
    </nav>

    <!-- Marketplace Hero -->
    <header class="market-hero">
      <div class="hero-badge">Next-Gen Professional Profiles</div>
      <h1>Replace Boring Resumes. <br/><span class="gradient-text">Discover Verified Talent.</span></h1>
      <p>A headless, automated directory of elite engineers, designers, executives, and specialists seeking Full-Time, Remote & Leadership roles.</p>
    </header>

    <!-- Recruiter Filter & Search Hub -->
    <div class="filter-hub">
      <input type="text" id="live-search" class="search-input" placeholder="🔍 Search by skill, title, role, or company (e.g., Fullstack, Cloud, Python, Design Lead)..." />
      
      <div class="dept-filters">
        <button class="filter-chip active" data-dept="all">All Disciplines</button>
        <button class="filter-chip" data-dept="engineering">Engineering & Tech</button>
        <button class="filter-chip" data-dept="design">Design & Creative</button>
        <button class="filter-chip" data-dept="marketing">Marketing & Growth</button>
        <button class="filter-chip" data-dept="finance">Finance & Ops</button>
      </div>
    </div>

    <!-- Professionals Grid -->
    <div class="professionals-grid" id="prof-grid">
      ${cardsHtml}
    </div>

    <!-- Stats Bar -->
    <div class="glass-card stats-bar">
      <div class="stat-item">
        <div class="stat-number">${professionals.length}</div>
        <div class="stat-label">Verified Profiles</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">100%</div>
        <div class="stat-label">Direct Candidate Contact</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">&lt; 40ms</div>
        <div class="stat-label">Edge Load Speed</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">$0/mo</div>
        <div class="stat-label">Platform Maintenance</div>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <p>Anti-Gravity Career Profile Platform · Automated via GitHub Actions & Google Sheets · Jamstack Architecture</p>
    </footer>
  </div>

  <script>
    ${clientScripts}

    // Instant Filter & Search Engine
    const searchInput = document.getElementById('live-search');
    const cards = document.querySelectorAll('.professional-card');
    const filterChips = document.querySelectorAll('.filter-chip');

    let currentDept = 'all';

    function applyFilters() {
      const query = (searchInput?.value || '').toLowerCase().trim();

      cards.forEach((card) => {
        const searchData = card.getAttribute('data-search') || '';
        const cardDept = card.getAttribute('data-department') || '';

        const matchesQuery = !query || searchData.includes(query);
        const matchesDept = currentDept === 'all' || cardDept.includes(currentDept);

        if (matchesQuery && matchesDept) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }

    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentDept = chip.getAttribute('data-dept');
        applyFilters();
      });
    });
  </script>
</body>
</html>`;
}
