import { sharedStyles } from './components/styles.js';
import { clientScripts } from './components/clientScripts.js';

/**
 * Renders an Anti-Gravity themed standalone portfolio page for a single professional.
 * @param {Object} professional - Normalized professional record
 * @param {Object} options - Base path and metadata
 * @returns {string} Fully valid HTML document string
 */
export function renderProfessionalPage(professional, options = {}) {
  const basePath = options.basePath || '../../';
  const {
    name,
    username,
    title,
    bio,
    avatarUrl,
    coverUrl,
    skills = [],
    hourlyRate,
    location,
    status,
    socials = {},
    projects = []
  } = professional;

  const socialIcons = [
    { key: 'github', label: 'GitHub', icon: '⚡' },
    { key: 'twitter', label: 'Twitter', icon: '𝕏' },
    { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { key: 'portfolio', label: 'Website', icon: '🌐' }
  ].filter(s => socials[s.key] && socials[s.key].trim() !== '');

  const skillsHtml = skills
    .map(skill => `<span class="tag-pill">${skill}</span>`)
    .join('\n');

  const projectsHtml = projects.length > 0
    ? projects.map((p, idx) => `
        <div class="glass-card tilt-card project-card float-${(idx % 3) + 1}">
          <div class="project-media-wrapper">
            <img src="${p.imageUrl}" alt="${p.title}" class="project-img" loading="lazy" />
            <div class="project-overlay"></div>
          </div>
          <div class="project-body">
            <div class="project-tags">
              ${p.tags.map(t => `<span class="tag-pill tag-mini">${t}</span>`).join('')}
            </div>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.description}</p>
            <div class="project-footer">
              <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="btn-gravity btn-mini">
                <span>Explore Project</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      `).join('\n')
    : `<div class="empty-projects glass-card"><p>New exploratory zero-gravity projects in progress.</p></div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | Anti-Gravity Portfolio</title>
  <meta name="description" content="${bio}">
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <style>
    ${sharedStyles}

    /* Professional Profile Header Specifics */
    .hero-banner {
      position: relative;
      border-radius: 24px;
      padding: 48px 36px;
      margin-top: 16px;
      margin-bottom: 40px;
      background: linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(6, 8, 20, 0.95) 100%);
      border: 1px solid var(--border-glass);
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 36px;
      align-items: center;
    }

    @media (max-width: 860px) {
      .hero-banner {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 32px 20px;
      }
    }

    .avatar-wrapper {
      position: relative;
      width: 140px;
      height: 140px;
      margin: 0 auto;
    }
    .avatar-halo {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      background: linear-gradient(45deg, var(--neon-cyan), var(--neon-violet), var(--neon-pink));
      filter: blur(8px);
      opacity: 0.85;
      animation: float-medium 6s infinite ease-in-out;
    }
    .avatar-img {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid rgba(255, 255, 255, 0.8);
      z-index: 2;
    }

    .hero-info h1 {
      font-size: 2.2rem;
      margin-bottom: 6px;
    }
    .hero-info .role-title {
      font-size: 1.15rem;
      color: var(--neon-cyan);
      font-weight: 500;
      margin-bottom: 12px;
    }
    .hero-info .meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      margin-bottom: 16px;
      color: var(--text-muted);
      font-size: 0.9rem;
    }
    @media (max-width: 860px) {
      .hero-info .meta-row {
        justify-content: center;
      }
    }

    .hero-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Section Headers */
    .section-title {
      font-size: 1.5rem;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.15), transparent);
    }

    /* Skills Box */
    .skills-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 48px;
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 28px;
      margin-bottom: 60px;
    }

    .project-card {
      display: flex;
      flex-direction: column;
      border-radius: 18px;
      overflow: hidden;
    }
    .project-media-wrapper {
      position: relative;
      height: 200px;
      overflow: hidden;
      background: #0d1124;
    }
    .project-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .project-card:hover .project-img {
      transform: scale(1.08);
    }
    .project-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(15, 20, 38, 0.9) 0%, transparent 60%);
    }
    .project-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .tag-mini {
      font-size: 0.7rem;
      padding: 2px 8px;
    }
    .project-title {
      font-size: 1.25rem;
      margin-bottom: 8px;
    }
    .project-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 20px;
      flex: 1;
    }
    .project-footer {
      display: flex;
      justify-content: flex-end;
    }
    .btn-mini {
      padding: 8px 16px;
      font-size: 0.85rem;
    }

    /* Social Float Dock */
    .social-dock {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }
    @media (max-width: 860px) {
      .social-dock {
        justify-content: center;
      }
    }
    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .social-link:hover {
      background: var(--neon-cyan);
      color: #000;
      transform: translateY(-3px);
      box-shadow: 0 0 15px var(--neon-cyan);
    }
  </style>
</head>
<body>
  <!-- Space Background Canvas -->
  <canvas id="space-canvas"></canvas>

  <!-- Ambient Light Orbs -->
  <div class="cosmic-orb orb-1"></div>
  <div class="cosmic-orb orb-2"></div>
  <div class="cosmic-orb orb-3"></div>

  <div class="container">
    <!-- Navigation -->
    <nav class="nav-bar">
      <a href="${basePath}index.html" class="nav-logo">
        <span class="nav-logo-icon">▲</span>
        <span>Anti-Gravity Portfolios</span>
      </a>
      <a href="${basePath}index.html" class="btn-secondary">
        <span>← All Specialists</span>
      </a>
    </nav>

    <!-- Hero Banner Profile -->
    <header class="hero-banner tilt-card float-1">
      <div class="avatar-wrapper">
        <div class="avatar-halo"></div>
        <img src="${avatarUrl}" alt="${name}" class="avatar-img">
      </div>

      <div class="hero-info">
        <div class="status-badge" style="margin-bottom: 12px;">
          <span class="pulse-dot"></span>
          <span>${status}</span>
        </div>
        <h1>${name}</h1>
        <p class="role-title">${title}</p>
        <div class="meta-row">
          <span>📍 ${location}</span>
          <span>💰 ${hourlyRate}</span>
          <span>⚡ @${username}</span>
        </div>
        <p style="color: var(--text-muted); max-width: 650px;">${bio}</p>

        <!-- Social Links -->
        <div class="social-dock">
          ${socialIcons.map(s => `
            <a href="${socials[s.key]}" target="_blank" rel="noopener noreferrer" class="social-link" title="${s.label}">
              ${s.icon}
            </a>
          `).join('')}
        </div>
      </div>

      <div class="hero-actions">
        <a href="mailto:contact@${username}.com" class="btn-gravity">
          <span>Hire Specialist</span>
          <span>→</span>
        </a>
      </div>
    </header>

    <!-- Core Skills -->
    <section>
      <h2 class="section-title">Core Disciplines & Technologies</h2>
      <div class="skills-wrapper">
        ${skillsHtml}
      </div>
    </section>

    <!-- Selected Works -->
    <section>
      <h2 class="section-title">Gravitational Works & Case Studies</h2>
      <div class="projects-grid">
        ${projectsHtml}
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <p>© ${new Date().getFullYear()} ${name} · Generated on the Anti-Gravity Platform · Hosted on GitHub Pages</p>
    </footer>
  </div>

  <script>
    ${clientScripts}
  </script>
</body>
</html>`;
}
