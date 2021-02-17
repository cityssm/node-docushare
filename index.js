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
exports.setTitle = exports.createCollection = exports.findByObjectClassAndID = exports.findByHandle = exports.setupSession = exports.setupServer = exports.setupJava = void 0;
const java_caller_1 = require("java-caller");
const defaults = require("./defaults");
let javaConfig = {
    dsapiPath: defaults.DSAPI_PATH
};
const setupJava = (config) => {
    javaConfig = config;
    if (!javaConfig.hasOwnProperty("dsapiPath")) {
        javaConfig.dsapiPath = defaults.DSAPI_PATH;
    }
};
exports.setupJava = setupJava;
let serverConfig;
const setupServer = (config) => {
    serverConfig = config;
    if (!serverConfig.hasOwnProperty("serverPort")) {
        serverConfig.serverPort = defaults.SERVER_PORT;
    }
};
exports.setupServer = setupServer;
let sessionConfig;
const setupSession = (config) => {
    sessionConfig = config;
    if (!sessionConfig.hasOwnProperty("userDomain")) {
        sessionConfig.userDomain = defaults.USER_DOMAIN;
    }
};
exports.setupSession = setupSession;
const buildCallerOptions = (mainClass) => {
    return {
        rootPath: defaults.JAVA_ROOTPATH,
        classPath: `${defaults.JAVA_CLASSPATH}:${javaConfig.dsapiPath}`,
        mainClass,
        minimumJavaVersion: defaults.JAVA_MINIMUMJAVAVERSION
    };
};
const buildArguments = (methodArgs) => {
    const args = [serverConfig.serverName,
        serverConfig.serverPort.toString(),
        sessionConfig.userDomain,
        sessionConfig.userName,
        sessionConfig.password];
    for (const methodArg of methodArgs) {
        if (methodArg.includes(" ")) {
            args.push("\"" + methodArg + "\"");
        }
        else {
            args.push(methodArg);
        }
    }
    return args;
};
const prepareSingleDocuShareObjectOutput = (status, stdout, stderr) => {
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
};
const findByHandle = (handleString) => __awaiter(void 0, void 0, void 0, function* () {
    const java = new java_caller_1.JavaCaller(buildCallerOptions("cityssm.nodedocusharejava.FindByHandle"));
    const { status, stdout, stderr } = yield java.run(buildArguments([
        handleString
    ]));
    return prepareSingleDocuShareObjectOutput(status, stdout, stderr);
});
exports.findByHandle = findByHandle;
const findByObjectClassAndID = (objectClass, objectID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.findByHandle(objectClass + "-" + objectID.toString());
});
exports.findByObjectClassAndID = findByObjectClassAndID;
const createCollection = (parentCollectionHandleString, collectionTitle) => __awaiter(void 0, void 0, void 0, function* () {
    const java = new java_caller_1.JavaCaller(buildCallerOptions("cityssm.nodedocusharejava.CreateCollection"));
    const { status, stdout, stderr } = yield java.run(buildArguments([
        parentCollectionHandleString,
        collectionTitle
    ]));
    return prepareSingleDocuShareObjectOutput(status, stdout, stderr);
});
exports.createCollection = createCollection;
const setTitle = (handleString, title) => __awaiter(void 0, void 0, void 0, function* () {
    const java = new java_caller_1.JavaCaller(buildCallerOptions("cityssm.nodedocusharejava.SetTitle"));
    const { status, stdout, stderr } = yield java.run(buildArguments([
        handleString,
        title
    ]));
    return prepareSingleDocuShareObjectOutput(status, stdout, stderr);
});
exports.setTitle = setTitle;
