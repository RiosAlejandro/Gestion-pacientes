export interface PacientesInterface {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export interface DiagnosticosInterface {
  code: string;
  name: string;
  latin?: string;
}

export type pacientesSinSsn = Omit<PacientesInterface, "ssn">;
