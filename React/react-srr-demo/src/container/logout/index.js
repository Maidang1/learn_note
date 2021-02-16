import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions/session';
class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-6">
          <form>
            <div className="form-group">
              <button
                onClick={this.props.logout}
                type="submit"
                className="btn btn-primary"
              >
                退出
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default connect((state) => state.session, actions)(Login);
