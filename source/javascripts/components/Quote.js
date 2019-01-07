import React from "react";
import mixitup from 'mixitup';
import config from "react-global-configuration";
import mixitupMultifilter from '../lib/mixitup-multifilter'; // loaded from a directory of your choice within your project

import QuoteCtx from "./QuoteCtx";
import Unit from "./Unit";
import MixitupFilter from "./MixitupFilter";

mixitup.use(mixitupMultifilter);

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.startMixitUp = this.startMixitUp.bind(this);
  }

  static renderUnit(unit, props) {
    return <Unit key={unit['AHRI']} unit={unit} {...props} />;
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

  startMixitUp() {
    let quoteObj = this;

    mixitup('.container', {
      controls: {
        toggleLogic: 'or'
      },
      multifilter: {
        enable: true
      },
      animation: {
        enable: false
      },
      callbacks: {
        onMixEnd: (state) => {
          onMixEnd(state, '.form-full-width');
        },
        onMixFail: (state) => {
          console.log('Mix failed: ');
          console.table(state)
        }
      }
    })
  }

  componentDidMount() {
    this.startMixitUp();
  }

  componentDidUpdate() {
    this.startMixitUp();
  }

  renderBrandsFilters(brands) {
    let filters = [];
    brands.forEach(brand => {
      filters.push(<MixitupFilter
        key={brand}
        dataFilterType={"data-toggle"}
        dataFilter={`.brand-${brand.toLowerCase().replace(/ /, '-')}`}
        value={brand}/>);
    });

    return filters;
  }

  renderSEERFilters(seers) {
    let filters = [];
    seers.forEach(seer => {
      filters.push(<MixitupFilter
        key={seer}
        dataFilterType={"data-toggle"}
        dataFilter={`.seer-${seer}`}
        value={seer}/>);
    });

    return filters;
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

    let brandsFilters = this.renderBrandsFilters(brands);
    let seersFilters = this.renderSEERFilters(config.get('seer_ranges'));

    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Here are the best results for you:</h3>
        </div>
        <div className="div-flex-h align-start">
          <div className="div-20">
            <div className="div-search">
              <div
                className="button-overlay-mobile w-hidden-main w-hidden-medium w-hidden-small">
                <img src="images/arrow-right.svg" width="20" alt=""
                     className="arrow-icon"/>
              </div>
              <div className="div-search-header">
                <div>Brand(s)</div>
              </div>
              <form className="div-search-form">
                <div>
                  <div className="div-search-dropdown">
                    <div className="dropdown" data-filter-group={'brand'}>
                      {brandsFilters}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="div-search">
              <div
                className="button-overlay-mobile w-hidden-main w-hidden-medium w-hidden-small">
                <img src="images/arrow-right.svg" width="20" alt=""
                     className="arrow-icon"/>
              </div>
              <div className="div-search-header">
                <div>SEER</div>
              </div>
              <div className="div-search-form">
                <div>
                  <div className="div-search-dropdown">
                    <div className="dropdown" data-filter-group={'seer'}>
                      {seersFilters}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="div-flex-h justify-start _75-with container">
            {
              this.context.units.map(unit => {
                return Quote.renderUnit(unit, props);
              })
            }
          </div>
        </div>
      </>
    )
  }
}

Quote.contextType = QuoteCtx;

export default Quote;
