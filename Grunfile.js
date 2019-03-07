module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    localtunnel_client: {
            server: {
                options: {
                    port: 4444,
                    subdomain: 'nationwide-hvac'
                }
            }
        }
  });

  grunt.loadNpmTasks('grunt-localtunnel-client');

}