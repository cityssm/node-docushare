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
exports.deleteObject = exports.setTitle = exports.createCollection = exports.getChildren = exports.findByObjectClassAndID = exports.findByHandle = exports.setupSession = exports.setupServer = exports.setupJava = void 0;
const java_caller_1 = require("java-caller");
const defaults = require("./defaults");
const utils = require("./utils");
let javaConfig = defaults.JAVA_CONFIG;
const setupJava = (config) => {
    javaConfig = Object.assign({}, defaults.JAVA_CONFIG, config);
};
exports.setupJava = setupJava;
let serverConfig;
const setupServer = (config) => {
    serverConfig = Object.assign({}, defaults.SERVER_CONFIG, config);
};
exports.setupServer = setupServer;
let sessionConfig;
const setupSession = (config) => {
    sessionConfig = Object.assign({}, defaults.SESSION_CONFIG, config);
};
exports.setupSession = setupSession;
const buildJavaCallerOptions = (mainClass) => {
    return {
        rootPath: defaults.JAVA_ROOTPATH,
        classPath: `${defaults.JAVA_CLASSPATH}:${javaConfig.dsapiPath}`,
        mainClass,
        minimumJavaVersion: defaults.JAVA_MINIMUMJAVAVERSION
    };
};
const buildJavaArguments = (methodArgs) => {
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
const runJavaApplication = (applicationClassName, applicationArgs) => __awaiter(void 0, void 0, void 0, function* () {
    const java = new java_caller_1.JavaCaller(buildJavaCallerOptions("cityssm.nodedocusharejava." + applicationClassName));
    const javaOutput = yield java.run(buildJavaArguments(applicationArgs));
    return utils.parseOutput(javaOutput);
});
const findByHandle = (handleString) => __awaiter(void 0, void 0, void 0, function* () {
    const dsOutput = yield runJavaApplication("FindByHandle", [handleString]);
    return utils.getSingleDocuShareObjectOutput(dsOutput);
});
exports.findByHandle = findByHandle;
const findByObjectClassAndID = (objectClass, objectID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.findByHandle(objectClass + "-" + objectID.toString());
});
exports.findByObjectClassAndID = findByObjectClassAndID;
const getChildren = (parentCollectionHandleString) => __awaiter(void 0, void 0, void 0, function* () {
    const dsOutput = yield runJavaApplication("GetChildren", [parentCollectionHandleString]);
    return utils.getMultipleDocuShareObjectsOutput(dsOutput);
});
exports.getChildren = getChildren;
const createCollection = (parentCollectionHandleString, collectionTitle) => __awaiter(void 0, void 0, void 0, function* () {
    const dsOutput = yield runJavaApplication("CreateCollection", [parentCollectionHandleString, collectionTitle]);
    return utils.getSingleDocuShareObjectOutput(dsOutput);
});
exports.createCollection = createCollection;
const setTitle = (handleString, title) => __awaiter(void 0, void 0, void 0, function* () {
    const dsOutput = yield runJavaApplication("SetTitle", [handleString, title]);
    return utils.getSingleDocuShareObjectOutput(dsOutput);
});
exports.setTitle = setTitle;
const deleteObject = (handleString) => __awaiter(void 0, void 0, void 0, function* () {
    const dsOutput = yield runJavaApplication("DeleteObject", [handleString]);
    return dsOutput.success;
});
exports.deleteObject = deleteObject;
