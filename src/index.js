import TilecloudControl from '@tilecloud/mbgl-tilecloud-control'
import mapboxgl from 'mapbox-gl'
import mapboxStyleText from '../temp/mapbox-gl.css'

const preloadedStyles = {}
const onceRendered = {}

const defaultMapOpts = {
  style: void 0,
  styleURL: 'https://tilecloud.github.io/tiny-tileserver/style.json',
  attributionControl: true,
  localIdeographFontFamily: 'sans-serif',
}
const defaultLazyOpts = {
  buffer: 0,
}

const fetchStyles = styleURLs =>
  styleURLs
    // .filter((x, i, self) => self.indexOf(x) === i) // make unique
    .map(url =>
      fetch(url)
        .then(res => res.json())
        .then(data => ({ data, url })),
    )

export const preload = styleURLs => {
  console.log(mapboxStyleText)
  // write css
  const head = document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  style.innerText = mapboxStyleText.replace(/\n/g, '')
  head.appendChild(style)

  // preload all style.json
  return Promise.all(fetchStyles(styleURLs)).then(data => {
    data.forEach(
      ({ data, url }) => /* store style.json */ (preloadedStyles[url] = data),
    )
    return { ready: true }
  })
}

export const render = (mapOpts, lazyOpts = {}) => {
  const mapOptions = {
    ...defaultMapOpts,
    ...mapOpts,
    style: preloadedStyles[mapOpts.styleURL] || {},
  }
  const lazyOptions = { ...defaultLazyOpts, ...lazyOpts }
  const elementId = mapOptions.container

  return new Promise((resolve, reject) => {
    const onScrollEventHandler = () => {
      if (!onceRendered[elementId] && isInView(elementId, lazyOptions)) {
        onceRendered[elementId] = true

        let map
        try {
          map = new mapboxgl.Map(mapOptions)

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

const isInView = (elementId, { buffer }) => {
  const documentTop = window.pageYOffset || document.documentElement.scrollTop
  const documentLeft = window.pageXOffset || document.documentElement.scrollLeft
  const documentBottom = documentTop + window.innerHeight
  const documentRight = documentLeft + window.innerWidth

  const element = document.getElementById(elementId)
  const rect = element.getBoundingClientRect()
  const elementTop = documentTop + rect.top + buffer
  const elementLeft = documentLeft + rect.left + buffer
  const elementBottom = elementTop + element.offsetHeight - 2 * buffer
  const elementRight = elementLeft + element.offsetWidth - 2 * buffer

  return (
    elementTop <= documentBottom &&
    elementRight >= documentLeft &&
    elementLeft <= documentRight &&
    elementBottom >= documentTop
  )
}
