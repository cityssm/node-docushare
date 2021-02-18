import type * as types from "./types";


export const parseOutput = (javaOutput: types.JavaOutput): types.DocuShareOutput => {

  if (javaOutput.status === 0) {
    return JSON.parse(javaOutput.stdout.trim()) as types.DocuShareOutput;

  } else {
    throw new Error(javaOutput.stderr);
  }
};


export const getMultipleDocuShareObjectsOutput = (dsOutput: types.DocuShareOutput) => {

  if (dsOutput.dsObjects.length > 0) {
    return dsOutput.dsObjects;
  }

  return false;
};


export const getSingleDocuShareObjectOutput = (dsOutput: types.DocuShareOutput) => {

  const dsObjects = getMultipleDocuShareObjectsOutput(dsOutput);

  if (dsObjects) {
    return dsObjects[0];
  }

  return false;
};
