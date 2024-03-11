import express from "express";
import indexRouter from "./src/router/indexRouter";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.send("Llevate este paquete para Mendoza");
});

app.use("/api/diagnoses", indexRouter);

app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
