import React from "react";


const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  };

  return (
      <div className='item'>
      <span>
         <a data-testid='titleLink' target='_blank' rel="noopener noreferrer" href={item.url}>{item.title}</a>
      </span>
        <span>author:{item.author}</span>
        <span>num_comments:{item.num_comments}</span>
        <span>points:{item.points}</span>
        <span>
        <button className='remove-button' type="button" onClick={handleRemoveItem}>
          RemoveItem
        </button>
      </span>
      </div>
  );
};

export default Item;
