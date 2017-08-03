import React from 'react';
import PropTypes from 'prop-types';

import { getOffsetFromLeft } from '../helpers';
import Handle from './Handle.js';

const defaultStyles = {
  container: {
    zIndex: '0',
    position: 'relative',
    width: '100%',
    backgroundColor: '#bbb',
    borderRadius: '2px',
    height: '5px',
  },
  fill: {
    zIndex: '1',
    width: '100%',
    height: '5px',
    position: 'absolute',
    left: '0',
    right: '0',
    backgroundColor: '#27cc95',
    transform: 'scaleX(1)',
    transformOrigin: 'left'
  },
  handleContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: '2',
    left: '0px',
    right: '0px'
  }
};

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.onBarClick = this.onBarClick.bind(this);
  }

  onBarClick(e) {
    const clientRect = e.target.getBoundingClientRect();
    console.log(getOffsetFromLeft(clientRect.width, e.clientX, clientRect.left, this.props.values[1]))
    

  }

  render() {
    return (
      <div 
        style={defaultStyles.container}
        className="sliderContainer"
        onClick={this.onBarClick}
      >
        <div className="sliderFill" style={defaultStyles.fill}></div>
        <div className="handleContainer" style={defaultStyles.handleContainer}>
          <Handle
            ref={component => this.leftToggle = component}
            min={this.props.min}
            max={this.props.max}
            now={this.props.values[0]}
          />

          <Handle
            ref={component => this.rightToggle = component}
            min={this.props.min}
            max={this.props.max}
            now={this.props.values[1]}
          />
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  values: PropTypes.array,
  handle: PropTypes.func,
  disabled: PropTypes.bool,
  onValueUpdated: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragMove: PropTypes.func,
}

Slider.defaultProps = {
  min: 0,
  max: 100,
  values: [0, 100],
  step: 1,
}
