import { getClinet } from "./utils";

const tableName = "todos";

const deletetable = async () => {
  const clinet = await getClinet();

  const DeleteTable = `
    DROP TABLE IF EXISTS ${tableName} CASCADE;
    `;

  const response = await clinet.query(DeleteTable);
  console.log(`${tableName} is deleted`);
};

deletetable();
