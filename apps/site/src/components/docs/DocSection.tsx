import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import CopyIcon from '../../assets/lucide/copy.svg?raw'
import CheckIcon from '../../assets/shapes/check-mark.svg?raw'

const toId = (s: string) => s.toLowerCase().replace(/\s+/g, '-')

export const prose: CSSProperties = { fontSize: '13px', color: '#6b7280', lineHeight: '1.7', marginBottom: '16px' }
export const code: CSSProperties = { backgroundColor: '#f4f4f5', borderRadius: '0 0 8px 8px', padding: '16px', paddingRight: '40px', fontSize: '12px', color: '#404040', lineHeight: '1.8', display: 'block', overflowX: 'auto' }
export const inline: CSSProperties = { backgroundColor: '#f4f4f5', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }

export function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} style={{ paddingBottom: '64px', width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#404040', marginBottom: '12px' }}>{title}</h2>
      <div style={{ borderBottom: '1px dashed #e5e7eb', width: '100%' }} />
      {children}
    </section>
  )
}

export function DocSubsection({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div id={toId(title)} style={{ paddingTop: '28px', paddingBottom: '8px', width: '100%' }}>
      <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#404040', marginBottom: '12px' }}>{title}</h3>
      {children}
    </div>
  )
}

export function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div style={{ position: 'relative', width: '100%', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #d1d5db', backgroundColor: '#f4f4f5' }}>
        <span style={{ fontSize: '10px', color: '#9ca3af' }}>code</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(children)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', color: copied ? '#22c55e' : '#9ca3af', transition: 'color 0.2s' }}
          dangerouslySetInnerHTML={{ __html: copied ? CheckIcon : CopyIcon }}
        />
      </div>
      <pre style={{ margin: 0 }}><code style={code}>{children}</code></pre>
    </div>
  )
}
