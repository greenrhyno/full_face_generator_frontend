import React from 'react';
import PhotoTile from './photo-tile.component';
import './../style/detection-group.style.scss';

export const DetectionGroup = ({detections}) =>
  <div className="detection-group col">
    {
      detections.map((detection, idx) => 
        <div key={idx} className="detection-tile">
          <div class="overlay">
            <div class="text">{detection.label}</div>
          </div>
          <PhotoTile src={detection ? detection.image : null}/>
        </div>
      )
    }
  </div>