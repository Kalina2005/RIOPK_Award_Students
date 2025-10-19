import {SignupResponseType} from "./signup-response.type";
import {NotesResponseType} from "./notes-response.type";
import {AbsencesResponseType} from "./absences-response.type";

export type StudentResponseType = {
  absences: AbsencesResponseType[],
  notes: NotesResponseType[],
  student: SignupResponseType,
  attendanceStatus: string
}
