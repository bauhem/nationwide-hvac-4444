import MixitupFilter from "./MixitupFilter";
import React from "react";
import {withFilterLayout} from "./HOC/FilterLayout";

const TonnageFilters = ({tonnages}) => {
  let filters = [];

  tonnages.forEach(ton => {
    let ton_filter_value = ton.toString().replace(/\./g,'-');

    filters.push(<MixitupFilter
      key={ton}
      dataFilterType={"data-toggle"}
      dataFilter={`.ton-${ton_filter_value}`}
      value={ton}/>);
  });

  return (
    <div className="dropdown" data-filter-group={'tonnage'}>
      {filters}
    </div>
  );
};

export default withFilterLayout(TonnageFilters);