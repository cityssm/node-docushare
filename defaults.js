import path from "path";
export const JAVA_ROOTPATH = ".";
export const JAVA_CLASSPATH = path.join("java", "bin") + ":" +
    path.join("java", "lib", "dsJQuery", "dsJQuery-20210212.jar") + ":" +
    path.join("java", "lib", "jdom", "jdom-1.1.3.jar") + ":" +
    path.join("java", "lib", "json", "json-20201115.jar");
export const JAVA_MINIMUMJAVAVERSION = 12;
export const JAVA_CONFIG = {
    dsapiPath: path.join("java", "lib", "dsapi", "dsapi.jar")
};
export const SERVER_CONFIG = {
    serverPort: 1099
};
export const SESSION_CONFIG = {
    userDomain: "DocuShare"
};
