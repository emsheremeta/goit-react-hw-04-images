import React from 'react';
import '../../styles.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function ImageGallery({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);

  const toggleModal = () => {
    console.log('showmodal');
    setShowModal(!showModal);
  };
  const onClick = event => {
    console.log(event);
    setModalUrl(event.target.attributes.largeimg.value);

    toggleModal();
  };
  return (
    <div>
      <ul className="ImageGallery">
        {images &&
          images.map(hit => (
            <ImageGalleryItem hit={hit} key={hit.id} onClick={onClick} />
          ))}
      </ul>
      {showModal && <Modal url={modalUrl} onClose={toggleModal} />}
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
};
