import React from "react";
import {
  brandLogoImage, seerRange, unitBrochureURL, unitDescription, unitID,
  unitImage,
  unitURL,
  floatToPrice
} from "./UnitHelpers";
import QuoteCtx from "./QuoteCtx";

class UnitDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.transition({type: 'SUBMIT'});
  }


  render() {
    let unit = this.context.selected_unit;
    let img_src = unitImage(unit, 500, 400);
    let brand_img = brandLogoImage(unit);
    let zone_id = this.context.zone_num;
    let zone = `Installed Price Zone ${zone_id}`;
    let financing = `Financing Payment Zone ${zone_id}`;
    let financing_amount = floatToPrice(unit[financing]);
    let item_id = unitID(unit);
    let model_name = unit['Brand Series'];
    let price = unit['Shop Online Price'];
    let url = unitURL(unit);
    let description = unitDescription(this.context.system_types, unit);
    let installation_price = unit[zone] - price;
    let installation_options = `Zone ${zone_id}[+${installation_price}]`;
    let seer_range = seerRange(unit['SEER']);
    let brochure_url = unitBrochureURL(unit);

    return (
      <div className="div-flex-h justify-start added-bot-margin">
        <div className="div-40">
          <img src={img_src}/>
        </div>
        <div className={"div-60"}>
          <div className="div-flex-h align-center">
            <div className="product-name smaller">{`${unit['Brand']} ${model_name}`}</div>
            <img src={brand_img} width="80"
                 alt={unit['Brand']}
                 className="image-brand"/>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">Tons</div>
            <div><strong>{unit['Tons']}</strong></div>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">SEER</div>
            <div><strong>{unit['SEER']}</strong></div>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">AHRI</div>
            <div><strong>{unit['AHRI']}</strong></div>
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
            <div className="blue-text">
              Warranty
            </div>
            <div>{unit['Warranty']}</div>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">
              Price including installation
            </div>
            <div><strong>${floatToPrice(price + installation_price)}</strong></div>
          </div>
          <div className="div-product-details smaller">
            <div><strong>Payment as low as <red>${financing_amount}</red></strong></div>
          </div>
          <a href="#"
             data-item-id={item_id}
             data-item-url={url}
             data-item-name={model_name}
             data-item-price={price}
             data-item-description={description}
             data-item-custom1-name="Installation Fees (based on zip code)"
             data-item-custom1-options={installation_options}
             data-item-metadata={this.props.orderMetaData}
             className="button added-top-margin  w-button snipcart-add-item"
             onClick={this.handleClick}>
            Schedule Installation
          </a>
          <a href={brochure_url} target="_blank"
             className="button-underline left-margin w-button">
            Product Brochure
          </a>
          <div className="div-flex-h align-center">
            <div className={"div-product-details"}>{unit['Details']}</div>
          </div>
        </div>
      </div>
    );
  }
}

UnitDetails.contextType = QuoteCtx;

export default UnitDetails;
