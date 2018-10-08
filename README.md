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

```html
<!DOCTYPE html>
<html>
<body>
  <div id="map" />
</body>
</html>
```

```javascript
import { render } from '@kamataryo/sandbox-mapbox-lazyload'

render('map').then(map => {
    console.log('rendering started!')
    map.addLayer()
})

// more options
render(mapOptions, lazyOptions).then(map => { ... })
```

```javascript
// mapOptions
{
  // mapbox gl option https://www.mapbox.com/mapbox-gl-js/api/#map
  container: 'map' // id
  style: 'https://example.com/style.json',
  attributionControl: true,
  localIdeographFontFamily: 'sans-serif',
  ...
}

// lazyOptions
{
  buffer: 100, // map box size extending. The larger, the earlier your map rendering starts.
}
)
```

## ideas

- How shipping

  ```html
  <!-- returns map with { width:100%, height: 100% } -->
  <iframe src="https://example.com/embed?apiKey=xxxxxxx&style=foo" width="500" height="500"></iframe>
  ```
