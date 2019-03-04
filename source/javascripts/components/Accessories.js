import React from "react";
import config from "react-global-configuration";
import QuoteCtx from "./QuoteCtx";

const accessories = require('../../../data/accessories.json');
const warranty = require('../../../data/warranty.json');
const thermostats = require('../../../data/thermostats.json');

class Accessories extends React.Component {
  constructor(props) {
    super(props);
  }

  static checkoutBtn() {
    return <input data-ix="open-item-added" type="submit"
                  data-wait="Please wait..." value="Go to checkout"
                  className="next-button w-button snipcart-checkout"/>
  }

  nextBtn() {
    return <input type="submit" data-wait="Please wait..." value="Next"
                  className="next-button w-button" onClick={() => this.props.transition({type: "SUBMIT"})}/>
  }

  itemURL(item) {
    let id = item['Product_ID'];
    if (id !== undefined && id !== null) {
      id = id.replace(/_/g, '-');
    } else {
      id = item['ID'];
    }

    return config.get('root_url') + '/ac-units/accessories/' + id + '.html'
  }

  render() {
    let items = [];
    let actionBtn;
    let title = '';

    switch (this.context.currentState) {
      case 'Thermostats':
        items = thermostats;
        actionBtn = this.nextBtn();
        title = 'Choose Thermostat';
        break;
      case 'Warranty':
        items = warranty;
        actionBtn = Accessories.checkoutBtn();
        title = 'Choose Warranty';
        break;
      case 'Accessories':
        actionBtn = this.nextBtn();
      default:
        items = accessories;
        title = 'Choose Accessories';
        break;
    }

    const accComponents = items.map((acc) => {
      return (
        <div key={acc['id']} className="div-full-width added-top-margin">
          <div className="unit-overlay">
            <a href="#"
               data-item-id={acc['Product_ID']}
               data-item-name={acc['Item']}
               data-item-price={acc['Price $']}
               data-item-url={this.itemURL(acc)}
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
              <strong>${acc['Price $']}</strong>
            </div>
          </div>
        </div>
      );
    });

    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">{title}</h3>
        </div>
        <div className="div-full-height">
          {accComponents}
        </div>
        {actionBtn}
      </>
    )
  }
}

Accessories.contextType = QuoteCtx;


export default Accessories;
