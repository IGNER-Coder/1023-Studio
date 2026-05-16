import { ImageResponse } from 'next/og'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PROJECT_BY_SLUG_QUERY } from '@/sanity/lib/queries'

export const runtime = 'edge'
export const alt = '1023 Studios — Archive project'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            background: '#FAFAF7',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1A1A1A',
            fontSize: 48,
            fontFamily: 'serif',
            letterSpacing: '-0.02em',
            fontWeight: 300,
          }}
        >
          1023 Studios
        </div>
      ),
      { ...size },
    )
  }

  const heroUrl = urlFor(project.heroImage)
    .width(1400)
    .height(900)
    .fit('crop')
    .quality(85)
    .url()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#FAFAF7',
        }}
      >
        {/* LEFT — Hero image, 65% width */}
        <div
          style={{
            width: '65%',
            height: '100%',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroUrl}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* RIGHT — Metadata panel, 35% width */}
        <div
          style={{
            width: '35%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '48px 40px',
            background: '#FAFAF7',
          }}
        >
          {/* Top — Studio wordmark */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              fontFamily: 'sans-serif',
              fontWeight: 500,
            }}
          >
            1023 Studios
          </div>

          {/* Middle — Project title block */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#6B6B68',
                marginBottom: 16,
                fontFamily: 'sans-serif',
              }}
            >
              {String(project.projectNumber).padStart(3, '0')} · Archive
            </div>
            <div
              style={{
                fontSize: 42,
                lineHeight: 1.05,
                color: '#1A1A1A',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                marginBottom: 10,
                fontFamily: 'serif',
              }}
            >
              {project.title}
            </div>
            {project.subtitle && (
              <div
                style={{
                  fontSize: 20,
                  lineHeight: 1.2,
                  color: '#6B6B68',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontFamily: 'serif',
                }}
              >
                {project.subtitle}
              </div>
            )}
          </div>

          {/* Bottom — Venue + date */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#6B6B68',
              fontFamily: 'sans-serif',
            }}
          >
            <div>{project.venue}</div>
            <div>{project.dateDisplay}</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
