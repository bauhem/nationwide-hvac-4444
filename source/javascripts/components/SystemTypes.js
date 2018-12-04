import React from "react";
import SystemType from "./SystemType";
import QuoteCtx from "./QuoteCtx";


class SystemTypes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <QuoteCtx.Consumer>
        {context => (
          <>
            <div className="div-heading-slide">
              <h3 className="titre-big">System Type</h3>
            </div>
            <p className="smaller-explanation">What kind of system do you
              want?</p>
            <div className="div-flex-h">
              {
                context.system_types.map((type) => {
                  return <SystemType {...type}
                                     saveAndContinue={this.props.saveAndContinue}/>
                })
              }
            </div>
          </>
        )}
      </QuoteCtx.Consumer>
    )
  }
}

export default SystemTypes;