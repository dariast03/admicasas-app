export interface IIncident {
  id?: string;
  idhousing: string;
  idcondominium?: string;
  description: string;
  date: Date;
  state: "Pendiente" | "Aprobado" | "Completado" | "Rechazado";
  urlimg: string;
  message: string;
}
