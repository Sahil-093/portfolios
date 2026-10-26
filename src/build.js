import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getProfessionalsData } from './services/sheetService.js';
import { renderDirectoryPage } from './templates/directoryTemplate.js';
import { renderProfessionalPage } from './templates/professionalTemplate.js';
import { renderNotFoundPage } from './templates/notFoundTemplate.js';
import { renderJoinPage } from './templates/joinTemplate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

console.log('='.repeat(58));
console.log('🚀 ANTI-GRAVITY JAMSTACK SSG: COMPILATION PIPELINE');
console.log('='.repeat(58));

async function buildStaticSite() {
  const startTime = Date.now();

  try {
    // Step 1: Clean and recreate output distribution directory
    console.log('\n🧹 Preparing output directory: dist/');
    if (fs.existsSync(DIST_DIR)) {
      fs.rmSync(DIST_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(DIST_DIR, { recursive: true });

    // Step 2: Fetch and normalize dataset from Google Sheets / Data Layer
    console.log('📡 Fetching professional records...');
    const result = await getProfessionalsData();
    const professionals = result.data;
    console.log(`✅ Loaded ${professionals.length} talent profiles from [${result.source.toUpperCase()}]`);

    let pagesRendered = 0;

    // Step 3: Render Root Directory Showcase (dist/index.html)
    console.log('\n🔨 Compiling root marketplace directory (/index.html)...');
    const directoryHtml = renderDirectoryPage(professionals);
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), directoryHtml, 'utf-8');
    pagesRendered++;

    // Step 4: Render Dedicated Professional Portfolios (/professionals/:username/index.html)
    console.log('🔨 Compiling dedicated professional portfolios...');
    const profBaseDir = path.join(DIST_DIR, 'professionals');
    fs.mkdirSync(profBaseDir, { recursive: true });

    // Index redirect for /professionals/ -> ../index.html
    fs.writeFileSync(
      path.join(profBaseDir, 'index.html'),
      `<meta http-equiv="refresh" content="0; url=../index.html">`,
      'utf-8'
    );

    for (const prof of professionals) {
      const userDir = path.join(profBaseDir, prof.username);
      fs.mkdirSync(userDir, { recursive: true });

      const profHtml = renderProfessionalPage(prof, { basePath: '../../' });
      fs.writeFileSync(path.join(userDir, 'index.html'), profHtml, 'utf-8');
      pagesRendered++;
      console.log(`   ↳ [Static Page] /professionals/${prof.username}/index.html (${prof.name})`);
    }

    // Step 5: Render Onboarding / Join Page (dist/join.html)
    console.log('🔨 Compiling Onboarding / Join portal (/join.html)...');
    const joinHtml = renderJoinPage({ basePath: './' });
    fs.writeFileSync(path.join(DIST_DIR, 'join.html'), joinHtml, 'utf-8');
    pagesRendered++;

    // Step 6: Render 404 Anomaly Page (dist/404.html)
    console.log('🔨 Compiling 404 Orbital Anomaly page (/404.html)...');
    const notFoundHtml = renderNotFoundPage({ basePath: './' });
    fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');
    pagesRendered++;

    // Step 7: Create .nojekyll for GitHub Pages (ensures folders with underscores or dotfiles aren't ignored)
    fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '', 'utf-8');

    const duration = Date.now() - startTime;
    console.log('\n' + '='.repeat(58));
    console.log('✨ BUILD COMPLETE: Zero Errors Encountered');
    console.log(`📊 Total Pages Generated: ${pagesRendered}`);
    console.log(`⚡ Compilation Time: ${duration}ms`);
    console.log(`📁 Artifact Target: ${DIST_DIR}`);
    console.log('='.repeat(58) + '\n');
  } catch (error) {
    console.error('\n❌ Build failed with an unexpected error:', error);
    process.exit(1);
  }
}

buildStaticSite();
