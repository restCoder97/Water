// Source: https://github.com/nclong87/react-month-year-picker/blob/master/src/index.jsx
// copied here with edit for flexible style

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './MonthYearPickerExt.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MonthYearPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOnClickLeftArrow = this.handleOnClickLeftArrow.bind(this);
    this.handleOnClickRightArrow = this.handleOnClickRightArrow.bind(this);
  }

  handleOnClickLeftArrow() {
    if (this.props.selectedYear <= this.props.minYear) {
      return;
    }
    this.props.onChangeYear(this.props.selectedYear - 1);
  }

  handleOnClickRightArrow() {
    if (this.props.selectedYear >= this.props.maxYear) {
      return;
    }
    this.props.onChangeYear(this.props.selectedYear + 1);
  }

  renderMonth(month) {
    let text = '';
    switch (month) {
      case 1:
        text = 'Jan';
        break;
      case 2:
        text = 'Feb';
        break;
      case 3:
        text = 'Mar';
        break;
      case 4:
        text = 'Apr';
        break;
      case 5:
        text = 'May';
        break;
      case 6:
        text = 'Jun';
        break;
      case 7:
        text = 'Jul';
        break;
      case 8:
        text = 'Aug';
        break;
      case 9:
        text = 'Sep';
        break;
      case 10:
        text = 'Oct';
        break;
      case 11:
        text = 'Nov';
        break;
      case 12:
        text = 'Dec';
        break;
      default:
        break;
    }
    const className = this.props.selectedMonth === month ? 'selected' : '';
    return (
      <div className={className} role="button" tabIndex={0} onClick={() => this.props.onChangeMonth(month)}><span>{text}</span></div>
    );
  }

  renderLeftArrowButton() {
    if (this.props.selectedYear === this.props.minYear) {
      return <text className="fa fa-chevron-left disabled" color="gray"> &#60; </text>;
    }
    // return <FontAwesomeIcon role="button" tabIndex={0} onClick={this.handleOnClickLeftArrow} icon={fa, fa-chevron-left} />;
    return <text role="button" tabIndex={0} onClick={this.handleOnClickLeftArrow} className="fa fa-chevron-left"> &#60; </text>;

  }

  renderRightArrowButton() {
    if (this.props.selectedYear === this.props.maxYear) {
      return <text className="fa fa-chevron-right disabled" color="gray"> &#62; </text>;
    }
    return <text role="button" tabIndex={0} onClick={this.handleOnClickRightArrow} className="fa fa-chevron-right"> &#62; </text>;
  }

  render() {
    return (
      <div className="month-year-picker">
        <span className="caption">{this.props.caption}</span>
        <div className="year-picker">
          <span>{this.props.selectedYear}</span>
          <div className="controlsLeft">
            {this.renderLeftArrowButton()}
          </div>
          <div className="controlsRight">
            {this.renderRightArrowButton()}
          </div>
        </div>
        <div className="month-picker">
          <div>
            {this.renderMonth(1)}
            {this.renderMonth(2)}
            {this.renderMonth(3)}
          </div>
          <div>
            {this.renderMonth(4)}
            {this.renderMonth(5)}
            {this.renderMonth(6)}

          </div>
          <div>
            {this.renderMonth(7)}
            {this.renderMonth(8)}
            {this.renderMonth(9)}
          </div>
          <div>
            {this.renderMonth(10)}
            {this.renderMonth(11)}
            {this.renderMonth(12)}
          </div>
        </div>
      </div>
    );
  }
}

MonthYearPicker.propTypes = {
  caption: PropTypes.string,
  selectedYear: PropTypes.number.isRequired,
  selectedMonth: PropTypes.number.isRequired,
  minYear: PropTypes.number.isRequired,
  maxYear: PropTypes.number.isRequired,
  onChangeYear: PropTypes.func.isRequired,
  onChangeMonth: PropTypes.func.isRequired,
};

MonthYearPicker.defaultProps = {
  caption: 'Select month and year',
};

export default MonthYearPicker;