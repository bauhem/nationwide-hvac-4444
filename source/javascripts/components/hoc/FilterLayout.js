import React from "react";

export function withFilterLayout(FilterComponent) {
  return class FilterLayout extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.searchFormRef = React.createRef();
    }

    handleClick(e) {

    }
    
    render() {
      const {name} = this.props;
      return (
        <div className="div-search">
          <div className="div-search-header" data-ix="increase-size-filter">
            <div>{name}</div>
            <div
              className="button-overlay-mobile" data-ix="increase-size-filter">
              <img src={arrowRightImgUrl} width="20" alt=""
                   className="arrow-icon" />
            </div>
          </div>
          <div className="div-search-form" ref={this.searchFormRef}>
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