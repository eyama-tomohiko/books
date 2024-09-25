"use client";
import { useState } from "react";
import { RecoilRoot, atom, useRecoilValue } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <BooksList />
    </RecoilRoot>
  );

  function BooksList() {
    const [data, setData] = useState<BookListResponseAll | undefined>(
      undefined
    );
    const fetchBooks = async (): Promise<BookListResponseAll> => {
      const res = await fetch("https://dev-app-api.abceed.com/mock/book/all");
      return res.json();
    };
    fetchBooks().then((val) => setData(val));
    const myBooksState = atom<BookListResponseAll>({
      key: "items",
      default: data,
    });
    const myBooks = useRecoilValue(myBooksState);
    const list: BookListResponse[] =
      myBooks && myBooks["top_category_list"]
        ? myBooks["top_category_list"].filter((d) => {
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
