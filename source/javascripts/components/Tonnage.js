import React from "react";
import config from "react-global-configuration";


class Tonnage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {transition: "background-color 0.2s ease 0s, border-color 0.2s ease 0s"};
    const tonnages = config.get('tonnage').map((tons) => {
      return (
        <div data-ix="appear-next"
             className="options different-color-font pale-border smaller"
             style={style}>
          <div className="radio-button-field grey-border w-radio"
               onClick={() => this.props.saveValues({tonnage: tons})}>
            <div data-ix="appear-next" className="div-hover"></div>
            <input type="radio" id={tons} name="tonnage" value={tons}
                   data-name="tonnage"
                   className="radio-button w-radio-input"/>
            <label htmlFor={tons} className="w-form-label">
              <strong>{tons} ton</strong>
            </label>
          </div>
        </div>
      )
    });
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Please select system tonnage</h3>
        </div>
        <div className="div-flex-h justify-start">
          {tonnages}
          <div data-ix="appear-next"
               className="options different-color-font pale-border smaller"
               style={style}>
            <div className="radio-button-field grey-border w-radio" onClick={() => this.props.saveValues({tonnage: null})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <input type="radio" id="not-sure" name="tonnage"
                     value=""
                     className="radio-button w-radio-input"/>
              <label htmlFor="not-sure" className="w-form-label">
                <strong>I'm not sure</strong>
              </label>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Tonnage;