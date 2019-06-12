import React from 'react';
import './App.scss';
import LiveStream from './components/live-stream.component';
import DetectionLoader from './components/detection-loader.component';

function App() {
  return (
    
    <div className="global-container">
      <div className="row">
        <div className="col live-stream-container">
          <LiveStream/>
        </div>
        <div className="col-4 detection-loader-container">
          <DetectionLoader/>
        </div>
      </div>
      <div className="row">

      </div>
    </div>


  );
}

export default App;
