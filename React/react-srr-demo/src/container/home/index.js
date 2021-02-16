import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions/home';

class Home extends Component {
  componentDidMount() {
    if (this.props.list.length === 0) {
      this.props.getHomeList();
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <ul className="list-group">
            {this.props.list.map((item) => {
              return (
                <li key={item.id} className="list-group-item">
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

// 用来加载数据
Home.loadData = function (store) {
  return store.dispatch(actions.getHomeList());
};

export default connect((state) => state.home, actions)(Home);
