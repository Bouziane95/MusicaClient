import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

const NavContent = (props) => {
  const { context } = props;
  console.log(context);

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


    <Menu icon="labeled">

<Menu.Item name="Home">
        <Icon name="home" />
        <NavLink exact to="/">
          Home
        </NavLink>
      </Menu.Item>

      <Menu.Item name="Bands">
        <Icon name="music" />
        <NavLink exact to="/bands">
          Bands
        </NavLink>
      </Menu.Item>

      {context.isLoggedIn && (
        <React.Fragment>

        <Menu.Item>
          <Icon name="user" />
            <Link to={`/profile/${context.user._id}`}>
              My Profile
            </Link>
          </Menu.Item>

          <Menu.Item name="Bands">
            <Icon name="play" />
            <Link to={`/profile/${context.user._id}/bands`}>My Bands</Link>
          </Menu.Item>


          {/* <Menu.Item>
            <Icon name= "music"/>
            <Link to ={`/profile/${context.user._id}/edit`}>
              Edit
            </Link>
            </Menu.Item> */}
            <Menu.Item name="LogOut">
            <Icon name="log out" />
            <Link onClick={handleLogout}> Log Out</Link>
          </Menu.Item>

        </React.Fragment>
      )}

      {!context.isLoggedIn && (
          <React.Fragment>
          <Menu.Item name="Sign Up">
        <Icon name="volume down" />
        <NavLink className="effect-underline" to="/signup">Create account</NavLink>
      </Menu.Item>

      <Menu.Item name="Sign In">
        <Icon name="volume up" />
        <NavLink to="/signin">Log in</NavLink>
      </Menu.Item>


          </React.Fragment>
        )}
    </Menu>
  );
};

export default withUser(NavContent);
