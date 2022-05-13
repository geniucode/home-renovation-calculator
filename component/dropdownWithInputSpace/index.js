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
    <div style={{ display: "flex" , flexDirection:"column" }}>
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
          style={{marginTop:40}}
        />
    </div>
  );
}

export default DropdownWithInputSpace;
