"use client";
import { MyBooks } from "@/app/components/atom";
import { useRecoilValue } from "recoil";

export default function List() {
  return <BooksList />;

  function BooksList() {
    const myBooks: BookListResponseAll = useRecoilValue(MyBooks);
    const list: BookListResponse[] =
      myBooks && myBooks["top_category_list"]
        ? myBooks["top_category_list"].filter((d: BookListResponse) => {
            return d["id_top_category"] === "_top";
          })
        : [];

    return (
      <>
        {list.map((data) => {
          return data["sub_category_list"].map((subCategorylistData) => (
            <>
              <h1 className="text-xl font-bold py-3">
                {subCategorylistData["name_category"]}
              </h1>
              <div className="flex overflow-x-scroll">
                <Books books={subCategorylistData["book_list"]} />
              </div>
            </>
          ));
        })}
      </>
    );
  }

  function Books({ books }: { books: Book[] }) {
    return (
      <>
        {books.map((data) => {
          return (
            <div key={data["id_book"]} className="mr-3 pb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data["img_url"]}
                alt={data["name_book"]}
                className="w-[90px] max-w-[none] shadow-md"
              />
            </div>
          );
        })}
      </>
    );
  }
}
