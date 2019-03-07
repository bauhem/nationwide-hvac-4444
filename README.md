##To update data from Airtable with the console:

`export AIRTABLE_API_KEY=your_key` (to get a key: https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-)

`export AIRTABLE_API_BASE=current_base` (current base is 'appbWvBnLdeuGc7kR')
 
`node airtable-cli.js`

## Using Grunt for localtunnel:

You can use grunt tasks to start a local tunnel on any server or machine and 
allow others to preview your work. To do so, the Gruntfile loads 
grunt-localtunnel-client. To start the tunnel, simply run this command at the root
of the project

`grunt`

By default, the subdomain will be 

`https://nationwidehvac.localtunnel.me`

Since only one machine can have the same name, you can overwrite this default
value by passing a new subdomain as an environment variable before launching grunt
like so:

`LOCALTUNNEL_SUBDOMAIN=mysubdomain grunt`