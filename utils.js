"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleDocuShareObjectOutput = exports.getMultipleDocuShareObjectsOutput = exports.parseOutput = void 0;
const parseOutput = (javaOutput) => {
    if (javaOutput.status === 0) {
        return JSON.parse(javaOutput.stdout.trim());
    }
    else {
        throw new Error(javaOutput.stderr);
    }
};
exports.parseOutput = parseOutput;
const getMultipleDocuShareObjectsOutput = (dsOutput) => {
    if (dsOutput.dsObjects.length > 0) {
        return dsOutput.dsObjects;
    }
    return false;
};
exports.getMultipleDocuShareObjectsOutput = getMultipleDocuShareObjectsOutput;
const getSingleDocuShareObjectOutput = (dsOutput) => {
    const dsObjects = exports.getMultipleDocuShareObjectsOutput(dsOutput);
    if (dsObjects) {
        return dsObjects[0];
    }
    return false;
};
exports.getSingleDocuShareObjectOutput = getSingleDocuShareObjectOutput;
