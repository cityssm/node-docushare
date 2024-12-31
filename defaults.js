import path from 'node:path';
import { fileURLToPath } from 'node:url';
const importedFileName = fileURLToPath(import.meta.url);
const baseDirectory = path.dirname(importedFileName);
/*
 * Java Options
 */
export const JAVA_ROOTPATH = baseDirectory;
export const JAVA_CLASSPATH = [
    path.join(JAVA_ROOTPATH, 'java', 'bin'),
    path.join(JAVA_ROOTPATH, 'java', 'lib'),
    path.join(JAVA_ROOTPATH, 'java', 'lib', 'dsJQuery', 'dsJQuery-20210212.jar'),
    path.join(JAVA_ROOTPATH, 'java', 'lib', 'jdom', 'jdom-1.1.3.jar'),
    path.join(JAVA_ROOTPATH, 'java', 'lib', 'json', 'json-20201115.jar')
];
export const JAVA_MINIMUMJAVAVERSION = 12;
/*
 * Java Setup
 */
export const JAVA_CONFIG = {
    dsapiPath: [
        path.join(JAVA_ROOTPATH, 'dsapi.jar'),
        path.join(JAVA_ROOTPATH, 'java', 'dsapi.jar'),
        path.join(JAVA_ROOTPATH, 'java', 'lib', 'dsapi', 'dsapi.jar')
    ]
};
/*
 * Server Setup
 */
export const SERVER_CONFIG = {
    serverPort: 1099
};
/*
 * Session Setup
 */
export const SESSION_CONFIG = {
    userDomain: 'DocuShare'
};
