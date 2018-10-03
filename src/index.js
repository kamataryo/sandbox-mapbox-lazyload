import TilecloudControl from '@tilecloud/mbgl-tilecloud-control'
import mapboxgl from 'mapbox-gl'
import { loadCssOnce } from './lib/css-loader'
import { fetchStyle } from './lib/requests'
import { isInView } from './lib/check-element-bounds'

const onceRendered = {}

const defaultMapOpts = {
  style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
  attributionControl: true,
  localIdeographFontFamily: 'sans-serif',
}
const defaultLazyOpts = {
  buffer: 0,
}

export const render = (mapOpts, lazyOpts = {}) => {
  // load once
  loadCssOnce()

  const mapOptions = { ...defaultMapOpts, ...mapOpts }
  const lazyOptions = { ...defaultLazyOpts, ...lazyOpts }
  const elementId = mapOptions.container

  return fetchStyle(mapOptions.style).then(
    () =>
      new Promise((resolve, reject) => {
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
            } finally {
              window.removeEventListener('scroll', onScrollEventHandler)
              resolve(map)
            }
          }
        }

        window.addEventListener('scroll', onScrollEventHandler, false)
        onScrollEventHandler()
      }),
  )
}
