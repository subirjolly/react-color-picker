import React, { Component } from 'react';
import './index.css';
import Slider from '../Slider';

export default class ColorPicker extends Component {
  _getGaps() {
    return [
      [255, 0, 0],
      [255, 255, 0],
      [0, 255, 0],
      [0, 255, 255],
      [0, 0, 255],
      [255, 0, 255],
      [255, 0, 0]
    ];
  }
  _getTones() {
    let gap = 16.67;

    return this._getGaps().map((rgb, i) => {
      let a = gap * i;
      if (a >= 100) {
        a = 100;
      }

      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}) ${a}%`
    }).join(', ');
  }

  _getToneStyle() {
    this._getTones();

    Continue Here
    Need to read color based on percentage.
    return {
      background: `
        linear-gradient(
          to right,
          ${this._getTones()}
        )`
    };
  }

  render() {
    return (
      <div className='ColorPicker'>
        <div className='ColorContainer'>
          <div className='Color'>
          </div>
        </div>
        <div className='Sliders'>
          <div className='Tone'>
            <div className='Box' style={this._getToneStyle()}>
              <Slider transparent={true} />
            </div>
          </div>
          <div className='Transparency'>
            <div className='Background' />
            <div className='Box'>
              <Slider transparent={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
