import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchForm = () => {
  return (
    <form>
      <button>
        <BsSearch />
      </button>
      <input type="text" />
    </form>
  );
};

export default SearchForm;
