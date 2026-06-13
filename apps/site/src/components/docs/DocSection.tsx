import { useState, useContext, createContext, useId } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { RuunSVG } from 'getruun-react'
import CopyIcon from '../../assets/lucide/copy.svg?raw'
import CheckIcon from '../../assets/shapes/check-mark.svg?raw'

const toId = (s: string) => s.toLowerCase().replace(/\s+/g, '-')

export const prose: CSSProperties = { fontSize: '13px', color: '#6b7280', lineHeight: '1.7', marginBottom: '16px' }
export const code: CSSProperties = { backgroundColor: '#f4f4f5', borderRadius: '0 0 8px 8px', padding: '16px', paddingRight: '40px', fontSize: '12px', color: '#404040', lineHeight: '1.8', display: 'block', overflowX: 'auto' }
export const inline: CSSProperties = { backgroundColor: '#f4f4f5', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }

const CopyContext = createContext<{ copiedId: string | null; setCopiedId: (id: string | null) => void }>({
  copiedId: null,
  setCopiedId: () => {},
})

export function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  return (
    <CopyContext.Provider value={{ copiedId, setCopiedId }}>
      <section id={id} style={{ paddingBottom: '64px', width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#404040', marginBottom: '12px' }}>{title}</h2>
        <div style={{ borderBottom: '1px dashed #e5e7eb', width: '100%' }} />
        {children}
      </section>
    </CopyContext.Provider>
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

export function ParamList({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
      {children}
    </div>
  )
}

export function ParamRow({ name, type, required, children }: { name: string; type: string; required?: boolean; children: ReactNode }) {
  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px dashed #e5e7eb' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
        <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 600, color: '#404040' }}>{name}</span>
        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#9ca3af' }}>{type}</span>
        {required && <span style={{ fontSize: '9px', color: '#404040', textTransform: 'uppercase', letterSpacing: '0.08em' }}>required</span>}
      </div>
      <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>{children}</p>
    </div>
  )
}

export function CodeBlock({ children }: { children: string }) {
  const { copiedId, setCopiedId } = useContext(CopyContext)
  const id = useId()
  const copied = copiedId === id

  return (
    <div style={{ position: 'relative', width: '100%', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #d1d5db', backgroundColor: '#f4f4f5' }}>
        <span style={{ fontSize: '10px', color: '#9ca3af' }}>code</span>
        <button
          onClick={() => { navigator.clipboard.writeText(children); setCopiedId(id) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', color: copied ? '#404040' : '#9ca3af' }}
        >
          <RuunSVG className="w-[14px] h-[14px] overflow-visible" viewBox="0 0 24 24" from={CopyIcon} to={CheckIcon} active={copied} config={{ stiffness: 400, damping: 20, mass: 0.8 }} />
        </button>
      </div>
      <pre style={{ margin: 0 }}><code style={code}>{children}</code></pre>
    </div>
  )
}
