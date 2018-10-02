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

const main = async () => {
  await preload()
  await Promise.all(
    mapIds.map(mapId =>
      render(mapId).then(() => alert(`started rendering ${mapId}`)),
    ),
  )
  alert('all maps has been rendered!')
}

main()
