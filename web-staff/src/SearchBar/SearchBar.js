import React, { Component } from "react";
import searchIcon from '../images/search-icon.png'
import '../SearchBar/SearchBar.css'
class SearchBar extends Component {
  render() {
    return (
      <form className="search-container">
        <input
          type="text"
          id="search-bar"
          placeholder="What can I help you with today?"
        />
        <a href="#">
          <img
            className="search-icon" alt="search"
            src={searchIcon}
          />
        </a>
      </form>
    );
  }
}

export default SearchBar;
