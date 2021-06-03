import { JavaCaller } from "java-caller";

import * as defaults from "./defaults.js";
import * as utils from "./utils.js";

import type * as types from "./types";


/*
 * Setup
 */

// Java

let javaConfig: types.JavaConfig = defaults.JAVA_CONFIG;

export const setupJava = (config: types.JavaConfig) => {
  javaConfig = Object.assign({}, defaults.JAVA_CONFIG, config);
};

// Server

let serverConfig: types.ServerConfig;

export const setupServer = (config: types.ServerConfig) => {
  serverConfig = Object.assign({}, defaults.SERVER_CONFIG, config);
};

// Session

let sessionConfig: types.SessionConfig;

export const setupSession = (config: types.SessionConfig) => {
  sessionConfig = Object.assign({}, defaults.SESSION_CONFIG, config);
};


/*
 * Java Helpers
 */


const buildJavaCallerOptions = (mainClass: string) => {

  return {
    rootPath: defaults.JAVA_ROOTPATH,
    classPath: defaults.JAVA_CLASSPATH.concat([javaConfig.dsapiPath]),
    useAbsoluteClassPaths: true,
    mainClass,
    minimumJavaVersion: defaults.JAVA_MINIMUMJAVAVERSION
  };
};

const buildJavaArguments = (methodArgs: string[]): string[] => {

  const args = [serverConfig.serverName,
  serverConfig.serverPort.toString(),
  sessionConfig.userDomain,
  sessionConfig.userName,
  sessionConfig.password];

  for (const methodArg of methodArgs) {

    if (methodArg.includes(" ")) {
      args.push("\"" + methodArg + "\"");
    } else {
      args.push(methodArg);
    }
  }

  return args;
};

const runJavaApplication = async (applicationClassName: string, applicationArgs: string[]): Promise<types.DocuShareOutput> => {

  const java = new JavaCaller(
    buildJavaCallerOptions("cityssm.nodedocusharejava." + applicationClassName)
  );

  const javaOutput: types.JavaOutput = await java.run(
    buildJavaArguments(applicationArgs)
  );

  const docuShareOutput = utils.parseOutput(javaOutput);

  return docuShareOutput;
};


/*
 * Read
 */


/**
 * Finds a single DocuShare object by a handle (i.e. "Collection-123")
 */
export const findByHandle = async (handleString: string): Promise<types.DocuShareOutput> => {

  return await runJavaApplication(
    "FindByHandle",
    [handleString]
  );
};

export const findByObjectClassAndID = async (objectClass: types.DocuShareObjectClass, objectID: number) => {
  return await findByHandle(objectClass + "-" + objectID.toString());
};

/**
 * Retrieves the child objects of a given DocuShare Collection.
 */
export const getChildren = async (parentCollectionHandleString: string): Promise<types.DocuShareOutput> => {

  return await runJavaApplication(
    "GetChildren",
    [parentCollectionHandleString]
  );
};

/**
 * Retrieves the child objects of a given DocuShare Collection
 * filtering them by given criteria.
 */
export const findChildren = async (parentCollectionHandleString: string, findChildrenFilters: types.FindChildrenFilters = {}): Promise<types.DocuShareOutput> => {

  const children = await getChildren(parentCollectionHandleString);

  if (!children.success) {
    return children;
  }

  // Prepare filters

  for (const filterKey of Object.keys(findChildrenFilters)) {
    findChildrenFilters[filterKey].searchString = findChildrenFilters[filterKey].searchString.trim().toLowerCase();
    findChildrenFilters[filterKey]._searchStringSplit = findChildrenFilters[filterKey].searchString.split(" ");
  }

  children.dsObjects = children.dsObjects.filter((dsObject) => {

    for (const filterKey of Object.keys(findChildrenFilters)) {

      const filter: types.Filter = findChildrenFilters[filterKey];

      let searchText: string;

      if (filterKey === "text") {
        searchText = (dsObject.title + " " + dsObject.summary + " " + dsObject.description).toLowerCase();
      } else {
        searchText = dsObject[filterKey].toLowerCase();
      }

      if (filter.searchType === "equals" && searchText !== filter.searchString) {
        return false;

      } else if (filter.searchType === "includes" && !searchText.includes(filter.searchString)) {
        return false;

      } else if (filter.searchType === "includesPieces") {

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


/*
 * Create
 */


/**
 * Creates a new Collection beneath a given DocuShare Collection.
 */
export const createCollection = async (parentCollectionHandleString: string, collectionTitle: string): Promise<types.DocuShareOutput> => {

  return await runJavaApplication(
    "CreateCollection",
    [parentCollectionHandleString, collectionTitle]
  );
};


/*
 * Update
 */


/**
 * Updates a given DocuShare object with a new title.
 */
export const setTitle = async (handleString: string, title: string): Promise<types.DocuShareOutput> => {

  return await runJavaApplication(
    "SetTitle",
    [handleString, title]
  );
};


/*
 * Delete
 */


/**
 * Removes a given DocuShare object.
 */
export const deleteObject = async (handleString: string): Promise<types.DocuShareOutput> => {

  return await runJavaApplication(
    "DeleteObject",
    [handleString]
  );
};
