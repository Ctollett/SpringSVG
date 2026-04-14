import menuSvg from '../assets/lucide/menu.svg?raw'
import xSvg from '../assets/lucide/x.svg?raw'
import homeSvg from '../assets/lucide/home.svg?raw'
import searchSvg from '../assets/lucide/search.svg?raw'
import arrowLeftSvg from '../assets/lucide/arrow-left.svg?raw'
import arrowRightSvg from '../assets/lucide/arrow-right.svg?raw'
import chevronUpSvg from '../assets/lucide/chevron-up.svg?raw'
import chevronDownSvg from '../assets/lucide/chevron-down.svg?raw'
import chevronLeftSvg from '../assets/lucide/chevron-left.svg?raw'
import chevronRightSvg from '../assets/lucide/chevron-right.svg?raw'
import playSvg from '../assets/lucide/play.svg?raw'
import pauseSvg from '../assets/lucide/pause.svg?raw'
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
import sunSvg from '../assets/lucide/sun.svg?raw'
import moonSvg from '../assets/lucide/moon.svg?raw'
import cloudSvg from '../assets/lucide/cloud.svg?raw'
import cloudRainSvg from '../assets/lucide/cloud-rain.svg?raw'
import windSvg from '../assets/lucide/wind.svg?raw'
import snowflakeSvg from '../assets/lucide/snowflake.svg?raw'
import eyeSvg from '../assets/lucide/eye.svg?raw'
import eyeOffSvg from '../assets/lucide/eye-off.svg?raw'
import lockSvg from '../assets/lucide/lock.svg?raw'
import unlockSvg from '../assets/lucide/unlock.svg?raw'
import wifiSvg from '../assets/lucide/wifi.svg?raw'
import wifiOffSvg from '../assets/lucide/wifi-off.svg?raw'
import batterySvg from '../assets/lucide/battery.svg?raw'
import batteryLowSvg from '../assets/lucide/battery-low.svg?raw'
import heartSvg from '../assets/lucide/heart.svg?raw'
import heartOffSvg from '../assets/lucide/heart-off.svg?raw'
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
import smileSvg from '../assets/lucide/smile.svg?raw'
import frownSvg from '../assets/lucide/frown.svg?raw'
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

export type IconPair = {
  from: string
  to: string
}

export const iconPairs: IconPair[] = [
  // Navigation
  { from: menuSvg, to: xSvg },
  { from: homeSvg, to: searchSvg },
  { from: arrowLeftSvg, to: arrowRightSvg },
  { from: chevronUpSvg, to: chevronDownSvg },
  { from: chevronLeftSvg, to: chevronRightSvg },
  // Media Controls
  { from: playSvg, to: pauseSvg },
  { from: volume2Svg, to: volumeXSvg },
  { from: skipBackSvg, to: skipForwardSvg },
  { from: maximizeSvg, to: minimizeSvg },
  // Actions
  { from: plusSvg, to: minusSvg },
  { from: checkSvg, to: xSvg },
  { from: editSvg, to: saveSvg },
  { from: trashSvg, to: refreshCwSvg },
  { from: downloadSvg, to: uploadSvg },
  // Communication
  { from: mailSvg, to: mailOpenSvg },
  { from: bellSvg, to: bellOffSvg },
  { from: messageCircleSvg, to: messageSquareSvg },
  { from: phoneSvg, to: phoneOffSvg },
  // Weather
  { from: sunSvg, to: moonSvg },
  { from: cloudSvg, to: cloudRainSvg },
  { from: windSvg, to: snowflakeSvg },
  { from: sunSvg, to: cloudRainSvg },
  // UI State
  { from: eyeSvg, to: eyeOffSvg },
  { from: lockSvg, to: unlockSvg },
  { from: wifiSvg, to: wifiOffSvg },
  { from: batterySvg, to: batteryLowSvg },
  { from: heartSvg, to: heartOffSvg },
  { from: starSvg, to: starOffSvg },
  { from: bookmarkSvg, to: bookmarkCheckSvg },
  { from: thumbsUpSvg, to: thumbsDownSvg },
  // Files
  { from: fileSvg, to: fileCheckSvg },
  { from: folderSvg, to: folderOpenSvg },
  { from: imageSvg, to: imageOffSvg },
  // Misc
  { from: smileSvg, to: frownSvg },
  { from: coffeeSvg, to: beerSvg },
  { from: zapSvg, to: zapOffSvg },
  { from: bugSvg, to: shieldSvg },
  // Security
  { from: shieldCheckSvg, to: shieldAlertSvg },
  // Social
  { from: githubSvg, to: globeSvg },
  // Settings
  { from: settingsSvg, to: settings2Svg },
]
