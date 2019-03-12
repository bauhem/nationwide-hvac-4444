import React from "react";
import config from "react-global-configuration";

import QuoteCtx from "./QuoteCtx";
import Unit from "./Unit";
import MixitupFilter from "./MixitupFilter";
import {initializeMixitup} from "../mixitup-helpers";
import BrandFilters from "./BrandFilters";
import SEERFilters from "./SEERFilters";
import {withMixitup} from "./hoc/UseMixitup";


class Quote extends React.Component {
  constructor(props, context) {
    super(props);
    // this.startMixitUp = this.startMixitUp.bind(this);

    this.state = {
      unitsFound: (context.units.length >= 1)
    }
  }

  static renderUnit(unit, props) {
    return <Unit key={unit['AHRI']} unit={unit} {...props} />;
  }

  // startMixitUp() {
  //   mixer = initializeMixitup('.container')
  // }
  //
  // componentDidMount() {
  //   this.state.unitsFound && this.startMixitUp();
  // }
  //
  // componentDidUpdate() {
  //   this.state.unitsFound && this.startMixitUp();
  // }

  render() {

    let props = {
      saveAndContinue: this.props.saveAndContinue,
      zone_num: this.context.zone_num
    };

    let brands = this.context.brands;

    if (this.context.selected_brands.length > 0) {
      brands = this.context.selected_brands;
    }

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
            <BrandFilters name="Brand" brands={brands}/>
            <SEERFilters name="SEER" seers={config.get('seer_ranges')}/>
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

export default withMixitup(Quote);
