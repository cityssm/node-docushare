import { config } from "./config.js";
import * as ds from "../index.js";
async function getChildren() {
    ds.setupServer({
        serverName: config.serverName
    });
    ds.setupSession({
        userName: config.userName,
        password: config.password
    });
    return await ds.getChildren("Collection-400");
}
(async () => {
    const dsObject = await getChildren();
    console.log(dsObject);
})();
