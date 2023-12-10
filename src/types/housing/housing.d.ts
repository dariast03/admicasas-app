import { IUserAccount } from "../user";

export interface IResident {
  name: string;
  urlimg: string;
}
export interface IHousing {
  id?: string;
  code: string;
  description: string;
  state: boolean;
  urlimg: string;
  idcondominium: string;
  residents: IResident[];
  idproprietary?: string;
  proprietary?: IUserAccount;
}
