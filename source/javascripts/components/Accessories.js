import React from "react";
import config from "react-global-configuration";

const accessories = require('../../../data/accessories.json');

class Accessories extends React.Component {
  render() {
    const accComponents = accessories.map((acc) => {
      let img = '';
      let img_url = '/images/product-photo-unavailable.png';

      if (acc['Image'] !== undefined) {
        img_url = acc['Image'][0]['thumbnails']['large']['url'];
      }
      img = <img src={img_url} alt={acc['Item']} />;

      return (
        <div key={acc['id']} className="div-full-width added-top-margin">
          <div className="unit-overlay">
            <a data-ix="open-item-added"
               href="#"
               data-item-id={acc.id}
               data-item-name={acc['Item']}
               data-item-price={acc['Price $']}
               data-item-url={config.get('root_url') + '/ac-units/accessories/' + acc.id + '.html'}
               data-item-description={acc['Description']}
               className="button w-button snipcart-add-item">Add to cart</a>

          </div>
          <div className="div-flex-h align-center">
            <div className="product-name smaller">{acc['Item']}</div>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">Details</div>
            <div>
              <strong>{acc['Description']}</strong>
            </div>
          </div>
          <div className="div-product-details smaller">
            <div className="blue-text">Price</div>
            <div>
              <strong>{acc['Price $']}</strong>
            </div>
          </div>
        </div>
      );
    });

    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Add accessories?</h3>
        </div>
        <div className="div-full-height">
          {accComponents}
        </div>
        <input type="submit" data-wait="Please wait..." value="Go to checkout"
               className="next final w-button snipcart-checkout"/>
      </>
    )
  }
}

export default Accessories;
