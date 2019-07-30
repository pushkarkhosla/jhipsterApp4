export interface IBookEntity {
  id?: number;
  name?: string;
  publisher?: string;
  publishedDate?: string;
  author?: string;
  price?: number;
}

export class BookEntity implements IBookEntity {
  constructor(
    public id?: number,
    public name?: string,
    public publisher?: string,
    public publishedDate?: string,
    public author?: string,
    public price?: number
  ) {}
}
