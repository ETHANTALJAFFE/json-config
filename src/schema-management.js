import fs from 'fs';
import nconf from 'nconf';
import utils from './utils';
import config from '../config.json';

const fsPromises = fs.promises;

utils.checkProjectsFolderExists();

/**
 *
 * @name SchemaManagement
 */
const SchemaManagement = {
    /**
     * Retrieves the *Schema File* with **schemaName** for given **projectName**
     * @param projectName {string} - The project that contains the requested schema file
     * @param schemaName {string} - The requested schema file
     * @param suffix {string=} - a suffix to append to the *filename*
     * schemaName when retrieving it.
     * @returns {object}
     */
    getSchema: async (projectName, schemaName, suffix) => {
        const projectsFolder = nconf.get('projects_folder');
        const path = `${projectsFolder}/${projectName}/${config.SCHEMAS_FOLDER}/${schemaName}${suffix || ''}`;

        const configData = await fsPromises.readFile(path, 'utf8');
        return JSON.parse(configData);
    },
    /**
     * Creates a new *Schema File* named **schemaName** with **schemaData** inside of an existing project with
     * given **projectName**
     * @param {string} projectName - The project that contains the requested schema file
     * @param {string} schemaName - The requested schema file
     * @param {string} schemaData - The schema you wish to store
     * @param {string=} suffix - a suffix to append to the *filename*
     * @returns {Promise<boolean>}
     */
    createSchema: async (projectName, schemaName, schemaData, suffix) => {
        const projectsFolder = nconf.get('projects_folder');
        const path = `${projectsFolder}/${projectName}/${config.SCHEMAS_FOLDER}/${schemaName}${suffix || ''}`;


        await fsPromises.writeFile(path, schemaData, 'utf8');
        return true;
    },
};

export default SchemaManagement;
