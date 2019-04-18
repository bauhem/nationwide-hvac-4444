import React from 'react';
import Option from './Option'
import QuoteCtx from "../QuoteCtx";

class OptionsGroup extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    this.props.onChange(val);
  }
  
  render() {
    return (
      <div className="div-flex-h options-group">
        {
          React.Children.map(this.props.children, child => {
                if (child.type === Option) {
                  let onChange = child.props.onChange;

                  if (onChange === undefined) {
                    onChange = this.handleChange;
                  }
                  return React.cloneElement(child, {
                    isChecked: this.props.value == child.props.value, // We use == instead of === because we can have a string and a numerical value
                    onChange: onChange
                  })
                }
                return child;
              })
        }
      </div>
    )
  }
};

OptionsGroup.contextType = QuoteCtx;

export default OptionsGroup;