export interface BooksResponse {
  ok: boolean;
  books: Book[];
}
export interface BookResponse {
  ok: boolean;
  book: Book;
  msg: string;
}

export interface Book {
  title: string;
  start: Date;
  end: Date;
  notes?: string;
  room: string;
  destinatario?: string;
  user?: string;
  id?: string;
}
