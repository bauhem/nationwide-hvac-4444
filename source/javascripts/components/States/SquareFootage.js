import React from "react";
import config from "react-global-configuration";
import QuoteCtx from "../QuoteCtx";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import Option, {OptionNotSure} from "../Layout/Option";
import {SlideWithOptions} from "../HOC/SlideWithOptions";

class SquareFootage extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    let fields = {tonnage: data.tons};
    fields[this.props.ctx_key] = data.footage;
    this.props.saveValues(fields);
  }

  render() {
    let options = config.get('square_footage_to_tons').map((data) => {
      return (
        <Option key={data.footage} value={data.footage} title={`${data.footage} sqft`} onChange={() => this.handleChange(data)}/>
      );
    });

    return (
      <>
        <SlideHeader title={"How many square feet is your home or condominium?"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          {options}
          <OptionNotSure notSure={this.props.notSure}/>
        </OptionsGroup>
      </>
    )
  }
}

SquareFootage.contextType = QuoteCtx;
export default SlideWithOptions(SquareFootage);
