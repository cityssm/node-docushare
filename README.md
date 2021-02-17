# node-docushare

[![npm (scoped)](https://img.shields.io/npm/v/@cityssm/docushare)](https://www.npmjs.com/package/@cityssm/docushare) [![Codacy grade](https://img.shields.io/codacy/grade/fb0290786d3b4648a72d66363ab2fe7a)](https://app.codacy.com/gh/cityssm/node-docushare/dashboard) [![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/cityssm/node-docushare)](https://codeclimate.com/github/cityssm/node-docushare) [![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/cityssm/node-docushare)](https://app.snyk.io/org/cityssm/project/e2964793-ef2f-4ac8-81ba-fc345c9c3ba2)

An unofficial DocuShare API for NodeJS, wrapped around the official Java API.

Node-docushare relies on
[node-java-caller](https://github.com/nvuillam/node-java-caller)
to run simple Java programs written using
[dsJQuery](https://github.com/cityssm/dsJQuery),
a Java project which simplifies the official DocuShare API.

## Installation

```bash
npm install @cityssm/docushare
```

Node-docushare requires Java 12 or better.  If a Java 12 JRE is unavailable,
one will be downloaded on first use.

### ⭐ dsapi.jar not included ⭐

Note that every version on DocuShare requires a different version of the dsapi.jar file.
Also, the licence around distributing the dsapi.jar file is unclear.

**The appropriate dsapi.jar file is required before use.**

dsapi.jar files are available for free through the
[Xerox DocuShare Developer Network](https://docushare.xerox.com/dsdn/dsweb/HomePage).

## Getting Started

```javascript
import * as ds from "@cityssm/docushare";

/*
 * Set Up Connection
 */

ds.setupJava({
  dsapiPath: path.join("..", "..", "..", "java", "dsapi.jar")
});

ds.setupServer({
  serverName: "dsServer.local"
});

ds.setupSession({
  userName: "userName",
  password: "p@ssword1"
});

// Get a Collection
const dsCollection = await ds.findByHandle("Collection-100");

// Get the child objects of a Collection
const dsObjects = await ds.getChildren("Collection-101");

// Create a new Collection beneath a Collection
const childCollection = await ds.createCollection("Collection-102", "New Collection Name");
```

## Functions

Note that functions are written based on need.
Need another function?
[Create an issue](https://github.com/cityssm/node-docushare/issues/new)
or submit a pull request!

### Read / Create / Update

-   `ds.findByHandle(handleString): DocuShareObject;`

-   `ds.getChildren(parentCollectionHandleString): DocuShareObject[];`

-   `ds.createCollection(parentCollectionHandleString, newTitle): DocuShareObject;`

-   `ds.setTitle(handleString, newTitle): DocuShareObject;`

Queries return either one of or an array of `DocuShareObject`s.

```typescript
interface DocuShareObject {
  handle: string;
  title: string;
  summary: string;
  description: string;
  keywords: string;
  createDate: string;
  createDateMillis: number;
  modifiedDate: string;
  modifiedDateMillis: number;
  expirationDate?: string;
  expirationDateMillis?: number;
};
```

### Delete

-   `ds.deleteObject(handleString): boolean;`
