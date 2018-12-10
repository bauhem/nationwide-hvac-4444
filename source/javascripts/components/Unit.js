import React from "react";
import config from 'react-global-configuration';

class Unit extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.transition({type: 'SUBMIT'});
  }

  render() {
    let unit = this.props.unit;
    let brand_img = '/images/' + unit['Brand'].toLowerCase().replace(/ /g, "-") + '-logo.png';
    let zone_id = this.props.zone_num;
    let zone = `Installed Price Zone ${zone_id}`;
    let item_id = unit['AHRI'].toLowerCase().trim();
    let model_name = unit['Brand Series'];
    let price = unit['Shop Online Price'];
    let url = config.get('root_url') + '/ac-units/' + item_id + '.html';
    let description = `${this.props.systemTypeName} ${model_name} by ${unit['Brand']}`;
    let installation_price = unit[zone] - price;

    return (
      <div className="units-quote">
        <div className="div-full-width">
          <div className="unit-overlay">
            <h3 className="heading-no-top-margin">I want this unit
              installed</h3>
            <a href="#" data-item-id={item_id}
               data-item-url={url}
               data-item-name={model_name + " " + item_id}
               data-item-price={price}
               data-item-description={description}
               data-item-custom1-name={(zone_id == 1) ? `Zone ${zone_id}` : null}
               data-item-custom1-options={(zone_id == 1) ? `Including installation[+${installation_price}]` : null}
               data-item-custom2-name={(zone_id == 2) ? `Zone ${zone_id}` : null}
               data-item-custom2-options={(zone_id == 2) ? `Including installation[+${installation_price}]` : null}
               data-item-metadata={this.props.orderMetaData}
               className="button w-button snipcart-add-item"
               onClick={this.handleClick}>
              Select
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
            <div><strong>{price + installation_price}</strong></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Unit;
