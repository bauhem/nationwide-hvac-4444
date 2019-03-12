import React from "react";

export function withFilterLayout(FilterComponent) {
  return class FilterLayout extends React.Component {
    render() {
      const {name} = this.props;
      return (
        <div className="div-search">
          <div
            className="button-overlay-mobile w-hidden-main w-hidden-medium w-hidden-small">
            <img src={arrowRightImgUrl} width="20" alt=""
                 className="arrow-icon"/>
          </div>
          <div className="div-search-header">
            <div>{name}</div>
          </div>
          <div className="div-search-form">
            <div>
              <div className="div-search-dropdown">
                <FilterComponent {...this.props} />
              </div>
            </div>
          </div>
        </div>
      );

    }
  }
}