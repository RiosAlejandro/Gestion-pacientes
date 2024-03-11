import pacientes from "../data/pacientes.json";
import { PacientesInterface, pacientesSinSsn } from "../../types";

const pacientesData: PacientesInterface[] = pacientes as PacientesInterface[];

const getPacientes = (): pacientesSinSsn[] => {
  return pacientesData.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
  }));
};

export default {
  getPacientes,
};
