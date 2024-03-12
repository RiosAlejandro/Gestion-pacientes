import pacientes from "../data/pacientes.json";
import { PacientesInterface, pacientesSinSsn, pacienteNuevo } from "../../types";

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

const obtenerPaciente = (id: string): pacientesSinSsn | undefined => {
  const paciente = pacientesData.find(p => p.id === id);
  /*if(paciente) {
    return paciente.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }));
  } else {
    return undefined;
  }*/

  return paciente;
  /*
  * FILTRAR PARA QUE NO SE VEA EL CAMPO SSN
  */

};

const nuevoPaciente = (paciente: pacienteNuevo): PacientesInterface => {
  const nuevoPaciente = {
    id: "",/***AGREGAR ID CON UUID */
    ...paciente,
  };
  pacientesData.push(nuevoPaciente);
  return nuevoPaciente;
};

export default {
  getPacientes,
  obtenerPaciente,
  nuevoPaciente,
};
