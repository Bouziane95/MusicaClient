import React from 'react'
import EditUser from "../pages/EditUser"

const ProfileEdit = (props) => {
    
        return (
            <div>
                <h1>I'm the Profile edit pages</h1>
                <EditUser action = "edit" id={props}/>
            </div>
        )

}

export default ProfileEdit;

