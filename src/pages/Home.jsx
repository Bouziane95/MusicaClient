import React from "react";
import apiHandler from "../api/apiHandler";
import {Link} from "react-router-dom";

class Home extends React.Component {

  state = {
        users: [],
        selectedUser: null,
    };

    componentDidMount(){
        apiHandler.getAllUsers("/users").then((apiRes) => {
            this.setState({
                users: apiRes.data,
            });
        })
        .catch((apiErr) => {
            console.log(apiErr);
        });
    }

    handleClick = (index) => {
        this.setState({selectedUser : index});
    }


  render() {
        return (
            <div>
                <h1>I'm the user page</h1>
                {this.state.users.map((user) => {
                    return(
                <Link
                        key = {user._id}
                        to={`/users/${user._id}`}
                        >
                        <div>
                <img
                  src={user.profilePicture}
                  alt={user.firstName}
                />
                <p>{user.firstName}</p>
                <p>{user.age}</p>
                <p>{user.instrumentsPlayed}</p>
              </div>
                </Link>
                    )
                })}
            </div>
        )
    }
}

export default Home;
