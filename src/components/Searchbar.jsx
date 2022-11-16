import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SearchBar(props) {
  const [search, setSearch] = useState('');

  const handleInputChange = event => {
    setSearch(event.currentTarget.value.toLowerCase());
  };
  const handleInputSubmit = event => {
    event.preventDefault();

    if (search.trim() === '') {
      toast.error('Please, add the name! ');
      return;
    }
    props.onSubmit(search);
    // при submit формы мы вызываем метод onSubmit из App и передаю ему значение state from SearchBar таким образом state from SearchBar доходит до App во время сабмита формы
    setSearch('');
  };
  return (
    <header className="Searchbar">
      <form onSubmit={handleInputSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleInputChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
        />
      </form>
    </header>
  );
}

// class SearchBar

// import React from 'react';
// import toast from 'react-hot-toast';

// export default class SearchBar extends React.Component {
//   state = {
//     search: '',
//   };

//   handleInputChange = event => {
//     this.setState({ search: event.currentTarget.value.toLowerCase() });
//   };
//   handleInputSubmit = event => {
//     event.preventDefault();

//     if (this.state.search.trim() === '') {
//       toast.error('Please, add the name! ');
//       return;
//     }
//     this.props.onSubmit(this.state.search);
//     // при submit формы мы вызываем метод onSubmit из App и передаю ему значение state from SearchBar таким образом state from SearchBar доходит до App во время сабмита формы
//     this.setState({ search: '' });
//   };
//   render() {
//     return (
//       <header className="Searchbar">
//         <form onSubmit={this.handleInputSubmit} className="SearchForm">
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             onChange={this.handleInputChange}
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.search}
//           />
//         </form>
//       </header>
//     );
//   }
// }
// // class SearchBar
