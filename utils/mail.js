import nodeMailer from "nodemailer";

const host = process.env.GMAIL_HOST;
const port = process.env.GMAIL_PORT;

const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_PASSWORD;

const transporter = nodeMailer.createTransport({
  host,
  port,
  secure: true,
  auth: {
    user,
    pass,
  },
});

export async function sendMail(options) {
  const mailOptions = {
    from: "yourmix0x-portfolio-v1",
    to: options.recipient,
    subject: options.subject,
    html: options.htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
