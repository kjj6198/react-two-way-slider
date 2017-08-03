import React from 'react';
import { getOffsetFromLeft } from '../helpers';

const defaultStyles = {
  normal: {
    position: 'absolute',
    left: '0',
    top: 'calc(50% - 15px)',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '1px solid #27cc95'  
  },
  disable: {
    border: '1px solid #eee',
  }
  
};

export default class Handle extends React.Component {

  constructor(props) {
    super(props);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);

    this.state = {
      isSliding: false,
      active: true,
    }
  }

  _onDragStart() {
    this.setState({ isSliding: true });


    if (typeof document.addEventListener === 'function') {
      document.addEventListener('mousemove', this._onDragMove);
      document.addEventListener('mouseup', this._onDragEnd);  
    } else {
      document.detachEvent('onmousemove', this._onDragMove);
      document.detachEvent('onmouseup', this._onDragEnd);
    }

    
  }

  _onDragMove(e) {
    const { isSliding, active } = this.state;
    
    if (isSliding && active) {
      const parentRect = this.toggle.parentElement.getBoundingClientRect();
      const offset = getOffsetFromLeft(e.clientX, parentRect.left, parentRect.width);
      this.toggle.style.transform = `translateX(${offset + 'px'})`;
    }

    return null;
  }

  _onDragEnd(e) {
    this.setState({ isSliding: false });
    document.removeEventListener('mousemove', this._onDragMove);
  }

  render() {
    return (
      <button 
        ref={elm => this.toggle = elm}
        style={defaultStyles.normal}
        onMouseDown={this._onDragStart}
        onMouseMove={this._onDragMove}
        onMouseUp={this._onDragEnd}
      >
        
      </button>
    );
  }
}
