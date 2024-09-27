import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/db.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 6001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB error", err);
  });
