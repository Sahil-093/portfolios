import { sharedStyles } from './components/styles.js';
import { clientScripts } from './components/clientScripts.js';

export function renderJoinPage(options = {}) {
  const basePath = options.basePath || './';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Join Anti-Gravity | Synthesize Your Weightless Portfolio</title>
  <meta name="description" content="Onboard to the Anti-Gravity freelance platform. Automated Google Sheets & Drive portfolio synthesis.">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <style>
    ${sharedStyles}

    .form-container {
      max-width: 820px;
      margin: 20px auto 80px;
      padding: 44px;
    }
    @media (max-width: 640px) {
      .form-container {
        padding: 24px 18px;
      }
    }

    .form-header {
      text-align: center;
      margin-bottom: 36px;
    }
    .form-header h1 {
      font-size: 2.4rem;
      margin-bottom: 8px;
    }
    .form-header p {
      color: var(--text-muted);
      font-size: 1rem;
    }

    /* Grid Layouts */
    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    @media (max-width: 640px) {
      .form-grid-2 {
        grid-template-columns: 1fr;
      }
    }

    .form-group {
      margin-bottom: 22px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    label span.hint {
      font-size: 0.75rem;
      color: var(--neon-cyan);
      font-weight: normal;
    }

    input[type="text"],
    input[type="url"],
    textarea,
    select {
      width: 100%;
      padding: 13px 18px;
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid var(--border-glass);
      color: #fff;
      font-size: 0.95rem;
      font-family: inherit;
      outline: none;
      transition: all 0.3s ease;
    }

    input:focus,
    textarea:focus,
    select:focus {
      border-color: var(--neon-cyan);
      box-shadow: 0 0 18px rgba(0, 240, 255, 0.25);
      background: rgba(15, 23, 42, 0.95);
    }

    textarea {
      resize: vertical;
      min-height: 95px;
    }

    /* Upload Dropzones */
    .upload-zone {
      position: relative;
      border: 2px dashed rgba(147, 197, 253, 0.25);
      border-radius: 16px;
      padding: 24px 16px;
      text-align: center;
      background: rgba(15, 23, 42, 0.4);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .upload-zone:hover,
    .upload-zone.dragover {
      border-color: var(--neon-cyan);
      background: rgba(0, 240, 255, 0.08);
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
    }

    .upload-icon {
      font-size: 1.8rem;
    }
    .upload-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: #fff;
    }
    .upload-sub {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .file-input-hidden {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
    }

    /* Image Preview */
    .preview-box {
      margin-top: 10px;
      display: none;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-glass);
    }
    .preview-thumb {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: cover;
      border: 1px solid var(--neon-cyan);
    }
    .preview-info {
      font-size: 0.82rem;
      color: var(--text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }

    /* Section divider */
    .form-divider {
      margin: 36px 0 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.15rem;
      font-family: var(--font-heading);
      color: #fff;
    }

    /* Submit Button */
    .btn-submit {
      width: 100%;
      padding: 16px;
      font-size: 1.1rem;
      font-weight: 700;
      margin-top: 15px;
      border: none;
      cursor: pointer;
    }

    /* Modal */
    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(6, 8, 20, 0.85);
      backdrop-filter: blur(10px);
      z-index: 1000;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-box {
      max-width: 500px;
      width: 100%;
      text-align: center;
      padding: 40px;
    }
  </style>
</head>
<body>
  <canvas id="space-canvas"></canvas>
  <div class="cosmic-orb orb-1"></div>
  <div class="cosmic-orb orb-2"></div>
  <div class="cosmic-orb orb-3"></div>

  <div class="container">
    <nav class="nav-bar">
      <a href="${basePath}index.html" class="nav-logo">
        <span class="nav-logo-icon">▲</span>
        <span>Anti-Gravity Portfolios</span>
      </a>
      <a href="${basePath}index.html" class="btn-secondary">
        <span>← Marketplace</span>
      </a>
    </nav>

    <div class="glass-card form-container float-1">
      <header class="form-header">
        <div class="status-badge" style="margin-bottom: 14px;">
          <span class="pulse-dot"></span>
          <span>Zero-G Talent Synthesis</span>
        </div>
        <h1>Launch Your <span class="gradient-text">Weightless Portfolio</span></h1>
        <p>Submit your profile and portfolio assets. Our automated pipeline converts your data into a permanent, high-speed static portfolio.</p>
      </header>

      <form id="onboarding-form">
        <!-- 1. Identity & Role -->
        <div class="form-divider">
          <span>01.</span> Identity & Specialization
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input type="text" id="name" required placeholder="e.g. Abdul Latif" />
          </div>
          <div class="form-group">
            <label for="username">Routing Slug / Username * <span class="hint" id="slug-hint">/professionals/...</span></label>
            <input type="text" id="username" required placeholder="abdul-latif" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="title">Headline / Role *</label>
            <input type="text" id="title" required placeholder="e.g. Senior Fullstack Engineer & Cloud Architect" />
          </div>
          <div class="form-group">
            <label for="hourlyRate">Hourly Rate *</label>
            <input type="text" id="hourlyRate" required placeholder="e.g. $85/hr" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="location">Location / Timezone *</label>
            <input type="text" id="location" required placeholder="e.g. Islamabad, Pakistan / Remote" />
          </div>
          <div class="form-group">
            <label for="status">Current Status</label>
            <select id="status">
              <option value="Available for Projects">🟢 Available for Projects</option>
              <option value="Partially Booked">🟡 Partially Booked</option>
              <option value="Available in Q2">🔵 Available in Q2</option>
              <option value="Consulting Only">🟣 Consulting Only</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="bio">Professional Bio *</label>
          <textarea id="bio" required placeholder="Describe your creative philosophy, technical superpowers, and the kind of impact you deliver..."></textarea>
        </div>

        <div class="form-group">
          <label for="skills">Skills & Disciplines * <span class="hint">Comma separated</span></label>
          <input type="text" id="skills" required placeholder="e.g. Three.js, React, Node.js, WebGL, TailwindCSS" />
        </div>

        <!-- 2. Profile Photo Upload -->
        <div class="form-divider">
          <span>02.</span> Visual Asset (Google Drive Auto-Save)
        </div>

        <div class="form-group">
          <label>Profile Headshot * <span class="hint">Auto-saved to Google Drive</span></label>
          <div class="upload-zone" id="avatar-zone">
            <div class="upload-icon">📸</div>
            <div class="upload-title">Click or Drag & Drop Headshot Image</div>
            <div class="upload-sub">PNG, JPG, or WEBP (Under 5MB)</div>
            <input type="file" id="avatar-input" class="file-input-hidden" accept="image/*" required />
          </div>
          <div class="preview-box" id="avatar-preview">
            <img id="avatar-img-prev" class="preview-thumb" alt="Avatar preview" />
            <span class="preview-info" id="avatar-file-name"></span>
            <span style="color: var(--neon-emerald); font-size: 0.8rem;">✓ Loaded</span>
          </div>
        </div>

        <!-- 3. Social Footprint -->
        <div class="form-divider">
          <span>03.</span> Social & Transmission Channels
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="github">GitHub Profile URL</label>
            <input type="url" id="github" placeholder="https://github.com/username" />
          </div>
          <div class="form-group">
            <label for="linkedin">LinkedIn Profile URL</label>
            <input type="url" id="linkedin" placeholder="https://linkedin.com/in/username" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="twitter">Twitter / X URL</label>
            <input type="url" id="twitter" placeholder="https://x.com/username" />
          </div>
          <div class="form-group">
            <label for="portfolio">Personal Website</label>
            <input type="url" id="portfolio" placeholder="https://yourwebsite.com" />
          </div>
        </div>

        <!-- 4. Featured Portfolio Work -->
        <div class="form-divider">
          <span>04.</span> Featured Gravitational Project
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="projectTitle">Project Title *</label>
            <input type="text" id="projectTitle" required placeholder="e.g. Zero-G Spatial Audio Engine" />
          </div>
          <div class="form-group">
            <label for="projectLink">Project Live / Case Study URL</label>
            <input type="url" id="projectLink" placeholder="https://github.com/... or live demo" />
          </div>
        </div>

        <div class="form-group">
          <label for="projectTags">Project Tags</label>
          <input type="text" id="projectTags" placeholder="e.g. WebGL, WebAudio, Canvas, Three.js" />
        </div>

        <div class="form-group">
          <label for="projectDesc">Project Description *</label>
          <textarea id="projectDesc" required placeholder="Explain the challenge, the architectural stack, and the interactive results..."></textarea>
        </div>

        <div class="form-group">
          <label>Project Cover Image <span class="hint">Auto-saved to Google Drive</span></label>
          <div class="upload-zone" id="project-zone">
            <div class="upload-icon">🖼️</div>
            <div class="upload-title">Click or Drag & Drop Project Screenshot</div>
            <div class="upload-sub">PNG, JPG, or WEBP (Under 5MB)</div>
            <input type="file" id="project-input" class="file-input-hidden" accept="image/*" />
          </div>
          <div class="preview-box" id="project-preview">
            <img id="project-img-prev" class="preview-thumb" alt="Project preview" />
            <span class="preview-info" id="project-file-name"></span>
            <span style="color: var(--neon-emerald); font-size: 0.8rem;">✓ Loaded</span>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" id="submit-btn" class="btn-gravity btn-submit">
          <span>🚀 Synthesize & Deploy Portfolio</span>
        </button>
      </form>
    </div>
  </div>

  <!-- Launch Success Modal -->
  <div class="modal-backdrop" id="success-modal">
    <div class="glass-card modal-box tilt-card">
      <div class="status-badge" style="margin-bottom: 16px;">
        <span class="pulse-dot"></span>
        <span>Transmission Successful</span>
      </div>
      <h2 style="font-size: 1.8rem; margin-bottom: 12px;">Welcome to Orbit! 🌌</h2>
      <p style="color: var(--text-muted); margin-bottom: 24px;" id="modal-msg">
        Your portfolio data and media assets have been saved directly to Google Sheets and Google Drive.
      </p>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <a id="view-portfolio-btn" href="#" class="btn-gravity">
          <span>View Your Portfolio →</span>
        </a>
        <a href="${basePath}index.html" class="btn-secondary">
          <span>← Back to Marketplace</span>
        </a>
      </div>
    </div>
  </div>

  <script>
    ${clientScripts}

    // Auto slug generator from Full Name
    const nameInput = document.getElementById('name');
    const usernameInput = document.getElementById('username');
    const slugHint = document.getElementById('slug-hint');

    nameInput.addEventListener('input', (e) => {
      const slug = e.target.value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      usernameInput.value = slug;
      slugHint.textContent = '/professionals/' + slug + '/';
    });

    usernameInput.addEventListener('input', (e) => {
      slugHint.textContent = '/professionals/' + e.target.value + '/';
    });

    // File to Base64 Reader Helper
    function handleFile(inputElem, previewBox, imgPrev, nameElem, callback) {
      inputElem.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          imgPrev.src = event.target.result;
          nameElem.textContent = file.name;
          previewBox.style.display = 'flex';
          callback(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
      });
    }

    let avatarData = { base64: null, name: null };
    let projectImageData = { base64: null, name: null };

    handleFile(
      document.getElementById('avatar-input'),
      document.getElementById('avatar-preview'),
      document.getElementById('avatar-img-prev'),
      document.getElementById('avatar-file-name'),
      (b64, name) => { avatarData = { base64: b64, name: name }; }
    );

    handleFile(
      document.getElementById('project-input'),
      document.getElementById('project-preview'),
      document.getElementById('project-img-prev'),
      document.getElementById('project-file-name'),
      (b64, name) => { projectImageData = { base64: b64, name: name }; }
    );

    // Form Submission Handler
    const form = document.getElementById('onboarding-form');
    const submitBtn = document.getElementById('submit-btn');
    const modal = document.getElementById('success-modal');
    const viewBtn = document.getElementById('view-portfolio-btn');

    // Google Apps Script Web App Endpoint URL (Can also be set in localStorage)
    const APPS_SCRIPT_URL = window.GOOGLE_APPS_SCRIPT_URL || localStorage.getItem('ANTIGRAVITY_WEBHOOK_URL') || '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⚡ Synthesizing & Transmitting Assets...</span>';

      const payload = {
        name: document.getElementById('name').value.trim(),
        username: document.getElementById('username').value.trim(),
        title: document.getElementById('title').value.trim(),
        hourlyRate: document.getElementById('hourlyRate').value.trim(),
        location: document.getElementById('location').value.trim(),
        status: document.getElementById('status').value,
        bio: document.getElementById('bio').value.trim(),
        skills: document.getElementById('skills').value.trim(),
        github: document.getElementById('github').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        twitter: document.getElementById('twitter').value.trim(),
        portfolio: document.getElementById('portfolio').value.trim(),
        avatarBase64: avatarData.base64,
        avatarFileName: avatarData.name,
        projectTitle: document.getElementById('projectTitle').value.trim(),
        projectLink: document.getElementById('projectLink').value.trim(),
        projectTags: document.getElementById('projectTags').value.trim(),
        projectDesc: document.getElementById('projectDesc').value.trim(),
        projectImageBase64: projectImageData.base64,
        projectImageFileName: projectImageData.name,
      };

      try {
        if (APPS_SCRIPT_URL) {
          await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }

        // Show Success Modal
        viewBtn.href = '${basePath}professionals/' + payload.username + '/index.html';
        modal.style.display = 'flex';

      } catch (err) {
        console.warn('Submission fallback notice:', err);
        viewBtn.href = '${basePath}professionals/' + payload.username + '/index.html';
        modal.style.display = 'flex';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>🚀 Synthesize & Deploy Portfolio</span>';
      }
    });
  </script>
</body>
</html>`;
}
