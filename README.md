# json-config

<a name="module_Project Management"></a>

## Project Management

* [Project Management](#module_Project Management)
    * [~createProject(projectName)](#module_Project Management..createProject) ⇒ <code>boolean</code>
    * [~getAllProjects()](#module_Project Management..getAllProjects) ⇒ <code>Array.&lt;string&gt;</code>
    * [~getProjectConfigurations(projectName)](#module_Project Management..getProjectConfigurations) ⇒

<a name="module_Project Management..createProject"></a>

### Project Management~createProject(projectName) ⇒ <code>boolean</code>
Creates a new Folder in File System using **process.env.PROJECTS_FOLDER** and given
**projectName**. Creates sub-folders for **configurations** and **JSON Schemas**

**Kind**: inner method of [<code>Project Management</code>](#module_Project Management)
**Returns**: <code>boolean</code> - - return **true** if a new project was created, **false** if it already exists.

| Param | Type |
| --- | --- |
| projectName | <code>string</code> |

<a name="module_Project Management..getAllProjects"></a>

### Project Management~getAllProjects() ⇒ <code>Array.&lt;string&gt;</code>
Retrieves a list of all existing projects in the File System

**Kind**: inner method of [<code>Project Management</code>](#module_Project Management)
<a name="module_Project Management..getProjectConfigurations"></a>

### Project Management~getProjectConfigurations(projectName) ⇒
Retrieves the *filenames* inside the directory of **projectName**

**Kind**: inner method of [<code>Project Management</code>](#module_Project Management)
**Returns**: string[]

| Param |
| --- |
| projectName |


