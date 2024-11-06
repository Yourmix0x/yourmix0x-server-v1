// import necessary modules
import express from "express";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import { envConfig } from "./config/envConfig";

// initialize environment variables
configDotenv();

// create Express app instance
const app = express();

// Apply JSON middleware to parse incoming requests
app.use(express.json());

// Use morgan middleware for logging requests in development mode
app.use(morgan("dev"));

// defining the routes

// home route
app.get("/", (req, res) =>
  res.status(200).json({
    message: "up and active 😎",
    author: "yourmixjnr",
    description:
      "software engineer with 3+ years of experience blessed by hard work and driven by passion!",
    portfolio: "https://yourmixjnr.vercel.app/",
  })
);

// set up server port from environment config or default to 8000
const port = envConfig.PORT || 8000;

// start server and log the port it's running on
app.listen(port, () => console.log(`Server is running on port ${port}`));
