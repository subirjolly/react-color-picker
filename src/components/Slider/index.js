import React, { Component } from 'react';
import './index.css';


const BORDERS_SIZE = 2;
const MAX_PERCENTAGE = 100;

export default class Slider extends Component {
  // Constructor Method
  constructor(props) {
    super(props);

    this.myref = React.createRef();

    this.state = {
      slider: {left: 0, width: 0, height: 0},
      holder: {height: 0, width: 0, percentage: 0},
      percentage: 0,
      dragging: false
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  cbChanged() {
    this.props.onChange && this.props.onChange(
      this._getAdjustedPercentage()
    );
  }

  cbMouseDown(e) {
    this.setState(() => {
      return {
        dragging: true
      };
    }, function() {
        document.addEventListener('mousemove', this.handleMouseMove, false);
        document.addEventListener('mouseup', this.handleMouseUp, false);
    }.bind(this));
  }

  cbSliderClicked(e) {
    e.persist();

    this.setState((prevState) => {

      return {
        percentage: this._getPercentage(e)
      };
    }, this.cbChanged.bind(this));
  }

  componentDidMount() {
    let rect = this.myref.current.getBoundingClientRect();

    this.setState(() => {
      let state = {
        holder: {
          width: rect.height - BORDERS_SIZE,
          height: rect.height - BORDERS_SIZE,
          percentage: (
            (
              (
                rect.height - BORDERS_SIZE
              ) / rect.width
            ) * MAX_PERCENTAGE
          )
        },
        slider: {
          left: rect.left,
          height: rect.height - BORDERS_SIZE,
          width: rect.width
        }
      };

      return state;
    });
  }

  handleMouseMove(e) {
    this.state.dragging && this.setState((prevState) => {

      return {
        percentage: this._getPercentage(e)
      };
    });
  }

  handleMouseUp(e) {
    this.state.dragging && document.removeEventListener('mouseup', this.handleMouseUp, false);
    this.state.dragging && document.removeEventListener('mousemove', this.handleMouseMove, false);

    this.setState(() => {
      return {
        dragging: false
      };
    }, function() {
      this.cbChanged()
    }.bind(this));
  }

  _getStyle() {
    let defaultStyle = {
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#FFF'
    };

    return this.props.transparent ? {} : defaultStyle;
  }

  render() {
    return (
      <div className='SliderContainer'>
        <div className='Slider'
          ref={this.myref}
          onClick={this.cbSliderClicked.bind(this)}
          style={this._getStyle()}
        >
          <div
            className='Holder'
            style={{
              position: 'absolute',
              height: this.state.holder.height,
              width: this.state.holder.height,
              left: `${this.state.percentage}%`
            }}
            onMouseDown={this.cbMouseDown.bind(this)}
          />
        </div>
      </div>
    );
  }

  // Private Methods
  _getAdjustedPercentage() {
    if (this.state.percentage === 0) {
      return 0;
    }

    return this.state.percentage * (MAX_PERCENTAGE / (MAX_PERCENTAGE - this.state.holder.percentage));
  }

  _getPercentage(e) {
    let percentage = (
      (
        (e.clientX - this.state.slider.left) / this.state.slider.width
      ) * MAX_PERCENTAGE
    ) - (this.state.holder.percentage / BORDERS_SIZE);

    if (percentage < 0) {
      percentage = 0;
    } else if (percentage > (MAX_PERCENTAGE - this.state.holder.percentage)) {
      percentage = (MAX_PERCENTAGE - this.state.holder.percentage);
    }

    return percentage;
  }
}
