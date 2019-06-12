import React, {Component} from 'react';
import * as classNames from 'classnames';
import './../style/photo-tile.style.scss';

const GRIDX = 10;
const GRIDY = 12;
export const DEF_SIZE = {
  w: 150,
  h: 160
}
const DELAY = 0.05;
const DEF_IMG = 'https://paradisevalleychristian.org/wp-content/uploads/2017/01/Blank-Profile.png';

class PhotoTile extends Component {

  constructor(props) {
    super(props);

    let src, tiles, secondaryTiles, secondarySrc, loaded;
    if (props.src) {
      secondarySrc = props.src;
      tiles = this.buildTiles(null);;
      secondaryTiles = this.buildTiles(props.src);
      loaded = true;
    } else {
      src = DEF_IMG;
      tiles = this.buildTiles(src);
      secondaryTiles = this.buildTiles(null);;
      loaded = false;
    }

    this.state = {
      mounted: false,
      loaded: loaded,
      src: src,
      secondarySrc: secondarySrc,
      tiles: tiles,
      secondaryTiles: secondaryTiles,
      width: props.width,
      height: props.height
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      this.setState({
        secondarySrc: this.props.src,
        secondaryTiles: this.buildTiles(this.props.src),
        loaded: true
      })
    }
  }

  componentDidMount() {
    setTimeout(function() { //Start the timer
      this.setState({mounted: true}) //After 1 second, set render to true
    }.bind(this), 1000)
  }

  buildTiles = (src) => {
    const size = DEF_SIZE;
    const gridX = GRIDX;
    const gridY = GRIDY;
    const tileStyles = [];
    
    for (let x = 0; x < gridX; x++) {
      for (let y = 0; y < gridY; y++) {
        var width = size.w / gridX * 101 / size.w + "%",
            height = size.h / gridY * 101 / size.h + "%",
            top = size.h / gridY * y * 100 / size.h + "%",
            left = size.w / gridX * x * 100 / size.w + "%",
            bgPosX = -(size.w / gridX * x) + "px",
            bgPosY = -(size.h / gridY * y) + "px";

        
        const tileStyle = {
          top: `${top}`,
          left: `${left}`,
          width: `${width}`,
          height:` ${height}`,
          backgroundImage: `url(${src})`,
          backgroundPosition: `${bgPosX} ${bgPosY}`,
          backgroundSize: `${size.w}px`,
          transitionDelay: `${x * DELAY + y * DELAY}s`
        };

        tileStyles.push(tileStyle);
      }
    }
    return tileStyles;
  }

  render() {
    
    return (
      <div 
        className={"split"} 
        style={{
          width: DEF_SIZE.w,
          height: DEF_SIZE.h
        }}
        onClick={() => this.setState({loaded: !this.state.loaded})}
      >
        {/* <img src={this.state.src} display={this.state.loaded ? 'none' : undefined} alt="Image1"/> */}
        {
          this.state.tiles.map((style, idx) => 
            <div 
              key={idx} 
              className={classNames({
                active: this.state.mounted && !this.state.loaded
              })} 
              style={style}
            />)
        }

        {/* <img src={this.state.secondarySrc} display={!this.state.loaded ? 'none' : undefined} alt="Image2"/> */}
        {
          this.state.secondaryTiles.map((style, idx) => 
            <div 
              key={idx} 
              className={classNames("secondary", {active: this.state.mounted && this.state.loaded})} 
              style={style}
            />)
        }
        
      </div>
    )
  }
}

export default PhotoTile;