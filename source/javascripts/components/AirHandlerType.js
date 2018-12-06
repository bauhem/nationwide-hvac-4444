import React from "react";


class AirHandlerType extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Please select the air handler type</h3>
        </div>
        <div className="div-flex-h">
          <div data-ix="appear-next"
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({air_handler_type: 'horizontal'})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <input type="radio" id="horizontal" name="handler-type"
                     value="horizontal" data-name="handler-type"
                     className="radio-button w-radio-input"/>
              <label htmlFor="horizontal"
                     className="w-form-label"><strong>Horizontal</strong></label>
            </div>
          </div>
          <div data-ix="appear-next"
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({air_handler_type: 'vertical'})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <input type="radio" id="vertical" name="handler-type"
                     value="vertical" data-name="handler-type"
                     className="radio-button w-radio-input"/>
              <label htmlFor="vertical"
                     className="w-form-label"><strong>Vertical</strong></label>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AirHandlerType;