import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/Searchbar';
import { Toaster } from 'react-hot-toast';
import ImageGallery from './ImageGallery/ImageGallery';
import '../styles.css';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Error from './Error/Error';

//react-toastify

const KEY = '27790361-d52fedb5b14fb71941e53259d';

export default function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  const handleFormSubmit = search => {
    console.log(search);
    setSearch(search);
    setPage(1);
  };

  useEffect(() => {
    if (search === '') return;
    setStatus('pending');

    fetch(
      `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(newImages => {
        if (newImages && newImages.hits.length === 0) {
          setStatus('rejected');
        } else {
          if (page === 1 || images === null) {
            setImages(i => newImages.hits);
          } else {
            console.log('load more ' + page);
            setImages([...images, ...newImages.hits]);
          }
          setStatus('resolved');
        }
      })
      .catch(error => {
        console.log(error);
        setStatus('rejected');
      });
    // eslint-disable-next-line
  }, [search, page]);

  if (status === 'rejected') {
    const errorMessage = `ERROR! ${search} does not exist!`;
    return <Error message={errorMessage} />;
  }

  if (status === 'idle' || status === 'resolved' || status === 'pending') {
    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} />
        <Toaster />
        <ImageGallery images={images} />
        {status === 'resolved' && <Button loadNextPage={loadNextPage} />}
        {status === 'pending' && <Loader />}
      </div>
    );
  }
}
