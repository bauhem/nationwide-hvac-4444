import React from 'react';

export function OptionNotSure(props) {
  return (
    <Option key={'not-sure'} value={"Not Sure"} title={"I'm not sure"}
                        onChange={() => props.notSure()}/>
  )
}

class Option extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.ref.current.checked = true;
    this.props.onChange(this.ref.current.value);
  }

  render() {
    const {value, title, description, image} = this.props;

    return (
      <div className="options-new different-color-font pale-border top" onClick={this.handleClick}>
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
          <div className="div-learn" data-ix="open-explanation">
            <div>Learn more</div>
            <div className="close" data-ix="open-explanation">Close</div>
          </div>
          <div className="form-label-new"><strong>{title}</strong></div>
          <p className="smaller-explanation-new">{description}</p>
        </div>
      </div>

    )
  }
}

export default Option;