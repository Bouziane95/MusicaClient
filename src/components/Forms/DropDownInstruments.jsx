import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Guitarist', text: 'Guitarist', value: 'Guitarist', name:"musicStyle" },
  { key: 'Bassist', text: 'Bassist', value: 'Bassist', name: "musicStyle" },
  { key: 'Drummer', text: 'Drummer', value: 'Drummer', name: "musicStyle" },
  { key: 'Singer', text: 'Singer', value: 'Singer', name: "musicStyle" },
]

const DropdownExampleMultipleSelection = ({callback}) => {
return <Dropdown onChange={event =>callback(event.target.querySelector("span").innerHTML)} placeholder="What instruments do you play ?" fluid multiple selection options={options} />
}

export default DropdownExampleMultipleSelection
