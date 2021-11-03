import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducer, { initialState } from './reducer';
import { StateProvider } from './StateProvider';
import { SpeechProvider } from '@speechly/react-client';


ReactDOM.render(
  <SpeechProvider appId='996c44e6-b060-4977-a23f-314023b8b371' language='en-US'>
    <StateProvider initalState={initialState} reducer={reducer}>
      <App />
      
    </StateProvider>
  </SpeechProvider>,
  document.getElementById('root')
);
