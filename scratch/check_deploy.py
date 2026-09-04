import urllib.request
import re
import json

url = 'https://antellay-x.veer2580jag.workers.dev/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
    print('HTML length:', len(html))
    print('HTML head:', html[:300])

    scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
    print('Scripts found:', scripts)

    for s in scripts:
        s_url = s if s.startswith('http') else f'https://antellay-x.veer2580jag.workers.dev/{s.lstrip("/")}'
        print('Fetching script:', s_url)
        s_req = urllib.request.Request(s_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(s_req) as s_resp:
            content = s_resp.read().decode('utf-8')
            print('Script size:', len(content))
            # Check if hero-copy-box is in it
            print('Contains hero-copy-box:', 'hero-copy-box' in content)
            print('Contains hero-btn-video:', 'hero-btn-video' in content)

    # Also check image
    img_url = 'https://antellay-x.veer2580jag.workers.dev/assets/landing/sec1_hero.webp'
    img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(img_req) as img_resp:
        img_bytes = img_resp.read()
        print('Image size from cloudflare:', len(img_bytes))
        with open('scratch/cf_sec1_hero.webp', 'wb') as f:
            f.write(img_bytes)

except Exception as e:
    print('Error:', e)
