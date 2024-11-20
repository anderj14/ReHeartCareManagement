export interface Note {
  id: number
  title: string
  content: string
  date: string
  noteStatus: string
}
export interface NoteStatus {
  id: number,
  noteStatusName: string;
}

export interface NoteParams {
  sort: string;
  search?: string;
  pageIndex: number;
  pageSize: number;
  notestatusId: number;
}