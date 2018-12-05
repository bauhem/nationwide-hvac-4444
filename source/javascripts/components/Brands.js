import React from "react";
import QuoteCtx from "./QuoteCtx";
import Quote from "./Quote";

var selected_brands = [];

class Brands extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.checkAndAssignSelectedBrand = this.checkAndAssignSelectedBrand.bind(this);
  }

  handleChange(e) {
    let brand = e.target.value;

    let index = selected_brands.indexOf(brand);
    if (index !== -1) {
      selected_brands.splice(index, 1);
    } else {
      selected_brands.push(brand);
    }

    this.props.saveValues({selected_brands: selected_brands});
  }

  checkAndAssignSelectedBrand(ctx, brand) {
    let selected = ctx.selected_brands.includes(brand);

    if (selected && selected_brands.indexOf(brand) === -1) {
      selected_brands.push(brand);
    }

    return selected;
  }

  render() {
    if (this.context.brands.length == 0) {
      this.props.transition({type: 'CALL_US_ON_NO_BRANDS'});
    }

    return (
      <QuoteCtx.Consumer>
        {context =>
          <>
            <div className="div-heading-slide">
              <h3 className="titre-big">Select brand(s)</h3>
            </div>
            <div className="div-flex-h justify-start">
              {
                context.brands.map(brand => {
                  return (
                    <div className="options brand w-checkbox">
                      <input type="checkbox" id={brand} name="brand"
                             className="checkbox w-checkbox-input" value={brand}
                             onChange={this.handleChange}
                             checked={this.checkAndAssignSelectedBrand(context, brand)}/>
                      <label
                        htmlFor={brand}
                        className="checkbox-label-form w-form-label">{brand}</label>
                    </div>
                  )
                })
              }
            </div>
            <div className="next w-slider-arrow-right"
                 onClick={() => this.props.transition({type: "SUBMIT"})}>
              <div className="next-button">Next step</div>
            </div>
          </>
        }
      </QuoteCtx.Consumer>
    )
  }
}

Brands.contextType = QuoteCtx;

export default Brands;