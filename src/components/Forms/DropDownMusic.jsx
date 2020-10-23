import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [
  { key: "Rock", text: "Rock", value: "Rock" },
  { key: "Rap", text: "Rap", value: "Rap" },
  { key: "Jazz", text: "Jazz", value: "Jazz" },
  { key: "Blues", text: "Blues", value: "Blues" },
  { key: "Metal", text: "Metal", value: "Metal" },
  { key: "Pop Rock", text: "Pop Rock", value: "Pop Rock" },
  { key: "Blues", text: "Blues", value: "Blues" },
  { key: "Rythm and Blues", text: "Rythm and Blues", value: "Rythm and Blues" },
  { key: "Soul", text: "Soul", value: "Soul" },
  { key: "Hip Hop", text: "Hip Hop", value: "Hip Hop" },
  { key: "Pop", text: "Pop", value: "Pop" },
  { key: "Indie Rock", text: "Indie Rock", value: "Indie Rock" },
  { key: "Hard Rock", text: "Hard Rock", value: "Hard Rock" },
  { key: "Experimental", text: "Experimental", value: "Experimental" },
  { key: "Electronic Music", text: "Electronic Music", value: "Electornic Music" },
  { key: "Punk", text: "Punk", value: "Punk" },
  { key: "Gospel", text: "Gospel", value: "Gospel" },
  { key: "Classical", text: "Classical", value: "Classical" },
  { key: "Country", text: "Country", value: "Country" },
  { key: "Rap", text: "Rap", value: "Rap" },
  { key: "Bosa Nova", text: "Bosa Nova", value: "Bosa Nova" },
  { key: "Reggae", text: "Reggae", value: "Reggae" },
];

const DropdownExampleMultipleSelection = ({value, callBack }) => {
  return (
    <Dropdown value={value}
      onChange={(event, data) => callBack(data)} placeholder="Music Style" fluid multiple selection options={options}
    />
  );
};

export default DropdownExampleMultipleSelection;
