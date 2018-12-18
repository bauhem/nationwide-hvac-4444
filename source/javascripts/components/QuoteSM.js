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
        SUBMIT: 'Brands',
        LOAD_ROOF_ACCESS: 'RoofAccess'
      }
    },
    RoofAccess: {
      on: {
        SUBMIT: 'Brands'
      }
    },
    PackagedSystemLocation: {
      on: {
        SUBMIT: 'Brands'
      }
    },
    AirSystemFilterLocation: {
      on: {
        SUBMIT: 'Brands'
      }
    },
    Brands: {
      onEntry: 'filterBrands',
      on: {
        SUBMIT: 'ZipCode',
        CALL_US_ON_NO_BRANDS: 'CallUs'
      }
    },
    ZipCode: {
      on: {
        SUBMIT: 'Quote',
        INVALID_ZIP: 'CallUs'
      }
    },
    Quote: {
      onEntry: 'filterResults',
      on: {
        SUBMIT: 'UnitDetails'
      }

    },
    UnitDetails: {
      on: {
        SUBMIT: 'Accessories'
      }
    },
    Accessories: {
      type: 'final'
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