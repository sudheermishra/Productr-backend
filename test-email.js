import { config } from "dotenv";
import { sendOtpEmail } from "./src/services/email.service.js";

config(); // Load .env file

async function test() {
  console.log("Testing Brevo email...");
  const result = await sendOtpEmail("g37978297@gmail.com", "123456");
  console.log("Result:", result);
}

test();
