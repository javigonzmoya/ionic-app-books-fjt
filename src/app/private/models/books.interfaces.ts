export interface BooksResponse {
  ok: boolean;
  books: Book[];
}

export interface Book {
  title: string;
  start: string;
  end: string;
  notes: string;
  room: string;
  destinatario: string;
  user: string;
  id: string;
}
