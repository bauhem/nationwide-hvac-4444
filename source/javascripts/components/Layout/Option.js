import React from 'react';

export function OptionNotSure(props) {
  return (
    <Option key={'not-sure'} value={"Not Sure"} title={"I'm not sure"}
            onChange={() => props.notSure()} isChecked={props.isChecked}/>
  )
}

// Used to manually trigger interactions on objects of the components
const ix = Webflow.require('ix');
const openExplanationTrigger = {"type":"click","selector":".smaller-explanation-new","siblings":true,"stepsA":[{"height":"auto","transition":"height 200 ease 0"}]}
const showCloseBtnTrigger = {"type":"click","selector":".close","descend":true,"stepsA":[{"display":"block","opacity":0,"transition":"opacity 200 ease 0"},{"opacity":1,"transition":"opacity 200 ease 0"}]}
const closeExplanationTrigger = {"type":"click","selector":".smaller-explanation-new","siblings":true, "stepsA":[{"height":"0px","transition":"height 200 ease 0"}]}
const hideCloseBtnTrigger =  {"type":"click","selector":".close","descend":true,"stepsA":[{"opacity":0,"transition":"opacity 200 ease 0"},{"display":"none"}]}

class Option extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.openExplanationRef = React.createRef();
    this.closeExplanationRef = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.openExplanation = this.openExplanation.bind(this);
    this.closeExplanation = this.closeExplanation.bind(this);
  }

  handleClick() {
    this.ref.current.checked = true;
    this.props.onChange(this.ref.current.value);
  }

  openExplanation(e) {
    e.stopPropagation();
    let el = jQuery(this.openExplanationRef.current);
    ix.run(openExplanationTrigger, el);
    ix.run(showCloseBtnTrigger, el);
  }

  closeExplanation(e) {
    e.stopPropagation();
    let el = jQuery(this.openExplanationRef.current);
    ix.run(closeExplanationTrigger, el);
    ix.run(hideCloseBtnTrigger, el);
  }

  render() {
    const {value, title, description, image} = this.props;

    return (
      <div className="options-new different-color-font pale-border top"
           onClick={this.handleClick}>
        <div className="radio-button-field-new grey-border w-radio">
          <div className="div-hover" data-ix="appear-next"></div>
          {
            (image !== undefined) && <img src={image} alt={title}/>
          }
          <input type="radio" name="type"
                 value={value} data-name="type"
                 className="radio-button-new w-radio-input"
                 ref={this.ref}
                 checked={this.props.isChecked}
                 onChange={() => this.props.onChange(value)}
          />
          <label htmlFor={value} className="form-label-trigger w-form-label">
            <strong>{title}</strong>
          </label>
          {
            (description !== undefined) &&
            <div onClick={this.openExplanation} ref={this.openExplanationRef} className="div-learn">
              <div>Learn more</div>
              <div ref={this.closeExplanationRef} onClick={this.closeExplanation} className="close">Close</div>
            </div>
          }
          <div className="form-label-new"><strong>{title}</strong></div>
          <p className="smaller-explanation-new">{description}</p>
        </div>
      </div>

    )
  }
}

export default Option;
