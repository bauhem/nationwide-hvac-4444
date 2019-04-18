import MixitupFilter from "./MixitupFilter";
import React from "react";
import {withFilterLayout} from "./HOC/FilterLayout";

const SEERFilters = ({seers}) => {
  let filters = [];
  let last_min_seer = seers.slice(-1)[0].min;

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

  return (
    <div className="dropdown" data-filter-group={'seer'}>
      {filters}
    </div>
  );
};

export default withFilterLayout(SEERFilters);