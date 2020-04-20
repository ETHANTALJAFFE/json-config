import nconf from 'nconf';

const utils = {
    checkProjectsFolderExists: () => {
        nconf.argv()
            .env({ lowerCase: true, whitelist: ['projects_folder'] });

        if (!nconf.get('projects_folder')) {
            throw new Error('PROJECTS_FOLDER is undefined');
        }
    }
};

export default utils;
