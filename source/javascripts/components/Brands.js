import React from "react";
import QuoteCtx from "./QuoteCtx";

class Brands extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let brand = e.target.value;
    let selected_brands = this.context.selected_brands;

    let index = selected_brands.indexOf(brand);
    if (index !== -1) {
      selected_brands.splice(index, 1);
    } else {
      selected_brands.push(brand);
    }

    this.props.saveValues({selected_brands: selected_brands});
  }

 
  render() {
    if (this.context.brands.length === 0) {
      return (
        <div>
          <span>No Brands matches your query. Please start again by</span>
          <button className="next-button"
                  onClick={() => this.props.transition({type: 'RESET'})}>
            Clicking here
          </button>
        </div>
      )
    }

    return (
      <QuoteCtx.Consumer>
        {context =>
          <>
            <div className="div-heading-slide">
              <h3 className="titre-big">Select brand(s) (optional)</h3>
            </div>
            <div className="flex-third div-flex-h justify-start">
              {
                context.brands.map(brand => {
                  return (
                    <div key={brand} className="options brand w-checkbox">
                      <input type="checkbox" id={brand} name="brand"
                             className="checkbox w-checkbox-input" value={brand}
                             onChange={this.handleChange}
                             checked={context.selected_brands.includes(brand)}/>
                      <label
                        htmlFor={brand}
                        className="checkbox-label-form w-form-label">{brand}</label>
                    </div>
                  )
                })
              }
            </div>
            <a href="#next" className="next-button w-slider-arrow-right"
                 onClick={() => this.props.transition({type: "SUBMIT"})}>
              Next step
            </a>
          </>
        }
      </QuoteCtx.Consumer>
    )
  }
}

Brands.contextType = QuoteCtx;

export default Brands;
