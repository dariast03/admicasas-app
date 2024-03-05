export interface INotification {
  id: string;
  body: string;
  title: string;
  date: Date;
  to?: string;
  idcondominums: string[];
  iduser: string;
}
