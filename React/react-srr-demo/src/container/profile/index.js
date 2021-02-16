import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
class Profile extends Component {
  render() {
    return (
      <div className="row">
       {
         this.props.user? <div className="col-md-6 col-md-offset-6">个人中心</div>:<Redirect to='/login' />
       }
      </div>
    );
  }
}
export default connect((state) => state.session)(Profile);
