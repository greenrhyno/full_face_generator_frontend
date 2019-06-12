import React from 'react';
import PhotoTile from './photo-tile.component';
import './../style/detection-group.style.scss';

export const DetectionGroup = ({detections}) =>
  <div className="detection-group col-auto">
    {
      detections.map((detection, idx) => 
        <div key={idx} className="detection-tile">
          <PhotoTile src={detection ? detection.image : null}/>
        </div>
      )
    }
  </div>