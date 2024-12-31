import assert from 'node:assert'
import { describe, it } from 'node:test'

import { DocuShareAPI } from '../index.js'

import { config } from './config.js'

await describe('setKeywords', async () => {
  const docuShareAPI = new DocuShareAPI({
    server: {
      serverName: config.serverName
    },
    session: {
      userName: config.userName,
      password: config.password
    }
  })

  await it('should set keywords', async () => {
    const dsObject = await docuShareAPI.setKeywords(
      'Collection-5138',
      Date.now().toString()
    )

    console.log(dsObject)

    assert.strictEqual(dsObject.success, true)
  })
})
