import {ReasonTypeType} from "./reason-type.type";

export type AbsencesResponseType = {
  id?: string,
  studentId: string,
  date: string,
  studentName: string,
  subjectName: string,
  studentSubject: string,
  count: number,
  reason: ReasonTypeType,
  groupName: string,

  reasonRus?: string,
}
