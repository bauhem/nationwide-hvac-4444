const default_subdomain = 'nationwide-hvac';

module.exports = function (grunt) {
  grunt.initConfig({
    subdomain: process.env.LOCALTUNNEL_SUBDOMAIN || default_subdomain,
    pkg: grunt.file.readJSON('package.json'),
    localtunnel_client: {
      server: {
        options: {
          port: 4444,
          subdomain: '<%= subdomain %>',
          keepalive: true,
          onError: function (err) {
            grunt.log.error('Not cool! ', err);
          }

        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-localtunnel-client');

  grunt.registerTask('default', ['localtunnel_client']);

}