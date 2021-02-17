import { config } from "./config";
import * as ds from "../index";

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

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async() => {
  const dsObject = await setTitle();
  console.log(dsObject);
})();
