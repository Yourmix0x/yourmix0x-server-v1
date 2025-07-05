// Import necessary modules
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { configDotenv } from "dotenv";

// Import environment and utility configurations
import { envConfig } from "./config/envConfig";
import { sendMail } from "./utils/mail";

// Initialize environment variables from .env file
configDotenv();

// Create an instance of the Express app
const app = express();

// Enable CORS for all origins (for cross-origin requests)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use Morgan for logging HTTP requests in development mode
app.use(morgan("dev"));

// Define the main application routes
// Home route to confirm server is running
app.get("/", (req, res) =>
  res.status(200).json({
    message: "up and active 😎",
    author: "yourmix0x",
    description:
      "software engineer with 3+ years of experience blessed by hard work and driven by passion!",
    portfolio: "https://yourmixjnr.tech/",
  })
);

// Contact form endpoint for sending emails
app.post("/api/v1/submit", async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, subject, message } = req.body;
    
    // Validate that all fields are provided
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Bad request",
        error: "All fields are required",
      });
    }

    // Send email using Nodemailer
    await sendMail({
      recipient: envConfig.EMAIL_RECIPIENT,  // Set recipient from environment config
      subject: subject,
      htmlContent: `
        <h3>Hello Yourmix0x, You've got a message from ${name}</h3>
        <p>Below is the message:</p><br />
        <p>${message}</p>
        <br />
        <p>Reach out back to ${name} via email: ${email}</p>
      `,
    });

    // Return a success response to the user
    return res.status(200).json({
      status: "success",
      message:
        "Thanks, your message has been successfully sent. I will get back to you shortly. Stay Safe",
    });
  } catch (err) {
    // Handle server errors gracefully
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Define the server port from environment config or default to 8000
const port = envConfig.PORT || 8000;

// Start the server and log the port it's running on
app.listen(port, () => console.log(`Server is running on port ${port}`));
