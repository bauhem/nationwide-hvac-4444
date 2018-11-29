import React from "react";

var units = require('../../../data/products.json');

class Quote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      units: this.filterUnits(units)
    }
  }

  filterUnits() {
    let units_list = [];

    units_list = units
      .filter(this.filterBySystemType.bind(this))
      .filter(this.filterByTonnage.bind(this))

    return units_list;
  }

  filterBySystemType(unit) {
    // We need to build the unit's system type from the structure and selected type
    // e.g. From packaged a/c we need to build "P SC"
  }

  filterByTonnage(unit) {
    let tonnage = this.props.fieldValues.tonnage;

    if (tonnage == null || unit.tons == tonnage) {
      return true;
    }

    return false;
  }

  // Load systems from all the data in this.props.fieldValues
  // Split systems based on good, better, best value
  // Limit number of system shown

  render() {
    // Generate list of options from system types
    return (
      <div>
        Quote
        <div>Good</div>
        <div>Better</div>
        <div>Best</div>
      </div>
    )
  }
}

export default Quote;