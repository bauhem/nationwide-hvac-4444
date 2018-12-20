import React from "react";
import {brandLogoImage, seerRange, unitImage} from "./UnitHelpers";
import QuoteCtx from "./QuoteCtx";

class Unit extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    return this.props.saveAndContinue({selected_unit: this.props.unit});
  }

  render() {
    let unit = this.props.unit;
    let img_src = unitImage(unit);
    let brand_img = brandLogoImage(unit);
    let zone_id = this.context.zone_num;
    let zone = `Installed Price Zone ${zone_id}`;
    let model_name = unit['Brand Series'];
    let price = unit['Shop Online Price'];
    let installation_price = unit[zone] - price;
    let seer_range = seerRange(unit['SEER']);

    return (
      <div
        className={`mix brand-${unit['Brand'].toLowerCase().replace(/ /, '-')} seer-${seer_range}`}>
        <div class="div-image">
        <img src={img_src}/>
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
          <div><strong>{price + installation_price}</strong></div>
        </div>
        <div className="">
          <a href="#next"
             className="button w-button"
             onClick={this.handleClick}>
            See unit details
          </a>
        </div>
      </div>
    );
  }
}

Unit.contextType = QuoteCtx;


export default Unit;
