import { defineArrayMember, defineField, defineType } from 'sanity'

export const initiativeType = defineType({
  name: 'initiative',
  title: 'Initiative',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Forthcoming', value: 'forthcoming' },
          { title: 'Completed', value: 'completed' },
        ],
      },
    }),
    defineField({
      name: 'startYear',
      title: 'Start year',
      type: 'number',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'One paragraph shown on the Projects index page.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image', options: { hotspot: true } }),
      ],
      description: 'Long-form text and inline images.',
    }),
    defineField({
      name: 'externalLink',
      title: 'External link',
      type: 'url',
      description: 'Optional — if the initiative has a separate site or document.',
    }),
  ],
})
