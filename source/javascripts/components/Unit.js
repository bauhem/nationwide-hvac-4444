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

  brandFilterCls() {
    return this.props.unit['Brand'].toLowerCase().replace(/ /, '-')
  }

  seerFilterCls() {
    return `seer-${seerRange(this.props.unit['SEER'])}`
  }

  tonnageFilterCls() {
    return `ton-${this.props.unit['Tons'].toString().replace(/\./g, '-')}`
  }

  render() {
    let unit = this.props.unit;
    let img_src = unitImage(unit["Attachments"]);
    let brand_img = brandLogoImage(unit);
    let zone_id = this.props.zone_num;
    let zone = `Installed Price Zone ${zone_id}`;
    let installation_price = unit[zone];

    let model_name = unit['Brand Series'];
    let brand_filter_cls = this.brandFilterCls();
    let seer_filter_cls = this.seerFilterCls();
    let tonnage_filter_cls = this.tonnageFilterCls();

    return (
      <a href={"#next"}
         onClick={this.handleClick}
         data-price={unit['Shop Online Price']}
         className={`mix ${brand_filter_cls} ${seer_filter_cls} ${tonnage_filter_cls} w-inline-block`}>
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
          // We show price only when we know the user's zone
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
