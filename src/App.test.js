import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import Item from './components/List/Item/Item'
import { newsReducer } from "./App";

const newsOne = {
  title: 'Angular',
  url: 'https://angular.io/',
  author: 'Todd Motto',
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const newsTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov',
  num_comments: 33,
  points: 3,
  objectID: 1,
};

const allNews = [newsOne, newsTwo];

describe('storiesReducer', () => {
  test('removes news from all news', () => {
    const action = { type: 'REMOVE_NEWS', payload: newsOne };
    const state = { data: allNews, isLoading: false, isError: false };

    const newState = newsReducer(state, action);

    const expectedState = {
      data: [newsTwo],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});



//test 2
describe('Item component', () => {

  const onRemoveItemMock = jest.fn();
  const item = {
    title: 'Redux',
    url: 'http://test.pl',
    author: 'John Doe'
  };

  const renderItemComponent = (itemProps, onRemoveMethod = onRemoveItemMock ) => {
    return render(<Item item={itemProps} onRemoveItem={onRemoveMethod}/>);
  };


  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it('should render title as a link when url is on item obj', () => {
    const wrapper = renderItemComponent(item);
    const titleLink = wrapper.getByTestId('titleLink');

  });

  it('should execute onRemoveItem on btn click', () => {

    const wrapper = renderItemComponent(item);
    const removeBtn = wrapper.getByText('RemoveItem');
    fireEvent.click(removeBtn);
    expect(onRemoveItemMock).toHaveBeenCalledWith(item);
    expect(onRemoveItemMock).toHaveBeenCalledTimes(1);
  });
});

describe('Item', () => {
  test('renders all properties', () => {
    render(<Item item={newsOne} />);
  });

  test('renders a remove button', () => {
    render(<Item item={newsOne} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

