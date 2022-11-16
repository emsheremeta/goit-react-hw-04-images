import React from 'react';
import '../styles.css';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import Error from './Error';
import { useState } from 'react';
import { useEffect } from 'react';

const KEY = '27790361-d52fedb5b14fb71941e53259d';

export default function ImageGallery(props) {
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);

  const toggleModal = () => {
    console.log('showmodal');
    setShowModal(!showModal);
  };
  const onClick = event => {
    console.log(event);
    setModalUrl(event.target.attributes.largeimg.value);

    // const url = this.state.images.find(
    //   element => element.id == event.target.id
    // ).largeImageURL;
    // this.setState({ modalUrl: url });
    //integer - дуже по модному ціле число

    toggleModal();
  };

  const loadNextPage = event => {
    setPage(page + 1);
    // fetchImages(props.search, page + 1);
  };

  //search for a new term
  useEffect(() => {
    //   if (prevName !== nextName) {
    //     this.setState({ page: 1 });
    //     console.log('Changing');
    //   }
    console.log('search something new');
    setPage(1);
  }, [props.search]);

  //new search
  useEffect(() => {
    console.log('fetch ' + JSON.stringify(props));
    if (props.search === '') return;
    setStatus('pending');
    console.log(
      'request ' +
        `https://pixabay.com/api/?q=${props.search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    fetch(
      `https://pixabay.com/api/?q=${props.search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(newImages => {
        if (newImages && newImages.hits.length === 0) {
          setStatus('rejected');
        } else {
          if (page === 1 || images === null) {
            // setImages(newImages.hits);
            setImages(i => newImages.hits);
          } else {
            console.log('load more ' + page);
            setImages([...images, ...newImages.hits]);
            // this.setState(prevState => ({
            //   images: [...prevState.images, ...images.hits],
            // }));
          }
          setStatus('resolved');
        }
      })
      .catch(error => {
        console.log(error);
        setStatus('rejected');
      });
    // eslint-disable-next-line
  }, [props.search, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const prevName = prevProps.search;
  //   const nextName = this.props.search;

  //   if (prevName !== nextName || this.state.page !== prevState.page) {
  //     this.setState({ status: 'pending' });
  //     setTimeout(() => {
  //       fetch(
  //         `https://pixabay.com/api/?q=${nextName}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //       )
  //         .then(response => response.json())
  //         .then(images => {
  //           if (images && images.hits.length === 0) {
  //             this.setState({ status: 'rejected' });
  //           } else {
  //             if (this.state.page === 1) {
  //               this.setState({ images: images.hits });
  //             } else {
  //               // console.log(prevState.images);
  //               this.setState(prevState => ({
  //                 images: [...prevState.images, ...images.hits],
  //               }));
  //             }
  //             this.setState({ status: 'resolved' });
  //           }
  //         })
  //         .catch(error => {
  //           this.setState({ error, status: 'rejected' });
  //         });
  //       // .finally(this.setState({ loading: false }));
  //     }, 1000);
  // }
  // }

  if (status === 'idle') {
    // return <Button loadNextPage={loadNextPage} />;
  }

  if (status === 'rejected') {
    const errorMessage = `ERROR! ${props.search} does not exist!`;
    return <Error message={errorMessage} />;
  }

  if (status === 'resolved' || status === 'pending') {
    return (
      <div>
        <ul className="ImageGallery">
          {images &&
            images.map(hit => (
              <ImageGalleryItem hit={hit} key={hit.id} onClick={onClick} />
            ))}
        </ul>
        {status === 'resolved' && <Button loadNextPage={loadNextPage} />}
        {status === 'pending' && <Loader />}
        {showModal && <Modal url={modalUrl} onClose={toggleModal} />}
      </div>
    );
  }
}
