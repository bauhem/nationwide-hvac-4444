import React from "react";
import config from "react-global-configuration";
import QuoteCtx from "../QuoteCtx";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import {SlideWithOptions} from "../HOC/SlideWithOptions";
import Option, {OptionNotSure} from "../Layout/Option";


class CondenserModelNumber extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    let fields = {tonnage: data.tons};
    fields[this.props.ctx_key] = data.model;
    this.props.saveValues(fields);
  }

  render() {
    const options = config.get('model_to_tons').map((data) => {
      return <Option key={data.model} value={data.model} title={data.model} onChange={() => this.handleChange(data)}/>;
    });

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
            <OptionNotSure notSure={this.props.notSure}/>
          </OptionsGroup>
        </div>
      </>
    )
  }
}

CondenserModelNumber.contextType = QuoteCtx;

export default SlideWithOptions(CondenserModelNumber);
