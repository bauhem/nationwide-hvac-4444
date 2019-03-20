import React from 'react';

// TODO - Add ref on input to easily save value on next click
class SlideOption extends React.Component {
  render() {
    const {type, title, description} = this.props;

    return (
      <div className="options-new different-color-font pale-border top" data-ix="slider-next-back-appear">
        <div className="radio-button-field-new grey-border w-radio">
          <div className="div-hover" data-ix="appear-next"></div>
          <input type="radio" name="type"
                 value={type} data-name="type"
                 className="radio-button-new w-radio-input"/>
          <label htmlFor={type} className="form-label-trigger w-form-label">
            <strong>{title}</strong>
          </label>
          <div className="div-learn" data-ix="open-explanation">
            <div>Learn more</div>
            <div className="close" data-ix="open-explanation">Close</div>
          </div>
          <div className="form-label-new"><strong>{title}</strong></div>
          <p className="smaller-explanation-new">{description}</p>
        </div>
      </div>

    )
  }
}

export default SlideOption;