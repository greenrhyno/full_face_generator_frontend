import React, {Component} from 'react';
import io from 'socket.io-client';
import { DetectionGroup } from './detection-group.component';
import './../style/detection-loader.style.scss';

const matchID = (id, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] && array[i][0] && array[i][0].id === id) {
      return i;
    }
  }
  return -1;
}

const MAX_TILE = 3;

class DetectionLoader extends Component {

  constructor(props) {
    const detectionSocket = io.connect('http://127.0.0.1:5000/detections');
    detectionSocket.on('connect', function() {
      console.log("Detection socket connected");
    });

    detectionSocket.on('disconnect', function() {
      console.log("Detection socket disconnected");
    });

    detectionSocket.on('detection', (data) => {
      console.log("New detection:", data);
      // check for required fields
      if (!(data && data.id && data.image)) return;

      const newDetectionArray = [...this.state.detections];
      const matchingIndex = matchID(data.id, this.state.detections);

      if (matchingIndex === -1) {
        newDetectionArray.push([data, null]);
      } else {
        newDetectionArray[matchingIndex].pop();
        newDetectionArray[matchingIndex].push(data);
        if (newDetectionArray[matchingIndex].length < MAX_TILE) {
          newDetectionArray[matchingIndex].push(null);
        }
      }

      this.setState({
        detections: newDetectionArray
      })
    });

    super(props);
    this.state = {
      detectionSocket: detectionSocket,
      detections: [], // 2D array of images
    }
  }


  render = () => 
    <div className="detection-loader container-full">
      <div className="col-12 header">
        <span>Ongoing Detection Analyses</span>
      </div>
      <div className="detection-group-container">
        {
          this.state.detections.map((detectionGroup, idx) => 
            <DetectionGroup key={idx} detections={detectionGroup}/>)
        }
      </div>
    </div>
}

export default DetectionLoader;