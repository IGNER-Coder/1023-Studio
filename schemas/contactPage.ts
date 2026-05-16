import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram handle',
      type: 'string',
      description: 'Without the @',
    }),
    defineField({
      name: 'location',
      title: 'Location line',
      type: 'string',
      initialValue: 'Based in Nairobi.',
    }),
  ],
})
