import { groq } from 'next-sanity'

// =============================================================
// HOMEPAGE
// =============================================================

export const HOMEPAGE_HERO_QUERY = groq`
  *[_type == "project" && heroOnHome == true][0] {
    title,
    subtitle,
    "slug": slug.current,
    venue,
    "year": date.displayString,
    heroImage {
      ...,
      "alt": alt,
      "caption": caption
    }
  }
`

export const HOMEPAGE_FEATURED_QUERY = groq`
  *[_type == "project" && featured == true] | order(projectNumber asc) [0...3] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    venue,
    "year": date.displayString,
    heroImage {
      ...,
      "alt": alt
    }
  }
`

// =============================================================
// ARCHIVE PAGE
// =============================================================

export const ARCHIVE_LIST_QUERY = groq`
  *[_type == "project"] | order(projectNumber asc) {
    _id,
    projectNumber,
    title,
    subtitle,
    "slug": slug.current,
    category,
    venue,
    "year": date.displayString,
    heroImage {
      ...,
      "alt": alt
    }
  }
`

export const ARCHIVE_BY_CATEGORY_QUERY = groq`
  *[_type == "project" && category == $category] | order(projectNumber asc) {
    _id,
    projectNumber,
    title,
    subtitle,
    "slug": slug.current,
    category,
    venue,
    "year": date.displayString,
    heroImage {
      ...,
      "alt": alt
    }
  }
`

// =============================================================
// PROJECT DETAIL
// =============================================================

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    projectNumber,
    title,
    subtitle,
    venue,
    "dateDisplay": date.displayString,
    format,
    participants,
    heroImage {
      ...,
      "alt": alt,
      "caption": caption
    },
    contextNote,
    gallery[] {
      image {
        ...,
        "alt": alt
      },
      caption,
      layout
    },
    "next": *[
      _type == "project" &&
      projectNumber > ^.projectNumber
    ] | order(projectNumber asc)[0] {
      title,
      "slug": slug.current,
      projectNumber
    }
  }
`

export const ALL_PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`

// =============================================================
// INITIATIVES (Projects page)
// =============================================================

export const INITIATIVES_LIST_QUERY = groq`
  *[_type == "initiative"] | order(startYear desc) {
    _id,
    title,
    "slug": slug.current,
    status,
    startYear,
    summary
  }
`

export const INITIATIVE_BY_SLUG_QUERY = groq`
  *[_type == "initiative" && slug.current == $slug][0] {
    title,
    status,
    startYear,
    summary,
    body,
    externalLink
  }
`

// =============================================================
// SINGLETONS
// =============================================================

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage"][0] {
    mainText,
    practiceAreas,
    collaborators,
    team[] {
      name,
      role,
      portrait
    }
  }
`

export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contactPage"][0] {
    intro,
    email,
    phone,
    instagram,
    location
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    defaultSeoImage,
    footerCopyright
  }
`
