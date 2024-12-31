import assert from 'node:assert'
import { describe, it } from 'node:test'

import { DocuShareAPI } from '../index.js'

import { config } from './config.js'

await describe('findChildren', async () => {
  const docuShareAPI = new DocuShareAPI({
    server: {
      serverName: config.serverName
    },
    session: {
      userName: config.userName,
      password: config.password
    }
  })

  await it('should find by handle', async () => {
    const dsObject = await docuShareAPI.findByHandle('Collection-400')

    console.log(dsObject)

    assert.strictEqual(dsObject.success, true)
    assert(dsObject.dsObjects.length > 0)
  })
})