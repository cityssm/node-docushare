import { config } from "./config.js";
import * as ds from "../index.js";

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

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async() => {
  const dsObject = await createCollection();
  console.log(dsObject);
})();
