import React from "react";

class SystemTypeStructure extends React.Component {
  constructor(props) {
    super(props);

  }

  saveAndContinue(val) {
    // Get values via this.refs

    var data = {
      system_type_structure: val
    }

    this.props.saveValues(data);
  }

  render() {
    return (
      <div className="step w-slide">
        <div className="form-wrapper w-form">
          <div className="div-flex-h full-height">
            <div className="div-forfaits">
              <div>
                <img src="/images/split-system.png" alt=""/>
                <div className="div-heading-slide">
                  <h3 className="titre-big">Split System</h3>
                </div>
                <p className="smaller-explanation">Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Suspendisse varius enim in eros
                  elementum tristique. Duis cursus, mi quis viverra ornare, eros
                  dolor interdum nulla, ut commodo.</p>
              </div>
              <div className="radio-button-field w-radio">
                <div data-ix="appear-next" className="div-hover"></div>
                <input type="radio" id="split-system" name="type"
                       onClick={() => this.saveAndContinue('split')}
                       value="split-system" data-name="type"
                       className="w-radio-input"/>
                <label htmlFor="split-system"
                       className="w-form-label"><strong>I
                  currently have a Split System</strong></label>
              </div>
            </div>
            <div className="div-forfaits no-margin-right">
              <div>
                <img src="/images/packaged-system.png" alt=""/>
                <div className="div-heading-slide">
                  <h3 className="titre-big">Packaged System</h3>
                </div>
                <p className="smaller-explanation">Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Suspendisse varius enim in eros
                  elementum tristique. Duis cursus, mi quis viverra ornare, eros
                  dolor interdum nulla, ut commodo.</p>
              </div>
              <div className="radio-button-field w-radio">
                <div data-ix="appear-next" className="div-hover"></div>
                <input type="radio" id="packaged-system" name="type"
                       onClick={() => this.saveAndContinue('packaged')}
                       value="packaged-system" data-name="type"
                       className="w-radio-input"/>
                <label htmlFor="packaged-system"
                       className="w-form-label"><strong>I
                  currently have a Packaged System</strong></label>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default SystemTypeStructure;