import { Client } from "pg";
import { postgresqlUrl } from "./config";

const getClinet = async () => {
  const clinet = new Client(postgresqlUrl);

  await clinet.connect();

  return clinet;
};

export { getClinet };
