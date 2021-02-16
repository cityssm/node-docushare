import { config } from "./config";
import * as ds from "../index";

async function createCollection() {
  ds.setupServer({
    serverName: config.serverName
  });

  ds.setupSession({
    userName: config.userName,
    password: config.password
  });

  return await ds.createCollection("Collection-400", "! Testing Testing");
}

(async() => {
  const dsObject = await createCollection();
  console.log(dsObject);
})();
