import { config } from "./config.js";
import * as ds from "../index.js";
async function deleteObject() {
    ds.setupServer({
        serverName: config.serverName
    });
    ds.setupSession({
        userName: config.userName,
        password: config.password
    });
    return await ds.deleteObject("Collection-1843");
}
(async () => {
    const dsObject = await deleteObject();
    console.log(dsObject);
})();
