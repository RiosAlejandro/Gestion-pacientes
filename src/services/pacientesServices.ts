import pacientes from "../data/pacientes.json";
import { PacientesInterface, pacientesSinSsn, pacienteNuevoInterface } from "../../types";

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

const nuevoPaciente = (paciente: pacienteNuevoInterface): PacientesInterface => {
  const crearPaciente = {
    id: "",/***AGREGAR ID CON UUID */
    ...paciente,
  };
  pacientesData.push(crearPaciente);
  return crearPaciente;
};

/*const actualizarPaciente = (id: string, nuevoPaciente: pacienteNuevoInterface): pacienteNuevoInterface | undefined  => {
  const paciente = pacientesData.find((p) => p.id === id);

    if(paciente) {
    paciente.name = nuevoPaciente.name || paciente.name;
    paciente.dateOfBirth = nuevoPaciente.dateOfBirth || paciente.dateOfBirth;
    paciente.gender = nuevoPaciente.gender || paciente.gender;
    paciente.occupation = nuevoPaciente.occupation || paciente.occupation;
    paciente.ssn = nuevoPaciente.ssn || paciente.ssn;

    return paciente;
    }
};

/*const eliminarPaciente = (id: string): void => {
  const paciente = pacientesData.find((p) => p.id === id);

  /*if(paciente === -1) {
    console.log("Paciente not found");
  } else {
    //pacientesData.splice(paciente, 1);
    console.log("eliminado");
  }
  console.log(paciente);
};*/

export default {
  getPacientes,
  obtenerPaciente,
  nuevoPaciente,
  //actualizarPaciente,
  //eliminarPaciente,
};
