import { Client } from "pg";
import { postgresqlUrl } from "./config";

const getclient = async () => {
  const client = new Client(postgresqlUrl);

  await client.connect();

  return client;
};

export { getclient };
