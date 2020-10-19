import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Bands from "./pages/Bands";
import BandPage from "./pages/BandPage";
import AddBand from "./pages/AddBand";
import UserPage from "./pages/UserPage";
import SendMessage from "./pages/SendMessage";
import MessageBox from "./pages/MessageBox";
import ProfileEdit from "./pages/ProfileEdit";
import UserBands from "./pages/UserBands";
import UserBandsEdit from "./pages/UserBandsEdit";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        {/* ///HOME ROUTE/// */}
        <Route exact path="/" component={Home} />
        {/* ///AUTH ROUTES/// */}
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        {/* /// BANDS ROUTE /// */}
        <Route exact path="/bands" component={Bands} />
        <Route exact path="/bands/add" component={AddBand} />
        <Route exact path="/bands/:id" component={BandPage} />
        {/* ///MESSAGE ROUTES/// */}
        <Route exact path="/messages" component={MessageBox} />
        <Route exact path="/messages/:id" component={SendMessage} />
        {/* ///PROFILE ROUTES/// */}
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/profile/:id/edit" component={ProfileEdit} />
        <Route exact path="/profile/:id/bands" component={UserBands} />
        <Route exact path="/profile/bands/:id/edit" component={UserBandsEdit} />
         {/* ///USER ROUTES/// */}
        <Route exact path="/:id/message" component={SendMessage} />
        <Route exact path="/users/:id" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
