import React from "react";
import queryString from 'query-string'
import {hasProperty} from "../utils";
import Unit from "./Unit";
import {unitURL} from "./UnitHelpers";

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

    let search_val = queryString.parse(location.search);

    if (!hasProperty(search_val, 'query')) {
      return '';
    }

    return search_val.query;
  }

  isLoading() {
    return this.state.loading;
  }

  filterUnits(query) {
    let results = units.filter((unit) => {
      if (hasProperty(unit, 'CU Model') && unit['CU Model'].match(query) !== null) {
        return true;
      }

      if (hasProperty(unit, 'AHU Model') && unit['AHU Model'].match(query) !== null) {
        return true;
      }

      if (hasProperty(unit, 'Brand') && unit['Brand'].match(query) !== null) {
        return true;
      }

      if (hasProperty(unit, 'Brand Series') && unit['Brand Series'].match(query) !== null) {
        return true;
      }

      return false;
    });

    return results;
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

    return (
      <div className="div-flex-h align-start">
        <div className="div-flex-h justify-start _75-with container">
          {units}
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        <div>Search Results for query: {this.state.query}</div>
        {this.isLoading() && Search.printLoadingMsg()}
        {!this.isLoading() && this.renderResults()}
      </>
    )
  }
}

export default Search