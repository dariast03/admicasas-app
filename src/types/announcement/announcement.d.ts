import { ICondominium } from "../condominium/condominium";

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
}
