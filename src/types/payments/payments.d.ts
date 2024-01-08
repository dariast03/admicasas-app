export interface IPayments {
  id?: string;
  idhousing?: string;
  iduser?: string;
  idcharge?: string;
  date: Date;
  state: "Pendiente" | "Aprobado" | "Rechazado";
  urlimg: string;
}
