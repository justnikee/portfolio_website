import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const dynamic = 'force-static'

export async function GET() {
    const font = await readFile(join(process.cwd(), 'app/fonts/a95188992b6e1d54-s.p (1).woff'))
    return new ImageResponse(
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64, background: '#e7e1d3', color: '#181512', fontFamily: 'Portfolio' }}>
            <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4 }}>NIKHIL THAKUR</div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 144, fontWeight: 700, lineHeight: 1.02, letterSpacing: -1 }}><span>I BUILD THINGS</span><span style={{ color: '#d83a1c' }}>FOR THE WEB.</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 25 }}><span>Frontend development · Full-stack products</span><span>doitnikhil.in ↗</span></div>
        </div>,
        { width: 1200, height: 630, fonts: [{ name: 'Portfolio', data: font, weight: 700, style: 'normal' }] },
    )
}
