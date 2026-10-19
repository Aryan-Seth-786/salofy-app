/* ═══════════════════════════════════════════════════
   SALOFY PWA BOOTSTRAP (Android-first)
   Registers the service worker and surfaces install UI.
   ═══════════════════════════════════════════════════ */

(function initPwa() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
      console.warn('SW registration failed', err);
    });
  });

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    window.SalofyInstallPrompt = deferredPrompt;
    document.dispatchEvent(new CustomEvent('salofy:installable'));
  });

  window.promptSalofyInstall = async function promptSalofyInstall() {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    deferredPrompt = null;
    window.SalofyInstallPrompt = null;
    return choice.outcome === 'accepted';
  };

  // Deep-link style: ?screen=my-bookings after install / share
  window.getPwaLaunchScreen = function getPwaLaunchScreen() {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('screen') || null;
    } catch (_) {
      return null;
    }
  };
})();
