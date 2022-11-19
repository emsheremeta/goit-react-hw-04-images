import React from 'react';
import '../../styles.css';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    return (
      <button className="Button" onClick={this.props.loadNextPage}>
        Load More
      </button>
    );
  }
}

Button.propTypes = {
  loadNextPage: PropTypes.func.isRequired,
};
