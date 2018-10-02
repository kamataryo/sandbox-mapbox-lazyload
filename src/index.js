// import 'babel-polyfill'
import { preload, render } from './app'

const mapIds = [
  'map-0',
  'map-1',
  'map-2',
  'map-3',
  'map-4',
  'map-5',
  'map-6',
  'map-7',
  'map-8',
]

const createMapOpts = elementId => ({
  container: elementId,
  style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
  attributionControl: true,
  localIdeographFontFamily: 'sans-serif',
})

const lazyOpts = {
  buffer: 100, // create element buffer wrap to early loading
}

const main = async () => {
  await preload()
  await Promise.all(
    mapIds.map(mapId =>
      render(createMapOpts(mapId), lazyOpts).then(() =>
        alert(`started rendering ${mapId}`),
      ),
    ),
  )
  alert('all maps has been rendered!')
}

main()
