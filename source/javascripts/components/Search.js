import React from "react";

import queryString from 'query-string'
import {hasProperty} from "../utils";
import Unit from "./Unit";
import {unitURL} from "./UnitHelpers";
import config from "react-global-configuration";
import BrandFilters from "./BrandFilters";
import SEERFilters from "./SEERFilters";
import {brandsFilter} from "./UnitsFilter";
import {withMixitup} from "./hoc/UseMixitup";
import MixitupPaginationLayout from "./MixitupPaginationLayout";
import TonnageFilters from "./TonnageFilters";
import SortFilters from "./SortFilters";
import MobileFilterBox from "./MobileFilterBox";

const units = require('../../../data/products.json');

class Search extends React.Component {
  constructor(props) {
    super(props);

    // TODO - Check if we need to cache results when query is the same (e.g. back navigation)
    this.state = {
      results: [],
      loading: true,
      query: Search.getQuery(),
      errorMsg: '',
      loadError: false
    }

    this.getResults = this.getResults.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  static getQuery() {
    if (!hasProperty(location, 'search')) {
      return "";
    }

    // Query is properly escaped and parsed here. If you change the process
    // to get the query string, make sure to test for script injection
    let search_val = queryString.parse(location.search);

    if (!hasProperty(search_val, 'q')) {
      return '';
    }

    return search_val.q;
  }

  isLoading() {
    return this.state.loading;
  }

  static findUnit(unit, key, query) {
    if (!hasProperty(unit, key)) {
      return false;
    }

    let value = unit[key].toLowerCase();

    return value.match(query) !== null;
  }

  filterUnits(query) {
    query = query.toLowerCase();
    
    return units.filter((unit) => {
      return Search.findUnit(unit, 'CU Model', query) ||
        Search.findUnit(unit, 'AHU Model', query) ||
        Search.findUnit(unit, 'Brand', query) ||
        Search.findUnit(unit, 'Brand Series', query);
    });
  }

  getResults(query) {
    // We use a method to filter Units in case we need to introduce a more
    // advanced search tool
    return new Promise((resolve, reject) => {
      let results = this.filterUnits(query);
      resolve(results);
    });
  }

  componentDidMount() {
    if (this.state.query === '') {
      return;
    }

    this.setState({loading: true});
    this.getResults(this.state.query)
      .then((results) => {
        this.setState({loading: false, results: results});
      })
  }

  static printLoadingMsg() {
    return (
      <div>Loading results...</div>
    )
  }

  renderResults() {
    if (this.state.results.length === 0) {
      return (
        <div>No results found!</div>
      )
    }

    if (this.state.loadError) {
      return (
        <div>An error occurred loading results. Please try again.</div>
      )
    }

    // TODO - Do we use UnitDetails or redirect the user to the ac-units page?
    let units = this.state.results.map((result) => {
      return (
        <Unit key={result['AHRI']} unit={result} saveAndContinue={() => {
          window.location.href = `${unitURL(result)}`
        }}/>
      )
    });

    return units;
  }

  componentDidUpdate() {
    this.props.mixer.forceRefresh();
    this.props.mixer.forceRender();
    this.props.mixer.sort();
  }


  render() {
    return (
      <form id="wf-form-msf" name="wf-form-msf"
            className="form-full-width">
        <div className="div-heading-slide">
          <h3 className="titre-big">Search Results for: {this.state.query}</h3>
        </div>
        <div className="div-flex-h align-start">
          <div className="div-20">
            <MobileFilterBox numResults={this.state.results.length}/>
            <SortFilters visibility={"hide-desktop"}/>
            <BrandFilters name="Brand" brands={brandsFilter()}/>
            <SEERFilters name="SEER" seers={config.get('seer_ranges')}/>
            <TonnageFilters name="Tonnage" tonnages={config.get('tonnage')}/>
          </div>
          {/* NOTE: class container is used by HOC UseMixitup to start the filtering */}
          <div className="div-flex-h justify-start _75-with container">
            <SortFilters visibility={"hide-mobile"}/>
            {this.isLoading() && Search.printLoadingMsg()}
            {!this.isLoading() && this.renderResults()}
            <MixitupPaginationLayout/>
          </div>
        </div>
      </form>
    )
  }
}

export default withMixitup(Search);