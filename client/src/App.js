import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { history } from "./_helpers/history";
import { authenticationService } from "./_services/authentication.service";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { PrivateRoute } from "./_components/PrivateRoute";
import { RegisterationForm } from "./userRegisteration/UserRegisteration";
// import EditUser from "./EditUser/oldEdituser";
import {EditUseer} from './EditUser/EditUser'
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ currentUser: x })
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <div>
          {currentUser && (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">
                  Home
                </Link>
                <div onClick={this.logout} className="nav-item nav-link">
                  Logout
                </div>
              </div>
            </nav>
          )}
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterationForm} />
                  {/* <Route path = "/edit/:id" component = {EditUser}/> */}
                  <Route path = "/edit/:id" component = {EditUseer}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export { App };
