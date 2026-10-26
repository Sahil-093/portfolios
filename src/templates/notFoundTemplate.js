import { sharedStyles } from './components/styles.js';
import { clientScripts } from './components/clientScripts.js';

export function renderNotFoundPage(options = {}) {
  const basePath = options.basePath || './';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Lost in Deep Orbit | Anti-Gravity Portfolios</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <style>
    ${sharedStyles}
    .not-found-wrap {
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 20px;
    }
    .glitch-code {
      font-size: 6rem;
      font-weight: 800;
      letter-spacing: -0.05em;
      line-height: 1;
      margin-bottom: 12px;
      background: linear-gradient(135deg, var(--neon-cyan), var(--neon-pink));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: float-subtle 4s ease-in-out infinite;
    }
  </style>
</head>
<body>
  <canvas id="space-canvas"></canvas>
  <div class="cosmic-orb orb-1"></div>
  <div class="cosmic-orb orb-2"></div>

  <div class="container">
    <div class="not-found-wrap">
      <div class="glass-card tilt-card float-1" style="padding: 48px 36px; max-width: 550px;">
        <div class="status-badge" style="margin-bottom: 20px;">
          <span class="pulse-dot"></span>
          <span>Gravitational Anomaly Detected</span>
        </div>
        <div class="glitch-code">404</div>
        <h1 style="font-size: 1.8rem; margin-bottom: 14px;">Lost in Deep Orbit</h1>
        <p style="color: var(--text-muted); margin-bottom: 28px;">
          The portfolio coordinates you are searching for have drifted into uncharted celestial territory.
        </p>
        <a href="${basePath}index.html" class="btn-gravity">
          <span>← Return to Orbital Command</span>
        </a>
      </div>
    </div>
  </div>

  <script>
    ${clientScripts}
  </script>
</body>
</html>`;
}
