import React, {Component} from 'react';
import LiveStream from './live-stream.component';
import DetectionLoader from './detection-loader.component';
import { DetectionDeck } from './detection-deck.component';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      archivedDetectionGroups: []
    }

    this.archiveDetections.bind(this);
  }

  archiveDetections = detections => {
    if (!(detections && detections.length)) return;

    console.log("Archiving ", detections)

    const newDetectionGroups = [...this.state.archivedDetectionGroups];
    newDetectionGroups.push(detections);
    if (newDetectionGroups.length > 20) {
      newDetectionGroups.shift();
    }
    this.setState({
      archivedDetectionGroups: newDetectionGroups
    })
  }

  render = () => 
    <div className="global-container">
      <div className="row">
        <div className="col live-stream-container">
          <LiveStream/>
        </div>
        <div className="col-4 detection-loader-container">
          <DetectionLoader archiveDetections={this.archiveDetections}/>
        </div>
      </div>
      <div className="deck-container custom-scroll row">
        <DetectionDeck detectionGroups={this.state.archivedDetectionGroups}/>
      </div>
    </div>
}

export default Main;
