export type ApplicationType = {
  month: number,
  year: number,
  file?: File,
}

export type ApplicationTypeResponse = {
  id: number,
  studentId: number,
  studentName: string,
  monthOfRequest: number,
  yearOfRequest: number,
  status: string
}
