import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Guitarist', text: 'Guitarist', value: 'Guitarist', name:"lookingFor" },
  { key: 'Bassist', text: 'Bassist', value: 'Bassist', name: "lookingFor" },
  { key: 'Drummer', text: 'Drummer', value: 'Drummer', name: "lookingFor" },
  { key: 'Singer', text: 'Singer', value: 'Singer', name: "lookingFor" },
  { key: 'Bolosse', text: 'Saxophonist', value: 'Bolosse', name: "lookingFor" },

]

const DropdownExampleMultipleSelection = () => (
  <Dropdown placeholder='Instruments' fluid multiple selection options={options} />
)

export default DropdownExampleMultipleSelection
