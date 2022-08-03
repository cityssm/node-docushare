import { config } from "./config.js";
import * as ds from "../index.js";

async function setKeywords() {
  ds.setupServer({
    serverName: config.serverName
  });

  ds.setupSession({
    userName: config.userName,
    password: config.password
  });

  return await ds.setKeywords("Collection-5138", Date.now().toString());
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async() => {
  const dsObject = await setKeywords();
  console.log(dsObject);
})();
