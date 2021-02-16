import { JavaCaller } from "java-caller";

import * as path from "path";

import type * as types from "./types";

/*
 * Java Options
 */

const JAVA_ROOTPATH = __dirname;

const JAVA_CLASSPATH =
  path.join("java", "bin") + ":" +
  path.join("java", "lib", "dsJQuery", "dsJQuery-20210212.jar") + ":" +
  path.join("java", "lib", "jdom", "jdom-1.1.3.jar") + ":" +
  path.join("java", "lib", "json", "json-20201115.jar");

const JAVA_MINIMUMJAVAVERSION = 12;

/*
 * Java Setup
 */

const DEFAULT_DSAPI_PATH = path.join("java", "lib", "dsapi", "dsapi.jar");

let javaConfig: types.JavaConfig = {
  dsapiPath: DEFAULT_DSAPI_PATH
};

export const setupJava = (config: types.JavaConfig) => {
  javaConfig = config;
  if (!javaConfig.hasOwnProperty("dsapiPath")) {
    javaConfig.dsapiPath = DEFAULT_DSAPI_PATH;
  }
};

/*
 * Server Setup
 */

const DEFAULT_SERVER_PORT = 1099;

let serverConfig: types.ServerConfig;

export const setupServer = (config: types.ServerConfig) => {
  serverConfig = config;
  if (!serverConfig.hasOwnProperty("serverPort")) {
    serverConfig.serverPort = DEFAULT_SERVER_PORT;
  }
};

/*
 * Session Setup
 */

const DEFAULT_USER_DOMAIN = "DocuShare";

let sessionConfig: types.SessionConfig;

export const setupSession = (config: types.SessionConfig) => {
  sessionConfig = config;
  if (!sessionConfig.hasOwnProperty("userDomain")) {
    sessionConfig.userDomain = DEFAULT_USER_DOMAIN;
  }
};

/*
 * Find
 */

export const findByHandle = async (handleString: string): Promise<types.DocuShareObject> => {

  const java = new JavaCaller({
    rootPath: JAVA_ROOTPATH,
    classPath: `${JAVA_CLASSPATH}:${javaConfig.dsapiPath}`,
    mainClass: "cityssm.nodeDocuShareJava.FindByHandle",
    minimumJavaVersion: JAVA_MINIMUMJAVAVERSION
  });

  const { status, stdout, stderr } = await java.run([
    serverConfig.serverName,
    serverConfig.serverPort.toString(),
    sessionConfig.userDomain,
    sessionConfig.userName,
    sessionConfig.password,
    handleString
  ]);

  if (status === 0) {
    const dsObject = JSON.parse(stdout.trim()) as types.DocuShareObject;
    return dsObject;
  } else {
    throw new Error(stderr);
  }
};

export const findByObjectClassAndID = async (objectClass: types.DocuShareObjectClass, objectID: number) => {
  return await findByHandle(objectClass + "-" + objectID.toString());
};

/*
 * Create Collection
 */

export const createCollection = async (parentCollectionHandleString: string, collectionTitle: string): Promise<types.DocuShareObject> => {

  const java = new JavaCaller({
    rootPath: JAVA_ROOTPATH,
    classPath: `${JAVA_CLASSPATH}:${javaConfig.dsapiPath}`,
    mainClass: "cityssm.nodeDocuShareJava.CreateCollection",
    minimumJavaVersion: JAVA_MINIMUMJAVAVERSION
  });

  const { status, stdout, stderr } = await java.run([
    serverConfig.serverName,
    serverConfig.serverPort.toString(),
    sessionConfig.userDomain,
    sessionConfig.userName,
    sessionConfig.password,
    parentCollectionHandleString,
    "\"" + collectionTitle + "\""
  ]);

  if (status === 0) {
    const dsObject = JSON.parse(stdout.trim()) as types.DocuShareObject;
    return dsObject;
  } else {
    throw new Error(stderr);
  }
};
