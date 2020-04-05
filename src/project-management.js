import nconf from 'nconf';
import config from '../config.json';

nconf.argv()
    .env({ lowerCase: true, whitelist: ['projects_folder'] });

if (!nconf.get('projects_folder')) {
    throw new Error('PROJECTS_FOLDER is undefined');
}

const fs = require('fs');

const fsPromises = fs.promises;


/**
 * @name ProjectManagement
 */
const ProjectManagement = {
    /**
     * Creates a new Folder in File System using **process.env.PROJECTS_FOLDER** and given
     * **projectName**. Creates sub-folders for **configurations** and **JSON Schemas**
     * @param {string} projectName
     * @return {boolean} - return **true** if a new project was created, **false** if it already exists.
     */
    createProject: async (projectName) => {
        const projectsFolder = nconf.get('projects_folder');
        const path = `${projectsFolder}/${projectName}`;

        await fsPromises.mkdir(path);
        await fsPromises.mkdir(`${path}/${config.CONFIGURATIONS_FOLDER}`);
        await fsPromises.mkdir(`${path}/${config.SCHEMAS_FOLDER}`);
        return true;
    },
    /**
 * Retrieves a list of all existing projects in the File System
 * @return {string[]}
 */
    getAllProjects: async () => {
        const path = nconf.get('projects_folder');

        const pathContents = await fsPromises.readdir(path);
        return pathContents.filter(async (file) => fsPromises.stat(`${path}/${file}`).isDirectory());
    },
    /**
 * Retrieves the configurations *filenames* inside the directory of **projectName**
 * @param projectName
 * @return {string[]}
 * @throws {Error} Project does not exist
 */
    getProjectConfigurations: async (projectName) => {
        const projectsFolder = nconf.get('projects_folder');
        const path = `${projectsFolder}/${projectName}/${config.CONFIGURATIONS_FOLDER}`;

        const fsStat = await fsPromises.stat(path);
        if (fsStat.isDirectory()) {
            try {
                return fsPromises.readdir(path);
            } catch (e) {
            }
        }
        throw new Error('Project does not exist');
    },
};

export default ProjectManagement;
