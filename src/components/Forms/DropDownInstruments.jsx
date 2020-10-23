import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Guitar', text: 'Guitar', value: 'Guitar'},
  { key: 'Bass', text: 'Bassist', value: 'Bass'},
  { key: 'Drums', text: 'Drummer', value: 'Drums'},
  { key: 'Sing', text: 'Sing', value: 'Sing'},
  { key: 'Piano', text: 'Piano', value: 'Piano'},
  { key: 'Trumpet', text: 'Trumpet', value: 'Trumpet'},
  { key: 'Saxophone', text: 'Saxophone', value: 'Saxophone'},
  { key: 'Violin', text: 'Violin', value: 'Violin'},
  { key: 'Electric Guitar', text: 'Electric guitar', value: 'Electric Guitar'},
  { key: 'Clarinet', text: 'Clarinet', value: 'Clarinet'},
  { key: 'Accordion', text: 'Accordion', value: 'Accordion'},
  { key: 'Harp', text: 'Harp', value: 'Harp'},
  { key: 'Drum', text: 'Drum', value: 'Drum'},
  { key: 'Organ', text: 'Organ', value: 'Organ'},
  { key: 'Trombone', text: 'Trombone', value: 'Trombone'},
  { key: 'Flute', text: 'Flute', value: 'Flute'},
  { key: 'Cello', text: 'Cello', value: 'Cello'},
  { key: 'Alto', text: 'Alto', value: 'Alto'},
  { key: 'Synthetizer', text: 'Synthetizer', value: 'Synthetizer'},
  { key: 'Cor', text: 'Cor', value: 'Cor'},
  { key: 'Piccolo', text: 'Piccolo', value: 'Piccolo'},
  { key: 'Mandolin', text: 'Mandolin', value: 'Mandolin'},
  { key: 'Bagpipe', text: 'Bagpipe', value: 'Bagpipe'},
]

const DropdownExampleMultipleSelection = ({value,callBack}) => {
return <Dropdown value={value} onChange={(event, data) => callBack(data) } placeholder="What instruments do you play ?" fluid multiple selection options={options} />
}

export default DropdownExampleMultipleSelection
