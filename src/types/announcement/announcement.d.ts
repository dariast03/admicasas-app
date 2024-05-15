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
  idhousings: { idcharge: string; idhousing: string }[];
  title: string;
  type: string;
  idcharge?: string;
  idmeeting?: string;
  charge?: ICharge;
}
