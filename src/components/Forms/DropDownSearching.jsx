import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Guitar', text: 'Guitarist', value: 'Guitar'},
  { key: 'Bass', text: 'Bassist', value: 'Bass'},
  { key: 'Drums', text: 'Drummer', value: 'Drums'},
  { key: 'Sing', text: 'Singer', value: 'Sing'},
  { key: 'Piano', text: 'Pianist', value: 'Piano'},
  { key: 'Trumpet', text: 'Trumpetist', value: 'Trumpet'},
  { key: 'Saxophone', text: 'Saxophonist', value: 'Saxophone'},
  { key: 'Violin', text: 'Violinist', value: 'Violin'},
  { key: 'Electric Guitar', text: 'Electric guitarist', value: 'Electric Guitar'},
  { key: 'Clarinet', text: 'Clarinetist', value: 'Clarinet'},
  { key: 'Harp', text: 'Harpist', value: 'Harp'},
  { key: 'Accordion', text: 'Accordionist', value: 'Accordion'},
  { key: 'Organ', text: 'Organist', value: 'Organ'},
  { key: 'Trombone', text: 'Trombonist', value: 'Trombone'},
  { key: 'Flute', text: 'Flautist', value: 'Flute'},
  { key: 'Synthetizer', text: 'Synthetizer player', value: 'Synthetizer'},
  { key: 'Mandolin', text: 'Mandolinist', value: 'Mandolin'},
  { key: 'Bagpipe', text: 'Bagpiper', value: 'Bagpipe'},
]

const DropdownExampleMultipleSelection = ({value, callBack}) => {

  return <Dropdown className="foo" value={value} onChange={(event, data) => callBack(data)} placeholder="What are you looking for ?" fluid multiple selection options={options} />
}

export default DropdownExampleMultipleSelection
