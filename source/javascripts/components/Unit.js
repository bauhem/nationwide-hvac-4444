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
      <a href={"#"}
         onClick={this.handleClick}
         className={`mix brand-${unit['Brand'].toLowerCase().replace(/ /, '-')} seer-${seer_range} w-inline-block`}>
        <div className="div-image">
          <img src={img_src} alt={model_name}/>
        </div>
        <div className="div-flex-h align-center">
          <div className="product-name">{model_name}</div>
          <img src={brand_img} width="80"
               alt={unit['Brand']}
               className="image-brand"/>
        </div>
        <div className="div-product-details">
          <div className="blue-text">Tons</div>
          <div><strong>{unit['Tons']}</strong></div>
        </div>
        <div className="div-product-details">
          <div className="blue-text">SEER</div>
          <div><strong>{unit['SEER']}</strong></div>
        </div>
        <div className="div-product-details">
          <div className="blue-text">Price including
            installation
          </div>
          <div><strong>${price + installation_price}</strong></div>
        </div>
      </a>
    );
  }
}

Unit.contextType = QuoteCtx;


export default Unit;
