import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducer, { initialState } from './reducer';
import { StateProvider } from './StateProvider';

ReactDOM.render(
  <>
    <StateProvider initalState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </>,
  document.getElementById('root')
);
