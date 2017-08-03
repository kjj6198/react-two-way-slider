import React from 'react';
import ReactDOM from 'react-dom';

import Slider from './components/Slider';


ReactDOM.render(<Slider 
  min={0}
  max={100}
/>, document.getElementById('app'));
