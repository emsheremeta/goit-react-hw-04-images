import React from 'react';
import error from './error.jpg';

export default class Error extends React.Component {
  render() {
    return (
      <div role="alert" className="Error">
        <img className="Error_img" src={error} alt="error" />
        <p>{this.props.message}</p>
      </div>
    );
  }
}
