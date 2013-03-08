
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: "<%= grunt.file.readJSON('package.json') %>",
        meta: {
            publicDir: 'public',
            distDir: '<%= meta.publicDir %>/dist',
            staticDir: '<%= meta.publicDir %>/static',
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %>'
        },

        clean: {
            dist: ["<%= meta.distDir %>"],
            statics: ["<%= meta.staticDir %>"]
        },

        furnace: {
            tpl: {
                options: {
                    importas: 'tpl',
                    exportas: 'amd',
                },
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: 'tpl/',
                    src: ['**/*.tpl'], // Actual pattern(s) to match.
                    dest: 'js/<%= pkg.name %>/tpl/',   // Destination path prefix.
                    ext: '.js'
                }]
            }
        },

        ozma: {
            main: {
                saveConfig: false,
                src: 'js/main.js',
                config: {
                    baseUrl: "js/mod/",
                    distUrl: "<%= meta.distDir %>/js/mod/",
                    loader: "../lib/oz.js",
                    disableAutoSuffix: true
                }
            }
        },

        compass: {
            main: {
                options: {
                    config: 'css/config.rb',
                    sassDir: 'css',
                    cssDir: '<%= meta.distDir %>/css',
                    imagesDir: 'pics',
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
                files: {
                    '<%= meta.distDir %>/pics/': 'pics/**.{png,jpg}'
                }
            }
        },

        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= meta.publicDir %>/index.html': 'docs/index.html'
                }
            }
        },

        concat: {
            js_main: {
                src: ['<%= meta.banner %>', '<%= meta.distDir %>/js/main.js'],
                dest: '<%= meta.staticDir %>/js/main.src.js'
            },
            css_main: {
                src: ['<%= meta.banner %>', '<%= meta.distDir %>/css/main.css'],
                dest: '<%= meta.staticDir %>/css/main.src.css'
            }
        },

        uglify: {
            main: {
                src: ['<%= concat.js_main.dest %>'],
                dest: '<%= meta.staticDir %>/js/main.js'
            }
        },

        cssmin: {
            main: {
                src: ['<%= concat.css_main.dest %>'],
                dest: '<%= meta.staticDir %>/css/main.css'
            }
        },

        copy: {
            pics: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.distDir %>/',
                    src: ['pics/**'],
                    dest: '<%= meta.staticDir %>/'
                }]
            },
        },

        jshint: {
            options: {
                // Settings
                "passfail": false,             // Stop on first error.
                // Env
                "browser": true,               // Standard browser globals e.g. `window`, `document`.
                "nonstandard": true,
                "node": true,
                "globals": {
                    "ActiveXObject": true,
                    "require": true,
                    "define": true,
                    "module":true
                },
                // Development.
                "devel": false,                // Allow developments statements e.g. `console.log();`.
                "debug": false,                // Allow debugger statements e.g. browser breakpoints.
                // ECMAScript 5.
                "es5": true,                   // Allow ECMAScript 5 syntax.
                "strict": false,               // Require `use strict` pragma in every file.
                "esnext": false,               // tells JSHint that your code uses ES.next specific features such as const and let
                // The Good Parts.
                "eqeqeq": false,               // prohibits the use of == and != in favor of === and !==
                "eqnull": true,                // Tolerate use of `== null`.
                "immed": true,                 // Require immediate invocations to be wrapped in parens e.g. `( function(){}() );`
                "noarg": true,                 // Prohibit use of `arguments.caller` and `arguments.callee`.
                "undef": true,                 // Require all non-global variables be declared before they are used.
                "unused": true,                // warns when you define and never use your variables.
                "trailing": false,             // makes it an error to leave a trailing whitespace in your code
                "boss": true,                  // Tolerate assignments inside if, for & while. Usually conditions & loops are for comparison, not assignments.
                "evil": true,                  // Tolerate use of `eval`.
                "shadow": true,                // suppresses warnings about variable shadowing i.e. declaring a variable that had been already declared somewhere in the outer scope.
                "proto": true,                 // suppresses warnings about the __proto__ property
                "validthis": true,             // suppresses warnings about possible strict violations when the code is running in strict mode and you use this in a non-constructor function
                // Personal styling preferences.
                //"indent": 4,                   // Specify indentation spacing
                "asi": false,                  // suppresses warnings about missing semicolons
                "laxbreak": true,              // Tolerate unsafe line breaks e.g. `return [\n] x` without semicolons.
                "laxcomma": true,              // suppresses warnings about comma-first coding style
                "curly": false,                 // Require {} for every new block or scope.
                "nonew": true,                 // Prohibit use of constructors for side-effects.
                "sub": true,                   // Tolerate all forms of subscript notation besides dot notation e.g. `dict['key']` instead of `dict.key`.
                "loopfunc": true,              // suppresses warnings about functions inside of loops.
                "regexdash": true,             // suppresses warnings about unescaped - in the end of regular expressions
                "white": false,                // Check against strict whitespace and indentation rules.
                "scripturl": true,             // Tolerate script-targeted URLs.
                "multistr": true               // suppresses warnings about multi-line strings
            },
            main: ['./*.js', 'js/**/*.js', '!js/mod/**', '!js/lib/**']
        },

        connect: {
            examples: {
                options: {
                    port: 9001,
                    base: '<%= meta.publicDir %>/',
                    keepalive: true
                }
            }
        },

        watch: [{
            files: 'js/**/*.js',
            tasks: ['ozma']
        }, {
            files: 'css/**/*.scss',
            tasks: ['compass']
        }, {
            files: 'tpl/**/*.tpl',
            tasks: ['furnace:tpl']
        }, {
            files: 'pics/**/*.{png,jpg}',
            tasks: ['imagemin']
        }, {
            files: 'docs/**/*.html',
            tasks: ['htmlmin']
        }]

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
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-furnace');
    grunt.loadNpmTasks('grunt-ozjs');
    
    grunt.registerTask('dev', [
        'jshint',
        'clean:dist',
        'furnace:tpl',
        'ozma',
        'imagemin',
        'compass',
        'htmlmin'
    ]);

    grunt.registerTask('deploy', [
        'clean:statics',
        'concat',
        'uglify', 
        'cssmin',
        'copy:pics'
    ]);

    grunt.registerTask('default', [
        'dev',
        'deploy'
    ]);

};
