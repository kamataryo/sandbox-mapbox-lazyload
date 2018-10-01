import TilecloudControl from '@tilecloud/mbgl-tilecloud-control'
import mapboxgl from 'mapbox-gl'

const onceRendered = {}
const $css = Symbol('css')

export const render = elementId => {
  return new Promise((resolve, reject) => {
    const onScrollEventHandler = () => {
      if (!onceRendered[elementId] && isInView(elementId)) {
        onceRendered[elementId] = true

        // load css once
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

const isInView = elementId => {
  const documentTop = window.pageYOffset || document.documentElement.scrollTop
  const documentLeft = window.pageXOffset || document.documentElement.scrollLeft
  const documentBottom = documentTop + window.innerHeight
  const documentRight = documentLeft + window.innerWidth

  const element = document.getElementById(elementId)
  const rect = element.getBoundingClientRect()
  const elementTop = documentTop + rect.top
  const elementLeft = documentLeft + rect.left
  const elementBottom = elementTop + element.offsetHeight
  const elementRight = elementLeft + element.offsetWidth

  console.log({
    elementBottom,
    documentBottom,
    elementTop,
    documentTop,
    elementRight,
    documentRight,
    elementLeft,
    documentLeft,
  })

  return (
    elementTop <= documentBottom &&
    elementRight >= documentLeft &&
    elementLeft <= documentRight &&
    elementBottom >= documentTop
  )
}
