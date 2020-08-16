export interface IBook {
  id: string;
  title: string;
  description: string;
  by: string;
  genre: string
  cover: string;
  publishedAt: Date;
}

export interface IBookPage {
  bookId: string;
  pageNumber: number;
  content: string;
}
