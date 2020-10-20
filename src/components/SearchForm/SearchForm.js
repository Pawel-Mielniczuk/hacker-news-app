import React from "react";
import Input from './Input/Input';


const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
    <form className='search-form' onSubmit={onSearchSubmit}>
      <Input
          id="search"
          value={searchTerm}
          isFocused
          onInputChange={onSearchInput}
      >
        <strong>Search:</strong>
      </Input>

      <button className='submit-button' type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
);

export default SearchForm;
