export const docsConfig = [
  {
    category: 'Getting Started',
    items: [
      { id: 'installation',   label: 'Installation', headings: ['npm', 'CDN']                              },
      { id: 'quick-start',    label: 'Quick Start',  headings: ['Basic Usage', 'With React']               },
    ]
  },
  {
    category: 'For Designers',
    items: [
      { id: 'for-designers', label: 'Vibe Coding Guide', headings: ['Exporting from Figma', 'Using Presets', 'Drop-in Snippet', 'What Morphs Well'] },
    ]
  },
  {
    category: 'API Reference',
    items: [
      { id: 'morph-svg',      label: 'morphSvg',     headings: ['Usage', 'Parameters', 'Returns']          },
      { id: 'init-morph-svg', label: 'initMorphSvg', headings: ['Usage', 'Parameters']                     },
      { id: 'spring-config',  label: 'Spring Config', headings: ['stiffness', 'damping', 'mass']           },
      { id: 'ruun-svg',       label: 'RuunSVG',       headings: ['Usage', 'Props']                         },
    ]
  }
]
