import React from "react";
import config from "react-global-configuration";
import QuoteCtx from "./QuoteCtx";
import SlideHeader from "./Layout/SlideHeader";
import OptionsGroup from "./Layout/OptionsGroup";
import {Slide} from "./HOC/Slide";


class CondenserModelNumber extends React.Component {
  constructor(props) {
    super(props);
    this.notSure = this.notSure.bind(this);
  }

  notSure() {
    this.props.saveValues({condenser_model_number: "Not Sure"});
    this.props.transition({type: "LOAD_SQUARE_FOOTAGE"});
  }

  render() {
    const options = config.get('model_to_tons').map((data) => {
      return (
        <div
          className="options different-color-font pale-border smaller"
          onClick={() => this.props.saveAndContinue({
            condenser_model_number: data.model,
            tonnage: data.tons
          }, {
            type: 'SUBMIT',
            value: context.system_type_structure
          })}>
          <div className="radio-button-field grey-border w-radio">
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

    return (
      <>
        <SlideHeader title={"Find the Nameplate on Your Condenser"}
                     description={"See the picture below. Choose the\n" +
                     "            number you find on the nameplate, this identifies how the tonnage of\n" +
                     "            your system (by BTUs)."}/>

        <div className="div-flex-h justify-start">
          <div className="div-diagram">
            <img src="/images/number-locate.png"
                 id="w-node-ec8688239c87-33000f20"
                 alt=""/>
          </div>
          <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
            {options}
            <div
              className="options different-color-font pale-border smaller"
              onClick={this.notSure}>
              <div
                className="radio-button-field grey-border less-padding w-radio">
                <div className="div-hover"></div>
                <input type="radio" id="not-sure-2" name="model-number"
                       value="not-sure" data-name="model-number"
                       className="radio-button w-radio-input"/>
                <label htmlFor="not-sure-2" className="w-form-label">
                  <strong>Not sure</strong>
                </label>
              </div>
            </div>
          </OptionsGroup>
        </div>
      </>
    )
  }
}

CondenserModelNumber.contextType = QuoteCtx;

export default Slide(CondenserModelNumber);
