import React from 'react';
import SystemTypeStructure from "./SystemTypeStructure";
import SystemType from "./SystemType";
import Tonnage from "./Tonnage";
import Quote from "./Quote";

const MAX_STEPS = 4;

var fieldValues = {
  system_type_structure: null,
  system_type: null,
  tonnage: null,
  zipcode: null
};


class QuoteBuilder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      step: 1,

    }
  }

  saveValues(fields) {
    fieldValues = Object.assign({}, fieldValues, fields)
  }

  renderNextStep() {
    switch (this.state.step) {
      case 1:
        return <SystemTypeStructure fieldValues={fieldValues} saveValues={this.saveValues}/>;
      case 2:
        return <SystemType fieldValues={fieldValues} saveValues={this.saveValues} />;
      case 3:
        return <Tonnage fieldValues={fieldValues} saveValues={this.saveValues} />;
      case 4:
        return <Quote fieldValues={fieldValues} />;
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
    this.setState({step: this.state.step - 1});
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
    this.setState({step: this.state.step + 1});
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
            {slide}
          </div>
        </div>
        {buttons}
      </div>
    );
  }
}

export default QuoteBuilder;