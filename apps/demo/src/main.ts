import { morph, parseSvgPath } from 'springsvg'
import starSvg from './assets/star.svg?raw'
import heartSvg from './assets/heart.svg?raw'

// ── shape morpher ────────────────────────────────────────────────────────────

const shape = document.getElementById('shape') as unknown as SVGPathElement
const label = document.getElementById('label') as HTMLParagraphElement

const shapes: Record<string, string> = {
  triangle:  "M 50 10 L 90 90 L 10 90 Z",
  circle:    "M 50 10 C 78 10 90 28 90 50 C 90 72 78 90 50 90 C 22 90 10 72 10 50 C 10 28 22 10 50 10",
  square:    "M 20 20 L 80 20 L 80 80 L 20 80 Z",
  diamond:   "M 50 10 L 90 50 L 50 90 L 10 50 Z",
  squircle:  "M 50 20 C 65 20 80 35 80 50 C 80 65 65 80 50 80 C 35 80 20 65 20 50 C 20 35 35 20 50 20",
  blob:      "M 50 15 C 72 12 90 28 88 50 C 86 72 68 88 50 88 C 32 88 12 72 14 50 C 16 28 28 18 50 15",
  rounded:   "M 50 15 C 70 15 93 55 78 75 C 63 95 37 95 22 75 C 7 55 30 15 50 15",
  star:      parseSvgPath(starSvg) ?? "M 50 10 L 90 90 L 10 90 Z",
  heart:     parseSvgPath(heartSvg) ?? "M 50 10 L 90 90 L 10 90 Z",
}

const keys = Object.keys(shapes)
let shapeIndex = 0

shape.addEventListener('click', () => {
  shapeIndex = (shapeIndex + 1) % keys.length
  const name = keys[shapeIndex]!
  morph(shape, shapes[name]!, { stiffness: 180, damping: 12, mass: 1 })
  label.textContent = name
})

// ── hamburger → X ────────────────────────────────────────────────────────────

const bar1 = document.getElementById('bar1') as unknown as SVGPathElement
const bar2 = document.getElementById('bar2') as unknown as SVGPathElement
const bar3 = document.getElementById('bar3') as unknown as SVGPathElement
const menu = document.getElementById('menu')!
const menuLabel = document.getElementById('menuLabel') as HTMLParagraphElement

const hamburger = {
  bar1: "M 20 30 L 80 30",
  bar2: "M 20 50 L 80 50",
  bar3: "M 20 70 L 80 70",
}

const closeIcon = {
  bar1: "M 25 25 L 75 75",
  bar2: "M 48 50 L 52 50",   // collapses to a tiny centred segment
  bar3: "M 75 25 L 25 75",
}

const menuSpring = { stiffness: 260, damping: 20, mass: 1 }
let isOpen = false

menu.addEventListener('click', () => {

  isOpen = !isOpen
  const targets = isOpen ? closeIcon : hamburger
  morph(bar1, targets.bar1, menuSpring)
  morph(bar2, targets.bar2, menuSpring)
  morph(bar3, targets.bar3, menuSpring)
  menuLabel.textContent = isOpen ? 'close' : 'menu'
})

// ── play → pause ──────────────────────────────────────────────────────────────

const playLeft  = document.getElementById('playLeft')  as unknown as SVGPathElement
const playRight = document.getElementById('playRight') as unknown as SVGPathElement
const playPause = document.getElementById('playPause')!
const playLabel = document.getElementById('playLabel') as HTMLParagraphElement

const playState = {
  left:  "M 32 22 L 55 36 L 55 64 L 32 78 Z",
  right: "M 55 36 L 78 50 L 55 64 Z",
}

const pauseState = {
  left:  "M 28 20 L 44 20 L 44 80 L 28 80 Z",
  right: "M 56 20 L 72 20 L 72 80 L 56 80 Z",
}

const playSpring = { stiffness: 260, damping: 20, mass: 1 }
let isPlaying = true

playPause.addEventListener('click', () => {
  isPlaying = !isPlaying
  const targets = isPlaying ? playState : pauseState
  morph(playLeft,  targets.left,  playSpring)
  morph(playRight, targets.right, playSpring)
  playLabel.textContent = isPlaying ? 'click to pause' : 'click to play'
})
