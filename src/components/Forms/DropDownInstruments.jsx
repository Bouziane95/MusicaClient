import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Guitarist', text: 'Guitarist', value: 'Guitarist'},
  { key: 'Bassist', text: 'Bassist', value: 'Bassist'},
  { key: 'Drummer', text: 'Drummer', value: 'Drummer'},
  { key: 'Singer', text: 'Singer', value: 'Singer'},
]

const DropdownExampleMultipleSelection = ({value,callBack}) => {
return <Dropdown value={value} onChange={(event, data) => callBack(data) } placeholder="What instruments do you play ?" fluid multiple selection options={options} />
}

export default DropdownExampleMultipleSelection
