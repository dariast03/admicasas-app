export interface IPayments {
  id?: string;
  idhousing?: string;
  iduser?: string;
  idcharge?: string;
  idcondominium?: string;
  date: Date;
  state: "Pendiente" | "Aprobado" | "Rechazado";
  urlimg: string;
  message?: string;
  date: Date;
}
