import React from 'react';
import Option from './Option'

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
      <div className="div-flex-h">
        {
          React.Children.map(this.props.children, child => {
                if (child.type === Option) {
                  let onChange = child.props.onChange;

                  if (onChange === undefined) {
                    onChange = this.handleChange;
                  }
                  return React.cloneElement(child, {
                    isChecked: this.props.value === child.props.value,
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

export default OptionsGroup;