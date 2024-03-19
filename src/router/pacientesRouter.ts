/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.services";
import Paciente from "../models/pacientes";

const pacientesRouter = express.Router();

pacientesRouter.get("/", async (_req, res) => {
  try {
    const pacientes = (await collections.pacientes?.find({}).toArray()) as unknown as Paciente[];

    res.status(200).send(pacientes);
  } catch (error: unknown) {
    let errorMessage = "Error: ";
    if(error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(500).send(errorMessage);
  }
});

pacientesRouter.get("/:id", async (req, res) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const paciente = (await collections.pacientes?.findOne(query)) as unknown as Paciente;

    if(paciente) {
      res.status(200).send(paciente);
    }
  } catch (error: unknown) {
    let errorMessage = "Error: ";
    if(error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
    res.status(404).send(`Unable to find maching document with id: ${req.params.id}`);
  }
  
});

pacientesRouter.post("/", async (req, res) => {
  try {
    const newPaciente = req.body as Paciente;
    const result = await collections.pacientes?.insertOne(newPaciente);

    result
      ? res.status(201).send(`Successfully created a new patient with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new patient");
  } catch (error: unknown) {
    let errorMessage = "Error: ";
    if(error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});



export default pacientesRouter;
