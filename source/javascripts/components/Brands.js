import React from "react";
import QuoteCtx from "./QuoteCtx";


class Brands extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                      <input type="checkbox" id={brand} name="checkbox"
                             data-name="Checkbox"
                             className="checkbox w-checkbox-input"/>
                      <label
                        htmlFor={brand}
                        className="checkbox-label-form w-form-label">{brand}</label>
                    </div>
                  )
                })
              }
            </div>
          </>
        }
      </QuoteCtx.Consumer>
    )
  }
}

export default Brands;