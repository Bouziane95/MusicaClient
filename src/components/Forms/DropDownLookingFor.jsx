import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'Guitarist', text: 'Guitarist', value: 'Guitarist'},
  { key: 'Bassist', text: 'Bassist', value: 'Bassist'},
  { key: 'Drummer', text: 'Drummer', value: 'Drummer'},
  { key: 'Singer', text: 'Singer', value: 'Singer'},
  { key: 'Pianist', text: 'Pianist', value: 'Pianist'},
  { key: 'Trumpetist', text: 'Trumpetist', value: 'Trumpetist'},
  { key: 'Saxophonist', text: 'Saxophonist', value: 'Saxophonist'},
  { key: 'Violinist', text: 'Violinist', value: 'Violinist'},
  { key: 'Electric Guitarist', text: 'Electric guitarist', value: 'Electric Guitarist'},
  { key: 'Clarinetist', text: 'Clarinetist', value: 'Clarinetist'},
  { key: 'Harpist', text: 'Harpist', value: 'Harpist'},
  { key: 'Accordionist', text: 'Accordionist', value: 'Accordionist'},
  { key: 'Organist', text: 'Organist', value: 'Organist'},
  { key: 'Trombonist', text: 'Trombonist', value: 'Trombonist'},
  { key: 'Flautist', text: 'Flautist', value: 'Flautist'},
  { key: 'Synthetizer player', text: 'Synthetizer player', value: 'Synthetizer player'},
  { key: 'Mandolinist', text: 'Mandolinist', value: 'Mandolinist'},
  { key: 'Bagpiper', text: 'Bagpiper', value: 'Bagpiper'},
]

const DropdownExampleMultipleSelection = ({value, callBack}) => {

  return <Dropdown value={value} onChange={(event, data) => callBack(data)} placeholder="What are you looking for ?" fluid multiple selection options={options} />
}

export default DropdownExampleMultipleSelection
