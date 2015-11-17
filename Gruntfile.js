module.exports = function(grunt) {  

  grunt.initConfig({

    copy: {
      build: {
        cwd: 'src',
        src: [ '**', '!***/**/*.js', '!assets/css/*.css', '!assets/**/*.map' ],
        dest: 'build',
        expand: true
      },
    },

    clean: {
      prev: [ 'build/**/*' ],
      post: [ 'build/application.js', 'build/application.js', 'build/assets/less/', 'build/assets/css/style.css']
    },

    jshint: {
	    all: ['Gruntfile.js', 'src/app/***/**/*.js']
	  },

    htmlmin: {                                     // Task 
      dist: {                                      // Target 
        options: {                                 // Target options 
          removeComments: true,
          collapseWhitespace: true
        },
                                           // Dictionary of files 
          files: [{
           expand: true,
           cwd: 'build',
           src: ['app/**/*.tpl.html', 'index.php'],
           dest: 'build/'
        }]
        
      }
    },

    ngAnnotate: {
        application: {
            files: {
                'build/application.js': ['src/app/**/*.js', '!**/app.*.js', '!**/app.js']
            },
        },
        app: {
            files: {
                'build/app.js': ['src/app/app.js', 'src/app/app.constant.js', 'src/app/app.config.js', 'src/app/app.run.js']
            },
        }
    },

    concat: {
      options: {

      },
      dist: {
        src: ['src/assets/libs/angular.min.js', 'src/assets/libs/angular-route.min.js', 'src/assets/libs/angular-resource.min.js', 'src/assets/libs/angular-animate.min.js', 'src/assets/libs/ui-bootstrap-tpls-0.11.2.min.js', 'src/assets/libs/loading-bar.min.js'  ],
        dest: 'build/assets/libs/libs.min.js',
      },
    },

    

    uglify: {
        demo: {
            files: {
                'build/application.min.js': ['build/application.js'],
                'build/app.min.js': ['build/app.js']
            }
        }
    },

    less: {
      development: {
        files: {
          "src/assets/css/style.css": "src/assets/less/style.less"
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/assets/css/style.css': ['src/assets/css/bootstrap.css', 'src/assets/css/font-awesome.css', 'src/assets/css/loading-bar.css', 'src/assets/css/style.css']
        }
      },
      min: {
        files: [{
          expand: true,
          cwd: 'build/assets/css',
          src: ['style.css'],
          dest: 'build/assets/css',
          ext: '.min.css'
        }]
      }
    }
 
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // define the tasks
   
  grunt.registerTask(
    'build', 
    'Compiles all of the assets, validate js files, annotate angular and minify files to the build directory.', 
    ['clean:prev', 'copy', 'jshint', 'htmlmin', 'ngAnnotate', 'uglify', 'less', 'cssmin', 'concat', 'clean:post']
  );


};