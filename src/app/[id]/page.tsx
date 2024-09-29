"use client";

import Link from "next/link";

import { useRecoilState } from "recoil";

import { MyBooks } from "@/app/components/atom";

export default function Article({ params }: { params: { id: string } }) {
  const [myBooks, setMyBooks] = useRecoilState<BookListResponseAll>(MyBooks);

  const onClickAddMyBooks = (): void => {
    const bookToAdd =
      myBooks && myBooks["top_category_list"]
        ? myBooks["top_category_list"]
            .filter((d: BookListResponse) => {
              return d["id_top_category"] === "_top";
            })
            .flatMap((d: BookListResponse) => d["sub_category_list"])
            .flatMap((d: BookList) => d["book_list"])
            .find((d: Book) => d["id_book"] === params.id) || ({} as Book)
        : ({} as Book);

    if (bookToAdd) {
      setMyBooks((prevBooks) => ({
        ...prevBooks,
        top_category_list: prevBooks.top_category_list.map((category) => {
          if (category.id_top_category === "_top") {
            return {
              ...category,
              sub_category_list: category.sub_category_list.map(
                (subCategory) => ({
                  ...subCategory,
                  book_list: subCategory.book_list.map((book) =>
                    book.id_book === params.id
                      ? { ...book, is_my_book: book.is_my_book ? false : true }
                      : book,
                  ),
                }),
              ),
            };
          }
          return category;
        }),
      }));
    }
  };

  const item: Book =
    myBooks && myBooks["top_category_list"]
      ? myBooks["top_category_list"]
          .filter((d: BookListResponse) => {
            return d["id_top_category"] === "_top";
          })
          .flatMap((d: BookListResponse) => d["sub_category_list"])
          .flatMap((d: BookList) => d["book_list"])
          .find((d: Book) => d["id_book"] === params.id) || ({} as Book)
      : ({} as Book);

  return (
    <div className="p-3">
      <Link href="/" className="ml-3">
        <span className="relative mr-6 inline-block h-[18px] w-2.5 align-text-top before:absolute before:left-0 before:top-[calc(50%_-_1px)] before:h-0.5 before:w-[13.3px] before:origin-[1px_50%] before:rotate-45 before:transform before:rounded-full before:bg-[#929292] before:content-[''] after:absolute after:left-0 after:top-[calc(50%_-_1px)] after:h-0.5 after:w-[13.3px] after:origin-[1px_50%] after:-rotate-45 after:transform after:rounded-full after:bg-[#929292] after:content-['']" />
        <span>書籍詳細</span>
      </Link>
      <section className="md:bg-[#fafafa] md:p-3">
        <div className="flex bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item["img_url"]}
            alt={item["name_book"]}
            className="w-[90px] max-w-[none] shadow-md"
          />
          <div className="ml-3">
            <h1 className="text-lg font-bold">{item["name_book"]}</h1>
            <dl className="mb-2">
              <dt className="mr-2 inline rounded-sm bg-[#f6f6f6] p-1 text-sm text-[#838383]">
                著者
              </dt>
              <dd className="inline text-[#838383]">{item["author"]}</dd>
            </dl>
            <dl className="mb-3">
              <dt className="mr-2 inline rounded-sm bg-[#f6f6f6] p-1 text-sm text-[#838383]">
                出版社
              </dt>
              <dd className="inline text-[#838383]">{item["publisher"]}</dd>
            </dl>
            <div className="flex gap-2">
              <button
                className={`grow rounded border border-[#fd223d] py-2 ${item["is_my_book"] ? "bg-[#fd223d] text-white" : "text-[#fd223d]"}`}
                onClick={onClickAddMyBooks}
              >
                {item["is_my_book"] ? "MyBooks削除" : "MyBooks追加"}
              </button>
              <button
                className={`grow rounded border border-[#fd223d] py-2 ${item["is_unlimited"] ? "bg-[#fd223d] text-white" : "text-[#fd223d]"}`}
              >
                読み放題中
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
