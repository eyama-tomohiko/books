"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";

import IconStudyMarksheet from "@/app/assets/icon_study_marksheet.svg";
import IconStudyMarksheetDark from "@/app/assets/icon_study_marksheet_dark.svg";
import IconStudyQuiz from "@/app/assets/icon_study_quiz.svg";
import IconStudyQuizDark from "@/app/assets/icon_study_quiz_dark.svg";
import IconStudyRecord from "@/app/assets/icon_study_record.svg";
import IconStudyRecordDark from "@/app/assets/icon_study_record_dark.svg";
import IconStudySound from "@/app/assets/icon_study_sound.svg";
import IconStudySoundDark from "@/app/assets/icon_study_sound_dark.svg";
import IconStudySW from "@/app/assets/icon_study_sw.svg";
import IconStudySWDark from "@/app/assets/icon_study_sw_dark.svg";
import IconStudyTest from "@/app/assets/icon_study_test.svg";
import IconStudyTestDark from "@/app/assets/icon_study_test_dark.svg";
import IconStudyVocab from "@/app/assets/icon_study_vocab.svg";
import IconStudyVocabDark from "@/app/assets/icon_study_vocab_dark.svg";
import { MyBooks } from "@/app/components/atom";
import { StudyButton } from "@/app/components/study-button";

export default function Article({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const [myBooks, setMyBooks] = useRecoilState<BookListResponseAll>(MyBooks);

  const findBook = (): Book => {
    const book =
      myBooks && myBooks["top_category_list"]
        ? myBooks["top_category_list"]
            .filter((d: BookListResponse) => {
              return d["id_top_category"] === "_top";
            })
            .flatMap((d: BookListResponse) => d["sub_category_list"])
            .flatMap((d: BookList) => d["book_list"])
            .find((d: Book) => d["id_book"] === params.id) || ({} as Book)
        : ({} as Book);
    return book;
  };

  const onClickAddMyBooks = (): void => {
    const bookToAdd = findBook();
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

  const item = findBook();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();

    if (ua.indexOf("windows nt") !== -1) {
      setDarkMode(true);
    }
  }, []);

  return (
    <div className={`h-[100vh] py-3 ${darkMode ? "bg-[#212121]" : ""}`}>
      <Link href="/" className="mb-3 ml-3 block">
        <span
          className={`relative mr-6 inline-block h-[18px] w-2.5 align-text-top before:absolute before:left-0 before:top-[calc(50%_-_1px)] before:h-0.5 before:w-[13.3px] before:origin-[1px_50%] before:rotate-45 before:transform before:rounded-full before:content-[''] after:absolute after:left-0 after:top-[calc(50%_-_1px)] after:h-0.5 after:w-[13.3px] after:origin-[1px_50%] after:-rotate-45 after:transform after:rounded-full after:content-[''] ${darkMode ? "before:bg-[#fefefe] after:bg-[#fefefe]" : "before:bg-[#929292] after:bg-[#929292]"}`}
        />
        <span className={darkMode ? "text-[#fefefe]" : "text-[#242424]"}>
          書籍詳細
        </span>
      </Link>
      <section
        className={`flex flex-wrap justify-center md:w-full md:flex-nowrap ${darkMode ? "bg-[#3b3b3b]" : "bg-[#fafafa]"}`}
      >
        <div
          className={`rounded-[5px mr-[4.75px] flex w-full items-start justify-center p-3 md:my-[9.32px] md:w-[450px] ${darkMode ? "bg-[#212121]" : "bg-[#ffffff]"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item["img_url"]}
            alt={item["name_book"]}
            className="max-w-[none] shadow-md"
            width={90}
          />
          <div className="ml-3">
            <h1
              className={`text-lg font-bold ${darkMode ? "text-[#fefefe]" : "text-[#242424]"}`}
            >
              {item["name_book"]}
            </h1>
            <dl className="mb-2">
              <dt
                className={`mr-2 inline rounded-sm p-1 text-sm ${darkMode ? "bg-[#f3f3f3] text-[#a0a0a0]" : "bg-[#d4d4d4] text-[#4f4f4f]"}`}
              >
                著者
              </dt>
              <dd
                className={`inline ${darkMode ? "text-[#a0a0a0]" : "text-[#4f4f4f]"}`}
              >
                {item["author"]}
              </dd>
            </dl>
            <dl className="mb-3">
              <dt
                className={`mr-2 inline rounded-sm p-1 text-sm ${darkMode ? "bg-[#f3f3f3] text-[#a0a0a0]" : "bg-[#d4d4d4] text-[#4f4f4f]"}`}
              >
                出版社
              </dt>
              <dd
                className={`inline ${darkMode ? "text-[#a0a0a0]" : "text-[#4f4f4f]"}`}
              >
                {item["publisher"]}
              </dd>
            </dl>
            <div className="flex gap-2">
              <button
                className={`grow rounded border border-[#fd223d] py-2 leading-none ${item["is_my_book"] ? "bg-[#fd223d] text-white" : "text-[#fd223d]"}`}
                onClick={onClickAddMyBooks}
              >
                {item["is_my_book"] ? "MyBooks削除" : "MyBooks追加"}
              </button>
              <button
                className={`grow rounded border border-[#fd223d] py-2 leading-none ${item["is_unlimited"] ? "bg-[#fd223d] text-white" : "text-[#fd223d]"}`}
              >
                読み放題中
              </button>
            </div>
          </div>
        </div>
        <div
          className={`flex w-full justify-center md:w-auto ${darkMode ? "bg-[#3b3b3b]" : "bg-[#fafafa]"}`}
        >
          <div className="my-[9.32px] flex w-[313.25px] flex-wrap self-start">
            {[
              {
                src: IconStudyQuiz.src,
                srcDark: IconStudyQuizDark.src,
                title: "アプリ学習",
              },
              {
                src: IconStudyTest.src,
                srcDark: IconStudyTestDark.src,
                title: "テスト",
              },
              {
                src: IconStudySound.src,
                srcDark: IconStudySoundDark.src,
                title: "音声（無料）",
              },
              {
                src: IconStudySW.src,
                srcDark: IconStudySWDark.src,
                title: "SWトレ",
              },
              {
                src: IconStudyVocab.src,
                srcDark: IconStudyVocabDark.src,
                title: "単語一覧",
              },
              {
                src: IconStudyMarksheet.src,
                srcDark: IconStudyMarksheetDark.src,
                title: "マークシート",
              },
              {
                src: IconStudyRecord.src,
                srcDark: IconStudyRecordDark.src,
                title: "学習記録",
              },
            ].map(({ src, srcDark, title }) => (
              <StudyButton
                key={title}
                src={src}
                srcDark={srcDark}
                title={title}
                isDarkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
