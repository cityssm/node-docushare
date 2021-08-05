import { JavaCaller } from "java-caller";
import * as defaults from "./defaults.js";
import * as utils from "./utils.js";
let javaConfig = defaults.JAVA_CONFIG;
export const setupJava = (config) => {
    javaConfig = Object.assign({}, defaults.JAVA_CONFIG, config);
};
let serverConfig;
export const setupServer = (config) => {
    serverConfig = Object.assign({}, defaults.SERVER_CONFIG, config);
};
let sessionConfig;
export const setupSession = (config) => {
    sessionConfig = Object.assign({}, defaults.SESSION_CONFIG, config);
};
const buildJavaCallerOptions = (mainClass) => {
    return {
        rootPath: defaults.JAVA_ROOTPATH,
        classPath: [...defaults.JAVA_CLASSPATH, ...javaConfig.dsapiPath],
        useAbsoluteClassPaths: true,
        mainClass,
        minimumJavaVersion: defaults.JAVA_MINIMUMJAVAVERSION
    };
};
const buildJavaArguments = (methodArguments) => {
    const javaArguments = [serverConfig.serverName,
        serverConfig.serverPort.toString(),
        sessionConfig.userDomain,
        sessionConfig.userName,
        sessionConfig.password];
    for (const methodArgument of methodArguments) {
        if (methodArgument.includes(" ")) {
            javaArguments.push("\"" + methodArgument + "\"");
        }
        else {
            javaArguments.push(methodArgument);
        }
    }
    return javaArguments;
};
const runJavaApplication = async (applicationClassName, applicationArguments) => {
    const java = new JavaCaller(buildJavaCallerOptions("cityssm.nodedocusharejava." + applicationClassName));
    const javaOutput = await java.run(buildJavaArguments(applicationArguments));
    const docuShareOutput = utils.parseOutput(javaOutput);
    return docuShareOutput;
};
export const findByHandle = async (handleString) => {
    return await runJavaApplication("FindByHandle", [handleString]);
};
export const findByObjectClassAndID = async (objectClass, objectID) => {
    return await findByHandle(objectClass + "-" + objectID.toString());
};
export const getChildren = async (parentCollectionHandleString) => {
    return await runJavaApplication("GetChildren", [parentCollectionHandleString]);
};
export const findChildren = async (parentCollectionHandleString, findChildrenFilters = {}) => {
    const children = await getChildren(parentCollectionHandleString);
    if (!children.success) {
        return children;
    }
    for (const filterKey of Object.keys(findChildrenFilters)) {
        findChildrenFilters[filterKey].searchString = findChildrenFilters[filterKey].searchString.trim().toLowerCase();
        findChildrenFilters[filterKey]._searchStringSplit = findChildrenFilters[filterKey].searchString.split(" ");
    }
    children.dsObjects = children.dsObjects.filter((dsObject) => {
        for (const filterKey of Object.keys(findChildrenFilters)) {
            const filter = findChildrenFilters[filterKey];
            const searchText = filterKey === "text"
                ? (dsObject.title + " " + dsObject.summary + " " + dsObject.description).toLowerCase()
                : dsObject[filterKey].toLowerCase();
            if (filter.searchType === "equals" && searchText !== filter.searchString) {
                return false;
            }
            else if (filter.searchType === "includes" && !searchText.includes(filter.searchString)) {
                return false;
            }
            else if (filter.searchType === "includesPieces") {
                for (const searchStringPiece of filter._searchStringSplit) {
                    if (!searchText.includes(searchStringPiece)) {
                        return false;
                    }
                }
            }
        }
        return true;
    });
    return children;
};
export const createCollection = async (parentCollectionHandleString, collectionTitle) => {
    return await runJavaApplication("CreateCollection", [parentCollectionHandleString, collectionTitle]);
};
export const setTitle = async (handleString, title) => {
    return await runJavaApplication("SetTitle", [handleString, title]);
};
export const deleteObject = async (handleString) => {
    return await runJavaApplication("DeleteObject", [handleString]);
};
