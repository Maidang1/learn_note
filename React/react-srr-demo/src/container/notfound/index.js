import React, { Component } from 'react';

// export default ({ staticContext = {} }) => {
//   staticContext.notfound = true;
//   return <h1>Oops, nothing here!</h1>;
// };

export default class NotFount extends Component {
  constructor(props) {
    super(props)
    if (this.props.staticContext) {
      this.props.staticContext.notfound = true;
    }
  }

  render() {
    return <h1>Oops, nothing here!</h1>;
  }
}
