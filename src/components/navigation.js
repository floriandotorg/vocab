import $ from 'jquery'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addVocabModalShow } from '../actions/add-vocab-modal'

const NavbarLink = withRouter(({ to, exact, onClick, children }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <li className={`nav-item ${match && 'active'}`} >
        <Link className="nav-link" to={to} onClick={onClick}>{children}</Link>
      </li>
    )}
  />
));

@connect(
  null,
  dispatch => ({
   addVocabModalShow: () => dispatch(addVocabModalShow()),
  })
)
export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.collapse = React.createRef();
  }

  hide = () => {
    $(this.collapse.current).collapse('hide');
  }

  render() {
    const { addVocabModalShow } = this.props;

    return (
      <div className="row">
        <div className="col">
          <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <form className="form-inline d-lg-none">
              <button className="btn btn-primary" type="button" onClick={addVocabModalShow}>+ Hinzufügen</button>
            </form>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={this.collapse}>
              <ul className="navbar-nav mr-auto">
                <NavbarLink exact={true} to="/" onClick={this.hide}>Vokabelliste</NavbarLink>
                <NavbarLink to="/learn" onClick={this.hide}>Lernen</NavbarLink>
              </ul>

              <form className="form-inline d-none d-lg-block">
                <button className="btn btn-primary" type="button" onClick={addVocabModalShow}>+ Hinzufügen</button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
