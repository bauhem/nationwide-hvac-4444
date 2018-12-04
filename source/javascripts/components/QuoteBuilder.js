import React from 'react';
import config from 'react-global-configuration';

import QuoteSM from "./QuoteSM";
import QuoteCtx from "./QuoteCtx";
import SystemTypeStructure from "./SystemTypeStructure";
import SystemTypes from "./SystemTypes";
import Tonnage from "./Tonnage";
import ModelNumber from "./ModelNumber";
import AirHandlerLocation from "./AirHandlerLocation";
import AirHandlerType from "./AirHandlerType";
import RoofAccess from "./RoofAccess";
import CondenserUnitLocation from "./CondenserUnitLocation";
import SquareFootage from "./SquareFootage";
import CallUs from "./CallUs";
import WaterHeaterUnderAirHandler from "./WaterHeaterUnderAirHandler";
import PackagedSystemLocation from "./PackagedSystemLocation";
import AirSystemFilterLocation from "./AirSystemFilterLocation";
import Brands from "./Brands";
import Quote from "./Quote";

import {unitsFilter, brandsFilter} from "./UnitsFilter";
import ZipCode from "./ZipCode";

const StatesComponents = {
  SystemTypeStructure: SystemTypeStructure,
  SystemTypes: SystemTypes,
  Tonnage: Tonnage,
  ModelNumber: ModelNumber,
  SquareFootage: SquareFootage,
  AirHandlerLocation: AirHandlerLocation,
  WaterHeaterUnderAirHandler: WaterHeaterUnderAirHandler,
  AirHandlerType: AirHandlerType,
  CondenserUnitLocation: CondenserUnitLocation,
  RoofAccess: RoofAccess,
  PackagedSystemLocation: PackagedSystemLocation,
  AirSystemFilterLocation: AirSystemFilterLocation,
  CallUs: CallUs,
  Brands: Brands,
  ZipCode: ZipCode,
  Quote: Quote,
  // Accessories: Accessories
};

const saved_values = JSON.parse(localStorage.getItem('instantQuoteValues'));
const stateMachine = QuoteSM;

class QuoteBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: stateMachine.initialState.value,
      system_type_structure: null,
      system_types: null,
      system_type: null,
      tonnage: null,
      air_handler_location: null,
      water_heater_under_air_handler: null,
      air_handler_type: null,
      condenser_unit_location: null,
      roof_access: null,
      packaged_system_location: null,
      air_filter_side: null,
      brands: [],
      selected_brands: [],
      units: null,
      zip_code: null
    };

    if (saved_values !== null) {
      this.state = Object.assign(this.state, saved_values);
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
    let units = [];
    switch (action.type) {
      case 'filterBrands':
        units = unitsFilter(this.state);
        let brands = brandsFilter(units, this.state);
        this.saveValues({units: units, brands: brands, selected_brands: []});
        break;
      case 'filterResults':
        units = unitsFilter(this.state);
        this.saveValues({units: units});
        break;
      default:
        break;
    }
  }

  saveValues(fields) {
    this.setState(fields);
  }

  saveAndContinue(fields, event = {type: "SUBMIT"}) {
    this.saveValues(fields);
    this.transition(event);
  }

  backBtn() {
    return (
      <div className="previous w-slider-arrow-left"
           onClick={() => this.transition({type: 'BACK'})}>
        <img
          src="https://daks2k3a4ib2z.cloudfront.net/585d5e2a7b64077507abdf08/58ab945ae3eb210a7dbbd7cc_arrow-left.gif"
          alt=""/>
        <div className="previous-button">Back</div>
      </div>
    )
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
                        data-name="Instant Quote" className="form-full-width">
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