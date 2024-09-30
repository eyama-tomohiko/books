"use client";

import Link from "next/link";

import { useRecoilValue } from "recoil";

import { MyBooks } from "@/app/components/atom";

export default function List(): JSX.Element {
  const myBooks: BookListResponseAll = useRecoilValue(MyBooks);
  const list: BookListResponse[] =
    myBooks && myBooks["top_category_list"]
      ? myBooks["top_category_list"].filter((d: BookListResponse) => {
          return d["id_top_category"] === "_top";
        })
      : [];

  return (
    <div className="p-3">
      {list.map((data) => {
        return data["sub_category_list"].map((subCategorylistData) => (
          <>
            <h1 className="py-3 text-lg font-bold">
              {subCategorylistData["name_category"]}
            </h1>
            <div className="flex overflow-x-scroll">
              <Books books={subCategorylistData["book_list"]} />
            </div>
          </>
        ));
      })}
    </div>
  );

  function Books({ books }: { books: Book[] }): JSX.Element {
    return (
      <>
        {books.map((data) => {
          return (
            <Link
              href={`/${data["id_book"]}`}
              key={data["id_book"]}
              className="mr-3 pb-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data["img_url"]}
                alt={data["name_book"]}
                className="w-[90px] max-w-[none] shadow-md"
              />
            </Link>
          );
        })}
      </>
    );
  }
}
