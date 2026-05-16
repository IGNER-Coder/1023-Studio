import { defineArrayMember, defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Hide & Seek"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g. "— Wangari Mathenge". Shown in italic after title.',
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectNumber',
      title: 'Archive number',
      type: 'number',
      description: 'The 001, 002, 003 in the index. Auto-incremented or manual.',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Exhibitions', value: 'exhibitions' },
          { title: 'Studio Visits', value: 'studio-visits' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Editorial', value: 'editorial' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue / Location',
      type: 'string',
      description: 'e.g. "Circle Art Gallery, Nairobi"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'object',
      fields: [
        defineField({ name: 'start', title: 'Start', type: 'date' }),
        defineField({ name: 'end', title: 'End (optional)', type: 'date' }),
        defineField({
          name: 'displayString',
          title: 'Display string',
          type: 'string',
          description: 'How the date shows on the site. e.g. "March — May 2024" or just "2024"',
        }),
      ],
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      description: 'e.g. "Exhibition documentation", "Studio visit", "Editorial commission"',
    }),
    defineField({
      name: 'participants',
      title: 'Artists / Participants',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Names of artists, curators, or collaborators involved',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contextNote',
      title: 'Context note',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      description: 'The 100-200 word wall-label-style text. Plain prose, no headings.',
    }),
    defineField({
      name: 'gallery',
      title: 'Image gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'e.g. "Installation view · west wall"',
            }),
            defineField({
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Full width', value: 'full' },
                  { title: 'Pair — left', value: 'pair-left' },
                  { title: 'Pair — right', value: 'pair-right' },
                  { title: 'Centered, narrow', value: 'centered' },
                ],
              },
              description: 'How this image displays in the project page.',
            }),
          ],
          preview: {
            select: { media: 'image', title: 'caption' },
          },
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage?',
      type: 'boolean',
      description: 'Show this in the 3 "Recent work" entries on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'heroOnHome',
      title: 'Use as homepage hero?',
      type: 'boolean',
      description: 'Only ONE project should have this set. Its hero image becomes the homepage hero.',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Archive number',
      name: 'projectNumberAsc',
      by: [{ field: 'projectNumber', direction: 'asc' as const }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'venue',
      media: 'heroImage',
      number: 'projectNumber',
    },
    prepare({ title, subtitle, media, number }) {
      const num = typeof number === 'number' ? String(number).padStart(3, '0') : '???'
      return { title: `${num} — ${title}`, subtitle, media }
    },
  },
})
