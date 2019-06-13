import React, {Component} from 'react';
import io from 'socket.io-client';
import { DetectionGroup } from './detection-group.component';
import './../style/detection-loader.style.scss';
import { dataAccessors } from './../consts/data-accessors.const';


const NOT_FOUND_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAABycnL7+/v8/Pzy8vL4+Pju7u7Z2dklJSUODg7v7+/l5eXLy8uYmJjU1NRoaGioqKjf399aWlpgYGA8PDy9vb22traDg4OKiorFxcUoKChKSkqxsbGrq6sZGRkvLy9CQkIWFhZubm4zMzNPT0+VlZUfHx+Xl5eNjY18fHzTINiPAAAKUklEQVR4nN2d63qiMBCGVRQUEQU8KyoeW+//AlfarvWQAHNKtO/P3edBviYkM5OZSa0mStNxXdfrj9PoeB4cRvtNZ+37dX976mz2h8ZnNOnFLddpyr6EEK4XxP10Nlgu6iXsB8dxO/Bc228MwQ3643C3PJVpu5U5DHvtru0Xr0YwX82Ge4C4K8tzNI9tv34Z7RSp7v9QJrOxZ1uEHm/VWHYI8r7ZJJ9920rUzBujLVneN4vh2LaaJ9yUMjcVdCLbkm5x44/SLQHOPvVeZJ90+uGGX1/OMg1si8uJw5GMvpzBpGVbXzdN5PRdWJ8tr6u9HcRuQZFFFoexKfUB3uEP2rYExpkBfTnrlWNDn5Ma0pfTsGDJeTODAi9fo/GZ2h4YFXgx5CZm/cee7B6homN0TZ1nxgVe1puZOQc5FbBCq3A2NYqRHX0XBmZ2jaM1gfV6YkCiE/oWFdYH4hPVjehhChLS36KTmrBEi/A/ZSVObAus10+R5NbfszxFv+hM5AR6VheZKycxp9h9hRHMWQiFb1zTxrYemZ3fNesuFSMRTHUi8YgMAL/Hr7AnGDNEcGD/FIOhbU0PfDILdD9tK3pkP+dVOLYt6JkGqz8csL2Xv12fLqy3dOMh5VTIEZXpjJLdefYRRas0XUXRcdoYZqRYwYHxQJwcGd0k0zyv5N5kbnq9SXRe4p8ase37AW2jOA2iR3G/dPuTM3ajHbGFiacUfUnUD4oPOr32FPlRcn2JY8LXco5bFc5x3XYD9fQRj8AAbXBvz9UND5xrzZPPsMIKTEBrXYwxmlgGMUbvFEOY6dg6I36DwRduooewfgJGG1zEx3imKwwytML6EZgs4sG/+IwceGtSIvjAaVqrtcHb/4m81riU6GEH7KbCDfwpVSHNXougOU0tsHExpE5TWnQNPE1rPWh2HNVNnJME1tfgw3cXOohbYkyKGrpIwal3E6iJOCMJDKhnvQPwEYMHNTAGJAeDfFTowyNiUMtmSTFrHHp87casabYnUTj7jCbFqiNgnvGCstSAF7Znhj+PCsLd6KuWpO5vF8uwwDmHHm/5lJOokCywXs+1tCaHx3/Wr4At6J+VsJhiLOEnxpfhU61XU+0alAF/YYbf8/uEINGV3VzzFO1MfRrvEghJfZM1Wd/lM9H9x0i3BoK3C/QJRvODKK4EXSwQqhAfNvU4PsMCdFs19NvA52XCnTUYS/XsakKDs9rpXkqPq8RHw149u7pg7wKtcCKi65dMrbAPddgWWIUux35fRKKepVCrDRFJ+KGLCe5B0OzUYC+/gx3DQDrPWW1PumBrHz1LKWHEKmi2MXhCBFphLJzpHKp/Fv71b7AK27I5bJohRKR8oPfDvoCsX3QBJIQtvMTaNLIKz2qj1NvBHwU74jKlMNP4AxgrAx6UNaFQE1sBB9py0P5hj13WL0fNb6LMqA9sRobgGDY0cYc+ZvnGR6JiDg9fiTatEHXOdUC7h7FUVv5I90o4j/sDK7AWCDnAC92ZJu4sNsOHvBFHzlXYhprDmjluzhAO8uGHlZXQrjK4KYN2DmtSHrBuq8emICd4gQwJiSo0f/Iuwlr7gpSo0BPIzd+pf6qJjSf4FIG1GBpeL6ejOaxAf/Kav1hFBJYajfmBz9kh1nituH3gRJ17TkiHIOZB9zM2bd+ol4U2IQOZmCTMcn54g9qRIx2PUGstI17jWx24AEeAb6EmRPGapmoLknb+Q65HYF1Nz6op5dKK+8n1sn3GTd9XTtI+LSpLzkysYY0pBSOVweYQjd8NWWGbR11OolrZPWpRI73Qku94pqF6PDncNSArZItH+cr4Gnkp65CrEOGHXRrUYfyM/NwdubUi1yCeVDVKLv259AYLLSbTTTmdOBYyWn5pDlMrDKVCjtpbn1zAxlTjrFTI0o4JfTJzhSWBr95RuU48wa4VebFh6QulLILiUaiL31Un4AjYKNdSpoAlvUlGxBDOUI4hvi7uDp/eV4nBdvOXjWcy+nO/UFqEIBgNcBnoRd0v1xXjAbqf2MpsayiGoa0SscRLHHovl5dqoaRgSe+R0c5siyhGkyYHYcwS4z/tl0mS7fmzIPAJC1fAtY/PLAbhz2TqhwPu1EeG7l9tovG2btwa3854x5spT3cxarUJKXq6CB9sq27IOle3DH2jHErm9+m5WbXLWw1AqPC6Ai6cu0H5mbAmQ9CdqBolLDVUPo8tkpfjs3RtR//RNaZxzKiQIf59wUUeZOgsY4Yt6MqCp/VXjDto0E4gxizWKU9/4SYqfUHflIvvigx0QvsjqGN3fYdqtiLHhK/dJ6bL51GbUUA8A/5PFnI2+0T4+/qIJqnDzxf73TTs896d6MEjxAWnJ9T8QJEu9PAYYEFUmjiGlPzSAsCD+KH/DomG217mhh1w0Ea/llLrOEdCt0Fk0PfQ74fEY5+R0DUC4HM/MZtmL9SdHVxRrrVLqSG8jdDFrPBdTDNNyf2JpRTWAmhxhDqn3iHXdGykrvKCZ0gL+fhiCuFrjVCcBl3IXQo8LfQp1uZxxNrkFCIS+deN+Y3x5o4bHPFSIastB3NAvdmFP58NW8xb6raSC3NUZNFfjA7D4XLU4Sp0YDiQ0fESt0H4ggKZc8BR7M+y91ravX4tZyWq7+KcW78aie/iADX2752RvnyV6tkxIHg7WU7L/F2rj+iDlDzYv8FL+kNkrDZBImexfSPcdLAcjpP7QqS7nZXhS++H1sdwJ34ZueWVRlkpxotd01vW6P7CtbsfHsgJ+qV4/A0JIPDcoVOI3WTFjbzA2tjqzcDq/BxeSFXmZBhu0CnFbnK7AYVCTZaqQuq8Uw1crI2NjrxClsI6AtJW98XFj86JcA/XQuRttgut8Wci1pivDAM7/hdx2rAUcmO9ZrUQrzezMo4SF3PraMUzC8FhkwprNSc2vzmKO/iP6G4iEcPIWnpHKzQaA2cojIXT3hn8HA1YbQpaoTlLjvli9ao056ZiN/JBGh2BkULMTip8YFGEI9IT9A5/KnyqVgbpxoFtEs4D13Ec12uPj43D5vFhm0ZqYxW9B91kYpusnsLYrbg3iY7TnFmY9uR9pkp0z6gQztKsIUaidUQ4HDux/C0J3Ahcbgq4hv0lcFPgeoO/Hs4WTVh65saUy84JqGSB1vHYFoAmYQvzvhAL1UOq7zmEl29xUlWiZTMMj5NWi6jSG1haw6lWUytVM2GCSqUn9D5WVqmQaPvOQ5hTmnbzadGdZcEtiaUu3nYhvVJyVeTbD2GtpHmmgdQmA0wK0jZmf2AIL3vGUX87958YwlpBDpyJrBEjOBoLFX8f88uhiTG+uTlzhzKs4f+dIbysNqocKhPZaeZQdaL5S0N4of8UCz/YfiVunmrBLB0CCvJw9Hawf8bCTffeBn/HGGkZd9fxJW8X5q7CbRMFejv8V8T5naeay9XfnvY1Cc5esoEw/8/5s7/iNj3R+il5+zNu0zPf1x3SL8B5Yb7ukkj+3m7/i5eX1+Jv034H5vv66Y9uFf+Z1Ze2X0GY7ol+H8WLMzHq+v4D2NHEZu3BfegAAAAASUVORK5CYII=';
const parseDetection = data => {
  if (!data) return null;

  return dataAccessors.map(info => { 
    return { 
      image: data[info.accessor] ? data[info.accessor] : NOT_FOUND_IMG, 
      label: info.label 
    }
  });
}

const MAX_TILE = 4;
const MAX_COL = 2;

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
            
      const newDetectionGroup = parseDetection(data);
      if (!newDetectionGroup) return;
      const newDetectionArray = [...this.state.detections, newDetectionGroup];

      if (newDetectionArray.length > MAX_COL) {
        const groupToArchive = newDetectionArray.shift();
        this.props.archiveDetections(groupToArchive);
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