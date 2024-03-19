import express from "express";
import * as dotenv from "dotenv";
import { connectToDatabase } from "./src/services/database.services";
import pacientesRouter from "./src/router/pacientesRouter";

const app = express();
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 7000;

connectToDatabase()
  .then(() => {
    app.use("/api/pacientes", pacientesRouter);

    app.listen(port, () => {
      console.log(`Server running in port: ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
