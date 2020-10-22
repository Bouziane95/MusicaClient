 import React from "react";
import { Switch, Route } from "react-router-dom";
// import NavMain from "./components/NavMain";
import NavContent from "./components/NavContent";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import MusicaHead from "./components/MusicaHead";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Bands from "./pages/Bands";
import BandPage from "./pages/BandPage";
import AddBand from "./pages/AddBand";
import UserPage from "./pages/UserPage";
import SendMessage from "./pages/SendMessage";
import ProfileEdit from "./pages/ProfileEdit";
import UserBands from "./pages/UserBands";
import UserBandsEdit from "./pages/UserBandsEdit";
import 'semantic-ui-css/semantic.min.css'
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <div className="App">
    <MusicaHead/>
    <NavContent/>
    <Footer/>
      {/* <NavMain /> */}
      <Switch>
        {/* ///HOME ROUTE/// */}
        
        <Route exact path="/users" component={Home} />
        <Route exact path="/" component={WelcomePage} />
        {/* ///AUTH ROUTES/// */}
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        {/* /// BANDS ROUTE /// */}
        <Route exact path="/bands" component={Bands} />
        <Route exact path="/bands/add" component={AddBand} />
        <Route exact path="/bands/:id" component={BandPage} />
        {/* ///PROFILE ROUTES/// */}
        <ProtectedRoute exact path="/profile/:id" component={Profile} />
        <ProtectedRoute exact path="/profile/:id/edit" component={ProfileEdit} />
        <ProtectedRoute exact path="/profile/:id/bands" component={UserBands} />
        <ProtectedRoute exact path="/profile/:id/bands/edit" component={UserBandsEdit} />
         {/* ///USER ROUTES/// */}
        <Route exact path="/:id/message" component={SendMessage} />
        <Route exact path="/users/:id" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
