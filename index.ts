import Debug from 'debug'
import { JavaCaller } from 'java-caller'

import * as defaults from './defaults.js'
import type * as types from './types.js'
import * as utils from './utils.js'

interface JavaCallerOptions {
  rootPath: string
  classPath: string[] | string
  useAbsoluteClassPaths: boolean
  mainClass: string
  minimumJavaVersion: number
}

// eslint-disable-next-line @cspell/spellchecker
const debug = Debug('docushare-api:index')

export class DocuShareAPI {
  readonly #javaConfig: types.JavaConfig = defaults.JAVA_CONFIG
  readonly #serverConfig: types.ServerConfig
  readonly #sessionConfig: types.SessionConfig

  constructor(configs: {
    java?: types.JavaConfig
    server: types.ServerConfig
    session: types.SessionConfig
  }) {
    if (configs.java !== undefined) {
      this.#javaConfig = Object.assign({}, defaults.JAVA_CONFIG, configs.java)
    }

    this.#serverConfig = Object.assign(
      {},
      defaults.SERVER_CONFIG,
      configs.server
    )

    this.#sessionConfig = Object.assign(
      {},
      defaults.SESSION_CONFIG,
      configs.session
    )
  }

  #buildJavaCallerOptions(mainClass: string): JavaCallerOptions {
    const classPathList = [
      ...defaults.JAVA_CLASSPATH,
      ...this.#javaConfig.dsapiPath
    ]

    return {
      rootPath: defaults.JAVA_ROOTPATH,
      classPath:
        process.platform === 'win32'
          ? `"${classPathList.join(';')}"`
          : classPathList,
      useAbsoluteClassPaths: true,
      mainClass,
      minimumJavaVersion: defaults.JAVA_MINIMUMJAVAVERSION
    }
  }

  #buildJavaArguments(methodArguments: string[]): string[] {
    const javaArguments = [
      this.#serverConfig.serverName,
      (
        this.#serverConfig.serverPort ?? defaults.SERVER_CONFIG.serverPort
      ).toString(),
      this.#sessionConfig.userDomain ?? '',
      this.#sessionConfig.userName,
      this.#sessionConfig.password
    ]

    for (const methodArgument of methodArguments) {
      if (methodArgument.includes(' ')) {
        javaArguments.push('"' + methodArgument + '"')
      } else {
        javaArguments.push(methodArgument)
      }
    }

    return javaArguments
  }

  async #runJavaApplication(
    applicationClassName: string,
    applicationArguments: string[]
  ): Promise<types.DocuShareOutput> {
    const callerOptions = this.#buildJavaCallerOptions(
      `cityssm.nodedocusharejava.${applicationClassName}`
    )

    debug('Java Caller Options:', callerOptions)

    const java = new JavaCaller(callerOptions)

    const javaOutput: types.JavaOutput = await java.run(
      this.#buildJavaArguments(applicationArguments)
    )

    // debug('Java Output:', javaOutput)

    const docuShareOutput = utils.parseOutput(javaOutput)

    return docuShareOutput
  }

  /**
   * Finds a single DocuShare object by a handle (i.e. "Collection-123")
   * @param handleString - The handle of the object to find.
   * @returns The DocuShare object.
   */
  async findByHandle(handleString: string): Promise<types.DocuShareOutput> {
    return await this.#runJavaApplication('FindByHandle', [handleString])
  }

  async findByObjectClassAndID(
    objectClass: types.DocuShareObjectClass,
    objectID: number
  ): Promise<types.DocuShareOutput> {
    return await this.findByHandle(objectClass + '-' + objectID.toString())
  }

  /**
   * Retrieves the child objects of a given DocuShare Collection.
   * @param parentCollectionHandleString - The handle of the parent collection.
   * @returns The child objects of the parent collection.
   */
  async getChildren(
    parentCollectionHandleString: string
  ): Promise<types.DocuShareOutput> {
    return await this.#runJavaApplication('GetChildren', [
      parentCollectionHandleString
    ])
  }

  /**
   * Retrieves the child objects of a given DocuShare Collection
   * filtering them by given criteria.
   * @param parentCollectionHandleString - The handle of the parent collection.
   * @param findChildrenFilters - The filters to apply to the child objects.
   * @returns The child objects of the parent collection.
   */
  async findChildren(
    parentCollectionHandleString: string,
    findChildrenFilters: types.FindChildrenFilters = {}
  ): Promise<types.DocuShareOutput> {
    const children = await this.getChildren(parentCollectionHandleString)

    if (!children.success) {
      return children
    }

    // Prepare filters
    for (const filterKey of Object.keys(findChildrenFilters)) {
      findChildrenFilters[filterKey].searchString = findChildrenFilters[
        filterKey
      ].searchString
        .trim()
        .toLowerCase()
      findChildrenFilters[filterKey]._searchStringSplit =
        findChildrenFilters[filterKey].searchString.split(' ')
    }

    children.dsObjects = children.dsObjects.filter((dsObject) => {
      for (const filterKey of Object.keys(findChildrenFilters)) {
        const filter: types.Filter = findChildrenFilters[filterKey]

        const searchText =
          filterKey === 'text'
            ? (
                dsObject.title +
                ' ' +
                dsObject.summary +
                ' ' +
                dsObject.description
              ).toLowerCase()
            : dsObject[filterKey].toLowerCase()

        if (
          filter.searchType === 'equals' &&
          searchText !== filter.searchString
        ) {
          return false
        } else if (
          filter.searchType === 'includes' &&
          !searchText.includes(filter.searchString)
        ) {
          return false
        } else if (filter.searchType === 'includesPieces') {
          for (const searchStringPiece of filter._searchStringSplit) {
            if (!searchText.includes(searchStringPiece)) {
              return false
            }
          }
        }
      }

      return true
    })

    return children
  }

  /**
   * Creates a new Collection beneath a given DocuShare Collection.
   * @param parentCollectionHandleString - The handle of the parent collection.
   * @param collectionTitle - The title of the new collection.
   * @returns The new Collection object.
   */
  async createCollection(
    parentCollectionHandleString: string,
    collectionTitle: string
  ): Promise<types.DocuShareOutput> {
    return await this.#runJavaApplication('CreateCollection', [
      parentCollectionHandleString,
      collectionTitle
    ])
  }

  /**
   * Updates a given DocuShare object with a new title.
   * @param handleString - The handle of the object to update.
   * @param title - The new title of the object.
   * @returns The updated DocuShare object.
   */
  async setTitle(
    handleString: string,
    title: string
  ): Promise<types.DocuShareOutput> {
    return await this.#runJavaApplication('SetTitle', [handleString, title])
  }

  /**
   * Updates a given DocuShare object with new keywords.
   * @param handleString - The handle of the object to update.
   * @param keywords - The new keywords of the object.
   * @returns The updated DocuShare object.
   */
  async setKeywords(
    handleString: string,
    keywords: string
  ): Promise<types.DocuShareOutput> {
    return await this.#runJavaApplication('SetKeywords', [
      handleString,
      keywords
    ])
  }

  /**
   * Removes a given DocuShare object.
   * @param handleString - The handle of the object to delete.
   * @returns Whether the object was successfully deleted.
   */
  async deleteObject(handleString: string): Promise<types.DocuShareOutput> {
    return await this.#runJavaApplication('DeleteObject', [handleString])
  }
}
