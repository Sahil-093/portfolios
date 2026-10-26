/**
 * Shared Anti-Gravity Visual Design Tokens & Core Stylesheet
 */
export const sharedStyles = `
  :root {
    --bg-dark: #060814;
    --bg-surface: rgba(15, 20, 38, 0.65);
    --bg-surface-hover: rgba(22, 29, 56, 0.85);
    --border-glass: rgba(147, 197, 253, 0.15);
    --border-glass-glow: rgba(0, 240, 255, 0.4);
    
    --neon-cyan: #00f0ff;
    --neon-violet: #a855f7;
    --neon-pink: #ec4899;
    --neon-emerald: #10b981;
    
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --text-subtle: #64748b;
    
    --font-heading: 'Space Grotesk', system-ui, -apple-system, sans-serif;
    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-main);
    font-family: var(--font-sans);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
    min-height: 100vh;
  }

  /* Deep Space Particle Canvas */
  #space-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
  }

  /* Ambient Cosmic Glow Backdrops */
  .cosmic-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    z-index: 0;
    pointer-events: none;
    opacity: 0.35;
    animation: drift 20s infinite alternate ease-in-out;
  }
  .orb-1 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%);
    top: -100px;
    left: -100px;
  }
  .orb-2 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--neon-violet) 0%, transparent 70%);
    bottom: -150px;
    right: -100px;
    animation-delay: -7s;
  }
  .orb-3 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, var(--neon-pink) 0%, transparent 70%);
    top: 40%;
    left: 50%;
    animation-delay: -12s;
  }

  @keyframes drift {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(60px, -40px) scale(1.15); }
    100% { transform: translate(-40px, 50px) scale(0.9); }
  }

  /* Anti-Gravity Floating Physics Keyframes */
  @keyframes float-subtle {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(0.4deg); }
  }

  @keyframes float-medium {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-18px) rotate(-0.6deg); }
  }

  @keyframes float-deep {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-24px) rotate(0.8deg); }
  }

  .float-1 { animation: float-subtle 6s ease-in-out infinite; }
  .float-2 { animation: float-medium 8s ease-in-out infinite; animation-delay: -2s; }
  .float-3 { animation: float-deep 10s ease-in-out infinite; animation-delay: -4s; }

  /* Glassmorphic Container */
  .glass-card {
    background: var(--bg-surface);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-glass);
    border-radius: 20px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
    transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    transform-style: preserve-3d;
    perspective: 1000px;
    position: relative;
    overflow: hidden;
  }

  .glass-card:hover {
    border-color: var(--border-glass-glow);
    box-shadow: 0 16px 48px -8px rgba(0, 240, 255, 0.25), 0 0 20px rgba(168, 85, 247, 0.2);
  }

  .glass-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    opacity: 0.6;
  }

  /* Neon Glow Badges */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 500;
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.4);
    color: #6ee7b7;
  }
  .pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--neon-emerald);
    box-shadow: 0 0 10px var(--neon-emerald);
    animation: blink 2s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  /* Tag Pills */
  .tag-pill {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
    transition: all 0.3s ease;
  }
  .tag-pill:hover {
    background: rgba(0, 240, 255, 0.15);
    border-color: var(--neon-cyan);
    color: #fff;
    transform: translateY(-2px);
  }

  /* Action Buttons */
  .btn-gravity {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    color: #fff;
    background: linear-gradient(135deg, rgba(0, 240, 255, 0.8), rgba(168, 85, 247, 0.8));
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 20px rgba(0, 240, 255, 0.3);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .btn-gravity:hover {
    background: linear-gradient(135deg, #00f0ff, #ec4899);
    box-shadow: 0 8px 30px rgba(0, 240, 255, 0.5);
    transform: translateY(-3px) scale(1.02);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 0.95rem;
    text-decoration: none;
    color: var(--text-main);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-glass);
    transition: all 0.3s ease;
  }
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  /* Typography */
  h1, h2, h3, h4 {
    font-family: var(--font-heading);
    letter-spacing: -0.02em;
    color: #fff;
  }

  .gradient-text {
    background: linear-gradient(135deg, #00f0ff 0%, #c084fc 50%, #f472b6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Responsive layout container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 10;
  }

  /* Navigation Bar */
  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    margin-bottom: 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
    text-decoration: none;
    color: #fff;
  }
  .nav-logo-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
  }

  /* Footer */
  footer {
    margin-top: 80px;
    padding: 40px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    text-align: center;
    color: var(--text-subtle);
    font-size: 0.9rem;
  }
`;
