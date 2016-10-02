import React from 'react';

export default class TwowaySlider extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div role="slider" className="slider__container">
        <div className="slider__main"></div>
        <div className="slider__minBar"></div>
        <div className="slider__leftToggle"></div>
        <div className="slider__rightToggle"></div>
        <div className="slider__maxBar"></div>
      </div>
    );
  }
}
