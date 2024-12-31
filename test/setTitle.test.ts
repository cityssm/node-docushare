import assert from 'node:assert'
import { describe, it } from 'node:test'

import { DocuShareAPI } from '../index.js'

import { config } from './config.js'

await describe('setTitle', async () => {
  const docuShareAPI = new DocuShareAPI({
    server: {
      serverName: config.serverName
    },
    session: {
      userName: config.userName,
      password: config.password
    }
  })

  await it('should set title', async () => {
    const dsObject = await docuShareAPI.setTitle(
      'Collection-5138',
      'Test Collection - ' + Date.now()
    )

    console.log(dsObject)

    assert.strictEqual(dsObject.success, true)
  })
})
