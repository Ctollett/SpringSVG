import menuSvg from '../assets/lucide/menu.svg?raw'
import xSvg from '../assets/lucide/x.svg?raw'
import playSvg from '../assets/lucide/play.svg?raw'
import pauseSvg from '../assets/lucide/pause.svg?raw'
import heartSvg from '../assets/lucide/heart.svg?raw'
import heartOffSvg from '../assets/lucide/heart-off.svg?raw'
import eyeSvg from '../assets/lucide/eye.svg?raw'
import eyeOffSvg from '../assets/lucide/eye-off.svg?raw'
import sunSvg from '../assets/lucide/sun.svg?raw'
import moonSvg from '../assets/lucide/moon.svg?raw'
import homeSvg from '../assets/lucide/home.svg?raw'
import searchSvg from '../assets/lucide/search.svg?raw'
import arrowLeftSvg from '../assets/lucide/arrow-left.svg?raw'
import arrowRightSvg from '../assets/lucide/arrow-right.svg?raw'
import chevronUpSvg from '../assets/lucide/chevron-up.svg?raw'
import chevronDownSvg from '../assets/lucide/chevron-down.svg?raw'
import chevronLeftSvg from '../assets/lucide/chevron-left.svg?raw'
import chevronRightSvg from '../assets/lucide/chevron-right.svg?raw'
import volume2Svg from '../assets/lucide/volume-2.svg?raw'
import volumeXSvg from '../assets/lucide/volume-x.svg?raw'
import skipBackSvg from '../assets/lucide/skip-back.svg?raw'
import skipForwardSvg from '../assets/lucide/skip-forward.svg?raw'
import maximizeSvg from '../assets/lucide/maximize.svg?raw'
import minimizeSvg from '../assets/lucide/minimize.svg?raw'
import plusSvg from '../assets/lucide/plus.svg?raw'
import minusSvg from '../assets/lucide/minus.svg?raw'
import checkSvg from '../assets/lucide/check.svg?raw'
import editSvg from '../assets/lucide/edit.svg?raw'
import saveSvg from '../assets/lucide/save.svg?raw'
import trashSvg from '../assets/lucide/trash.svg?raw'
import refreshCwSvg from '../assets/lucide/refresh-cw.svg?raw'
import downloadSvg from '../assets/lucide/download.svg?raw'
import uploadSvg from '../assets/lucide/upload.svg?raw'
import mailSvg from '../assets/lucide/mail.svg?raw'
import mailOpenSvg from '../assets/lucide/mail-open.svg?raw'
import bellSvg from '../assets/lucide/bell.svg?raw'
import bellOffSvg from '../assets/lucide/bell-off.svg?raw'
import messageCircleSvg from '../assets/lucide/message-circle.svg?raw'
import messageSquareSvg from '../assets/lucide/message-square.svg?raw'
import phoneSvg from '../assets/lucide/phone.svg?raw'
import phoneOffSvg from '../assets/lucide/phone-off.svg?raw'
import cloudSvg from '../assets/lucide/cloud.svg?raw'
import cloudRainSvg from '../assets/lucide/cloud-rain.svg?raw'
import windSvg from '../assets/lucide/wind.svg?raw'
import snowflakeSvg from '../assets/lucide/snowflake.svg?raw'
import lockSvg from '../assets/lucide/lock.svg?raw'
import unlockSvg from '../assets/lucide/unlock.svg?raw'
import wifiSvg from '../assets/lucide/wifi.svg?raw'
import wifiOffSvg from '../assets/lucide/wifi-off.svg?raw'
import batterySvg from '../assets/lucide/battery.svg?raw'
import batteryLowSvg from '../assets/lucide/battery-low.svg?raw'

import starSvg from '../assets/lucide/star.svg?raw'
import starOffSvg from '../assets/lucide/star-off.svg?raw'
import bookmarkSvg from '../assets/lucide/bookmark.svg?raw'
import bookmarkCheckSvg from '../assets/lucide/bookmark-check.svg?raw'
import thumbsUpSvg from '../assets/lucide/thumbs-up.svg?raw'
import thumbsDownSvg from '../assets/lucide/thumbs-down.svg?raw'
import fileSvg from '../assets/lucide/file.svg?raw'
import fileCheckSvg from '../assets/lucide/file-check.svg?raw'
import folderSvg from '../assets/lucide/folder.svg?raw'
import folderOpenSvg from '../assets/lucide/folder-open.svg?raw'
import imageSvg from '../assets/lucide/image.svg?raw'
import imageOffSvg from '../assets/lucide/image-off.svg?raw'
import flagSvg from '../assets/lucide/flag.svg?raw'
import flagOffSvg from '../assets/lucide/flag-off.svg?raw'
import coffeeSvg from '../assets/lucide/coffee.svg?raw'
import beerSvg from '../assets/lucide/beer.svg?raw'
import zapSvg from '../assets/lucide/zap.svg?raw'
import zapOffSvg from '../assets/lucide/zap-off.svg?raw'
import bugSvg from '../assets/lucide/bug.svg?raw'
import shieldSvg from '../assets/lucide/shield.svg?raw'
import shieldCheckSvg from '../assets/lucide/shield-check.svg?raw'
import shieldAlertSvg from '../assets/lucide/shield-alert.svg?raw'
import githubSvg from '../assets/lucide/github.svg?raw'
import globeSvg from '../assets/lucide/globe.svg?raw'
import settingsSvg from '../assets/lucide/settings.svg?raw'
import settings2Svg from '../assets/lucide/settings-2.svg?raw'
import starShapeSvg from '../assets/shapes/star.svg?raw'
import star2Svg from '../assets/shapes/star-2.svg?raw'
import spring2Svg from '../assets/shapes/spring-2.svg?raw'
import animation2Svg from '../assets/shapes/animation-2.svg?raw'
import code2Svg from '../assets/shapes/code-2.svg?raw'
import svg2Svg from '../assets/shapes/svg-2.svg?raw'
import animationSvg from '../assets/shapes/animation.svg?raw'
import springSvg from '../assets/shapes/spring.svg?raw'
import codeSvg from '../assets/shapes/code.svg?raw'
import svgSvg from '../assets/shapes/svg.svg?raw'

export type IconPair = {
  from: string
  to: string
  config?: { stiffness: number, damping: number, mass: number }
}

export const heroIconPairs: IconPair[] = [
  { from: starShapeSvg,  to: star2Svg,     config: { stiffness: 400, damping: 14, mass: 0.5 } },
  { from: animationSvg,  to: animation2Svg, config: { stiffness: 400, damping: 14, mass: 0.5 } },
  { from: springSvg,     to: spring2Svg,    config: { stiffness: 400, damping: 14, mass: 0.5 } },
  { from: codeSvg,       to: code2Svg,      config: { stiffness: 400, damping: 14, mass: 0.5 } },
  { from: svgSvg,        to: svg2Svg,       config: { stiffness: 400, damping: 14, mass: 0.5 } },
]

export const iconPairs: IconPair[] = [
  // Navigation
  { from: menuSvg,          to: xSvg,               config: { stiffness: 280, damping: 24, mass: 0.8 } },
  { from: homeSvg,          to: searchSvg,           config: { stiffness: 240, damping: 22, mass: 0.9 } },
  { from: arrowLeftSvg,     to: arrowRightSvg,       config: { stiffness: 280, damping: 24, mass: 0.8 } },
  { from: chevronUpSvg,     to: chevronDownSvg,      config: { stiffness: 260, damping: 24, mass: 0.8 } },
  { from: chevronLeftSvg,   to: chevronRightSvg,     config: { stiffness: 260, damping: 24, mass: 0.8 } },
  // Media Controls
  { from: playSvg,          to: pauseSvg,            config: { stiffness: 240, damping: 22, mass: 0.9 } },
  { from: volume2Svg,       to: volumeXSvg,          config: { stiffness: 220, damping: 22, mass: 0.9 } },
  { from: skipBackSvg,      to: skipForwardSvg,      config: { stiffness: 260, damping: 24, mass: 0.8 } },
  { from: maximizeSvg,      to: minimizeSvg,         config: { stiffness: 220, damping: 22, mass: 0.9 } },
  // Actions
  { from: plusSvg,          to: minusSvg,            config: { stiffness: 280, damping: 24, mass: 0.8 } },
  { from: checkSvg,         to: xSvg,                config: { stiffness: 260, damping: 24, mass: 0.8 } },
  { from: editSvg,          to: saveSvg,             config: { stiffness: 220, damping: 22, mass: 0.9 } },
  { from: trashSvg,         to: refreshCwSvg,        config: { stiffness: 200, damping: 21, mass: 0.9 } },
  { from: downloadSvg,      to: uploadSvg,           config: { stiffness: 220, damping: 22, mass: 0.9 } },
  // Communication
  { from: mailSvg,          to: mailOpenSvg,         config: { stiffness: 200, damping: 21, mass: 0.9 } },
  { from: bellSvg,          to: bellOffSvg,          config: { stiffness: 200, damping: 21, mass: 0.9 } },
  { from: messageCircleSvg, to: messageSquareSvg,    config: { stiffness: 220, damping: 22, mass: 0.9 } },
  { from: phoneSvg,         to: phoneOffSvg,         config: { stiffness: 220, damping: 22, mass: 0.9 } },
  // Weather
  { from: sunSvg,           to: moonSvg,             config: { stiffness: 180, damping: 20, mass: 1.0 } },
  { from: cloudSvg,         to: cloudRainSvg,        config: { stiffness: 180, damping: 20, mass: 1.0 } },
  { from: windSvg,          to: snowflakeSvg,        config: { stiffness: 160, damping: 19, mass: 1.0 } },
  { from: sunSvg,           to: cloudRainSvg,        config: { stiffness: 180, damping: 20, mass: 1.0 } },
  // UI State
  { from: eyeSvg,           to: eyeOffSvg,           config: { stiffness: 220, damping: 22, mass: 0.9 } },
  { from: lockSvg,          to: unlockSvg,           config: { stiffness: 220, damping: 22, mass: 0.9 } },
  { from: wifiSvg,          to: wifiOffSvg,          config: { stiffness: 200, damping: 21, mass: 0.9 } },
  { from: batterySvg,       to: batteryLowSvg,       config: { stiffness: 200, damping: 21, mass: 0.9 } },
  { from: heartSvg,         to: heartOffSvg,         config: { stiffness: 180, damping: 20, mass: 1.0 } },
  { from: starSvg,          to: starOffSvg,          config: { stiffness: 180, damping: 20, mass: 1.0 } },
  { from: bookmarkSvg,      to: bookmarkCheckSvg,    config: { stiffness: 200, damping: 21, mass: 0.9 } },
  { from: thumbsUpSvg,      to: thumbsDownSvg,       config: { stiffness: 200, damping: 21, mass: 0.9 } },
  // Files
  { from: fileSvg,          to: fileCheckSvg,        config: { stiffness: 220, damping: 22, mass: 0.9 } },
  { from: folderSvg,        to: folderOpenSvg,       config: { stiffness: 200, damping: 21, mass: 0.9 } },
  { from: imageSvg,         to: imageOffSvg,         config: { stiffness: 200, damping: 21, mass: 0.9 } },
  // Misc
  { from: flagSvg,          to: flagOffSvg,          config: { stiffness: 200, damping: 21, mass: 0.9 } },
  { from: coffeeSvg,        to: beerSvg,             config: { stiffness: 180, damping: 20, mass: 1.0 } },
  { from: zapSvg,           to: zapOffSvg,           config: { stiffness: 240, damping: 22, mass: 0.9 } },
  { from: bugSvg,           to: shieldSvg,           config: { stiffness: 200, damping: 21, mass: 0.9 } },
  // Security
  { from: shieldCheckSvg,   to: shieldAlertSvg,      config: { stiffness: 200, damping: 21, mass: 0.9 } },
  // Social
  { from: githubSvg,        to: globeSvg,            config: { stiffness: 180, damping: 20, mass: 1.0 } },
  // Settings
  { from: settingsSvg,      to: settings2Svg,        config: { stiffness: 200, damping: 21, mass: 0.9 } },
]
