import React, {Component} from 'react';
import io from 'socket.io-client';
import './../style/live-stream.style.scss'

const VIDEO_STREAM_PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RCA_Indian_Head_Test_Pattern.svg/1200px-RCA_Indian_Head_Test_Pattern.svg.png';

class LiveStream extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 'NONE',
      currentFrame: VIDEO_STREAM_PLACEHOLDER,
      latestDetection: null
    };

    const liveStreamSocket = io.connect('http://127.0.0.1:5000/live-stream');
    liveStreamSocket.on('connect', function() {
      console.log("Connection triggered");
    });

    liveStreamSocket.on('disconnect', function() {
      console.log("Connection lost");
    });

    liveStreamSocket.on('message', data => {
      console.log('Backend:', data);
    })

    liveStreamSocket.on('video_frame', (data) => {
      this.setState({
        currentFrame: data.frame
      })
    });

    const detectionSocket = io.connect('http://127.0.0.1:5000/detections');
    detectionSocket.on('connect', function() {
      console.log("Detection socket - connection made");
    });

    detectionSocket.on('detection', data => {
      console.log('NEW DETECTION:', data.name, data);
      this.setState({
        latestDetection: data.image
      })
    })
  }

  render = () => {
    return (
      <div>
        <div className="row">
          <img className="live-stream" src={this.state.currentFrame} alt='Video Stream'/>
        </div>

        <div className="row">
          <h4>Detection</h4>
          <img src={this.state.latestDetection} alt="No detection"/>
        </div>

      </div>

    )
  }

} 

export default LiveStream;