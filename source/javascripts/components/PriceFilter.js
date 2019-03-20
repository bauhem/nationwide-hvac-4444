import React from "react";

const PriceFilter = ({hideCls}) => {

  // TODO - Create a HOC for the sort filters layout if other sort filters are
  // required
  return (
      <div className={"header-search-filter " + hideCls}>
        <div className="filter-div">
          <div className="filter-name">Filter by price</div>
          <select id="sort-price" name="sort-price"
                  className="sort-filter select-field w-select">
            <option data-sort="default">Default</option>
            <option data-sort="price:asc">Low to High</option>
            <option data-sort="price:desc">High to Low</option>
          </select>
        </div>
      </div>
  );
};

export default PriceFilter;