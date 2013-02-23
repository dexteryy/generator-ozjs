
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        meta: {
            publishDir: 'npmpackage'
        },

        furnace: {
            npm: {
                options: {
                    importas: 'amd',
                    exportas: 'cjs',
                },
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['**/*.js', '!<%= meta.publishDir %>/**', '!node_modules/**', '!Gruntfile.js'],
                    dest: '<%= meta.publishDir %>/',
                    ext: '.js'
                }]
            }
        },

        copy: {
            npm: {
                files: [{
                    src: ['package.json', 'README.md'],
                    dest: '<%= meta.publishDir %>/'
                }]
            }
        },

        clean: {
            publish: ['<%= meta.publishDir %>/']
        },

        shell: {
            publish: {
                command: 'npm publish',
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: '<%= meta.publishDir %>'
                    }
                }
            }
        },

        jshint: {
            options: {
            },
            main: ['**/*.js', '!<%= meta.publishDir %>/**', '!node_modules/**']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-furnace');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['jshint', 'clean:publish', 'furnace', 'copy']);
    grunt.registerTask('publish', ['default', 'shell:publish']);

};

