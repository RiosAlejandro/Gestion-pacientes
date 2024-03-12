import { pacienteNuevo } from "./types";

const parseString= (name: unknown): string => {
  if(!name || !isString(name)) {
    throw new Error("Incorrecto");
  }
  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const verificacionNuevoPaciente = (object: unknown): pacienteNuevo => {
  if(!object || typeof object !== "object") {
    throw new Error("Incorrecto");
  }

  if("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
    const paciente: pacienteNuevo = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: "",/***hacer validacion para gender */
      occupation: parseString(object.occupation),
    };
    return paciente;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default verificacionNuevoPaciente;
