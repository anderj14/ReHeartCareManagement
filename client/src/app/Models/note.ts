export interface Note {
  id: number
  title: string
  content: string
  date: string
}

export interface NoteParams {
  sort: string;
  search?: string;
  pageIndex: number;
  pageSize: number;
}