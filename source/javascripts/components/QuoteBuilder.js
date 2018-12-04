import React from 'react';
import config from 'react-global-configuration';

import QuoteSM from "./QuoteSM";
import QuoteCtx from "./QuoteCtx";
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
import SquareFootage from "./SquareFootage";

const StatesComponents = {
  SystemTypeStructure: SystemTypeStructure,
  SystemTypes: SystemTypes,
  Tonnage: Tonnage,
  ModelNumber: ModelNumber,
  SquareFootage: SquareFootage,
  AirHandlerLocation: AirHandlerLocation,
  // WaterHeaterUnderAirHandler: WaterHeaterUnderAirHandler,
  AirHandlerType: AirHandlerType,
  CondenserUnitLocation: CondenserUnitLocation,
  RoofAccess: RoofAccess,
  // PackagedSystemLocation: PackagedSystemLocation,
  // AirSystemFilterLocation: AirSystemFilterLocation,
  // CallUs: CallUs,
  Brands: Brands,
  // ZipCode: ZipCode,
  Quote: Quote,
  // Accessories: Accessories
};

const saved_values = JSON.parse(localStorage.getItem('instantQuoteValues'));
const stateMachine = QuoteSM;

class QuoteBuilder extends React.Component {
  constructor(props) {
    super(props);

    // TODO - Use saved system_type_structure in default SM ctx value
    if (saved_values === null) {
      this.state = {
        currentState: stateMachine.initialState.value,
        system_type_structure: null,
        system_types: null,
        system_type: null,
        tonnage: null,
        model_number: null,
        square_footage: null,
        air_handler_location: null,
        water_heater_under_air_handler: null,
        air_handler_type: null,
        condenser_unit_location: null,
        roof_access: null,
        packaged_system_location: null,
        air_filter_side: null,
        brands: [],
        zip_code: null
      }
    } else {
      this.state = saved_values;
    }

    this.saveValues = this.saveValues.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.transition = this.transition.bind(this);
  }

  transition(event) {
    const nextQuoteState = stateMachine.transition(this.state.currentState, event);
    const nextState = nextQuoteState.actions.reduce(
      (state, action) => this.command(action, event) || state,
      undefined,
    );
    
    this.setState({
      currentState: nextQuoteState.value,
      ...nextState,
    });
  }

  command(action, event) {
    switch (action.type) {
      case 'filterResults':
        // TODO - implement this
        break;
      default:
        break;
    }
  }

  saveValues(fields) {
    let fieldValues = Object.assign({}, this.state, fields)
    this.setState(fields);
  }

  saveAndContinue(fields, event={type: "SUBMIT"}) {
    this.saveValues(fields);
    this.transition(event);
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

  nextBtn() {
    return (
      <div className="next w-hidden-tiny w-slider-arrow-right"
           onClick={() => this.nextStep()}>
        <div className="next-button">Next step</div>
      </div>
    );
  }

  componentDidUpdate() {
    localStorage.setItem('instantQuoteValues', JSON.stringify(this.state));
  }

  render() {
    const SlideComponent = StatesComponents[this.state.currentState];
    let buttons = [];

    if (this.state.currentState !== QuoteSM.initialState.value) {
      buttons.push(this.backBtn());
    }

    if (this.state.currentState.type !== 'final') {
      // buttons.push(this.nextBtn());
    }

    return (
      <QuoteCtx.Provider value={this.state}>
        <div className="msp-holder">
          <div data-animation="slide" data-easing="ease-out-quart"
               data-hide-arrows="1" data-disable-swipe="1" data-duration="750"
               data-infinite="1"
               className="multi-step-form w-clearfix w-slider">
            <div className="mask-form w-slider-mask">
              <div className="w-slide">
                <div className="form-wrapper w-form">
                  <form id="wf-form-Instant-Quote" name="wf-form-Instant-Quote"
                        data-name="Instant Quote">
                    <SlideComponent saveValues={this.saveValues}
                                    saveAndContinue={this.saveAndContinue}
                                    transition={this.transition}/>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {buttons}
        </div>
      </QuoteCtx.Provider>
    );
  }
}

export default QuoteBuilder;