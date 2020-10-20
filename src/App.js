import React from 'react';
import List from './components/List/List';
import SearchForm from "./components/SearchForm/SearchForm";

import { useStateFromLocalStorage } from "./customHooks";


export const newsReducer = (state, action) => {
  switch (action.type) {
    case 'NEWS_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'NEWS_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'NEWS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_NEWS':
      return {
        ...state,
        data: state.data.filter(
            news => action.payload.objectID !== news.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [searchTerm, setSearchTerm] = useStateFromLocalStorage(
      'search',
      'React'
  );

  const [url, setUrl] = React.useState(
      `${API_ENDPOINT}${searchTerm}`
  );

  const [news, dispatchNews] = React.useReducer(
      newsReducer,
      { data: [], isLoading: false, isError: false }
  );

  const handleFetchNews = React.useCallback(() => {
    if (!searchTerm) return;

    dispatchNews({ type: 'NEWS_FETCH_INIT' });

    fetch(url)
        .then(response => response.json())
        .then(result => {
          dispatchNews({
            type: 'NEWS_FETCH_SUCCESS',
            payload: result.hits,
          });
        })
        .catch(() =>
            dispatchNews({ type: 'NEWS_FETCH_FAILURE' })
        );
  }, [url]);

  React.useEffect(() => {
    handleFetchNews();
  }, [handleFetchNews]);

  const handleRemoveNews = item => {
    dispatchNews({
      type: 'REMOVE_NEWS',
      payload: item,
    });
  };

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  };


  return (
      <div className='app-container'>
        <h1 className='container-heading'>My Hacker News</h1>
        <SearchForm
            searchTerm={searchTerm}
            onSearchInput={handleSearchInput}
            onSearchSubmit={handleSearchSubmit}
        />

        <hr />

        {news.isError && <p>Something went wrong ...</p>}

        {news.isLoading ? (
            <p>Loading...</p>
        ) : (
            <List
                list={news.data}
                onRemoveItem={handleRemoveNews}
            />
        )}
      </div>
  );
};


export default App;
