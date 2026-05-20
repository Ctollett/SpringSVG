import { createContext } from "react";
import { useState, useEffect } from "react";
import { RuunSVG } from 'ruune-react'
import circleSvg from '../assets/shapes/cursor-circle.svg?raw'
import crosshairSvg from '../assets/shapes/cursor-crosshair.svg?raw'

export function useCursor() {}

export const CursorContext = createContext(null)

export function CursorProvider({children}: {children: React.ReactNode}) {
    const [hover, setHover] = useState(false)
    const [visible, setVisible] = useState(true)
    const [inverted, setInverted] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        document.body.classList.add('custom-cursor')
        return () => document.body.classList.remove('custom-cursor')
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({x: e.clientX, y: e.clientY})
        }
        const handleMouseHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if(target.closest('[data-hover]')) {
                setHover(true)
            } else {
                setHover(false)
            }
            setInverted(!!target.closest('[data-cursor-invert]'))
        }
        const handlePointerDown = (e: PointerEvent) => {
            const target = e.target as HTMLElement
            if (target.closest('[data-drag]')) setVisible(false)
        }
        const handlePointerUp = () => setVisible(true)

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseover", handleMouseHover)
        window.addEventListener("pointerdown", handlePointerDown)
        window.addEventListener("pointerup", handlePointerUp)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseover", handleMouseHover)
            window.removeEventListener("pointerdown", handlePointerDown)
            window.removeEventListener("pointerup", handlePointerUp)
        }
    }, [])

    return (
        <>
         {children}
        <div style={{ position: 'fixed', zIndex: 9999, top: position.y, left: position.x, pointerEvents: 'none', transform: 'translate(-50%, -50%)', opacity: visible ? 1 : 0, filter: inverted ? 'invert(1)' : 'none' }}>
            <RuunSVG
                className="w-[24px] h-[24px] overflow-visible"
                from={circleSvg}
                to={crosshairSvg}
                active={hover}
                
                config={{ stiffness: 400, damping: 25, mass: 0.8 }}
            />
        </div>
        </>
    )
}
