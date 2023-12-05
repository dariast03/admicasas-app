export interface IResponseLogin {
  status: number;
  token: string;
  usuario: IUser;
}

export interface IAccount {
  name: string;
  rol: string;
  urlimg: string;
  state: boolean;
  idcondominium: string;
  idcompany: string;
  condominiums: [];
}
export interface IUser {
  id: string;
  displayName: string;
  email: string;
  account: IAccount;
}

export interface IFormLogin {
  email: string;
  password: string;
  rememberEmail: boolean;
}

export interface IUserAccount {
  id: string;
  email: string;
  name: string;
  rol: string;
  urlimg: string;
  state: boolean;
  idcondominium: string;
  idcompany: string;
  condominiums: [];
}
