import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterInput, setFilterInput] = useState('');

  function onSearchChange(event) {
    setFilterInput(event.target.value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onItemFormSubmit(newItem) {
    return setItems([...items, newItem])
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All" && filterInput === '') {
      return true;
    } else if (selectedCategory !== 'All' && filterInput === '') {
      return item.category === selectedCategory;
    } else if (selectedCategory === 'All' && filterInput !== '') {
      return item.name.includes(filterInput);
    } else {
      return item.category === selectedCategory && item.name.includes(filterInput);
    }
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={onSearchChange} search={filterInput}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;