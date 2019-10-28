module.exports = grunt => {
  grunt.initConfig({
    // pug task
    pug: {
      compile: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: [{
          src: '**/[^_]*.pug',
          cwd: 'src/pug/',
          dest: 'dist/html/vitadairy',
          expand: true,
          ext: '.html'
        }]
      }
    },

    // sass task
    sass: {
      dist: {
        options: {
          style: 'inline',
          sourceMap: true
        },
        files: [{
          src: '[^_]*.scss',
          cwd: 'src/sass/',
          dest: 'dist/html/vitadairy/assets/css',
          expand: true,
          ext: '.css'
        }]
      }
    },

    // copy task (copy src/libraries to dist/libraries)
    copy: {
      main: {
        files: [
          {
          expand: true,
          cwd: 'src/private',
          src: ['**'],
          dest: 'dist/html/vitadairy/assets'
        },
        {
          expand: true,
          cwd: 'src/pug/build/data',
          src: ['**'],
          dest: 'dist/build/data'
        }]
      }
    },

    // image compress task (compress all image src/images to dist/images)
    imagemin : {
      dynamic: {
          files: [{
              expand: true,
              cwd: 'src/',
              src: ['images/**/*.{png,jpg,gif,svg}'],
              dest: 'dist/html/vitadairy'
          }]
      }
    },

    //CSS task: fallbacks for rem units - vendor prefixes - minify the result
    // postcss: {
    //   options: {
    //     map: false, // inline sourcemaps  
    //     processors: [
    //       require('pixrem')(), // add fallbacks for rem units
    //       require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
    //       require('cssnano')() // minify the result
    //     ]
    //   },
    //   dist: {
    //     src: 'dist/assets/css/*.css'
    //   }
    // },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'src/js/library/jquery-3.3.1.min.js',
          'src/js/library/popper.min.js',    
          'src/js/library/bootstrap.min.js',        // v4.2.1
          'src/js/library/builder.js',
          'src/js/library/clipboard.min.js',        // v2.0.0
          'src/js/library/moment.min.js',           // v2.22.2
          'src/js/library/datetimepicker.min.js',   // v4.17.47
          'src/js/library/debouncedresize.min.js',  // v1.0.0
          'src/js/library/holder.min.js',           // v2.9.4
          'src/js/library/imagesloaded.min.js',     // v4.1.4
          // 'src/js/library/ion.rangeslider.min.js',  // v2.2.0
          'src/js/library/lazy.min.js',             // v1.7.9
          'src/js/library/lazy.plugins.min.js',
          //'src/js/library/lettering.min.js',        // v0.7.0
          'src/js/library/modernizr.min.js',        // v2.8.3
          'src/js/library/notify.min.js',           // v3.1.5
          'src/js/library/paroller.min.js',         // v1.4.4      
          // 'src/js/library/select2.min.js',          // v4.0.6 
          'src/js/library/slick.min.js',            // v2.6.1
          // 'src/js/library/slick-lightbox.min.js',   // v0.0.1
          'src/js/library/simplebar.min.js',        // v2.6.1
          'src/js/library/validation.min.js',       // v1.17.0
          'src/js/library/waypoints.min.js',        // v4.0.1
          'src/js/library/jquery.sticky.js',        // v4.0.1
          'src/js/library/readmore.min.js',        // v4.0.1
          'src/js/library/owl.carousel.min.js', 
          'src/js/library/bootstrap-select.min.js',        // v4.0.1
        ],
        dest: 'dist/html/vitadairy/assets/js/library.js',
      },
    },

    // auto refresh view on change in dist directory
    browserSync: {
      dev: {
        bsFiles: {
            src : [
                'dist/html/vitadairy/**.*'
            ]
        },
        options: {
            watchTask: true,
            server: './dist/'
        }
      }
    },

    // watch change inside directory to run task
    watch: {
      pug: {
        files: ['src/pug/**/*.pug'],
        tasks: ['pug']
      },
      sass: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['babel']
      },
      // postcss: {
      //   files: ['dist/assets/**/*.css'],
      //   tasks: ['postcss']
      // },
      babel: {
         files: ['src/js/**/*.js'],
         tasks: ['babel']
       },
      copy: {
        files: ['src/private/**'],
        tasks: ['copy']
      },
      copy: {
        files: ['src/pug/build/data/**'],
        tasks: ['copy']
      },
      imagemin: {
        files: ['src/images/**'],
        tasks: ['imagemin']
      },
      concat: {
        files: ['src/js/**'],
        tasks: ['concat']
      }
    },

    // babel
    babel: {
      options: {
        sourceMap: false,
        minified: true
      },
      dist: {
        files: {
          'dist/html/vitadairy/assets/js/main.js': 'src/js/main.js'
        }
      }
    }
  });

  // initial
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-postcss');

  //register default task
  if(process.env.NODE_ENV == 'production')
  {
    //grunt.registerTask('default', ['pug', 'sass', 'postcss:dist', 'copy', 'imagemin', 'cssmin', 'babel'])
    grunt.registerTask('default', ['pug', 'sass', 'copy', 'imagemin', 'cssmin', 'babel'])
  }else 
  {
    //grunt.registerTask('default', ['pug', 'sass', 'postcss:dist', 'copy', 'imagemin', 'browserSync', 'babel', 'watch'])
    grunt.registerTask('default', ['pug', 'sass', 'copy', 'imagemin', 'concat', 'browserSync', 'babel', 'watch'])
  }
};

