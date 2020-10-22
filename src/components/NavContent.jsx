import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

const NavContent = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Menu icon="labeled" fluid widths={5}>
        <Menu.Item name="Home">
          <Icon name="home" basic color="black" />
          <NavLink exact to="/">
            Home
          </NavLink>
        </Menu.Item>

        <Menu.Item name="Bands">
          <Icon name="music" basic color="black" />
          <NavLink exact to="/bands">
            Bands
          </NavLink>
        </Menu.Item>

        {context.isLoggedIn && (
          <React.Fragment>
            <Menu.Item>
              <Icon name="user" basic color="black" />
              <Link to={`/profile/${context.user._id}`}>My Profile</Link>
            </Menu.Item>

            <Menu.Item name="Bands">
              <Icon name="play" basic color="black" />
              <Link to={`/profile/${context.user._id}/bands`}>My Bands</Link>
            </Menu.Item>

            {/* <Menu.Item>
            <Icon name= "music"/>
            <Link to ={`/profile/${context.user._id}/edit`}>
              Edit
            </Link>
            </Menu.Item> */}
            <Menu.Item name="LogOut">
              <Icon name="log out" basic color="black" />
              <NavLink onClick={handleLogout} to="/">
                Log Out
              </NavLink>
            </Menu.Item>
          </React.Fragment>
        )}

        {!context.isLoggedIn && (
          <React.Fragment>
            <Menu.Item name="Sign Up">
              <Icon name="volume down" basic color="black" />
              <NavLink className="effect-underline" to="/signup">
                Create account
              </NavLink>
            </Menu.Item>

            <Menu.Item name="Sign In">
              <Icon name="volume up" basic color="black" />
              <NavLink to="/signin">Log in</NavLink>
            </Menu.Item>
          </React.Fragment>
        )}
      </Menu>

      {/* <div className="orange-style"></div> */}
      {/* <div><img className="partition" src="https://res.cloudinary.com/dncemocxu/image/upload/v1603373529/partitions_ju2sxl.png" alt="partition"></img></div> */}
    </div>
  );
};

export default withUser(NavContent);
