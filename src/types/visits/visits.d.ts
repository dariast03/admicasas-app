import { IHousing } from "../housing/housing";

export interface IVisit {
  id?: string;
  name: string;
  document: string;
  observation: string;
  idcondominium: string;
  idpropietary: string;
  idhousing: string;
  housing?: IHousing;
  datevisit: Date;
}
