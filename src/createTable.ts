import { getclient } from "./utils";

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

const addressTable = `
CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

const CreateTable = async () => {
  const clinet = await getclient();

  const createTable = addressTable;

  const response = await clinet.query(createTable);
  console.log("table created successfully!");
};

CreateTable();
