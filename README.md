
# OzJS generator

Scaffolding tool for [OzJS](https://github.com/dexteryy/OzJS) which offers a packaging workflow integrates [Ozma](https://github.com/dexteryy/ozma.js), [istatic](https://github.com/mockee/istatic), [Grunt](http://gruntjs.com/), [Yo](http://yeoman.io/gettingstarted_1.0.html), [Compass](http://compass-style.org)/[Stylus](learnboost.github.com/stylus/), [micro-framework](http://ozjs.org/#framework) and many best practices.

Available generators:

* [ozjs](#app) (aka [ozjs:app](#app))
* more coming soon...

## Getting Started

### Require

1. node, npm
2. [grunt v0.4](http://gruntjs.com/getting-started) - `npm install grunt-cli -g`
3. [istatic](https://github.com/mockee/istatic) - `node install node-istatic -g`
4. [Yo](http://yeoman.io/gettingstarted_1.0.html) - `npm install yo -g`
5. ruby, gem, bundle (if you need Scss)

### Install

```
cd ~
npm install generator-ozjs
```

### Usage

#### App

```
cd empty_project_directory
yo ozjs 
npm install
bundle install
istatic pull
grunt
```

or

```
yo ozjs project_name
cd project_name
npm install
bundle install
istatic pull
grunt
```

### More coming soon...

## Source code

* [View on Github](https://github.com/dexteryy/grunt-ozjs)

## More References

See [OzJS References](http://ozjs.org/#ref)

## Release History

See [OzJS Release History](http://ozjs.org/#release)

## License

Copyright (c) 2010 - 2013 dexteryy  
Licensed under the MIT license.

