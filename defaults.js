"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_CONFIG = exports.SERVER_CONFIG = exports.JAVA_CONFIG = exports.JAVA_MINIMUMJAVAVERSION = exports.JAVA_CLASSPATH = exports.JAVA_ROOTPATH = void 0;
const path = require("path");
exports.JAVA_ROOTPATH = __dirname;
exports.JAVA_CLASSPATH = path.join("java", "bin") + ":" +
    path.join("java", "lib", "dsJQuery", "dsJQuery-20210212.jar") + ":" +
    path.join("java", "lib", "jdom", "jdom-1.1.3.jar") + ":" +
    path.join("java", "lib", "json", "json-20201115.jar");
exports.JAVA_MINIMUMJAVAVERSION = 12;
exports.JAVA_CONFIG = {
    dsapiPath: path.join("java", "lib", "dsapi", "dsapi.jar")
};
exports.SERVER_CONFIG = {
    serverPort: 1099
};
exports.SESSION_CONFIG = {
    userDomain: "DocuShare"
};
