import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPageType = Object.assign(
  defineType({
    name: 'aboutPage',
    title: 'About page',
    type: 'document',
    fields: [
      defineField({
        name: 'mainText',
        title: 'Main text',
        type: 'array',
        of: [defineArrayMember({ type: 'block' })],
        description: 'The 200-word about statement.',
      }),
      defineField({
        name: 'practiceAreas',
        title: 'Practice areas',
        type: 'array',
        of: [defineArrayMember({ type: 'string' })],
        description: 'e.g. "Exhibition & gallery documentation"',
      }),
      defineField({
        name: 'collaborators',
        title: 'Selected collaborators',
        type: 'array',
        of: [defineArrayMember({ type: 'string' })],
        description: 'Galleries, institutions, artists. Plain text list, alphabetical.',
      }),
      defineField({
        name: 'team',
        title: 'Team',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'name', title: 'Name', type: 'string' }),
              defineField({ name: 'role', title: 'Role', type: 'string' }),
              defineField({
                name: 'portrait',
                title: 'Portrait',
                type: 'image',
                options: { hotspot: true },
              }),
            ],
          }),
        ],
      }),
    ],
  }),
  { __experimental_omnisearch_visibility: false },
)
