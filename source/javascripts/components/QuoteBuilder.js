import React from 'react';
import config from 'react-global-configuration';

import SystemTypeStructure from "./SystemTypeStructure";
import SystemTypes from "./SystemTypes";
import Tonnage from "./Tonnage";
import Quote from "./Quote";
import ModelNumber from "./ModelNumber";
import AirHandlerLocation from "./AirHandlerLocation";
import AirHandlerType from "./AirHandlerType";
import RoofAccess from "./RoofAccess";
import CondenserUnitLocation from "./CondenserUnitLocation";
import Brands from "./Brands";

const MAX_STEPS = 10;

var fieldValues = {
  system_type_structure: null,
  system_type: null,
  tonnage: null,
  model_number: null,
  location: null,
  air_handler_type: null,
  roof_access: null,
  condenser_unit_location: null,
  brands: [],
  zipcode: null
};


class QuoteBuilder extends React.Component {

  constructor(props) {
    super(props);

    let savedStep = parseInt(localStorage.getItem('instantQuoteCurrentStep'));
    let saved_values = JSON.parse(localStorage.getItem('instantQuoteValues'));
    this.saveValues(saved_values);

    this.state = {
      step: savedStep || 1,

    }
  }

  saveValues(fields) {
    fieldValues = Object.assign({}, fieldValues, fields)
    localStorage.setItem('instantQuoteValues', JSON.stringify(fieldValues));
  }

  renderNextStep() {
    switch (this.state.step) {
      case 1:
        return <SystemTypeStructure fieldValues={fieldValues}
                                    saveValues={this.saveValues}/>;
      case 2:
        return <SystemTypes fieldValues={fieldValues}
                           saveValues={this.saveValues}/>;
      case 3:
        return <Tonnage fieldValues={fieldValues}
                        saveValues={this.saveValues}/>;
      case 4:
        if (fieldValues.tons === null) {
          return <ModelNumber fieldValues={fieldValues}
                              saveValues={this.saveValues}/>;
        }
      case 5:
        return <AirHandlerLocation fieldValues={fieldValues}
                                   saveValues={this.saveValues}/>;
      case 6:
        return <AirHandlerType fieldValues={fieldValues}
                               saveValues={this.saveValues}/>;
      case 7:
        return <RoofAccess fieldValues={fieldValues}
                           saveValues={this.saveValues}/>;
      case 8:
        return <CondenserUnitLocation fieldValues={fieldValues}
                                      saveValues={this.saveValues}/>;
      case 9:
        return <Brands fieldValues={fieldValues} saveValues={this.saveValues}/>;
      case 10:
        return <Quote fieldValues={fieldValues}/>;
    }
  }

  backBtn() {
    return (
      <div className="previous w-slider-arrow-left"
           onClick={() => this.prevStep()}><img
        src="https://daks2k3a4ib2z.cloudfront.net/585d5e2a7b64077507abdf08/58ab945ae3eb210a7dbbd7cc_arrow-left.gif"
        alt=""/>
        <div className="previous-button">Back</div>
      </div>
    )
  }

  prevStep() {
    if (this.state.step === 1) {
      return;
    }
    this.changeStep(this.state.step - 1);
  }

  nextBtn() {
    return (
      <div className="next w-hidden-tiny w-slider-arrow-right"
           onClick={() => this.nextStep()}>
        <div className="next-button">Next step</div>
      </div>
    );
  }

  nextStep() {
    if (this.state.step === MAX_STEPS) {
      return;
    }
    this.changeStep(this.state.step + 1);
  }

  changeStep(newStep) {
    localStorage.setItem('instantQuoteCurrentStep', newStep);
    this.setState({step: newStep});
  }

  render() {
    const slide = this.renderNextStep();
    let buttons = [];

    if (this.state.step > 1) {
      buttons.push(this.backBtn());
    }

    if (this.state.step <= MAX_STEPS) {
      buttons.push(this.nextBtn());
    }

    return (
      <div className="msp-holder">
        <div data-animation="slide" data-easing="ease-out-quart"
             data-hide-arrows="1" data-disable-swipe="1" data-duration="750"
             data-infinite="1" className="multi-step-form w-clearfix w-slider">
          <div className="mask-form w-slider-mask">
            <div className="w-slide">
              <div className="form-wrapper w-form">
                <form id="wf-form-Instant-Quote" name="wf-form-Instant-Quote"
                      data-name="Instant Quote">
                  {slide}
                </form>
              </div>
            </div>
          </div>
        </div>
        {buttons}
      </div>
    );
  }
}

export default QuoteBuilder;