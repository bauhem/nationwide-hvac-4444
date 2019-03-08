import React from "react";
import config from "react-global-configuration";

import QuoteCtx from "./QuoteCtx";
import Unit from "./Unit";
import MixitupFilter from "./MixitupFilter";
import {initializeMixitup} from "../mixitup-helpers";

var mixer;

class Quote extends React.Component {
  constructor(props, context) {
    super(props);
    this.startMixitUp = this.startMixitUp.bind(this);

    this.state = {
      unitsFound: (context.units.length >= 1)
    }
  }

  static renderUnit(unit, props) {
    return <Unit key={unit['AHRI']} unit={unit} {...props} />;
  }

  startMixitUp() {
    mixer = initializeMixitup('.container')
  }

  componentDidMount() {
    this.state.unitsFound && this.startMixitUp();
  }

  componentDidUpdate() {
    this.state.unitsFound && this.startMixitUp();
  }

  renderBrandsFilters(brands) {
    let filters = [];
    brands.forEach(brand => {
      filters.push(<MixitupFilter
        key={brand}
        dataFilterType={"data-toggle"}
        dataFilter={`.${brand.toLowerCase().replace(/ /, '-')}`}
        value={brand}/>);
    });

    return filters;
  }

  renderSEERFilters(seers) {
    let filters = [];
    let last_min_seer = seers.slice(-1)[0].min

    seers.forEach(range => {
      let seer = range.min;
      let seer_label = seer;

      if (seer >= last_min_seer) {
        seer_label = `${last_min_seer}+`;
      }

      filters.push(<MixitupFilter
        key={seer}
        dataFilterType={"data-toggle"}
        dataFilter={`.seer-${seer}`}
        value={seer_label}/>);
    });

    return filters;
  }

  render() {

    let props = {
      saveAndContinue: this.props.saveAndContinue,
      zone_num: this.context.zone_num
    };

    let brands = this.context.brands;

    if (this.context.selected_brands.length > 0) {
      brands = this.context.selected_brands;
    }

    let brandsFilters = this.renderBrandsFilters(brands);
    let seersFilters = this.renderSEERFilters(config.get('seer_ranges'));

    let units;

    units = this.context.units.map(unit => {
      return Quote.renderUnit(unit, props);
    });

    if (!this.state.unitsFound) {
      units =
        <p>Sorry, no units match your options.
          Please try to change your selection</p>
    }

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
                <img src={arrowRightImgUrl} width="20" alt=""
                     className="arrow-icon"/>
              </div>
              <div className="div-search-header">
                <div>Brand</div>
              </div>
              <div className="div-search-form">
                <div>
                  <div className="div-search-dropdown">
                    <div className="dropdown" data-filter-group={'brand'}>
                      {brandsFilters}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-search">
              <div
                className="button-overlay-mobile w-hidden-main w-hidden-medium w-hidden-small">
                <img src={arrowRightImgUrl} width="20" alt=""
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
            {units}
          </div>
        </div>
      </>
    )
  }
}

Quote.contextType = QuoteCtx;

export default Quote;
