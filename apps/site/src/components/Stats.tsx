import { motion } from 'framer-motion'

const stats = [
  { value: '< 4kb', label: 'Gzipped' },
  { value: '0', label: 'Dependencies' },
  { value: 'Any', label: 'Framework' },
  { value: '100%', label: 'TypeScript' },
]

export default function Stats() {
  return (
    <div className="flex items-center justify-center gap-10 md:justify-between md:gap-0 pt-40 pb-64">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.value}
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-[14px] font-semibold leading-none tracking-tight">{stat.value}</p>
          <p className="text-[8px] uppercase tracking-widest" style={{ color: '#A3A3A3' }}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
