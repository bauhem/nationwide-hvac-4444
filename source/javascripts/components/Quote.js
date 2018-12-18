import React from "react";
import mixitup from 'mixitup';
import config from "react-global-configuration";
import mixitupMultifilter from '../lib/mixitup-multifilter'; // loaded from a directory of your choice within your project

import QuoteCtx from "./QuoteCtx";
import Unit from "./Unit";

mixitup.use(mixitupMultifilter);

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.startMixitUp = this.startMixitUp.bind(this);
  }

  orderMetaData(ctx) {
    let metaData = {
      air_filter_side: ctx.air_filter_side,
      air_handler_location: ctx.air_handler_location,
      air_handler_type: ctx.air_handler_type,
      condenser_unit_location: ctx.condenser_unit_location,
      packaged_system_location: ctx.packaged_system_location,
      roof_access: ctx.roof_access,
      water_heater_under_air_handler: ctx.water_heater_under_air_handler,
      zip_code: ctx.zip_code
    };

    Object.keys(metaData).forEach((key) => (metaData[key] == null) && delete metaData[key]);

    return metaData;
  }

  renderUnit(unit, props) {
    return <Unit key={unit['AHRI']} unit={unit} {...props} />;
  }

  startMixitUp() {
    mixitup('.container', {
      multifilter: {
        enable: true
      },
      animation: {
        enable: false
      },
      callbacks: {
        onMixEnd: null
      }
    })
  }

  componentDidMount() {
    this.startMixitUp();
  }

  componentDidUpdate() {
    this.startMixitUp();
  }

  render() {
    let orderMetaData = this.orderMetaData(this.context);

    let props = {
      saveAndContinue: this.props.saveAndContinue,
      orderMetaData: JSON.stringify(orderMetaData),
      zone_num: this.context.zone_num
    };

    let brands = this.context.brands;

    if (this.context.selected_brands.length > 0) {
      brands = this.context.selected_brands;
    }

    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Here are your results</h3>
        </div>
        <div className="div-full-width quote-filters">
          <div className="w-inline-block" data-filter-group={'brand'}>
            <select className={"select-field"} multiple={true}>
              <option>Select Brand(s)</option>
              {
                brands.map(brand => {
                  return <Filter
                    key={brand}
                    dataFilter={`.brand-${brand.toLowerCase().replace(/ /, '-')}`}
                    value={brand}/>
                })
              }
            </select>
          </div>
          <div className="w-inline-block" data-filter-group={'seer'}>
            <select className={"select-field"}>
              <option>Select SEER</option>
              {
                config.get('seer_ranges').map(seer => {
                  return <Filter key={seer} dataFilter={`.seer-${seer}`} value={seer}/>
                })
              }
            </select>
          </div>
        </div>
        <div className="flex-third div-full-height container">
          {
            this.context.units.map(unit => {
              return this.renderUnit(unit, props);
            })
          }
        </div>
      </>
    )
  }
}

const Filter = ({dataFilter, value}) => {
  return (
    <option value={dataFilter}>{value}</option>
  )
}
Quote.contextType = QuoteCtx;

export default Quote;