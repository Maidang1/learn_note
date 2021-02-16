import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions/counter';
class Counter extends Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button
          onClick={() => {
            this.props.increment();
          }}
        >
          +
        </button>
      </div>
    );
  }
}

export default connect((state) => state.counter, actions)(Counter);
