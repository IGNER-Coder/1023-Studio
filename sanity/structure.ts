import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('1023 Studios')
    .items([
      // === ARCHIVE ===
      S.listItem()
        .title('Archive')
        .icon(() => '📁')
        .child(
          S.documentTypeList('project')
            .title('Archive — all projects')
            .defaultOrdering([{ field: 'projectNumber', direction: 'asc' }]),
        ),

      S.listItem()
        .title('Featured on homepage')
        .icon(() => '★')
        .child(
          S.documentList()
            .title('Featured projects')
            .filter('_type == "project" && featured == true'),
        ),

      S.divider(),

      // === INITIATIVES ===
      S.listItem()
        .title('Initiatives')
        .icon(() => '◇')
        .child(
          S.documentTypeList('initiative').title('Ongoing initiatives'),
        ),

      S.divider(),

      // === SINGLETONS ===
      S.listItem()
        .title('About page')
        .icon(() => '◐')
        .child(
          S.document().schemaType('aboutPage').documentId('aboutPage'),
        ),

      S.listItem()
        .title('Contact page')
        .icon(() => '✉')
        .child(
          S.document().schemaType('contactPage').documentId('contactPage'),
        ),

      S.divider(),

      // === SETTINGS ===
      S.listItem()
        .title('Site settings')
        .icon(() => '⚙')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
    ])
