import assert from 'node:assert';
import { describe, it } from 'node:test';
import { DocuShareAPI } from '../index.js';
import { config } from './config.js';
await describe('getChildren', async () => {
    const docuShareAPI = new DocuShareAPI({
        server: {
            serverName: config.serverName
        },
        session: {
            userName: config.userName,
            password: config.password
        }
    });
    await it('should get children', async () => {
        const dsObject = await docuShareAPI.getChildren('Collection-400');
        console.log(dsObject);
        assert.strictEqual(dsObject.success, true);
        assert(dsObject.dsObjects.length > 0);
    });
});
