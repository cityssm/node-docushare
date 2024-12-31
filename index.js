import Debug from 'debug';
import { JavaCaller } from 'java-caller';
import * as defaults from './defaults.js';
import * as utils from './utils.js';
// eslint-disable-next-line @cspell/spellchecker
const debug = Debug('docushare-api:index');
export class DocuShareAPI {
    #javaConfig = defaults.JAVA_CONFIG;
    #serverConfig;
    #sessionConfig;
    constructor(configs) {
        if (configs.java !== undefined) {
            this.#javaConfig = Object.assign({}, defaults.JAVA_CONFIG, configs.java);
        }
        this.#serverConfig = Object.assign({}, defaults.SERVER_CONFIG, configs.server);
        this.#sessionConfig = Object.assign({}, defaults.SESSION_CONFIG, configs.session);
    }
    #buildJavaCallerOptions(mainClass) {
        const classPathList = [
            ...defaults.JAVA_CLASSPATH,
            ...this.#javaConfig.dsapiPath
        ];
        return {
            rootPath: defaults.JAVA_ROOTPATH,
            classPath: process.platform === 'win32'
                ? `"${classPathList.join(';')}"`
                : classPathList,
            useAbsoluteClassPaths: true,
            mainClass,
            minimumJavaVersion: defaults.JAVA_MINIMUMJAVAVERSION
        };
    }
    #buildJavaArguments(methodArguments) {
        const javaArguments = [
            this.#serverConfig.serverName,
            (this.#serverConfig.serverPort ?? defaults.SERVER_CONFIG.serverPort).toString(),
            this.#sessionConfig.userDomain ?? '',
            this.#sessionConfig.userName,
            this.#sessionConfig.password
        ];
        for (const methodArgument of methodArguments) {
            if (methodArgument.includes(' ')) {
                javaArguments.push('"' + methodArgument + '"');
            }
            else {
                javaArguments.push(methodArgument);
            }
        }
        return javaArguments;
    }
    async #runJavaApplication(applicationClassName, applicationArguments) {
        const callerOptions = this.#buildJavaCallerOptions(`cityssm.nodedocusharejava.${applicationClassName}`);
        debug('Java Caller Options:', callerOptions);
        const java = new JavaCaller(callerOptions);
        const javaOutput = await java.run(this.#buildJavaArguments(applicationArguments));
        // debug('Java Output:', javaOutput)
        const docuShareOutput = utils.parseOutput(javaOutput);
        return docuShareOutput;
    }
    /**
     * Finds a single DocuShare object by a handle (i.e. "Collection-123")
     * @param handleString - The handle of the object to find.
     * @returns The DocuShare object.
     */
    async findByHandle(handleString) {
        return await this.#runJavaApplication('FindByHandle', [handleString]);
    }
    async findByObjectClassAndID(objectClass, objectID) {
        return await this.findByHandle(objectClass + '-' + objectID.toString());
    }
    /**
     * Retrieves the child objects of a given DocuShare Collection.
     * @param parentCollectionHandleString - The handle of the parent collection.
     * @returns The child objects of the parent collection.
     */
    async getChildren(parentCollectionHandleString) {
        return await this.#runJavaApplication('GetChildren', [
            parentCollectionHandleString
        ]);
    }
    /**
     * Retrieves the child objects of a given DocuShare Collection
     * filtering them by given criteria.
     * @param parentCollectionHandleString - The handle of the parent collection.
     * @param findChildrenFilters - The filters to apply to the child objects.
     * @returns The child objects of the parent collection.
     */
    async findChildren(parentCollectionHandleString, findChildrenFilters = {}) {
        const children = await this.getChildren(parentCollectionHandleString);
        if (!children.success) {
            return children;
        }
        // Prepare filters
        for (const filterKey of Object.keys(findChildrenFilters)) {
            findChildrenFilters[filterKey].searchString = findChildrenFilters[filterKey].searchString
                .trim()
                .toLowerCase();
            findChildrenFilters[filterKey]._searchStringSplit =
                findChildrenFilters[filterKey].searchString.split(' ');
        }
        children.dsObjects = children.dsObjects.filter((dsObject) => {
            for (const filterKey of Object.keys(findChildrenFilters)) {
                const filter = findChildrenFilters[filterKey];
                const searchText = filterKey === 'text'
                    ? (dsObject.title +
                        ' ' +
                        dsObject.summary +
                        ' ' +
                        dsObject.description).toLowerCase()
                    : dsObject[filterKey].toLowerCase();
                if (filter.searchType === 'equals' &&
                    searchText !== filter.searchString) {
                    return false;
                }
                else if (filter.searchType === 'includes' &&
                    !searchText.includes(filter.searchString)) {
                    return false;
                }
                else if (filter.searchType === 'includesPieces') {
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
    }
    /**
     * Creates a new Collection beneath a given DocuShare Collection.
     * @param parentCollectionHandleString - The handle of the parent collection.
     * @param collectionTitle - The title of the new collection.
     * @returns The new Collection object.
     */
    async createCollection(parentCollectionHandleString, collectionTitle) {
        return await this.#runJavaApplication('CreateCollection', [
            parentCollectionHandleString,
            collectionTitle
        ]);
    }
    /**
     * Updates a given DocuShare object with a new title.
     * @param handleString - The handle of the object to update.
     * @param title - The new title of the object.
     * @returns The updated DocuShare object.
     */
    async setTitle(handleString, title) {
        return await this.#runJavaApplication('SetTitle', [handleString, title]);
    }
    /**
     * Updates a given DocuShare object with new keywords.
     * @param handleString - The handle of the object to update.
     * @param keywords - The new keywords of the object.
     * @returns The updated DocuShare object.
     */
    async setKeywords(handleString, keywords) {
        return await this.#runJavaApplication('SetKeywords', [
            handleString,
            keywords
        ]);
    }
    /**
     * Removes a given DocuShare object.
     * @param handleString - The handle of the object to delete.
     * @returns Whether the object was successfully deleted.
     */
    async deleteObject(handleString) {
        return await this.#runJavaApplication('DeleteObject', [handleString]);
    }
}
