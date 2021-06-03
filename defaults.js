import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const JAVA_ROOTPATH = __dirname;
export const JAVA_CLASSPATH = [
    path.join(JAVA_ROOTPATH, "java", "bin"),
    path.join(JAVA_ROOTPATH, "java", "lib", "dsJQuery", "dsJQuery-20210212.jar"),
    path.join(JAVA_ROOTPATH, "java", "lib", "jdom", "jdom-1.1.3.jar"),
    path.join(JAVA_ROOTPATH, "java", "lib", "json", "json-20201115.jar")
];
export const JAVA_MINIMUMJAVAVERSION = 12;
export const JAVA_CONFIG = {
    dsapiPath: path.join(JAVA_ROOTPATH, "java", "lib", "dsapi", "dsapi.jar")
};
export const SERVER_CONFIG = {
    serverPort: 1099
};
export const SESSION_CONFIG = {
    userDomain: "DocuShare"
};
