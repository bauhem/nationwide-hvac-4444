import React from "react";
import {
  brandLogoImage, unitBrochureURL, unitDescription, unitID,
  unitImage,
  unitURL,
  floatToPrice
} from "../UnitHelpers";
import QuoteCtx from "../QuoteCtx";

const META_EXCLUDED_KEYS = [
  "currentState",
  "system_types",
  "brands",
  "selected_brands",
  "units",
  "zone_num",
  "history",
  "selected_seers",
  "selected_unit"
];

class UnitDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.transition({type: 'SUBMIT'});
  }


  unitMetaData(ctx) {
    let metaData = {};

    Object.keys(ctx).forEach((key) => {
      if (!META_EXCLUDED_KEYS.includes(key)) {
        let val = ctx[key];

        if (val === null || val === undefined) {
          val = '';
        }
        metaData[key] = val;
      }
    });

    return metaData;
  }

  // Render a field with std format for a unit. Label is optional. If not
  // provided, we use the key as the label for the field. We return nothing if
  // the value is undefined, null or empty
  renderField(key, label = '') {
    let value = this.context.selected_unit[key];

    // Do not render missing fields
    if (value === '' || value === undefined || value === null) {
      return '';
    }

    // When label is not provided, use the key
    if (label === '') {
      label = key;
    }

    return (
      <div className="div-product-details smaller">
        <div className="blue-text">{label}</div>
        <div><strong>{value}</strong></div>
      </div>
    )
  }

  hasAHU() {
    let model = this.context.selected_unit['AHU Model'];
    return model !== undefined && model !== null && model !== '';
  }

  render() {
    let metaData = this.unitMetaData(this.context);

    let unit = this.context.selected_unit;
    let img_src = unitImage(unit["Attachments"], 500, 400);
    let brand_img = brandLogoImage(unit);
    let zone_id = this.context.zone_num;
    let zone = `Installed Price Zone ${zone_id}`;
    let financing = `Financing Payment Zone ${zone_id}`;
    let financing_amount = floatToPrice(unit[financing]);
    let item_id = unitID(unit);
    let model_name = unit['Brand Series'];
    let price = unit['Shop Online Price'];
    let url = unitURL(unit);
    let description = unitDescription(this.context.system_type_structure, unit);
    let installation_price = unit[zone] - price;
    let installation_options = `Zone ${zone_id}[+${installation_price}]`;
    let brochure_url = unitBrochureURL(unit);
    let hasAHU = this.hasAHU();

    return (
      <div className="div-flex-h justify-start added-bot-margin">
        <div className="div-40">
          <img src={img_src}/>
        </div>
        <div className={"div-60"}>
          <div className="div-flex-h align-center">
            <div className="product-name smaller"><h1
              className="product-name smaller">
              <strong>{`${unit['Brand']} ${model_name}`} - {`${unit['Tons']}`} tons</strong>
            </h1></div>
            <img src={brand_img} width="80"
                 alt={unit['Brand']}
                 className="image-brand"/>
          </div>
          <div
            className="pricing smaller">${floatToPrice(price + installation_price)}</div>
          <div>Up to {unit['SEER']} SEER Performance</div>
          <div className="more-spec">
            <div className="div-product-details smaller">
              <div><strong>Payment as low as ${financing_amount}</strong></div>
            </div>
            {this.renderField('Tons')}
            {this.renderField('SEER')}
            {this.renderField('AHRI')}
            {this.renderField('CU Model', 'Condenser')}
            {this.renderField('Compressor Speed')}
            {this.renderField('AHU Model', 'Air Handler')}
            {hasAHU && this.renderField('Air Handler Speed')}
            {hasAHU && this.renderField('Air Handler Size')}
            {this.renderField('Heater Size')}
            {this.renderField('Warranty')}
            <div className="div-product-details smaller">
              <div className="blue-text">
                Price including installation
              </div>
              <div><strong>${floatToPrice(price + installation_price)}</strong>
              </div>
            </div>

          </div>


          <div className="div-flex-h align-new">
            <a href="#"
               data-item-id={item_id}
               data-item-url={url}
               data-item-name={model_name}
               data-item-price={price}
               data-item-description={description}
               data-item-custom1-name="Installation Fees (based on zip code)"
               data-item-custom1-options={installation_options}
               data-item-metadata={JSON.stringify(metaData)}
               className="button added-top-margin  w-button snipcart-add-item"
               onClick={this.handleClick}>
              Schedule Installation
            </a>
            <a href={brochure_url} target="_blank"
               className="button-underline left-margin w-button">
              Product Brochure
            </a>
          </div>
          <div className={"div-product-details smaller"}>{unit['Details']}</div>
          <div className={"div-product-details smaller"}><br/><strong>Installation
            Includes:‍</strong><br/>• Removal of existing system, Installation
            of new Air Handler Unit(AHU) and Condenser Unit (CU), hurricane tie
            downs where required, purging and vacuum of existing refrigeration
            (copper) lines, breaker upgrade where required‍<br/><br/>•
            Installation of new digital thermostat<br/><br/>‍• Installation of a
            new float switch (where required)<br/><br/>‍• Complete final cleanup
            and haul away debris
          </div>

        </div>
      </div>
    );
  }
}

UnitDetails.contextType = QuoteCtx;

export default UnitDetails;
