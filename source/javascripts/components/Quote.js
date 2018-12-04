import React from "react";
import QuoteCtx from "./QuoteCtx";
import Unit from "./Unit";

class Quote extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let good = [];
    let better = [];
    let best = [];

    if (this.context.units.length > 0) {
      this.context.units.forEach(unit => {
        let rating = unit['Good/Better/Best Rating'];
        switch (rating) {
          case 'Good':
            good.push(unit);
            break;
          case 'Better':
            better.push(unit);
            break;
          case 'Best':
            best.push(unit);
            break;
        }
      });
    }

    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Here&#x27;s the Good results for you</h3>
        </div>
        <div className="flex-third">
          <div className="good-div">
            <div className="heading-result">
              <div>Good</div>
            </div>
            {
              good.map(unit => {
                return (
                  <Unit unit={unit} />
                )
              })
            }
          </div>
          <div className="good-div">
            <div className="heading-result best">
              <div>Better</div>
            </div>
            {
              better.map(unit => {
                return (
                  <Unit unit={unit} />
                )
              })
            }
          </div>
          <div className="good-div">
            <div className="heading-result better">
              <div>Best</div>
            </div>
            {
              best.map(unit => {
                return (
                  <Unit unit={unit} />
                )
              })
            }
          </div>
        </div>
      </>
    )
  }
}

Quote.contextType = QuoteCtx;


export default Quote;