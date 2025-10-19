import {AbsencesResponseType} from "./absences-response.type";

export type SubjectResponseType = {
  id: string,
  groupId: string,
  groupName: string,
  name: string,
  absences?: AbsencesResponseType[]
}
