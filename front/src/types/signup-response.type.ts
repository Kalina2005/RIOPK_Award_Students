import {RoleTypeType} from "./role-type.type";

export type SignupResponseType = {
  id: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  enabled: boolean,
  roles?: RoleTypeType,
  token?: string,

  rolesTypeRus?: string
}
