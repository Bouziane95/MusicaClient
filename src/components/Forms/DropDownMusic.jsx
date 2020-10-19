import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [
  { key: "Rock", text: "Rock", value: "Rock" },
  { key: "Rap", text: "Rap", value: "Rap" },
  { key: "Jazz", text: "Jazz", value: "Jazz" },
  { key: "Blues", text: "Blues", value: "Blues" },
  { key: "Metal", text: "Metal", value: "Metal" },
  { key: "Funk", text: "Funk", value: "Funk" },
];

const DropdownExampleMultipleSelection = ({value, callBack }) => {
  return (
    <Dropdown value={value}
      onChange={(event, data) => callBack(data)} placeholder="Music Style" fluid multiple selection options={options}
    />
  );
};

export default DropdownExampleMultipleSelection;
