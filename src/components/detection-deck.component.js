import React, {Component} from 'react';
import './../style/detection-deck.style.scss';
import * as classNames from 'classnames'

const PhotoSpring = ({detections, open}) =>
  <div 
    className={ classNames("photo-spring", { "active": open }) }
  >
    {
      detections.map((detection, idx) => 
        <img 
          className="spring-image"
          key={`photo-${idx}`} 
          src={!!detection.image && detection.image} 
          alt="Archived detection"
        />
      )
    }
  </div>

export const DetectionDeck = ({detectionGroups}) => 
  <div className="detection-deck">
    {
      detectionGroups.map((group, idx) => <PhotoSpring key={`deck-${idx}`} detections={group}/>)
    }
  </div>