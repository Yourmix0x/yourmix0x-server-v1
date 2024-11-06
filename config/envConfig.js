import { configDotenv } from "dotenv";
configDotenv();

export const PORT = process.env.PORT;

export const envConfig = {
  PORT,
};
