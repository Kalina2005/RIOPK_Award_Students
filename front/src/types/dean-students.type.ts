import {SignupResponseType} from "./signup-response.type";

export type DeanStudentsType = {
  id: string,
  name: string,
  gpa: number,
  absencesHours: number,
  hasRetakes: boolean,
  bonusAmount: number,
  stipendType: string,
  hasStipend: boolean,
  isBrsmMember: boolean,
  isProfkomMember: boolean,
  student?: SignupResponseType,
}
