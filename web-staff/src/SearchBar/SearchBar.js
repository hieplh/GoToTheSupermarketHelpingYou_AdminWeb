import React, { useState, useEffect } from "react";

var searchFound = false;
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [food, setFood] = useState([]);
  const [query, setQuery] = useState("");
  const APP_ID = "f999c87b";
  const APP_KEY = "134ea38fd8d2b73edeabdd7e57d95a18";

  useEffect(() => {
    getFood();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const getFood = async () => {
    // const response = await fetch(
    //   `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    // );
    // const data = await response.json();
    // console.log(data.hits);
    // setFood(data.hits);
    searchFound = true;
  };

  const showAll = () => {
    searchFound = false;
  };

  return (
    <div>
      <form onSubmit={getSearch}>
        <input
          style={{ width: 400 }}
          type="text"
          placeholder="Order Id, customer or shipper name,phone "
          onChange={updateSearch}
        />
        <input type="submit" value="Search" />
      </form>
      {food.map((foodItem, index) => (
        <div>{foodItem.recipe.label}</div>
      ))}
      <button type="button" class="btn btn-primary" onClick={showAll}>
        Show All
      </button>
    </div>
  );
};

export { SearchBar, searchFound };
