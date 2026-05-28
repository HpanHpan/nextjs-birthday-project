/**
 * generate-qr.mjs
 * Run: node scripts/generate-qr.mjs
 * Output: public/qr-code.png
 *
 * Uses the `qrcode` npm package (pure-JS, no canvas needed for PNG output).
 * If it isn't installed yet the script will tell you how to add it.
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const VERCEL_URL = 'https://nextjs-birthday-project.vercel.app/';
const OUTPUT_PATH = path.resolve(__dirname, '../public/qr-code.png');

let QRCode;
try {
  QRCode = require('qrcode');
} catch {
  console.error(
    '\n❌  The "qrcode" package is not installed.\n' +
    '   Run:  npm install --save-dev qrcode\n' +
    '   Then re-run:  node scripts/generate-qr.mjs\n'
  );
  process.exit(1);
}

await QRCode.toFile(OUTPUT_PATH, VERCEL_URL, {
  type: 'png',
  width: 600,          // px – high-res for print
  margin: 2,           // quiet-zone modules
  color: {
    dark:  '#3d1a4a',  // deep purple dots (matches the web app palette)
    light: '#ffffff',  // white background
  },
  errorCorrectionLevel: 'H',  // highest – survives logos / slight damage
});

console.log(`✅  QR code saved to: ${OUTPUT_PATH}`);
console.log(`    URL encoded: ${VERCEL_URL}`);
console.log('    Open the file to preview, then print or share it as a physical QR code.');
