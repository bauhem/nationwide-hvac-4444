import React from "react";
import config from 'react-global-configuration';

import QuoteCtx from "./QuoteCtx";

class Unit extends React.Component {
  render() {
    let system_types = this.context.system_types;
    let unit = this.props.unit;
    let brand_img = '/images/' + unit['Brand'].toLowerCase().replace(/ /g, "-") + '-logo.png';
    let zone = 'Installed Price Zone 1';
    let item_id = unit['AHRI'].toLowerCase();
    let model_name = unit['Brand Series'];
    let price = unit[zone];
    let url = config.get('root_url') + '/ac-units/'+ item_id + '.html';
    let description = '';    //    "#{system_type_key_to_name(unit['System Type'])} by #{unit['Brand']}"


    return (
      <div className="units-quote">
        <div className="div-full-width">
          <div className="unit-overlay">
            <h3 className="heading-no-top-margin">I want this unit
              installed</h3>
            <a href="#" data-item-id={item_id} data-item-name={model_name} data-item-price={price} data-item-url={url} data-item-description={description} className="button w-button snipcart-add-item">
              Add to cart
            </a>
          </div>
          <div className="div-flex-h align-center">
            <div className="product-name smaller">{model_name}</div>
            <img src={brand_img} width="80"
                 alt={unit['Brand']}
                 className="image-brand"/></div>
          <div className="div-product-details smaller">
            <div className="blue-text">Tons</div>
            <div><strong>{unit['Tons']}</strong></div>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">SEER</div>
            <div><strong>{unit['SEER']}</strong></div>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">Condenser</div>
            <div><strong>{unit['CU Model']}</strong></div>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">Air Handler</div>
            <div><strong>{unit['AHU Model']}</strong></div>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">Price including
              installation
            </div>
            <div><strong>{price}</strong></div>
          </div>
        </div>
      </div>
    );
  }
}
Unit.contextTypes = QuoteCtx;

export default Unit;
