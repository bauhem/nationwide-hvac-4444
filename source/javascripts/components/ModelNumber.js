import React from "react";
import config from "react-global-configuration";
import QuoteCtx from "./QuoteCtx";


class ModelNumber extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <QuoteCtx.Consumer>
        {context => (
          <>
            <div className="div-heading-slide">
              <h3 className="titre-big">See the diagram</h3>
            </div>
            <p className="smaller-explanation">Please see the diagram to locate
              the
              model number. If one of the following series of numbers appears in
              the
              model number please input those numbers.</p>
            <div className="div-flex-h justify-start added-top-margin">
              <div className="div-diagram">
                <img src="/images/number-locate.png"
                     id="w-node-ec8688239c87-33000f20"
                     alt=""/>
              </div>
              <div className="div-flex-h tonnage-form">
                {
                  config.get('model_to_tons').map((data) => {
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
                          <input type="radio" name="model-number"
                                 value={data.model}
                                 data-name="model-number"
                                 className="radio-button w-radio-input"/>
                          <label className="w-form-label">
                            <strong>{data.model}</strong>
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
                    onClick={() => this.props.transition({type: "LOAD_SQUARE_FOOTAGE"})}>
                    <div className="div-hover"></div>
                    <input type="radio" id="not-sure-2" name="model-number"
                           value="not-sure" data-name="model-number"
                           className="radio-button w-radio-input"/>
                    <label htmlFor="not-sure-2" className="w-form-label">
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

export default ModelNumber;