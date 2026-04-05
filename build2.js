const fs = require('fs');
const path = require('path');

const root = __dirname;
const outDir = path.join(root, 'dist2');

fs.mkdirSync(outDir, { recursive: true });

// CSS files in load order
const cssFiles = [
  'css/tokens.css',
  'css/components.css',
  'css/screens.css',
];

// App-mode CSS overrides (replaces phone shell with full-screen layout)
const appCssOverrides = `
/* ── App Mode: full-screen layout ── */
body {
  background: var(--bg);
  overflow: hidden;
}

.phone-shell {
  width: 100vw;
  min-height: 100vh;
  border-radius: 0;
  border: none;
  box-shadow: none;
}

.phone-notch { display: none; }
.phone-status { display: none; }

.phone-content {
  height: calc(100vh - 78px);
  overflow-y: auto;
  padding-bottom: 0;
  -webkit-overflow-scrolling: touch;
}

.phone-content--no-nav {
  height: 100vh;
  padding-bottom: 0;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, var(--surface) 85%, transparent);
}

.bottom-nav--dashboard {
  background: linear-gradient(to top, #1A1A28 85%, transparent);
}
`;

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
  'js/app2.js',
];

// Concatenate CSS
const css = cssFiles
  .map(f => `/* ${f} */\n` + fs.readFileSync(path.join(root, f), 'utf8'))
  .join('\n\n') + '\n\n' + appCssOverrides;
fs.writeFileSync(path.join(outDir, 'styles.css'), css);
console.log('✓ dist2/styles.css');

// Concatenate JS
const js = jsFiles
  .map(f => `/* ${f} */\n` + fs.readFileSync(path.join(root, f), 'utf8'))
  .join('\n\n');
fs.writeFileSync(path.join(outDir, 'bundle.js'), js);
console.log('✓ dist2/bundle.js');

// Write index.html
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Salofy</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log('✓ dist2/index.html');
console.log('\nDone! Open dist2/index.html in your browser.');
