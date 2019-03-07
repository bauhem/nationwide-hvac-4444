const subdomain = 'nationwide-hvac';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    localtunnel_client: {
      server: {
        options: {
          port: 4444,
          subdomain: subdomain,
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