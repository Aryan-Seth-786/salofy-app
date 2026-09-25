# GLAZZ local splash test

Self-contained folder you can run on your machine.

## Run in `~/Code/Salofy-App`

From your Mac:

```bash
cd ~/Code/Salofy-App
git fetch origin
git checkout cursor/glazz-logo-assets-32ae
git pull origin cursor/glazz-logo-assets-32ae

cd docs/play-store/local-splash
python3 -m http.server 8765
```

Then open: [http://127.0.0.1:8765](http://127.0.0.1:8765)

Or copy just this folder:

```bash
cp -R docs/play-store/local-splash ~/Desktop/glazz-splash-test
cd ~/Desktop/glazz-splash-test
python3 -m http.server 8765
```

> Open via a local server (not `file://`) so images load reliably.

## What’s in here

| File | Purpose |
|------|---------|
| `index.html` | Splash animation demo + Replay button |
| `wordmark.png` | Your preferred GLAZZ wordmark (with artistic ZZ treatment) |
| `drop.png` | Realistic viscous glaze droplet |
| `splash-burst.png` | Photoreal crown splash on impact |

## Motion

1. Drop enters from **top-right**
2. Falls onto the magenta **ZZ** area
3. Realistic splash burst + particle spray
4. Wordmark reveals through the splash
