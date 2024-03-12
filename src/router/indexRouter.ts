import express from "express";
import indexService from "../services/indexServices";
import verificacionNuevoPaciente from "../../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(indexService.getPacientes());
});

router.get("/:id", (req, res) => {
  const paciente = indexService.obtenerPaciente(req.params.id);

  if(paciente) {
    res.send(paciente);
  } else{
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const pacienteNuevo = verificacionNuevoPaciente(req.body);

    const agregarPacienteNuevo = indexService.nuevoPaciente(pacienteNuevo);
    res.json(agregarPacienteNuevo);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if(error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;
