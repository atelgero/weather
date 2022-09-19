# Weather-widget v0.1.0

_Always a nice weather ^-^_

----

A lightweight widget for embedding on a page and showing a weather in the selected city or cities.

No bootstrap or other CSS framework dependencies.

Under the hood: VueJS 2.7,
[Weather API](https://openweathermap.org/current) v2.5
and [Geocoding API](https://openweathermap.org/api/geocoding-api) v1.0

## Usage

Just insert on your page the next snippet:

```html

<weather-widget/>
<script src="./widget.js"></script>
```

## Project setup

```
make install
```

### Compiles and hot-reloads for development

```
make run
```

### Compiles and minifies for production

```
make build
```

### Lints and fixes files

```
make lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Todo for version 0.2

* Localization of the widget in settings (at least EN, CN, JP, RU, BR, DE, ES).
* Wind direction. Now this data is available in API response but required mapping for direction in degrees to short
  abbreviation (SSE, NW, etc).
* Test coverage.