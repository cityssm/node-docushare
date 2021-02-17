import { config } from "./config";
import * as ds from "../index";

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

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async() => {
  const dsObject = await getChildren();
  console.log(dsObject);
})();
