import { morphSvg } from 'springsvg'
import menuSvg from './assets/menu.svg?raw'
import closeSvg from './assets/close.svg?raw'
import playSvg from './assets/play.svg?raw'
import pauseSvg from './assets/pause.svg?raw'
import heartSvg from './assets/heart.svg?raw'
import starSvg from './assets/star.svg?raw'
import emojiSmileSvg from './assets/emoji-smile.svg?raw'
import emojiExpressionlessSvg from './assets/emoji-expressionless.svg?raw'
import emojiFrownSvg from './assets/emoji-frown.svg?raw'
import cpuSvg from './assets/cpu.svg?raw'
import cpuFillSvg from './assets/cpu-fill.svg?raw'
import phGhostSvg from './assets/ph-ghost.svg?raw'
import phSkullSvg from './assets/ph-skull.svg?raw'
import phHeartSvg from './assets/ph-heart.svg?raw'
import phFireSvg from './assets/ph-fire.svg?raw'
import hiFaceSmileSvg from './assets/hi-face-smile.svg?raw'
import hiFaceFrownSvg from './assets/hi-face-frown.svg?raw'
import hiLockClosedSvg from './assets/hi-lock-closed.svg?raw'
import hiLockOpenSvg from './assets/hi-lock-open.svg?raw'
import hiCloudUpSvg from './assets/hi-cloud-up.svg?raw'
import hiCloudDownSvg from './assets/hi-cloud-down.svg?raw'
import hiBellSvg from './assets/hi-bell.svg?raw'
import hiBellSlashSvg from './assets/hi-bell-slash.svg?raw'
import miAddCircleSvg from './assets/mi-add-circle.svg?raw'
import miCancelSvg from './assets/mi-cancel.svg?raw'
import miCloudUploadSvg from './assets/mi-cloud-upload.svg?raw'
import miCloudDownloadSvg from './assets/mi-cloud-download.svg?raw'
import miSunnySvg from './assets/mi-sunny.svg?raw'
import miNightlightSvg from './assets/mi-nightlight.svg?raw'
import miSendSvg from './assets/mi-send.svg?raw'
import miReplySvg from './assets/mi-reply.svg?raw'
import miMicSvg from './assets/mi-mic.svg?raw'
import miMicOffSvg from './assets/mi-mic-off.svg?raw'
import faTreeSvg from './assets/fa-tree.svg?raw'
import faSnowflakeSvg from './assets/fa-snowflake.svg?raw'
import faChessKnightSvg from './assets/fa-chess-knight.svg?raw'
import faChessQueenSvg from './assets/fa-chess-queen.svg?raw'
import faDogSvg from './assets/fa-dog.svg?raw'
import faDragonSvg from './assets/fa-dragon.svg?raw'
import faBoltSvg from './assets/fa-bolt.svg?raw'
import faGuitarSvg from './assets/fa-guitar.svg?raw'
import faLeafSvg from './assets/fa-leaf.svg?raw'
import faHouseSvg from './assets/fa-house.svg?raw'
import siVercelSvg from './assets/si-vercel.svg?raw'
import siNetlifySvg from './assets/si-netlify.svg?raw'
import notoAlienSvg from './assets/noto-alien.svg?raw'
import notoFireSvg from './assets/noto-fire.svg?raw'
import giFoxHeadSvg from './assets/gi-fox-head.svg?raw'
import giOwlSvg from './assets/gi-owl.svg?raw'
import giDragonHeadSvg from './assets/gi-dragon-head.svg?raw'
import giHornedSkullSvg from './assets/gi-horned-skull.svg?raw'
import giMedusaHeadSvg from './assets/gi-medusa-head.svg?raw'
import giCrownedSkullSvg from './assets/gi-crowned-skull.svg?raw'
import giAngelWingsSvg from './assets/gi-angel-wings.svg?raw'
import giSpiderWebSvg from './assets/gi-spider-web.svg?raw'
import siReactSvg from './assets/si-react.svg?raw'
import siAngularSvg from './assets/si-angular.svg?raw'
import siGithubSvg from './assets/si-github.svg?raw'
import siGitlabSvg from './assets/si-gitlab.svg?raw'
import siSpotifySvg from './assets/si-spotify.svg?raw'
import siAppleMusicSvg from './assets/si-applemusic.svg?raw'
import faTwitterSvg from './assets/fa-twitter.svg?raw'
import siXSvg from './assets/si-x.svg?raw'
import faSlackSvg from './assets/fa-slack.svg?raw'
import siDiscordSvg from './assets/si-discord.svg?raw'
import zapSvg from './assets/zap.svg?raw'
import shieldSvg from './assets/shield.svg?raw'
import toggleLeftSvg from './assets/toggle-left.svg?raw'
import toggleRightSvg from './assets/toggle-right.svg?raw'
import thumbsUpSvg from './assets/thumbs-up.svg?raw'
import thumbsDownSvg from './assets/thumbs-down.svg?raw'
import volume2Svg from './assets/volume-2.svg?raw'
import volumeXSvg from './assets/volume-x.svg?raw'
import sunSvg from './assets/sun.svg?raw'
import moonSvg from './assets/moon.svg?raw'
import eyeSvg from './assets/eye.svg?raw'
import eyeOffSvg from './assets/eye-off.svg?raw'

// ── Menu → Close ─────────────────────────────────────────────────────────────
const menuContainer = document.getElementById('menuContainer') as unknown as SVGSVGElement
const menuLabel = document.getElementById('menuLabel') as HTMLParagraphElement
const menuConfig = { stiffness: 600, damping: 20, mass: 1 }
let isOpen = false

morphSvg(menuContainer, menuSvg, closeSvg, menuConfig)

menuContainer.addEventListener('click', () => {
  isOpen = !isOpen
  morphSvg(menuContainer, isOpen ? menuSvg : closeSvg, isOpen ? closeSvg : menuSvg, menuConfig)
  menuLabel.textContent = isOpen ? 'click to close' : 'click to open'
})

// ── Play → Pause ─────────────────────────────────────────────────────────────
const playContainer = document.getElementById('playContainer') as unknown as SVGSVGElement
const playLabel = document.getElementById('playLabel') as HTMLParagraphElement
const playConfig = { stiffness: 300, damping: 28, mass: 1.5 }
let isPlaying = false

morphSvg(playContainer, pauseSvg, playSvg, playConfig)

playContainer.addEventListener('click', () => {
  isPlaying = !isPlaying
  morphSvg(playContainer, isPlaying ? pauseSvg : playSvg, isPlaying ? playSvg : pauseSvg, playConfig)
  playLabel.textContent = isPlaying ? 'click to pause' : 'click to play'
})

// ── Heart → Star ─────────────────────────────────────────────────────────────
const reactionContainer = document.getElementById('reactionContainer') as unknown as SVGSVGElement
const reactionLabel = document.getElementById('reactionLabel') as HTMLParagraphElement
const reactionConfig = { stiffness: 200, damping: 15, mass: 1 }
let isStarred = false

morphSvg(reactionContainer, heartSvg, starSvg, reactionConfig)

reactionContainer.addEventListener('click', () => {
  isStarred = !isStarred
  morphSvg(reactionContainer, isStarred ? heartSvg : starSvg, isStarred ? starSvg : heartSvg, reactionConfig)
  reactionLabel.textContent = isStarred ? 'click to unlike' : 'click to like'
})

// ── Volume → Mute ─────────────────────────────────────────────────────────────
const volumeContainer = document.getElementById('volumeContainer') as unknown as SVGSVGElement
const volumeLabel = document.getElementById('volumeLabel') as HTMLParagraphElement
const volumeConfig = { stiffness: 400, damping: 22, mass: 1 }
let isMuted = false

morphSvg(volumeContainer, volume2Svg, volumeXSvg, volumeConfig)

volumeContainer.addEventListener('click', () => {
  isMuted = !isMuted
  morphSvg(volumeContainer, isMuted ? volume2Svg : volumeXSvg, isMuted ? volumeXSvg : volume2Svg, volumeConfig)
  volumeLabel.textContent = isMuted ? 'click to unmute' : 'click to mute'
})

// ── Sun → Moon ────────────────────────────────────────────────────────────────
const themeContainer = document.getElementById('themeContainer') as unknown as SVGSVGElement
const themeLabel = document.getElementById('themeLabel') as HTMLParagraphElement
const themeConfig = { stiffness: 250, damping: 18, mass: 1 }
let isDark = false

morphSvg(themeContainer, sunSvg, moonSvg, themeConfig)

themeContainer.addEventListener('click', () => {
  isDark = !isDark
  morphSvg(themeContainer, isDark ? sunSvg : moonSvg, isDark ? moonSvg : sunSvg, themeConfig)
  themeLabel.textContent = isDark ? 'click for light' : 'click for dark'
})

// ── Eye → Eye-off ─────────────────────────────────────────────────────────────
const visibilityContainer = document.getElementById('visibilityContainer') as unknown as SVGSVGElement
const visibilityLabel = document.getElementById('visibilityLabel') as HTMLParagraphElement
const visibilityConfig = { stiffness: 350, damping: 20, mass: 1 }
let isHidden = false

morphSvg(visibilityContainer, eyeSvg, eyeOffSvg, visibilityConfig)

visibilityContainer.addEventListener('click', () => {
  isHidden = !isHidden
  morphSvg(visibilityContainer, isHidden ? eyeSvg : eyeOffSvg, isHidden ? eyeOffSvg : eyeSvg, visibilityConfig)
  visibilityLabel.textContent = isHidden ? 'click to show' : 'click to hide'
})

// ── Zap → Shield (fill) ───────────────────────────────────────────────────────
const powerContainer = document.getElementById('powerContainer') as unknown as SVGSVGElement
const powerLabel = document.getElementById('powerLabel') as HTMLParagraphElement
const powerConfig = { stiffness: 280, damping: 22, mass: 1 }
let isShielded = false

morphSvg(powerContainer, zapSvg, shieldSvg, powerConfig)

powerContainer.addEventListener('click', () => {
  isShielded = !isShielded
  morphSvg(powerContainer, isShielded ? zapSvg : shieldSvg, isShielded ? shieldSvg : zapSvg, powerConfig)
  powerLabel.textContent = isShielded ? 'click to zap' : 'click to shield'
})

// ── Toggle Left → Right ───────────────────────────────────────────────────────
const toggleContainer = document.getElementById('toggleContainer') as unknown as SVGSVGElement
const toggleLabel = document.getElementById('toggleLabel') as HTMLParagraphElement
const toggleConfig = { stiffness: 400, damping: 8, mass: 6 }
let isToggled = false

morphSvg(toggleContainer, toggleLeftSvg, toggleRightSvg, toggleConfig)

toggleContainer.addEventListener('click', () => {
  isToggled = !isToggled
  morphSvg(toggleContainer, isToggled ? toggleLeftSvg : toggleRightSvg, isToggled ? toggleRightSvg : toggleLeftSvg, toggleConfig)
  toggleLabel.textContent = isToggled ? 'click to disable' : 'click to enable'
})

// ── Thumbs Up → Down ──────────────────────────────────────────────────────────
const thumbContainer = document.getElementById('thumbContainer') as unknown as SVGSVGElement
const thumbLabel = document.getElementById('thumbLabel') as HTMLParagraphElement
const thumbConfig = { stiffness: 320, damping: 20, mass: 1 }
let isDisliked = false

morphSvg(thumbContainer, thumbsUpSvg, thumbsDownSvg, thumbConfig)

thumbContainer.addEventListener('click', () => {
  isDisliked = !isDisliked
  morphSvg(thumbContainer, isDisliked ? thumbsUpSvg : thumbsDownSvg, isDisliked ? thumbsDownSvg : thumbsUpSvg, thumbConfig)
  thumbLabel.textContent = isDisliked ? 'click to like' : 'click to dislike'
})

// ── Mood cycle: smile → expressionless → frown → smile ────────────────────────
const moodFaces = [emojiSmileSvg, emojiExpressionlessSvg, emojiFrownSvg]
const moodHints = ['neutral', 'frown', 'smile']
const moodContainer = document.getElementById('moodContainer') as unknown as SVGSVGElement
const moodLabel = document.getElementById('moodLabel') as HTMLParagraphElement
const moodConfig = { stiffness: 260, damping: 12, mass: 1 }
let moodIndex = 0

morphSvg(moodContainer, moodFaces[0]!, moodFaces[1]!, moodConfig)

moodContainer.addEventListener('click', () => {
  const from = moodFaces[moodIndex]!
  moodIndex = (moodIndex + 1) % moodFaces.length
  const to = moodFaces[moodIndex]!
  morphSvg(moodContainer, from, to, moodConfig)
  moodLabel.textContent = moodHints[moodIndex]!
})

// ── Ghost → Skull ─────────────────────────────────────────────────────────────
const ghostContainer = document.getElementById('ghostContainer') as unknown as SVGSVGElement
const ghostLabel = document.getElementById('ghostLabel') as HTMLParagraphElement
const ghostConfig = { stiffness: 280, damping: 10, mass: 1 }
let isSkull = false

morphSvg(ghostContainer, phGhostSvg, phSkullSvg, ghostConfig)

ghostContainer.addEventListener('click', () => {
  isSkull = !isSkull
  morphSvg(ghostContainer, isSkull ? phGhostSvg : phSkullSvg, isSkull ? phSkullSvg : phGhostSvg, ghostConfig)
  ghostLabel.textContent = isSkull ? 'click for ghost' : 'click for skull'
})

// ── Heart → Fire ──────────────────────────────────────────────────────────────
const heartFireContainer = document.getElementById('heartFireContainer') as unknown as SVGSVGElement
const heartFireLabel = document.getElementById('heartFireLabel') as HTMLParagraphElement
const heartFireConfig = { stiffness: 240, damping: 16, mass: 1 }
let isOnFire = false

morphSvg(heartFireContainer, phHeartSvg, phFireSvg, heartFireConfig)

heartFireContainer.addEventListener('click', () => {
  isOnFire = !isOnFire
  morphSvg(heartFireContainer, isOnFire ? phHeartSvg : phFireSvg, isOnFire ? phFireSvg : phHeartSvg, heartFireConfig)
  heartFireLabel.textContent = isOnFire ? 'click for heart' : 'click for fire'
})

// ── Face Smile → Frown ────────────────────────────────────────────────────────
const faceContainer = document.getElementById('faceContainer') as unknown as SVGSVGElement
const faceLabel = document.getElementById('faceLabel') as HTMLParagraphElement
const faceConfig = { stiffness: 320, damping: 22, mass: 1 }
let isFrowning = false

morphSvg(faceContainer, hiFaceSmileSvg, hiFaceFrownSvg, faceConfig)

faceContainer.addEventListener('click', () => {
  isFrowning = !isFrowning
  morphSvg(faceContainer, isFrowning ? hiFaceSmileSvg : hiFaceFrownSvg, isFrowning ? hiFaceFrownSvg : hiFaceSmileSvg, faceConfig)
  faceLabel.textContent = isFrowning ? 'click to smile' : 'click to frown'
})

// ── Lock Closed → Open ────────────────────────────────────────────────────────
const lockContainer = document.getElementById('lockContainer') as unknown as SVGSVGElement
const lockLabel = document.getElementById('lockLabel') as HTMLParagraphElement
const lockConfig = { stiffness: 400, damping: 22, mass: 1 }
let isLocked = true

morphSvg(lockContainer, hiLockClosedSvg, hiLockOpenSvg, lockConfig)

lockContainer.addEventListener('click', () => {
  isLocked = !isLocked
  morphSvg(lockContainer, isLocked ? hiLockOpenSvg : hiLockClosedSvg, isLocked ? hiLockClosedSvg : hiLockOpenSvg, lockConfig)
  lockLabel.textContent = isLocked ? 'click to unlock' : 'click to lock'
})

// ── Cloud Upload → Download ───────────────────────────────────────────────────
const cloudContainer = document.getElementById('cloudContainer') as unknown as SVGSVGElement
const cloudLabel = document.getElementById('cloudLabel') as HTMLParagraphElement
const cloudConfig = { stiffness: 300, damping: 20, mass: 1 }
let isDownload = false

morphSvg(cloudContainer, hiCloudUpSvg, hiCloudDownSvg, cloudConfig)

cloudContainer.addEventListener('click', () => {
  isDownload = !isDownload
  morphSvg(cloudContainer, isDownload ? hiCloudUpSvg : hiCloudDownSvg, isDownload ? hiCloudDownSvg : hiCloudUpSvg, cloudConfig)
  cloudLabel.textContent = isDownload ? 'click to upload' : 'click to download'
})

// ── Bell → Bell Slash ─────────────────────────────────────────────────────────
const bellContainer = document.getElementById('bellContainer') as unknown as SVGSVGElement
const bellLabel = document.getElementById('bellLabel') as HTMLParagraphElement
const bellConfig = { stiffness: 350, damping: 24, mass: 1 }
let isBellMuted = false

morphSvg(bellContainer, hiBellSvg, hiBellSlashSvg, bellConfig)

bellContainer.addEventListener('click', () => {
  isBellMuted = !isBellMuted
  morphSvg(bellContainer, isBellMuted ? hiBellSvg : hiBellSlashSvg, isBellMuted ? hiBellSlashSvg : hiBellSvg, bellConfig)
  bellLabel.textContent = isBellMuted ? 'click to unmute' : 'click to mute'
})

// ── Add Circle → Cancel ───────────────────────────────────────────────────────
const addCancelContainer = document.getElementById('addCancelContainer') as unknown as SVGSVGElement
const addCancelLabel = document.getElementById('addCancelLabel') as HTMLParagraphElement
const addCancelConfig = { stiffness: 400, damping: 20, mass: 1 }
let isCancelled = false

morphSvg(addCancelContainer, miAddCircleSvg, miCancelSvg, addCancelConfig)

addCancelContainer.addEventListener('click', () => {
  isCancelled = !isCancelled
  morphSvg(addCancelContainer, isCancelled ? miAddCircleSvg : miCancelSvg, isCancelled ? miCancelSvg : miAddCircleSvg, addCancelConfig)
  addCancelLabel.textContent = isCancelled ? 'click to add' : 'click to cancel'
})

// ── Cloud Upload → Download ───────────────────────────────────────────────────
const miCloudContainer = document.getElementById('miCloudContainer') as unknown as SVGSVGElement
const miCloudLabel = document.getElementById('miCloudLabel') as HTMLParagraphElement
const miCloudConfig = { stiffness: 300, damping: 22, mass: 1 }
let miIsDownload = false

morphSvg(miCloudContainer, miCloudUploadSvg, miCloudDownloadSvg, miCloudConfig)

miCloudContainer.addEventListener('click', () => {
  miIsDownload = !miIsDownload
  morphSvg(miCloudContainer, miIsDownload ? miCloudUploadSvg : miCloudDownloadSvg, miIsDownload ? miCloudDownloadSvg : miCloudUploadSvg, miCloudConfig)
  miCloudLabel.textContent = miIsDownload ? 'click to upload' : 'click to download'
})

// ── Sunny → Nightlight ────────────────────────────────────────────────────────
const themeContainer2 = document.getElementById('themeContainer2') as unknown as SVGSVGElement
const themeLabel2 = document.getElementById('themeLabel2') as HTMLParagraphElement
const themeConfig2 = { stiffness: 220, damping: 18, mass: 1 }
let isNight = false

morphSvg(themeContainer2, miSunnySvg, miNightlightSvg, themeConfig2)

themeContainer2.addEventListener('click', () => {
  isNight = !isNight
  morphSvg(themeContainer2, isNight ? miSunnySvg : miNightlightSvg, isNight ? miNightlightSvg : miSunnySvg, themeConfig2)
  themeLabel2.textContent = isNight ? 'click for day' : 'click for night'
})

// ── Send → Reply ──────────────────────────────────────────────────────────────
const sendReplyContainer = document.getElementById('sendReplyContainer') as unknown as SVGSVGElement
const sendReplyLabel = document.getElementById('sendReplyLabel') as HTMLParagraphElement
const sendReplyConfig = { stiffness: 350, damping: 20, mass: 1 }
let isReplying = false

morphSvg(sendReplyContainer, miSendSvg, miReplySvg, sendReplyConfig)

sendReplyContainer.addEventListener('click', () => {
  isReplying = !isReplying
  morphSvg(sendReplyContainer, isReplying ? miSendSvg : miReplySvg, isReplying ? miReplySvg : miSendSvg, sendReplyConfig)
  sendReplyLabel.textContent = isReplying ? 'click to send' : 'click to reply'
})

// ── Mic → Mic Off ─────────────────────────────────────────────────────────────
const micContainer = document.getElementById('micContainer') as unknown as SVGSVGElement
const micLabel = document.getElementById('micLabel') as HTMLParagraphElement
const micConfig = { stiffness: 320, damping: 22, mass: 1 }
let isMicMuted = false

morphSvg(micContainer, miMicSvg, miMicOffSvg, micConfig)

micContainer.addEventListener('click', () => {
  isMicMuted = !isMicMuted
  morphSvg(micContainer, isMicMuted ? miMicSvg : miMicOffSvg, isMicMuted ? miMicOffSvg : miMicSvg, micConfig)
  micLabel.textContent = isMicMuted ? 'click to unmute' : 'click to mute'
})

// ── CPU outline → fill ────────────────────────────────────────────────────────
const cpuContainer = document.getElementById('cpuContainer') as unknown as SVGSVGElement
const cpuLabel = document.getElementById('cpuLabel') as HTMLParagraphElement
const cpuConfig = { stiffness: 300, damping: 24, mass: 1 }
let isCpuFilled = false

morphSvg(cpuContainer, cpuSvg, cpuFillSvg, cpuConfig)

cpuContainer.addEventListener('click', () => {
  isCpuFilled = !isCpuFilled
  morphSvg(cpuContainer, isCpuFilled ? cpuSvg : cpuFillSvg, isCpuFilled ? cpuFillSvg : cpuSvg, cpuConfig)
  cpuLabel.textContent = isCpuFilled ? 'click for outline' : 'click to fill'
})

// ── FA Tree → Snowflake ───────────────────────────────────────────────────────
const faTreeContainer = document.getElementById('faTreeContainer') as unknown as SVGSVGElement
const faTreeLabel = document.getElementById('faTreeLabel') as HTMLParagraphElement
const faTreeConfig = { stiffness: 260, damping: 18, mass: 1 }
let isSnowflake = false

morphSvg(faTreeContainer, faTreeSvg, faSnowflakeSvg, faTreeConfig)

faTreeContainer.addEventListener('click', () => {
  isSnowflake = !isSnowflake
  morphSvg(faTreeContainer, isSnowflake ? faTreeSvg : faSnowflakeSvg, isSnowflake ? faSnowflakeSvg : faTreeSvg, faTreeConfig)
  faTreeLabel.textContent = isSnowflake ? 'click for tree' : 'click for snowflake'
})

// ── FA Chess Knight → Queen ───────────────────────────────────────────────────
const faChessContainer = document.getElementById('faChessContainer') as unknown as SVGSVGElement
const faChessLabel = document.getElementById('faChessLabel') as HTMLParagraphElement
const faChessConfig = { stiffness: 300, damping: 20, mass: 1 }
let isChessQueen = false

morphSvg(faChessContainer, faChessKnightSvg, faChessQueenSvg, faChessConfig)

faChessContainer.addEventListener('click', () => {
  isChessQueen = !isChessQueen
  morphSvg(faChessContainer, isChessQueen ? faChessKnightSvg : faChessQueenSvg, isChessQueen ? faChessQueenSvg : faChessKnightSvg, faChessConfig)
  faChessLabel.textContent = isChessQueen ? 'click for knight' : 'click for queen'
})

// ── FA Dog → Dragon ───────────────────────────────────────────────────────────
const faAnimalContainer = document.getElementById('faAnimalContainer') as unknown as SVGSVGElement
const faAnimalLabel = document.getElementById('faAnimalLabel') as HTMLParagraphElement
const faAnimalConfig = { stiffness: 280, damping: 16, mass: 1 }
let isDragon = false

morphSvg(faAnimalContainer, faDogSvg, faDragonSvg, faAnimalConfig)

faAnimalContainer.addEventListener('click', () => {
  isDragon = !isDragon
  morphSvg(faAnimalContainer, isDragon ? faDogSvg : faDragonSvg, isDragon ? faDragonSvg : faDogSvg, faAnimalConfig)
  faAnimalLabel.textContent = isDragon ? 'click for dog' : 'click for dragon'
})

// ── FA Bolt → Guitar ──────────────────────────────────────────────────────────
const faBoltGuitarContainer = document.getElementById('faBoltGuitarContainer') as unknown as SVGSVGElement
const faBoltGuitarLabel = document.getElementById('faBoltGuitarLabel') as HTMLParagraphElement
const faBoltGuitarConfig = { stiffness: 240, damping: 18, mass: 1 }
let isGuitar = false

morphSvg(faBoltGuitarContainer, faBoltSvg, faGuitarSvg, faBoltGuitarConfig)

faBoltGuitarContainer.addEventListener('click', () => {
  isGuitar = !isGuitar
  morphSvg(faBoltGuitarContainer, isGuitar ? faBoltSvg : faGuitarSvg, isGuitar ? faGuitarSvg : faBoltSvg, faBoltGuitarConfig)
  faBoltGuitarLabel.textContent = isGuitar ? 'click for bolt' : 'click for guitar'
})

// ── FA Leaf → House ───────────────────────────────────────────────────────────
const faLeafHouseContainer = document.getElementById('faLeafHouseContainer') as unknown as SVGSVGElement
const faLeafHouseLabel = document.getElementById('faLeafHouseLabel') as HTMLParagraphElement
const faLeafHouseConfig = { stiffness: 220, damping: 20, mass: 1 }
let isHouse = false

morphSvg(faLeafHouseContainer, faLeafSvg, faHouseSvg, faLeafHouseConfig)

faLeafHouseContainer.addEventListener('click', () => {
  isHouse = !isHouse
  morphSvg(faLeafHouseContainer, isHouse ? faLeafSvg : faHouseSvg, isHouse ? faHouseSvg : faLeafSvg, faLeafHouseConfig)
  faLeafHouseLabel.textContent = isHouse ? 'click for leaf' : 'click for house'
})

// ── Vercel → Netlify ──────────────────────────────────────────────────────────
const vercelNetlifyContainer = document.getElementById('vercelNetlifyContainer') as unknown as SVGSVGElement
const vercelNetlifyLabel = document.getElementById('vercelNetlifyLabel') as HTMLParagraphElement
const vercelNetlifyConfig = { stiffness: 280, damping: 20, mass: 1 }
let isNetlify = false

morphSvg(vercelNetlifyContainer, siVercelSvg, siNetlifySvg, vercelNetlifyConfig)

vercelNetlifyContainer.addEventListener('click', () => {
  isNetlify = !isNetlify
  morphSvg(vercelNetlifyContainer, isNetlify ? siVercelSvg : siNetlifySvg, isNetlify ? siNetlifySvg : siVercelSvg, vercelNetlifyConfig)
  vercelNetlifyLabel.textContent = isNetlify ? 'click for vercel' : 'click for netlify'
})

// ── Slack → Discord ───────────────────────────────────────────────────────────
const slackDiscordContainer = document.getElementById('slackDiscordContainer') as unknown as SVGSVGElement
const slackDiscordLabel = document.getElementById('slackDiscordLabel') as HTMLParagraphElement
const slackDiscordConfig = { stiffness: 260, damping: 20, mass: 1 }
let isDiscord = false

morphSvg(slackDiscordContainer, faSlackSvg, siDiscordSvg, slackDiscordConfig)

slackDiscordContainer.addEventListener('click', () => {
  isDiscord = !isDiscord
  morphSvg(slackDiscordContainer, isDiscord ? faSlackSvg : siDiscordSvg, isDiscord ? siDiscordSvg : faSlackSvg, slackDiscordConfig)
  slackDiscordLabel.textContent = isDiscord ? 'click for slack' : 'click for discord'
})

// ── Fox → Owl ─────────────────────────────────────────────────────────────────
const foxOwlContainer = document.getElementById('foxOwlContainer') as unknown as SVGSVGElement
const foxOwlLabel = document.getElementById('foxOwlLabel') as HTMLParagraphElement
const foxOwlConfig = { stiffness: 180, damping: 18, mass: 1 }
let isOwl = false

morphSvg(foxOwlContainer, giFoxHeadSvg, giOwlSvg, foxOwlConfig)

foxOwlContainer.addEventListener('click', () => {
  isOwl = !isOwl
  morphSvg(foxOwlContainer, isOwl ? giFoxHeadSvg : giOwlSvg, isOwl ? giOwlSvg : giFoxHeadSvg, foxOwlConfig)
  foxOwlLabel.textContent = isOwl ? 'click for fox' : 'click for owl'
})

// ── Dragon → Skull ────────────────────────────────────────────────────────────
const dragonSkullContainer = document.getElementById('dragonSkullContainer') as unknown as SVGSVGElement
const dragonSkullLabel = document.getElementById('dragonSkullLabel') as HTMLParagraphElement
const dragonSkullConfig = { stiffness: 160, damping: 16, mass: 1 }
let isHornedSkull = false

morphSvg(dragonSkullContainer, giDragonHeadSvg, giHornedSkullSvg, dragonSkullConfig)

dragonSkullContainer.addEventListener('click', () => {
  isHornedSkull = !isHornedSkull
  morphSvg(dragonSkullContainer, isHornedSkull ? giDragonHeadSvg : giHornedSkullSvg, isHornedSkull ? giHornedSkullSvg : giDragonHeadSvg, dragonSkullConfig)
  dragonSkullLabel.textContent = isHornedSkull ? 'click for dragon' : 'click for skull'
})

// ── Medusa → Crowned Skull ────────────────────────────────────────────────────
const medusaSkullContainer = document.getElementById('medusaSkullContainer') as unknown as SVGSVGElement
const medusaSkullLabel = document.getElementById('medusaSkullLabel') as HTMLParagraphElement
const medusaSkullConfig = { stiffness: 140, damping: 14, mass: 1 }
let isMedusaSkull = false

morphSvg(medusaSkullContainer, giMedusaHeadSvg, giCrownedSkullSvg, 'bouncy')

medusaSkullContainer.addEventListener('click', () => {
  isMedusaSkull = !isMedusaSkull
  morphSvg(medusaSkullContainer, isMedusaSkull ? giMedusaHeadSvg : giCrownedSkullSvg, isMedusaSkull ? giCrownedSkullSvg : giMedusaHeadSvg, 'bouncy')
  medusaSkullLabel.textContent = isMedusaSkull ? 'click for medusa' : 'click for skull'
})

// ── Angel Wings → Spider Web ──────────────────────────────────────────────────
const wingsWebContainer = document.getElementById('wingsWebContainer') as unknown as SVGSVGElement
const wingsWebLabel = document.getElementById('wingsWebLabel') as HTMLParagraphElement
const wingsWebConfig = { stiffness: 120, damping: 14, mass: 1 }
let isWeb = false

morphSvg(wingsWebContainer, giAngelWingsSvg, giSpiderWebSvg, wingsWebConfig)

wingsWebContainer.addEventListener('click', () => {
  isWeb = !isWeb
  morphSvg(wingsWebContainer, isWeb ? giAngelWingsSvg : giSpiderWebSvg, isWeb ? giSpiderWebSvg : giAngelWingsSvg, wingsWebConfig)
  wingsWebLabel.textContent = isWeb ? 'click for wings' : 'click for web'
})

// ── Alien → Fire ──────────────────────────────────────────────────────────────
const alienFireContainer = document.getElementById('alienFireContainer') as unknown as SVGSVGElement
const alienFireLabel = document.getElementById('alienFireLabel') as HTMLParagraphElement
const alienFireConfig = { stiffness: 200, damping: 16, mass: 1 }
let isFire = false

morphSvg(alienFireContainer, notoAlienSvg, notoFireSvg, alienFireConfig)

alienFireContainer.addEventListener('click', () => {
  isFire = !isFire
  morphSvg(alienFireContainer, isFire ? notoAlienSvg : notoFireSvg, isFire ? notoFireSvg : notoAlienSvg, alienFireConfig)
  alienFireLabel.textContent = isFire ? 'click for alien' : 'click for fire'
})

// ── React → Angular ───────────────────────────────────────────────────────────
const reactAngularContainer = document.getElementById('reactAngularContainer') as unknown as SVGSVGElement
const reactAngularLabel = document.getElementById('reactAngularLabel') as HTMLParagraphElement
const reactAngularConfig = { stiffness: 280, damping: 20, mass: 1 }
let isAngular = false

morphSvg(reactAngularContainer, siReactSvg, siAngularSvg, reactAngularConfig)

reactAngularContainer.addEventListener('click', () => {
  isAngular = !isAngular
  morphSvg(reactAngularContainer, isAngular ? siReactSvg : siAngularSvg, isAngular ? siAngularSvg : siReactSvg, reactAngularConfig)
  reactAngularLabel.textContent = isAngular ? 'click for react' : 'click for angular'
})

// ── GitHub → GitLab ───────────────────────────────────────────────────────────
const githubGitlabContainer = document.getElementById('githubGitlabContainer') as unknown as SVGSVGElement
const githubGitlabLabel = document.getElementById('githubGitlabLabel') as HTMLParagraphElement
const githubGitlabConfig = { stiffness: 300, damping: 22, mass: 1 }
let isGitlab = false

morphSvg(githubGitlabContainer, siGithubSvg, siGitlabSvg, githubGitlabConfig)

githubGitlabContainer.addEventListener('click', () => {
  isGitlab = !isGitlab
  morphSvg(githubGitlabContainer, isGitlab ? siGithubSvg : siGitlabSvg, isGitlab ? siGitlabSvg : siGithubSvg, githubGitlabConfig)
  githubGitlabLabel.textContent = isGitlab ? 'click for github' : 'click for gitlab'
})

// ── Spotify → Apple Music ─────────────────────────────────────────────────────
const spotifyAppleContainer = document.getElementById('spotifyAppleContainer') as unknown as SVGSVGElement
const spotifyAppleLabel = document.getElementById('spotifyAppleLabel') as HTMLParagraphElement
const spotifyAppleConfig = { stiffness: 260, damping: 18, mass: 1 }
let isAppleMusic = false

morphSvg(spotifyAppleContainer, siSpotifySvg, siAppleMusicSvg, spotifyAppleConfig)

spotifyAppleContainer.addEventListener('click', () => {
  isAppleMusic = !isAppleMusic
  morphSvg(spotifyAppleContainer, isAppleMusic ? siSpotifySvg : siAppleMusicSvg, isAppleMusic ? siAppleMusicSvg : siSpotifySvg, spotifyAppleConfig)
  spotifyAppleLabel.textContent = isAppleMusic ? 'click for spotify' : 'click for apple music'
})

// ── Twitter bird → X ──────────────────────────────────────────────────────────
const twitterXContainer = document.getElementById('twitterXContainer') as unknown as SVGSVGElement
const twitterXLabel = document.getElementById('twitterXLabel') as HTMLParagraphElement
const twitterXConfig = { stiffness: 300, damping: 18, mass: 1 }
let isX = false

morphSvg(twitterXContainer, faTwitterSvg, siXSvg, twitterXConfig)

twitterXContainer.addEventListener('click', () => {
  isX = !isX
  morphSvg(twitterXContainer, isX ? faTwitterSvg : siXSvg, isX ? siXSvg : faTwitterSvg, twitterXConfig)
  twitterXLabel.textContent = isX ? 'click for bird' : 'click for X'
})
