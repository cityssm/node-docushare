import assert from 'node:assert'
import { describe, it } from 'node:test'

import { DocuShareAPI } from '../index.js'

import { config } from './config.js'

await describe('deleteObject', async () => {
  const docuShareAPI = new DocuShareAPI({
    server: {
      serverName: config.serverName
    },
    session: {
      userName: config.userName,
      password: config.password
    }
  })

  await it('should delete object', async () => {
    const dsObject = await docuShareAPI.deleteObject('Collection-1843')

    console.log(dsObject)

    assert.strictEqual(dsObject.success, true)
  })
})
