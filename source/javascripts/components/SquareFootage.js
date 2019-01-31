import React from "react";
import config from "react-global-configuration";
import QuoteCtx from "./QuoteCtx";

class SquareFootage extends React.Component {
  render() {
    return (
      <QuoteCtx.Consumer>
        {context => (

          <>
            <div className="div-heading-slide">
              <h3 className="titre-big">What's your building square
                footage?</h3>
            </div>
            <div className="div-flex-h justify-start added-top-margin">
              <div className="div-flex-h tonnage-form">
                {
                  config.get('square_footage_to_tons').map((data) => {
                    return (
                      <div
                           className="options different-color-font pale-border smallest">
                        <div className="radio-button-field grey-border w-radio"
                             onClick={() => this.props.saveAndContinue({tonnage: data.tons}, {
                               type: 'SUBMIT',
                               value: context.system_type_structure
                             })}>
                          <div
                               className="div-hover"></div>
                          <input type="radio" name="square-footage"
                                 value={data.footage}
                                 data-name="square-footage"
                                 className="radio-button w-radio-input"/>
                          <label className="form-label w-form-label">
                            <strong>{data.footage}</strong>
                          </label>
                        </div>
                      </div>
                    );
                  })
                }
                <div
                     className="options different-color-font pale-border smallest">
                  <div
                    className="radio-button-field grey-border less-padding w-radio"
                    onClick={() => this.props.transition({type: "CALL_US"})}>
                    <div className="div-hover"></div>
                    <input type="radio" id="not-sure-2" name="square-footage"
                           value="not-sure" data-name="square-footage"
                           className="radio-button w-radio-input"/>
                    <label htmlFor="not-sure-2" className="form-label w-form-label">
                      <strong>Not sure</strong>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </QuoteCtx.Consumer>

    )
  }
}

export default SquareFootage;
