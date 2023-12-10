export interface IIncident {
  id?: string;
  idhousing: string;
  description: string;
  date: Date;
  state: "Pendiente" | "En proceso" | "Resuelto" | "Rechazado";
  urlimg: string;
}
