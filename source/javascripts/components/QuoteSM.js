import React from 'react'
import {Machine, actions} from 'xstate';

const {assign} = actions;

function isSplitSystem(ctx, event) {
  return event.value === 'split_system';
}

function isPackagedSystem(ctx, event) {
  return event.value === 'packaged_system';
}

function isWaterSystem(ctx, event) {
  return event.value === 'water_system';
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
        LOAD_MODEL: 'ModelNumber'
      },
    },
    ModelNumber: {
      on: {
        SUBMIT: [
          {target: "AirHandlerLocation", cond: 'isSplitSystem'},
          {target: "PackagedSystemLocation", cond: 'isPackagedSystem'},
          {target: "AirSystemFilterLocation", cond: 'isWaterSystem'},
        ],
        LOAD_SQUARE_FOOTAGE: 'SquareFootage'
      }
    },
    SquareFootage: {
      on: {
        SUBMIT: [
          {target: "AirHandlerLocation", cond: 'isSplitSystem'},
          {target: "PackagedSystemLocation", cond: 'isPackagedSystem'},
          {target: "AirSystemFilterLocation", cond: 'isWaterSystem'},
        ],
        CALL_US: 'CallUs'
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
        LOAD_WATER_HEATER: 'WaterHeaterUnderAirHandler',
        LOAD_AIR_HANDLER_TYPE: 'AirHandlerType',
        SUBMIT: 'CondenserUnitLocation'
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
        SUBMIT: 'UserInfo',
        LOAD_ROOF_ACCESS: 'RoofAccess'
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
    isWaterSystem
  }
});


export default QuoteSM;