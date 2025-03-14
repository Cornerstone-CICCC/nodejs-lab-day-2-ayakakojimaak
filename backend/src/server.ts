import express from "express";
import cookiesSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
dotenv.config();

const app = express();

// Middleware
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;

if (!SIGN_KEY || !ENCRYPT_KEY) {
  throw new Error("COOKIE_SIGN_KEY or COOKIE_ENCRYPT_KEY is not set");
}

app.use(
  cookiesSession({
    name: "session",
    keys: [SIGN_KEY, ENCRYPT_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(
  cors({
    origin: "http://localhost:4321", // Astro port
    credentials: true, // allow cookies
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
