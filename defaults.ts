import * as path from "path";

/*
 * Java Options
 */

export const JAVA_ROOTPATH = __dirname;

export const JAVA_CLASSPATH =
  path.join("java", "bin") + ":" +
  path.join("java", "lib", "dsJQuery", "dsJQuery-20210212.jar") + ":" +
  path.join("java", "lib", "jdom", "jdom-1.1.3.jar") + ":" +
  path.join("java", "lib", "json", "json-20201115.jar");

export const JAVA_MINIMUMJAVAVERSION = 12;

/*
 * Java Setup
 */

export const DSAPI_PATH = path.join("java", "lib", "dsapi", "dsapi.jar");

/*
 * Server Setup
 */

export const SERVER_PORT = 1099;

/*
 * Session Setup
 */

export const USER_DOMAIN = "DocuShare";
