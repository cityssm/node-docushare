import type * as types from "./types";


export const parseOutput = (javaOutput: types.JavaOutput): types.DocuShareOutput => {

  return javaOutput.status === 0
    ? JSON.parse(javaOutput.stdout.trim()) as types.DocuShareOutput
    : {
      success: false,
      dsObjects: [],
      error: javaOutput.stderr
    };
};
