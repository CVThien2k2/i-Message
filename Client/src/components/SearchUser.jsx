import React from "react";
import { Search } from "react-bootstrap-icons";

const SearchUser = () => {
  return (
    <div className="searchUser">
      <div className="searchForm">
        <Search color="gray" size={20} />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default SearchUser;
