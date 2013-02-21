'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var components = require('./components');

var Generator = module.exports = function Generator() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('appname', { 
        type: String, 
        required: false, 
        banner: 'appname'
    });
    this.appDir = this.appname ? this.appname + '/' : '';
    this.appname = this.appname || path.basename(process.cwd());

    this.userOpt = {};

    this.paths = {
        mod: 'js/mod/',
        cssmod: 'css/',
        dist: 'public/dist/',
        statics: 'public/static/'
    }; 

    this.on('end', function () {
        this.log('\nI\'m all done. Just run ' + 'npm install && bundle install && istatic pull'.bold.yellow + ' to install the required dependencies.');
    });
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.askForEnv = function() {
    var done = this.async();
    var prompts = [{
        name: 'forModernBrowser',
        message: 'Does your project only work for modern browser, like chrome, touch device? (N/y)'
    }];
    this.prompt(prompts, function(err, props) {
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
    var prompts = [{
        name: 'cssPreprocessor',
        message: 'Select the css preprocessor you prefer: ' 
            + '(' + '0: ' + 'Scss' + ' [default]'
            + '. 1: ' + 'Stylus' + ' [unavailable]' + ')'
    }];
    this.prompt(prompts, function(err, props) {
        if (err) {
        return this.emit('error', err);
        }
        this.userOpt.cssPreprocessor = parseFloat(props.cssPreprocessor) || 0;
        done();
    }.bind(this));
};

Generator.prototype.askForComponents = function() {
    var self = this;
    var done = this.async();
    var prompts = Object.keys(components).map(function(type){
        var com = this[type];
        return {
            name: type,
            message: 'Select ' + com.desc + ' you wish to include: '
                + '(' + ['0: ' + 'none'].concat(com.choices.map(function(choice, i){
                    return (i + 1) + ': ' + choice.name;
                })).map(function(text, i){
                    return text + (com.defaultChoice === i - 1 && ' [default]'
                        || i && !com.choices[i - 1].repo && ' [unavailable]' || ''); 
                }).join('. ') + ')'
        };
    }, components);
    this.prompt(prompts, function(err, props) {
        if (err) {
            return self.emit('error', err);
        }
        var coms = {};
        for (var i in components) {
            coms[i] = components[i];
        }
        Object.keys(props).forEach(function(type){
            var com = coms[type].choices[props[type] - 1];
            if (!com) {
                props[type] = coms[type].defaultChoice + 1;
                com = coms[type].choices[props[type] - 1];
            }
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
        self.includeComponents = Object.keys(props).map(function(type){
            var com = coms[type].choices[props[type] - 1];
            if (!com) {
                return;
            }
            var file = com.file = {};
            for (var src in com.jsFiles) {
                file[src] = self.paths.mod + com.jsFiles[src];
            }
            for (var src in com.cssFiles) {
                file[src] = self.paths.cssmod + com.cssFiles[src];
            }
            if (com.name === 'Mo') {
                self.userOpt.hasMo = true;
            }
            if (type === 'dom' && com.name !== 'jQuery') {
                self.userOpt.jqueryAlternate = com.moduleId;
            }
            return com;
        });
        done();
    });
};

Generator.prototype.projectFiles = function() {
    this.template('../../templates/config/static.yaml', this.appDir + 'static.yaml');
    this.template('../../templates/config/package.json', this.appDir + 'package.json');
    this.copy('../../templates/config/Gruntfile.js', this.appDir + 'Gruntfile.js');
    this.template('../../templates/config/gitignore', this.appDir + '.gitignore');
    this.template('../../templates/config/README.md', this.appDir + 'README.md');
    if (this.userOpt.cssPreprocessor === 0) {
        this.template('../../templates/config/Gemfile', this.appDir + 'Gemfile');
        this.template('../../templates/config/compass_config.rb', this.appDir + 'css/config.rb');
    }
};

Generator.prototype.bootstrapFiles = function() {
    this.template('../../templates/js/main.js', this.appDir + 'js/main.js');
    this.template('../../templates/js/app.js', this.appDir + 'js/' + this.appname + '/app.js');
    this.mkdir(this.appDir + 'js/' + this.appname + '/view/');
    this.mkdir(this.appDir + 'js/' + this.appname + '/tpl/');
    this.mkdir(this.appDir + 'js/lib/');
    this.mkdir(this.appDir + this.paths.mod);
    this.mkdir(this.appDir + this.paths.cssmod);
    if (this.userOpt.cssPreprocessor === 0) {
        this.template('../../templates/scss/_base.scss', this.appDir + 'css/_base.scss');
        this.template('../../templates/scss/main.scss', this.appDir + 'css/main.scss');
    } else if (this.userOpt.cssPreprocessor === 1) {
        // @TODO stylus
    }
    this.mkdir(this.appDir + 'pics');
    this.mkdir(this.appDir + 'tpl');
    this.template('../../templates/html/index.html', this.appDir + 'docs/index.html');
    this.mkdir(this.appDir + this.paths.dist);
    this.mkdir(this.appDir + this.paths.statics);
};
