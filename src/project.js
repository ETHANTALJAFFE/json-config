const nconf = require('nconf');
const fs = require('fs');
const fsPromises = fs.promises;

if (!nconf.get('projects_folder')) {
    throw new Error('PROJECTS_FOLDER is undefined');
}
/**
 * Creates a new Folder in File System using **process.env.PROJECTS_FOLDER** and given **projectName**
 * @param {string} projectName
 * @returns {boolean} - return **true** if a new project was created, **false** if it already exists.
 */
const createProject = async (projectName) => {
    const projectsFolder = nconf.get('projects_folder');
    const path = `${projectsFolder}/${projectName}`;

    const pathExists = fs.exist
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
 * @returns {string[]}
 */
const getAllProjects = async () => {
    const path = nconf.get('projects_folder');

    const pathContents = await fsPromises.readdir(path);
    const projects = pathContents.filter(async (file) => {
        return await fsPromises.stat(`${path}/${file}`).isDirectory();
    });
    return projects;
};

/**
 * Retrieves the *filenames* inside the directory of **projectName**
 * @param projectName
 * @returns string[]
 */
const getProjectFiles = async (projectName) => {
    const projectsFolder = nconf.get('projects_folder');
    const path = `${projectsFolder}/${projectName}`;

    const isDir = await fsPromises.stat(path).isDirectory();

    if (isDir) {
        const filenames = await fsPromises.readdir(path);
        return filenames;
    }

    throw new Error('Project does not exist');
};

module.exports = {createProject, getProjectFiles, getAllProjects};