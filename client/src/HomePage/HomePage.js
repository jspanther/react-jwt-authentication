import React from "react";
import { authenticationService } from "../_services/authentication.service";
import { userService } from "../_services/user.service";
import * as globals from "../Global";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      users: null,
      edit: false
    };
  }

  componentDidMount() {
    userService.getAll().then(users => this.setState({ users }));
  }

  remove = id => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    };
    const url = globals.url;
    fetch(`${url}/register/remove`, requestOptions);
    console.log(id);
    const newUsers = [];
    this.state.users.forEach((element, index) => {
      if (element._id !== id) {
        newUsers.push(element);
      }
    });
    this.setState({ users: newUsers });
  };
  onClickHandler = e => {
    if (e === "5e17045759471e3295973b36") {
      window.alert("You cannot delete this user");
    } else {
      if (window.confirm("Do you really want to delete this user?")) {
        this.remove(e);
      }
    }
  };

  render() {
    const { currentUser, users } = this.state;

    return (
      <div>
       
  <h1>Hi  {currentUser.email}!</h1>
        <p>You're logged in with React & JWT!!</p>
        <h3>Users from secure api end point:</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>
                    {
                      <button disabled={user._id ==="5e17045759471e3295973b36"?true:false} onClick={() => this.onClickHandler(user._id)}>
                        Delete
                      </button>
                    }
                  </td>
                  <td>
                    {
                      <Link to={"/edit/" + user._id}>
                        {<button disabled={user._id ==="5e17045759471e3295973b36"?true:false} >Edit</button>}
                      </Link>
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export { HomePage };
