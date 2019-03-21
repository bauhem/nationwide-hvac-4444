import React from "react";
import QuoteCtx from "../QuoteCtx";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import config from 'react-global-configuration';
import Option from "../Layout/Option";
import {SlideWithOptions} from "../HOC/SlideWithOptions";


class SystemTypes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let options = config.get(this.context.system_type_structure).map((type) => {
      return <Option key={type.type} value={type.type} title={type.name} description={type.description}/>
    });

    return (
      <>
        <SlideHeader title={"System Type"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          {options}
        </OptionsGroup>
      </>
    )
  }
}

SystemTypes.contextType = QuoteCtx;

export default SlideWithOptions(SystemTypes);
