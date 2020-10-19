import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Guitare', text: 'Guitariste', value: 'Guitariste', },
  { key: 'Batteur', text: 'Batteur', value: 'Batteur' },
  { key: 'Basse', text: 'Basse', value: 'Basse' },
]

const DropdownExampleMultipleSelection = ({value, callBack}) => {

  return <Dropdown value={value} onChange={(event, data) => callBack(data)} placeholder="What are you looking for ?" fluid multiple selection options={options} />
}

export default DropdownExampleMultipleSelection
