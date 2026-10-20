#!/usr/bin/env python3
"""Generate GLAZZ PWA icons (pure stdlib: struct + zlib). SDF-based AA."""
import struct, zlib, math, os

def smoothstep(e0, e1, x):
    t = max(0.0, min(1.0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)

def sd_rounded_rect(px, py, w, h, r):
    qx = abs(px - w / 2) - (w / 2 - r)
    qy = abs(py - h / 2) - (h / 2 - r)
    ax, ay = max(qx, 0), max(qy, 0)
    return math.hypot(ax, ay) + min(max(qx, qy), 0) - r

def sd_segment(px, py, ax, ay, bx, by):
    abx, aby = bx - ax, by - ay
    apx, apy = px - ax, py - ay
    t = max(0.0, min(1.0, (apx * abx + apy * aby) / (abx * abx + aby * aby)))
    return math.hypot(apx - abx * t, apy - aby * t)

STOPS = [(0.0, (0xfb, 0x71, 0x85)), (0.55, (0xf4, 0x3f, 0x5e)), (1.0, (0x9f, 0x12, 0x39))]

def gradient(px, py, w, h):
    t = (px + py) / (w + h)
    for i in range(len(STOPS) - 1):
        t0, c0 = STOPS[i]; t1, c1 = STOPS[i + 1]
        if t <= t1 or i == len(STOPS) - 2:
            f = max(0.0, min(1.0, (t - t0) / (t1 - t0)))
            return tuple(round(c0[k] + (c1[k] - c0[k]) * f) for k in range(3))

# scissors geometry in a 24x24 viewBox (stroke style, same as app icon)
SCISSORS = [  # (type, params, halfwidth)
    ('circle', (6, 6, 3), 1.05),
    ('circle', (6, 18, 3), 1.05),
    ('seg', (20, 4, 8.12, 15.88), 1.05),
    ('seg', (14.47, 14.48, 20, 20), 1.05),
    ('seg', (8.12, 8.12, 12, 12), 1.05),
]

def sd_scissors(px, py, scale, tx, ty):
    x = (px - tx) / scale; y = (py - ty) / scale
    d = 1e9
    for typ, params, hw in SCISSORS:
        if typ == 'circle':
            cx, cy, r = params
            d = min(d, abs(math.hypot(x - cx, y - cy) - r) - hw)
        else:
            ax, ay, bx, by = params
            d = min(d, sd_segment(x, y, ax, ay, bx, by) - hw)
    return d * scale  # back to pixel units

def render(w, maskable):
    r = 0 if maskable else int(w * 112 / 512)
    scale = (w * 160 / 512) if not maskable else (w * 160 / 512 * 0.8)
    # center the 24-unit glyph: glyph spans ~4..20 units
    tx = w / 2 - 12 * scale
    ty = w / 2 - 12 * scale
    rows = []
    for y in range(w):
        row = bytearray([0])  # filter type 0
        for x in range(w):
            bg = gradient(x, y, w, w)
            if maskable:
                a = 255
            else:
                a = int(255 * (1 - smoothstep(-0.5, 0.5, sd_rounded_rect(x + 0.5, y + 0.5, w, w, r))))
            # stroke coverage (1.5px AA)
            cov = 1 - smoothstep(-1.5, 1.5, sd_scissors(x + 0.5, y + 0.5, scale, tx, ty))
            if cov > 0:
                rgb = tuple(round(bg[k] * (1 - cov) + 255 * cov) for k in range(3))
            else:
                rgb = bg
            row += bytes((rgb[0], rgb[1], rgb[2], a))
        rows.append(bytes(row))
    return b''.join(rows)

def write_png(path, w, maskable):
    raw = render(w, maskable)
    def chunk(typ, data):
        c = typ + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)
    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', w, w, 8, 6, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(raw, 9))
    png += chunk(b'IEND', b'')
    with open(path, 'wb') as f:
        f.write(png)
    print('wrote', path, w, 'x', w, len(png), 'bytes')

out = os.path.dirname(os.path.abspath(__file__))
write_png(os.path.join(out, 'icon-192.png'), 192, False)
write_png(os.path.join(out, 'icon-512.png'), 512, False)
write_png(os.path.join(out, 'icon-maskable-512.png'), 512, True)
write_png(os.path.join(out, 'apple-touch-icon.png'), 180, False)
