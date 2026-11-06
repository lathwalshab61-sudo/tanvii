import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '..', 'data', 'forensicDatabase.json');

console.log('[FORENSIX] Checking forensic database integrity at:', DB_FILE);

if (fs.existsSync(DB_FILE)) {
  const content = fs.readFileSync(DB_FILE, 'utf-8');
  try {
    const data = JSON.parse(content);
    console.log(`[FORENSIX] Database verified successfully:`);
    console.log(`  - Metrics:      ${data.metrics?.length || 0} records`);
    console.log(`  - Capabilities: ${data.capabilities?.length || 0} records`);
    console.log(`  - Cases:        ${data.cases?.length || 0} records`);
    console.log(`  - Resources:    ${data.resources?.length || 0} records`);
    console.log(`  - Inquiries:    ${data.inquiries?.length || 0} records`);
  } catch (err) {
    console.error('[FORENSIX] JSON parsing error in database:', err.message);
  }
} else {
  console.log('[FORENSIX] Database not yet created on disk. It will be generated on server boot.');
}
