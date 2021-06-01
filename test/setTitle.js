import { config } from "./config.js";
import * as ds from "../index.js";
async function setTitle() {
    ds.setupServer({
        serverName: config.serverName
    });
    ds.setupSession({
        userName: config.userName,
        password: config.password
    });
    return await ds.setTitle("Collection-405", "Aldo's Shipping and Freight");
}
(async () => {
    const dsObject = await setTitle();
    console.log(dsObject);
})();
