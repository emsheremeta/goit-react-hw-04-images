import React from 'react';

export default class Modal extends React.Component {
  handleBackdrop = event => {
    console.log('click on backdrop');

    console.log('currentTarget :', event.currentTarget);
    console.log('target :', event.target);
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  componentDidMount() {
    console.log('Open Modal');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Unmount Modal');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    // console.log(e);
    if (e.code === 'Escape') {
      console.log('Escape');
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleBackdrop}>
        <div className="Modal">
          <img src={this.props.url} alt="finding results" />
        </div>
      </div>
    );
  }
}
