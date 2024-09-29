import { RecoilEnv, atom, selector } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const myBooksState = atom<BookListResponseAll>({
  key: "items",
  default: undefined,
});

export const MyBooks = selector({
  key: "itemsKey",
  get: async ({ get }) => {
    const state = get(myBooksState);
    if (state) {
      return state;
    } else {
      const res = await fetch("https://dev-app-api.abceed.com/mock/book/all");
      return res.json();
    }
  },
  set: ({ set }, newValue) => {
    set(myBooksState, newValue);
  },
});
