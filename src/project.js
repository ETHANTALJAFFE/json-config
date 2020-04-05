const nconf = require('nconf');

if (!nconf.get('projects_folder')) {
    throw new Error('PROJECTS_FOLDER is undefined');
}

const fs = require('fs');

const fsPromises = fs.promises;

const SCHEMAS_FOLDER = 'schema';
const CONFIGURATIONS_FOLDER = 'config';

/**
 * Creates a new Folder in File System using **process.env.PROJECTS_FOLDER** and given
 * **projectName**. Creates sub-folders for **configurations** and **JSON Schemas**
 * @param {string} projectName
 * @return {boolean} - return **true** if a new project was created, **false** if it already exists.
 */
const createProject = async (projectName) => {
    const projectsFolder = nconf.get('projects_folder');
    const path = `${projectsFolder}/${projectName}`;

    await fsPromises.mkdir(path);
    await fsPromises.mkdir(`${path}/${CONFIGURATIONS_FOLDER}`);
    await fsPromises.mkdir(`${path}/${SCHEMAS_FOLDER}`);
    return true;
};

/**
 * Retrieves a list of all existing projects in the File System
 * @return {string[]}
 */
const getAllProjects = async () => {
    const path = nconf.get('projects_folder');

    const pathContents = await fsPromises.readdir(path);
    return pathContents.filter(async (file) => fsPromises.stat(`${path}/${file}`).isDirectory());
};

/**
 * Retrieves the *filenames* inside the directory of **projectName**
 * @param projectName
 * @return string[]
 */
const getProjectConfigurations = async (projectName) => {
    const projectsFolder = nconf.get('projects_folder');
    const path = `${projectsFolder}/${CONFIGURATIONS_FOLDER}/${projectName}`;

    const fsStat = await fsPromises.stat(path);
    if (fsStat.isDirectory()) {
        return fsPromises.readdir(path);
    }

    throw new Error('Project does not exist');
};

module.exports = { createProject, getProjectConfigurations, getAllProjects };
