import { config } from "./config.js";
import * as ds from "../index.js";

async function findByHandle() {
  ds.setupServer({
    serverName: config.serverName
  });

  ds.setupSession({
    userName: config.userName,
    password: config.password
  });

  return await ds.findByHandle("Collection-400");
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async() => {
  const dsObject = await findByHandle();
  console.log(dsObject);
})();
