import React from "react";

const MobileFilterBox = ({numResults}) => {
  if (numResults === undefined) {
    numResults = 0;
  }

  return (
    <div className="div-search-filter mobile"
         data-ix="increase-size-filter-mobile">
      <div className="button-filter" data-ix="increase-size-filter">
        <img src={arrowRightImgUrl} width="20" alt=""
             className="arrow-icon" />
      </div>
      <div className="div-search-filter-back">
        <div><strong>Filter {numResults} results</strong>
        </div>
      </div>
    </div>
  );
}

export default MobileFilterBox;