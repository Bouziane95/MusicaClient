import React from 'react'
import { Icon } from "semantic-ui-react";


function Footer() {
    return (
        <div>
            <p className="footer">Made by Bouziane Bey and Philippe Buteau with</p>
            <Icon name="react" className="footer" color="yellow"/>
            <Icon name="html" className="footer" color="yellow"/>
            <Icon name="css3" className="footer" color="yellow"/>
            <p className="footer">and</p>
            <Icon name="heart" className="footer" color="yellow"/>

        </div>
    )
}

export default Footer
