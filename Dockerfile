# Static promo site for davidmottet.com — served by nginx.
# No build step: the site is plain HTML/CSS/JS.
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="davidmottet.com" \
      org.opencontainers.image.description="David Mottet — personal promo site" \
      org.opencontainers.image.authors="contact@davidmottet.com" \
      org.opencontainers.image.source="https://github.com/davidmottet/davidmottet"

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Site + the polished CVs.
# NOTE: the CV PDFs are gitignored (personal docs), so this build MUST run from
# a context where CV_David_Mottet_EN.pdf and CV_David_Mottet_FR.pdf are present
# on disk (e.g. your local checkout), not from a fresh `git clone`.
COPY index.html robots.txt sitemap.xml site.webmanifest \
     favicon.ico favicon.svg apple-touch-icon.png \
     icon-192.png icon-512.png og-image.png \
     /usr/share/nginx/html/
COPY fonts/ /usr/share/nginx/html/fonts/
COPY en/ /usr/share/nginx/html/en/
COPY CV_David_Mottet_EN.pdf CV_David_Mottet_FR.pdf /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1
