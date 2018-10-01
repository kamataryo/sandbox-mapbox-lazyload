import TilecloudControl from '@tilecloud/mbgl-tilecloud-control'
import mapboxgl from 'mapbox-gl'

const onceRendered = {}
const $css = Symbol('css')

export const render = elementId => {
  return new Promise((resolve, reject) => {
    const onScrollEventHandler = () => {
      console.log('scrolling')
      if (!onceRendered[elementId] && isInVerticalView(elementId)) {
        onceRendered[elementId] = true
        console.log('start map rendering')

        !onceRendered[$css] &&
          fetch('./mapbox-gl.css')
            .then(res => res.text())
            .then(cssText => {
              const head = document.getElementsByTagName('head')[0]
              const style = document.createElement('style')
              style.innerText = cssText.replace(/\n/g, '')
              head.appendChild(style)
            })
        onceRendered[$css] = true

        let map
        try {
          map = new mapboxgl.Map({
            container: elementId,
            style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
            attributionControl: true,
            hash: true,
            localIdeographFontFamily: 'sans-serif',
            interactive: true,
          })

          map.addControl(new mapboxgl.NavigationControl())
          map.addControl(new mapboxgl.GeolocateControl())
          map.addControl(new TilecloudControl())
        } catch (e) {
          reject(e)
        }

        resolve(map)
      }
    }

    onScrollEventHandler()
    window.addEventListener('scroll', onScrollEventHandler, false)
  })
}

const isInVerticalView = elementId => {
  const documentTop = window.pageYOffset || document.documentElement.scrollTop
  const documentBottom = documentTop + window.innerHeight

  const element = document.getElementById(elementId)
  const elementTop = documentTop + element.getBoundingClientRect().top
  const elementBottom = elementTop + element.style.height

  return elementBottom <= documentBottom && elementTop >= documentTop
}
