import React from 'react';

import QuoteSM from "./QuoteSM";
import QuoteCtx from "./QuoteCtx";
import SystemTypeStructure from "./States/SystemTypeStructure";
import SystemTypes from "./States/SystemTypes";
import Tonnage from "./States/Tonnage";
import CondenserModelNumber from "./States/CondenserModelNumber";
import AirHandlerLocation from "./States/AirHandlerLocation";
import AirHandlerType from "./States/AirHandlerType";
import RoofAccess from "./States/RoofAccess";
import CondenserUnitLocation from "./States/CondenserUnitLocation";
import SquareFootage from "./States/SquareFootage";
import CallUs from "./States/CallUs";
import WaterHeaterUnderAirHandler from "./States/WaterHeaterUnderAirHandler";
import PackagedSystemLocation from "./States/PackagedSystemLocation";
import AirSystemFilterLocation from "./States/AirSystemFilterLocation";
import Quote from "./States/Quote";
import UserInfo from "./States/UserInfo";
import Accessories from "./States/Accessories";
import UnitDetails from "./States/UnitDetails";

import {unitsFilter, brandsFilter} from "./UnitsFilter";
import InvalidZip from "./States/InvalidZip";

export const LOCAL_STORAGE_KEY = 'instantQuoteValues';

const StatesComponents = {
  SystemTypeStructure: {
    comp: SystemTypeStructure,
    ctx_key: 'system_type_structure'
  },
  SystemTypes: {comp: SystemTypes, ctx_key: 'system_type'},
  Tonnage: {comp: Tonnage, ctx_key: 'tonnage'},
  CondenserModelNumber: {
    comp: CondenserModelNumber,
    ctx_key: 'condenser_model_number'
  },
  SquareFootage: {comp: SquareFootage, ctx_key: 'sqft'},
  AirHandlerLocation: {
    comp: AirHandlerLocation,
    ctx_key: 'air_handler_location'
  },
  WaterHeaterUnderAirHandler: {
    comp: WaterHeaterUnderAirHandler,
    ctx_key: 'water_heater_under_air_handler'
  },
  AirHandlerType: {comp: AirHandlerType, ctx_key: 'air_handler_type'},
  CondenserUnitLocation: {
    comp: CondenserUnitLocation,
    ctx_key: 'condenser_unit_location'
  },
  RoofAccess: {comp: RoofAccess, ctx_key: 'roof_access'},
  PackagedSystemLocation: {
    comp: PackagedSystemLocation,
    ctx_key: 'packaged_system_location'
  },
  AirSystemFilterLocation: {
    comp: AirSystemFilterLocation,
    ctx_key: 'air_filter_side'
  },
  CallUs: {comp: CallUs, ctx_key: ''},
  InvalidZip: {comp: InvalidZip, ctx_key: ''},
  UserInfo: {comp: UserInfo, ctx_key: ''},
  Quote: {comp: Quote, ctx_key: ''},
  UnitDetails: {comp: UnitDetails, ctx_key: ''},
  Thermostats: {comp: Accessories, ctx_key: ''},
  Accessories: {comp: Accessories, ctx_key: ''},
  Warranty: {comp: Accessories, ctx_key: ''}
};

const saved_values = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
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
    console.log('order completed: ' + data);
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

      if (event.value === undefined) {
        event.value = this.state.system_type_structure;
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

  nextBtn() {
    return (
      <div key="next-btn" className="next w-slider-arrow-right"
           onClick={() => this.transition({type: "SUBMIT"})}>
        <div>Next</div>
      </div>
    );
  }

  validateForm() {
    return this.form.current.reportValidity();
  }

  componentDidUpdate() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state));
  }

  showNext() {
    return QuoteSM.states[this.state.currentState].type !== 'final'
      && this.state.currentState !== 'UserInfo'
      && this.state.currentState !== 'Quote'
      && this.state.currentState !== 'UnitDetails';
  }

  render() {
    const SlideComponent = StatesComponents[this.state.currentState].comp;
    const ctx_key = StatesComponents[this.state.currentState].ctx_key;
    let buttons = [];
    let second_slide = '';

    if (this.state.currentState !== QuoteSM.initialState.value) {
      buttons.push(this.backBtn());
      second_slide = 'second'
    }

    if (this.showNext()) {
      buttons.push(this.nextBtn());
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
                    <SlideComponent value={this.state[ctx_key]}
                                    ctx_key={ctx_key}
                                    saveValues={this.saveValues}
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
