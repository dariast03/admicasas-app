import { IArea } from "../common-area/common-area";
import { IUserAccount } from "../user";

export interface IReservation {
  id?: string;
  idcondominium: string;
  idarea: string;
  area?: IArea;
  start: Date;
  end: Date;
  fullDay: boolean;
  idusuario: string;
  reservedBy?: IUserAccount;
  title: string;
  color: string;
  state: IStatusReservation;
  end: Date;
  startDetail: IDetailDate;
  endDetail: IDetailDate;
  urlPayment: string;
  filename: string;
  idhousing?: string;
  type: "web" | "app";
  message: string;
  areaName: string;
}

export interface IDetailDate {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface IStatusReservation2 {
  id: number;
  name: "Rechazado" | "Aprobado" | "Pendiente" | "PorPagar";
}

type IStatusReservation =
  | "Rechazado"
  | "Aprobado"
  | "Pendiente"
  | "Finalizado"
  | "PorPagar";
