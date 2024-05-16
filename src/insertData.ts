import { getClinet } from "./utils";

const insertData = async () => {
  const clinet = await getClinet();
  const user = `
    INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id;
    `;
  const userValue = ["test1@mail.com", "123456789"];

  let response = await clinet.query(user, userValue);

  console.log(`Data inserted`);
  //   console.log(response);
};

insertData();
