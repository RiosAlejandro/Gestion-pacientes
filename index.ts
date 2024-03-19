import express from "express";
import * as dotenv from "dotenv";
import pacientesRouter from "./src/router/pacientesRouter";

const app = express();
app.use(express.json());
dotenv.config();

const port = 3000;

app.get("/", (_req, res) => {
  res.send("Llevate este paquete para Mendoza");
});

app.use("/api/pacientes", pacientesRouter);

app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
