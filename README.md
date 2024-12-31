# node-docushare

[![npm (scoped)](https://img.shields.io/npm/v/@cityssm/docushare)](https://www.npmjs.com/package/@cityssm/docushare)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/cityssm/node-docushare)](https://codeclimate.com/github/cityssm/node-docushare)
[![DeepSource](https://app.deepsource.com/gh/cityssm/node-docushare.svg/?label=active+issues&show_trend=true&token=V3hxZTFUSIPGJnC2QfukKK8D)](https://app.deepsource.com/gh/cityssm/node-docushare/)

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

Node-docushare requires Java 12 or better. If a Java 12 JRE is unavailable,
one will be downloaded on first use.

### ⭐ dsapi.jar not included ⭐

Note that every version on DocuShare requires a different version of the dsapi.jar file.
Also, the licence around distributing the dsapi.jar file is unclear.

**The appropriate dsapi.jar file is required before use.**

dsapi.jar files are available for free through the
[Xerox DocuShare Developer Network](https://docushare.xerox.com/dsdn/dsweb/HomePage).

## Getting Started

```javascript
import { DocuShareAPI } from '@cityssm/docushare'

const docuShareAPI = new DocuShareAPI({
  server: {
    serverName: 'dsServer.local'
  },
  session: {
    userName: 'userName',
    password: 'p@ssword1'
  },
  java: {
    dsapiPath: path.join('..', '..', '..', 'java', 'dsapi.jar')
  }
})

// Get a Collection
const dsCollection = await docuShareAPI.findByHandle('Collection-100')

// Get the child objects of a Collection
const dsObjects = await docuShareAPI.getChildren('Collection-101')

// Create a new Collection beneath a Collection
const childCollection = await docuShareAPI.createCollection(
  'Collection-102',
  'New Collection Name'
)
```

## Functions

Note that functions are written based on need.
Need another function?
[Create an issue](https://github.com/cityssm/node-docushare/issues/new)
or submit a pull request!

- `findByHandle(handleString);`

- `getChildren(parentCollectionHandleString);`

- `findChildren(parentCollectionHandleString, filters);`

- `createCollection(parentCollectionHandleString, newTitle);`

- `setTitle(handleString, newTitle);`

- `setKeywords(handleString, newKeywords);`

- `deleteObject(handleString): boolean;`

All functions return `DocuShareOutput` objects.

```typescript
interface DocuShareOutput {
  success: boolean
  dsObjects: DocuShareObject[]
  error?: string
}

interface DocuShareObject {
  handle: string
  title: string
  summary: string
  description: string
  keywords: string
  createDate: string
  createDateMillis: number
  modifiedDate: string
  modifiedDateMillis: number
  expirationDate?: string
  expirationDateMillis?: number
}
```
