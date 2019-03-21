import React from "react";
import config from "react-global-configuration";
import QuoteCtx from "../QuoteCtx";
import SlideHeader from "../Layout/SlideHeader";
import Option, {OptionNotSure} from "../Layout/Option";
import {SlideWithOptions} from "../HOC/SlideWithOptions";
import OptionsGroup from "../Layout/OptionsGroup";

class Tonnage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = config.get('tonnage').map((tons) => {
      return (
        <Option key={tons.toString().replace(/\./, '-')} value={tons} title={`${tons} ton`} description={''} />
      )
    });

    return (
      <>
        <SlideHeader title={"Select System Tonnage"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          {options}
          <OptionNotSure notSure={this.props.notSure}/>
        </OptionsGroup>
      </>
    );
  }
}

Tonnage.contextType = QuoteCtx;

export default SlideWithOptions(Tonnage);
