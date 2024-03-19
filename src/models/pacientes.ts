import { ObjectId } from "mongodb";

export default class Paciente {
  constructor(  public name: string,
                public dateOfBirth: string,
                public ssn: string,
                public gender: string,
                public occupation: string,
                public id?: ObjectId,
             ) {}
}
