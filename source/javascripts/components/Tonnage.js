import React from "react";
import config from "react-global-configuration";
import QuoteCtx from "./QuoteCtx";
import SlideHeader from "./Layout/SlideHeader";
import Option from "./Layout/Option";
import {Slide} from "./HOC/Slide";
import OptionsGroup from "./Layout/OptionsGroup";

class Tonnage extends React.Component {
  constructor(props) {
    super(props);

    this.notSure = this.notSure.bind(this);
  }

  notSure() {
    this.props.saveValues({tonnage: "Not Sure"});
    this.props.transition({type: "LOAD_MODEL"})
  }

  render() {
    const style = {transition: "background-color 0.2s ease 0s, border-color 0.2s ease 0s"};
    const options = config.get('tonnage').map((tons) => {
      return (
        <Option key={tons} value={tons} title={`${tons} ton`} description={''} />
      )
    });

    return (
      <>
        <SlideHeader title={"Select System Tonnage"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          {options}
          <Option key={'not-sure'} value={""} title={"I'm not sure"} onChange={this.notSure} />
        </OptionsGroup>
      </>
    );
  }
}

Tonnage.contextType = QuoteCtx;

export default Slide(Tonnage);
