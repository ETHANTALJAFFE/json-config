const nconf = require('nconf');

nconf.argv()
    .env({ lowerCase: true, whitelist: ['projects_folder'] });

const { getAllProjects, getProjectFiles, createProject } = require('./src/project');

module.exports = { getAllProjects, getProjectFiles, createProject };
