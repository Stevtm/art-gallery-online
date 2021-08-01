import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <form action="/" method="get">
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="search"
        placeholder="Search Art"
        name="s"
      />
    </form>
  );
};

export default SearchBar;
