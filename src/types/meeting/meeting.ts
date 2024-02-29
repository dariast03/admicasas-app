export interface IMeeting {
  id?: string;
  name: string;
  description: string;
  date: Date;
  type: string;
  state: boolean;
  idcondominium: string;
  topics: ITopic[];
  notes: INote[];
  urlAct: string;
  filename: string;
  isPublished: boolean;
}
export interface ITopic {
  name: string;
}
export interface INote {
  text: string;
}
