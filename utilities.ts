import type { JavaCallerResult } from 'java-caller'

import type { DocuShareOutput } from './types.js'

export function parseOutput(javaOutput: JavaCallerResult): DocuShareOutput {
  return javaOutput.status === 0
    ? (JSON.parse(javaOutput.stdout.trim()) as DocuShareOutput)
    : {
        success: false,
        dsObjects: [],
        error: javaOutput.stderr
      }
}

export default {
  parseOutput
}
