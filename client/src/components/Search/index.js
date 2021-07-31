import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../../utils/queries';
import { useHistory } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const history = useHistory();
  const onSubmit = (e) => {
    history.push(`?s=${searchQuery}`);
    e.preventDefault();
    return (
      <form
        action="/"
        method="get"
        autoComplete="off"
      ></form>
    );
  };

  return (
    <form action="/" method="get">
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="search"
        placeholder="search art"
        name="s"
      />
    </form>
  );
};

export default SearchBar;
