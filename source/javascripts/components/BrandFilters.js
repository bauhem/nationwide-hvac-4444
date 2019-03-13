import MixitupFilter from "./MixitupFilter";
import React from "react";
import {withFilterLayout} from "./hoc/FilterLayout";

const BrandFilters = ({brands}) => {
  let filters = [];
  brands.forEach(brand => {
    filters.push(<MixitupFilter
      key={brand}
      dataFilterType={"data-toggle"}
      dataFilter={`.${brand.toLowerCase().replace(/ /, '-')}`}
      value={brand}/>);
  });

  return (
    <div className="dropdown" data-filter-group={'brand'}>
      {filters}
    </div>
  );
};

export default withFilterLayout(BrandFilters);