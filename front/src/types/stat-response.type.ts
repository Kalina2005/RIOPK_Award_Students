import {AbsencesResponseType} from "./absences-response.type";

export type StatResponseType = {
  absences: AbsencesResponseType[],
  absencesDisrespectful: number,
  absencesRespectful: number,
  message: string
}
