import type { ReactNode, CSSProperties } from 'react'

const toId = (s: string) => s.toLowerCase().replace(/\s+/g, '-')

export const prose: CSSProperties = { fontSize: '13px', color: '#6b7280', lineHeight: '1.7', marginBottom: '16px' }
export const code: CSSProperties = { backgroundColor: '#f4f4f5', borderRadius: '8px', padding: '16px', fontSize: '12px', color: '#1c1c1c', lineHeight: '1.8', display: 'block' }
export const inline: CSSProperties = { backgroundColor: '#f4f4f5', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }

export function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} style={{ paddingBottom: '64px', width: '640px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1c1c1c', marginBottom: '12px' }}>{title}</h2>
      <div style={{ borderBottom: '1px dashed #e5e7eb', width: '100%' }} />
      {children}
    </section>
  )
}

export function DocSubsection({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div id={toId(title)} style={{ minHeight: '40vh', paddingTop: '28px', width: '100%' }}>
      <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#1c1c1c', marginBottom: '12px' }}>{title}</h3>
      {children}
    </div>
  )
}
