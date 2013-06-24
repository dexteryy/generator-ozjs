
module.exports = function(grunt) {

    var config = require('./config');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            publicDir: config.publicDir,
            staticDir: config.staticDir,
            targetDir: '<%= paths.target %>',
            distDir: '<%= paths.dist %>'
        },

        clean: {
            pub: ["<%= tag('meta.publicDir') %>"],
            target: ["<%= tag('meta.targetDir') %>"],
            dist: ["<%= tag('meta.distDir') %>"]
        },

        furnace: {
            tpl: {
                options: {
                    importas: 'tpl',
                    exportas: 'amd'
                },
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: '<%= paths.tpl %>/',
                    src: ['**/*.tpl'], // Actual pattern(s) to match.
                    dest: '<%= paths.js %>/<%= tag("pkg.name") %>/<%= paths.tpl %>/',   // Destination path prefix.
                    ext: '.js'
                }]
            }
        },

        ozma: {
            main: {
                saveConfig: false,
                src: '<%= paths.js %>/main.js',
                config: {
                    baseUrl: "<%= paths.js %>/<%= paths.mod %>/",
                    distUrl: "<%= tag('meta.targetDir') %>/<%= paths.js %>/<%= paths.mod %>/",
                    loader: "../<%= paths.lib %>/oz.js",
                    disableAutoSuffix: true
                }
            }
        },

        compass: {
            main: {
                options: {
                    config: '<%= paths.css %>/config.rb',
                    sassDir: '<%= paths.css %>',
                    cssDir: '<%= tag("meta.targetDir") %>/<%= paths.css %>',
                    imagesDir: '<%= tag("meta.targetDir") %>/<%= paths.pics %>',
                    relativeAssets: true,
                    outputStyle: 'expanded',
                    noLineComments: false,
                    require: [
                        'compass-normalize',
                        'animation',
                        'animate-sass',
                        'ceaser-easing',
                        'compass-recipes'
                    ],
                    environment: 'production'
                }
            }
        },

        imagemin: {
            main: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.pics %>/',
                    src: ['**/*.{png,jpg}'],
                    dest: '<%= tag("meta.targetDir") %>/<%= paths.pics %>/'
                }]
            }
        },

        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.docs %>/',
                    src: ['**/*.html'],
                    dest: '<%= tag("meta.publicDir") %>/'
                }]
            }
        },

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= tag("pkg.name") %> - v<%= tag("pkg.version") %> */\n'
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= tag("meta.targetDir") %>/<%= paths.js %>/',
                    src: ['**/*.js'],
                    dest: '<%= tag("meta.distDir") %>/<%= paths.js %>/'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= tag("meta.targetDir") %>/<%= paths.css %>/',
                    src: ['**/*.css'],
                    dest: '<%= tag("meta.distDir") %>/<%= paths.css %>/'
                }]
            }
        },

        uglify: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= tag("meta.distDir") %>/<%= paths.js %>/',
                    src: ['**/*.js'],
                    dest: '<%= tag("meta.distDir") %>/<%= paths.js %>/',
                    ext: '.min.js'
                }]
            }
        },

        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= tag("meta.distDir") %>/<%= paths.css %>/',
                    src: ['**/*.css'],
                    dest: '<%= tag("meta.distDir") %>/<%= paths.css %>/',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            target2pub: {
                files: [{
                    expand: true,
                    cwd: '<%= tag("meta.targetDir") %>/',
                    src: ['**', '!<%= paths.pics %>/**'],
                    dest: '<%= tag("meta.staticDir") %>/'
                }]
            },
            dist2pub: {
                files: [{
                    expand: true,
                    cwd: '<%= tag("meta.distDir") %>/',
                    src: ['**'],
                    dest: '<%= tag("meta.staticDir") %>/'
                }]
            }
        },

        jshint: {
            options: grunt.file.readJSON('jshint.json'),
            dev: {
                options: {
                    devel: true,
                    debug: true,
                    asi: true 
                },
                files: {
                    src: ['./*.js', '<%= paths.js %>/**/*.js', '!<%= paths.js %>/<%= paths.mod %>/**', '!<%= paths.js %>/<%= tag("pkg.name") %>/<%= paths.tpl %>/**']
                }
            },
            dist: {
                files: {
                    src: ['./*.js', '<%= paths.js %>/**/*.js', '!<%= paths.js %>/<%= paths.mod %>/**', '!<%= paths.js %>/<%= tag("pkg.name") %>/<%= paths.tpl %>/**']
                }
            }
        },

        complexity: {
            generic: {
                src: ['<%= paths.js %>/<%= tag("pkg.name") %>/*.js', '!<%= paths.js %>/<%= tag("pkg.name") %>/<%= paths.tpl %>/**'],
                options: {
                    cyclomatic: 10,
                    halstead: 25,
                    maintainability: 100
                }
            }
        },

        connect: {
            pub: {
                options: {
                    hostname: 'localhost',
                    port: 9001,
                    base: '<%= tag("meta.publicDir") %>/',
                    keepalive: true
                }
            }
        },

        watch: {
            dev: {
                files: [
                    '<%= paths.tpl %>/**/*.tpl', 
                    '<%= paths.pics %>/**/*.{png,jpg}', 
                    '<%= paths.docs %>/**/*.html',
                    '<%= paths.js %>/**/*.js', 
                    '<%= paths.css %>/**/*.scss'
                ],
                tasks: [
                    'dev', 
                    'test'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-complexity');

    grunt.loadNpmTasks('grunt-furnace');
    grunt.loadNpmTasks('grunt-ozjs');
    
    grunt.registerTask('dev', [
        'clean:target', 
        'furnace:tpl', 
        'imagemin', 
        'ozma', 
        'compass'
    ]);

    grunt.registerTask('test', [
        'clean:pub',
        'htmlmin',
        'copy:target2pub'
    ]);

    grunt.registerTask('publish', [
        'clean:dist',
        'concat',
        'uglify', 
        'cssmin'
    ]);

    grunt.registerTask('deploy', [
        'clean:pub',
        'htmlmin',
        'copy:dist2pub'
    ]);

    grunt.registerTask('default', [
        'jshint:dist',
        'dev',
        'publish',
        'deploy'
    ]);

};
