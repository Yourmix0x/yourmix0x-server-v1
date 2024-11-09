import { configDotenv } from "dotenv";
configDotenv();

export const PORT = process.env.PORT;
export const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;

export const envConfig = {
  PORT,
  EMAIL_RECIPIENT,
};
