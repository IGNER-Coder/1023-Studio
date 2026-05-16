# 1023 Studios

A visual documentation practice website — exhibitions, studio visits, and cultural moments from Nairobi and beyond.

## Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **CMS**: Sanity v3 (embedded Studio at `/studio`)
- **Styles**: Tailwind CSS v4
- **Email**: Resend (contact form)
- **Deployment**: Vercel

## Setup

```bash
git clone <repo-url>
cd 1023-studios
npm install
cp .env.example .env.local   # then fill in your values
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

See `.env.example` for required environment variables.

## Content model

| Type | Description |
|---|---|
| `project` | Archive entries — exhibitions, studio visits, editorial. Has gallery, participants, context note. |
| `initiative` | Ongoing or forthcoming studio projects with rich body text. |
| `aboutPage` | Singleton. Practice statement, team, collaborators, practice areas. |
| `contactPage` | Singleton. Contact details surfaced on the contact page. |
| `siteSettings` | Singleton. Site name, tagline, default share image, footer copyright. |

## Deploy

1. Push to GitHub and import the repo into [Vercel](https://vercel.com)
2. Add all env vars from `.env.example` in Vercel → Project → Settings → Environment Variables
3. In Sanity: manage.sanity.io → your project → API → CORS Origins → add your Vercel production URL
4. Set your production domain in `app/sitemap.ts` and `app/robots.ts` (currently `https://1023studios.com`)

## Contact form

The contact form sends via Resend. To use a custom sender address (e.g. `hello@1023studios.com`), verify your domain in the Resend dashboard and update the `from` field in `app/api/contact/route.ts`.

---

Design and development by [Your Name]
