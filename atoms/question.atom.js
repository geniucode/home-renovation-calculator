import { atom } from "recoil";

export const questionState = atom({
  key: "questionState", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});
