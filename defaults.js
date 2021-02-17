"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_DOMAIN = exports.SERVER_PORT = exports.DSAPI_PATH = exports.JAVA_MINIMUMJAVAVERSION = exports.JAVA_CLASSPATH = exports.JAVA_ROOTPATH = void 0;
const path = require("path");
exports.JAVA_ROOTPATH = __dirname;
exports.JAVA_CLASSPATH = path.join("java", "bin") + ":" +
    path.join("java", "lib", "dsJQuery", "dsJQuery-20210212.jar") + ":" +
    path.join("java", "lib", "jdom", "jdom-1.1.3.jar") + ":" +
    path.join("java", "lib", "json", "json-20201115.jar");
exports.JAVA_MINIMUMJAVAVERSION = 12;
exports.DSAPI_PATH = path.join("java", "lib", "dsapi", "dsapi.jar");
exports.SERVER_PORT = 1099;
exports.USER_DOMAIN = "DocuShare";
