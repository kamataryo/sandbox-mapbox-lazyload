import TilecloudControl from '@tilecloud/mbgl-tilecloud-control'
import mapboxgl from 'mapbox-gl'

export const render = elementId => {
  let onceRendered = false
  const onScrollEventHandler = () => {
    console.log('scrolling')
    if (!onceRendered && isInVerticalView(elementId)) {
      onceRendered = true
      console.log('start map rendering')

      fetch('./mapbox-gl.css')
        .then(res => res.text())
        .then(cssText => {
          const head = document.getElementsByTagName('head')[0]
          const style = document.createElement('style')
          style.innerText = cssText.replace(/\n/g, '')
          head.appendChild(style)
        })

      const tilecloudMap = new mapboxgl.Map({
        container: 'map',
        style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
        attributionControl: true,
        hash: true,
        localIdeographFontFamily: 'sans-serif',
        interactive: true,
      })

      tilecloudMap.addControl(new mapboxgl.NavigationControl())
      tilecloudMap.addControl(new mapboxgl.GeolocateControl())
      tilecloudMap.addControl(new TilecloudControl())
      return tilecloudMap
    }
  }

  window.addEventListener('scroll', onScrollEventHandler, false)
}

const isInVerticalView = elementId => {
  const documentTop = window.pageYOffset || document.documentElement.scrollTop
  const documentBottom = documentTop + window.innerHeight

  const element = document.getElementById(elementId)
  const elementTop = documentTop + element.getBoundingClientRect().top
  const elementBottom = elementTop + element.style.height

  return elementBottom <= documentBottom && elementTop >= documentTop
}
