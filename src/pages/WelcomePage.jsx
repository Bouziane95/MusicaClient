import React, { Component } from "react";
import "../styles/welcomePage.css";
import { Icon } from "semantic-ui-react";

export default class WelcomePage extends Component {
  render() {
    return (
      <div>
        <section id="intro">
          <div>
            <span className="welcome">Welcome to</span>
            <span className="musica-title"> MUSICA</span>
          </div>

          <div className="column-pres">
            <p className="where">Where music is the</p>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/26/01/17/treble-clef-1279909_1280.png"
              alt="clef"
            />
          </div>

          <div className="justi-text">
            <p>
              ♩ Musica is a website allowing users to meet new musicians near
              their homes. ♩
            </p>

            <p>
              ♪ Looking for a guitarist? A bass player ? a drummer ? A band ? ♪
            </p>

            <p>
              ♫ Musica geolocates nearby musicians and allows you to filter
              users according to your search. ♫
            </p>
            <br />
            <Icon name="music" color="yellow"></Icon>
            <Icon name="music" color="yellow"></Icon>
            <Icon name="music" color="yellow"></Icon>
          </div>
          <div className="border-b"></div>
          <img
            className="partition"
            src="https://res.cloudinary.com/dncemocxu/image/upload/v1603373529/partitions_ju2sxl.png"
            alt="partition"
          />
        </section>

        <section id="concept">
          <span className="welcome place">How does it work ?</span>
          <div className="border-btwo"></div>
          <div className="info-row">
            <div className="info-col">
              <Icon name="edit" color="yellow" size="massive" />
              <h1>Step one</h1>
              <h2>Create an account</h2>
              <p>
                Simply create an account. As soon as you are done, your user
                profile will be displayed within the users page and people will
                be able to see your profile.
              </p>
            </div>

            <div className="info-col">
              <Icon
                name="hand pointer online"
                color="yellow"
                size="massive"
              ></Icon>
              <h1>Step two</h1>
              <h2>Add your band.s</h2>
              <p>
                You can add your band.s so people can see what you are searching
                for! Maybe a bassist, a guitarist, a saxophonist or even a
                singer!
              </p>
            </div>
            <div className="info-col">
              <Icon name="smile outline" color="yellow" size="massive" />
              <h1>Step Three</h1>
              <h2>Search for musicians!</h2>
              <p>
                Search around the users so you can find the musicians that you
                would like to play music with. This is as easy as it gets.{" "}
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
