"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = exports.findByObjectClassAndID = exports.findByHandle = exports.setupSession = exports.setupServer = exports.setupJava = void 0;
const java_caller_1 = require("java-caller");
const path = require("path");
const JAVA_ROOTPATH = __dirname;
const JAVA_CLASSPATH = path.join("java", "bin") + ":" +
    path.join("java", "lib", "dsJQuery", "dsJQuery-20210212.jar") + ":" +
    path.join("java", "lib", "jdom", "jdom-1.1.3.jar") + ":" +
    path.join("java", "lib", "json", "json-20201115.jar");
const JAVA_MINIMUMJAVAVERSION = 12;
const DEFAULT_DSAPI_PATH = path.join("java", "lib", "dsapi", "dsapi.jar");
let javaConfig = {
    dsapiPath: DEFAULT_DSAPI_PATH
};
const setupJava = (config) => {
    javaConfig = config;
    if (!javaConfig.hasOwnProperty("dsapiPath")) {
        javaConfig.dsapiPath = DEFAULT_DSAPI_PATH;
    }
};
exports.setupJava = setupJava;
const DEFAULT_SERVER_PORT = 1099;
let serverConfig;
const setupServer = (config) => {
    serverConfig = config;
    if (!serverConfig.hasOwnProperty("serverPort")) {
        serverConfig.serverPort = DEFAULT_SERVER_PORT;
    }
};
exports.setupServer = setupServer;
const DEFAULT_USER_DOMAIN = "DocuShare";
let sessionConfig;
const setupSession = (config) => {
    sessionConfig = config;
    if (!sessionConfig.hasOwnProperty("userDomain")) {
        sessionConfig.userDomain = DEFAULT_USER_DOMAIN;
    }
};
exports.setupSession = setupSession;
const findByHandle = (handleString) => __awaiter(void 0, void 0, void 0, function* () {
    const java = new java_caller_1.JavaCaller({
        rootPath: JAVA_ROOTPATH,
        classPath: `${JAVA_CLASSPATH}:${javaConfig.dsapiPath}`,
        mainClass: "cityssm.nodedocusharejava.FindByHandle",
        minimumJavaVersion: JAVA_MINIMUMJAVAVERSION
    });
    const { status, stdout, stderr } = yield java.run([
        serverConfig.serverName,
        serverConfig.serverPort.toString(),
        sessionConfig.userDomain,
        sessionConfig.userName,
        sessionConfig.password,
        handleString
    ]);
    if (status === 0) {
        const dsOutput = JSON.parse(stdout.trim());
        if (dsOutput.dsObjects.length > 0) {
            return dsOutput.dsObjects[0];
        }
        else {
            return false;
        }
    }
    else {
        throw new Error(stderr);
    }
});
exports.findByHandle = findByHandle;
const findByObjectClassAndID = (objectClass, objectID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.findByHandle(objectClass + "-" + objectID.toString());
});
exports.findByObjectClassAndID = findByObjectClassAndID;
const createCollection = (parentCollectionHandleString, collectionTitle) => __awaiter(void 0, void 0, void 0, function* () {
    const java = new java_caller_1.JavaCaller({
        rootPath: JAVA_ROOTPATH,
        classPath: `${JAVA_CLASSPATH}:${javaConfig.dsapiPath}`,
        mainClass: "cityssm.nodedocusharejava.CreateCollection",
        minimumJavaVersion: JAVA_MINIMUMJAVAVERSION
    });
    const { status, stdout, stderr } = yield java.run([
        serverConfig.serverName,
        serverConfig.serverPort.toString(),
        sessionConfig.userDomain,
        sessionConfig.userName,
        sessionConfig.password,
        parentCollectionHandleString,
        "\"" + collectionTitle + "\""
    ]);
    if (status === 0) {
        const dsOutput = JSON.parse(stdout.trim());
        if (dsOutput.dsObjects.length > 0) {
            return dsOutput.dsObjects[0];
        }
        else {
            return false;
        }
    }
    else {
        throw new Error(stderr);
    }
});
exports.createCollection = createCollection;
