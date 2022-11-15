import React from 'react';
import toast from 'react-hot-toast';

export default class SearchBar extends React.Component {
  state = {
    search: '',
  };

  handleInputChange = event => {
    this.setState({ search: event.currentTarget.value.toLowerCase() });
  };
  handleInputSubmit = event => {
    event.preventDefault();

    if (this.state.search.trim() === '') {
      toast.error('Please, add the name! ');
      return;
    }
    this.props.onSubmit(this.state.search);
    // при submit формы мы вызываем метод onSubmit из App и передаю ему значение state from SearchBar таким образом state from SearchBar доходит до App во время сабмита формы
    this.setState({ search: '' });
  };
  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleInputSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handleInputChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}
// class SearchBar
