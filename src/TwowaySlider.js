import React from 'react';
import style from './style.css';
import { Observable } from 'rx';
import SliderManager from './SliderManager.js';

export default class TwowaySlider extends React.Component {

  constructor(props) {
    super(props);

    this.handleSliderDrag = this.handleSliderDrag.bind(this);
    this.state = {
      isSliding: false,
      curDirection: '',
    }
  }
  handleSliderDrag() {
    const {leftToggle, rightToggle, mainSlider } = this.refs;

    const leftTracker  = new SliderManager(leftToggle, mainSlider);
    const rightTracker = new SliderManager(rightToggle, mainSlider);

    const windowMousemove$ = Observable.fromEvent(window, 'mousemove');
    const sliderClick$     = Observable.fromEvent(mainSlider, 'click');


    windowMousemove$
      .merge(sliderClick$)
      .map(e => e.pageX)
      .subscribe(pageX => {
        const { isSliding, curDirection } = this.state;
        if(isSliding && curDirection === 'left') {
          const offsetX = leftTracker.getOffset(pageX);
          requestAnimationFrame(leftTracker.slide(offsetX, 'left'));
        } else if(isSliding && curDirection === 'right') {
          const offsetX = rightTracker.getOffset(pageX);
          requestAnimationFrame(rightTracker.slide(offsetX, 'right'));
        }
      });
  }

  handleSlideState() {
    let { isSliding } = this.state;

    const { mainSlider, leftToggle, rightToggle } = this.refs;
    const toggleSliding = (state, direction) => () => {
      this.setState({isSliding: state});
      isSliding = state;

      if(direction) {
        this.setState({ curDirection: direction });
      }

      if(state === false) {
        this.setState({ curDirection: ''});
      }
    }

    const disableSliding = toggleSliding(false);

    leftToggle.addEventListener('mousedown', toggleSliding(true, 'left'));
    rightToggle.addEventListener('mousedown', toggleSliding(true, 'right'));
    mainSlider.addEventListener('mousedown', toggleSliding(true));
    window.addEventListener('mouseup', disableSliding);
  }

  componentDidMount() {
    this.handleSlideState();
    this.handleSliderDrag();

  }

  render() {
    return (
      <div role="slider" className="slider__container">
        <div ref="mainSlider" className="slider__main"></div>
        <div ref="minBar" className="slider__minBar"></div>
        <div ref="leftToggle" className="slider_toggle left"></div>
        <div ref="rightToggle" className="slider_toggle right"></div>
        <div ref="maxBar" className="slider__maxBar"></div>
      </div>
    );
  }
}
