import React, { ChangeEvent } from "react";
import SearchIcon from "../icons/SearchIcon";
import S from "./SearchBar.module.scss";

interface Props {
  inputText: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ inputText, handleChange }: Props) => {
  return (
    <div className={S.search_bar_box}>
      <div className={S.inner_box}>
        <SearchIcon />
        <input
          className={S.search_bar_input}
          type="text"
          placeholder="지역이나 가게 이름을 입력해보세요"
          value={inputText}
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
