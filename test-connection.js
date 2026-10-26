import { getProfessionalsData } from './src/services/sheetService.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('='.repeat(50));
console.log('🌌 ANTI-GRAVITY PORTFOLIO PLATFORM: CONNECTION TEST');
console.log('='.repeat(50));

async function runTest() {
  try {
    const result = await getProfessionalsData();
    console.log(`\n✅ Data Pipeline Status: OPERATIONAL`);
    console.log(`📡 Data Source: [${result.source.toUpperCase()}]`);

    if (result.source === 'mock-dataset') {
      console.log(`👥 Sample Records Available: ${result.data.length}`);
      result.data.forEach((p, idx) => {
        console.log(`   ${idx + 1}. ${p.name} (@${p.username}) - ${p.title}`);
      });
      console.log('\n💡 Note: You can link a live Google Sheet anytime by adding GOOGLE_SPREADSHEET_ID in .env');
    } else {
      console.log(`📊 Raw Rows Fetched: ${result.data.length}`);
    }

    console.log('\n✨ Phase 1 Authentication & Scaffolding is complete!\n');
  } catch (error) {
    console.error('❌ Connection test error:', error);
  }
}

runTest();
