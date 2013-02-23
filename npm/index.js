'use strict';
var path = require('path');
var util = require('util');
var fs = require('fs');
var yeoman = require('yeoman-generator');

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

    this.on('end', function () {
        this.log('\nI\'m all done. Just run ' + 'npm install && grunt'.bold.yellow + '. Use ' + 'grunt publish'.bold.yellow + ' to publish to NPM');
    });
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.askForOverride = function() {
    var done = this.async();
    var prompts = [];
    if (fs.existsSync(this.appDir + 'package.json')) {
        prompts.push({
            name: 'ignorePackage',
            message: 'package.json already exists. Overwrite? (N/y)'
        });
    }
    if (fs.existsSync(this.appDir + 'Gruntfile.js')) {
        prompts.push({
            name: 'ignoreGrunt',
            message: 'Gruntfile.js already exists. Overwrite? (N/y)'
        });
    }
    this.prompt(prompts, function(err, props) {
        if (err) {
            return this.emit('error', err);
        }
        this.userOpt.ignorePackage = props.ignorePackage !== undefined 
            && !(/y/i).test(props.ignorePackage);
        this.userOpt.ignoreGrunt = props.ignoreGrunt !== undefined 
            && !(/y/i).test(props.ignoreGrunt);
        setTimeout(done, 0);
    }.bind(this));
};

Generator.prototype.addFiles = function() {
    if (!this.userOpt.ignorePackage) {
        this.template('package.json', this.appDir + 'package.json');
    }
    if (!this.userOpt.ignoreGrunt) {
        this.copy('Gruntfile.js', this.appDir + 'Gruntfile.js');
    }
};
