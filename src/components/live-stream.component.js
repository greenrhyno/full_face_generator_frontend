import React, {Component} from 'react';
import io from 'socket.io-client';
import './../style/live-stream.style.scss'

const VIDEO_STREAM_PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RCA_Indian_Head_Test_Pattern.svg/1200px-RCA_Indian_Head_Test_Pattern.svg.png';

class LiveStream extends Component {

  constructor(props) {
    // connect to livestream socket and add handlers
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
        currentFrame: data.frame,
        timestamp: this.getTimestamp()
      })
    });

    super(props);
    this.state = {
      currentFrame: VIDEO_STREAM_PLACEHOLDER,
      timestamp: this.getTimestamp()
    };
  }

  getTimestamp = () => {
    const currentdate = new Date();
    var datetime = this.pad(currentdate.getHours()) + ":"  
                + this.pad(currentdate.getMinutes()) + ":" 
                + this.pad(currentdate.getSeconds());

    return datetime;
  }

  pad = number => number <= 9999 ? `0${number}`.slice(-2) : number;

  render = () => 
    <div>
      <div className="timestamp"><span>{this.state.timestamp}</span></div>
      <img 
        className="live-stream" 
        src={this.state.currentFrame} 
        alt='Video Stream'
      />
    </div>

} 

export default LiveStream;