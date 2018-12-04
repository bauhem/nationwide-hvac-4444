import React from "react";
import QuoteCtx from "./QuoteCtx";

class Quote extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <QuoteCtx.Consumer>
        {context => (
          <>
            <div className="div-heading-slide">
              <h3 className="titre-big">Here&#x27;s the Good results for you</h3>
            </div>
            <div className="flex-third">
              <div className="good-div">
                <div className="heading-result">
                  <div>Good</div>
                </div>
              </div>
              <div className="good-div">
                <div className="heading-result best">
                  <div>Better</div>
                </div>
              </div>
              <div className="good-div">
                <div className="heading-result better">
                  <div>Best</div>
                </div>
              </div>
            </div>
          </>
        )}
      </QuoteCtx.Consumer>
    )
  }
}

export default Quote;