import React, { Component } from 'react';

export default function withStyles(OriginalComponent, styles, fn) {
  class ProxyComponent extends Component {
    constructor(props) {
      super(props);
      if (this.props.staticContext) {
        this.props.staticContext.csses.push(styles._getCss());
      }
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  if (typeof fn === 'function') {
    ProxyComponent.loadData = fn;
  }
  return ProxyComponent;
}
