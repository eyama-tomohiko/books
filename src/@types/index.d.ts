type Book = {
  id_book: string;
  name_book: string;
  publisher: string;
  author: string;
  img_url: string;
};

type BookList = {
  id_category: string;
  name_category: string;
  book_list: Book[];
};

type BookListResponse = {
  id_top_category: string;
  name_category: string;
  sub_category_list: BookList[];
};

type BookListResponseAll = {
  top_category_list: BookListResponse[];
};
