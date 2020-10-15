import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Guitarist', text: 'Guitarist', value: 'Guitarist', name:"musicStyle" },
  { key: 'Bassist', text: 'Bassist', value: 'Bassist', name: "musicStyle" },
  { key: 'Drummer', text: 'Drummer', value: 'Drummer', name: "musicStyle" },
  { key: 'Singer', text: 'Singer', value: 'Singer', name: "musicStyle" },
  { key: 'Bolosse', text: 'Bolosse', value: 'Bolosse', name: "musicStyle" },

]

const DropdownExampleMultipleSelection = () => (
  <Dropdown placeholder='Instruments' fluid multiple selection options={options} />
)

export default DropdownExampleMultipleSelection
