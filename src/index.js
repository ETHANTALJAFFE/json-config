const nconf = require('nconf');

nconf.argv()
    .env({lowerCase: true, whitelist: ['projects_folder']});

const {getAllProjects, getProjectFiles, createProject} = require('./project');