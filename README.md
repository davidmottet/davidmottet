# David Mottet — Tech Lead & Full-Stack Developer

> 🇫🇷 Cerbère (66), France · 🌐 [davidmottet.com](https://davidmottet.com) · ✉️ [contact@davidmottet.com](mailto:contact@davidmottet.com) · 💼 [in/davidmottet](https://fr.linkedin.com/in/davidmottet)

Tech Lead and full-stack developer with **12 years of experience**, specialised in modern front-end architectures (**React, Next.js, Vue**) and the technical leadership of engineering teams. From MVP design to production at scale — self-taught engineer, equally at home writing code and defining a technical roadmap.

## 🟢 Availability — going freelance again

**Available for freelance from 19 July 2026.** I'm after a hybrid setup:

- **Freelance** — project work (time & materials or fixed-price): front-end, full-stack, technical consulting.
- **Fixed-term contracts (CDD)** — to reinforce a team or lead a project end to end.
- **Part-time permanent role (CDI)** — ideally combined with freelance projects on the side.

📄 CV available on request — or grab it from [davidmottet.com](https://davidmottet.com).

## 🛠️ What I do

- **Front-end architecture** — React, Next.js, Vue, TypeScript, with a strong focus on performance and Core Web Vitals.
- **APIs & back-end** — Node.js (Express, NestJS, Fastify), REST & GraphQL, PostgreSQL / MySQL / MongoDB.
- **Multi-platform apps** — Flutter & React Native for mobile, Electron for desktop.
- **DevOps** — Docker, CI/CD (GitHub Actions), deployment on AWS / Vercel / Firebase.
- **Technical leadership** — building teams, defining standards, mentoring, owning the roadmap.

## 🌍 This repository

Beyond serving as my GitHub profile, this repo **is the source of [davidmottet.com](https://davidmottet.com)** — a single-page, bilingual (FR/EN) promo site built as plain HTML/CSS/JS and shipped as a Docker container (nginx) onto my own server.

```bash
# Local preview (no Docker needed)
python3 -m http.server 8765                 # → http://localhost:8765

# Or build & run the image directly
docker build -t davidmottet-web .
docker run --rm -p 8080:80 davidmottet-web  # → http://localhost:8080
```

> In production the container is deployed via `docker-compose.yml`, which attaches
> to the server's Traefik network and routes `davidmottet.com` (+ `www`) over HTTPS.

| File | Purpose |
| --- | --- |
| `index.html` · `en/index.html` | The site — French (`/`) and English (`/en/`), separate URLs with `hreflang` for SEO |
| `fonts/` | Self-hosted woff2 fonts + `fonts.css` (no Google Fonts → GDPR-friendly, faster) |
| `robots.txt` · `sitemap.xml` · `site.webmanifest` | SEO / PWA metadata |
| `og-image.png` · `favicon.*` · `icon-*.png` | Social preview + icons |
| `Dockerfile` · `nginx.conf` | Container image (nginx serving the static site) |
| `docker-compose.yml` | Local run + deployment (port / Traefik options) |

> ℹ️ The CV PDFs are intentionally kept **out of Git** (personal documents) — they're baked into the Docker image at build time. Build from a checkout where they're present, not from a fresh clone.

## 🐾 Fun fact

When I'm not coding, I'm walking my American Bully, **Junior**, who makes sure I never forget the value of a good walk and a moment of calm. 🐶

## 📬 Get in touch

- ✉️ **Email** — [contact@davidmottet.com](mailto:contact@davidmottet.com)
- 💼 **LinkedIn** — [in/davidmottet](https://fr.linkedin.com/in/davidmottet)
- 🌐 **Website** — [davidmottet.com](https://davidmottet.com)
