import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY, CONTACT_PAGE_QUERY } from '@/sanity/lib/queries'

export default async function Footer() {
  const [settings, contact] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(CONTACT_PAGE_QUERY),
  ])

  return (
    <footer className="border-t border-ink mt-32 md:mt-40">
      {/* Colophon top strip */}
      <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-center px-6 md:px-14 py-3 border-b border-rule">
        <span className="text-[10px] tracking-meta uppercase text-dust">End. — Colophon</span>
        <span className="h-px bg-rule" />
        <span className="text-[10px] tracking-meta uppercase text-dust">Return to top ↑</span>
      </div>

      <div className="px-6 md:px-14 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Big serif statement */}
          <div className="md:col-span-7">
            <p className="font-serif font-light text-3xl md:text-4xl leading-[1.1] tracking-tight text-ink">
              We document what art<br />
              <em className="italic">leaves behind.</em>
            </p>
          </div>

          {/* Contact column */}
          <div className="md:col-span-3 md:col-start-9">
            <div className="text-[10px] tracking-meta uppercase font-medium mb-3">
              <span className="font-serif italic font-normal normal-case tracking-normal text-dust mr-1.5">i.</span>
              Inquiries
            </div>
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="block text-[13px] hover:text-terracotta transition-colors"
              >
                {contact.email}
              </a>
            )}
            {contact?.instagram && (
              <a
                href={`https://instagram.com/${contact.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[10px] tracking-meta uppercase text-dust mt-2 hover:text-terracotta transition-colors"
              >
                @{contact.instagram}
              </a>
            )}

            <div className="text-[10px] tracking-meta uppercase font-medium mt-8 mb-3">
              <span className="font-serif italic font-normal normal-case tracking-normal text-dust mr-1.5">ii.</span>
              Location
            </div>
            <div className="text-[13px]">Nairobi, Kenya</div>
          </div>
        </div>
      </div>

      {/* Bottom credits strip */}
      <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-center px-6 md:px-14 py-4 border-t border-rule">
        <span className="text-[10px] tracking-meta uppercase text-dust">
          {settings?.footerCopyright ?? `© ${new Date().getFullYear()} 1023 Studios`}
        </span>
        <span className="h-px bg-rule" />
        <span className="text-[10px] font-serif italic text-dust">Site as practice.</span>
      </div>
    </footer>
  )
}
