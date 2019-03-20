import React from 'react';

export function Slide(WrappedComponent) {
  return class SlideHelper extends React.Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val) {
      let fields = {};
      fields[this.props.ctx_key] = val;
      this.props.saveValues(fields);
    }

    render() {
      return <WrappedComponent onChange={this.handleChange} {...this.props}/>;
    }
  }
}