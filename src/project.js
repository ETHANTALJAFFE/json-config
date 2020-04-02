const fs = require('fs');
const nconf = require('nconf');

const fsPromises = fs.promises;

if (!nconf.get('projects_folder')) {
    throw new Error('PROJECTS_FOLDER is undefined');
}
/**
 * Creates a new Folder in File System using **process.env.PROJECTS_FOLDER** and given
 * **projectName**
 * @param {string} projectName
 * @return {boolean} - return **true** if a new project was created, **false** if it already exists.
 */
const createProject = async (projectName) => {
    const projectsFolder = nconf.get('projects_folder');
    const path = `${projectsFolder}/${projectName}`;

    try {
        await fsPromises.mkdir(path);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
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
const getProjectFiles = async (projectName) => {
    const projectsFolder = nconf.get('projects_folder');
    const path = `${projectsFolder}/${projectName}`;

    const fsStat = await fsPromises.stat(path);
    if (fsStat.isDirectory()) {
        return fsPromises.readdir(path);
    }

    throw new Error('Project does not exist');
};

module.exports = { createProject, getProjectFiles, getAllProjects };
