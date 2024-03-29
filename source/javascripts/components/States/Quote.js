import React from "react";
import config from "react-global-configuration";

import QuoteCtx from "../QuoteCtx";
import Unit from "../Unit";
import BrandFilters from "../BrandFilters";
import SEERFilters from "../SEERFilters";
import {withMixitup} from "../HOC/UseMixitup";
import SortFilters from "../SortFilters";
import MobileFilterBox from "../Layout/MobileFilterBox";
import SlideHeader from "../Layout/SlideHeader";


class Quote extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      unitsFound: (context.units.length >= 1)
    }
  }

  static renderUnit(unit, props) {
    return <Unit key={unit['AHRI']} unit={unit} {...props} />;
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
        <SlideHeader title={"Here are the best results for you:"}/>

        <div className="div-flex-h align-start">
          <div className="div-20">
            <MobileFilterBox numResults={units.length}/>
            <SortFilters hideCls={"hide-desktop"}/>
            <BrandFilters name="Brand" brands={brands}/>
            <SEERFilters name="SEER" seers={config.get('seer_ranges')}/>
          </div>
          <div className="div-flex-h justify-start _75-with container">
            <SortFilters hideCls={"hide-mobile"}/>
            {units}
          </div>
        </div>
      </>
    )
  }
}

Quote.contextType = QuoteCtx;

export default withMixitup(Quote);
