import React from 'react';
import '../styles.css';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import Error from './Error';

const KEY = '27790361-d52fedb5b14fb71941e53259d';
export default class ImageGallery extends React.Component {
  state = {
    images: null,
    // loading: false,
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    modalUrl: null,
  };
  toggleModal = () => {
    console.log('showmodal');
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onClick = event => {
    console.log(event);
    this.setState({ modalUrl: event.target.attributes.largeimg.value });
    // const url = this.state.images.find(
    //   element => element.id == event.target.id
    // ).largeImageURL;
    // this.setState({ modalUrl: url });
    //integer - дуже по модному ціле число
    this.toggleModal();
  };
  loadNextPage = event => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.search;
    const nextName = this.props.search;
    if (prevName !== nextName) {
      this.setState({ page: 1 });
      console.log('Changing');
    }
    if (prevName !== nextName || this.state.page !== prevState.page) {
      this.setState({ status: 'pending' });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${nextName}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => response.json())
          .then(images => {
            if (images && images.hits.length === 0) {
              this.setState({ status: 'rejected' });
            } else {
              if (this.state.page === 1) {
                this.setState({ images: images.hits });
              } else {
                // console.log(prevState.images);
                this.setState(prevState => ({
                  images: [...prevState.images, ...images.hits],
                }));
              }
              this.setState({ status: 'resolved' });
            }
          })
          .catch(error => {
            this.setState({ error, status: 'rejected' });
          });
        // .finally(this.setState({ loading: false }));
      }, 1000);
    }
  }

  render() {
    // const { loading, images, error, status } = this.state;
    const { images, status, showModal } = this.state;
    if (status === 'idle') {
      // return <div>Please, type the name </div>;
    }

    // if (status === 'pending') {
    //   // return <div>Loading...</div>;
    //   return <Loader />;
    // }
    if (status === 'rejected') {
      const errorMessage = `ERROR! ${this.props.search} does not exist!`;
      return <Error message={errorMessage} />;
    }

    if (status === 'resolved' || status === 'pending') {
      return (
        <div>
          <ul className="ImageGallery">
            {images &&
              images.map(hit => (
                <ImageGalleryItem
                  hit={hit}
                  key={hit.id}
                  onClick={this.onClick}
                />
              ))}
          </ul>
          {status === 'resolved' && <Button loadNextPage={this.loadNextPage} />}
          {status === 'pending' && <Loader />}
          {showModal && (
            <Modal url={this.state.modalUrl} onClose={this.toggleModal} />
          )}
        </div>
      );
    }
  }
}
