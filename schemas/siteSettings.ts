import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      initialValue: '1023 Studios',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (for meta tags)',
      type: 'string',
    }),
    defineField({
      name: 'defaultSeoImage',
      title: 'Default share image',
      type: 'image',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer copyright line',
      type: 'string',
      initialValue: '© 2025 1023 Studios',
    }),
  ],
})
