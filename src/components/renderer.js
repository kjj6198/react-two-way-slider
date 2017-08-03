import React from 'react';
import ReactDOM from 'react-dom';
import TwowaySlider from './TwowaySlider.js';

const element = document.createElement('div');
element.id = 'root';
document.body.appendChild(element);
ReactDOM.render(<TwowaySlider />, document.getElementById('root'));
