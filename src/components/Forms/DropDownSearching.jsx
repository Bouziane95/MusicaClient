import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Guitarist', text: 'Guitarist', value: 'Guitarist'},
  { key: 'Bassist', text: 'Bassist', value: 'Bassist' },
]

const DropdownExampleMultipleSelection = ({value, callBack}) => {

  return <Dropdown value={value} onChange={(event, data) => callBack(data)} placeholder="What are you looking for ?" fluid multiple selection options={options} />
}

export default DropdownExampleMultipleSelection
