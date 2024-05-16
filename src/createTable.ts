import { getClinet } from "./utils";

const userTable = `
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
`;

const todoTable = `
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description VARCHAR(255) ,
    done BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id)
  );
`;

const CreateTable = async () => {
  const clinet = await getClinet();

  const createTable = todoTable;

  const response = await clinet.query(createTable);
  console.log("table created successfully!");
};

CreateTable();
