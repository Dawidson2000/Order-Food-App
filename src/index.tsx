import React from 'react';
import ReactDOM from 'react-dom';
import { Reset } from 'styled-reset';
import styled from 'styled-components';
import './index.css';

import App from './App';

ReactDOM.render(
  <>
    <Reset />
    <App />
  </>,
  document.getElementById('root')
);


