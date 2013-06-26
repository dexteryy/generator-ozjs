'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var components = require('./components');
var prompt = require('prompt');

prompt.message = "";
prompt.delimiter = "";
prompt.colors = false;

var Generator = module.exports = function Generator() {

    yeoman.generators.Base.apply(this, arguments);

    this.argument('appname', { 
        type: String, 
        required: false, 
        banner: 'appname'
    });
    this.appDir = (this.appname || '.') + '/';

    this.on('end', function () {
        this.log('\nI\'m all done. Just run ' + (
            (this.appname ? ('cd ' + this.appDir + ' && ') : '') 
            + 'npm install && bundle install && istatic pull && cp config.js.tmpl config.js && grunt'
        ).bold.yellow + ' to install the required dependencies and build the app.');
    });

    this.appname = this.appname || path.basename(process.cwd());

    this.userOpt = {};

    this.paths = {
        js: 'js',
        css: 'css',
        pics: 'pics',
        tpl: 'tpl',
        docs: 'docs',
        lib: 'lib',
        mod: 'mod',
        origin: 'origin',
        target: 'target',
        dist: 'dist'
    }; 

    this.tag = function(str){
        return '<%= ' + str + ' %>';
    };

};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.askForEnv = function() {
    var done = this.async();
    prompt.start();
    prompt.get({
        properties: {
            forModernBrowser: {
                description: "Does your project only work for modern browser, like chrome, touch device? ".cyan
                    + 'y/n'.magenta,
                type: 'string',
                pattern: /^[yYnN]$/,
                default: 'N'
            }
        }
    }, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }
        this.userOpt.forModernBrowser = (/y/i).test(props.forModernBrowser);
        done();
    }.bind(this));
};

Generator.prototype.askForName = function() {

};

Generator.prototype.askForTools = function() {
    var done = this.async();
    prompt.start();
    prompt.get({
        properties: {
            cssPreprocessor: {
                description: "Select the css preprocessor you prefer? ".cyan
                    + ('0: ' + 'Scss' + ' [default]' + '. 1: ' + 'Stylus' + ' [unavailable]').magenta,
                type: 'string',
                pattern: /^[0-1]$/,
                default: 0
            }
        }
    }, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }
        this.userOpt.cssPreprocessor = parseFloat(props.cssPreprocessor) || 0;
        done();
    }.bind(this));
};

Generator.prototype.askForComponents = function() {
    var done = this.async();

    var properties = {};
    Object.keys(components).forEach(function(type){
        var com = this[type];
        properties[type] = {
            description: ('Select ' + com.desc + ' you wish to include: ').cyan 
                + ['0: ' + 'none'].concat(com.choices.map(function(choice, i){
                    return (i + 1) + ': ' + choice.name;
                })).map(function(text, i){
                    return text + (com.defaultChoice === i - 1 && ' [default]'
                        || i && !com.choices[i - 1].repo && !com.choices[i - 1].repos && ' [unavailable]' || ''); 
                }).join('. ').magenta,
            type: 'string',
            pattern: new RegExp('^[0-' + com.choices.length + ']$'),
            default: com.defaultChoice + 1
        };
    }, components);

    prompt.start();
    prompt.get({
        properties: properties
    }, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }
        var coms = {};
        for (var i in components) {
            coms[i] = components[i];
        }
        Object.keys(props).forEach(function(type){
            var n = parseInt(props[type], 10);
            //if (n !== 0 && !n) {
                //props[type] = coms[type].defaultChoice + 1;
            //}
            var com = coms[type].choices[n - 1];
            if (com && com.repos) {
                com.repos.forEach(function(sub, i){
                    props[type + i] = 1;
                    coms[type + i] = {
                        choices: [sub]
                    };
                });
                delete props[type];
            }
        });
        this.includeComponents = Object.keys(props).map(function(type){
            var com = coms[type].choices[props[type] - 1];
            if (!com) {
                return;
            }
            var file = com.file = {};
            for (var src in com.jsFiles) {
                file[src] = this.paths.js + '/' + this.paths.mod + '/' + com.jsFiles[src];
            }
            for (var src in com.cssFiles) {
                file[src] = this.paths.css + '/' + com.cssFiles[src];
            }
            for (var src in com.assetFiles) {
                file[src] = this.paths.pics + '/' + com.assetFiles[src];
            }
            for (var src in com.originFiles) {
                file[src] = this.paths.origin + '/' + com.originFiles[src];
            }
            if (com.name === 'Mo') {
                this.userOpt.hasMo = true;
            }
            if (type === 'dom' && com.name !== 'jQuery') {
                this.userOpt.jqueryAlternate = com.moduleId;
            }
            if (com.name === 'ArkUI') {
                this.userOpt.hasArkui = true;
            }
            return com;
        }.bind(this));
        done();
    }.bind(this));
};

Generator.prototype.projectFiles = function() {
    var root = this.appDir;
    this.template('../../templates/config/static.yaml', root + 'static.yaml');
    this.template('../../templates/config/package.json', root + 'package.json');
    this.template('../../templates/config/config.js.tmpl', root + 'config.js.tmpl');
    this.template('../../templates/config/jshint.json', root + 'jshint.json');
    this.template('../../templates/config/Gruntfile.js', root + 'Gruntfile.js');
    this.template('../../templates/config/gitignore', root + '.gitignore');
    this.template('../../templates/config/README.md', root + 'README.md');
    if (this.userOpt.cssPreprocessor === 0) {
        this.template('../../templates/config/Gemfile', root + 'Gemfile');
        this.template('../../templates/config/compass_config.rb', 
            root + this.paths.css + '/config.rb');
    }
};

Generator.prototype.bootstrapFiles = function() {
    var root = this.appDir;
    var p = this.paths;
    this.template('../../templates/js/main.js', root + [p.js, 'main.js'].join('/'));
    this.template('../../templates/js/app.js', root + [p.js, this.appname, 'app.js'].join('/'));
    this.mkdir(root + [p.js, this.appname, p.tpl].join('/'));
    this.mkdir(root + [p.js, 'lib'].join('/'));
    this.mkdir(root + [p.js, p.mod].join('/'));
    this.mkdir(root + [p.css, this.appname].join('/'));
    this.mkdir(root + [p.css, p.origin].join('/'));
    if (this.userOpt.cssPreprocessor === 0) {
        this.template('../../templates/scss/_base.scss', root + [p.css, this.appname, '_base.scss'].join('/'));
        this.template('../../templates/scss/main.scss', root + [p.css, 'main.scss'].join('/'));
    } else if (this.userOpt.cssPreprocessor === 1) {
        // @TODO stylus
    }
    this.mkdir(root + p.pics);
    this.copy('../../templates/pics/glyphicons-halflings.png', root + [p.pics, 'glyphicons-halflings.png'].join('/'));
    this.mkdir(root + p.tpl);
    this.template('../../templates/html/index.html', root + [p.docs, 'index.html'].join('/'));
};
