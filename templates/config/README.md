
# <%= appname %>

// @TODO
_(Coming soon)_

## Quick Start

### Prepare the environment

1. node, npm
2. [grunt v0.4](http://gruntjs.com/getting-started) - `npm install grunt-cli -g`
3. [istatic v0.3.2+](https://ozjs.org/istatic) - `npm install node-istatic -g`
4. ruby, gem, [bundler](http://gembundler.com/)

### Install dependencies

1. `npm install`
2. `bundle install`
3. `istatic pull`

### Build

1. `cp config.js.tmpl config.js`
2. `grunt`

## Development

1. `grunt watch:dev`
2. Edit source files in `<%= paths.js %>`, `<%= paths.css %>`, `<%= paths.tpl %>` and `<%= paths.docs %>`

## Testing

1. `grunt connect`
2. See [http://localhost:9100/](http://localhost:9001/)
