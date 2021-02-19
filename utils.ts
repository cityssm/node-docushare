import type * as types from "./types";


export const parseOutput = (javaOutput: types.JavaOutput): types.DocuShareOutput => {

  if (javaOutput.status === 0) {
    return JSON.parse(javaOutput.stdout.trim()) as types.DocuShareOutput;

  } else {
    return {
      success: false,
      dsObjects: [],
      error: javaOutput.stderr
    };
  }
};
