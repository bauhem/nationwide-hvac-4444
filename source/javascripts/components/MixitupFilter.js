import React from 'react'

class MixitupFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {dataFilterType, dataFilter, value} = this.props;
    let extraProps = {};
    extraProps[dataFilterType] = dataFilter;

    let filter_inner_content = (
      <div className="checkbox-field">
        <img src="images/checkbox-grey.png" alt=""
             className="checkbox-button-grey"/>
        <img src="images/checkbox.png" alt=""
             className="checkbox-button"/>
        <div className="checkbox-label" data-ix="check-box">
          {value}
        </div>
      </div>
    );

    let filterCls = "filter_button w-inline-block";

    if (this.props.isResetFilter) {
      return (
        <button type={"reset"} className={"reset-filter " + filterCls}>
          {filter_inner_content}
        </button>
      )
    } else {
      return (
        <a href="#" className={filterCls} {...extraProps}>
          {filter_inner_content}
        </a>
      )
    }
  }
}

export default MixitupFilter;
