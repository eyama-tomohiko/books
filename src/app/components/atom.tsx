import { RecoilEnv, atom, selector } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const myBooksState = atom<BookListResponseAll>({
  key: "items",
  default: undefined,
});

export const MyBooks = selector({
  key: "items",
  get: async () => {
    const res = await fetch("https://dev-app-api.abceed.com/mock/book/all");
    return res.json();
  },
});
