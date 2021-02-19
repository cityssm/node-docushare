"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOutput = void 0;
const parseOutput = (javaOutput) => {
    if (javaOutput.status === 0) {
        return JSON.parse(javaOutput.stdout.trim());
    }
    else {
        return {
            success: false,
            dsObjects: [],
            error: javaOutput.stderr
        };
    }
};
exports.parseOutput = parseOutput;
