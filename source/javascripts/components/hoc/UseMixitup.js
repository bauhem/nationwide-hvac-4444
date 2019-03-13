import React from "react";
import {initializeMixitup} from "../../mixitup-helpers";
import {hasProperty} from "../../utils";

export function withMixitup(WrappedComponent, ) {
  let useSavedFilters = true;

  return class UseMixitup extends React.Component {
    constructor(props) {
      super(props);

      if (hasProperty(props, 'useSavedFilters')) {
        useSavedFilters = props.useSavedFilters;
      }

      this.startMixitup = this.startMixitup.bind(this);

      this.state = {
        mixer: null
      }
    }

    startMixitup() {
      let mixer = initializeMixitup('.container', useSavedFilters)

      this.setState({mixer: mixer});

    }

    componentDidMount() {
      this.startMixitup();
    }

    render() {
        return <WrappedComponent mixer={this.state.mixer} {...this.props} />
    }
  }
}