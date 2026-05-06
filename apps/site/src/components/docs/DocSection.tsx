import type { ReactNode } from 'react'

const toId = (s: string) => s.toLowerCase().replace(/\s+/g, '-')

export function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} style={{ paddingBottom: '64px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1c1c1c', marginBottom: '12px' }}>{title}</h2>
      <div style={{ borderBottom: '1px dashed #e5e7eb' }} />
      {children}
    </section>
  )
}

export function DocSubsection({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div id={toId(title)} style={{ minHeight: '60vh', paddingTop: '48px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1c1c1c', marginBottom: '16px' }}>{title}</h3>
      {children}
    </div>
  )
}
