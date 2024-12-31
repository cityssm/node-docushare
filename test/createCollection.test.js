import assert from 'node:assert';
import { describe, it } from 'node:test';
import { DocuShareAPI } from '../index.js';
import { config } from './config.js';
await describe('createCollection', async () => {
    const docuShareAPI = new DocuShareAPI({
        server: {
            serverName: config.serverName
        },
        session: {
            userName: config.userName,
            password: config.password
        }
    });
    await it('should create collection', async () => {
        const dsObject = await docuShareAPI.createCollection('Collection-5137', '! Testing Testing');
        console.log(dsObject);
        assert.strictEqual(dsObject.success, true);
    });
});
