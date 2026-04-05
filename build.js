const fs = require('fs');
const path = require('path');

const root = __dirname;
const outDir = path.join(root, 'dist');

fs.mkdirSync(outDir, { recursive: true });

// CSS files in load order
const cssFiles = [
  'css/tokens.css',
  'css/shell.css',
  'css/components.css',
  'css/screens.css',
];

// JS files in load order
const jsFiles = [
  'js/data.js',
  'js/icons.js',
  'js/shell.js',
  'js/components.js',
  'js/screens/splash.js',
  'js/screens/login.js',
  'js/screens/otp.js',
  'js/screens/home.js',
  'js/screens/search-input.js',
  'js/screens/search-results.js',
  'js/screens/salon-profile.js',
  'js/screens/booking.js',
  'js/screens/booking-confirmed.js',
  'js/screens/notifications.js',
  'js/screens/my-bookings.js',
  'js/screens/favorites.js',
  'js/screens/profile.js',
  'js/screens/deals.js',
  'js/screens/dashboard-growth.js',
  'js/screens/dashboard-premium.js',
  'js/screens/edit-profile.js',
  'js/screens/saved-addresses.js',
  'js/screens/refer-earn.js',
  'js/screens/notification-settings.js',
  'js/screens/help-support.js',
  'js/screens/reschedule.js',
  'js/app.js',
];

// Concatenate CSS
const css = cssFiles
  .map(f => `/* ${f} */\n` + fs.readFileSync(path.join(root, f), 'utf8'))
  .join('\n\n');
fs.writeFileSync(path.join(outDir, 'styles.css'), css);
console.log('✓ dist/styles.css');

// Concatenate JS
const js = jsFiles
  .map(f => `/* ${f} */\n` + fs.readFileSync(path.join(root, f), 'utf8'))
  .join('\n\n');
fs.writeFileSync(path.join(outDir, 'bundle.js'), js);
console.log('✓ dist/bundle.js');

// Update index.html
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Replace all CSS link tags with one
html = html.replace(
  /(\s*<link rel="stylesheet" href="css\/[^"]+">)+/,
  '\n  <link rel="stylesheet" href="styles.css">'
);

// Remove all JS comment lines and script tags pointing to js/ files, inject bundle
html = html.replace(/\s*<!-- JS[^\n]*-->\n/g, '\n');
html = html.replace(/(\s*<script src="js\/[^"]+"><\/script>\n?)+/, '\n  <script src="bundle.js"></script>\n');

fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log('✓ dist/index.html');
console.log('\nDone! Open dist/index.html in your browser.');
