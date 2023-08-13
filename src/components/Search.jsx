import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="find a user" />
      </div>
      <div className="userChat">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWdFvAJ02wiw21cGrx2QIpj3VD-bi6E5l5Q&usqp=CAU"
          alt=""
        />
        <div className="userChatInfo">
          <span>mona</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
