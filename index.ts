import { JavaCaller } from "java-caller";

import * as defaults from "./defaults";
import * as utils from "./utils";

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
    classPath: `${defaults.JAVA_CLASSPATH}:${javaConfig.dsapiPath}`,
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

  return utils.parseOutput(javaOutput);
};


/*
 * Read
 */


export const findByHandle = async (handleString: string): Promise<types.DocuShareObject | false> => {

  const dsOutput = await runJavaApplication(
    "FindByHandle",
    [handleString]
  );

  return utils.getSingleDocuShareObjectOutput(dsOutput);
};

export const findByObjectClassAndID = async (objectClass: types.DocuShareObjectClass, objectID: number) => {
  return await findByHandle(objectClass + "-" + objectID.toString());
};

export const getChildren = async (parentCollectionHandleString: string): Promise<types.DocuShareObject[] | false> => {

  const dsOutput = await runJavaApplication(
    "GetChildren",
    [parentCollectionHandleString]
  );

  return utils.getMultipleDocuShareObjectsOutput(dsOutput);
};


/*
 * Create
 */


export const createCollection = async (parentCollectionHandleString: string, collectionTitle: string): Promise<types.DocuShareObject | false> => {

  const dsOutput = await runJavaApplication(
    "CreateCollection",
    [parentCollectionHandleString, collectionTitle]
  );

  return utils.getSingleDocuShareObjectOutput(dsOutput);
};


/*
 * Update
 */


export const setTitle = async (handleString: string, title: string) => {

  const dsOutput = await runJavaApplication(
    "SetTitle",
    [handleString, title]
  );

  return utils.getSingleDocuShareObjectOutput(dsOutput);
};


/*
 * Delete
 */


export const deleteObject = async (handleString: string) => {

  const dsOutput = await runJavaApplication(
    "DeleteObject",
    [handleString]
  );

  return dsOutput.success;
};
