import React from 'react';

export function SlideWithOptions(WrappedComponent) {
  return class SlideHelper extends React.Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.notSure = this.notSure.bind(this);
    }

    // To override this method, redefine a handleChange method in the component
    // using Slide() and pass the new handleChange method along with the
    // OptionGroup
    handleChange(val) {
      let fields = {};
      fields[this.props.ctx_key] = val;
      this.props.saveValues(fields);
    }

    notSure() {
      let fields = {};
      fields[this.props.ctx_key] = "Not Sure";
      this.props.saveValues(fields);
      this.props.transition({type: "NOT_SURE"});
    }

    render() {
      return <WrappedComponent onChange={this.handleChange} notSure={this.notSure} {...this.props} />;
    }
  }
}