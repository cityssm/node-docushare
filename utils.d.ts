import type * as types from "./types";
export declare const parseOutput: (javaOutput: types.JavaOutput) => types.DocuShareOutput;
export declare const getMultipleDocuShareObjectsOutput: (dsOutput: types.DocuShareOutput) => false | types.DocuShareObject[];
export declare const getSingleDocuShareObjectOutput: (dsOutput: types.DocuShareOutput) => false | types.DocuShareObject;
