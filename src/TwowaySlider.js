import React from 'react';
import style from './style.css';
import { Observable } from 'rx';
import SliderManager from './SliderManager.js';
import BarManager from './BarManager.js';
import { debunce } from './Utils';

export default class TwowaySlider extends React.Component {

  constructor(props) {
    super(props);

    this.handleSliderDragAndClick = this.handleSliderDragAndClick.bind(this);
    this.state = {
      isSliding: false,
      curDirection: '',
      min: 0,
      max: 100
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.min !== this.state.min || nextState.max !== this.state.max;
  }

  componentWillMount() {
    this.setState({
      curMin: this.props.curMin,
      curMax: this.props.curMax
    });
  }

  componentDidMount() {
    this.handleSlideState();
    this.handleSliderDragAndClick();
  }

  componentDidUpdate() {
    const rawValue = {
      min: this.props.rawMin,
      max: this.props.rawMax
    }

    const scaledValue = {
      min: this.state.min,
      max: this.state.max
    };

    this.props.valueUpdatedFn.call(this, rawValue,  scaledValue);
  }

  isOverlapped() {
    const { leftToggle, rightToggle } = this.refs;
    const leftToggleRange  = leftToggle.getBoundingClientRect().left + leftToggle.offsetWidth;
    const rightToggleRange = rightToggle.getBoundingClientRect().left;

    if(leftToggleRange >= rightToggleRange) {
      return true;
    }

    return false;
  }

  handleSliderDragAndClick() {
    const {
      leftToggle,
      rightToggle,
      minBar,
      maxBar,
      mainSlider
    } = this.refs;

    const leftTracker  = new SliderManager(leftToggle, mainSlider);
    const rightTracker = new SliderManager(rightToggle, mainSlider);
    const minBarTracker = new BarManager(minBar, mainSlider);
    const maxBarTracker = new BarManager(maxBar, mainSlider);

    const windowMousemove$ = Observable.fromEvent(window, 'mousemove');
    const sliderClick$     = Observable.fromEvent(mainSlider, 'mousedown');

    const move = (e) => {
        const { isSliding, curDirection } = this.state;
        if(isSliding && (curDirection === 'left' || e.direction === 'left')) {
          const offsetX = leftTracker.getOffset(e.pageX);
          const parition = minBarTracker.getPartition(e.pageX);

          requestAnimationFrame(leftTracker.slide(offsetX, 'left'));
          requestAnimationFrame(minBarTracker.slide(parition));

          this.setState({min: parseInt(parition * 100, 10)});
        } else if(isSliding && (curDirection === 'right' || e.direction === 'right')) {
          const offsetX = rightTracker.getOffset(e.pageX);
          const parition = maxBarTracker.getPartition(e.pageX);

          requestAnimationFrame(rightTracker.slide(offsetX, 'right'));
          requestAnimationFrame(maxBarTracker.slide(parition));

          this.setState({max: parseInt(parition * 100, 10)});
        }
    };

    windowMousemove$
      .merge(sliderClick$)
      .throttle(10)
      .map(e => {
        const dLeft = Math.abs(e.pageX - leftToggle.getBoundingClientRect().left + (leftToggle.offsetWidth / 2));
        const dRight = Math.abs(e.pageX - rightToggle.getBoundingClientRect().left);

        const direction = dLeft <= dRight === true ? 'left' : 'right';

        return {
          direction,
          pageX: e.pageX
        }
      })
      .filter(() => !(this.isOverlapped()))
      .subscribe(move);
  }

  handleSlideState() {
    let { isSliding } = this.state;

    const { mainSlider, minBar, maxBar, leftToggle, rightToggle } = this.refs;
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

    const leftTracker   = new SliderManager(leftToggle, mainSlider);
    const rightTracker  = new SliderManager(rightToggle, mainSlider);
    const minBarTracker = new BarManager(minBar, mainSlider);
    const maxBarTracker = new BarManager(maxBar, mainSlider);

    leftToggle.addEventListener('mousedown', toggleSliding(true, 'left'));
    rightToggle.addEventListener('mousedown', toggleSliding(true, 'right'));
    mainSlider.addEventListener('mousedown', toggleSliding(true));

    window.addEventListener('mouseup', () => {
      const { curDirection } = this.state;

      /* [TODO] this code snippet are highly similiar */
      const adjustOverlap = (direction = 'left') => {
        const toggleTrackers = {
          left: leftTracker,
          right: rightTracker
        };
        const toggles = {
          left: leftToggle,
          right: rightToggle
        };
        const barTrackers = {
          left: minBarTracker,
          right: maxBarTracker
        };

        const rawOffset = direction === 'right'
              ? toggles[direction].getBoundingClientRect().left + 25
              : toggles[direction].getBoundingClientRect().left - 10;
        const offset = toggleTrackers[direction].getOffset(rawOffset);
        requestAnimationFrame(toggleTrackers[direction].slide(offset, direction));
        requestAnimationFrame(barTrackers[direction].slide(barTrackers[direction].getPartition(rawOffset)));
      }

      if(this.isOverlapped()) {
        curDirection && adjustOverlap(curDirection);
      }

      disableSliding();
    });
  }

  render() {
    return (
      <div role="slider" className="slider__container">
        <div ref="mainSlider" className="slider__bg"></div>
        <div ref="mainSlider" className="slider__main"></div>
        <div ref="minBar" className="slider__minBar"></div>
        <div ref="leftToggle" className="slider_toggle left"></div>
        <div ref="rightToggle" className="slider_toggle right"></div>
        <div ref="maxBar" className="slider__maxBar"></div>
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
