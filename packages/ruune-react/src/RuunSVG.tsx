import { useRef, useEffect } from "react";
import { initMorphSvg, morphSvg, SpringConfig } from 'ruun'
interface RuunProps {
    from: string,
    to: string,
    config?: SpringConfig
    className?: string
    active: boolean
}

export function RuunSVG ({from, to, config, className, active} : RuunProps) {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect (() => {
    if(!svgRef.current) return

    initMorphSvg(svgRef.current, from)

    }, [])

    useEffect (() => {
    if(!svgRef.current) return      
       if(active == true) {
        morphSvg(svgRef.current, to, config)
       } else {
        morphSvg(svgRef.current, from, config)
       }

    }, [active])

    return (
        <svg ref={svgRef} className={className}></svg>
    )

}