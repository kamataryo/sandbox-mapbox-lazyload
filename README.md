# Sandbox Mapbox Lazyload

## DEMO

https://kamataryo.github.io/sandbox-mapbox-lazyload/index.html

## development

### Run demo locally

```shell
$ git clone https://github.com/kamataryo/sandbox-mapbox-lazyload.git
$ cd sandbox-mapbox-Lazyload
$ yarn # or npm install
$ npm start
```

## build

```shell
$ npm run build # see ./dist
```

## usage

```javascript
import { render } from '@kamataryo/sandbox-mapbox-lazyload'

render(mapOptions, lazyOptions).then(map => {
  console.log('rendering started!')
  map.addLayer()
})
```

```javascript
// mapOptions
{
  // mapbox gl option https://www.mapbox.com/mapbox-gl-js/api/#map
  container: 'map' // id
  styleURL: 'https://example.com/style.json', // style => styleURL
  attributionControl: true,
  localIdeographFontFamily: 'sans-serif',
  ...
}

// lazyOptions
{
  buffer: 100, // map box size extending
}
)
```

## idea

```html
<!-- returns map with { width:100%, height: 100% } -->
<iframe src="https://example.com/embed?apiKey=xxxxxxx&style=foo" width="500" height="500"></iframe>
```
