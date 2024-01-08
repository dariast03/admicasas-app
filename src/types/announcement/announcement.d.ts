import { ICharge } from "../charges/charges";
import { ICondominium } from "../condominium/condominium";
import { IPayments } from "../payments/payments";

interface IAnnouncement {
  id?: string;
  description: string;
  start: Date;
  end: Date;
  state: boolean;
  urlimg: string;
  idcondominiums: string[];
  condominiums?: ICondominium[];
  idhousings: string[];
  title: string;
  type: string;
  idcharge?: string;

  charge?: ICharge;
}
