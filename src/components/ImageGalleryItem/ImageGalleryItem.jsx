import React from 'react';
import PropTypes from 'prop-types';
// import css from '../styles.css';

export default class ImageGalleryItem extends React.Component {
  render() {
    const { id, webformatURL, largeImageURL } = this.props.hit;

    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          id={id}
          largeimg={largeImageURL}
          onClick={this.props.onClick}
          alt="finding results"
        />
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  hit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
};
