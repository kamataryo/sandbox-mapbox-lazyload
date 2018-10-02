// import 'babel-polyfill'
import { preload, render } from './app'

const mapElementIds = [
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

const mapOpts = mapElementIds.reduce(
  (prev, mapElementId) => ({
    ...prev,
    [mapElementId]: {
      container: mapElementId,
      style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
      attributionControl: true,
      localIdeographFontFamily: 'sans-serif',
    },
  }),
  {},
)

const lazyOpts = {
  buffer: -100, // [px]: create element buffer wrap to early loading
}

const main = async () => {
  // load assets (CSS) and wait to be used
  await preload()

  // promise map rendering
  await Promise.all(
    mapElementIds.map(mapId =>
      render(mapOpts[mapId], lazyOpts).then(map => {
        alert(`started rendering ${mapId}`)
        console.log({ map })
      }),
    ),
  )

  alert('all maps has been rendered!')
}

// GO!
main()
