import React from "react";
import {brandLogoImage, seerRange, unitImage} from "./UnitHelpers";

class Unit extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    return this.props.saveAndContinue({selected_unit: this.props.unit});
  }

  renderField(key, label = '', extra_cls='') {
    let value = this.props.unit[key];

    let cls = `div-product-details ${extra_cls}`;

    // Do not render missing fields
    if (value === '' || value === undefined || value === null) {
      return '';
    }

    // When label is not provided, use the key
    if (label === '') {
      label = key;
    }

    return (
      <div className={cls}>
        <div className="blue-text-left">{label}</div>
        <div><strong>{value}</strong></div>
      </div>
    )
  }

  render() {
    let unit = this.props.unit;
    let img_src = unitImage(unit["Attachments"]);
    let brand_img = brandLogoImage(unit);
    let zone_id = this.props.zone_num;
    let zone = `Installed Price Zone ${zone_id}`;
    let model_name = unit['Brand Series'];
    let installation_price = unit[zone];
    let seer_range = seerRange(unit['SEER']);

    return (
      <a href={"#next"}
         onClick={this.handleClick}
         className={`mix ${unit['Brand'].toLowerCase().replace(/ /, '-')} seer-${seer_range} w-inline-block`}>
        <div className="div-image">
          <img src={img_src} alt={model_name}/>
        </div>
        <div className="div-flex-h align-center">
          <div className="product-name">{model_name}</div>
          <img src={brand_img} width="80"
               alt={unit['Brand']}
               className="image-brand"/>
        </div>

        {this.renderField('Tons')}
        {this.renderField('SEER')}
        {this.renderField('CU Model', 'Condenser', 'smaller')}
        {this.renderField('AHU Model', 'Air Handler', 'smaller')}

        {
          installation_price !== undefined && (
            <div className="div-product-details">
              <div className="blue-text-left">Price including
                installation
              </div>
              <div><strong>${installation_price}</strong></div>
            </div>
          )
        }
      </a>
    );
  }
}

export default Unit;
