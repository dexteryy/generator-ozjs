<!---
layout: intro
title: generator-ozjs
-->

# OzJS generator

Scaffolding tool for [OzJS](https://github.com/dexteryy/OzJS) which offers a packaging workflow integrates [Ozma](http://ozjs.org/ozma), [istatic](https://ozjs.org/istatic), [Grunt](http://gruntjs.com/), [Yo](http://yeoman.io/gettingstarted_1.0.html), [Compass](http://compass-style.org)/[Stylus](http://learnboost.github.com/stylus/), [micro-framework](http://ozjs.org/#framework) and many best practices.

Available generators:

* [ozjs](#app) (aka [ozjs:app](#app)) - create a OzJS-based web app project
* [ozjs:npm](#npm) - create configure files to publish AMD module to NPM without tears
* more coming soon...

## Getting Started

### Require

1. node, npm
2. ruby, gem, [bundler](http://gembundler.com/) (if you need Scss)

### Install

```
npm install -g generator-ozjs
```

### Usage

#### App

```
cd empty_project_directory
yo ozjs 
npm install
bundle install
istatic pull
cp config.js.tmpl config.js
grunt
```

or

```
yo ozjs project_name
cd project_name
npm install
bundle install
istatic pull
cp config.js.tmpl config.js
grunt
```

#### NPM

```
yo ozjs:npm [project_directory]
npm install
grunt
grunt publish
```

### More coming soon...

## Source code

* [View on Github](https://github.com/dexteryy/generator-ozjs)

## More References

See [OzJS Project Homepage](http://ozjs.org/)

## Release History

See [OzJS Release History](http://ozjs.org/#release)

## License

Copyright (c) 2010 - 2013 dexteryy  
Licensed under the MIT license.

