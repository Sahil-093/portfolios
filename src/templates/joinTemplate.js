import { sharedStyles } from './components/styles.js';
import { clientScripts } from './components/clientScripts.js';

export function renderJoinPage(options = {}) {
  const basePath = options.basePath || './';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create Your Anti-Gravity Career Profile | Stand Out to Employers</title>
  <meta name="description" content="Synthesize a 3D weightless career profile and digital resume for Full-Time, Remote & Leadership opportunities.">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <style>
    ${sharedStyles}

    .form-container {
      max-width: 840px;
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
      font-size: 2.3rem;
      margin-bottom: 8px;
    }
    .form-header p {
      color: var(--text-muted);
      font-size: 1rem;
    }

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

    .upload-zone {
      position: relative;
      border: 2px dashed rgba(147, 197, 253, 0.25);
      border-radius: 16px;
      padding: 22px 16px;
      text-align: center;
      background: rgba(15, 23, 42, 0.4);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .upload-zone:hover {
      border-color: var(--neon-cyan);
      background: rgba(0, 240, 255, 0.08);
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
    }

    .upload-icon { font-size: 1.8rem; }
    .upload-title { font-size: 0.9rem; font-weight: 600; color: #fff; }
    .upload-sub { font-size: 0.75rem; color: var(--text-muted); }
    .file-input-hidden { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

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
      width: 48px;
      height: 48px;
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

    .btn-submit {
      width: 100%;
      padding: 16px;
      font-size: 1.1rem;
      font-weight: 700;
      margin-top: 15px;
      border: none;
      cursor: pointer;
    }

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
      max-width: 520px;
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
        <span>Anti-Gravity Career Directory</span>
      </a>
      <a href="${basePath}index.html" class="btn-secondary">
        <span>← All Candidates</span>
      </a>
    </nav>

    <div class="glass-card form-container float-1">
      <header class="form-header">
        <div class="status-badge" style="margin-bottom: 14px;">
          <span class="pulse-dot"></span>
          <span>Universal Career Profile Generator</span>
        </div>
        <h1>Synthesize Your <span class="gradient-text">Interactive Career Profile</span></h1>
        <p>Replace static PDF resumes. Submit your background, resume, and accomplishments for automated edge hosting.</p>
      </header>

      <form id="onboarding-form">
        <!-- 01. Professional Identity -->
        <div class="form-divider">
          <span>01.</span> Professional Identity & Focus
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input type="text" id="name" required placeholder="e.g. Abdul Latif" />
          </div>
          <div class="form-group">
            <label for="username">Profile URL Slug * <span class="hint" id="slug-hint">/professionals/...</span></label>
            <input type="text" id="username" required placeholder="abdul-latif" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="department">Discipline / Industry *</label>
            <select id="department" required>
              <option value="Engineering & Technology">💻 Engineering & Technology</option>
              <option value="Design & Creative">🎨 Design & Creative</option>
              <option value="Marketing & Growth">📈 Marketing & Growth</option>
              <option value="Finance & Operations">💼 Finance & Operations</option>
              <option value="Product & Management">🚀 Product & Management</option>
              <option value="Healthcare & Science">🧬 Healthcare & Science</option>
              <option value="Education & Consulting">📚 Education & Consulting</option>
              <option value="Other Specialist">✨ Other Specialized Field</option>
            </select>
          </div>
          <div class="form-group">
            <label for="title">Current Position / Professional Title *</label>
            <input type="text" id="title" required placeholder="e.g. Senior Software Architect / Marketing Director" />
          </div>
        </div>

        <!-- 02. Career & Employment Preferences -->
        <div class="form-divider">
          <span>02.</span> Employment Preferences & Target Opportunities
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="jobType">Work Preference *</label>
            <select id="jobType">
              <option value="Full-Time (Remote)">🌍 Full-Time (Remote Preferred)</option>
              <option value="Full-Time (Hybrid / On-site)">🏢 Full-Time (Hybrid / On-site)</option>
              <option value="Contract & Leadership">⚡ Contract & Leadership Advisory</option>
              <option value="Open to All Opportunities">✨ Open to All Opportunities</option>
            </select>
          </div>
          <div class="form-group">
            <label for="experience">Years of Experience *</label>
            <select id="experience">
              <option value="1-3 Years Experience">🌱 1 - 3 Years (Early Career)</option>
              <option value="3-5 Years Experience">🚀 3 - 5 Years (Mid-Level)</option>
              <option value="5-8 Years Experience" selected>⭐ 5 - 8 Years (Senior)</option>
              <option value="8-12 Years Experience">🏆 8 - 12 Years (Staff / Principal)</option>
              <option value="12+ Years Leadership">👑 12+ Years (Director / Executive)</option>
            </select>
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="salary">Target Compensation / Salary Expectation</label>
            <input type="text" id="salary" placeholder="e.g. $90k - $110k/yr or Open / Negotiable" />
          </div>
          <div class="form-group">
            <label for="location">Location / Residence *</label>
            <input type="text" id="location" required placeholder="e.g. Islamabad, Pakistan / Global Remote" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="company">Current / Last Organization</label>
            <input type="text" id="company" placeholder="e.g. Horizon Labs / Ex-Google" />
          </div>
          <div class="form-group">
            <label for="education">Highest Degree / Alma Mater</label>
            <input type="text" id="education" placeholder="e.g. BS Computer Science / MBA" />
          </div>
        </div>

        <div class="form-group">
          <label for="bio">Professional Summary *</label>
          <textarea id="bio" required placeholder="Briefly describe your career journey, core technical or strategic achievements, and what you bring to a prospective team..."></textarea>
        </div>

        <div class="form-group">
          <label for="skills">Key Competencies & Technologies * <span class="hint">Comma separated</span></label>
          <input type="text" id="skills" required placeholder="e.g. Python, Cloud Architecture, Team Leadership, CI/CD, React" />
        </div>

        <!-- 03. Assets & Resume (Google Drive Upload) -->
        <div class="form-divider">
          <span>03.</span> Headshot & Official Resume (PDF)
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label>Professional Headshot * <span class="hint">Auto-saved to Drive</span></label>
            <div class="upload-zone" id="avatar-zone">
              <div class="upload-icon">📸</div>
              <div class="upload-title">Upload Photo</div>
              <div class="upload-sub">PNG, JPG, or WEBP</div>
              <input type="file" id="avatar-input" class="file-input-hidden" accept="image/*" required />
            </div>
            <div class="preview-box" id="avatar-preview">
              <img id="avatar-img-prev" class="preview-thumb" alt="Avatar preview" />
              <span class="preview-info" id="avatar-file-name"></span>
              <span style="color: var(--neon-emerald); font-size: 0.8rem;">✓ Loaded</span>
            </div>
          </div>

          <div class="form-group">
            <label>Official Resume (PDF) <span class="hint">Auto-saved to Drive</span></label>
            <div class="upload-zone" id="resume-zone">
              <div class="upload-icon">📄</div>
              <div class="upload-title">Upload Resume / CV (PDF)</div>
              <div class="upload-sub">PDF (Under 10MB)</div>
              <input type="file" id="resume-input" class="file-input-hidden" accept="application/pdf" />
            </div>
            <div class="preview-box" id="resume-preview">
              <span style="font-size: 1.5rem;">📑</span>
              <span class="preview-info" id="resume-file-name"></span>
              <span style="color: var(--neon-emerald); font-size: 0.8rem;">✓ PDF Loaded</span>
            </div>
          </div>
        </div>

        <!-- 04. Social & Verification Links -->
        <div class="form-divider">
          <span>04.</span> Professional Links & Profiles
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="linkedin">LinkedIn Profile URL</label>
            <input type="url" id="linkedin" placeholder="https://linkedin.com/in/username" />
          </div>
          <div class="form-group">
            <label for="github">GitHub / Work Repositories</label>
            <input type="url" id="github" placeholder="https://github.com/username" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="twitter">Twitter / X Profile</label>
            <input type="url" id="twitter" placeholder="https://x.com/username" />
          </div>
          <div class="form-group">
            <label for="portfolio">Personal Website</label>
            <input type="url" id="portfolio" placeholder="https://yourwebsite.com" />
          </div>
        </div>

        <!-- 05. Key Career Initiative / Project -->
        <div class="form-divider">
          <span>05.</span> Highlighted Career Initiative / Case Study
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="projectTitle">Project / Initiative Title *</label>
            <input type="text" id="projectTitle" required placeholder="e.g. Distributed Core Banking Modernization" />
          </div>
          <div class="form-group">
            <label for="projectLink">Live Link / Proof / Repository</label>
            <input type="url" id="projectLink" placeholder="https://example.com" />
          </div>
        </div>

        <div class="form-group">
          <label for="projectTags">Key Tags / Methodologies</label>
          <input type="text" id="projectTags" placeholder="e.g. Cloud Migration, Microservices, Security, Cost Reduction" />
        </div>

        <div class="form-group">
          <label for="projectDesc">Project Impact & Summary *</label>
          <textarea id="projectDesc" required placeholder="Describe what you built or led, and the measurable results delivered..."></textarea>
        </div>

        <div class="form-group">
          <label>Initiative Screenshot / Visual</label>
          <div class="upload-zone" id="project-zone">
            <div class="upload-icon">🖼️</div>
            <div class="upload-title">Upload Project Media (Optional)</div>
            <div class="upload-sub">PNG, JPG, or WEBP</div>
            <input type="file" id="project-input" class="file-input-hidden" accept="image/*" />
          </div>
          <div class="preview-box" id="project-preview">
            <img id="project-img-prev" class="preview-thumb" alt="Project preview" />
            <span class="preview-info" id="project-file-name"></span>
            <span style="color: var(--neon-emerald); font-size: 0.8rem;">✓ Loaded</span>
          </div>
        </div>

        <button type="submit" id="submit-btn" class="btn-gravity btn-submit">
          <span>🚀 Synthesize & Launch Career Profile</span>
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
      <h2 style="font-size: 1.8rem; margin-bottom: 12px;">Career Profile Live! 🚀</h2>
      <p style="color: var(--text-muted); margin-bottom: 24px;" id="modal-msg">
        Your professional data, resume PDF, and media assets have been saved directly to Google Sheets and Google Drive.
      </p>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <a id="view-portfolio-btn" href="#" class="btn-gravity">
          <span>View Career Profile →</span>
        </a>
        <a href="${basePath}index.html" class="btn-secondary">
          <span>← Back to Directory</span>
        </a>
      </div>
    </div>
  </div>

  <script>
    ${clientScripts}

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

    function handleFile(inputElem, previewBox, imgPrev, nameElem, callback) {
      inputElem.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          if (imgPrev) imgPrev.src = event.target.result;
          if (nameElem) nameElem.textContent = file.name;
          previewBox.style.display = 'flex';
          callback(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
      });
    }

    let avatarData = { base64: null, name: null };
    let resumeData = { base64: null, name: null };
    let projectImageData = { base64: null, name: null };

    handleFile(
      document.getElementById('avatar-input'),
      document.getElementById('avatar-preview'),
      document.getElementById('avatar-img-prev'),
      document.getElementById('avatar-file-name'),
      (b64, name) => { avatarData = { base64: b64, name: name }; }
    );

    handleFile(
      document.getElementById('resume-input'),
      document.getElementById('resume-preview'),
      null,
      document.getElementById('resume-file-name'),
      (b64, name) => { resumeData = { base64: b64, name: name }; }
    );

    handleFile(
      document.getElementById('project-input'),
      document.getElementById('project-preview'),
      document.getElementById('project-img-prev'),
      document.getElementById('project-file-name'),
      (b64, name) => { projectImageData = { base64: b64, name: name }; }
    );

    const form = document.getElementById('onboarding-form');
    const submitBtn = document.getElementById('submit-btn');
    const modal = document.getElementById('success-modal');
    const viewBtn = document.getElementById('view-portfolio-btn');

    const APPS_SCRIPT_URL = window.GOOGLE_APPS_SCRIPT_URL || localStorage.getItem('ANTIGRAVITY_WEBHOOK_URL') || '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⚡ Transmitting Career Assets to Google Drive...</span>';

      const payload = {
        name: document.getElementById('name').value.trim(),
        username: document.getElementById('username').value.trim(),
        department: document.getElementById('department').value,
        title: document.getElementById('title').value.trim(),
        jobType: document.getElementById('jobType').value,
        experience: document.getElementById('experience').value,
        salary: document.getElementById('salary').value.trim() || 'Open / Negotiable',
        location: document.getElementById('location').value.trim(),
        company: document.getElementById('company').value.trim(),
        education: document.getElementById('education').value.trim(),
        bio: document.getElementById('bio').value.trim(),
        skills: document.getElementById('skills').value.trim(),
        github: document.getElementById('github').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        twitter: document.getElementById('twitter').value.trim(),
        portfolio: document.getElementById('portfolio').value.trim(),
        avatarBase64: avatarData.base64,
        avatarFileName: avatarData.name,
        resumeBase64: resumeData.base64,
        resumeFileName: resumeData.name,
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

        viewBtn.href = '${basePath}professionals/' + payload.username + '/index.html';
        modal.style.display = 'flex';

      } catch (err) {
        viewBtn.href = '${basePath}professionals/' + payload.username + '/index.html';
        modal.style.display = 'flex';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>🚀 Synthesize & Launch Career Profile</span>';
      }
    });
  </script>
</body>
</html>`;
}
