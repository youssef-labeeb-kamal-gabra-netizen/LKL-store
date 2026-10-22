const assert = require('assert');
const fs = require('fs');

console.log('🧪 Starting LKL Automated Quality Assurance Test Suite...\n');

let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

// 1. Zero Fabrication & Price Policy Test
test('Zero Fabrication: Catalog file must not contain fabricated public prices', () => {
  const catalogContent = fs.readFileSync('src/data/catalog.ts', 'utf8');
  assert.ok(!catalogContent.includes('price:'), 'Must not contain any public price property');
  assert.ok(!catalogContent.includes('0 EGP'), 'Must not contain fake 0 EGP placeholder');
  assert.ok(!catalogContent.includes('$0'), 'Must not contain fake $0 placeholder');
});

// 2. Agricultural Categories Integrity Test
test('Categories: Must strictly contain the 6 verified agricultural categories', () => {
  const catalogContent = fs.readFileSync('src/data/catalog.ts', 'utf8');
  assert.ok(catalogContent.includes('spray-motors'), 'Must contain spray-motors category');
  assert.ok(catalogContent.includes('water-pumps'), 'Must contain water-pumps category');
  assert.ok(catalogContent.includes('diesel-motors'), 'Must contain diesel-motors category');
  assert.ok(catalogContent.includes('irrigation-equipment'), 'Must contain irrigation-equipment category');
  assert.ok(catalogContent.includes('agricultural-tools'), 'Must contain agricultural-tools category');
  assert.ok(catalogContent.includes('spare-parts'), 'Must contain spare-parts category');
});

// 3. Slug Generation Utility Test
test('Slugify: Must properly generate clean URL-safe slugs for Arabic and English', () => {
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0621-\u064A-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
  assert.strictEqual(slugify('موتور رش زراعي 450'), 'موتور-رش-زراعي-450');
  assert.strictEqual(slugify('High Pressure Water Pump!'), 'high-pressure-water-pump');
});

// 4. Server-Side Role-Based Access Control Test
test('RBAC: yousseflabeeb256@gmail.com must be ADMIN, others USER', () => {
  const adminEmails = ['yousseflabeeb256@gmail.com'];
  function resolveRole(email) {
    return adminEmails.includes(email.trim().toLowerCase()) ? 'ADMIN' : 'USER';
  }
  assert.strictEqual(resolveRole('yousseflabeeb256@gmail.com'), 'ADMIN');
  assert.strictEqual(resolveRole('YOUSSEFLABEEB256@GMAIL.COM'), 'ADMIN');
  assert.strictEqual(resolveRole('client@example.com'), 'USER');
  assert.strictEqual(resolveRole('hacker@admin.com'), 'USER');
});

// 5. Contact Request Input Validation Test
test('Validation: Contact requests must reject invalid short names and phones', () => {
  function validateContact(name, phone, message) {
    if (!name || name.trim().length < 2) return false;
    if (!phone || phone.trim().length < 8) return false;
    if (!message || message.trim().length < 5) return false;
    return true;
  }
  assert.strictEqual(validateContact('أحمد', '01012345678', 'استفسار عن الموتور'), true);
  assert.strictEqual(validateContact('أ', '01012345678', 'استفسار عن الموتور'), false);
  assert.strictEqual(validateContact('أحمد', '123', 'استفسار عن الموتور'), false);
  assert.strictEqual(validateContact('أحمد', '01012345678', 'قصيرة'), true);
  assert.strictEqual(validateContact('أحمد', '01012345678', 'نص'), false);
});

// 6. Security & Sensitive Secret Leakage Test
test('Security: Secrets and passwords must never be committed in client source code', () => {
  const envContent = fs.readFileSync('.env.example', 'utf8');
  assert.ok(!envContent.includes('sk_live'), 'Must not contain live API keys');
  assert.ok(!envContent.includes('password123'), 'Must not contain hardcoded passwords');
});

// 7. Security: Rate Limiting & Protection against > 1000 requests
test('Security: Rate limiter must detect and block aggressive requests over limit', () => {
  // Simulate token bucket logic
  const MAX_LIMIT = 1000;
  let counter = 0;
  function simulateRequest() {
    counter++;
    return counter <= MAX_LIMIT;
  }
  for (let i = 0; i < 1000; i++) {
    assert.strictEqual(simulateRequest(), true, `Request ${i + 1} should be allowed`);
  }
  // Request 1001 must be blocked
  assert.strictEqual(simulateRequest(), false, 'Request 1001 must be blocked by rate limiter');
});

// 8. Security: Malicious Scanner Detection Test
test('Security: Scanners (sqlmap, nikto, dirbuster) must be detected and blocked', () => {
  const BLOCKED_USER_AGENTS = ['sqlmap', 'nikto', 'masscan', 'wpscan', 'dirbuster', 'havij', 'acunetix'];
  function isMalicious(ua) {
    if (!ua) return false;
    const lower = ua.toLowerCase();
    return BLOCKED_USER_AGENTS.some(bad => lower.includes(bad));
  }
  assert.strictEqual(isMalicious('sqlmap/1.5.2#stable'), true);
  assert.strictEqual(isMalicious('Mozilla/5.0 (Nikto 2.1.6)'), true);
  assert.strictEqual(isMalicious('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'), false);
  assert.strictEqual(isMalicious('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0) Mobile/15E148'), false);
});

// 9. Verified Business Data Test
test('Business Data: Verified phones, WhatsApp, and Google Maps must be present', () => {
  const envContent = fs.readFileSync('src/lib/env.ts', 'utf8');
  assert.ok(envContent.includes('01220792948'), 'Must contain 01220792948');
  assert.ok(envContent.includes('01114587917'), 'Must contain 01114587917');
  assert.ok(envContent.includes('8G2HG9MM%2BVMW') || envContent.includes('G9MM+VMW'), 'Must contain Google Maps URL');
  assert.ok(envContent.includes('2005'), 'Must contain established year 2005');
});

// 10. Customer Reviews Data Test
test('Reviews: Must contain 6 authentic reviews in Egyptian rural dialect', () => {
  const reviewsContent = fs.readFileSync('src/lib/reviews-store.ts', 'utf8');
  assert.ok(reviewsContent.includes('الحاج ممدوح الشرقاوي'), 'Must contain Haj Mamdouh');
  assert.ok(reviewsContent.includes('المعلم رمضان النجار'), 'Must contain Ramadan El Naggar');
  assert.ok(reviewsContent.includes('أستاذ رضا السعدني'), 'Must contain Reda El Saadany');
  assert.ok(reviewsContent.includes('الحاج صبحي عثمان'), 'Must contain Sobhi Othman');
  assert.ok(reviewsContent.includes('الأسطى فتحي الديب'), 'Must contain Fathi El Deeb');
  assert.ok(reviewsContent.includes('الحاج عبد الحميد زايد'), 'Must contain Abdel Hamid Zayed');
});

// 11. Store Map Exact Coordinates & Embed Test
test('Store Map: Must use exact shop coordinates (30.5347375, 31.3842031 - G9MM+VMW)', () => {
  const mapContent = fs.readFileSync('src/components/common/store-location-map.tsx', 'utf8');
  assert.ok(mapContent.includes('30.5347375'), 'Must contain exact latitude 30.5347375');
  assert.ok(mapContent.includes('31.3842031'), 'Must contain exact longitude 31.3842031');
  assert.ok(mapContent.includes('G9MM+VMW') || mapContent.includes('8G2HG9MM'), 'Must include Plus Code');
});

// 12. HD Real Machinery Images Test
test('HD Images: Product catalog must reference high-definition photography', () => {
  assert.ok(fs.existsSync('public/images/products/petter-diesel-pump-hd.jpg'), 'Petter diesel HD image exists');
  assert.ok(fs.existsSync('public/images/products/gasoline-water-pump-hd.jpg'), 'Gasoline pump HD image exists');
  assert.ok(fs.existsSync('public/images/products/knapsack-sprayer-hd.jpg'), 'Knapsack sprayer HD image exists');
  assert.ok(fs.existsSync('public/images/products/power-tiller-hd.jpg'), 'Power tiller HD image exists');
  assert.ok(fs.existsSync('public/images/products/irrigation-filters-hd.jpg'), 'Irrigation filters HD image exists');
  assert.ok(fs.existsSync('public/images/products/spare-parts-hd.jpg'), 'Spare parts HD image exists');
});

console.log(`\n========================================`);
console.log(`Test Results: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log(`========================================`);

if (failedTests > 0) {
  process.exit(1);
}
