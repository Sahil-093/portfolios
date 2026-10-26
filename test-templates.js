import { renderDirectoryPage } from './src/templates/directoryTemplate.js';
import { renderProfessionalPage } from './src/templates/professionalTemplate.js';
import { getProfessionalsData } from './src/services/sheetService.js';
import fs from 'fs';
import path from 'path';

console.log('='.repeat(55));
console.log('🌌 PHASE 3 VERIFICATION: UI DESIGN SYSTEM & TEMPLATES');
console.log('='.repeat(55));

async function runVerification() {
  const result = await getProfessionalsData();
  const professionals = result.data;

  console.log(`\n📋 Loaded ${professionals.length} professionals for template testing.`);

  // Test 1: Generate Directory Page
  console.log('🎨 Generating Directory Showcase Template...');
  const directoryHtml = renderDirectoryPage(professionals);
  if (!directoryHtml.includes('<!DOCTYPE html>') || !directoryHtml.includes('Defy Ordinary Portfolios')) {
    throw new Error('Directory HTML generation failed basic validation checks.');
  }
  console.log(`  ✓ Directory HTML generated cleanly (${Math.round(directoryHtml.length / 1024)} KB)`);

  // Test 2: Generate Individual Professional Page
  console.log('🎨 Generating Single Professional Template...');
  const sampleProf = professionals[0];
  const profHtml = renderProfessionalPage(sampleProf);
  if (!profHtml.includes(sampleProf.name) || !profHtml.includes('Core Disciplines')) {
    throw new Error('Professional HTML generation failed basic validation checks.');
  }
  console.log(`  ✓ Professional HTML generated for "${sampleProf.name}" (${Math.round(profHtml.length / 1024)} KB)`);

  // Create a preview folder to verify physical file output
  const previewDir = path.resolve('test-preview');
  if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir, { recursive: true });

  fs.writeFileSync(path.join(previewDir, 'directory-preview.html'), directoryHtml, 'utf-8');
  fs.writeFileSync(path.join(previewDir, 'professional-preview.html'), profHtml, 'utf-8');

  console.log(`\n💾 Saved test preview files to: test-preview/`);
  console.log('✨ Phase 3 Complete: Anti-Gravity UI Design System & Templates are fully functional!\n');
}

runVerification();
