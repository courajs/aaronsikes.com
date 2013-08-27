module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    watch: {
      less: {
        // Using less to render styles.
        // Watch for the *.less file sonly
        files: ['less/*.less'],
        tasks: 'lessCopy'
      },
      jekyllSources: {
        files: [
          // capture all except css - add your own
          '*.html', '*.yml', 'js/**.js',
          '_posts/**', '_includes/**',
          '_layouts/**', '_drafts/**',
          'apps/**'

          ],
        tasks: 'shell:jekyll',
      }
    },
    copy: {
      css : {
        files: {
          // Copy the less-generated style file to
          // the _site/ folder
          '_site/css/main.css': 'css/main.css'
        }
      }
    },
  shell: {
      jekyll: {
          command: 'rm -rf _site/*; jekyll build --drafts',
          stdout: true
      }
  },
  less: {
    development: {
      options: {
        paths: ["less"]
      },
      files: {
        "css/main.css": "less/main.less"
      }
    }
  },
  connect: {
    server: {
      options: {
        port: 3000,
        base: './_site'
      }
    }
  }

  });
  // less watch
  grunt.registerTask('lessCopy', ['less:development', 'copy:css']);
  // Default task.
  grunt.registerTask('default', ['shell:jekyll', 'connect', 'watch']);

};