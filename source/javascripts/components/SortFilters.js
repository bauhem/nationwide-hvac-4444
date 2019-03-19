import React from "react";
import PriceFilter from "./PriceFilter";

const SortFilters = ({visibility}) => {
  return (
    <div className="div-filter">
      <PriceFilter visibility={visibility}/>
    </div>
  );
};

export default SortFilters;