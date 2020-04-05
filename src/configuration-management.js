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
 *
 * @name ConfigurationManagement
 */
const ConfigurationManagement = {
    /**
     * Retrieves the *Configuration File* with **configName** for given **projectName**
     * @param projectName {string} - The project that contains the requested configuration file
     * @param configName {string} - The requested configuration file
     * @param suffix {string=} - a suffix to append to the *filename*
     * configName when retrieving it.
     * @returns {object}
     */
    getConfiguration: async (projectName, configName, suffix) => {
        const projectsFolder = nconf.get('projects_folder');
        const path = `${projectsFolder}/${projectName}/${config.CONFIGURATIONS_FOLDER}/${configName}${suffix || ''}`;

        const configData = await fsPromises.readFile(path, 'utf8');
        return JSON.parse(configData);
    },
    /**
     * Creates a new *Configuration File* named **configName** with **configData** inside of an existing project with
     * given **projectName**
     * @param projectName - The project that contains the requested configuration file
     * @param configName} - The requested configuration file
     * @param configData - The configuration you wish to store
     * @param suffix {string=} - a suffix to append to the *filename*
     * @returns {Promise<boolean>}
     */
    createConfiguration: async (projectName, configName, configData, suffix) => {
        const projectsFolder = nconf.get('projects_folder');
        const path = `${projectsFolder}/${projectName}/${config.CONFIGURATIONS_FOLDER}/${configName}${suffix || ''}`;


        await fsPromises.writeFile(path, configData, 'utf8');
        return true;
    },
};

export default ConfigurationManagement;
