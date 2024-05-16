import { getClinet } from "./utils";

const tagetRow = ["test1@mail.com"];

const getData = async () => {
  const client = await getClinet();

  const query = `
  SELECT * FROM users WHERE email = $1;
  `;
  const response = await client.query(query, tagetRow);

  console.log(response.rows[0]);
};

getData();
