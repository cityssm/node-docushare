import { JavaCaller } from "java-caller";

import * as defaults from "./defaults";

import type * as types from "./types";


/*
 * Setup
 */

// Java

let javaConfig: types.JavaConfig = {
  dsapiPath: defaults.DSAPI_PATH
};

export const setupJava = (config: types.JavaConfig) => {
  javaConfig = config;
  if (!javaConfig.hasOwnProperty("dsapiPath")) {
    javaConfig.dsapiPath = defaults.DSAPI_PATH;
  }
};

// Server

let serverConfig: types.ServerConfig;

export const setupServer = (config: types.ServerConfig) => {
  serverConfig = config;
  if (!serverConfig.hasOwnProperty("serverPort")) {
    serverConfig.serverPort = defaults.SERVER_PORT;
  }
};

// Session

let sessionConfig: types.SessionConfig;

export const setupSession = (config: types.SessionConfig) => {
  sessionConfig = config;
  if (!sessionConfig.hasOwnProperty("userDomain")) {
    sessionConfig.userDomain = defaults.USER_DOMAIN;
  }
};


/*
 * Helpers
 */


const buildCallerOptions = (mainClass: string) => {

  return {
    rootPath: defaults.JAVA_ROOTPATH,
    classPath: `${defaults.JAVA_CLASSPATH}:${javaConfig.dsapiPath}`,
    mainClass,
    minimumJavaVersion: defaults.JAVA_MINIMUMJAVAVERSION
  };
};

const buildArguments = (methodArgs: string[]): string[] => {

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

const prepareSingleDocuShareObjectOutput = (status: number, stdout: string, stderr: string) => {

  if (status === 0) {
    const dsOutput = JSON.parse(stdout.trim()) as types.DocuShareOutput;

    if (dsOutput.dsObjects.length > 0) {
      return dsOutput.dsObjects[0];
    } else {
      return false;
    }

  } else {
    throw new Error(stderr);
  }
};


/*
 * Find
 */


export const findByHandle = async (handleString: string): Promise<types.DocuShareObject | false> => {

  const java = new JavaCaller(
    buildCallerOptions("cityssm.nodedocusharejava.FindByHandle")
  );

  const { status, stdout, stderr } = await java.run(
    buildArguments([
      handleString
    ])
  );

  return prepareSingleDocuShareObjectOutput(status, stdout, stderr);
};

export const findByObjectClassAndID = async (objectClass: types.DocuShareObjectClass, objectID: number) => {
  return await findByHandle(objectClass + "-" + objectID.toString());
};


/*
 * Create
 */


export const createCollection = async (parentCollectionHandleString: string, collectionTitle: string): Promise<types.DocuShareObject | false> => {

  const java = new JavaCaller(
    buildCallerOptions("cityssm.nodedocusharejava.CreateCollection")
  );

  const { status, stdout, stderr } = await java.run(
    buildArguments([
      parentCollectionHandleString,
      collectionTitle
    ])
  );

  return prepareSingleDocuShareObjectOutput(status, stdout, stderr);
};


/*
 * Update
 */


export const setTitle = async (handleString: string, title: string) => {

  const java = new JavaCaller(
    buildCallerOptions("cityssm.nodedocusharejava.SetTitle")
  );

  const { status, stdout, stderr } = await java.run(
    buildArguments([
      handleString,
      title
    ])
  );

  return prepareSingleDocuShareObjectOutput(status, stdout, stderr);
};
