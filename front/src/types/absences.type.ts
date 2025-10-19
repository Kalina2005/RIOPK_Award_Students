import {ReasonTypeType} from "./reason-type.type";

export type AbsencesType = {
  userId: string,
  date: string,
  count: number,
  reason: ReasonTypeType,
}
