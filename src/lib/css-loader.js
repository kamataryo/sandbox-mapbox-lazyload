import mapboxStyleText from '../../temp/mapbox-gl.css'

let cssLoaded = false
const head = document.getElementsByTagName('head')[0]
const style = document.createElement('style')
style.innerText = mapboxStyleText.replace(/\n/g, '')

export const loadCssOnce = () => {
  if (!cssLoaded) {
    cssLoaded = true
    head.appendChild(style)
  }
}
