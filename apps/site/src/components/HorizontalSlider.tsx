import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HorizontalSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  width?: number;
}

const circleSize = 14;
const halfCircleSize = circleSize / 2;

export function HorizontalSlider({ value, onChange, label, width = 140 }: HorizontalSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [expandCircle, setExpandCircle] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    setExpandCircle(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const { left, width } = trackRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const newValue = Math.max(0, Math.min(1, x / width));
    onChange(newValue);
  };

  const onPointerUp = () => {
    isDragging.current = false;
    setExpandCircle(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', userSelect: 'none', WebkitUserSelect: 'none', gap: '4px' }}>
      <div className='flex flex-row gap-4 justify-between items-center w-full'>
        <span style={{ fontSize: '16px', color: 'black', userSelect: 'none', WebkitUserSelect: 'none'}}>{label}</span>
        <span style={{ display: 'flex', justifyContent: 'center', width: '36px', height: '18px', border: '1px solid black', borderRadius: '24px', padding: '4px', fontSize: '8px', color: 'black', userSelect: 'none', WebkitUserSelect: 'none' }}>{Math.round(value * 100)}</span>
      </div>
      <div onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} style={{ cursor: 'pointer', position: 'relative', width: `${width}px`, height: '2px', borderRadius: '4px', backgroundColor: '#e5e7eb', overflow: 'visible' }} ref={trackRef}>
        <div style={{ position: 'absolute', backgroundColor: '#000', width: `${value * width}px`, height: '2px', left: 0, borderRadius: '4px', overflow: 'visible' }} />
        <motion.div transition={{ type: 'spring', stiffness: 200, damping: 35 }} animate={{ width: expandCircle ? 24 : 16, height: expandCircle ? 24 : 16 }} style={{ display: 'flex', justifyContent: 'center', left: value * width - halfCircleSize, top: '50%', transform: 'translateY(-50%)', position: 'absolute', alignItems: 'center', borderRadius: '50%', backgroundColor: 'transparent', border: '1px solid #000' }}>
          <div style={{ height: '12px', width: '12px', borderRadius: '50%', backgroundColor: '#000' }} />
        </motion.div>
      </div>
    </div>
  );
}
