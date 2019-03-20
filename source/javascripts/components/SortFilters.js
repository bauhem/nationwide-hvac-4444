import React from "react";
import PriceFilter from "./PriceFilter";

const SortFilters = ({hideCls}) => {
  return (
    <div className="div-filter">
      <PriceFilter hideCls={hideCls}/>
    </div>
  );
};

export default SortFilters;