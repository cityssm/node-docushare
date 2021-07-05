export const parseOutput = (javaOutput) => {
    return javaOutput.status === 0
        ? JSON.parse(javaOutput.stdout.trim())
        : {
            success: false,
            dsObjects: [],
            error: javaOutput.stderr
        };
};
