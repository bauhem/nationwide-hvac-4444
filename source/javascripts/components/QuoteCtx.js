import QuoteSM from "./QuoteSM";
import React from "react";

const QuoteCtx = React.createContext({
  currentState: QuoteSM.initialState.value,
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
  units: null ,
  zip_code: null,
  zone_num: null,
  history: []
});

export default QuoteCtx;