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
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
});

pacientesRouter.put("/:id", async (req, res) => {
  const id = req?.params?.id;

  try {
    const updatePaciente: Paciente = req.body as Paciente;
    const query = { _id: new ObjectId(id) };

    const result = await collections.pacientes?.updateOne(query, { set: updatePaciente });

    result
      ? res.status(200).send(`Successfully update patient with id ${id}`)
      : res.status(304).send(`Patient with id ${id} not update`);
  } catch (error: unknown) {
    let errorMessage = "Error: ";
    if(error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
});

pacientesRouter.delete("/:id", async (req, res) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.pacientes?.deleteOne(query);

    if(result && result.deletedCount) {
      res.status(202).send(`Successfully removed patient with id ${id}`);
    } else if(!result) {
      res.status(400).send(`Failed to remove patient with id ${id}`);
    } else if(!result.deletedCount) {
      res.status(404).send(`Patient with id ${id} does not exist`);
    }
  } catch (error: unknown) {
    let errorMessage = "Error: ";
    if(error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
});

export default pacientesRouter;
