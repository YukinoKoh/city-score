Neibourhood Map project

## This web app does.. 
- Show the city scores, using API by [Teleport](https://teleport.org/about-us/)
- Show the list cities which retrieve the data from Teleport.
- Show the cities in the map
- Allows user to filter the city by its name

## File structure
- `index.html`: front page html
- `js`: js for the app, which works like [this](#)
- `sass`: includes a scss file for the app
- `css`: includes a css file generated by the sass
- `Gruntfile.js`: Grunt file to convert SCSS to CSS
- `Gruntfile.yml`: Same as the above
- `package-lock.json`: npm package for Grunt usage
- `package.json`: Same as the above
- `node_modules`: Same as the above

## What those javascript files do
- `model.js`: store data
- `vm.js`: handle data 
- `view.js`: construct frontend
- `app.js`: initiate the app, prompting mapping, binding data with knockout fromework. 
- `knockout.js`: to bind data of model.js to the front page. [About knowckout](http://knockoutjs.com/downloads/index.html)


## Useful command in dev tool:
- `localstorage.clear()` in dev tool.
- `Date.now()` to show date


## Other javascript tips
```
var app = app || {}
```
This will create app object if it doesn't exist
