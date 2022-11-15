import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

export default class Loader extends React.Component {
  render() {
    return (
      <div>
        <InfinitySpin width="400" color="#4fa94d" />
      </div>
    );
  }
}
