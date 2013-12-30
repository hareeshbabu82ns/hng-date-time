path = require 'path'

# Build configurations.
module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('bower.json'),
    banner: '/*! hngDateTimePicer v<%= pkg.version %> by Hareesh(hareeshbabu82ns@gmail.com) - ' +
    'https://github.com/hareeshbabu82ns/hng-date-time - New BSD License */\n',

  # Glob CONSTANTS
    TEST_DIR:       'test/'
    BUILD_DIR:      'release/'
    SRC_DIR:        'src/'
    BOWER_DIR:      'bower_components/'

    ALL_FILES: '**/*'
    CSS_FILES: '**/*.css'
    HTML_FILES: '**/*.html'
    IMG_FILES: '**/*.{png,gif,jpg,jpeg}'
    JS_FILES: '**/*.js'
    LESS_FILES: '**/*.less'

  # watch for changes
    watch:
      options:
        debounceDelay: 200
        livereload: true
        nospawn: true

        build:
          files: [ '<%= BUILD_DIR + ALL_FILES %>', '!**/<%= BOWER_DIR %>/**' ]

        js:
          files: '<%= SRC_DIR + JS_FILES %>'
          tasks: [ 'copy:js' ]

        less:
          files: '<%= SRC_DIR + LESS_FILES %>'
          tasks: [ 'less' , 'copy:styles']

        src: [
          files: ['<%= SRC_DIR + ALL_FILES %>',
                  '<%= TEST_DIR + ALL_FILES %>']
          tasks: ['dev']
        ]

  # Deletes built file and temp directories.
    clean:
      working:
        src: [
          './src/bootstrap-datetimepicker.css'
          '<%= BUILD_DIR %>'
        ]
    copy:
      styles:
        files: [
          src: 'src/styles/bootstrap-datetimepicker.css'
          dest: 'release/styles/bootstrap-datetimepicker.css'
        ]
      js:
        files: [
          expand: true
          src: ['./src/scripts/*.js']
          dest: 'release/scripts/'
          flatten: true
        ]

    uglify:
    # concat js files before minification
      js:
        src: ['./src/scripts/*.js']
        dest: './release/scripts/<%= pkg.name %>.min.js'
        options:
          banner: '<%= banner %>'
          sourceMap: (fileName) ->
            fileName.replace /\.js$/, '.map'

    less:
      css:
        files:
          'src/styles/bootstrap-datetimepicker.css': 'src/styles/bootstrap-datetimepicker.less'

    cssmin:
      css:
        files:
          'release/styles/bootstrap-datetimepicker.min.css': 'src/styles/bootstrap-datetimepicker.css'
        options:
          banner: '<%= banner %>'

  # Register grunt tasks supplied by grunt-contrib-*.
  # Referenced in package.json.
  # https://github.com/gruntjs/grunt-contrib
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  #grunt.loadNpmTasks 'grunt-contrib-watch'

  # Register grunt tasks supplied by grunt-hustler.
  # Referenced in package.json.
  # https://github.com/CaryLandholt/grunt-hustler
  grunt.loadNpmTasks 'grunt-hustler'

  grunt.registerTask 'dev', [
    'clean'
    'less'
    'copy'
    #'watch'
  ]
  grunt.registerTask 'default', [
    'dev'
    'uglify'
    'cssmin'
  ]