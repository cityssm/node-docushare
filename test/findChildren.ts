import { config } from "./config.js";
import * as ds from "../index.js";

async function findChildren() {
  ds.setupServer({
    serverName: config.serverName
  });

  ds.setupSession({
    userName: config.userName,
    password: config.password
  });

  return await ds.findChildren("Collection-400", {
    text: {
      searchType: "includesPieces",
      searchString: "carpet"
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  console.time("findChildren");

  const dsObject = await findChildren();

  console.timeEnd("findChildren");
  console.log(dsObject);
})();
