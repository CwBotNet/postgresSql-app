import * as fs from "fs";
import { getclient } from "./utils";

// --------------------------------------------------------------------------------------

// Function to generate a random address
function generateRandomAddress(
  userId: number
): [number, string, string, string, string, string, string] {
  const cities = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai"];
  const countries = ["India", "USA", "UK", "Canada", "Australia"];
  const streets = ["Shivam", "Gandhi", "Main", "Park", "Lake"];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  const street = `${
    streets[Math.floor(Math.random() * streets.length)]
  } Colony Part ${Math.floor(Math.random() * 20) + 1} XYZ`;
  const postalCode = Math.floor(Math.random() * 90000) + 10000;
  const createdAt = new Date().toISOString();
  return [
    userId,
    city,
    country,
    street,
    postalCode.toString(),
    createdAt,
    createdAt,
  ];
}

// Generating 1 million addresses
const addresses: [number, string, string, string, string, string, string][] =
  [];
const userIds: number[] = Array.from({ length: 1000000 }, (_, i) => i + 1); // Assuming user IDs start from 1
for (let i = 62214; i < 100000; i++) {
  const userId = userIds[Math.floor(Math.random() * userIds.length)];
  addresses.push(generateRandomAddress(userId));
}

// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------

// Function to generate a random email address
function generateRandomEmail(): string {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
  ];
  const username = Math.random().toString(36).substring(2, 10);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
}

// Function to generate a random password
function generateRandomPassword(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

// Generating 10 million users
const users: [string, string][] = [];
for (let i = 62214; i < 1000000; i++) {
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  users.push([email, password]);
}

// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------

// Function to generate a random todo
function generateRandomTodo(userId: number): [string, string, boolean, number] {
  const titles = [
    "Complete homework",
    "Buy groceries",
    "Exercise",
    "Read a book",
    "Call a friend",
  ];
  const descriptions = [
    "Work on Chapter 5",
    "Milk, Eggs, Bread",
    "Jog for 30 minutes",
    "Science fiction novel",
    "Check on John",
  ];
  const title = titles[Math.floor(Math.random() * titles.length)];
  const description =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const done = Math.random() < 0.5; // Randomly set todo as done or not
  return [title, description, done, userId];
}

// Generating todos for each user
const todos: [string, string, boolean, number][] = [];
for (let i = 1; i <= 1000000; i++) {
  const userId = Math.floor(Math.random() * 1000000) + 1; // Randomly assign todos to users
  const numTodos = Math.floor(Math.random() * 10) + 1; // Generate random number of todos for each user
  for (let j = 0; j < numTodos; j++) {
    todos.push(generateRandomTodo(userId));
  }
}

// --------------------------------------------------------------------------------------

const Address = ["1", "delhi", "india", "shivam colony part 13 xyz", 10002];

const insertData = async () => {
  try {
    const client = await getclient();
    const userQuery = `
      INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id;
      `;
    const addressQuery = `
      INSERT INTO address (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5);
    `;

    const todoQuery = `
    INSERT INTO todos (title, description, done, user_id) VALUES ($1, $2, $3, $4);
  `;

    for (let i = 0; i < users.length; i++) {
      const email = users[i][0];
      const password = users[i][1];

      // Insert user
      const userResponse = await client.query(userQuery, [email, password]);
      const userId = userResponse.rows[0].id;

      // Generate a random address for each user
      const randomAddress = generateRandomAddress(userId);

      // Insert address for the user
      await client.query(addressQuery, [
        userId,
        randomAddress[1], // City
        randomAddress[2], // Country
        randomAddress[3], // Street
        randomAddress[4], // Pincode
      ]);

      // Generate random number of todos for each user
      // const numTodos = Math.floor(Math.random() * 10) + 1;
      // for (let j = 0; j < numTodos; j++) {
      //   const randomTodo = generateRandomTodo(userId);
      //   await client.query(todoQuery, randomTodo);
      // }
    }

    console.log(`Data inserted`);
  } catch (error: any) {
    console.log(error?.message);
  }
};

insertData();
