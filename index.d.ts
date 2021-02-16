import type * as types from "./types";
export declare const setupJava: (config: types.JavaConfig) => void;
export declare const setupServer: (config: types.ServerConfig) => void;
export declare const setupSession: (config: types.SessionConfig) => void;
export declare const findByHandle: (handleString: string) => Promise<types.DocuShareObject>;
export declare const findByObjectClassAndID: (objectClass: types.DocuShareObjectClass, objectID: number) => Promise<types.DocuShareObject>;
export declare const createCollection: (parentCollectionHandleString: string, collectionTitle: string) => Promise<types.DocuShareObject>;
