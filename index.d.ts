import type * as types from './types.js';
export declare class DocuShareAPI {
    #private;
    constructor(configs: {
        java?: types.JavaConfig;
        server: types.ServerConfig;
        session: types.SessionConfig;
    });
    /**
     * Finds a single DocuShare object by a handle (i.e. "Collection-123")
     * @param handleString - The handle of the object to find.
     * @returns The DocuShare object.
     */
    findByHandle(handleString: string): Promise<types.DocuShareOutput>;
    findByObjectClassAndID(objectClass: types.DocuShareObjectClass, objectID: number): Promise<types.DocuShareOutput>;
    /**
     * Retrieves the child objects of a given DocuShare Collection.
     * @param parentCollectionHandleString - The handle of the parent collection.
     * @returns The child objects of the parent collection.
     */
    getChildren(parentCollectionHandleString: string): Promise<types.DocuShareOutput>;
    /**
     * Retrieves the child objects of a given DocuShare Collection
     * filtering them by given criteria.
     * @param parentCollectionHandleString - The handle of the parent collection.
     * @param findChildrenFilters - The filters to apply to the child objects.
     * @returns The child objects of the parent collection.
     */
    findChildren(parentCollectionHandleString: string, findChildrenFilters?: types.FindChildrenFilters): Promise<types.DocuShareOutput>;
    /**
     * Creates a new Collection beneath a given DocuShare Collection.
     * @param parentCollectionHandleString - The handle of the parent collection.
     * @param collectionTitle - The title of the new collection.
     * @returns The new Collection object.
     */
    createCollection(parentCollectionHandleString: string, collectionTitle: string): Promise<types.DocuShareOutput>;
    /**
     * Updates a given DocuShare object with a new title.
     * @param handleString - The handle of the object to update.
     * @param title - The new title of the object.
     * @returns The updated DocuShare object.
     */
    setTitle(handleString: string, title: string): Promise<types.DocuShareOutput>;
    /**
     * Updates a given DocuShare object with new keywords.
     * @param handleString - The handle of the object to update.
     * @param keywords - The new keywords of the object.
     * @returns The updated DocuShare object.
     */
    setKeywords(handleString: string, keywords: string): Promise<types.DocuShareOutput>;
    /**
     * Removes a given DocuShare object.
     * @param handleString - The handle of the object to delete.
     * @returns Whether the object was successfully deleted.
     */
    deleteObject(handleString: string): Promise<types.DocuShareOutput>;
}
