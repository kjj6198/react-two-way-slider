import React from 'react';
import style from './style.css';
import { Observable } from 'rx';
import SliderManager from './SliderManager.js';
import BarManager from './BarManager.js';
import { debunce } from './Utils';

export default class TwowaySlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  handleSlideState() {

  }

  render() {
    return (
      <div role="slider" className="slider__container">
        <div className="slider__fill"></div>
        <button ref="leftToggle" className="slider_toggle left"></button>
        <button ref="rightToggle" className="slider_toggle right"></button>
      </div>
    );
  }
}

TwowaySlider.defaultProps = {
  curMin: 0,
  curMax: 100,
  rawMin: 0,
  rawMax: 1000,
  valueUpdatedFn: function(rawValue, scaledValue) { console.log(rawValue, scaledValue)}
}
