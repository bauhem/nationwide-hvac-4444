import React from 'react'
import {Machine, actions} from 'xstate';
import {LOCAL_STORAGE_KEY} from "./QuoteBuilder";

const {assign} = actions;

function getState() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
}

function getSystemType() {
  return getState().system_type_structure;
}

function getAirHandlerLocation() {
  return getState().air_handler_location;
}

function getCondenserUnitLocation() {
  return getState().condenser_unit_location;
}

function isSplitSystem(ctx, event) {
  return getSystemType() === 'split_system';
}

function isPackagedSystem(ctx, event) {
  return getSystemType() === 'packaged_system';
}

function isWaterSystem(ctx, event) {
  return getSystemType() === 'water_system';
}

function showWaterHeater(ctx, event) {
  return getAirHandlerLocation() == 'closet';
}

function showAirHandlerType(ctx, event) {
  let airHandlerLoc = getAirHandlerLocation();
  return airHandlerLoc == 'garage' || airHandlerLoc == 'other';
}

function showRoofAccess(ctx, event) {
  return getCondenserUnitLocation() == 'roof';
}

const QuoteSM = Machine({
  initial: 'SystemTypeStructure',
  states: {
    SystemTypeStructure: {
      onEntry: 'clearPersistedData',
      on: {
        SUBMIT: 'SystemTypes',
      },
    },
    SystemTypes: {
      on: {
        SUBMIT: 'Tonnage'
      },
    },
    Tonnage: {
      on: {
        SUBMIT: [
          {
            target: "AirHandlerLocation", cond: 'isSplitSystem'
          },
          {
            target: "PackagedSystemLocation", cond: 'isPackagedSystem'
          },
          {
            target: "AirSystemFilterLocation", cond: 'isWaterSystem'
          },
        ],
        NOT_SURE: 'CondenserModelNumber'
      },
    },
    CondenserModelNumber: {
      on: {
        SUBMIT: [
          {target: "AirHandlerLocation", cond: 'isSplitSystem'},
          {target: "PackagedSystemLocation", cond: 'isPackagedSystem'},
          {target: "AirSystemFilterLocation", cond: 'isWaterSystem'},
        ],
        NOT_SURE: 'SquareFootage'
      }
    },
    SquareFootage: {
      on: {
        SUBMIT: [
          {target: "AirHandlerLocation", cond: 'isSplitSystem'},
          {target: "PackagedSystemLocation", cond: 'isPackagedSystem'},
          {target: "AirSystemFilterLocation", cond: 'isWaterSystem'},
        ],
        NOT_SURE: 'CallUs'
      }
    },
    CallUs: {
      type: 'final',
      on: {
        SUBMIT: 'CallUs'
      }
    },
    InvalidZip: {
      type: 'final',
      on: {
        SUBMIT: 'InvalidZip'
      }
    },
    AirHandlerLocation: {
      on: {
        SUBMIT: [
          {target: "WaterHeaterUnderAirHandler", cond: 'showWaterHeater'},
          {target: "AirHandlerType", cond: 'showAirHandlerType'},
          {target: 'CondenserUnitLocation'}
        ]
      }
    },
    WaterHeaterUnderAirHandler: {
      on: {
        SUBMIT: 'CondenserUnitLocation'
      }
    },
    AirHandlerType: {
      on: {
        SUBMIT: 'CondenserUnitLocation'
      }
    },
    CondenserUnitLocation: {
      on: {
        SUBMIT: [
          {target: 'RoofAccess', cond: 'showRoofAccess'},
          {target: 'UserInfo'}
        ]
      }
    },
    RoofAccess: {
      on: {
        SUBMIT: 'UserInfo'
      }
    },
    PackagedSystemLocation: {
      on: {
        SUBMIT: 'UserInfo'
      }
    },
    AirSystemFilterLocation: {
      on: {
        SUBMIT: 'UserInfo'
      }
    },
    UserInfo: {
      onEntry: 'filterBrands',
      on: {
        SUBMIT: 'Quote',
        INVALID_ZIP: 'InvalidZip'
      },
    },
    Quote: {
      onEntry: 'filterResults',
      on: {
        SUBMIT: 'UnitDetails'
      }

    },
    UnitDetails: {
      on: {
        SUBMIT: 'Thermostats'
      }
    },
    Thermostats: {
      on: {
        SUBMIT: 'Accessories'
      }
    },
    Accessories: {
      on: {
        SUBMIT: 'Warranty'
      }
    },
    Warranty: {
      type: 'final',
      on: {
        SUBMIT: 'SystemTypeStructure'
      }
    },
  },
  on: {
    BACK: {actions: "back"},
    RESET: 'SystemTypeStructure'
  }
}, {
  guards: {
    isSplitSystem,
    isPackagedSystem,
    isWaterSystem,
    showAirHandlerType,
    showWaterHeater,
    showRoofAccess
  }
});


export default QuoteSM;