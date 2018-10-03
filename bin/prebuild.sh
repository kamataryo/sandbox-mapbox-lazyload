#! /usr/bin/env bash

mkdir -p ./temp
echo "export default \`" > ./temp/mapbox-gl.css.js
cat ./node_modules/mapbox-gl/dist/mapbox-gl.css >> ./temp/mapbox-gl.css.js
echo "\`" >> ./temp/mapbox-gl.css.js
