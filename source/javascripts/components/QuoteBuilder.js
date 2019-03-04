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
import UserInfo from "./UserInfo";
import Accessories from "./Accessories";
import UnitDetails from "./UnitDetails";

import {unitsFilter, brandsFilter} from "./UnitsFilter";
import InvalidZip from "./InvalidZip";

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
  InvalidZip: InvalidZip,
  Brands: Brands,
  UserInfo: UserInfo,
  Quote: Quote,
  UnitDetails: UnitDetails,
  Thermostats: Accessories,
  Accessories: Accessories,
  Warranty: Accessories
};

const saved_values = JSON.parse(localStorage.getItem('instantQuoteValues'));
const stateMachine = QuoteSM;

class QuoteBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();

    this.state = QuoteBuilder.defaultState();

    if (saved_values !== null) {
      this.state = Object.assign(this.state, saved_values);
    }

    this.validateForm = this.validateForm.bind(this);
    this.saveValues = this.saveValues.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.transition = this.transition.bind(this);
    this.onOrderCompleted = this.onOrderCompleted.bind(this);

    Snipcart.subscribe('order.completed', this.onOrderCompleted);
  }

  static defaultState() {
    return {
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
      condenser_model_number: null,
      sqft: null,
      brands: [],
      selected_brands: [],
      units: null,
      zip_code: null,
      user_name: null,
      user_email: null,
      user_phone: null,
      zone_num: null,
      history: [],
      selected_seers: [],
      selected_unit: null
    }
  }

  onOrderCompleted(data) {
    Snipcart.api.modal.close();
    console.log('order completed: '  + data);
    this.transition({type: 'RESET'});
  }

  transition(event) {
    if (event.type === "BACK") {
      this.prevState();
    } else {
      // This verification allows us to use HTML5 field validation
      if (!this.validateForm()) {
        return false;
      }

      const nextQuoteState = stateMachine.transition(this.state.currentState, event);
      const nextState = nextQuoteState.actions.reduce(
        (state, action) => this.command(action, event) || state,
        undefined,
      );

      this.setState({
        currentState: nextQuoteState.value,
        history: this.pushStateToHistory(nextQuoteState.value),
        ...nextState,
      });
    }
  }

  command(action, event) {
    let units = [];
    switch (action.type) {
      case 'filterBrands':
        let brands = brandsFilter(this.state);
        this.saveValues({units: units, brands: brands, selected_brands: []});
        break;
      case 'filterResults':
        units = unitsFilter(this.state);
        this.saveValues({units: units});
        break;
      case 'clearPersistedData':
        this.setState(QuoteBuilder.defaultState());
      default:
        break;
    }
  }

  pushStateToHistory(nextState) {
    let history = this.state.history;

    if (history[history.length - 1] !== nextState) {
      history.push(nextState);
    }

    return history;
  }

  prevState() {
    let history = this.state.history;
    let curr_obj_state = this.state;
    history.pop();

    let prevState = history[history.length - 1];

    // TODO - Best thing here would be to revert each field as we go back.
    if (history.length === 0) {
      curr_obj_state = QuoteBuilder.defaultState();
      prevState = stateMachine.initialState.value;
    }

    curr_obj_state.currentState = prevState;
    curr_obj_state.history = history;

    this.setState(curr_obj_state);
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
      <div key="back-btn" className="previous w-slider-arrow-left"
           onClick={() => this.transition({type: 'BACK'})}>
        <img
          src="https://daks2k3a4ib2z.cloudfront.net/585d5e2a7b64077507abdf08/58ab945ae3eb210a7dbbd7cc_arrow-left.gif"
          alt=""/>
        <div className="previous-button">Back</div>
      </div>
    )
  }

  validateForm() {
    return this.form.current.reportValidity();
  }

  componentDidUpdate() {
    localStorage.setItem('instantQuoteValues', JSON.stringify(this.state));
  }

  render() {
    const SlideComponent = StatesComponents[this.state.currentState];
    let buttons = [];
    let second_slide = '';

    if (this.state.currentState !== QuoteSM.initialState.value) {
      buttons.push(this.backBtn());
      second_slide = 'second'
    }

    return (
      <QuoteCtx.Provider value={this.state}>
        <div className="msp-holder" id="next">
          <div className="multi-step-form w-slider">
            <div className="w-slider-mask">
              <div className="slide w-slide">
                <div className="form-wrapper second w-form">
                  <form id="wf-form-msf" name="wf-form-msf"
                        className="form-full-width" ref={this.form}>
                    <SlideComponent saveValues={this.saveValues}
                                    saveAndContinue={this.saveAndContinue}
                                    transition={this.transition}
                                    validateForm={this.validateForm}
                    />
                  </form>
                </div>
              </div>
            </div>
            {buttons}
          </div>
        </div>
      </QuoteCtx.Provider>
    );
  }
}

export default QuoteBuilder;
