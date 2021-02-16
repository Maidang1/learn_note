import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import actoins from '../store/actions/session';
import { renderRoutes } from 'react-router-config';
import styles from './app.css';
import withStyles from '../withStyle';

class App extends Component {

  componentDidMount(){
    console.log('mount')
  }
  render() {
    return (
      <Fragment>
        <Header staticContext={this.props.staticContext} />
        <div className="container" className={styles.app}>
          {renderRoutes(this.props.route.components)}
        </div>
      </Fragment>
    );
  }
}

function loadData(store) {
  return store.dispatch(actoins.getUser());
};

export default withStyles(App, styles,loadData);
