import React from "react";


class Unit extends React.Component {
  render() {
    let unit = this.props.unit;
    let brand_img = '/images/' + unit['Brand'].toLowerCase().replace(/ /g, "-") + '-logo.png';
    let zone = 'Installed Price Zone 1';

    return (
      <div className="units-quote">
        <div className="div-full-width">
          <div className="unit-overlay">
            <h3 className="heading-no-top-margin">I want this unit
              installed</h3>
            {/* TODO - Add snip cart elements here */}
            <a href="#" className="button w-button">Add
              to cart</a>
          </div>
          <div className="div-flex-h align-center">
            <div className="product-name smaller">{unit['Brand Series']}</div>
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
            <div><strong>{unit[zone]}</strong></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Unit;
