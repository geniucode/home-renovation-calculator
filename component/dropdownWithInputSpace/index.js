import React, { useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import styles from "./style.module.css";
import DropDownList from "../dropDown";

function DropdownWithInputSpace({
  row,
  saveData,
  defaultValue = "",
  ...props
}) {
  const [textValue, setTextValue] = useState(defaultValue || 0);
  const [spaceValue, setSpaceValue] = useState(defaultValue || 0);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "80%" }}>
        <DropDownList
          row={row}
          saveData={(value) => {
            saveData({
              space: spaceValue,
              text: value,
            });
            setTextValue(value);
          }}
        />
      </div>
      <div style={{ width: "20%" }}>
        <TextField
          label={row.title}
          variant="standard"
          {...props}
          value={spaceValue}
          onChange={(e) => {
            setSpaceValue(e.target.value);
            saveData({
              text: textValue,
              space: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
}

export default DropdownWithInputSpace;
