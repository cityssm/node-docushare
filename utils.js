export const parseOutput = (javaOutput) => {
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
