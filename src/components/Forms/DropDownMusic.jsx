import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Rock', text: 'Rock', value: 'Rock', name:"musicStyle" },
  { key: 'Rap', text: 'Rap', value: 'Rap', name:"musicStyle" },
  { key: 'Jazz', text: 'Jazz', value: 'Jazz', name:"musicStyle" },
  { key: 'Blues', text: 'Blues', value: 'Blues', name:"musicStyle" },
  { key: 'Metal', text: 'Metal', value: 'Metal', name:"musicStyle" },
  { key: 'Funk', text: 'Funk', value: 'Funk', name:"musicStyle" },
]

const DropdownExampleMultipleSelection = ({callBack}) => {

  return <Dropdown onChange={event => callBack(event.target.querySelector("span").innerHTML)} placeholder='Music Style' fluid multiple selection options={options} />
}

export default DropdownExampleMultipleSelection
