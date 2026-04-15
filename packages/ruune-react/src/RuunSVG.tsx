import { useRef, useEffect } from "react";
import { initMorphSvg, morphSvg, SpringConfig } from 'ruun'
interface RuunProps {
    from: string,
    to: string,
    config?: SpringConfig
    className?: string
    active: boolean
}

function extractViewBox(svgString: string): string {
    const match = svgString.match(/viewBox=["']([^"']+)["']/)
    return match?.[1] ?? '0 0 24 24'
}

export function RuunSVG ({from, to, config, className, active} : RuunProps) {
    const viewBox = extractViewBox(from)
    const svgRef = useRef<SVGSVGElement | null>(null)
    const isMounted = useRef(false)

    useEffect (() => {
    if(!svgRef.current) return

    initMorphSvg(svgRef.current, from)
    isMounted.current = true

    }, [])

    useEffect (() => {
    if(!svgRef.current || !isMounted.current) return
       if(active == true) {
        morphSvg(svgRef.current, to, config)
       } else {
        morphSvg(svgRef.current, from, config)
       }

    }, [active])

    return (
        <svg viewBox={viewBox} ref={svgRef} className={className}></svg>
    )

}